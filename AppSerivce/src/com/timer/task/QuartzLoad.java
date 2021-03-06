package com.timer.task;

import org.apache.log4j.Logger;
import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerFactory;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

import com.timer.approvejob.ApproveJob;
import com.timer.electricityjob.ElectricityJob;
import com.timer.erp.CleanErpMainChildTableCache;

public class QuartzLoad {

	/**
	 * log4j 日志,提供输出日志功能,可以提供子类使用
	 */
	protected static Logger logger = Logger.getLogger(QuartzLoad.class);

	private static SchedulerFactory schedu = new StdSchedulerFactory();
	
	/**
	 * Quartz定时服务器启动
	 */
	public static void run() throws Exception {

		logger.info("定时任务启动");
		Scheduler sche = schedu.getScheduler();
		
		
		// 五分钟 电量定时计划每三分钟执行一次
		JobDetail electricityDetail = JobBuilder.newJob((Class<? extends Job>) ElectricityJob.class)
				.withIdentity("myjob1", "group1").build();
		CronTrigger electricityTrigger = (CronTrigger) TriggerBuilder.newTrigger()
				.withIdentity("trigger1", "group1")
				.withSchedule(CronScheduleBuilder.cronSchedule("0 0/3 * * * ?"))
				.build();
		
//		String cron = QuartzManager.getQuartzTime(); //获得quartz时间表达式，此方法自己写  
//      ElectricityJob job = new ElectricityJob();  
//      job.setJobGroup("MY_JOBGROUP_NAME");  
		//添加定时任务  
//		QuartzManager.addJob(jobName, QuartzJobFactory.class, cron,job); 
		
		// 审批计划更新每天0点，12点执行
		JobDetail approveDetail = JobBuilder
				.newJob((Class<? extends Job>) ApproveJob.class)
				.withIdentity("myjob2", "group2").build();
		CronTrigger approveTrigger = (CronTrigger) TriggerBuilder.newTrigger()
				.withIdentity("trigger2", "group2")
				.withSchedule(
						CronScheduleBuilder.cronSchedule("0 0 0/12 * * ?"))
				.build();
		
		// 清除ERP主子表缓存，每天凌晨执行
		JobDetail cleanErpMainChildTableCacheDetail = JobBuilder.newJob((Class<? extends Job>) CleanErpMainChildTableCache.class).withIdentity("myjob3", "group3").build();
		CronTrigger cleanErpMainChildTableCacheTrigger = (CronTrigger) TriggerBuilder.newTrigger().withIdentity("trigger3", "group3")
				.withSchedule(CronScheduleBuilder.cronSchedule("0 0 0 * * ?")).build();
				
		// 启动
		if (!sche.isShutdown()) {
			sche.start();
		}
		sche.scheduleJob(electricityDetail, electricityTrigger);
		sche.scheduleJob(approveDetail, approveTrigger);
		sche.scheduleJob(cleanErpMainChildTableCacheDetail, cleanErpMainChildTableCacheTrigger);
	}

	/**
	 * Quartz定时服务器停止
	 */
	public static void stop() throws Exception {
		Scheduler sche = schedu.getScheduler();
		sche.shutdown();
		logger.info("定时任务停止");
	}
}