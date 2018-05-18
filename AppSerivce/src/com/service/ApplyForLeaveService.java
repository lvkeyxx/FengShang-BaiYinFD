package com.service;

import ipacs.dataaccess.service.ServiceManager;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.json.JSONObject;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.utility.DateHelper;
import com.utility.IbatisDBUtil;
import com.utility.JsonUtil;

public class ApplyForLeaveService  extends AJsonService implements IJsonService{
	
	/**
	 * 获得请假申请列表 
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForLeaveList(Map map) throws ServiceException{
		String returnString="{}";
		try{
			String 	userId=(String)map.get(Constant.USER_ID);
			String 	page = (String) map.get(Constant.PAGENO);
			String  state = (String) map.get("STATE");
			String  furloughType = (String) map.get("FURLOUGH_TYPE");
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
			
			String stateStr = "";
			if(null!=state && state.trim().length()>0) {
				stateStr = state;
			}
			String furloughTypeStr = "";
			if(null!=furloughType && furloughType.trim().length()>0) {
				furloughTypeStr = furloughType;
			}
			String simpleDateFormatStr = "yyyy-MM-dd";
			String startCreatedDateStr = "1900-01-01";
			if(null!=startCreatedDate && startCreatedDate.trim().length()>0 && !startCreatedDate.equals("startCreatedDate")) {
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
			
			String serviceSql="select APPLY_NO, TO_CHAR(ROWVERSION, 'YYYY-MM-DD') as BEGIN_TIME, "
					+ "Furlough_Apply_Type_API.Decode(furlough_type) as FURLOUGH_TYPE_NEW, "
					+ "FURLOUGH_TYPE, Furlough_Apply_API.Finite_State_Decode__(ROWSTATE) as APPLYFORLEAVESTATE, ROWSTATE "
					+ "from ifsapp.FURLOUGH_APPLY_TAB "
					+ "where proposer = '" + userId + "'"
					+ "and ROWSTATE like '%" + stateStr + "%' "
					+ "and FURLOUGH_TYPE like '%" + furloughTypeStr + "%' "
					+ "and to_char(ROWVERSION,'" + simpleDateFormatStr + "') >= '" + startCreatedDateStr + "' "
					+ "and to_char(ROWVERSION,'" + simpleDateFormatStr + "') < '" + endCreatedDateStr + "' "
					+ "order by BEGIN_TIME desc";
			String strSql = "select * from "
					+ "(select c.*,rownum as ROW_NUM from "
					+ "(" + serviceSql + ") c) where ROW_NUM > " + (pageInt-1)*pageCount
					+ " and  " + pageInt*pageCount + " >= ROW_NUM";
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = IbatisDBUtil.dataDictionary(list, "APPLYFORLEAVESTATE");
			returnString=JsonUtil.mapListToJsonString(list);
			returnString = returnString.replace("\r\n", "");
			returnString = returnString.replace("\t", "    ");
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0309","获取请假申请列表失败");
		}			
		return returnString;
	}
	
	/**
	 * 获得请假申请详细信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForLeaveDetail(Map map) throws ServiceException{
		
		String returnString="{}";
		String userId=(String)map.get(Constant.USER_ID);
		String applyNo = (String)map.get("APPLY_NO");
		
		String strSql="select a.APPLY_NO, TO_CHAR(a.ROWVERSION, 'YYYY-MM-DD') as BEGIN_TIME, "
				+ "a.CAUSATION, a.DAYS, TO_CHAR(a.BEGIN_DATE, 'YYYY-MM-DD') as BEGIN_DATE, "
				+ "TO_CHAR(a.END_DATE, 'YYYY-MM-DD') as END_DATE, a.APPLY_DESC, "
				+ "a.PROPOSER, a.DEPT_ID, b.STANDARD_FLOW_ID, "
				+ "TO_CHAR(a.APPLY_DATE, 'YYYY-MM-DD') as APPLY_DATE, "
				+ "a.EMPLOYEE_TYPE, b.EMPLOYEE_TYPE as EMPLOYEE_TYPE_NEW, a.HANDOVER_CONTENT, "
				+ "Furlough_Apply_Type_API.Decode(a.furlough_type) as FURLOUGH_TYPE_NEW, a.FURLOUGH_TYPE, "
				+ "Furlough_Apply_API.Finite_State_Decode__(a.ROWSTATE) as APPLYFORLEAVESTATE, a.ROWSTATE "
				+ "from ifsapp.FURLOUGH_APPLY_TAB a, ifsapp.FURLOUGH_APPLY b "
				+ "where a.APPLY_NO = b.APPLY_NO "
				+ "and a.PROPOSER = b.PROPOSER "
				+ "and a.PROPOSER = '" + userId + "' "
				+ "and a.APPLY_NO = '" + applyNo + "'";
		
		UserProfile userProfile = ConfigCache.getInstance().getUserProfile(userId);
		
		try{
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = IbatisDBUtil.dataDictionary(list, "APPLYFORLEAVESTATE");
			if(null!=list && list.size()==1){
				Map item=(Map)list.get(0);
				item.put("USER_NAME", userProfile.getNickName());
				item.put("ORG_NAME", userProfile.getOrgName());
				returnString=JsonUtil.mapToJSONObject(item).toString();
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0302","获取请假申请详细信息失败");
		}	

		return returnString;
	}
	
	/**
	 * 获得状态列表信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForLeaveState(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("APPLYFORLEAVESTATE");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
	
	/**
	 * 获得事由列表信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForLeaveFurloughType(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("FURLOUGH_APPLY_TYPE");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
	
	/**
	 * 获得人员类别列表信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForLeaveEmployeeType(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("EMPLOYEE_TYPE");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
		
	/**
	 * 提交请假申请
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String doApplyForLeaveDetail(Map map) throws ServiceException{
		String returnString="{}";
		
		String applyNo = "";
		if(map.containsKey("APPLY_NO")) {
			applyNo = (String) map.get("APPLY_NO");
		}
		
		String userId = (String) map.get(Constant.USER_ID);
		String actionType = (String) map.get("ACTION_TYPE");
		String applyDesc = (String) map.get("APPLY_DESC");
		String applyDate = (String) map.get("APPLY_DATE");
		String employeeType = (String) map.get("EMPLOYEE_TYPE");
		String furloughType = (String) map.get("FURLOUGH_TYPE");
		String beginDate = (String) map.get("BEGIN_DATE");
		String endDate = (String) map.get("END_DATE");
		String days = (String) map.get("DAYS");
		String causation = "";
		if(!"".equals(map.get("CAUSATION"))) {
			causation = (String) map.get("CAUSATION");
		}
		String handoverContent = "";
		if(!"".equals(map.get("HANDOVER_CONTENT"))) {
			handoverContent = (String) map.get("HANDOVER_CONTENT");
		}
		UserProfile userProfile = ConfigCache.getInstance().getUserProfile(userId);	
		
		DataSource dataSource = (DataSource) ServiceManager.getService("dataSource");
		Connection conn = null;
	    CallableStatement proc = null;
	    String strSql = "";
	    
		try{
			
			conn = dataSource.getConnection();
			if("save".equals(actionType)) {
				
				strSql = "call ifsapp.FURLOUGH_APPLY_API.Create_Fur_Apply_From_App"
						+ "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
				proc = conn.prepareCall("{ " + strSql + " }");
				proc.registerOutParameter("apply_no_", Types.VARCHAR);
				proc.setString("company_id_", Constant.COMPANY_ID);
				proc.setString("apply_desc_", applyDesc);
				proc.setString("proposer_", userId);
				proc.setString("dept_id_", userProfile.getOrgId());
				proc.setDate("apply_date_", new java.sql.Date(DateHelper.convertString2Date(applyDate, "yyyy-MM-dd").getTime()));
				proc.setString("employee_type_", employeeType);
				proc.setString("furlough_type_", furloughType);
				proc.setDate("begin_date_", new java.sql.Date(DateHelper.convertString2Date(beginDate, "yyyy-MM-dd").getTime()));
				proc.setDate("end_date_", new java.sql.Date(DateHelper.convertString2Date(endDate, "yyyy-MM-dd").getTime()));
				proc.setFloat("days_", Float.valueOf(days));
				proc.setString("causation_", causation);
				proc.setString("handover_content_", handoverContent);
				proc.execute();
				applyNo = proc.getString("apply_no_");
				JSONObject json = new JSONObject();
				json.put("APPLY_NO", applyNo);
				returnString = json.toString();
			} else if ("edit".equals(actionType)) {
				
				strSql = "call ifsapp.FURLOUGH_APPLY_API.Update_Fur_Apply_From_App"
						+ "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
				proc = conn.prepareCall("{ " + strSql + " }");
				proc.setString(1, applyNo);
				proc.setString(2, Constant.COMPANY_ID);
				proc.setString(3, applyDesc);
				proc.setString(4, userId);
				proc.setString(5, userProfile.getOrgId());
				proc.setDate(6, new java.sql.Date(DateHelper.convertString2Date(applyDate, "yyyy-MM-dd").getTime()));
				proc.setString(7, employeeType);
				proc.setString(8, furloughType);
				proc.setDate(9, new java.sql.Date(DateHelper.convertString2Date(beginDate, "yyyy-MM-dd").getTime()));
				proc.setDate(10, new java.sql.Date(DateHelper.convertString2Date(endDate, "yyyy-MM-dd").getTime()));
				proc.setInt(11, Integer.parseInt(days));
				proc.setString(12, causation);
				proc.setString(13, handoverContent);
				proc.execute();
			}  else if ("submit".equals(actionType)) {
			
				strSql = "call ifsapp.Approval_Routing_Api.Create_From_App(?, ?)";
				proc = conn.prepareCall("{ " + strSql + " }");
				proc.setString(1, "FurloughApply");
				proc.setString(2, "APPLY_NO=" + applyNo + "^COMPANY_ID=" + Constant.COMPANY_ID + "^");
				proc.execute();
			}
		
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0307","您的 账号出现故障,请及时与管理员联系!");
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
}