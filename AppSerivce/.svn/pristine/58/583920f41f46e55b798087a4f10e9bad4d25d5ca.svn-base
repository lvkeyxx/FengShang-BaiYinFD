package com.log;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.constant.Constant;
import com.dao.LogDAO;
import com.domain.LogDomain;
import com.exception.ServiceException;
import com.google.gson.Gson;
import com.utility.ServletUtil;

/*	
<aop:aspectj-autoproxy proxy-target-class="true"/>  
	<context:component-scan base-package="com.log" /> 
		<bean class="com.log.LogAspect" />  
http://ysj5125094.iteye.com/blog/2151855		
http://www.cnblogs.com/davidwang456/p/4013631.html
http://ysj5125094.iteye.com/blog/2151855
http://blog.csdn.net/w_wind/article/details/18370715
http://blog.csdn.net/shaozengwei/article/details/18229453	
*/
/** 
 *  
 * @ClassName: LogAspect  
 * @Description: 日志记录AOP实现  
 * @author sunbing 
 * @date 2016年12月3日 下午1:51:59  
 * 
 */  
 @Aspect  
 public class LogAspect {  
		
   private final Logger logger = LoggerFactory.getLogger(this.getClass());  
 
   private String requestPath = "" ; 		// 请求地址  
   private String clientAddress = "" ; 	// 客户端地址     
   private String userId = "" ; 			// 用户名  
   private String serviceName = "";				//服务名
   private String transName = "";				//方法名
   private String respondCode = Constant.MSG_SUCCESS_CODE ;		// 返回码  
   private Map<?,?> inputParamMap = null ; // 传入参数  
   private Map<String, Object> outputParamMap = null; // 存放输出结果  
   private long startTimeMillis = 0; // 开始时间  
   private long endTimeMillis = 0; // 结束时间  
   
// 
//   /** 
//    *  
//    * @Title：doBeforeInServiceLayer 
//    * @Description: 方法调用前触发  
//    *  记录开始时间  
//    * @author sunbing  
//    * @date 2016年12月2日 下午4:45:53 
//    * @param joinPoint 
//    */  
//   @Before("execution(* (!com.service.IJsonService)&&(com.service.AJsonService).execute(..))")  
//   public void doBeforeInServiceLayer(JoinPoint joinPoint) {  
//        
//       
//   }  
// 
//   /** 
//    *  
//    * @Title：doAfterInServiceLayer 
//    * @Description: 方法调用后触发  
//    *  记录结束时间 
//    * @author sunbing  
//    * @date 2016年12月2日 下午4:46:21 
//    * @param joinPoint 
//    */  
//   @After("execution(* (!com.service.IJsonService)&&(com.service.AJsonService).execute(..))") 
//   public void doAfterInServiceLayer(JoinPoint joinPoint) {  
//        
// 
//   }  
// 
   /** 
    *  
    * @Title：doAround 
    * @Description: 环绕触发  
    * @author sunbing  
    * @date 2016年12月3日 下午1:58:45 
    * @param pjp 
    * @return 
    * @throws Throwable 
    */  
   @Around("execution(* (!com.service.IJsonService)&&(com.service.AJsonService).execute(..))") 
   public Object doAround(ProceedingJoinPoint pjp) throws Throwable {  

        Object result=null;
        
		try {
			startTimeMillis = System.currentTimeMillis(); // 记录方法开始执行的时间    
			respondCode = Constant.MSG_SUCCESS_CODE ;
			result = pjp.proceed();		// result的值就是被拦截方法的返回值  
			
		} catch (ServiceException se) {
       		respondCode=se.getCode();
       		result=se.getMsg();
       		throw se;
		} 
		finally
	    {
				endTimeMillis = System.currentTimeMillis(); // 记录方法执行完成的时间 
		       /** 
		        * 1.获取request信息 
		        * 2.根据request获取session 
		        * 3.从session中取出登录用户信息 
		        */  
		       RequestAttributes ra = RequestContextHolder.getRequestAttributes();  
		       //RequestAttributes ra = RequestContextHolder.currentRequestAttributes();
		       ServletRequestAttributes sra = (ServletRequestAttributes)ra;  
		       HttpServletRequest request = sra.getRequest();  
		       // 从session中获取用户信息
		       // 获取输入参数  
//		       inputParamMap = request.getParameterMap();  
		       inputParamMap=new ServletUtil().fetchParams(request);
		       userId = (String) request.getSession().getAttribute(Constant.USER_ID);  
		       if(null==userId)	userId=""+inputParamMap.get(Constant.USER_ID);
		        // 获取请求地址  
		        requestPath = request.getRequestURI();  
		        clientAddress=ServletUtil.getRealIp(request);
		        serviceName = (String) inputParamMap.get(Constant.SERVICE_NAME);
		        transName = (String) inputParamMap.get(Constant.TRANS_NAME);
		        
		        // 执行完方法的返回值：调用proceed()方法，就会触发切入点方法执行  
		        outputParamMap = new HashMap<String, Object>();  
		        
		        outputParamMap.put("result", result); 
		        this.printOptLog();  
	    }      
        return result;  
    }  
  
    /** 
     *  
     * @Title：printOptLog 
     * @Description: 输出日志  
     * @author sunbing  
     * @date 2016年12月2日 下午4:47:09 
     */  
    private void printOptLog() {  
        Gson gson = new Gson(); // 需要用到google的gson解析包  
        String optTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(startTimeMillis);  
        String logString = "\n userId："+userId + "\n respondCode："+respondCode  
                +"  url："+requestPath+"; op_time：" + optTime + " pro_time：" + (endTimeMillis - startTimeMillis) + "ms ;"  
                +" param："+gson.toJson(inputParamMap)+";"+"\n result："+gson.toJson(outputParamMap);
//		logger.info(logString);
		//new LogDomain()
		LogDomain log = new LogDomain();
		//LogDao.insert();
		log.setRequestURL(requestPath);
		log.setClientIP(clientAddress);
		log.setClientType("APP");
		log.setUserID(userId);
		log.setServiceName(serviceName);
		log.setTransName(transName);
		log.setResponseCode(respondCode);
		if(inputParamMap.toString().length()>=500){
			log.setInputRaramMap(inputParamMap.toString().substring(0,400));
		}else{
			log.setInputRaramMap(inputParamMap.toString());
		}
		log.setOutputParamMap(outputParamMap.toString());
		log.setStartTime(new Date(startTimeMillis));
		log.setEndTime(new Date(endTimeMillis));
		try{
			ApplicationContext ac = new FileSystemXmlApplicationContext("classpath:applicationContext.xml");
			LogDAO logDAO = (LogDAO) ac.getBean("LogDAO");
			logDAO.insertRecord(log);
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
		}
    }  
  }  
