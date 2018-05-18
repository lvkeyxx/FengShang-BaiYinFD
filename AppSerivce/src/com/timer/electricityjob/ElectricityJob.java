/**
 * 
 */
package com.timer.electricityjob;

/**
 * @author qijizhen
 *
 */
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.exception.ServiceException;
import com.utility.IbatisDBUtil;
import com.utility.ListUtil;

public class ElectricityJob implements Job {

	/**
	 * log4j 日志,提供输出日志功能,可以提供子类使用
	 */
	protected static Logger logger = Logger.getLogger(ElectricityJob.class);

	static SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm");

	static Map<String, String> domainMap = new HashMap<String, String>();
	static Map<String, String> domainIdMap = new HashMap<String, String>();
	static {
		domainMap.put("CUR_97", "10");
		domainMap.put("CUR_13", "1101");
		domainMap.put("CUR_20", "1201");
		domainMap.put("CUR_27", "1301");
		domainMap.put("CUR_36", "1401");
		domainMap.put("CUR_46", "1801");
		domainMap.put("CUR_53", "1901");
		domainMap.put("CUR_60", "1802");
		domainMap.put("CUR_67", "1804");
		domainMap.put("CUR_74", "1803");

		domainIdMap.put("10", "全公司");
		domainIdMap.put("1101", "捡财塘风电场");
		domainIdMap.put("1201", "北大桥东风电场");
		domainIdMap.put("1301", "桥东第二风电场");
		domainIdMap.put("1401", "敦煌光伏电站");
		domainIdMap.put("1801", "三塘湖风电场");
		domainIdMap.put("1601", "格尔木光伏电站");
		domainIdMap.put("1701", "贝壳梁诺木洪风电场");
//		domainIdMap.put("1801", "麻黄沟东风电一场");
		domainIdMap.put("1802", "淖毛湖风电场");
		domainIdMap.put("1803", "景峡风电场");
		domainIdMap.put("1804", "烟墩风电场");
		domainIdMap.put("1901", "小草湖北风电一场");
		domainIdMap.put("2001", "宁夏风电场");
	};

	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		// electricityJob任务运行时具体参数，可自定义
//		ElectricityJob electricityJob = (ElectricityJob) context
//				.getMergedJobDataMap().get("electricityJobName");
//		JobKey key = context.getJobDetail().getKey();
//		JobDataMap dataMap = context.getJobDetail().getJobDataMap();
//		String electricityJobName = (String) dataMap.get("electricityJobName");
		Map<String, List<Map<String, String>>> map = new HashMap<String, List<Map<String, String>>>();
		try {
			logger.info("获取业务数据开始 ---" );
			/** 获取甘肃电量数据 */
			map = ElectricityJob.gsPower(map);
			if (!map.isEmpty()) {
				ElectricityJob.insertElectricNum(map);
			}
		} catch (ServiceException e) {
			// TODO Auto-generated catch block
			logger.info(e.getMessage());
			e.printStackTrace();
		}
		logger.info("获取业务数据结束");
	}

	/**
	 * 获取各个分电厂和总公司电量
	 * 
	 * @param map
	 * @return
	 * @throws ServiceException
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, List<Map<String, String>>> gsPower(
			Map<String, List<Map<String, String>>> map) throws ServiceException {
		try {
			// 电量 2018-04-26 18:45
			Date date = new Date();
			
//			Long startTime = (Long) ((date.getTime() / 1000) / 86400 * 86400 - 3600 * 8) ;
			Long startTime = (Long) ((date.getTime() / 1000) / 300 * 300 - 600);
			Date startFormatTime = new Date(Long.parseLong(String.valueOf(startTime * 1000)));
			
//			Long endTime = (long) 1525833300;
			Long endTime = (Long) ((date.getTime() / 1000) / 300 * 300);
			Date endFormatTime = new Date(Long.parseLong(String.valueOf(endTime * 1000)));
			
			System.out.println("执行时间： " + sf.format(new Date()));
			/*获取全公司电量*/
			String nowallSql = "SELECT to_char(OCCUR_TIME, 'yyyy-MM-dd hh24:mi') STARTTIME, to_char(CUR_97) POWER_NUM "
					+ "FROM yc_hs_6800 "
					+ "WHERE OCCUR_TIME >= to_date('" + sf.format(startFormatTime)
					+ "', 'yyyy-MM-dd hh24:mi') AND "
					+ "OCCUR_TIME <= to_date('" + sf.format(endFormatTime)
					+ "', 'yyyy-MM-dd hh24:mi') " + "ORDER BY STARTTIME ";
			logger.info("集控电量================" + nowallSql);
			List<Map<String, String>> nowall = new IbatisDBUtil().executeSql(nowallSql);
			map.put("nowall", nowall);
			if (ListUtil.isEmpty(nowall)) {
				throw new ServiceException("", sf.format(startFormatTime) + " - " 
						+ sf.format(endFormatTime) +" 没有查询到电量数据！");
			}
			/*查各个分电厂集控中心数据*/
			String nowlistSql = "SELECT to_char(OCCUR_TIME, 'yyyy-MM-dd hh24:mi') STARTTIME, DOMAIN, to_char(POWER_NUM) POWER_NUM "
					+ "FROM YC_HS_6801 UNPIVOT (POWER_NUM FOR DOMAIN IN "
					+ "(CUR_13, CUR_20, CUR_27, CUR_36, CUR_46, CUR_53, CUR_60, CUR_67, CUR_74, CUR_97)) "
					+ "WHERE OCCUR_TIME >= to_date('" + sf.format(startFormatTime)
					+ "', 'yyyy-MM-dd hh24:mi') AND "
					+ "OCCUR_TIME <= to_date('" + sf.format(endFormatTime)
					+ "', 'yyyy-MM-dd hh24:mi') " + "ORDER BY STARTTIME, DOMAIN ";
			logger.info("集控电量================" + nowlistSql);
			List<Map<String, String>> nowlist = new IbatisDBUtil().executeSql(nowlistSql);
			map.put("nowlist", nowlist);
			if (ListUtil.isEmpty(nowlist)) {
				throw new ServiceException("", sf.format(startFormatTime) + " - " 
						+ sf.format(endFormatTime) +" 没有查询到电量数据！");
			}
			// 查REALTIME_ELECTRICITY_TAB历史数据,剔除重复数据
			String oldlistSql = "SELECT distinct(to_char(RECORD_DATATIME, 'yyyy-MM-dd hh24:mi')) STARTTIME, CONTRACT, REALTIME_TYPE "
					+ "FROM IFSAPP.REALTIME_ELECTRICITY_TAB "
					+ "WHERE RECORD_DATATIME >= to_date('"
					+ sf.format(startFormatTime)
					+ "', 'yyyy-MM-dd hh24:mi') AND "
					+ "RECORD_DATATIME <= to_date('"
					+ sf.format(endFormatTime)
					+ "', 'yyyy-MM-dd hh24:mi') AND REALTIME_TYPE='1' " 
					+ "ORDER BY STARTTIME, CONTRACT ";
			logger.info("对比电量================" + oldlistSql);
			List<Map<String, String>> oldlist = new IbatisDBUtil().executeSql(oldlistSql);
			map.put("oldlist", oldlist);
		} catch (ServiceException e) {
			throw new ServiceException("1003", e.getMsg());
		} catch (Exception e) {
			logger.error("1003", e);
			e.printStackTrace();
			throw new ServiceException("1003", "获取首页数据出错");
		}
		return map;
	}

	public static void insertElectricNum(Map<String, List<Map<String, String>>> map) {
		if (!map.isEmpty()) {
			/*循环遍历分电厂电量数据， 每次数据至多20条数据*/
			List<Map<String, String>> nowlist = map.get("nowlist");
			for (Map<String, String> nowMap : nowlist) {
				String NOW_STARTTIME = nowMap.get("STARTTIME");
				String DOMAIN_ID = domainMap.get(nowMap.get("DOMAIN"));
				String DOMAIN_NAME = domainIdMap.get(DOMAIN_ID);
				BigDecimal POWER_NUM = BigDecimal.valueOf(Double.parseDouble(nowMap.get("POWER_NUM")));
				/*循环遍历全公司电量数据， 替换nowMap内的全公司（id为10）电量数据, 每次数据至多两条数据*/
				List<Map<String, String>> nowall = map.get("nowall");
				for(Map<String, String> nowallMap : nowall) {
					String NOW_ALL_STARTTIME = nowallMap.get("STARTTIME");
					String DOMAIN_ALL_ID = domainMap.get("CUR_97");
					if(NOW_ALL_STARTTIME.equals(NOW_STARTTIME) && DOMAIN_ALL_ID.equals(DOMAIN_ID)) {
						POWER_NUM = BigDecimal.valueOf(Double.parseDouble(nowallMap.get("POWER_NUM")));
					}
				}
				/*判断数据是否在表种是否存在，存在则不插入重复数据。*/
				List<Map<String, String>> oldlist = map.get("oldlist");
				if(!oldlist.isEmpty()) {
					Boolean sameFlag = true;
					for(Map<String, String> oldMap : oldlist) {
						String OLD_STARTTIME = oldMap.get("STARTTIME");
						String CONTRACT = oldMap.get("CONTRACT");
						String REALTIME_TYPE = oldMap.get("REALTIME_TYPE");
						if(NOW_STARTTIME.equals(OLD_STARTTIME) && DOMAIN_ID.equals(CONTRACT) && "1".equals(REALTIME_TYPE)) {
							sameFlag = false;
						}
					} 
					if(sameFlag) {
						String insertSql = "insert into IFSAPP.REALTIME_ELECTRICITY_TAB "
								+ "(RECORD_DATATIME, CONTRACT, REALTIME_TYPE, REAL_VALUE, REAL_NAME, ROWVERSION) "
								+ "VALUES "
								+ "(to_date('" + NOW_STARTTIME + "','yyyy-MM-dd HH24:mi'), " 
								+ "'" + DOMAIN_ID + "', "
								+ "'1', "
								+ POWER_NUM + ", "
								+ "'" + DOMAIN_NAME + "', "
								+ "to_date('" + sf.format(new Date()) + "','yyyy-MM-dd HH24:mi')" 
								+ ")";
						logger.info("strSql==" + insertSql);
						new IbatisDBUtil().executeSql(insertSql);
					}
				} else {
					String insertSql = "insert into IFSAPP.REALTIME_ELECTRICITY_TAB "
							+ "(RECORD_DATATIME, CONTRACT, REALTIME_TYPE, REAL_VALUE, REAL_NAME, ROWVERSION) "
							+ "VALUES "
							+ "(to_date('" + NOW_STARTTIME + "','yyyy-MM-dd HH24:mi'), " 
							+ "'" + DOMAIN_ID + "', "
							+ "'1', "
							+ POWER_NUM + ", "
							+ "'" + DOMAIN_NAME + "', "
							+ "to_date('" + sf.format(new Date()) + "','yyyy-MM-dd HH24:mi')" 
							+ ")";
					logger.info("strSql==" + insertSql);
					new IbatisDBUtil().executeSql(insertSql);
				}
			}
		}
	}
}
