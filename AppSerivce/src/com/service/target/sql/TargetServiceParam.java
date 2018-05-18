package com.service.target.sql;

import com.service.target.TargetService;
import com.utility.DateUtil;
import com.utility.StringUtil;
import org.apache.commons.lang.time.DateUtils;

import java.text.SimpleDateFormat;
import java.util.*;

public class TargetServiceParam {
    /**
     * 查询生成全厂负荷的SQL
     *
     * @param map
     * @return
     */
    public static Map<String, String> totalLoad(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("cur_08", "GS_POWER");
        param.put("cur_09", "QH_POWER");
        param.put("cur_10", "NX_POWER");
        param.put("cur_11", "XJ_POWER");
        Map<String, String> sql = new HashMap<String, String>();
        sql.put("load", TargetServiceSQL.load(map, param));
        sql.put("hoursLoad", TargetServiceSQL.hoursLoad(map, param));
        return sql;
    }

    /**
     * 查询生成甘肃负荷的SQL
     *
     * @param map
     * @return
     */
    public static Map<String, String> gsLoad(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("cur_17", "JCT_FSGZQD");
        param.put("cur_18", "JCT_AGCZ");
        param.put("cur_12", "JCT_SSFH");

        param.put("cur_24", "BDQD_FSGZQD");
        param.put("cur_25", "BDQD_AGCZ");
        param.put("cur_19", "BDQD_SSFH");

        param.put("cur_31", "QDDE_FSGZQD");
        param.put("cur_32", "QDDE_AGCZ");
        param.put("cur_26", "QDDE_SSFH");

        param.put("cur_40", "DH_FSGZQD");
//        param.put("cur_18", "DH_AGCZ");
        param.put("cur_33", "DH_SSFH");

        Map<String, String> sql = new HashMap<String, String>();
        sql.put("gsLoad", TargetServiceSQL.load(map, param));
        sql.put("gsHourLoad", TargetServiceSQL.hoursLoad(map, param));

        return sql;
    }

    /**
     * 查询生成青海负荷的SQL             没数据
     *
     * @param map
     * @return
     */
    public static Map<String, String> qhLoad(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("cur_17", "BKL_FSGZQD");
        param.put("cur_18", "BKL_AGCZ");
        param.put("cur_12", "BKL_SSFH");

        param.put("cur_24", "GEM_FSGZQD");
        param.put("cur_25", "GEM_AGCZ");
        param.put("cur_19", "GEM_SSFH");

        Map<String, String> sql = new HashMap<String, String>();
        sql.put("qhLoad", TargetServiceSQL.load(map, param));
        sql.put("qhHourLoad", TargetServiceSQL.hoursLoad(map, param));

        return sql;
    }

    /**
     * 查询生成宁夏负荷的SQL       没数据
     *
     * @param map
     * @return
     */
    public static Map<String, String> nxLoad(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("'--'", "SZS_FSGZQD");
        param.put("'--'", "SZS_AGCZ");
        param.put("'--'", "SZS_SSFH");

        Map<String, String> sql = new HashMap<String, String>();
        sql.put("nxLoad", TargetServiceSQL.load(map, param));
        sql.put("nxHourLoad", TargetServiceSQL.hoursLoad(map, param));

        return sql;
    }

    /**
     * 查询生成新疆负荷的SQL
     *
     * @param map
     * @return
     */
    public static Map<String, String> xjLoad(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("cur_50", "STH_FSGZQD");
        param.put("cur_51", "STH_AGCZ");
        param.put("cur_45", "STH_SSFH");

        param.put("cur_64", "NMHN_FSGZQD");
        param.put("cur_65", "NMHN_AGCZ");
        param.put("cur_59", "NMHN_SSFH");

        param.put("cur_57", "XCHB_FSGZQD");
        param.put("cur_58", "XCHB_AGCZ");
        param.put("cur_52", "XCHB_SSFH");

        param.put("cur_71", "YD_FSGZQD");
        //param.put("cur_50", "YD_AGCZ");
        param.put("cur_66", "YD_SSFH");

        param.put("cur_78", "JX_FSGZQD");
        //param.put("cur_50", "JX_AGCZ");
        param.put("cur_73", "JX_SSFH");

        Map<String, String> sql = new HashMap<String, String>();
        sql.put("xjLoad", TargetServiceSQL.load(map, param));
        sql.put("xjHourLoad", TargetServiceSQL.hoursLoad(map, param));
        return sql;
    }

    /**
     * 查询生成甘肃电量的SQL
     *
     * @param map
     * @return
     */
    public static Map<String, String> gsPower(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("cur_14", "JCT_DAYPOWER");
        param.put("cur_15", "JCT_MONTHPOWER");
        param.put("cur_16", "JCT_YEARPOWER");

        param.put("cur_21", "BDQD_DAYPOWER");
        param.put("cur_22", "BDQD_MONTHPOWER");
        param.put("cur_23", "BDQD_YEARPOWER");

        param.put("cur_28", "QDDE_DAYPOWER");
        param.put("cur_29", "QDDE_MONTHPOWER");
        param.put("cur_30", "QDDE_YEARPOWER");

        param.put("cur_37", "DH_DAYPOWER");
        param.put("cur_38", "DH_MONTHPOWER");
        param.put("cur_39", "DH_YEARPOWER");

        Map<String, String> sql = new HashMap<String, String>();
        sql.put("gsPower", TargetServiceSQL.load(map, param));
        sql.put("gsHourPower", TargetServiceSQL.hoursLoad(map, param));

        return sql;
    }

