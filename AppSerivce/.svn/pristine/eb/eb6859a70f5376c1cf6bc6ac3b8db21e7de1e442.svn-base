package com.utility;

import oracle.sql.CLOB;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.*;
import java.util.Map.Entry;

public class JsonUtil {
	public static void main(String[] args) {
		List list=new ArrayList();
		Map map1 = new HashMap();
		map1.put("id", "1");
		map1.put("name", "one");
		
		Map map2 = new HashMap();
		map2.put("id", "2");
		map2.put("name", "two");
		
		list.add(0, map1);
		list.add(1, map2);
		
		mapListToJsonList(list);
	}

	/*public static String listToJson(List list) {     
		StringBuilder json = new StringBuilder();     
		json.append("[");  
		if (list != null && list.size() > 0) {     
			for (int i=0;i<list.size();i++){
				json.append("{");
				Map mapi=(Map)list.get(i);
				Set set=mapi.entrySet();
				for(Iterator s=set.iterator();s.hasNext();){
				   Entry e=(Entry )s.next();
				   String key=(String)e.getKey();
				   String value=(String)e.getValue();
				   json.append(key).append(":").append(value);
				   json.append(",");
				}
				json.setCharAt(json.length() - 1, '}'); 
				json.append(",");
			}  
			json.setCharAt(json.length() - 1, ']'); 	     
		} else {     
			json.append("]");     
		}    
		
		return json.toString();     
	} */

	/**
	 * 本质是个json对象  过滤器
	 * @param jsonArray	json数组中元素是json map
	 * @param keyFilter
	 * @return	JSONArray	根据 keyFilter的数值 匹配 json map 的key，返回 满足条件的 json map
	 * @throws JSONException
	 */
	public static Object fetchJsonArray2List(JSONArray jsonArray, String keyFilter) throws JSONException {
		JSONArray returnJsonArray=new JSONArray();
		if(null==keyFilter && keyFilter.trim().length()<=0)	return	jsonArray;
		
		for(int i=0;i<jsonArray.length();i++){
			JSONObject obj=(JSONObject)jsonArray.get(i);
			returnJsonArray.put(obj.get(keyFilter));
		}
		return returnJsonArray;
	}	
	/**
	 * java Map List 转换 为 JSONArray
	 * @param list
	 * @return
	 * @see		String mapListToJsonList(List list)
	 */
	public static JSONArray mapListToJsonArray(List list) {
		
		JSONArray jsArray = new JSONArray();
		for(int i=0;i<list.size();i++){
			Map map=(Map)list.get(i);
			//JSONObject row = new JSONObject(map);
			JSONObject row = mapToJSONObject(map);
			jsArray.put(row);
		}
		return jsArray;
	}
	/**
	 * java Map  转换 为 json map object
	 * @param map
	 * @return
	 */
	public static JSONObject mapToJSONObject(Map map) {
		JSONObject jsonObject = new JSONObject(map);
		return jsonObject;
	}	
/*	public static JSONObject mapToJson(Map map,String filedNameFilter){	
		JSONObject jsonObject = new JSONObject(map);
		return jsonObject;
	}*/	
		
