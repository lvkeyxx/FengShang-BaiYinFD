package com.utility;

import com.constant.Constant;
import com.controller.JsonController;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ServletUtil {
	private static Logger logger = Logger.getLogger(JsonController.class);
	
	public ServletUtil() {
		// TODO Auto-generated constructor stub
	}
	/**
	 * 将用户ID全部 统一为 大写形式
	 * @param map
	 */
	public void formatRequestParams(Map map) { 
		String 	userId=(String)map.get(Constant.USER_ID);
		userId=userId.toUpperCase();
		map.put(Constant.USER_ID,userId);
		
		String 	passWord=(String)map.get(Constant.PASS_WORD);
		if(null!=passWord&&passWord.length()>0) {
			try {
				passWord = Encryption.desEncrypt(passWord).trim();
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			map.put(Constant.PASS_WORD,passWord);
		}
	}
	
	public Map fetchParams(HttpServletRequest request) {  
		   Map map = new HashMap(); 
		   
		   map.put("remoteIP", request.getRemoteAddr());
		   map.put("remotePort", request.getRemotePort());
		   map.put("scheme", request.getScheme());
		   map.put("localIP", request.getLocalAddr());
		   map.put("localPort", request.getLocalPort());
		   map.put("localPath", request.getSession().getServletContext().getRealPath(""));
		   logger.debug("map=="+map);
//处理 http 请求之 	url地址栏区域	   
		   String urlQuery=request.getQueryString();
		   if(null!=urlQuery && urlQuery.indexOf('/')>0){
			   String[] array=urlQuery.split("/");
			   String serviceName=array[0].trim();
			   String transName=array[1].trim();
			   if(serviceName.length()>0 && transName.length()>0){
				   map.put(Constant.SERVICE_NAME, serviceName);	
				   String patt = "[a-zA-Z0-9]{0,}";
				  
			        Pattern r = Pattern.compile(patt);			        
			        Matcher m = r.matcher(transName);
			        if(m.find())
					map.put(Constant.TRANS_NAME, m.group(0));	

			   }
		   }
		   
//处理 http 请求之	 表单区域	,在表单区域可能会重复出现 SERVICE_NAME 和  TRANS_NAME,后者将覆盖前者
		   logger.debug("fetchParams begin------------------------------");
		   Enumeration paramNames = request.getParameterNames();
		   while (paramNames.hasMoreElements()) {
		       String paramName = (String) paramNames.nextElement();  

		       String[] paramValues = request.getParameterValues(paramName);  
		       logger.debug(paramName+"========"+paramValues);
		       map.putAll(JsonUtil.jsonParamsToMap(paramName));
		       
		       if (null!=paramValues && paramValues.length == 1) { 
		           String paramValue = paramValues[0];  
		           if (paramValue.length() != 0) {  
		        	  // logger.debug(paramName+"========"+paramValue);
		               map.put(paramName, paramValue);  
		           }  
		       }  
		   }  
		   
		   logger.debug("getAttributeNames ------------------------------");
		   paramNames = request.getAttributeNames();
		   while (paramNames.hasMoreElements()) {  
		       String paramName = (String) paramNames.nextElement();  

		       String[] paramValues = request.getParameterValues(paramName);  
		       logger.debug(paramName+"========"+paramValues);
		       
		       if (null!=paramValues && paramValues.length == 1) {  
		           String paramValue = paramValues[0];  
		           if (paramValue.length() != 0) {  
		        	   
		               map.put(paramName, paramValue);  
		           }  
		       }  
		   }  
		   
		   logger.debug("getHeaderNames ------------------------------");
		   paramNames = request.getHeaderNames();
		   while (paramNames.hasMoreElements()) {  
		       String paramName = (String) paramNames.nextElement();  

		       String[] paramValues = request.getParameterValues(paramName);  
		       
		       logger.debug(paramName+"========"+paramValues);
		       if (null!=paramValues && paramValues.length == 1) {  
		           String paramValue = paramValues[0];  
		           if (paramValue.length() != 0) {  
		        	   
		               map.put(paramName, paramValue);  
		           }  
		       }  
		   } 
		   
		   Set<Map.Entry<String, String>> set = map.entrySet();  

		   for (Map.Entry entry : set) {  
		       logger.debug(entry.getKey() + ":-----------------------------------------" + entry.getValue());  
		   }  
		   
		   logger.debug("fetchParams end ------------------------------");  
		   
		   formatRequestParams(map);
		   return map;
		}  	
    /**
    * 获取浏览器客户端得真实IP地址,用了反向代理也可以
    * @param req HttpServletRequest
    * @return String
    */
    public static String getRealIp(HttpServletRequest req) {
	    String ip_for = req.getHeader("x-forwarded-for");
	    String ip_client = req.getHeader("http_client_ip");
	    String un = "unknown";
	    if (ip_for != null && !ip_for.equalsIgnoreCase(un)&& ip_for.trim().length() > 0) {
	    	return ip_for;
	    } else if (ip_client != null && !ip_client.equalsIgnoreCase(un)&& ip_client.trim().length() > 0) {
	    	return ip_client;
	    } else {
	    	return req.getRemoteAddr();
	    }
    }
    /**
     * 前置apache，将一些请求转发给后端的weblogic
     * @param request
     * @return
     */
    public String getRealIp4Weblogic(HttpServletRequest request) {  
          String ip = request.getHeader("x-forwarded-for");  
          if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
        	  ip = request.getHeader("Proxy-Client-IP");  
          }  
          if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
        	  ip = request.getHeader("WL-Proxy-Client-IP");  
          }  
          if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
        	  ip = request.getRemoteAddr();  
          }  
          return ip;  
     }  

}