    /**
     * 查询生成青海电量的SQL
     * @param map
     * @return
     */
    public static Map<String, String> qhPower(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        /*param.put("'--'", "BKL_DAYPOWER");
        param.put("'--'", "BKL_MONTHPOWER");
        param.put("'--'", "BKL_YEARPOWER");

        param.put("'--'", "GEM_DAYPOWER");
        param.put("'--'", "GEM_MONTHPOWER");
        param.put("'--'", "GEM_YEARPOWER");*/

        Map<String, String> sql = new HashMap<String, String>();
        sql.put("qhPower", TargetServiceSQL.load(map, param));
        sql.put("qhHourPower", TargetServiceSQL.hoursLoad(map, param));

        return sql;
    }

    /**
     * 查询生成宁夏电量的SQL
     * @param map
     * @return
     */
    public static Map<String, String> nxPower(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        /*param.put("'--'", "SZS_DAYPOWER");
        param.put("'--'", "SZS_MONTHPOWER");
        param.put("'--'", "SZS_YEARPOWER");*/

        Map<String, String> sql = new HashMap<String, String>();
        sql.put("nxPower", TargetServiceSQL.load(map, param));
        sql.put("nxHourPower", TargetServiceSQL.hoursLoad(map, param));

        return sql;
    }

    /**
     * 查询生成新疆电量的SQL
     *
     * @param map
     * @return
     */
    public static Map<String, String> xjPower(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("cur_46", "STH_DAYPOWER");
        param.put("cur_47", "STH_MONTHPOWER");
        param.put("cur_48", "STH_YEARPOWER");

        param.put("cur_61", "NMHN_DAYPOWER");
        param.put("cur_62", "NMHN_MONTHPOWER");
        param.put("cur_63", "NMHN_YEARPOWER");

        param.put("cur_54", "XCHB_DAYPOWER");
        param.put("cur_55", "XCHB_MONTHPOWER");
        param.put("cur_56", "XCHB_YEARPOWER");

        param.put("cur_68", "YD_DAYPOWER");
        param.put("cur_69", "YD_MONTHPOWER");
        param.put("cur_70", "YD_YEARPOWER");

        param.put("cur_75", "JX_DAYPOWER");
        param.put("cur_76", "JX_MONTHPOWER");
        param.put("cur_77", "JX_YEARPOWER");

        Map<String, String> sql = new HashMap<String, String>();
        sql.put("xjPower", TargetServiceSQL.load(map, param));
        sql.put("xjHourPower", TargetServiceSQL.hoursLoad(map, param));
        return sql;
    }

    /**
     * 通过传入的日期，生成('2018-01-02 00:00','2018-01-02 02:00');
     *
     * @param dateStr
     * @return
     */
    public static String getTwoHours(String dateStr) {
        String hour = new SimpleDateFormat("HH").format(new Date());
        StringBuffer sb = new StringBuffer();
        int h = Integer.parseInt(hour);
        for (int i = 0; i <= h; i = i + 2) {
            sb.append("'" + dateStr + " " + getTwoCode(i) + ":00',");
        }
        String rvalue =sb.toString();
        if(StringUtil.isNotBlank(rvalue)){
            rvalue = rvalue.substring(0,rvalue.length()-1);
        }
        return rvalue;
    }

    /**
     * 获取昨天的24小时
     * @param dateStr
     * @return
     */
    public static String getYTwoHours(String dateStr) {
        StringBuffer sb = new StringBuffer();
        int h = 22;
        for (int i = 0; i <= h; i = i + 2) {
            sb.append("'" + dateStr + " " + getTwoCode(i) + ":00',");
        }
        String rvalue =sb.toString();
        if(StringUtil.isNotBlank(rvalue)){
            rvalue = rvalue.substring(0,rvalue.length()-1);
        }
        return rvalue;
    }

    /**
     * 将10以内的转换为两位显示
     * @param hour
     * @return
     */
    private static String getTwoCode(int hour) {
        String two = "";
        if (hour < 10) {
            two = "0" + hour;
        }else{
            two=hour+"";
        }
        return two;
    }

    /**
     * 获取每隔两个小时的标签
     * @return
     */
    public static List<String> getHoursLabels(){
        List<String> hList = new ArrayList<String>();
        String hour = new SimpleDateFormat("HH").format(new Date());
        int h = Integer.parseInt(hour);
        for (int i = 0; i <= h; i = i + 2) {
            hList.add(i+"");
        }
        return hList;
    }

    /**
     * 获取电量首页信息
     * @param map
     * @return
     */
    public static Map<String, String> totalPower(Map map) {
        Map<String, String> param = new HashMap<String, String>();
        param.put("cur_07", "cur_07");
        param.put("cur_03", "cur_03");
        param.put("cur_05", "cur_05");
        param.put("cur_01", "cur_01");
        param.put("cur_04", "cur_04");
        param.put("cur_06", "cur_06");
        param.put("cur_02", "cur_02");
        Map<String, String> sql = new HashMap<String, String>();
        sql.put("load", TargetServiceSQL.load(map, param));
        return sql;
    }
    public static void main(String[] args){
        String dateStr = DateUtil.formDate(new Date(),"");
        System.out.println(getTwoHours(dateStr));
    }
}
