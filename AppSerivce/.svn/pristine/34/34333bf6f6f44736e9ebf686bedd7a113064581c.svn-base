package com.service.indexPage;

import java.util.List;
import java.util.Map;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.indexPage.sql.TaskServiceSQL;
import com.utility.JdbcDBUtil;
import com.utility.JsonUtil;

/**
 * @Author:wangyg
 * @Description:任务处理相关服务
 * @Date:Created in 2018-01-24 16:15
 * @Modied By:
 **/
public class TaskService  extends AJsonService implements IJsonService {
	/**
	 * 每日任务列表
	 */
	public String getDailyList(Map<String, Object> query) throws ServiceException{
		String returnString="{}";
		try{
			JdbcDBUtil jdbc = new JdbcDBUtil();
			UserProfile uProfile = ConfigCache.getInstance().getUserProfile(query.get(Constant.USER_ID).toString());
			List<?> list = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), TaskServiceSQL.getListSql("Daily", query));
			returnString = JsonUtil.mapListToJsonString(list);
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("6101","获取每日任务列表失败");
		}			
		return returnString;
	}
	
	/**
	 * 专项任务列表
	 */
	public String getSpecialList(Map<String, Object> query) throws ServiceException{
		String returnString="{}";
		try{
			JdbcDBUtil jdbc = new JdbcDBUtil();
			UserProfile uProfile = ConfigCache.getInstance().getUserProfile(query.get(Constant.USER_ID).toString());
			List<?> list = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), TaskServiceSQL.getListSql("Special", query));
			returnString = JsonUtil.mapListToJsonString(list);
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("6102","获取专项任务列表失败");
		}			
		return returnString;
	}
}
