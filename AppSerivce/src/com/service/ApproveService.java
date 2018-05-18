package com.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import sun.misc.BASE64Decoder;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.utility.DateHelper;
import com.utility.IbatisDBUtil;
import com.utility.JdbcDBUtil;
import com.utility.JsonUtil;
import com.utility.TokenUtils;
import com.utility.Utility;

public class ApproveService  extends AJsonService implements IJsonService{
	/**
	 * 获得待审列表 
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getUnApprvedList(Map map) throws ServiceException{
		String returnString="{}";
		try{
			String 	userId=(String)map.get(Constant.USER_ID);
			String 	page = (String) map.get(Constant.PAGENO);
			int pageInt = 1;
			if(null!=page&&page.trim().length()>0) pageInt=Integer.valueOf(page);
			if(pageInt < 1) pageInt = 1;
			int pageCount = 12;
			//userId="HEY";
			String serviceSql="select IDENTITY, PERSON_NAME, to_char(CREATED_DATE,'yyyy/MM/DD hh24:mm:ss') as CREATED_DATE, "
					+ "LU_NAME, KEY_REF, LINE_NO, STEP_NO, STANDARD_FLOW_ID, SUBMIT_PERSON, SUBMIT_PERSON_NAME,  "
					+ "to_char(SUBMIT_DATE,'yyyy/MM/DD hh24:mm:ss') as SUBMIT_DATE, TITLE, ITEM_MESSAGE, FORM_INFO "
					+ "from ifsapp.APP_FORM_INFO where IDENTITY= '" + userId + "' order by CREATED_DATE desc";
//			strSql="APP_FORM_INFO   where 1=1 and rownum<=10;";
			String strSql = "select * from "
					+ "(select c.*,rownum as ROW_NUM from "
					+ "(" + serviceSql + ") c) where ROW_NUM > " + (pageInt-1)*pageCount
					+ " and  " + pageInt*pageCount + " >= ROW_NUM";
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = encodeBizPK(list, userId) ;
					
//			returnString=JsonUtil.mapListToJsonString((ArrayList<?>)list,"IDENTITY,LU_NAME");
			returnString=JsonUtil.mapListToJsonString(list);
			returnString = returnString.replace("\r\n", "");
			returnString = returnString.replace("\n", "");
			returnString = returnString.replace("\r", "");
			returnString = returnString.replace("\t", "");
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0301","获取待审列表失败");
		}			
		return returnString;
	}
	/**
	 * 获得已结审批列表 
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getDoneApprvedList(Map map) throws ServiceException{
		String returnString="{}";
		try{
			String 	userId=(String)map.get(Constant.USER_ID);
			String 	page = (String) map.get(Constant.PAGENO);
			String  title = (String) map.get("TITLE");
			/*if(map.containsKey("TITLE")) {
				String[] unicodes = title.split(";");
				StringBuffer sb = new StringBuffer();
				for(String unicode : unicodes) {
					if(unicode.startsWith("&#")) {
						Integer i = Integer.valueOf(unicode.replace("&#", ""));
						char c = (char) i.intValue();
						sb.append(c);
					}
				}
				title = sb.toString();
//				title = new String(title.getBytes("ISO-8859-1"), "UTF-8");
			}*/
			String  fromClient = (String) map.get("FROM_CLIENT");
			String  startCreatedDate = (String) map.get("START_CREATED_DATE");
			String  endCreatedDate = (String) map.get("END_CREATED_DATE");
			
			int pageInt = 1;
			if(null!=page && page.trim().length()>0) {
				pageInt=Integer.valueOf(page);
			}
			if(pageInt < 1) {
				pageInt = 1;
			}
			int pageCount = 12;
			
			String titleStr = "";
			if(null!=title && title.trim().length()>0) {
				titleStr = title;
			}
			String fromClientStr = "";
			if(null!=fromClient && fromClient.trim().length()>0) {
				fromClientStr = fromClient;
			}
			String simpleDateFormatStr = "yyyy-MM-dd";
			String startCreatedDateStr = "1900-01-01";
			if(null!=startCreatedDate && startCreatedDate.trim().length()>0) {
				long dateLong = Long.parseLong(startCreatedDate);
				Date date = new Date(dateLong);
				startCreatedDateStr = DateHelper.convertDate2String(date, simpleDateFormatStr);
			}
			String endCreatedDateStr = "2999-12-31";
			if(null!=endCreatedDate && endCreatedDate.trim().length()>0) {
				long dateLong = Long.parseLong(endCreatedDate);
				Date date = new Date(dateLong);
				endCreatedDateStr = DateHelper.convertDate2String(date, simpleDateFormatStr);
			}
			
