package com.timer.erp;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.service.ticket.sql.ErpServiceSql;
import com.timer.electricityjob.ElectricityJob;

public class CleanErpMainChildTableCache implements Job{
	private static Logger logger = Logger.getLogger(ElectricityJob.class);
	
	/**
	 * 清除ERP主子表缓存，每天凌晨执行
	 */
	public void execute(JobExecutionContext arg0) throws JobExecutionException{
		try {
			ErpServiceSql.reSqlCache();
		}catch(Exception e) {
			e.printStackTrace();
			logger.error("清空ERP主子表缓存失败");
		}
		
	}
}
