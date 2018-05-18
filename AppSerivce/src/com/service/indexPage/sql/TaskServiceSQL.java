package com.service.indexPage.sql;

import java.util.HashMap;
import java.util.Map;

import com.utility.baiyin.BaiyinUtils;

/**
 * @Author:wangyg
 * @Description:任务处理的相关SQL
 * @Date:Created in 2018-01-24 16:15
 * @Modied By:
 **/
public class TaskServiceSQL{
	/*查询SQL集合*/
	@SuppressWarnings("serial")
	private static final Map<String, String> Select = new HashMap<String, String>(){{
		//日常
		put("Daily", "SELECT rownum rn, daily_work_no, item_name, IFSAPP.COMPANY_SITE_API.Get_Description(contract) AS contract , IFSAPP.PERSON_INFO_API.GET_NAME(item_responser) AS item_responser, responser_dept , IFSAPP.PERSON_INFO_API.GET_NAME(item_superviser) AS item_superviser, superviser_dept, create_time , plan_finish_time, real_finish_time, state, remark FROM IFSAPP.PRODUCT_DAILY_WORK ");
		//专项
		put("Special", "SELECT rownum rn, special_work_no, item_name, item_catelogy, IFSAPP.COMPANY_SITE_API.Get_Description(CONTRACT) AS CONTRACT , IFSAPP.PERSON_INFO_API.GET_NAME(item_responser) AS item_responser, IFSAPP.PERSON_INFO_API.GET_NAME(item_superviser) AS item_superviser , plan_start_time, real_start_time, plan_arrival_time, real_arrival_time, plan_finish_time , real_finish_time, plan_turn_fixed_time, real_turn_fixed_time, item_content, state FROM IFSAPP.PRODUCT_SPECIAL_WORK ");
	}};
	/*排序条件集合*/
	@SuppressWarnings("serial")
	private static final Map<String, String> GroupAndOrder = new HashMap<String, String>(){{
		//日常
		put("Daily", "ORDER BY plan_finish_time DESC");
		//专项
		put("Special", "ORDER BY plan_start_time DESC");
	}};
	
	/*
	 * 根据查询条件生成where
	 */
	private static String getWhere(String select, String where, Map<String, Object> query){
		for(String key : query.keySet()){
			if(!"".equals(query.get(key))){
				if(select.indexOf(key.toString()) != -1){
					where += " AND " + key.toString() + " = '" + query.get(key).toString() + "'";
				}
			}
		}
		return where;
	}

	/**
	 * 生成List查询SQl
	 */
	public static String getListSql(String key, Map<String, Object> query){
		String	select = Select.get(key),
					where = "WHERE 1 = 1 ",
					groupAndOrder = GroupAndOrder.get(key);
		return BaiyinUtils.genPageSql(select + getWhere(select, where, query) + groupAndOrder, 3, Integer.parseInt(query.get("pageIndex").toString()));
	}
}