			//userId="HEY";
			String serviceSql="select afi.title, to_char(afi.CREATED_DATE,'yyyy/MM/DD hh24:mm:ss') as CREATED_DATE,aal.FROM_CLIENT,aal.LOG_NO "
					+ "from ifsapp.APP_FORM_INFO_DONE afi "
					+ "RIGHT JOIN (select lu_name,key_ref,LINE_NO,step_no,MAX(LOG_NO) as LOG_NO, FROM_CLIENT, PERSON "
					+ "from IFSAPP.APPROVAL_ACTION_LOG "
					+ "group by lu_name,key_ref,line_no,step_no,FROM_CLIENT,PERSON) aal "
					+ "on afi.LU_NAME = aal.LU_NAME "
					+ "and afi.KEY_REF = aal.KEY_REF "
					+ "and afi.LINE_NO = aal.LINE_NO "
					+ "and afi.STEP_NO = aal.STEP_NO "
					+ "where afi.TITLE like '%" + titleStr + "%' "
					+ "and aal.FROM_CLIENT like '%" + fromClientStr + "%' "
					+ "and to_char(afi.CREATED_DATE,'" + simpleDateFormatStr + "') >= '" + startCreatedDateStr + "' "
					+ "and to_char(afi.CREATED_DATE,'" + simpleDateFormatStr + "') < '" + endCreatedDateStr + "' "
					+ "and afi.IDENTITY = '" + userId + "' "
					+ "and afi.completed_by = '" + userId + "' "
					+ "and aal.PERSON = afi.IDENTITY "
					+ "order by afi.completed_date desc";
//			strSql="APP_FORM_INFO   where 1=1 and rownum<=10;";
			String strSql = "select * from "
					+ "(select c.*,rownum as ROW_NUM from "
					+ "(" + serviceSql + ") c) where ROW_NUM > " + (pageInt-1)*pageCount
					+ " and  " + pageInt*pageCount + " >= ROW_NUM";
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
//			list = encodeBizPK(list, userId) ;
					
//			returnString=JsonUtil.mapListToJsonString((ArrayList<?>)list,"IDENTITY,LU_NAME");
			returnString=JsonUtil.mapListToJsonString(list);
			returnString = returnString.replace("\r\n", "");
			returnString = returnString.replace("\n", "");
			returnString = returnString.replace("\r", "");
			returnString = returnString.replace("\t", "");
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0309","获取审批历史列表失败");
		}			
		return returnString;
	}
	
	/**
	 * KEY_REF 存在http协议不能转换的字符，考虑转义传送
	 * @param list
	 * @param userId TODO
	 * @return
	 */
	private List<Map> encodeBizPK(List<Map> list, String userId) {
		List<Map> listReturn= new ArrayList();
		
		for(int i=0;i<list.size();i++){
			Map map=(Map)list.get(i);			
			String 	KEY_REF=(String)map.get(Constant.KEY_REF);		
			
			//String encodeKEY_REF=URLEncoder.encode(KEY_REF);
			String encodeKEY_REF=TokenUtils.makeMD5ForBizKey(KEY_REF);
			//encodeKEY_REF=KEY_REF;	todo 20170107     测试若失败 ，则打开 屏蔽

			
			UserProfile userProfile=ConfigCache.getInstance().getUserProfile(userId);	
			userProfile.getBizMap().put(encodeKEY_REF, KEY_REF);
			ConfigCache.getInstance().setUserProfile(userId,userProfile);	
			
			
			map.put(Constant.KEY_REF,encodeKEY_REF);			
			listReturn.add(map);
		}
		return listReturn;
	}

	/**
	 * 获得待审详细信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getUnApprvedDetail(Map map) throws ServiceException{
		String returnString="{}";
		String 	userId=(String)map.get(Constant.USER_ID);
		String 	LU_NAME=(String)map.get(Constant.IFS_LU_NAME);
		String 	KEY_REF=(String)map.get(Constant.KEY_REF);
		String 	LINE_NO=(String)map.get(Constant.IFS_LINE_NO);
		String 	STEP_NO=(String)map.get(Constant.IFS_STEP_NO);
		
		UserProfile userProfile=ConfigCache.getInstance().getUserProfile(userId);	
		KEY_REF=""+userProfile.getBizMap().get(KEY_REF);
		
		//userId="HEY";
		//todo 可能存在风险，改用 ibatis orm
		String strSql="select afi.*, art.group_id from "
				+ "(select IDENTITY, PERSON_NAME, to_char(CREATED_DATE,'yyyy/MM/DD hh24:mm:ss') as CREATED_DATE, "
					+ "LU_NAME, KEY_REF, LINE_NO, STEP_NO, STANDARD_FLOW_ID, SUBMIT_PERSON, SUBMIT_PERSON_NAME,  "
					+ "to_char(SUBMIT_DATE,'yyyy/MM/DD hh24:mm:ss') as SUBMIT_DATE, TITLE, ITEM_MESSAGE, FORM_INFO"
					+ " from ifsapp.APP_FORM_INFO 	where 	IDENTITY= '" 			+ userId + "'"
									+" 	and 	LU_NAME= '" 			+ LU_NAME + "'"
									+"	and 	KEY_REF= '" 			+ KEY_REF + "'"
									+"	and 	LINE_NO= " 				+ LINE_NO + ""
									+"	and 	STEP_NO= " 				+ STEP_NO + ") afi "
					+ "left join ifsapp.approval_routing_tab art "
					+ "on afi.lu_name = art.lu_name "
					+ "and afi.key_ref = art.key_ref "
					+ "and afi.line_no = art.line_no "
					+ "and afi.step_no = art.step_no"
									;
		
		try{
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = encodeBizPK(list, userId) ;
			if(null!=list && list.size()==1){	//todo 若返回多条记录如何处理?
				Map item=(Map)list.get(0);
				String formInfo=(String)item.get("FORM_INFO");
				formInfo=Utility.stringReplaceAll(formInfo,'\136','\013');
				item.put("FORM_INFO",JsonUtil.transform2JsonArrayString(formInfo,"\013\013","\013"));
//保留错误案例		returnString=JsonUtil.mapToJsonString(item);
				
				//增加附件
				JSONArray jsonArray = getDocumentData(LU_NAME, KEY_REF);
				item.put("ATTACHMENT", jsonArray);
				
				returnString=JsonUtil.mapToJSONObject(item).toString();
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0302","获取待审详细信息失败");
		}	

	//	returnString=JsonUtil.mapListToJsonString((ArrayList<?>)list,"IDENTITY,LU_NAME");
		
		return returnString;
	}
	
	/**
	 * 获得审批历史详细信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getDoneApprvedDetail(Map map) throws ServiceException{
		String returnString="{}";
		String 	userId=(String)map.get(Constant.USER_ID);
		String 	logNo=(String)map.get("LogNo");
		
		//userId="HEY";
		//todo 可能存在风险，改用 ibatis orm
		String strSql="select afi.*,art.APP_INFO from ("
				+ "select IDENTITY,PERSON_NAME,to_char(MAX(CREATED_DATE),'yyyy/MM/DD hh24:mm:ss') as CREATED_DATE,LU_NAME,"
				+ "KEY_REF,LINE_NO,STEP_NO,STANDARD_FLOW_ID,SUBMIT_PERSON, "
				+ "SUBMIT_PERSON_NAME,to_char(SUBMIT_DATE,'yyyy/MM/DD hh24:mm:ss') as SUBMIT_DATE,TITLE,MAX(ITEM_MESSAGE) as ITEM_MESSAGE,FORM_INFO,"
				+ "COMPLETED_BY,COMPLETE_NAME,NVL(APPROVAL_STATE,'OTHER') as APPROVAL_STATE,to_char(COMPLETED_DATE,'yyyy/MM/DD hh24:mm:ss') as COMPLETED_DATE "
				+ "from ifsapp.APP_FORM_INFO_DONE "
				+ "group by IDENTITY,PERSON_NAME,LU_NAME,KEY_REF,LINE_NO,STEP_NO,STANDARD_FLOW_ID,SUBMIT_PERSON, "
				+ "SUBMIT_PERSON_NAME,SUBMIT_DATE,TITLE,FORM_INFO,COMPLETED_BY,COMPLETE_NAME,APPROVAL_STATE,COMPLETED_DATE) afi "
				+ "RIGHT JOIN (select lu_name,key_ref,LINE_NO,step_no,MAX(LOG_NO) as LOG_NO, FROM_CLIENT, PERSON "
				+ "from IFSAPP.APPROVAL_ACTION_LOG "
				+ "group by lu_name,key_ref,line_no,step_no,FROM_CLIENT,PERSON) aal "
				+ "on afi.LU_NAME = aal.LU_NAME "
				+ "and afi.KEY_REF = aal.KEY_REF "
				+ "and afi.LINE_NO = aal.LINE_NO "
				+ "and afi.STEP_NO = aal.STEP_NO "
				+ "INNER JOIN ifsapp.APPROVAL_ROUTING_TAB art "
				+ "on afi.LU_NAME = art.LU_NAME "
				+ "and afi.KEY_REF = art.KEY_REF "
				+ "and afi.LINE_NO = art.LINE_NO "
				+ "and afi.STEP_NO = art.STEP_NO "
				+ "where afi.IDENTITY= '" + userId + "' "
				+ "and afi.completed_by= '" + userId + "' "
				+ "and LOG_NO =  " + logNo + " "
				+ "and aal.PERSON =afi.IDENTITY "
				+ "order by afi.completed_date desc"
				;
		
		try{
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = encodeBizPK(list, userId) ;
			list = IbatisDBUtil.dataDictionary(list, "APPROVAL_STATE");
			if(null!=list && list.size()==1){
				Map item=(Map)list.get(0);
				String formInfo=(String)item.get("FORM_INFO");
				formInfo=Utility.stringReplaceAll(formInfo,'\136','\013');
				item.put("FORM_INFO",JsonUtil.transform2JsonArrayString(formInfo,"\013\013","\013"));
				
				//增加附件
				String 	LU_NAME=(String)item.get(Constant.IFS_LU_NAME);
				String 	KEY_REF=(String)item.get(Constant.KEY_REF);
				JSONArray jsonArray = getDocumentData(LU_NAME, KEY_REF);
				item.put("ATTACHMENT", jsonArray);
				
				returnString=JsonUtil.mapToJSONObject(item).toString();
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0310","获取审批历史详细信息失败");
		}	

	//	returnString=JsonUtil.mapListToJsonString((ArrayList<?>)list,"IDENTITY,LU_NAME");
		
		return returnString;
	}
	
	/**
	 * 处理审批 
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String doApprvedDetail(Map map) throws ServiceException{
		String returnString="{}";
		String 	userId=(String)map.get(Constant.USER_ID);
		
		String 	LU_NAME=(String)map.get(Constant.IFS_LU_NAME);
		String 	KEY_REF=(String)map.get(Constant.KEY_REF);
		String 	LINE_NO=(String)map.get(Constant.IFS_LINE_NO);
		String 	STEP_NO=(String)map.get(Constant.IFS_STEP_NO);
		String 	groupId=(String)map.get("GROUP_ID");
		
		UserProfile userProfile=ConfigCache.getInstance().getUserProfile(userId);	
		KEY_REF=""+userProfile.getBizMap().get(KEY_REF);
		
		String 	IFS_APP_FORM_INFO=(String)map.get(Constant.IFS_APP_FORM_INFO);
		String 	IFS_APPROVAL_STATUS=(String)map.get(Constant.IFS_APPROVAL_STATUS);
	
		if(null==IFS_APP_FORM_INFO || IFS_APP_FORM_INFO.trim().length()<=0){
			throw new ServiceException("0303","审批意见不能为空");
		}
		if(null==IFS_APPROVAL_STATUS || (!IFS_APPROVAL_STATUS.equals(Constant.IFS_APPROVAL_APPROVE) && !IFS_APPROVAL_STATUS.equals(Constant.IFS_APPROVAL_REJECT))){
			throw new ServiceException("0304","审批状态值非法");
		}
		
		String STATE = "";
		boolean state = true;
		String[] checkFunction = {"CHECK_CAN_APPROVE_STEP","CHECK_CAN_REJECT_STEP"};
		for(int i=0;i<checkFunction.length;i++){
			String strState = "select IFSAPP.APPROVAL_ROUTING_API."+checkFunction[i]+"("
					+"'"+LU_NAME+"',"
					+"'"+KEY_REF+"',"
					+"'"+LINE_NO+"',"
					+"'"+STEP_NO+"',"	
					+"'"+userId+"',"
					+"'"+groupId+"'"
					+")  as STATE from dual";
			List stateList = new IbatisDBUtil().executeSql(strState);
			if(null!=stateList&&stateList.size()==1) {
				Map item=(Map)stateList.get(0);
				STATE=(String)item.get("STATE");
				if("FALSE".equals(STATE)) {
					state = false;
				}
			}
		}
		if(!state){
			throw new ServiceException("0308","您没有足够权限来批准或拒绝步骤,请与管理员联系");
		}
		
		//returnString= "{'APPROVAL_RESULT':'OK','"+Constant.IFS_APPROVAL_STATUS+"':'"+IFS_APPROVAL_STATUS+"'}";
		
		//userId="HEY";
		String strSql	="call ifsapp.app_form_approve_api.Set_Next_App_Step_Customer("
						+"'"+LU_NAME+"',"
						+"'"+KEY_REF+"',"
						+"'"+LINE_NO+"',"
						+"'"+STEP_NO+"',"	
						+"'"+IFS_APP_FORM_INFO+"',"
						+"'"+IFS_APPROVAL_STATUS+"'"
						+")";
		try{
//			returnString= ""+new IbatisDBUtil().executeSql(strSql);			
			
			String password=ConfigCache.getInstance().getUserProfile(userId).getPassWord();			
			JdbcDBUtil jdbc =new JdbcDBUtil();
			boolean bRc=jdbc.callProcedure(userId, password, strSql);
			if(!bRc) throw new ServiceException("0305","ERP调用存储过程失败!");
			
		} catch (SQLException e) {
			String code="0306";
			String message = e.getMessage();
			logger.error(message);
			e.printStackTrace();
			if(null!=message && message.indexOf("ORA-01017")>=0){
				code="0399";
				message = "ERP调用存储过程失败!请与系统管理员联系";
				logger.error(e.getMessage());
			}
			throw new ServiceException(code,"请确认你的登录密码,检查权限问题或与系统管理员联系");
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0307","您的 账号出现故障,请及时与管理员联系!");
		}		

		return returnString;
	}
	
	/**
	 * 获取附件列表
	 * @param
	 * @return
	 * @throws ServiceException 
	 */
	public JSONArray getDocumentData(String luName, String keyRef) throws ServiceException {
		
		JSONArray jsonArray = new JSONArray();
		
		String strSql = "select TITLE,ifsapp.EDM_FILE_API.Get_Edm_Repository_Info( doc_class , doc_no ,doc_sheet ,doc_rev ,doc_type ) as PATH "
				+ "from ifsapp.doc_reference_obj_ext_details v "
				+ "where v.lu_name='" + luName + "' "
				+ "and v.key_ref='" + keyRef + "'";
		
		try{
			List list = new IbatisDBUtil().executeSql(strSql);
			for(int i=0;i<list.size();i++){
				Map item=(Map)list.get(i);
				
				String path=""+item.get("PATH");
				item.remove("PATH");
				String url = getDocumentUrl(path);
				item.put("URL", url);
				JSONObject jsonObject = JsonUtil.mapToJsonObject(item);
				jsonArray.put(jsonObject);
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0306","获取待审附件失败");
		}
		
		logger.debug(jsonArray.toString());
		return	jsonArray;
	}

	private String getDocumentUrl(String path) {
		String formInfo = Utility.stringReplaceAll(path,'\136','\013');
		JSONObject jsonObect = JsonUtil.transform2JsonObjectString(formInfo,"\013","=");
		String docfile = "";
		try {
			docfile = (String) jsonObect.get("REMOTE_FILE_NAME");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		//String uri = (String) ConfigCache.getInstance().getMapSysConfig(Constant.SERVER_URI + Thread.currentThread().getId());
		docfile = "http://"+url + "/"+Constant.IFSDOC+"/" + docfile;
		return docfile;
	}
	
	/**
	 * 获得待审个数
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getUnApprvedCount(Map map) throws ServiceException{
		String returnString="{}";
		try{
			String 	userId=(String)map.get(Constant.USER_ID);
			String strSql="select count(IDENTITY) as cnt from ifsapp.APP_FORM_INFO where IDENTITY= '" + userId + "'";
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			returnString=JsonUtil.mapListToJsonString(list);
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0308","获取待审任务数量失败");
		}			
		return returnString;
	}
	
	public int getUnApprvedCountInteger(Map map){
		
		int returnInt = 0;
		try{
			String jsonStr = getUnApprvedCount(map);
			JSONArray jsonArray = new JSONArray(jsonStr);
			if(null!=jsonArray&&jsonArray.length()==1){
				JSONObject jsonObject = jsonArray.getJSONObject(0);
				returnInt = (Integer) jsonObject.get("CNT");
			}
		} catch (Exception e) {
			return returnInt;
		}			
		return returnInt;
	}
	
	/**
	 * 获得审批流程信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApprvedStream(Map map) throws ServiceException{
		String returnString="{}";
		String 	userId=(String)map.get(Constant.USER_ID);
		String 	LU_NAME=(String)map.get(Constant.IFS_LU_NAME);
		String 	KEY_REF=(String)map.get(Constant.KEY_REF);
		
		UserProfile userProfile=ConfigCache.getInstance().getUserProfile(userId);	
		KEY_REF=""+userProfile.getBizMap().get(KEY_REF);
		
		String strSql="select * from (select art.LU_NAME,art.KEY_REF,art.LINE_NO,art.STEP_NO,art.CURRENT_STEP_NO, "
				+ "NVL(aal.person,'') as APP_SIGN,NVL(aal.ACTION_TYPE,'OTHER') as APPROVAL_STATUS,NVL(art.APP_INFO,'') as APP_INFO,"
				+ "NVL(to_char(aal.ACTION_DATE,'yyyy/MM/DD hh24:mm:ss'),'') as APP_DATE,dgm.PERSON_ID "
				+ "from ifsapp.APPROVAL_ROUTING_TAB art "
				+ "LEFT JOIN (select group_id, "
				//LISTAGG()此方法只适用于oracle12c版本，较低版本请用WMSYS.WM_CONCAT()方法代替
				+ "LISTAGG(person_id, ', ') WITHIN GROUP(ORDER BY person_id) AS PERSON_ID "
				+ "from ifsapp.document_group_members_tab group by group_id) dgm "
				+ "on dgm.group_id = art.group_id "
				+ "RIGHT JOIN APPROVAL_ACTION_LOG aal "
				+ "on aal.LU_NAME = art.LU_NAME "
				+ "and aal.KEY_REF = art.KEY_REF "
				+ "and aal.LINE_NO = art.LINE_NO "
				+ "and aal.STEP_NO = art.STEP_NO "
				+ "where art.lu_name='" + LU_NAME + "' "
				+ "and art.key_ref='" + KEY_REF + "' "
				+ "order by aal.log_no asc,art.line_no asc,art.step_no asc )"
				+ " UNION ALL "
				+ "select * from (select art.LU_NAME,art.KEY_REF,art.LINE_NO,art.STEP_NO,art.CURRENT_STEP_NO, "
				+ "NVL(art.APP_SIGN,''),NVL(art.APPROVAL_STATUS,'OTHER'),NVL(art.APP_INFO,''),NVL(to_char(art.APP_DATE,'yyyy/MM/DD hh24:mm:ss'),''),dgm.PERSON_ID "
				+ "from ifsapp.APPROVAL_ROUTING_TAB art "
				+ "LEFT JOIN (select group_id,"
				+ "LISTAGG(person_id, ', ') WITHIN GROUP(ORDER BY person_id) AS PERSON_ID "
				+ "from ifsapp.document_group_members_tab group by group_id) dgm "
				+ "on dgm.group_id = art.group_id "
				+ "where art.line_no >= art.current_step_no "
				+ "and art.lu_name='" + LU_NAME + "' "
				+ "and art.key_ref='" + KEY_REF + "' "
				+ "order by art.line_no asc,art.step_no asc)"
				;
		
		try{
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = encodeBizPK(list, userId) ;
			list = IbatisDBUtil.dataDictionary(list, "APPROVAL_STATUS","APP_SIGN","PERSON_ID");
			returnString=JsonUtil.mapListToJsonString(list);
			
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0311","获取审批流程信息失败");
		}	

		return returnString;
	}
}