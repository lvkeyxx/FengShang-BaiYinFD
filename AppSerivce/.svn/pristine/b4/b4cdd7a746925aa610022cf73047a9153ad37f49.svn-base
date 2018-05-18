/**
 * @Copyright:Copyright (c) 2008 - 2100
 * @Company:BM
 */

/**
 * @Title:
 * @Description:
 * @Author:qijizhen
 * @Since:2018年5月10日
 * @Version:1.0.0
 */

package com.timer.approvejob;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.timer.electricityjob.ElectricityJob;
import com.utility.IbatisDBUtil;

public class ApproveJob implements Job {

	/**
	 * log4j 日志,提供输出日志功能,可以提供子类使用
	 */
	protected static Logger logger = Logger.getLogger(ElectricityJob.class);
	        
	/** 更新审批消息。每天0点，12点执行 */
	public void execute(JobExecutionContext context) throws JobExecutionException {
		// TODO Auto-generated method stub
		String sql = ""
				+ "begin"
				+ " -- Call the procedure"
				+ "	ifsapp.approval_form_contrast_api.auto_update_msg_info;"
				+ "end;"
				+ "commit;";
		logger.info("更新审批消息 sql================" + sql);
		new IbatisDBUtil().executeSql(sql);	
		logger.info("更新审批消息成功================");
	}
}
