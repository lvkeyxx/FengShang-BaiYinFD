package com.service;

import ipacs.dataaccess.service.ServiceManager;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import sun.misc.BASE64Decoder;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.utility.DateHelper;
import com.utility.FTPUtil;
import com.utility.IbatisDBUtil;
import com.utility.JdbcDBUtil;
import com.utility.JsonUtil;
import com.utility.TokenUtils;
import com.utility.Utility;

public class HiddenPerilsService  extends AJsonService implements IJsonService{
	
	/**
	 * 获得隐患列表 
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getHiddenPerilsList(Map map) throws ServiceException{
		String returnString="{}";
		try{
			String 	page = (String) map.get(Constant.PAGENO);
			String state = (String) map.get("ROWSTATE");
			
			String stateStr = "";
			if(null!=state && state.trim().length()>0) {
				stateStr = state;
			}
			
			int pageInt = 1;
			if(null!=page&&page.trim().length()>0) pageInt=Integer.valueOf(page);
			if(pageInt < 1) pageInt = 1;
			int pageCount = 12;
			String serviceSql="select HID_SERIAL_ID, HID_SERIAL_QUESTION, HAZARD_CATEGORY, HID_SERIAL_LEVEL, "
					+ "to_char(FIND_DATE,'yyyy/MM/DD hh24:mm:ss') as CREATED_DATE, "
					+ "IS_APP_TRANSFER, to_char(XIAO_HAO_DATE,'yyyy/MM/DD hh24:mm:ss') as XIAO_HAO_DATE, "
					+ "rowstate, rowstate as HID_SERIAL_STATE "
					+ "from ifsapp.SAFETY_HIDDEN_PERILS_TAB "
					+ "where rowstate like '%" + stateStr + "%' "
//					FIND_PERSON_ID = '" + userId + "' "
					+ "order by FIND_DATE desc";
			String strSql = "select * from "
					+ "(select c.*,rownum as ROW_NUM from "
					+ "(" + serviceSql + ") c) where ROW_NUM > " + (pageInt-1)*pageCount
					+ " and  " + pageInt*pageCount + " >= ROW_NUM";
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = IbatisDBUtil.dataDictionary(list, "HID_SERIAL_STATE");
					
			returnString=JsonUtil.mapListToJsonString(list);
			returnString = returnString.replace("\r\n", "");
			returnString = returnString.replace("\n", "");
			returnString = returnString.replace("\r", "");
			returnString = returnString.replace("\t", "");
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0301","获取隐患列表失败");
		}			
		return returnString;
	}

	/**
	 * 获得隐患详细信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getHiddenPerilsDetail(Map map) throws ServiceException{
		
		String returnString="{}";
		String 	userId = (String)map.get(Constant.USER_ID);
		String 	HIDSerialID = (String)map.get("HID_SERIAL_ID");
		
		String strSql = "select HID_SERIAL_ID, HID_SERIAL_QUESTION, HAZARD_CATEGORY as HAZARD_CATEGORY_NAME, "
				+ "(select BUSIN_ID from SDICAPP.SDIC_APP_DICTIONARY "
					+ "where BUSIN_NAME = ifsapp.SAFETY_HIDDEN_PERILS_TAB.HAZARD_CATEGORY "
					+ "and TYPE_ID = 'HAZARD_CATEGORY_NAME') as HAZARD_CATEGORY, "
				+ "HID_SERIAL_LEVEL, HID_SERIAL_LEVEL as SERIAL_LEVEL_NAME, "
				+ "to_char(FIND_DATE,'yyyy/MM/DD hh24:mm:ss') as CREATED_DATE, HID_SERIAL_DESC, PREVENT, "
				+ "IS_APP_TRANSFER, to_char(XIAO_HAO_DATE,'yyyy/MM/DD hh24:mm:ss') as XIAO_HAO_DATE, "
				+ "FIND_PERSON_ID, (select internal_display_name from ifsapp.COMPANY_PERSON where PERSON_ID = ifsapp.SAFETY_HIDDEN_PERILS_TAB.FIND_PERSON_ID) as USER_NAME, "
				+ "rowstate, rowstate as HID_SERIAL_STATE "
				+ "from ifsapp.SAFETY_HIDDEN_PERILS_TAB "
				+ "where HID_SERIAL_ID = '" + HIDSerialID + "'";
		
//		UserProfile userProfile = ConfigCache.getInstance().getUserProfile(userId);
		try{
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = IbatisDBUtil.dataDictionary(list, "HAZARD_CATEGORY_NAME", "SERIAL_LEVEL_NAME", "HID_SERIAL_STATE");
			if(null!=list && list.size()==1){
				Map item=(Map)list.get(0);
//				item.put("USER_NAME", userProfile.getNickName());
//				item.put("ORG_NAME", userProfile.getOrgName());
				
				JSONArray fileArray = getDocumentData(HIDSerialID);
				if(null!=fileArray&&fileArray.length()>0) {
					item.put("FILE", fileArray);
				}
				returnString=JsonUtil.mapToJSONObject(item).toString();
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0302","获取隐患详细信息失败");
		}	

		return returnString;
	}
	
	/**
	 * 获取隐患类别列表
	 * @param
	 * @return
	 * @throws ServiceException 
	 */
	public String getHiddenPerilsCategory(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("HAZARD_CATEGORY_NAME");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
	
	/**
	 * 获取隐患等级列表
	 * @param
	 * @return
	 * @throws ServiceException 
	 */
	public String getHiddenPerilsLevel(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("SERIAL_LEVEL_NAME");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
	
	/**
	 * 获取隐患状态列表
	 * @param
	 * @return
	 * @throws ServiceException 
	 */
	public String getHiddenPerilsState(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("HID_SERIAL_STATE");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
	
	public String doHiddenPerilsDetail(Map map) throws ServiceException{
		String returnString="{}";
		
		String userId = (String) map.get(Constant.USER_ID);
		String actionType = (String) map.get("ACTION_TYPE");
		String hIDSerialQuestion = (String) map.get("HID_SERIAL_QUESTION");
		String hazardCategory = (String) map.get("HAZARD_CATEGORY");
		String hIDSerialLevel = (String) map.get("HID_SERIAL_LEVEL");
		String hIDSerialCausion = (String) map.get("HID_SERIAL_DESC");
		String hIDSerialPrecautions = (String) map.get("PREVENT");
		
		String hIDSerialID = "";
		if(map.containsKey("HID_SERIAL_ID")) {
			hIDSerialID = (String) map.get("HID_SERIAL_ID");
		}
		
		DataSource dataSource = (DataSource) ServiceManager.getService("dataSource");
		Connection conn = null;
	    CallableStatement proc = null;
	    String strSql = "";
	    
		try{
			
			conn = dataSource.getConnection();
			String category = "";
			
			if("save".equals(actionType)) {
				category = "811";
				strSql = "call ifsapp.safety_hidden_perils_api.create_safety_hidden_new"
						+ "(?, ?, ?, ?, ?, ?, ?)";
				proc = conn.prepareCall("{ " + strSql + " }");
				proc.registerOutParameter(1, Types.VARCHAR);
				proc.setString(2, hIDSerialQuestion);
				proc.setString(3, hazardCategory);
				proc.setString(4, hIDSerialLevel);
				proc.setString(5, userId);
				proc.setString(6, hIDSerialCausion);
				proc.setString(7, hIDSerialPrecautions);
				proc.execute();
				hIDSerialID = proc.getString(1);
			} else if ("recheck".equals(actionType)) {
				category = "812";
				strSql = "call ifsapp.safety_hidden_perils_api.change_state_finish(?)";
				proc = conn.prepareCall("{ " + strSql + " }");
				proc.setString(1, hIDSerialID);
				proc.execute();
				
			}
			
			if(map.containsKey("IMAGE_LIST")) {
				JSONArray imageArray = (JSONArray) map.get("IMAGE_LIST");
				for(int i=0; i<imageArray.length(); i++) {
					//此处开始向服务器写文件
					byte[] encrypted = new BASE64Decoder().decodeBuffer(imageArray.get(i).toString());
//					String filePath = map.get(Constant.SERVLET_REAL_PATH).toString() + Constant.IFSDOC + "/" + category;
					String filePath = "/" + category;
					String fileName = DateHelper.getCurrentStringDate(DateHelper.DATE_TIME_FORMAT_14) + userId + ".png";
//					writeDoc(encrypted, filePath, fileName);
					InputStream is = new ByteArrayInputStream(encrypted);
					FTPUtil.uploadFile("10.143.118.20", 1000, "doc2017admin", "admin", "81/", filePath, fileName, is);
					//此处开始向服务器写数据
					UserProfile userProfile = ConfigCache.getInstance().getUserProfile(userId);
					conn = dataSource.getConnection(userId, userProfile.getPassWord());
					strSql = "call IFSAPP.DOC_TITLE_API.Create_Doc_For_App(?, ?, ?)";
					proc = conn.prepareCall("{ " + strSql + " }");
					proc.setString(1, category);
					proc.setString(2, fileName);
					proc.setString(3, hIDSerialID);
					proc.execute();
				}
			}
		
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0307","提交隐患失败!");
		} finally
	    {
	        try
	        {
	            if (proc != null)
	            	proc.close();
	            if (conn != null)
	            	conn.close();
	        }
	        catch (Exception e)
	        {
	        	logger.error(e.getMessage());
	            e.printStackTrace();
	        }
	    }	

		return returnString;
	}
	
	/**
	 * 获取附件列表
	 * @param
	 * @return
	 * @throws ServiceException 
	 */
	public JSONArray getDocumentData(String hIDSerialID) throws ServiceException {
		
		JSONArray jsonArray = new JSONArray();
		
		String strSql = "select IFSAPP.Safety_Hidden_Perils_api.Get_Doc_Info"
				+ "('" + hIDSerialID + "') as PATH from dual";
		
		try{
			List list = new IbatisDBUtil().executeSql(strSql);
			for(int i=0;i<list.size();i++){
				Map item=(Map)list.get(i);
				
				String paths = "";
				if(null!=item.get("PATH")) {
					paths = item.get("PATH").toString();
				}
				String[] path = paths.split("^");
				item.remove("PATH");
				for(int j=0;j<path.length;j++) {
					if(null!=path[j] && path[j].length()>0) {
						String url = getDocumentUrl(path[j]);
						item.put("URL", url);
					}
				}
				if(null!=item && item.size()>0) {
					JSONObject jsonObject = JsonUtil.mapToJsonObject(item);
					jsonArray.put(jsonObject);
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0306","获取附件失败");
		}
		
		logger.debug(jsonArray.toString());
		return	jsonArray;
	}

	private String getDocumentUrl(String path) {
		String[] pathStr = path.split("/");
		String docfile = pathStr[pathStr.length-1];
		docfile = "http://"+Constant.OUTER_IP + "/"+Constant.IFSDOC+"/" + docfile;
		return docfile;
	}
	
	private void writeDoc(byte[] fileContent, String filePath, String fileName) throws IOException {
		
		BufferedOutputStream bos = null;
		FileOutputStream fos = null;
		File file = null;
		File dir = new File(filePath);
		if (!dir.exists() && dir.isDirectory()) {
			dir.mkdirs();
		}
		file = new File(filePath + File.separator + fileName);
		fos = new FileOutputStream(file);
		bos = new BufferedOutputStream(fos);
		bos.write(fileContent);
//		fos = new FileOutputStream(file);
//		fos.write(fileContent);
//		fos.close(); 
		bos.close();
	}
}