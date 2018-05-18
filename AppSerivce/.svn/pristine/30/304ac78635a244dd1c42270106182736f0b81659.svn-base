package com.controller;

import ipacs.dataaccess.service.ServiceManager;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import com.constant.Constant;
import com.domain.Message;
import com.exception.ServiceException;
import com.service.IJsonService;
import com.utility.ServletUtil;

public class JsonController extends HttpServlet {
		
	private static Logger logger = Logger.getLogger(JsonController.class);  
	
	private static final long serialVersionUID = 1L;
	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		logger.debug("doPost----------doPostdoPostdoPost-------------------");  
		 doGet(req,res);
	}

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {	
		logger.debug("doget----------doGet----------------doGet--");  
		printHttpInfo(req);
		/*ConfigCache.getInstance().setMapSysConfig(Constant.SERVER_URI + Thread.currentThread().getId(), req.getScheme()+ "://" 
				   + req.getServerName() + ":" + req.getServerPort());
		ConfigCache.getInstance().setMapSysConfig(Constant.WEB_ROOT, req.getContextPath());*/
		
		Map map=new ServletUtil().fetchParams(req);
		doFilter(map,req,res);
		jsonServiceDispatch(map,res);
		return;
	}
	
	private void printHttpInfo(HttpServletRequest request){
		
		HttpSession session=request.getSession();
		logger.debug("Protocol: " + request.getProtocol() + "<br>");
		logger.debug("Scheme: " + request.getScheme() + "<br>");
		logger.debug("Server Name: " + request.getServerName() + "<br>" );
		logger.debug("Server Port: " + request.getServerPort() + "<br>");
		logger.debug("Protocol: " + request.getProtocol() + "<br>");
		logger.debug("Server Info: " + getServletConfig().getServletContext().getServerInfo() + "<br>");
		logger.debug("Remote Addr: " + request.getRemoteAddr() + "<br>");
		logger.debug("Remote Host: " + request.getRemoteHost() + "<br>");
		logger.debug("Remote Port: " + request.getRemotePort() + "<br>");
		logger.debug("Character Encoding: " + request.getCharacterEncoding() + "<br>");
		logger.debug("Content Length: " + request.getContentLength() + "<br>");
		logger.debug("Content Type: "+ request.getContentType() + "<br>");
		logger.debug("Auth Type: " + request.getAuthType() + "<br>");
		logger.debug("HTTP Method: " + request.getMethod() + "<br>");
		logger.debug("Path Info: " + request.getPathInfo() + "<br>");
		logger.debug("Path Trans: " + request.getPathTranslated() + "<br>");
		logger.debug("Query String: " + request.getQueryString() + "<br>");
		logger.debug("Remote User: " + request.getRemoteUser() + "<br>");
		logger.debug("Session Id: " + request.getRequestedSessionId() + "<br>");
		logger.debug("Request URL: " + request.getRequestURL() + "<br>");
		logger.debug("Request URI: " + request.getRequestURI() + "<br>");
		logger.debug("Servlet Path: " + request.getServletPath() + "<br>");
		logger.debug("Created : " + session.getCreationTime() + "<br>");
		logger.debug("LastAccessed : " + session.getLastAccessedTime() + "<br>");
		
		logger.debug("Accept: " + request.getHeader("Accept") + "<br>");
		logger.debug("Host: " + request.getHeader("Host") + "<br>");
		logger.debug("Referer : " + request.getHeader("Referer") + "<br>");
		logger.debug("origin : " + request.getHeader("origin") + "<br>");
		logger.debug("Accept-Language : " + request.getHeader("Accept-Language") + "<br>");
		logger.debug("Accept-Encoding : " + request.getHeader("Accept-Encoding") + "<br>");
		logger.debug("User-Agent : " + request.getHeader("User-Agent") + "<br>");
		logger.debug("Connection : " + request.getHeader("Connection") + "<br>");
		logger.debug("Cookie : " + request.getHeader("Cookie") + "<br>");
		logger.debug("ContextPath : " + request.getContextPath() + "<br>");

	}



	public void doFilter(Map map,ServletRequest request, ServletResponse response) throws IOException, ServletException {
		logger.info("request.getRemoteAddr()==="+request.getScheme()+"://"+ request.getServerName()+"/"+request.getRemotePort());
//		UserSession session = getSession(request);   
//      User user = getUserFromSession(session);   
//		RequestContext.clear();   
//		RequestContext.setSession(session);   
//      RequestContext.get().setUser(user);   
	}
