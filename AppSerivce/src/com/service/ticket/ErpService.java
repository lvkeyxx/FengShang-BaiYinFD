package com.service.ticket;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.ticket.sql.ErpServiceSql;
import com.utility.IbatisDBUtil;
import com.utility.JdbcDBUtil;
import com.utility.JsonUtil;
import com.utility.baiyin.BaiyinUtils;

/**
 * @Author: MengQingNan
 * @Description: ERP审批相关服务
 * @Date: Created in 2018-04-16 10:30
 **/
public class ErpService extends AJsonService implements IJsonService{
	/**
	 * 获取ERP待办数量
	 */
	@SuppressWarnings("rawtypes")
	public String getTodoCount(Map<String, Object> query) throws ServiceException{
		String returnString = "{}";
		try{
			JdbcDBUtil jdbc = new JdbcDBUtil();
			UserProfile uProfile = ConfigCache.getInstance().getUserProfile(query.get(Constant.USER_ID).toString());
			List<Map> list = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), ErpServiceSql.getTodoCountSql());
			returnString = JsonUtil.mapToJsonString(list.get(0), "COUNT");
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7101", "获取ERP待办数量失败");
		}
		return returnString;
	}
	
	/**
	 * 获取ERP待办列表
	 */
	public String getTodoList(Map<String, Object> query) throws ServiceException{
		String returnString = "{}";
		try{
			JdbcDBUtil jdbc = new JdbcDBUtil();
			UserProfile uProfile = ConfigCache.getInstance().getUserProfile(query.get(Constant.USER_ID).toString());
			List<?> list = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), ErpServiceSql.getTodoListSql(query));
			returnString = JsonUtil.mapListToJsonList(list);
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7102", "获取ERP待办列表失败");
		}
		return returnString;
	}
	
	/**
	 * 获取业务类型
	 */
	public String getLuName(Map<String, Object> query) throws ServiceException{
		String returnString = "{}";
		try{
			List<?> list = new IbatisDBUtil().executeSql(ErpServiceSql.getLuNameSql());
			returnString = JsonUtil.mapListToJsonList(list);
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7103", "获取ERP业务类型失败");
		}
		return returnString;
	}
	
	/**
	 * 获取审批步骤
	 */
	@SuppressWarnings("unchecked")
	public String getStep(Map<String, Object> query) throws ServiceException{
		JSONObject result = new JSONObject();
		try{
			List<?> steps = new IbatisDBUtil().executeSql(ErpServiceSql.getStepSql(query));
			String total = ((Map<String, Object>)new IbatisDBUtil().executeSql(ErpServiceSql.getStepTotal(query)).get(0)).get("TOTAL").toString();
			result.put("list", steps);
			result.put("total", total);
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7104", "获取审批步骤失败");
		}
		return result.toString();
	}
	
	/**
	 * 获取审批文档
	 */
	@SuppressWarnings("unchecked")
	public String getDoc(Map<String, Object> query) throws ServiceException{
		String returnString = "{}";
		try{
			UserProfile uProfile = ConfigCache.getInstance().getUserProfile(query.get(Constant.USER_ID).toString());
			List<Map<String, Object>> list = new IbatisDBUtil().executeSql(ErpServiceSql.getDocSql(query));
			
			for(int i = 0, length = list.size(); i < length; i++){
				Map<String, Object> item = list.get(i);
				String fileUrl = BaiyinUtils.genLoacalFile(query, item, uProfile, item.get("PATH").toString(), url);
				item.put("FILE_URL", fileUrl);
			}
			
			returnString = JsonUtil.mapListToJsonList(list);
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7105", "获取审批文档失败");
		}
		return returnString;
	}
	
	/**
	 * 获取主子表主表数据
	 */
	public String getMainField(Map<String, Object> query) throws ServiceException{
		JSONArray result = new JSONArray();
		try{
			//首页主表数据
			result.put(ErpServiceSql.getMainField(query));
			//非首页主表数据
			query.put("whereIsChildView", true);
			result.put(ErpServiceSql.getMainField(query));
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7105", "获取主子表主表数据失败");
		}
		return result.toString();
	}
	
	/**
	 * 获取主子表子表数据
	 */
	public String getChildField(Map<String, Object> query) throws ServiceException{
		JSONArray result = new JSONArray();
		try{
			result = ErpServiceSql.getChildField(query);
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7106", "获取主子表子表数据失败");
		}
		return result.toString();
	}
	
	/**
	 * 审批同意
	 */
	public String startApprove(Map<String, Object> query) throws ServiceException{
		String result = "";
		try{
			JdbcDBUtil jdbc = new JdbcDBUtil();
			UserProfile uProfile = ConfigCache.getInstance().getUserProfile(query.get(Constant.USER_ID).toString());
			if(!ErpServiceSql.getCanApprove(query)) {
				result = "\"审批失败，审批已处理\"";
			}else{
				jdbc.callProcedure(uProfile.getUserId(), uProfile.getPassWord(), ErpServiceSql.getStartApproveSql(query));
			}
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7107", "审批同意失败");
		}
		return result;
	}
	
	/**
	 * 审批拒绝
	 */
	public String refuseApprove(Map<String, Object> query) throws ServiceException{
		String result = "";
		try{
			JdbcDBUtil jdbc = new JdbcDBUtil();
			UserProfile uProfile = ConfigCache.getInstance().getUserProfile(query.get(Constant.USER_ID).toString());
			if(!ErpServiceSql.getCanApprove(query)) {
				result = "\"审批失败，审批已处理\"";
			}else{
				jdbc.callProcedure(uProfile.getUserId(), uProfile.getPassWord(), ErpServiceSql.getRefuseApproveSql(query));
			}
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7108", "审批拒绝失败");
		}
		return result;
	}
	
	/**
	 * 获取ERP记录
	 */
	public String getRecordList(Map<String, Object> query) throws ServiceException{
		String returnString = "{}";
		try{
			JdbcDBUtil jdbc = new JdbcDBUtil();
			UserProfile uProfile = ConfigCache.getInstance().getUserProfile(query.get(Constant.USER_ID).toString());
			List<?> list = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), ErpServiceSql.getRecordListSql(query));
			returnString = JsonUtil.mapListToJsonList(list);
		}catch(Exception e){
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("7109", "获取ERP记录失败");
		}
		return returnString;
	}
}
