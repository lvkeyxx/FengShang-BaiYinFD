package com.service;

import java.util.List;
import java.util.Map;

import com.constant.Constant;
import com.exception.ServiceException;
import com.utility.IbatisDBUtil;
import com.utility.JsonUtil;

public class SuggestionService extends AJsonService implements IJsonService {
	
	
	/**
	 * 获取建议列表
	 * @param map TODO
	 * @return
	 */
	public String getSuggestionList(Map map) throws ServiceException{
		String returnString="{}";
		
		try{
			String strSql="select ID,SUBJECT,CONTENT,PHONE,USER_NAME,"
					+ "USER_ID,SUBMIT_TIME from SDICAPP.SDIC_APP_SUGGESTION";
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			returnString = JsonUtil.mapListToJsonString(list);
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0501","获取意见信息列表失败");
		}			
		return returnString;
	}
	
	/**
	 * 插入建议
	 * @param map
	 * @return
	 * @throws ServiceException 
	 */
	public String doSuggestion(Map map) throws ServiceException {
		String returnString = "{}";
		try{
			
			String 	SUBJECT = (String) map.get(Constant.SUBJECT);
			String 	CONTENT = (String) map.get(Constant.CONTENT);
			String 	PHONE = (String) map.get(Constant.PHONE);
			String 	USER_ID = (String) map.get(Constant.USER_ID);
			String 	USER_NAME = USER_ID;
			String  ORG_CODE = "BJ";
			String strSql = "insert into SDICAPP.SDIC_APP_SUGGESTION(ID,SUBJECT,CONTENT,"
					+ "PHONE,USER_NAME,USER_ID,ORG_CODE) values (sdicapp.seqSuggestion.NEXTVAL,'"
					+ SUBJECT + "','" + CONTENT + "','" + PHONE + "','" + USER_NAME
					+ "','" + USER_ID + "','" + ORG_CODE + "')";
			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			returnString = JsonUtil.mapListToJsonString(list);
			//此处应返回回执消息
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0502","提交意见失败");
		}	

		return returnString;	
	}
}
