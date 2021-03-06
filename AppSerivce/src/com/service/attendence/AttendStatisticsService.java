package com.service.attendence;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.attendence.constant.AttendConstant;
import com.service.attendence.entity.AttendanceMonthData;
import com.service.attendence.entity.Attendence;
import com.service.attendence.sql.AttendReasonServiceSQL;
import com.service.attendence.sql.AttendStatisticsServiceSQL;
import com.service.attendence.sql.ClockServiceSQL;
import com.utility.*;
import com.utility.baiyin.BaiyinUtils;
import org.json.JSONObject;

import java.util.*;

/**
 * @Author:wangyg
 * @Description:考勤统计服务
 * @Date:Created in 2018-03-12 10:42
 * @Modied By:
 **/
public class AttendStatisticsService extends AJsonService implements IJsonService {

    /**
     * 获取我的考勤
     * @param map
     * @return
     * @throws ServiceException
     */
    public String myAttendence(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM");//所传月份，默认为当月
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isNotBlank(MapUtil.stringValue(map, "QUERY_MONTH"))) {
                scyf = MapUtil.stringValue(map, "QUERY_MONTH");
            }
            if(StringUtil.isBlank(MapUtil.stringValue(map, "PERSON_ID"))){
                map.put("PERSON_ID",userProfile.getUserId());
            }
            scyf +=  "-01";
//            logger.info("scyf==="+scyf);
            //获取所传月份的日历
            List<Attendence> weekList = BaiyinUtils.getMonthDayWeekList(scyf);
//            for(Attendence a:weekList){
//                logger.info("a.month/date=="+a.getMonth()+"/"+a.getDate());
//            }
            //查询考勤信息
            String sql = AttendStatisticsServiceSQL.myAttendence(map);
            logger.info("sql========="+sql);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            logger.info("tList============"+tList);
            //根据日历和考勤信息拼接显示数据
            Map<String,List<Attendence>> data = this.weekAndDataList(weekList,tList);
            json.put("dList",weekList);
            json.put("dvalue",data);
        } catch (Throwable e) {
            logger.error("8001", e);
            e.printStackTrace();
            throw new ServiceException("8001", "获取我的考勤数据出错");
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
     * 将日历数据与查询所得数据处理到一起
     * @param weekList
     * @param tList
     * @return
     */
    private Map<String,List<Attendence>> weekAndDataList(List<Attendence> weekList, List<Map> tList) {
        List<Attendence> dwList = new ArrayList<Attendence>(),rList = new ArrayList<Attendence>();
        Map<String,List<Attendence>> tree = new TreeMap<String,List<Attendence>>();
        try{
            boolean has = false;
            for(Attendence a:weekList){//循环日历
                has = false;
                for(Map map:tList){
                    Attendence attendence = new Attendence(a);
                    Date date = null;
                    if(MapUtil.stringValue(map,"TRANSACTION_ID")!="" || MapUtil.stringValue(map,"TRANSACTION_ID")!= null){
                        date = DateUtil.parse2Date(MapUtil.stringValue(map,"TRANSACTION_ID").substring(0,8),"yyyyMMdd");
                    }
                    logger.info("DateUtil.getDay(date)========"+DateUtil.getDay(date));
                    if(attendence.getDate()==DateUtil.getDay(date)){
                        handleData(attendence,map);
                        logger.info("attendence========"+attendence.getTransactionId());
                        dwList.add(attendence);
                        has = true;//如果存在则赋值

                    }
                }
                if(!has){//如果不存在，则直接加入
                    a.setRemarks(getRemarks(a));
                    dwList.add(a);
                }
            }
            //数据全部放在一个list里面后，需要将list中的数据做个去重处理，将同一天的数据，用列表存入
            for(Attendence a:dwList){
                String key = a.getYear()+"-"+a.getMonth()+"-"+a.getDate();
                logger.info("key=="+key);
                logger.info("a=="+a.toString());
                if(tree.containsKey(key)){
                    rList = tree.get(key);
                    rList.add(a);
                    tree.put(key,rList);
                }else{
                    rList = new ArrayList<Attendence>();
                    rList.add(a);
                    tree.put(key,rList);
                }
            }
        }catch (Throwable e){
            e.printStackTrace();
        }
        return tree;
    }

    /**
     * 将map中的数据赋值给attendence
     * @param attendence
     * @param map
     */
    private void handleData(Attendence attendence, Map map) {
        attendence.setPersonalId(MapUtil.stringValue(map,"PERSON_ID"));
        attendence.setTransactionId(MapUtil.stringValue(map,"TRANSACTION_ID"));
        attendence.setPlanStartTime(MapUtil.stringValue(map,"PLAN_START_TIME"));
        attendence.setPlanEndTime(MapUtil.stringValue(map,"PLAN_END_TIME"));
        attendence.setActualStartTime(MapUtil.stringValue(map,"ACTUAL_START_TIME"));
        attendence.setActualEndTime(MapUtil.stringValue(map,"ACTUAL_END_TIME"));
        attendence.setInBlueToothNo(MapUtil.stringValue(map,"IN_BLUETOOTH_NO"));
        attendence.setOutBlueToothNo(MapUtil.stringValue(map,"OUT_BLUETOOTH_NO"));
        attendence.setCheckInAddr(MapUtil.stringValue(map,"CHECK_IN_ADDR"));
        attendence.setCheckOutAddr(MapUtil.stringValue(map,"CHECK_OUT_ADDR"));
        attendence.setCheckInInfo(MapUtil.stringValue(map,"CHECK_IN_INFO"));
        attendence.setCheckOutInfo(MapUtil.stringValue(map,"CHECK_OUT_INFO"));
        attendence.setCheckInState(MapUtil.stringValue(map,"CHECK_IN_STATE"));
        attendence.setCheckOutState(MapUtil.stringValue(map,"CHECK_OUT_STATE"));
        attendence.setNote(MapUtil.stringValue(map,"NOTE"));
        attendence.setNoteTime(MapUtil.stringValue(map,"NOTE_TIME"));
        attendence.setNotePerson(MapUtil.stringValue(map,"NOTE_PERSON"));
        attendence.setConfirmDate(MapUtil.stringValue(map,"CONFIRM_DATE"));
        attendence.setDept(MapUtil.stringValue(map,"DEPT"));
        attendence.setRemarks(getRemarks(attendence));
    }

    /**
     * 判断获取备注信息
     * @param attendence
     * @return
     */
    private String getRemarks(Attendence attendence) {
        String remarks="";
        if(AttendConstant.CHECK_IN_STATE_LATE.equals(attendence.getCheckInState())){
            remarks=attendence.getCheckInInfo()+"<br/>";
        }
        if(AttendConstant.CHECK_OUT_STATE_EARLY.equals(attendence.getCheckOutState())){
            remarks=remarks+attendence.getCheckOutInfo()+"<br/>";
        }
//        if(AttendConstant.CHECK_IN_STATE_REASON.equals(attendence.getCheckInState())
//                ||AttendConstant.CHECK_OUT_STATE_REASON.equals(attendence.getCheckOutState())){
//            remarks=remarks+attendence.getNote();;
//        }
        if(StringUtil.isNotBlank(attendence.getNote())){
            remarks=remarks+attendence.getNote();
        }
        if (StringUtil.isNotBlank(remarks)&&remarks.length()>5&&remarks.substring(remarks.length()-5,remarks.length()).equals("<br/>")) {
            remarks = remarks.substring(0,remarks.lastIndexOf("<br/>"));
        }
        return remarks;
    }

    /**
     * 日统计
     * @param map
     * @return
     * @throws ServiceException
     */
    public String dayStatistics(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM-dd");//所传月份，默认为当月
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_DATE"))) {
                map.put("QUERY_DATE",scyf);
            }
            if(StringUtil.isBlank(MapUtil.stringValue(map, "DEPT"))){
                map.put("DEPT",MapUtil.stringValue(userProfile.getOrgInfo(),Constant.DEPT_NO));
            }

            //获取本部门所有人,用登录人查询
            int allPerson=0;
            String sql = AttendStatisticsServiceSQL.allPersonByDeptNum(map);
            logger.info("allPerson sql======"+sql);
            JdbcDBUtil jdbc = new JdbcDBUtil();
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isNotEmpty(tList)){
                allPerson = MapUtil.intValue(tList.get(0),"COUNT");
            }

            //获取本部门打卡人数
            int clockPerson=0;
            sql = AttendStatisticsServiceSQL.clockPersonByDept(map);
            logger.info("获取本部门打卡人数========="+sql);
            tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isNotEmpty(tList)){
                clockPerson = MapUtil.intValue(tList.get(0),"COUNT");
            }
            //获取本部门迟到人次
            int latePerson=0;
            sql = AttendStatisticsServiceSQL.latePersonByDept(map);
            tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isNotEmpty(tList)){
                latePerson = MapUtil.intValue(tList.get(0),"COUNT");
                logger.info("获取本部门迟到人数============="+sql);
            }
            //获取本部门早退人次
            int earlyPerson=0;
            sql = AttendStatisticsServiceSQL.earlyPersonByDept(map);
            tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isNotEmpty(tList)){
                earlyPerson = MapUtil.intValue(tList.get(0),"COUNT");
                logger.info("获取本部门早退人数============="+sql);
            }
            //获取本部门正常上下班人数
            int normalClockPerson = 0;
            sql = AttendStatisticsServiceSQL.normalPersonByDept(map);
            logger.info("获取本部门正常人数============="+sql);
            tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isNotEmpty(tList)){
                normalClockPerson = MapUtil.intValue(tList.get(0),"COUNT");
            }
            //获取本部门未打卡人数
            int unclockPerson=allPerson-clockPerson;
            json.put("unclockPerson",unclockPerson);
            json.put("earlyPerson",earlyPerson);
            json.put("latePerson",latePerson);
            json.put("clockPerson",clockPerson);
            json.put("allPerson",allPerson);
            json.put("normalClockPerson",normalClockPerson);
        } catch (Throwable e) {
            logger.error("8002", e);
            e.printStackTrace();
            throw new ServiceException("8002", "获取日统计数据出错");
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
     * 月统计
     * @param map
     * @return
     * @throws ServiceException
     */
    public String monthStatistics(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM");//所传月份，默认为当月
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_MONTH"))) {
                map.put("QUERY_MONTH",scyf);
            }else{
                scyf = MapUtil.stringValue(map, "QUERY_MONTH");
            }
            if(StringUtil.isBlank(MapUtil.stringValue(map, "DEPT"))){
                map.put("DEPT",MapUtil.stringValue(userProfile.getOrgInfo(),Constant.DEPT_NO));
            }

            //获取本部门所有人,用登录人查询
            String sql = AttendStatisticsServiceSQL.allPersonByDept(map);
            logger.info("获取本部门所有人,用登录人查询=="+sql);
            JdbcDBUtil jdbc = new JdbcDBUtil();
            List<Map> aList = new IbatisDBUtil().executeSql(sql);
            List<AttendanceMonthData> attendanceMonthDataList = new ArrayList<AttendanceMonthData>();
            attendanceMonthDataList = attendenceMonthDeal(aList);

            //获取本部门未打卡，迟到，早退，正常人数
            sql = AttendStatisticsServiceSQL.monthStatisticsPersons(map);
            logger.info("sql++++++++++==========="+sql);
            List<Map> taList = new IbatisDBUtil().executeSql(sql);
            List<AttendanceMonthData> tList = new ArrayList<AttendanceMonthData>();
            if(ListUtil.isNotEmpty(aList)){
                //计算该统计区间，计划打卡天数.Reid
                int days = 31;
                Calendar calendar = Calendar.getInstance();
                Date now = calendar.getTime();
                String nowStr = DateUtil.formDate(now,"yyyy-MM");
                if(nowStr.equals(scyf)){
                    days = calendar.get(Calendar.DAY_OF_MONTH);
                }else {
                    calendar.setTime(DateUtil.parse2Date(scyf,"yyyy-MM"));
                    days = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
                }

                boolean has = false;
                for(AttendanceMonthData a:attendanceMonthDataList){
                    has = false;
                    AttendanceMonthData attendanceMonthData = new AttendanceMonthData(a);
                    if(ListUtil.isNotEmpty(taList)){
                        for(Map ta:taList){
                            if(a.getPersonId().equals(MapUtil.stringValue(ta,"PERSON_ID"))){
                                int unClockNum = days-MapUtil.intValue(ta,"ABNORMAL")-MapUtil.intValue(ta,"REGULAR");
                                attendanceMonthData.setUnClockNum(unClockNum);
                                attendenceMonthSplicing(attendanceMonthData,ta);
                                tList.add(attendanceMonthData);
                                has = true;
                            }
                        }
                    }
                    if(!has){
                        a.setUnClockNum(days);
                        logger.info("unclocknum======="+a.getUnClockNum());
                        tList.add(a);
                    }
                }
            }
            json.put("tList",tList);
        } catch (Throwable e) {
            logger.error("8003", e);
            e.printStackTrace();
            throw new ServiceException("8003", "获取月度统计数据出错");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return json.toString();
    }
    //数据拼接
    private void attendenceMonthSplicing(AttendanceMonthData attendanceMonthData, Map map){
        attendanceMonthData.setPersonId(MapUtil.stringValue(map,"PERSON_ID"));
        attendanceMonthData.setPersonName(MapUtil.stringValue(map,"PERSON_NAME"));
        attendanceMonthData.setAbnormal(MapUtil.intValue(map,"ABNORMAL"));
        attendanceMonthData.setBeLate(MapUtil.intValue(map,"BE_LATE"));
        attendanceMonthData.setLeaveEarly(MapUtil.intValue(map,"LEAVE_EARLY"));
        attendanceMonthData.setRegular(MapUtil.intValue(map,"REGULAR"));
        attendanceMonthData.setDays(MapUtil.intValue(map,"DAYS"));
        attendanceMonthData.setDept(MapUtil.stringValue(map,"DEPT"));
        attendanceMonthData.setTransactionMon(MapUtil.stringValue(map,"TRANSACTION_MON"));
    }
    //数据处理
    private List<AttendanceMonthData> attendenceMonthDeal(List<Map> maps){
        List<AttendanceMonthData> attendanceMonthDataList = new ArrayList<AttendanceMonthData>();
        if(ListUtil.isNotEmpty(maps)){
            for(Map map:maps){
                AttendanceMonthData attendanceMonthData = new AttendanceMonthData();
                attendanceMonthData.setPersonId(MapUtil.stringValue(map,"PERSON_ID"));
                attendanceMonthData.setPersonName(MapUtil.stringValue(map,"NAME"));
                attendanceMonthDataList.add(attendanceMonthData);
            }
        }
        return attendanceMonthDataList;
    }
    /**
     * 月度统计迟到人员列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String monthStatisticsLate(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM");//所传月份，默认为当月
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_MONTH"))) {
                map.put("QUERY_MONTH",scyf);
            }
            if(StringUtil.isBlank(MapUtil.stringValue(map, "DEPT"))){
                map.put("DEPT",MapUtil.stringValue(userProfile.getOrgInfo(),Constant.DEPT_NO));
            }
            map.put("CHECK_IN_STATE","迟到");
            String sql = AttendStatisticsServiceSQL.groupByPersonLate(map);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isEmpty(tList)){
                code="1";
                msg="没有迟到人员！";
            }
            json.put("tList",tList);

        } catch (Throwable e) {
            logger.error("8004", e);
            e.printStackTrace();
            throw new ServiceException("8004", "获取月度统计迟到人员数据出错");
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
     * 月度统计早退人员列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String monthStatisticsEarly(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM");//所传月份，默认为当月
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_MONTH"))) {
                map.put("QUERY_MONTH",scyf);
            }
            if(StringUtil.isBlank(MapUtil.stringValue(map, "DEPT"))){
                map.put("DEPT",MapUtil.stringValue(userProfile.getOrgInfo(),Constant.DEPT_NO));
            }
            map.put("CHECK_OUT_STATE","早退");
            String sql = AttendStatisticsServiceSQL.groupByPersonEarly(map);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isEmpty(tList)){
                code="1";
                msg="没有早退人员！";
            }
            json.put("tList",tList);

        } catch (Throwable e) {
            logger.error("8005", e);
            e.printStackTrace();
            throw new ServiceException("8005", "获取月度统计早退人员数据出错");
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
     * 月度统计正常人员列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String monthStatisticsNormal(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM");//所传月份，默认为当月
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_MONTH"))) {
                map.put("QUERY_MONTH",scyf);
            }
            if(StringUtil.isBlank(MapUtil.stringValue(map, "DEPT"))){
                map.put("DEPT",MapUtil.stringValue(userProfile.getOrgInfo(),Constant.DEPT_NO));
            }
            map.put("CHECK_OUT_STATE","正常");
            map.put("CHECK_IN_STATE","正常");
            String sql = AttendStatisticsServiceSQL.groupByPersonNormal(map);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isEmpty(tList)){
                code="1";
                msg="没有正常打卡人员！";
            }
            json.put("tList",tList);

        } catch (Throwable e) {
            logger.error("8005", e);
            e.printStackTrace();
            throw new ServiceException("8005", "获取月度统计早退人员数据出错");
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
     * 月度未打卡人员
     * @param map
     * @return
     * @throws ServiceException
     */
    public String monthStatisticsUnclock(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM");//所传月份，默认为当月
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_MONTH"))) {
                map.put("QUERY_MONTH",scyf);
            }
            if(StringUtil.isBlank(MapUtil.stringValue(map, "DEPT"))){
                map.put("DEPT",MapUtil.stringValue(userProfile.getOrgInfo(),Constant.DEPT_NO));
            }
            String sql = AttendStatisticsServiceSQL.groupByPerson(map);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            sql = ClockServiceSQL.personList(map);
            logger.info("sql============="+sql);
            List<Map> uList = new JdbcDBUtil().query(userProfile.getUserId(), userProfile.getPassWord(), sql);
            int year = Integer.parseInt(MapUtil.stringValue(map,"QUERY_MONTH").split("-")[0]);
            int month = Integer.parseInt(MapUtil.stringValue(map,"QUERY_MONTH").split("-")[1]);
            int maxDate = DateUtil.getDaysByYearMonth(year,month);
