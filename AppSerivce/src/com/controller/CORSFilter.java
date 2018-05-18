package com.controller;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * Servlet Filter implementation class CORSFilter
 */
public class CORSFilter implements Filter {
	private static Logger logger = Logger.getLogger(CORSFilter.class);
    /**
     * Default constructor. 
     */
    public CORSFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {  
		   HttpServletResponse response = (HttpServletResponse) res;  
		   
		   String origin = ((HttpServletRequest)req).getHeader("origin");
		   logger.debug("((HttpServletRequest)req).getHeader(\"origin\")===="+origin); 		   
		     
		   //response.setHeader("Access-Control-Allow-Origin", "http://localhost:14004");  
		   //response.setHeader("Access-Control-Allow-Origin", "*");
		   response.setHeader("Access-Control-Allow-Origin", origin);
		   response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");  
		   response.setHeader("Access-Control-Max-Age", "3600");  
		   response.setHeader("Access-Control-Allow-Headers", "x-requested-with, Content-Type");  
		   response.setHeader("Access-Control-Allow-Credentials", "true");  
		   
		  // fetchParams((HttpServletRequest)req);
		   
		   chain.doFilter(req, res);  	
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}
	
	private Map fetchParams(HttpServletRequest request) {  
		   Map map = new HashMap();  
		   Enumeration paramNames = request.getParameterNames();  
		   while (paramNames.hasMoreElements()) {  
		       String paramName = (String) paramNames.nextElement();  

		       String[] paramValues = request.getParameterValues(paramName);  
		       if (paramValues.length == 1) {  
		           String paramValue = paramValues[0];  
		           if (paramValue.length() != 0) {  
		               map.put(paramName, paramValue);  
		           }  
		       }  
		   }  

		   Set<Map.Entry<String, String>> set = map.entrySet();  
		   for (Map.Entry entry : set) {
		       //System.out.println(entry.getKey() + ":" + entry.getValue());  
		   }  
//		   System.out.println("CORSFilter-----fetchParams------------------------");
		   
		   
		   return map;
		} 

}