/*
	private UserSession getSession(ServletRequest request) {
		String userId=(String)((HttpServletRequest) request).getSession().getAttribute("userId");
		String reportDate=(String)((HttpServletRequest) request).getSession().getAttribute("reportDate");
//		reportDate="20130601";
		UserSession userSession = new UserSession();
		userSession.setUserId(userId);
		userSession.setReportDate(reportDate);
		return userSession;
	}
	
	private Map verifyPara(HttpServletRequest req) throws IOException{
		String userId=(String)req.getSession().getAttribute("userId");
		
		String serviceName=req.getParameter(JsonParaConstant.SERVICE_NAME);
		String unitType=req.getParameter(JsonParaConstant.UnitType);
		String chartId=req.getParameter(JsonParaConstant.CHART_ID);
		String company=req.getParameter(JsonParaConstant.COMPANY);
		String bizDate=req.getParameter(JsonParaConstant.BIZ_DATE);
		String indexNo=req.getParameter(JsonParaConstant.INDEX_NO);
		String indexNoGroup=req.getParameter(JsonParaConstant.Index_No_Group);		
		String powerType=req.getParameter(JsonParaConstant.POWER_TYPE);
		String tablesName = req.getParameter(JsonParaConstant.TABLES_NAME);
		String WindeArguments = req.getParameter(JsonParaConstant.WindeArguments);
		String areaCode = req.getParameter(JsonParaConstant.AREACODE);
		String data = req.getParameter(JsonParaConstant.DATA);
		
		logger.debug("userId="+userId);
		logger.debug("serviceName="+serviceName);
		logger.debug("chartId="+chartId);
		logger.debug("company="+company);
//		if(null!=company)	req.getSession().setAttribute("SelectedCompany",company);
		
		logger.debug("bizDate="+bizDate);
		logger.debug("indexNoGroup="+indexNoGroup);
		logger.debug("indexNo="+indexNo);
		logger.debug("tablesName="+tablesName);
		logger.debug("WindeArguments="+WindeArguments);
		logger.debug("areaCode="+areaCode);
		logger.debug("data="+data);
		
		logger.debug("req.getQueryString()="+req.getQueryString());		
		
		Map map = new HashMap();
		map.put(JsonParaConstant.USEE_ID, userId);
		map.put(JsonParaConstant.SERVICE_NAME, serviceName);
		map.put(JsonParaConstant.CHART_ID, chartId);
		map.put(JsonParaConstant.UnitType, unitType);
		map.put(JsonParaConstant.COMPANY, company);
		map.put(JsonParaConstant.BIZ_DATE, bizDate);
		map.put(JsonParaConstant.INDEX_NO, indexNo);
		map.put(JsonParaConstant.Index_No_Group, indexNoGroup);
		map.put(JsonParaConstant.TABLES_NAME, tablesName);
		map.put(JsonParaConstant.POWER_TYPE, powerType);
		map.put(JsonParaConstant.WindeArguments, WindeArguments);
		map.put(JsonParaConstant.AREACODE, areaCode);
		map.put(JsonParaConstant.DATA, data);
		
		
		
// 锟皆憋拷锟斤拷锟斤拷
		if(null!=serviceName && serviceName.equals("BM")){
			String BM_BenchMark_Id=req.getParameter(JsonParaConstant.BM_BenchMark_Id);
			String BM_Indicator_Id=req.getParameter(JsonParaConstant.BM_Indicator_Id);
			String OrgId=req.getParameter(JsonParaConstant.OrgId);
			String BenchMarkTime=req.getParameter(JsonParaConstant.BenchMarkTime);
			String MachineSetVolume=req.getParameter(JsonParaConstant.MachineSetVolume);
			String SpaceType=req.getParameter(JsonParaConstant.SpaceType);
			String TimeType=req.getParameter(JsonParaConstant.TimeType);
			String UnitNum=req.getParameter(JsonParaConstant.UnitNum);
			String IndicatorSpaceType=req.getParameter(JsonParaConstant.IndicatorSpaceType);
			
			
			map.put(JsonParaConstant.BM_BenchMark_Id, BM_BenchMark_Id);
			map.put(JsonParaConstant.BM_Indicator_Id, BM_Indicator_Id);
			map.put(JsonParaConstant.OrgId, OrgId);
			map.put(JsonParaConstant.BenchMarkTime, BenchMarkTime);
			map.put(JsonParaConstant.MachineSetVolume, MachineSetVolume);
			map.put(JsonParaConstant.SpaceType, SpaceType);
			map.put(JsonParaConstant.TimeType, TimeType);
			map.put(JsonParaConstant.UnitNum, UnitNum);
			map.put(JsonParaConstant.IndicatorSpaceType, IndicatorSpaceType);
			
			
			logger.debug("BM_BenchMark_Id="+BM_BenchMark_Id);
			logger.debug("BM_Indicator_Id="+BM_Indicator_Id);
			logger.debug("OrgId="+OrgId);
			logger.debug("BenchMarkTime="+BenchMarkTime);
			logger.debug("MachineSetVolume="+MachineSetVolume);
			logger.debug("SpaceType="+SpaceType);
			logger.debug("TimeType="+TimeType);
			logger.debug("UnitNum="+UnitNum);
			logger.debug("IndicatorSpaceType="+IndicatorSpaceType);
		}
		
		
		return map;
	}
*/
	private void jsonServiceDispatch(Map map, HttpServletResponse res) throws IOException {
		
		String serviceName=(String)map.get(Constant.SERVICE_NAME);
		
		Message msg=new Message();
		if(null!=serviceName){
			IJsonService service = (IJsonService) ServiceManager.getService(serviceName);
		
			try {
				String data = service.execute(map);
				String alertMsg=(String)map.get(Constant.ALERT_MSG);
				if(null!=alertMsg)	msg.setMsg(alertMsg);
				msg.setData(data);
			} catch (ServiceException e) {
				msg.setCode(e.getCode());
				msg.setMsg(e.getMsg());
				
				logger.error("Message:"+msg.toString());
				logger.error(e.getMessage());
				e.printStackTrace();
			}			
		}
		String strJson=packMessage(msg);
		
		// 处理jsonp调用
		if(map.containsKey(Constant.JSONP_TAG)){
			String callback=(String)map.get(Constant.JSONP_TAG);			
			strJson=callback+"("+strJson+")";
		}
		
		
		logger.info("JsonController->makeJson() strJson="+strJson);
		if(null!=serviceName){
			res.setContentType("text/html");
		}else{
			res.setContentType("application/json");	
		}		
		
		res.setCharacterEncoding("UTF-8");
		PrintWriter pw = res.getWriter(); 
		pw.write(strJson);
		pw.close();
	}
	
	private String packMessage(Message msg) {
	//private String packMessage(String strCode, String strMsg, String strBody) {
		StringBuilder build=new StringBuilder();
		build.append("{ \"code\":\"");
		build.append(msg.getCode());
		build.append("\",");
		
		build.append(" \"msg\":\"");
		build.append(msg.getMsg());
		build.append("\",");
	
		build.append(" \"data\":");
		build.append(msg.getData());
		build.append("}");	    
		String strMessageString=build.toString();
		
		strMessageString=filterBlackChar(strMessageString);
		
		return strMessageString;
	}
//	
//	private String packMessage(Message msg) {
//		JSONObject jsonObj=new JSONObject();
//		try {
//			jsonObj.put("code", msg.getCode());
//			jsonObj.put("msg", msg.getMsg());
//			jsonObj.put("data", msg.getData());
//		} catch (JSONException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return jsonObj.toString();
//		
//	}

	private String filterBlackChar(String strMessageString) {
//		strMessageString = Utility.stringReplaceAll(strMessageString,'\12',' ');	//8进制 12  		换行键		10	=	0A  
//		strMessageString = Utility.stringReplaceAll(strMessageString,'\15',' ');	//8进制 15  		回车键		13  =   0D
		return strMessageString;
	}
}
