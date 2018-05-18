package com.service.target;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.attendence.sql.AttendReasonServiceSQL;
import com.service.attendence.sql.ClockServiceSQL;
import com.service.target.sql.TargetServiceParam;
import com.service.target.sql.TargetServiceSQL;
import com.utility.*;
import com.utility.baiyin.BaiyinUtils;

import org.apache.commons.lang.time.DateUtils;
import org.json.JSONObject;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class TargetService extends AJsonService implements IJsonService {
    /**
     * 获取生产指标首页数据
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String getTargetIndex(Map map) throws ServiceException {
        String returnString = "";
        try {
            String sql = TargetServiceSQL.targetIndex(map);
            logger.info("sql======"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            }
            Map m = list.get(0);
            String yesSql = "SELECT t.report_id       report_id,"
            		+ " t.day_ele_amount  day_ele_amount,"
            		+ " t.DAY_LOSS_AMOUNT DAY_LOSS_AMOUNT"
            		+ " FROM ifsapp.OPE_UNIT_DAY_INFO t"
            		+ " WHERE t.report_id=to_char((sysdate - 1), 'yyyy-MM-dd')"
            		+ " order by t.report_id";
            logger.info("sql======"+yesSql);
            List<Map> yesDataList = new IbatisDBUtil().executeSql(yesSql);
            m.put("YESTODAY_ELE_AMOUNT", 0);
            
            DecimalFormat df = new DecimalFormat("#.##");
//          同比=用今年减去年再除以去年/(本期数-同期数)/同期数×100%
//          环比=用本月减上月再除以上月/(本期数-上期数)/上期数×100%
            Double daySub = ((BigDecimal) m.get("DAY_ELE_AMOUNT")).doubleValue()-((BigDecimal) m.get("DAY_COMPARED_WITH_SAME")).doubleValue();
            Double dayComp = ((BigDecimal) m.get("DAY_COMPARED_WITH_SAME")).doubleValue() == 0 ? daySub : ((BigDecimal) m.get("DAY_COMPARED_WITH_SAME")).doubleValue();
            Double DAY_COMPARED_WITH_SAME = (daySub * 100)/dayComp;
            m.put("DAY_COMPARED_WITH_SAME", df.format(DAY_COMPARED_WITH_SAME));
            
            Double monthSub = ((BigDecimal) m.get("MONTH_ELE_AMOUNT")).doubleValue()-((BigDecimal) m.get("MONTH_COMPARED_WITH_SAME")).doubleValue();
            Double monthComp  = ((BigDecimal) m.get("MONTH_COMPARED_WITH_SAME")).doubleValue()==0 ? monthSub : ((BigDecimal) m.get("MONTH_COMPARED_WITH_SAME")).doubleValue();
            Double MONTH_COMPARED_WITH_SAME = (monthSub * 100)/monthComp;
            m.put("MONTH_COMPARED_WITH_SAME", df.format(MONTH_COMPARED_WITH_SAME));
            
            Double yearSub = ((BigDecimal) m.get("YEAR_ELE_AMOUNT")).doubleValue()-((BigDecimal) m.get("YEAR_COMPARED_WITH_SAME")).doubleValue();
            Double yearComp = ((BigDecimal) m.get("YEAR_COMPARED_WITH_SAME")).doubleValue()==0? yearSub : ((BigDecimal) m.get("YEAR_COMPARED_WITH_SAME")).doubleValue();
            Double YEAR_COMPARED_WITH_SAME = (yearSub * 100)/yearComp;
            m.put("YEAR_COMPARED_WITH_SAME", df.format(YEAR_COMPARED_WITH_SAME));
            if(!yesDataList.isEmpty()) {
            	m.put("YESTODAY_ELE_AMOUNT", yesDataList.get(0).get("DAY_ELE_AMOUNT"));
            }
            returnString = JsonUtil.mapToJsonString(m,null);
        } catch (ServiceException e) {
            throw new ServiceException("1001", e.getMsg());
        } catch (Exception e) {
            logger.error("1001", e);
            e.printStackTrace();
            throw new ServiceException("1001", "获取首页数据出错");
        }
        return returnString;
    }
    /**
     * 获取生产指标首页数据
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String getTargetIndexLoad(Map map) throws ServiceException {
        String returnString = "";
        try {
            String sql = TargetServiceSQL.targetIndexLoad(map);
            logger.info("sql======"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            }
            Map m = list.get(0);
            returnString = JsonUtil.mapToJsonString(m,null);
        } catch (ServiceException e) {
            throw new ServiceException("1001", e.getMsg());
        } catch (Exception e) {
            logger.error("1001", e);
            e.printStackTrace();
            throw new ServiceException("1001", "获取首页数据出错");
        }
        return returnString;
    }

    /**
     *	日电量点击详情展示
     */
    public String getPdDay(Map map) throws ServiceException {
        String returnString = "";
        try {
            String sql = TargetServiceSQL.getPdDay(map);
            logger.info("sql======"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到日电量详情！");
            }
            returnString = JsonUtil.mapListToJsonString(list,null);
        } catch (ServiceException e) {
            throw new ServiceException("1001", e.getMsg());
        } catch (Exception e) {
            logger.error("1001", e);
            e.printStackTrace();
            throw new ServiceException("1001", "获取首页数据出错");
        }
        return returnString;
    }
    /**
     *	月电量点击后详情展示
     */
    public String getPdMounth(Map map) throws ServiceException {

        String returnString = "";
        try {
            String sql = TargetServiceSQL.getPdMounth(map);
            logger.info("sql======"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到月电量详情！");
            }
            returnString = JsonUtil.mapListToJsonString(list,null);
        } catch (ServiceException e) {
            throw new ServiceException("1001", e.getMsg());
        } catch (Exception e) {
            logger.error("1001", e);
            e.printStackTrace();
            throw new ServiceException("1001", "获取首页数据出错");
        }
        return returnString;
    }
    /**
     *	年电量点击后详情展示
     */
    public String getPdYear(Map map) throws ServiceException {

        String returnString = "";
        try {
            String sql = TargetServiceSQL.getPdYear(map);
            logger.info("sql======"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到年电量详情！");
            }
            returnString = JsonUtil.mapListToJsonString(list,null);
        } catch (ServiceException e) {
            throw new ServiceException("1001", e.getMsg());
        } catch (Exception e) {
            logger.error("1001", e);
            e.printStackTrace();
            throw new ServiceException("1001", "获取首页数据出错");
        }
        return returnString;
    }
    /**
     * 全厂负荷
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String totalLoad(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //全厂实时负荷
            String sql = TargetServiceParam.totalLoad(map).get("load");
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到全厂负荷数据！");
            } else {
                Map m = list.get(0);
                json.put("load", m);
            }
//            //全厂负荷-走势图
//            sql = TargetServiceParam.totalLoad(map).get("hoursLoad");
//            list = new IbatisDBUtil().executeSql(sql);
//            if (ListUtil.isEmpty(list)) {
//                throw new ServiceException("", "没有查询到生产指标首页数据！");
//            }
//            json.put("hoursLoad", list);
        } catch (ServiceException e) {
            throw new ServiceException("1002", e.getMsg());
        } catch (Exception e) {
            logger.error("1002", e);
            e.printStackTrace();
            throw new ServiceException("1002", "获取首页数据出错");
        }
        return json.toString();
    }

    /**
     * 甘肃负荷
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String gsLoad(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //甘肃实时负荷
            String sql = TargetServiceParam.gsLoad(map).get("gsLoad");
            logger.info("甘肃实时================"+sql);
            logger.info("svn测试");
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到甘肃负荷数据！");
            } else {
                Map m = list.get(0);
                json.put("gsLoad", m);
            }
        } catch (ServiceException e) {
            throw new ServiceException("1003", e.getMsg());
        } catch (Exception e) {
            logger.error("1003", e);
            e.printStackTrace();
            throw new ServiceException("1003", "获取首页数据出错");
        }
        return json.toString();
    }

    /**
     * 青海负荷
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String qhLoad(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //青海实时负荷
            String sql = TargetServiceParam.qhLoad(map).get("qhLoad");
            logger.info("青海实时================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到青海负荷数据！");
            } else {
                Map m = list.get(0);
                json.put("qhLoad", m);
            }
        } catch (ServiceException e) {
            throw new ServiceException("1004", e.getMsg());
        } catch (Exception e) {
            logger.error("1004", e);
            e.printStackTrace();
            throw new ServiceException("1004", "获取首页数据出错");
        }
        return json.toString();
    }

    /**
     * 宁夏负荷
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String nxLoad(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //宁夏实时负荷
            String sql = TargetServiceParam.nxLoad(map).get("nxLoad");
            logger.info("宁夏实时================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到宁夏负荷数据！");
            } else {
                Map m = list.get(0);
                json.put("nxLoad", m);
            }
        } catch (ServiceException e) {
            throw new ServiceException("1005", e.getMsg());
        } catch (Exception e) {
            logger.error("1005", e);
            e.printStackTrace();
            throw new ServiceException("1005", "获取首页数据出错");
        }
        return json.toString();
    }

    /**
     * 新疆负荷
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String xjLoad(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //新疆实时负荷
            String sql = TargetServiceParam.xjLoad(map).get("xjLoad");
            logger.info("新疆实时================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到新疆负荷数据！");
            } else {
                Map m = list.get(0);
                json.put("xjLoad", m);
            }
        } catch (ServiceException e) {
            throw new ServiceException("1006", e.getMsg());
        } catch (Exception e) {
            logger.error("1006", e);
            e.printStackTrace();
            throw new ServiceException("1006", "获取首页数据出错");
        }
        return json.toString();
    }

    /**
     * 甘肃电量 -- 周
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String gsPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceSQL.gsPower(map);
            logger.info("甘肃电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到甘肃电量数据！");
            } else {
                json.put("gsPower", list);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceSQL.gsHourPower(map);
            logger.info("甘肃电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到甘肃电量走势图数据！");
            } else {
                json.put("gsHourPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1003", e.getMsg());
        } catch (Exception e) {
            logger.error("1003", e);
            e.printStackTrace();
            throw new ServiceException("1003", "获取首页数据出错");
        }
        return json.toString();
    }
    /**
     * 甘肃电量 -- 小时
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String gsDayPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceSQL.gsPower(map);
            logger.info("甘肃电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到甘肃电量数据！");
            } else {
                json.put("gsPower", list);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceSQL.gsDayPower(map);
            logger.info("甘肃电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到甘肃电量走势图数据！");
            } else {
                json.put("gsDayPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1003", e.getMsg());
        } catch (Exception e) {
            logger.error("1003", e);
            e.printStackTrace();
            throw new ServiceException("1003", "获取首页数据出错");
        }
        return json.toString();
    }
    /*public String gsPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceParam.gsPower(map).get("gsPower");
            logger.info("甘肃电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            } else {
                Map m = list.get(0);
                json.put("gsPower", m);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceParam.gsPower(map).get("gsHourPower");
            logger.info("甘肃电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            } else {
                json.put("gsHourPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1003", e.getMsg());
        } catch (Exception e) {
            logger.error("1003", e);
            e.printStackTrace();
            throw new ServiceException("1003", "获取首页数据出错");
        }
        return json.toString();
    }*/

    /**
     * 青海电量 -- 周
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String qhPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceSQL.qhPower(map);
            logger.info("青海电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到青海电量数据！");
            } else {
                json.put("qhPower", list);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceSQL.qhHourPower(map);
            logger.info("青海电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到青海电量走势图数据！");
            } else {
                json.put("qhHourPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1004", e.getMsg());
        } catch (Exception e) {
            logger.error("1004", e);
            e.printStackTrace();
            throw new ServiceException("1004", "获取首页数据出错");
        }
        return json.toString();
    }
    /**
     * 青海电量 -- 小时
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String qhDayPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceSQL.qhPower(map);
            logger.info("青海电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到青海电量数据！");
            } else {
                json.put("qhPower", list);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceSQL.qhDayPower(map);
            logger.info("青海电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到青海电量走势图数据！");
            } else {
                json.put("qhDayPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1004", e.getMsg());
        } catch (Exception e) {
            logger.error("1004", e);
            e.printStackTrace();
            throw new ServiceException("1004", "获取首页数据出错");
        }
        return json.toString();
    }
    /*public String qhPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceParam.qhPower(map).get("qhPower");
            logger.info("青海电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            } else {
                Map m = list.get(0);
                json.put("qhPower", m);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceParam.qhPower(map).get("qhHourPower");
            logger.info("青海电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            } else {
                json.put("qhHourPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1004", e.getMsg());
        } catch (Exception e) {
            logger.error("1004", e);
            e.printStackTrace();
            throw new ServiceException("1004", "获取首页数据出错");
        }
        return json.toString();
    }*/

    /**
     * 宁夏电量 -- 周
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String nxPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceSQL.nxPower(map);
            logger.info("宁夏电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到宁夏电量数据！");
            } else {
                json.put("nxPower", list);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceSQL.nxHourPower(map);
            logger.info("宁夏电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到宁夏电量走势图数据！");
            } else {
                json.put("nxHourPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1005", e.getMsg());
        } catch (Exception e) {
            logger.error("1005", e);
            e.printStackTrace();
            throw new ServiceException("1005", "获取首页数据出错");
        }
        return json.toString();
    }
    /**
     * 宁夏电量 -- 小时
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String nxDayPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceSQL.nxPower(map);
            logger.info("宁夏电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到宁夏电量数据！");
            } else {
                json.put("nxPower", list);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceSQL.nxDayPower(map);
            logger.info("宁夏电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到宁夏电量走势图数据！");
            } else {
                json.put("nxDayPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1005", e.getMsg());
        } catch (Exception e) {
            logger.error("1005", e);
            e.printStackTrace();
            throw new ServiceException("1005", "获取首页数据出错");
        }
        return json.toString();
    }
    /*public String nxPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceParam.nxPower(map).get("nxPower");
            logger.info("宁夏电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            } else {
                Map m = list.get(0);
                json.put("nxPower", m);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceParam.nxPower(map).get("nxHourPower");
            logger.info("宁夏电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            } else {
                json.put("nxHourPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1005", e.getMsg());
        } catch (Exception e) {
            logger.error("1005", e);
            e.printStackTrace();
            throw new ServiceException("1005", "获取首页数据出错");
        }
        return json.toString();
    }*/

    /**
     * 新疆电量 -- 周
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String xjPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceSQL.xjPower(map);
            logger.info("新疆电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到新疆电量数据！");
            } else {
                json.put("xjPower", list);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceSQL.xjHourPower(map);
            logger.info("新疆电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到新疆电量走势图数据！");
            } else {
                json.put("xjHourPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1006", e.getMsg());
        } catch (Exception e) {
            logger.error("1006", e);
            e.printStackTrace();
            throw new ServiceException("1006", "获取首页数据出错");
        }
        return json.toString();
    }
    /**
     * 新疆电量 -- 小时
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String xjDayPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceSQL.xjPower(map);
            logger.info("新疆电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到新疆电量数据！");
            } else {
                json.put("xjPower", list);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceSQL.xjDayPower(map);
            logger.info("新疆电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到新疆电量走势图数据！");
            } else {
                json.put("xjDayPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1006", e.getMsg());
        } catch (Exception e) {
            logger.error("1006", e);
            e.printStackTrace();
            throw new ServiceException("1006", "获取首页数据出错");
        }
        return json.toString();
    }
    /*public String xjPower(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //电量
            String sql = TargetServiceParam.xjPower(map).get("xjPower");
            logger.info("新疆电量================"+sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            } else {
                Map m = list.get(0);
                json.put("xjPower", m);
            }
            //走势图
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            String powerSql = TargetServiceParam.xjPower(map).get("xjHourPower");
            logger.info("新疆电量走势图================"+powerSql);
            List<Map> powerList = new IbatisDBUtil().executeSql(powerSql);
            if (ListUtil.isEmpty(powerList)){
                throw new ServiceException("", "没有查询到生产指标首页数据！");
            } else {
                json.put("xjHourPower", powerList);
            }
            json.put("dateStr",dateStr);
        } catch (ServiceException e) {
            throw new ServiceException("1006", e.getMsg());
        } catch (Exception e) {
            logger.error("1006", e);
            e.printStackTrace();
            throw new ServiceException("1006", "获取首页数据出错");
        }
        return json.toString();
    }*/

    /**
     * 全厂的昨小时、今小时的查询
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String totalHoursLoad(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //昨日走势数据
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            map.put(Constant.CHART_COND, dateStr);
            String sql = TargetServiceSQL.targetHoursIndex(map);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            json.put("yestLoad", list);
            //今日走势数据
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            sql = TargetServiceSQL.targetHoursIndex(map);
            list = new IbatisDBUtil().executeSql(sql);
            json.put("todayLoad", list);
            //获取标签
            json.put("hList", TargetServiceParam.getHoursLabels());
            json.put("dateStr", dateStr);
        } catch (Exception e) {
            logger.error("1008", e);
            e.printStackTrace();
            throw new ServiceException("1008", "获取走势数据出错");
        }
        return json.toString();
    }

    /**
     * 生产指标主界面
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listOpeProgramIndexRepCompany(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            //获取本月日期列表
            json.put("dList", BaiyinUtils.genCurrDateList(new SimpleDateFormat("yyyy-MM-dd").format(DateUtils.addDays(new Date(), -1))));
            //查询日发电量
            if (MapUtil.valueIsNull(map, "REPORT_ID")) {
                map.put("REPORT_ID", new SimpleDateFormat("yyyy-MM-dd").format(DateUtils.addDays(new Date(), -1)));
            }
            String sql = TargetServiceSQL.opeProgramIndexRepCompany(map);
            JdbcDBUtil jdbc = new JdbcDBUtil();
//            List<Map> tList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            /*if (ListUtil.isEmpty(tList)) {
                throw new ServiceException("", "没有查询到生产指标数据");
            }*/
            json.put("dayList", tList);
            Map allm = new HashMap();
            initAllM(allm);
            if(ListUtil.isNotEmpty(tList)){
                for(Map m:tList){
                    allm.put("DAY_ELE_AMOUNT",MapUtil.valueIsNotNull(allm,"DAY_ELE_AMOUNT")?
                            MapUtil.doubleValue(allm,"DAY_ELE_AMOUNT")+MapUtil.doubleValue(m,"DAY_ELE_AMOUNT"):MapUtil.doubleValue(m,"DAY_ELE_AMOUNT"));
                allm.put("DAY_LOSS_AMOUNT",MapUtil.valueIsNotNull(allm,"DAY_LOSS_AMOUNT")?
                            MapUtil.doubleValue(allm,"DAY_LOSS_AMOUNT")+MapUtil.doubleValue(m,"DAY_LOSS_AMOUNT"):MapUtil.doubleValue(m,"DAY_LOSS_AMOUNT"));
                allm.put("MONTH_ELE_AMOUNT",MapUtil.valueIsNotNull(allm,"MONTH_ELE_AMOUNT")?
                            MapUtil.doubleValue(allm,"MONTH_ELE_AMOUNT")+MapUtil.doubleValue(m,"MONTH_ELE_AMOUNT"):MapUtil.doubleValue(m,"MONTH_ELE_AMOUNT"));
                allm.put("MONTH_LOSS_AMOUNT",MapUtil.valueIsNotNull(allm,"MONTH_LOSS_AMOUNT")?
                            MapUtil.doubleValue(allm,"MONTH_LOSS_AMOUNT")+MapUtil.doubleValue(m,"MONTH_LOSS_AMOUNT"):MapUtil.doubleValue(m,"MONTH_LOSS_AMOUNT"));
                allm.put("YEAR_ELE_AMOUNT",MapUtil.valueIsNotNull(allm,"YEAR_ELE_AMOUNT")?
                            MapUtil.doubleValue(allm,"YEAR_ELE_AMOUNT")+MapUtil.doubleValue(m,"YEAR_ELE_AMOUNT"):MapUtil.doubleValue(m,"YEAR_ELE_AMOUNT"));
                allm.put("YEAR_LOSS_AMOUNT",MapUtil.valueIsNotNull(allm,"YEAR_LOSS_AMOUNT")?
                            MapUtil.doubleValue(allm,"YEAR_LOSS_AMOUNT")+MapUtil.doubleValue(m,"YEAR_LOSS_AMOUNT"):MapUtil.doubleValue(m,"YEAR_LOSS_AMOUNT"));
                }
            }
            json.put("allm", allm);
            //将显示区间传回
            json.put("dateStr",new SimpleDateFormat("yyyy-MM").format(new Date())+"-01~"+MapUtil.stringValue(map,"REPORT_ID"));
        } catch (ServiceException e) {
            throw new ServiceException("1009", e.getMsg());
        } catch (Exception e) {
            logger.error("1009", e);
            e.printStackTrace();
            throw new ServiceException("1009", "获取生产指标数据出错");
        }
        return json.toString();
    }

    /**
     * 初始化总数据
     * @param allm
     */
    private void initAllM(Map allm) {
        allm.put("DAY_ELE_AMOUNT","0");
        allm.put("DAY_LOSS_AMOUNT","0");
        allm.put("MONTH_ELE_AMOUNT","0");
        allm.put("MONTH_LOSS_AMOUNT","0");
        allm.put("YEAR_ELE_AMOUNT","0");
        allm.put("YEAR_LOSS_AMOUNT","0");
    }

    /**
     * 生产指标主界面-图列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listOpeProgramIndexRepCompanyChart(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            //查询日发电量
            if (MapUtil.valueIsNull(map, "REPORT_ID")) {
                map.put("REPORT_ID", new SimpleDateFormat("yyyy-MM-dd").format(DateUtils.addDays(new Date(), -1)));
            }
            JdbcDBUtil jdbc = new JdbcDBUtil();
            //查询从1号到所传日期的发电量走势图
            String sql = TargetServiceSQL.opeProgramIndexRepCompanyGroup(map);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
//            List<Map> tList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            json.put("chartList", tList);
        } catch (Throwable e) {
            logger.error("1009", e);
            e.printStackTrace();
            throw new ServiceException("1009", "获取生产指标数据出错");
        }
        return json.toString();
    }

    /**
     * 获取电量首页信息
     * 日电量，月电量，年电量
     * @param map
     * @return
     * @throws ServiceException
     */
    public String getTotalPower(Map map) throws ServiceException {
        String returnString = "";
        try {
            String sql = TargetServiceParam.totalPower(map).get("load");
            logger.info(sql);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到电量首页数据");
            }
            Map m = list.get(0);
            returnString = JsonUtil.mapToJsonString(m,null);
        } catch (ServiceException e) {
            throw new ServiceException("1010", e.getMsg());
        } catch (Throwable e) {
            logger.error("1010", e);
            e.printStackTrace();
            throw new ServiceException("1010", "获取电量首页首页数据出错");
        }
        return returnString;
    }

    /**
     * 根据权限获取电场列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listCompanySiteAddress(Map map) throws ServiceException {
        String returnString = "";
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map,Constant.USER_ID));
            String sql = TargetServiceSQL.companySiteAddress(map);
            logger.info(sql);
            JdbcDBUtil jdbc = new JdbcDBUtil();

            List<Map> list = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到电场数据！");
            }
            List<Map> t = new ArrayList<Map>();
            String type="";
            if(MapUtil.valueIsNotNull(map,"type")){
                type = MapUtil.stringValue(map,"type");
            }
            if(list.size()>6&&!"sel".equals(type)){
                Map m2 = new HashMap();
                m2.put("CONTRACT","1000");
                m2.put("DESCRIPTION","集控中心");
                m2.put("CITY","兰州市");
                t.add(m2);
                for(Map m:list){
                    t.add(m);
                }
            }else{
                t = list;
            }
            returnString = JsonUtil.mapListToJsonString(t);
        } catch (ServiceException e) {
            throw new ServiceException("1011", e.getMsg());
        } catch (Throwable e) {
            logger.error("1011", e);
            e.printStackTrace();
            throw new ServiceException("1011", "获取电场数据出错");
        }
        return returnString;
    }

    /**
     * 获取甘青宁新的走势图数据
     * @param map
     * @return
     * @throws ServiceException
     */
    public String chartGqnxLoad(Map map)throws ServiceException{
        JSONObject json= new JSONObject();
        try {
            //昨小时数据
            String dateStr = DateUtil.formDate(DateUtils.addDays(new Date(), -1), "");
            map.put(Constant.CHART_COND, dateStr);
            String sql = TargetServiceParam.totalLoad(map).get("hoursLoad");
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            json.put("yestLoad", list);
            //今小时走势图
            dateStr = DateUtil.formDate(new Date(), "");
            map.put(Constant.CHART_COND, dateStr);
            sql = TargetServiceParam.totalLoad(map).get("hoursLoad");
            list = new IbatisDBUtil().executeSql(sql);
            json.put("todayLoad", list);
            json.put("dateStr", dateStr);
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("1012","获取走势图出错！");
        }
        return json.toString();
    }

    /**
     * 查看近一小时数据
     * @param map
     * @return
     * @throws ServiceException
     */
    public String nearlyOneHourT(Map map)throws ServiceException{
        JSONObject json= new JSONObject();
        try {
            String sql = TargetServiceSQL.nearlyOneHourT(map);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            json.put("hList", list);
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("1013","获取近一小时数据出错！");
        }
        return json.toString();
    }

    /**
     * 查询近一小时甘青宁新数据
     * @param map
     * @return
     * @throws ServiceException
     */
    public String nearlyOneHourP(Map map)throws ServiceException{
        JSONObject json= new JSONObject();
        try {
            String sql = TargetServiceSQL.nearlyOneHourP(map);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            json.put("hList", list);
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("1013","获取近一小时数据出错！");
        }
        return json.toString();
    }
    /**
     * 查看本月全厂数据
     * @param map
     * @return
     * @throws ServiceException
     */
    public String currMonthT(Map map)throws ServiceException{
        JSONObject json= new JSONObject();
        try {
            String sql = TargetServiceSQL.currMonthT(map);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            json.put("hList", list);
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("1014","获取全厂当月数据出错！");
        }
        return json.toString();
    }

    /**
     * 查看各个省份本月数据
     * @param map
     * @return
     * @throws ServiceException
     */
    public String currMonthP(Map map)throws ServiceException{
        JSONObject json= new JSONObject();
        try {
            String sql = TargetServiceSQL.currMonthP(map);
            List<Map> list = new IbatisDBUtil().executeSql(sql);
            json.put("hList", list);
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("1015","获取当月数据出错！");
        }
        return json.toString();
    }

    /**
     * 查询生产管理首页广告页
     * @param map
     * @return
     * @throws ServiceException
     */
    public String productPageAd(Map map)throws ServiceException{
        JSONObject json= new JSONObject();
        try{
            String imageUrl = BaiyinUtils.imagesUrl(url);
            json.put("advert0",imageUrl+"advert0.png");
            json.put("advert1",imageUrl+"advert1.png");
            json.put("advert2",imageUrl+"advert2.png");
        }catch (Throwable e){
            logger.error("1016",e);
            e.printStackTrace();
            throw new ServiceException("1016",e.getMessage());
        }

        return json.toString();
    }

    /**
     * 日电量明细数据
     * @param map
     * @return
     * @throws ServiceException
     */
    public String dayPowerDetail(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try {
            String startDate = new SimpleDateFormat("yyyy-MM").format(DateUtils.addDays(new Date(), -1))+"-01";
            String endDate =  new SimpleDateFormat("yyyy-MM-dd").format(DateUtils.addDays(new Date(), -1));
            //查询日电量明细
            String sql = TargetServiceSQL.dayPowerDetail(startDate,endDate);
            List<Map> rList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isEmpty(rList)){
                code="1";
                msg="没有查询到日电量数据！";
            }else{
                for(Map m:rList){
                    String reportId = m.get("REPORT_ID")+"";
                    m.put("YEAR",reportId.split("-")[0]);
                    m.put("MONTH_DAY",reportId.split("-")[1]+"月"+reportId.split("-")[2]+"日");
                }
            }
            json.put("rList", rList);
        } catch (Throwable e) {
            logger.error("1017", e);
            e.printStackTrace();
            throw new ServiceException("1017", "获取日电量明细数据出错");
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
