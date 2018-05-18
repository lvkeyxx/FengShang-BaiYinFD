package com.service;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import com.utility.MapUtil;
import org.apache.log4j.Logger;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.utility.TokenUtils;

public abstract class AJsonService implements IJsonService {
	/**
	 * log4j 日志,提供输出日志功能,可以提供子类使用
	 */
	protected Logger logger = Logger.getLogger(getClass());
	protected String strMethod = "";
	protected String url=Constant.INTER_IP;
	public String execute(Map map) throws ServiceException{		
		String returnString="";
		url=Constant.INTER_IP;
		try {
			
			strMethod=(String)map.get(Constant.TRANS_NAME);
			String urlType = MapUtil.stringValue(map,Constant.URL_TYPE);
			logger.info("map==="+map);
			if("outer".equals(urlType)){
				logger.info("outer===="+urlType);
				url = Constant.OUTER_IP;
			}
			logger.info("url=="+url);
			Class[] cArgs = new Class[1];
	        cArgs[0] = Map.class;
	        Method array[]=this.getClass().getMethods();
	        Method method=this.getClass().getMethod(strMethod,cArgs);

	        //检查令牌信息	        
	        if(!(strMethod.equals("login"))){
		        String userId=(String)map.get(Constant.USER_ID);
				String signToken=(String)map.get(Constant.SIGN_TOKEN);
				
				UserProfile userProfile=ConfigCache.getInstance().getUserProfile(userId);
				if(null==userProfile){
					InvocationTargetException ite=new InvocationTargetException(new ServiceException("0999","用户认证信息已经失效，请重新登录"));
					throw ite;					
				}
				
				String tokenFeed=getTokenFeed(userProfile);
				if(null==userId || null==signToken || !TokenUtils.checkToken(tokenFeed, signToken)){
					//ConfigCache.getInstance().removeUserProfile(userId);//认证失效，应该清理user profile cache
					InvocationTargetException ite=new InvocationTargetException(new ServiceException("0999","安全认证信息已经失效，请重新登录！"));
					throw ite;
				}	
	        }
	        
/*	        String serviceName=(String)map.get(Constant.SERVICE_NAME);
			if(null!=serviceName && "ApproveService".equals(serviceName)){			
				String 	userId=(String)map.get(Constant.USER_ID);
				userId=userId.toUpperCase();
				map.put(Constant.USER_ID,userId);
			}*/
	        
			returnString=""+method.invoke(this, map);
				
		}catch (Exception e) {
	        if (e instanceof InvocationTargetException)
	        {
	            Throwable targetEx = ((InvocationTargetException) e).getTargetException();
	            if (targetEx != null)
	            {
	            	if (targetEx instanceof ServiceException){
	            		ServiceException se = (ServiceException) targetEx;
	            		logger.error(se.getMessage());
	            		se.printStackTrace();
	            		throw se;
	            	}
	            }
	        } 
	        
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0911","AJsonService.execute() 调用失败:"+getClass().getName()+"."+strMethod);
		}		
		return returnString;	
	}

	public String getTokenFeed(UserProfile userProfile) {
		return userProfile.getUserId()+userProfile.getDeviceId();
	}
}