	/**
	 * java Map List 转换 为 jsonMap list
	 * @param list
	 * @return 
	 * @see        JSONArray mapListToJsonArray(List list)
	 */
	public static String mapListToJsonList(List list)  {   
		JSONArray jsonArray = new JSONArray();
		for (int i=0;i<list.size();i++){
			JSONObject jsonObject = new JSONObject();
			Map map=(Map)list.get(i);
			Set set=map.entrySet();
			for(Iterator s=set.iterator();s.hasNext();){
			   Entry entry=(Entry )s.next();
			   String key=(String)entry.getKey();
			   Object value=entry.getValue();
			   try {
					jsonObject.put(key, value);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			jsonArray.put(jsonObject);
		}  
		return jsonArray.toString();
	} 
	/**
	 * 
	 * @param list
	 * @return
	 */
	public  static String mapListToJsonString(List list){
		return mapListToJsonString(list,null);
	}  
	/**
	 * java Map 对象 list 转换 为  json map为单一元素的 json数组形式的字符串 
	 * @param list
	 * @param filedNameFilter
	 * @return
	 */
	public  static String mapListToJsonString(List list,String filedNameFilter){
	       StringBuilder build=new StringBuilder();
	       //迭代器
	       Iterator iterator=list.iterator();
	       build.append("[");
	       String separate="";
	       while(iterator.hasNext()){
	           build.append(separate);
	           //object转json字符串
	           String str=mapToJsonString((Map)iterator.next(), filedNameFilter);
	           build.append(str);
	           separate=",";
	       }
	       build.append("]");
	       return build.toString();
	}	 
	/**
	 * 
	 * @param map
	 * @return
	 * @throws Exception 
	 */
	public  static JSONObject mapToJsonObject(Map map) throws Exception{
		JSONObject jsonObject = new JSONObject();
		Set set=map.entrySet();
		for(Iterator s=set.iterator();s.hasNext();){
		   Entry entry=(Entry )s.next();
		   String key=(String)entry.getKey();
		   Object value=entry.getValue();

			   if (value instanceof CLOB){
				   CLOB clob= (CLOB)value;
				   value= Utility.oracleClob2Str(clob);
				   jsonObject.put(key, null==value?new Object():value);
			   }else{
				   jsonObject.put(key, null==value?"":value);   
			   }
			   
		}
	   return jsonObject;
	}
	/**
	 * 单一的 java Map 对象 转换 为  json map形式的字符串 
	 * @param map
	 * @param filedNameFilter
	 * @return
	 */
	public static String mapToJsonString(Map map, String filedNameFilter) {
	      StringBuilder build=new StringBuilder();
	      build.append("{");
	      String separate="";
	      
			Set set=map.entrySet();
			for(Iterator s=set.iterator();s.hasNext();){
			   Entry e=(Entry )s.next();
			   String filedName=(String)e.getKey();
			   Object value=e.getValue();
	    	   if(null!=filedNameFilter && filedNameFilter.indexOf(filedName)<0)	continue;
	    	   
	           build.append(separate);
	           build.append("\"");
	           build.append(filedName);
	           build.append("\":");
	           
	           build.append("\"");
	           if (value instanceof String)
		       {
	        	   String strValue=(String)value;
		           //value = Utility.stringReplaceAll(value,'\12',' ');	//8进制 12  		换行键		10	=	0A
		           value=strValue.replace("\"", "");
		       }			  
	           build.append(value);
	           build.append("\"");  
	           separate=",";
			}
			
		  build.append("}"); 
	      return build.toString();
	}
	/**
	 * java bean 对象 list 转换 为  json map为单一元素的 json数组形式的字符串 
	 * @param java bean list
	 * @return
	 */
	public  static String objListToJsonString(ArrayList<?> list){
	   return ObjListToJson((ArrayList<?>)list,null);
	}   
	/**
	 * java bean 对象 list 转换 为  json map为单一元素的 json数组形式的字符串 
	 * @param java bean list
	 * @param filedNameFilter	java bean属性名称作为过滤字符串
	 * @return
	 */
	public  static String ObjListToJson(ArrayList<?> list,String filedNameFilter){
       StringBuilder build=new StringBuilder();
       //迭代器
       Iterator<?> iterator=list.iterator();
       build.append("[");
       String separate="";
       while(iterator.hasNext()){
           build.append(separate);
           //object转json字符串
           String str=objToJsonString(iterator.next(), filedNameFilter);
           build.append(str);
           separate=",";
       }
       build.append("]");
       return build.toString();
	}
	/**
	 * 单一的 java bean 对象 转换 为  json map形式的字符串 
	 * @param java bean
	 * @param filedNameFilter	java bean属性名称作为过滤字符串
	 * @return
	 */
   @SuppressWarnings("unchecked")
   public  static String objToJsonString(Object obj, String filedNameFilter){
       StringBuilder build=new StringBuilder();
       build.append("{");
       @SuppressWarnings("rawtypes")
       Class cla=null;
       try {
           //反射加载类
           cla=Class.forName(obj.getClass().getName());
       } catch (ClassNotFoundException e) {
           System.out.println(obj.getClass().toString().concat(" 未找到这个类"));
           e.printStackTrace();
           return null;
       }
        
       StringBuffer methodname=new StringBuffer();
       //获取java类的变量
       Field[] fields=cla.getDeclaredFields();
       String separate="";
       for(Field temp:fields){
    	   String filedName=temp.getName();
    	   if(null!=filedNameFilter && filedNameFilter.indexOf(filedName)<0)	continue;
    	   
           build.append(separate);
           build.append("\"");
           build.append(temp.getName());
           build.append("\":");
            
           methodname.append("get");
           methodname.append(temp.getName().substring(0,1).toUpperCase());
           methodname.append(temp.getName().substring(1));
            
           build.append("\"");
           Method method=null;
           try {
               //获取java的get方法
               method=cla.getMethod(methodname.toString());
           } catch (Exception e) {//catch (NoSuchMethodException | SecurityException e) {
               methodname.setLength(0);
               e.printStackTrace();
           }
            
           try {
               //执行get方法，获取变量参数的直。
               build.append(method.invoke(obj));
           } catch (IllegalAccessException e) {
               e.printStackTrace();
           } catch (IllegalArgumentException e) {
               e.printStackTrace();
           } catch (InvocationTargetException e) {
               e.printStackTrace();
           }

           build.append("\"");
           methodname.setLength(0);
           separate=",";
       }
        
       build.append("}");
       return build.toString();
   }
   /**
    * 将  json map格式数据(不支持递归)，转换为 java Map对象
    * 目前用于将 Http 请求接口中   json参数转换为javav Map 
    * @param paramName	字符串
    * @return
    */
	public static Map jsonParamsToMap(String strJsonMap) {
		Map map=new HashMap(); 
		if(null!=strJsonMap && strJsonMap.indexOf('{') < 0)	return map ;
		try {
			JSONObject jsonObject = new JSONObject(strJsonMap);
			//JSONObject.fromObject(paramName);
            Iterator<String> iter = jsonObject.keys();
            while (iter.hasNext()) {
                String key = iter.next();
                map.put(key, jsonObject.get(key));                
            }
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return map;
	}

	/**
	 * "域^BJSC^^部门^BJ^^说明^#1机组检修^^签订金额^1^^预算科目^2017130066(1)^^计划开工时间^01-1月 -17^^"
	 * 将如上字符串转换为json object map形式
	 * @param sourceString		
	 * @param delimiter1	^^
	 * @param delimiter2	^
	 * @return				JSONObject
	 */
	public static JSONObject transform2JsonObjectString(String sourceString, String delimiter1, String delimiter2) {
		JSONObject jsonObj=new JSONObject();
		
		if(null==sourceString)	return jsonObj;
		String arrayString1[]=sourceString.split(delimiter1);
		for(int i=0;i<arrayString1.length;i++){
			String arrayString2[]=arrayString1[i].split(delimiter2);
			if(2==arrayString2.length){
				try {
					String key = arrayString2[0];
					String value = arrayString2[1];
					if(null!=key){
						key=key.trim();
						value= (null!=value)?value.trim():value;

						jsonObj.put(key, value);
					}					
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}
		return jsonObj;
	}

	/**
	 * "域^BJSC^^部门^BJ^^说明^#1机组检修^^签订金额^1^^预算科目^2017130066(1)^^计划开工时间^01-1月 -17^^"
	 * 将如上字符串转换为json object map形式
	 * @param sourceString		
	 * @param delimiter1	^^
	 * @param delimiter2	^
	 * @return				JSONObject
	 */
	public static JSONArray transform2JsonArrayString(String sourceString, String delimiter1, String delimiter2) {
		JSONArray jsonObj=new JSONArray();
		
		if(null==sourceString)	return jsonObj;
		String arrayString1[]=sourceString.split(delimiter1);
		for(int i=0;i<arrayString1.length;i++){
			String arrayString2[]=arrayString1[i].split(delimiter2);
			if(2==arrayString2.length){
				String key = arrayString2[0];
				String value = arrayString2[1];
				if(null!=key){
					key=key.trim();
					jsonObj.put(key +": "+ value);
				}
			}
		}
		return jsonObj;
	}	

	
	public static String doURLDecoder(String str){
/*		
		char[] chrCharArray = "+ /?%#&=".toCharArray();
		for(int i=0;i<chrCharArray.length;i++){
			char c=chrCharArray[i];
			str.replaceAll("/"+c+"/g", "%"+Integer.toHexString(c));
		}*/
		try {
			URLDecoder.decode(str,"UTF-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return str;
		
	}
	
}