//            logger.info("uList==-------------------------------------------------");
//            logger.info("uList=="+uList);
//            logger.info("tList=="+tList);
            for(Map m:uList){
                m.put("COUNT",""+maxDate);
                for(Map t:tList){
                    if(MapUtil.stringValue(m,"PERSON_ID").equals(MapUtil.stringValue(t,"PERSON_ID"))){
                        m.put("COUNT",(maxDate-MapUtil.intValue(t,"COUNT"))+"");
                        logger.info("personId/count==="+MapUtil.stringValue(m,"PERSON_ID")+"/"+(MapUtil.stringValue(m,"COUNT")));
                        break;
                    }
                }
            }
            if(ListUtil.isEmpty(uList)){
                code="1";
                msg="没有未打卡人员！";
            }
            json.put("tList",uList);

        } catch (Throwable e) {
            logger.error("8006", e);
            e.printStackTrace();
            throw new ServiceException("8006", "获取月度统计未打卡人员数据出错");
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
     * 月度统计-个人统计
     * @param map
     * @return
     * @throws ServiceException
     */
    public String monthStatisticsPerson(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM");//所传月份，默认为当月
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isNotBlank(MapUtil.stringValue(map, "QUERY_MONTH"))) {
                scyf = MapUtil.stringValue(map, "QUERY_MONTH");
            }
            if(StringUtil.isBlank(MapUtil.stringValue(map, "PERSON_ID"))){
                map.put("PERSON_ID",userProfile.getUserId());
            }
            scyf +=  "-01";
//            logger.info("scyf==="+scyf);
            //获取所传月份的日历
            List<Attendence> weekList = BaiyinUtils.getMonthDayWeekList(scyf);
            logger.info("weekList==="+weekList);
//            for(Attendence a:weekList){
//                logger.info("a.month/date=="+a.getMonth()+"/"+a.getDate());
//            }
            //查询考勤信息
            String sql = AttendStatisticsServiceSQL.myAttendence(map);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            //根据日历和考勤信息拼接显示数据
            Map<String,List<Attendence>> data = this.weekAndDataList(weekList,tList);
            json.put("tList",tList);
            json.put("dList",weekList);
            json.put("dvalue",data);
        } catch (Throwable e) {
            logger.error("8001", e);
            e.printStackTrace();
            throw new ServiceException("8001", "获取我的考勤数据出错");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return json.toString();
    }


    public static void main(String[] args){
        String remarks = "你好这个怎么难<br/>";
        //a.setUnClockNum(DateUtil.getDay(DateUtil.parse2Date(MapUtil.stringValue(map,"QUERY_MONTH"),"yyyy-MM-dd")));
        String dateStr = "2018-04-00";
        int date = DateUtil.getDay(DateUtil.parse2Date(dateStr,"yyyy-MM-dd"));
        System.out.println(date);
    }
}
