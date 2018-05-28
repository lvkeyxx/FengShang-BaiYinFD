package com.service.electric;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;

import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.electric.sql.ElecSettlementSQL;
import com.utility.IbatisDBUtil;
import com.utility.ListUtil;

public class ElecSettlementService extends AJsonService implements IJsonService{
	
	static Map<String, String> domainIdMap = new HashMap<String, String>();
	static {
		domainIdMap.put("10", "全公司");
		domainIdMap.put("1101", "捡财塘风电场");
		domainIdMap.put("1201", "北大桥东风电场");
		domainIdMap.put("1301", "桥东第二风电场");
		domainIdMap.put("1401", "敦煌光伏电站");
		domainIdMap.put("1501", "石嘴山光伏电站");
		domainIdMap.put("1801", "三塘湖风电场");
		domainIdMap.put("1601", "格尔木光伏电站");
		domainIdMap.put("1701", "贝壳梁诺木洪风电场");
		domainIdMap.put("1802", "淖毛湖风电场");
		domainIdMap.put("1803", "景峡风电场");
		domainIdMap.put("1804", "烟墩风电场");
		domainIdMap.put("1901", "小草湖北风电一场");
		domainIdMap.put("2001", "宁夏风电场");
	}
	
	/**
     * 结算电量省属电厂列表
     * @param map
     * @return
     * @throws ServiceException
     */
	public String getElecSettlementDepartment(Map map) throws ServiceException{
		JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try{
			// 省属电厂名数据获取
			String departsql = "select distinct(CONTRACT),DESCRIPTION,CITY  from IFSAPP.COMPANY_SITE_ADDRESS T";
		    logger.info("departsql====="+departsql);
		    List<Map> dList = new IbatisDBUtil().executeSql(departsql);
		    List<Map> departList = new ArrayList<Map>();
		    String domains = "1101, 1201, 1301, 1401";
		    if("GS".equals(map.get("provience"))) {// 甘肃电厂
		    	domains = "1101, 1201, 1301, 1401";
		    } else if("QH".equals(map.get("provience"))) {
		    	domains = "1701, 1601";
		    } else if("NX".equals(map.get("provience"))) {
		    	domains = "1501";
		    } else if("XJ".equals(map.get("provience"))) {
		    	domains = "1801, 1802, 1803, 1804, 1901";
		    }
			for(String domain : domains.split(",")) {
				Map<String, String> departmap = new HashMap<String, String> ();
				departmap.put("CONTRACT", domain.trim());
				departmap.put("CONTRACT_NAME", domainIdMap.get(domain.trim()));
				System.out.println(domainIdMap.get(domain));
				departList.add(departmap);
			}
			if(departList.isEmpty()) {
				code = "1";
	            msg = "获取结算电量省属电厂列表出错";
			}
			json.put("departList",departList);
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("7003","获取结算电量省属电厂列表出错");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return json.toString();
	}
	/**
     * 结算电量首页、省属电厂：饼图数据、表格数据
     * @param map
     * @return
     * @throws ServiceException
     */
    public String getElecSettlementAll(Map map) throws ServiceException{
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try{
        	// 饼图sql
            String yearpsql = ElecSettlementSQL.getElecSettlementYearInfo(map);
            logger.info("yearpsql====="+yearpsql);
            List<Map> yearpList = new IbatisDBUtil().executeSql(yearpsql);
            // 表格月份数据
            String tsql = ElecSettlementSQL.getElecSettlementMonInfo(map);
            logger.info("tsql====="+tsql);
            List<Map> tList = new IbatisDBUtil().executeSql(tsql);
            // 获取合计电量电价
            String totalsql = ElecSettlementSQL.getElecSettlementQCInfo(map);
            logger.info("totalsql====="+totalsql);
            List<Map> totalList = new IbatisDBUtil().executeSql(totalsql);
            if(ListUtil.isEmpty(tList)){
            	code = "1";
            	msg = "未查询到结算电量信息";
            }
            json.put("pList",yearpList);
            json.put("tList",tList);
            json.put("totalList", totalList);
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("7003","获取结算电量信息出错");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return json.toString();
    }
    
    /**
     * 结算电量首页、省属电厂：表格数据的行点击数据获取
     * @param map
     * @return
     * @throws ServiceException
     */
    public String getElecSettlementMonthPie(Map map) throws ServiceException{
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try{
        	// 饼图sql
            String monpsql = ElecSettlementSQL.getElecSettlementYearInfo(map);
            logger.info("sql====="+monpsql);
            List<Map> monpList = new IbatisDBUtil().executeSql(monpsql);
            if(ListUtil.isEmpty(monpList)){
            	code = "1";
            	msg = "未查询到结算电量月份信息";
            }
            json.put("pList",monpList);
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("7003","获取结算电量信息出错");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return json.toString();
    }
}

	