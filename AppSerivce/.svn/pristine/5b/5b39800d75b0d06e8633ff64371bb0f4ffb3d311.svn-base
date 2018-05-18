package com.utility;


import com.domain.CommonDomain;
import com.service.CommonService;
import ipacs.dataaccess.service.ServiceManager;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class IbatisDBUtil{
//	public class Config implements JsonService {	
	private final String [] tablefilter={
			"SDIC_BM_Org"

	};

	public static void main(String[] args) {
		IbatisDBUtil test=new IbatisDBUtil();
		String str="";
		str=test.getConfigData("SDIC_INDEX_DIMENSION,SDIC_SIS_INDEX_MAPPING");
		System.out.println("str="+str);
		

	}
	// todo 
	private boolean permitQuery(String tablesNameString) {
		for(int i=0;i<tablefilter.length;i++){
			String table=tablefilter[i];
		}
		return true;
	}
	public String getConfigData(String tablesNameString) {
		if(null==tablesNameString)			return null;
		if(!permitQuery(tablesNameString)) 	return null;

		String [] tableList=tablesNameString.split(",");		
		String strJson="";
		JSONObject configTables = new JSONObject();
		for(int i=0;i<tableList.length;i++){
			String tableName=tableList[i];
			try {
				configTables.put(tableName, getSingleTableData(tableName));
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		return configTables.toString();
	}

	private JSONArray getSingleTableData(String tableName) {
		
		List list = queryTable(tableName);
		return JsonUtil.mapListToJsonArray(list);
	}
	public List queryTable(String tableName) {
		CommonDomain commonDomain = new CommonDomain();
		commonDomain.setTableName(tableName);	
		
		CommonService service = (CommonService) ServiceManager.getService("CommonService");
		List list=(List)service.listTable(commonDomain);
		return list;
	}
	public List executeSql(String freeSql) {
		CommonService commonService = (CommonService) ServiceManager.getService("CommonService");
		List list =(List)commonService.executeFreeSql(freeSql);	
		return list;
	}
	
	public static String getDictionaryValue(String businId, String typeId) {
		
		String returnString = "";
		
		List<Map> list = getDictionaryValue(typeId);
		for(int i=0;i<list.size();i++) {
			Map item = list.get(i);
			if(item.containsValue(businId)) {
				returnString = (String) item.get("BUSIN_NAME");
			}
		}
		return returnString;
	}
	
	public static List getDictionaryValue(String typeId) {
		
		Map returnMap = new HashMap();
		
		String strSql = "select BUSIN_ID, BUSIN_NAME from SDICAPP.SDIC_APP_DICTIONARY "
				+ " where TYPE_ID = '" + typeId + "' "
				+ " and ISDELETE = '1'"
				+ " order by SORT";
		List<Map> list = new IbatisDBUtil().executeSql(strSql);
		return list;
	}
	
	/**
	 * 数据字典，用于数据转换
	 * @param list
	 * @return list
	 */
	public static List<Map> dataDictionary(List<Map> list, final String... key) {
		
		List<Map> listReturn= new ArrayList();
		Map map = new HashMap();
		
		Object value = new Object();
		
		for(int i=0;i<list.size();i++){
			
			map = (Map)list.get(i);
			for(int j=0;j<key.length;j++) {
				
				String fieldName = key[j];
				
				if("APPROVAL_STATUS".equals(fieldName)
						||"APPROVAL_STATE".equals(fieldName)
						||"APPLYFORLEAVESTATE".equals(fieldName)
						||"TRANSPORTATION".equals(fieldName)
						||"EMPLOYEE_TYPE".equals(fieldName)
						||"FURLOUGH_APPLY_TYPE".equals(fieldName)) {
					
					String field = (String)map.get(fieldName);
					if(null==field||field.length()<=0) {
						field = "";
					}
					value = new String(transStateForDictionary(field, fieldName));
				}
				
				if("APP_SIGN".equals(fieldName)
						||"PERSON_ID".equals(fieldName)) {
					
					String field = (String)map.get(fieldName);
					if(null==field||field.length()<=0) {
						field = "";
					}
					value = new String(transUserNameForDB(field, fieldName));
				}
				
				if("CREATED_DATE".equals(fieldName)
						||"SUBMIT_DATE".equals(fieldName)) {
					
					String field = (String)map.get(fieldName);
					if(null==field||field.length()<=0) {
						field = "";
					}
					value = new String();
				}
				
				map.put(fieldName, value.toString());
			}
			listReturn.add(map);
		}
		return listReturn;
	}
	
	private static String transStateForDictionary(String field, String fieldName) {
		
		return getDictionaryValue(field,fieldName);
	}
	
	private static String transUserNameForDB(String field, String fieldName) {
		
		String returnValueStr = "";
		String[] appSign = field.split(", ");
		StringBuffer strSql = new StringBuffer();
		strSql.append("select LISTAGG(USER_NAME, ', ') WITHIN GROUP(ORDER BY USER_NAME) AS USER_NAME from SDICAPP.SDIC_APP_USER ");
		strSql.append("where LOGIN_NAME in (");
		for(int k=0;k<appSign.length;k++) {						
			strSql.append("'" + appSign[k] + "',");
		}
		strSql = strSql.replace(strSql.lastIndexOf(","), strSql.length(), "");
		strSql.append(")");
		List<Map> nameList = new IbatisDBUtil().executeSql(strSql.toString());
		if(null!=nameList && nameList.size()==1){
			Map item = (Map)nameList.get(0);
			returnValueStr = (String) item.get("USER_NAME");
			returnValueStr = (null!=returnValueStr)?returnValueStr:"";
		} else {
			returnValueStr = (null!=field)?field:"";
		}
		return returnValueStr;
	}

}
