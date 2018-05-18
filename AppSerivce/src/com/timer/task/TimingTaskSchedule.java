package com.timer.task;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.Logger;

import com.exception.ServiceException;

public class TimingTaskSchedule implements ServletContextListener {
	
	/**
	 * log4j 日志,提供输出日志功能,可以提供子类使用
	 */
	protected Logger logger = Logger.getLogger(getClass());

	/**
	 * Quartz定时服务器启动
	 */
	public void contextInitialized(ServletContextEvent arg0) {
		try {
			logger.info("监听启动------ ");
			QuartzLoad.run();
		} catch (Exception e) {
			ServiceException se = (ServiceException) e;
    		logger.error(se.getMessage());
			e.printStackTrace();
		}
	}

	/**
	 * Quartz定时服务器停止
	 */
	public void contextDestroyed(ServletContextEvent arg0) {
		try {
			QuartzLoad.stop();
		} catch (Exception e) {		
    		logger.error(e.getMessage());
			e.printStackTrace();
		}
	}

}