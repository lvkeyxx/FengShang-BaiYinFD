package com.service.target.sql;


import com.constant.Constant;
import com.exception.ServiceException;
import com.utility.DateUtil;
import com.utility.MapUtil;
import com.utility.StringUtil;
import org.apache.commons.lang.time.DateUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TargetServiceSQL {
    /**
     * 获取指标管理首页的数据
     * 1.全公司总负荷
     * 2.全公司日发电量
     * 3.全公司月发电量
     * 4.全公司年发电量
     * 5.日等效利用小时数
     * 
     * 同比=用今年减去年再除以去年/(本期数-同期数)/同期数×100%
	 * 环比=用本月减上月再除以上月/(本期数-上期数)/上期数×100%
     *
     * @param map
     * @return
     */
    public static String targetIndex(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.day_ele_amount  day_ele_amount ,");
        sb.append(" to_char((sysdate), 'yyyy-MM-dd') years_today_date,");
        sb.append(" t.month_ele_amount  month_ele_amount,");
        sb.append(" t.year_ele_amount  year_ele_amount,");
        sb.append(" t.day_ele_amount*10/to_char(sysdate,'hh24')  day_ele_avg_capacity, ");
        sb.append(" t.day_ele_amount/t.total_capacity_0   day_use_hour ,");
        sb.append(" t.month_plan_amount   month_plan_amount,");
        sb.append(" t.year_plan_amount   year_plan_amount,");
        sb.append(" t.month_ele_amount/t.total_capacity_0   month_use_hour,");
        sb.append(" t.year_ele_amount/t.total_capacity_0      year_use_hour,");
        sb.append(" t.month_ele_amount/t.month_plan_amount * 100    month_plan_complete,");
        sb.append(" t.year_ele_amount/t.year_plan_amount * 100     year_plan_complete,");
        sb.append(" (select ts.day_ele_amount from ifsapp.ope_unit_day_info ts WHERE ts.report_id = to_char((sysdate - 1), 'yyyy-MM-dd') ) day_compared_with_same ,");
        sb.append(" (select ts.month_ele_amount from ifsapp.ope_unit_day_info ts WHERE ts.report_id = to_char(add_months((sysdate - 1),-1), 'yyyy-MM-dd') ) month_compared_with_same ,");
        sb.append(" (select ts.year_ele_amount from ifsapp.ope_unit_day_info ts WHERE ts.report_id = to_char(add_months((sysdate - 1),-12), 'yyyy-MM-dd') ) year_compared_with_same");
        sb.append(" FROM ifsapp.OPE_UNIT_DAY_INFO t");
        sb.append(" WHERE t.report_id = to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and  t.total_capacity_0<>0");
        sb.append(" and  t.month_plan_amount<>0");
        sb.append(" and  t.year_plan_amount<>0");

        return sb.toString();
    }
    public static String targetIndexLoad(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.cur_96 TOTAL_POWER ,");
        sb.append(" t.cur_97/10 DAY_POWER,");
        sb.append(" t.cur_98 MONTH_POWER,");
        sb.append(" t.cur_99 YEAR_POWER, ");
        sb.append(" t.cur_100 DAY_EQUI ");
        sb.append(" from yc_hs_6800 t ");
        sb.append(" where CEIL((sysdate-t.occur_time) * 24*60  )<=60");
        sb.append(" order by t.occur_time desc");
        return sb.toString();
    }
    /**
     *	日电量点击详情展示
     */
    public static String getPdDay(Map map) {
        StringBuffer sb = new StringBuffer();
        int startDay = MapUtil.intValue(map,"START_DAY");
        sb.append("SELECT t.report_id  report_id,");
        sb.append(" t.day_ele_amount    day_ele_amount,");
        sb.append(" t.DAY_LOSS_AMOUNT   DAY_LOSS_AMOUNT");
        sb.append(" FROM ifsapp.OPE_UNIT_DAY_INFO t ");
        sb.append(" WHERE t.report_id between to_char((sysdate - "+startDay+"), 'yyyy-MM-dd') and");
        sb.append(" to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" order by t.report_id ");

        return sb.toString();
    }
    /**
     *	月电量点击详情展示
     */
    public static String getPdMounth(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id report_id,");
        sb.append("  to_char(to_date(t.report_id,'yyyy-MM-dd'),'yyyy-MM') year_month,");
        sb.append("  t.month_ele_amount  month_ele_amount, ");
        sb.append(" t.MONTH_LOSS_AMOUNT  MONTH_LOSS_AMOUNT, ");
        sb.append(" t.month_ele_amount/t.month_plan_amount   month_plan_complete");
        sb.append("  FROM ifsapp.OPE_UNIT_DAY_INFO t");
        sb.append(" WHERE t.report_id in");
        sb.append("  (to_char(last_day(add_months(sysdate-1, -1)), 'yyyy-MM-dd'),");
        sb.append("  to_char(last_day(add_months(sysdate-1, -2)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -3)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -4)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -6)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -7)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -8)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -9)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -10)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -11)), 'yyyy-MM-dd'),");
        sb.append(" to_char(last_day(add_months(sysdate-1, -12)), 'yyyy-MM-dd'),");
        sb.append("  to_char(sysdate-1,'yyyy-MM-dd'))");
        sb.append("  and t.month_plan_amount<>0");
        sb.append(" order by t.report_id ");

        return sb.toString();
    }
    /**
     *	年电量点击详情展示
     */
    public static String getPdYear(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id report_id, ");
        sb.append("  to_char(to_date(t.report_id,'yyyy-MM-dd'),'yyyy') year,");
        sb.append("   t.year_ele_amount  year_ele_amount,");
        sb.append(" t.YEAR_LOSS_AMOUNT  YEAR_LOSS_AMOUNT,");
        sb.append(" t.year_ele_amount/t.year_plan_amount   year_plan_complete");
        sb.append("  FROM ifsapp.OPE_UNIT_DAY_INFO t");
        sb.append(" WHERE t.report_id in");
        sb.append(" (to_char(sysdate-1, 'yyyy')-1||'-12-31',");
        sb.append(" to_char(sysdate-1, 'yyyy')-2||'-12-31',");
        sb.append(" to_char(sysdate-1, 'yyyy')-3||'-12-31',");
        sb.append(" to_char(sysdate-1, 'yyyy')-4||'-12-31',");
        sb.append(" to_char(sysdate-1, 'yyyy')-5||'-12-31',");
        sb.append(" to_char(sysdate-1,'yyyy-MM-dd'))");
        sb.append(" and t.year_plan_amount <>0");
        sb.append(" order by t.report_id ");

        return sb.toString();
    }
    /**
     * 全厂数据
     *
     * @param map
     * @return
     */
    public static String targetHoursIndex(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.cur_96 TOTAL_POWER,to_char(t.occur_time,'hh24:mi') occur_time ");
        sb.append(" from yc_hs_6800 t ");
//        sb.append(" where to_char(t.occur_time, 'yyyy-MM-dd hh24:mi') in("+ MapUtil.stringValue(map, Constant.CHART_COND)+")");
        sb.append(" where to_char(t.occur_time, 'yyyy-MM-dd') ='" + MapUtil.stringValue(map, Constant.CHART_COND) + "'");
        sb.append(" order by t.occur_time ");
        return sb.toString();
    }

    /**
     * 总负荷，显示
     * 1.甘肃实时负荷
     * 2.青海实时负荷
     * 3.宁夏实时负荷
     * 4.新疆实时负荷
     *
     * @param map
     * @return
     */
    public static String load(Map map, Map<String, String> param) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.occur_time,");
        sb.append(loadMap(param));
        sb.append(" from yc_hs_6801 t ");
        sb.append(" where CEIL((sysdate-t.occur_time) * 24*60  )<=60");
        sb.append(" order by t.occur_time desc");
        return sb.toString();
    }

    /**
     * 获取甘肃电量
     */
    public static String gsPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id repoart_id,");
        sb.append(" t.contract contract,");
        sb.append(" t.contract_name contract_name,");
        sb.append(" t.day_ele_amount day_ele_amount,");
        sb.append(" t.month_ele_amount month_ele_amount,");
        sb.append(" t.year_ele_amount year_ele_amount");
        sb.append(" from ifsapp.OPE_UNIT_TIME_CONTR_INFO  t");
        sb.append(" WHERE t.report_id = to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and t.contract in ('1101', '1201', '1301', '1401')");

        return sb.toString();
    }/**
     * 获取甘肃电量曲线图-小时
     */
    public static String gsDayPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("select record_datatime,contract,contract_name,");
        sb.append(" round(real_value, 4) as real_value");
        sb.append(" FROM ifsapp.OPE_UNIT_TIME_INFO ");
        sb.append(" where  record_datatime<sysdate and");
        sb.append(" contract in ('1101', '1201', '1301', '1401')");
        sb.append(" and mod(day_row_num - 1, 5) = 0");

        return sb.toString();
    }
    /**
     * 获取甘肃电量曲线图
     */
    public static String gsHourPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id report_id,");
        sb.append(" t.contract contract,");
        sb.append(" t.contract_name contract_name,");
        sb.append(" t.day_ele_amount day_ele_amount,");
        sb.append(" t.month_ele_amount month_ele_amount,");
        sb.append(" t.year_ele_amount year_ele_amount");
        sb.append(" from ifsapp.OPE_UNIT_TIME_CONTR_INFO t");
        sb.append(" WHERE  t.report_id between to_char((sysdate - 10), 'yyyy-MM-dd') and");
        sb.append(" to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and t.contract in ('1101', '1201', '1301', '1401')");
        sb.append(" order by t.report_id");

        return sb.toString();
    }

    /**
     * 青海电量
     * @param map
     * @return
     */
    public static String qhPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id repoart_id,t.contract contract,");
        sb.append(" t.contract_name contract_name,");
        sb.append(" t.day_ele_amount day_ele_amount,");
        sb.append(" t.month_ele_amount month_ele_amount,");
        sb.append(" t.year_ele_amount year_ele_amount");
        sb.append(" from ifsapp.OPE_UNIT_TIME_CONTR_INFO t");
        sb.append(" WHERE t.report_id = to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and t.contract in  ('1701', '1601')");

        return sb.toString();
    }
    /**
     * 青海电量走势图
     * @param map
     * @return
     */
    public static String qhHourPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id repoart_id,t.contract contract,");
        sb.append(" t.contract contract,");
        sb.append(" t.contract_name contract_name,");
        sb.append(" t.day_ele_amount day_ele_amount,");
        sb.append(" t.month_ele_amount month_ele_amount,");
        sb.append(" t.year_ele_amount year_ele_amount");
        sb.append(" from ifsapp.OPE_UNIT_TIME_CONTR_INFO t");
        sb.append(" WHERE  t.report_id between to_char((sysdate - 10), 'yyyy-MM-dd') and");
        sb.append(" to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and t.contract in ('1701', '1601')");

        return sb.toString();
    }
    /**
     * 青海电量走势图--小时
     * @param map
     * @return
     */
    public static String qhDayPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("select record_datatime,contract,contract_name,");
        sb.append(" round(real_value, 4) as real_value");
        sb.append(" FROM ifsapp.OPE_UNIT_TIME_INFO ");
        sb.append(" where  record_datatime<sysdate");
        sb.append(" and contract in ('1701', '1601')");
        sb.append(" and mod(day_row_num - 1, 5) = 0");

        return sb.toString();
    }
    /**
     * 宁夏电量
     * @param map
     * @return
     */
    public static String nxPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id repoart_id,t.contract contract,");
        sb.append(" t.contract_name contract_name,");
        sb.append(" t.day_ele_amount day_ele_amount,");
        sb.append(" t.month_ele_amount month_ele_amount,");
        sb.append(" t.year_ele_amount year_ele_amount");
        sb.append(" from ifsapp.OPE_UNIT_TIME_CONTR_INFO t");
        sb.append(" WHERE t.report_id = to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and t.contract in  ('1501')");

        return sb.toString();
    }
    /**
     * 宁夏电量走势图
     * @param map
     * @return
     */
    public static String nxHourPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id repoart_id,t.contract contract,");
        sb.append(" t.contract_name contract_name,");
        sb.append(" t.day_ele_amount day_ele_amount,");
        sb.append(" t.month_ele_amount month_ele_amount,");
        sb.append(" t.year_ele_amount year_ele_amount");
        sb.append(" from ifsapp.OPE_UNIT_TIME_CONTR_INFO t");
        sb.append(" WHERE  t.report_id between to_char((sysdate - 10), 'yyyy-MM-dd') and to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and  t.contract in ('1501')");

        return sb.toString();
    }
    /**
     * 宁夏电量走势图-小时
     * @param map
     * @return
     */
    public static String nxDayPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("select record_datatime,contract,contract_name,");
        sb.append(" round(real_value, 4) as real_value");
        sb.append(" FROM ifsapp.OPE_UNIT_TIME_INFO ");
        sb.append(" where  record_datatime<sysdate");
        sb.append(" and contract in ('1501')");
        sb.append(" and mod(day_row_num - 1, 5) = 0");

        return sb.toString();
    }
    /**
     * 新疆电量
     * @param map
     * @return
     */
    public static String xjPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id repoart_id,t.contract contract,");
        sb.append(" t.contract_name contract_name,");
        sb.append(" t.day_ele_amount day_ele_amount,");
        sb.append(" t.month_ele_amount month_ele_amount,");
        sb.append(" t.year_ele_amount year_ele_amount");
        sb.append(" from ifsapp.OPE_UNIT_TIME_CONTR_INFO t");
        sb.append(" WHERE t.report_id = to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and t.contract in  ('1801','1802','1803','1804','1901')");

        return sb.toString();
    }
    /**
     * 新疆电量走势图
     * @param map
     * @return
     */
    public static String xjHourPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.report_id repoart_id,t.contract contract,");
        sb.append(" ifsapp.COMPANY_SITE_API.Get_Description(CONTRACT) contract_name,");
        sb.append(" t.day_ele_amount day_ele_amount,");
        sb.append(" t.month_ele_amount month_ele_amount,");
        sb.append(" t.year_ele_amount year_ele_amount");
        sb.append(" from ifsapp.OPE_UNIT_TIME_CONTR_INFO t");
        sb.append(" WHERE  t.report_id between to_char((sysdate - 10), 'yyyy-MM-dd') and");
        sb.append(" to_char((sysdate), 'yyyy-MM-dd')");
        sb.append(" and t.contract in ('1801','1802','1803','1804','1901')");

        return sb.toString();
    }
    /**
     * 新疆电量走势图-小时
     * @param map
     * @return
     */
    public static String xjDayPower(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("select record_datatime,contract,contract_name,");
        sb.append(" round(real_value, 4) as real_value");
        sb.append(" FROM ifsapp.OPE_UNIT_TIME_INFO ");
        sb.append(" where  record_datatime<sysdate");
        sb.append(" and contract in ('1801','1802','1803','1804','1901')");
        sb.append(" and mod(day_row_num - 1, 5) = 0");

        return sb.toString();
    }
    /**
     * 获取当天的数据列表，按照每两个小时数据分开。
     * 显示时间为0,2,3,4,6,8,10，。。。。
     * 显示甘肃、青海、宁夏、新疆的
     *
     * @param map
     * @return
     */
    public static String hoursLoad(Map map, Map<String, String> param) {
        StringBuffer sb = new StringBuffer();
        sb.append("select to_char(t.occur_time,'hh24:mi') occur_time, ");
        sb.append(loadMap(param));
        sb.append(" from yc_hs_6801 t");
        sb.append(" where to_char(t.occur_time, 'yyyy-MM-dd') ='" + MapUtil.stringValue(map, Constant.CHART_COND) + "'");
        sb.append(" order by t.occur_time ");
        return sb.toString();
    }


    /**
     * 通过Map获取负荷的SQL
     * 生成格式
     * t.cur_11 XJ_POWER,
     * t.cur_10 NX_POWER,
     * t.cur_09 QH_POWER,
     * t.cur_08 GS_POWER
     *
     * @param param
     * @return
     */
    public static String loadMap(Map<String, String> param) {
        StringBuffer sb = new StringBuffer();
        for (String p : param.keySet()) {
            sb.append("t." + p + " " + param.get(p) + ",");
        }
        String rvalue = sb.toString();
        if (StringUtil.isNotBlank(rvalue)) {
            rvalue = rvalue.substring(0, rvalue.length() - 1);
        }
        return rvalue;
    }

    /**
     * 运行报表SQL
     *
     * @param map
     * @return
     */
    public static String opeProgramIndexRepCompany(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.report_id,");
        sb.append(" ifsapp.COMPANY_SITE_API.Get_Description(t.contract) contract,");
        sb.append(" t.day_ele_amount,");
        sb.append(" t.day_loss_amount,");
        sb.append(" t.month_ele_amount,");
        sb.append(" t.month_loss_amount,");
        sb.append(" t.year_ele_amount,");
        sb.append(" t.year_loss_amount");
        sb.append(" from ifsapp.OPE_PROGRAM_INDEX_REP_MOV t");
        sb.append(" where t.contract <> '10'");
        sb.append(" AND T.report_id = '");
        sb.append(MapUtil.stringValue(map, "REPORT_ID"));
        sb.append("'");
        sb.append(" order by t.contract ");
        return sb.toString();
    }

    /**
     * 查询从1号到所传日期的全厂日发电量列表数据
     * @param map
     * @return
     */
    public static String opeProgramIndexRepCompanyGroup(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.report_id,");
        sb.append(" sum(day_ele_amount) day_ele_amount");
        sb.append(" from ifsapp.OPE_PROGRAM_INDEX_REP_MOV t");
        sb.append(" where t.contract <> '10'");
        String startDate = DateUtil.formDate(new Date(), "yyyy-MM") + "-01";
        String endDate = MapUtil.stringValue(map, "REPORT_ID");
        sb.append(" AND T.report_id between '" + startDate + "' and '" + endDate + "'");
        sb.append(" group by T.report_id");
        sb.append(" order by T.report_id");
        return sb.toString();
    }

    /**
     *
     * @param map
     * @return
     */
    public static String companySiteAddress(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("select CONTRACT,DESCRIPTION,CITY ");
        sb.append(" from IFSAPP.COMPANY_SITE_ADDRESS T where t.userid='");
        sb.append(MapUtil.stringValue(map,Constant.USER_ID));
        sb.append("' ");
        return sb.toString();
    }




    /**
     * 获取近一小时数据
     * @param map
     * @return
     */
    public static String nearlyOneHourP(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select to_char(t.occur_time,'hh24:mi') occur_time,");
        sb.append(" t.cur_08 GS_POWER,");
        sb.append(" t.cur_09 QH_POWER,");
        sb.append(" t.cur_10 NX_POWER, ");
        sb.append(" t.cur_11 XJ_POWER ");
        sb.append(" from yc_hs_6801 t ");
        sb.append(" where to_char(t.occur_time,'yyyy-MM-dd hh24')=to_char(sysdate,'yyyy-MM-dd hh24')");
        sb.append(" order by t.occur_time desc");
        return sb.toString();
    }

    /**
     * 查询近一小时甘青宁新数据
     * @param map
     * @return
     */
    public static String nearlyOneHourT(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select to_char(t.occur_time,'hh24:mi') OCCUR_TIME,t.cur_96 T_POWER ");
        sb.append(" from yc_hs_6800 t ");
        sb.append(" where to_char(t.occur_time,'yyyy-MM-dd hh24')=to_char(sysdate,'yyyy-MM-dd hh24')");
        sb.append(" order by t.occur_time desc");
        return sb.toString();
    }
    /**
     * 获取各个省份的历史记录，当月数据
     * @param map
     * @return
     */
    public static String currMonthP(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select to_char(t.occur_time,'yyyy-mm-dd') occur_time,");
        sb.append(" t.cur_08 GS_POWER,");
        sb.append(" t.cur_09 QH_POWER,");
        sb.append(" t.cur_10 NX_POWER, ");
        sb.append(" t.cur_11 XJ_POWER ");
        sb.append(" from yc_hs_6801 t ");
        sb.append(" where to_char(t.occur_time,'hh24:mi:ss')='00:00:00'");
        sb.append("  AND TO_CHAR(T.OCCUR_TIME,'YYYY-MM')=TO_CHAR(sysdate,'yyyy-mm')");
        sb.append(" order by t.occur_time desc");
        return sb.toString();
    }

    /**
     * 查询全厂历史记录数据-当月数据
     * @param map
     * @return
     */
    public static String currMonthT(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select to_char(t.occur_time,'yyyy-mm-dd') OCCUR_TIME,t.cur_96 T_POWER ");
        sb.append(" from yc_hs_6800 t ");
        sb.append(" where to_char(t.occur_time,'hh24:mi:ss')='00:00:00'");
        sb.append("  AND TO_CHAR(T.OCCUR_TIME,'YYYY-MM')=TO_CHAR(sysdate,'yyyy-mm')");
        sb.append(" order by t.occur_time desc");
        return sb.toString();
    }
    public static void main(String[] args) {
        Map map = new HashMap();
        Map<String, String> param = new HashMap<String, String>();
        param.put("cur_08", "GS_POWER");
        param.put("cur_09", "QH_POWER");
        param.put("cur_10", "NX_POWER");
        param.put("cur_11", "XJ_POWER");
        System.out.println(nearlyOneHourT(map));
    }

    /**
     * 查询日电量明细
     * @param startDate
     * @param endDate
     * @return
     */
    public static String dayPowerDetail(String startDate, String endDate) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.REPORT_ID,");
        sb.append(" sum(day_ele_amount) DAY_ELE_AMOUNT,");
        sb.append(" sum(day_loss_amount) DAY_LOSS_AMOUNT");
        sb.append(" from ifsapp.OPE_PROGRAM_INDEX_REP_MOV t");
        sb.append(" where t.contract <> '10'");
        sb.append(" AND t.report_id between '" + startDate + "' and '" + endDate + "'");
        sb.append(" group by T.report_id ");
        sb.append(" order by T.report_id ");
        return sb.toString();
    }
}