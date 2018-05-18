package com.service;

import ipacs.dataaccess.service.ServiceManager;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
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

public class ApplyForBusinessTravelService extends AJsonService implements IJsonService{
	
	/**
	 * 获得出差申请列表 
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForBusinessTravelList(Map map) throws ServiceException{
		String returnString="{}";
		try{
			String 	userId=(String)map.get(Constant.USER_ID);
			String 	page = (String) map.get(Constant.PAGENO);
			String  state = (String) map.get("STATE");
			String  applyDesc = (String) map.get("APPLY_DESC");
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
			String applyDescStr = "";
			if(null!=applyDesc && applyDesc.trim().length()>0) {
				applyDescStr = applyDesc;
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
			
			String serviceSql="select a.APPLY_NO, TO_CHAR(a.ROWVERSION, 'YYYY-MM-DD') as BEGIN_TIME, "
					+ "a.APPLY_DESC, b.APPROVE_STATUS "
					+ "from ifsapp.BUSINESS_TRIP_TAB a, ifsapp.BUSINESS_TRIP b "
					+ "where a.APPLY_NO = b.APPLY_NO and a.PROPOSER = b.PROPOSER and a.SPECIALTY = '1' "
					+ "and a.proposer = '" + userId + "'"
					+ "and b.APPROVE_STATUS like '%" + stateStr + "%' "
					+ "and a.APPLY_DESC like '%" + applyDescStr + "%' "
					+ "and to_char(a.ROWVERSION,'" + simpleDateFormatStr + "') >= '" + startCreatedDateStr + "' "
					+ "and to_char(a.ROWVERSION,'" + simpleDateFormatStr + "') < '" + endCreatedDateStr + "' "
					+ "order by a.ROWVERSION desc";
			String strSql = "select * from "
					+ "(select c.*,rownum as ROW_NUM from "
					+ "(" + serviceSql + ") c) where ROW_NUM > " + (pageInt-1)*pageCount
					+ " and  " + pageInt*pageCount + " >= ROW_NUM";
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			returnString=JsonUtil.mapListToJsonString(list);
			returnString = returnString.replace("\r\n", "");
			returnString = returnString.replace("\t", "    ");
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0309","获取出差申请列表失败");
		}			
		return returnString;
	}

	/**
	 * 获得出差申请详细信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForBusinessTravelDetail(Map map) throws ServiceException{
		
		String returnString="{}";
		String userId=(String)map.get(Constant.USER_ID);
		String applyNo = (String)map.get("APPLY_NO");
		
		String strSql="select a.APPLY_NO, TO_CHAR(a.ROWVERSION, 'YYYY-MM-DD') as BEGIN_TIME, "
				+ "a.SPECIALTY, b.SPECIALTY as SPECIALTY_NEW, b.APPROVE_STATUS, a.DEPT_ID, "
				+ "a.CREATOR, (select USER_NAME from SDICAPP.SDIC_APP_USER where LOGIN_NAME = a.CREATOR) as CREATOR_NEW, "
				+ "a.PROPOSER, a.APPLY_DESC, a.APPLY_DATE, b.STANDARD_FLOW_ID, "
				+ "a.EMPLOYEE_TYPE, b.EMPLOYEE_TYPE as EMPLOYEE_TYPE_NEW, a.BEGIN_DATE, a.END_DATE, a.DAYS, "
				+ "a.TRANSPORTATION, a.TRANSPORTATION as TRANSPORTATION_NEW, a.DESTINATION "
				+ "from ifsapp.BUSINESS_TRIP_TAB a, ifsapp.BUSINESS_TRIP b "
				+ "where a.APPLY_NO = b.APPLY_NO and a.PROPOSER = b.PROPOSER "
				+ "and a.PROPOSER = '" + userId + "' "
				+ "and a.APPLY_NO = '" + applyNo + "'";
		
		UserProfile userProfile = ConfigCache.getInstance().getUserProfile(userId);
		
		try{
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			list = IbatisDBUtil.dataDictionary(list, "TRANSPORTATION");
			if(null!=list && list.size()==1){
				Map item=(Map)list.get(0);
				item.put("USER_NAME", userProfile.getNickName());
				item.put("ORG_NAME", userProfile.getOrgName());
				returnString=JsonUtil.mapToJSONObject(item).toString();
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0302","获取出差申请详细信息失败");
		}	

		return returnString;
	}
	
	/**
	 * 获得状态列表信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForBusinessTravelState(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("APPLYFORLEAVESTATE");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
	
	/**
	 * 获得人员类别列表信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForBusinessTravelEmployeeType(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("EMPLOYEE_TYPE");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
	
	/**
	 * 获得交通工具列表信息
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String getApplyForBusinessTravelTransprtation(Map map) throws ServiceException{
		
		String returnString="{}";
		List<Map> list = IbatisDBUtil.getDictionaryValue("TRANSPORTATION");
		returnString = JsonUtil.mapListToJsonString(list).toString();
		return returnString;
	}
	
	/**
	 * 提交出差申请
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String doApplyForBusinessTravelDetail(Map map) throws ServiceException{
		String returnString="{}";
		
		String applyNo = "";
		if(map.containsKey("APPLY_NO")) {
			applyNo = (String) map.get("APPLY_NO");
		}
		
		String userId = (String) map.get(Constant.USER_ID);
		String creator = userId;
		String actionType = (String) map.get("ACTION_TYPE");
		String applyDesc = (String) map.get("APPLY_DESC");
		String applyDate = (String) map.get("APPLY_DATE");
		String employeeType = (String) map.get("EMPLOYEE_TYPE");
		String specialty = "出差";
		String beginDate = (String) map.get("BEGIN_DATE");
		String endDate = (String) map.get("END_DATE");
		String days = (String) map.get("DAYS");
		String transportation = (String) map.get("TRANSPORTATION");
		String destination = (String) map.get("DESTINATION");
		
		UserProfile userProfile = ConfigCache.getInstance().getUserProfile(userId);	
		
		DataSource dataSource = (DataSource) ServiceManager.getService("dataSource");
		Connection conn = null;
	    CallableStatement proc = null;
	    String strSql = "";
	    
		try{
			
			conn = dataSource.getConnection();
			if("save".equals(actionType)) {
				
				strSql = "call ifsapp.BUSINESS_TRIP_API.Create_Trip_Apply_From_App"
						+ "(?, ?, ?, ?, ?, ?,"
						+ " ?, ?, ?, ?, ?, ?, ?, ?)";
				proc = conn.prepareCall("{ " + strSql + " }");
				proc.registerOutParameter(1, Types.VARCHAR);
				proc.setString(2, Constant.COMPANY_ID);
				proc.setString(3, applyDesc);
				proc.setString(4, userId);
				proc.setString(5, creator);
				proc.setString(6, userProfile.getOrgId());
				proc.setDate(7, new java.sql.Date(DateHelper.convertString2Date(applyDate, "yyyy-MM-dd").getTime()));
				proc.setString(8, employeeType);
				proc.setString(9, specialty);
				proc.setDate(10, new java.sql.Date(DateHelper.convertString2Date(beginDate, "yyyy-MM-dd").getTime()));
				proc.setDate(11, new java.sql.Date(DateHelper.convertString2Date(endDate, "yyyy-MM-dd").getTime()));
				proc.setInt(12, Integer.parseInt(days));
				proc.setString(13, transportation);
				proc.setString(14, destination);
				proc.execute();
				applyNo = proc.getString(1);
				JSONObject json = new JSONObject();
				json.put("APPLY_NO", applyNo);
				returnString = json.toString();
			} else if ("edit".equals(actionType)) {
				
				strSql = "call ifsapp.BUSINESS_TRIP_API.Update_Trip_Apply_From_App"
						+ "(?, ?, ?, ?, ?, ?,"
						+ " ?, ?, ?, ?, ?, ?, ?, ?)";
				proc = conn.prepareCall("{ " + strSql + " }");
				proc.setString(1, applyNo);
				proc.setString(2, Constant.COMPANY_ID);
				proc.setString(3, applyDesc);
				proc.setString(4, userId);
				proc.setString(5, creator);
				proc.setString(6, userProfile.getOrgId());
				proc.setDate(7, new java.sql.Date(DateHelper.convertString2Date(applyDate, "yyyy-MM-dd").getTime()));
				proc.setString(8, employeeType);
				proc.setString(9, specialty);
				proc.setDate(10, new java.sql.Date(DateHelper.convertString2Date(beginDate, "yyyy-MM-dd").getTime()));
				proc.setDate(11, new java.sql.Date(DateHelper.convertString2Date(endDate, "yyyy-MM-dd").getTime()));
				proc.setInt(12, Integer.parseInt(days));
				proc.setString(13, transportation);
				proc.setString(14, destination);
				proc.execute();
			}  else if ("submit".equals(actionType)) {
			
				strSql = "call ifsapp.Approval_Routing_Api.Create_From_App(?, ?)";
				proc = conn.prepareCall("{ " + strSql + " }");
				proc.setString(1, "BusinessTrip");
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
