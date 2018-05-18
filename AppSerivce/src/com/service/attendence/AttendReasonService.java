package com.service.attendence;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.attendence.constant.AttendConstant;
import com.service.attendence.sql.AttendReasonServiceSQL;
import com.service.attendence.sql.ClockServiceSQL;
import com.utility.*;
import com.utility.baiyin.BaiyinUtils;
import org.json.JSONObject;
import org.json.JSONString;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author:wangyg
 * @Description:考勤事由服务处理
 * @Date:Created in 2018-03-12 10:43
 * @Modied By:
 **/
public class AttendReasonService extends AJsonService implements IJsonService {
    /**
     * 本部门迟到早退
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String lateAndEarly(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM-dd");//所传日期，默认当天
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_DATE"))) {
                map.put("QUERY_DATE", scyf);
            }
            //取当前人所在部门
            if(MapUtil.valueIsNull(map,"DEPT")){
                map.put("DEPT", MapUtil.stringValue(userProfile.getOrgInfo(), Constant.DEPT_NO));
            }
            //获取日期列表，只获取当天以及前几天的，这个是根据设置进行的
            List<String> dayList = BaiyinUtils.genReasonDateList();
            String sql = AttendReasonServiceSQL.lateAndEarlyByDept(map);
            logger.info("sql正常========"+sql);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isNotEmpty(tList)) {
                for (Map m : tList) {
                    m.put("REMARKS", getRemarks(m));
                }
            } else {
                code = "1";
                msg = "没有查询到数据！";
            }
            json.put("dayList", dayList);
            json.put("tList", tList);
        } catch (Throwable e) {
            logger.error("9001", e);
            e.printStackTrace();
            throw new ServiceException("9001", "获取考勤迟到早退数据出错");
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
     * 本部门正常
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String normalPerson(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM-dd");//所传日期，默认当天
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_DATE"))) {
                map.put("QUERY_DATE", scyf);
            }
            //取当前人所在部门
            if(MapUtil.valueIsNull(map,"DEPT")){
                map.put("DEPT", MapUtil.stringValue(userProfile.getOrgInfo(), Constant.DEPT_NO));
            }
            //获取日期列表，只获取当天以及前几天的，这个是根据设置进行的
            List<String> dayList = BaiyinUtils.genReasonDateList();
            String sql = AttendReasonServiceSQL.normalByDept(map);
            List<Map> zList = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isNotEmpty(zList)) {
                for (Map m : zList) {
                    m.put("REMARKS", getRemarks(m));
                }
            } else {
                code = "1";
                msg = "没有查询到数据！";
            }
            json.put("dayList", dayList);
            json.put("zList",zList);
        } catch (Throwable e) {
            logger.error("9001", e);
            e.printStackTrace();
            throw new ServiceException("9001", "获取考勤迟到早退数据出错");
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
     * 缺勤事由迟到早退
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String lateAndEarlyReason(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM-dd");//所传日期，默认当天
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_DATE"))) {
                map.put("QUERY_DATE", scyf);
            }
            //取当前人所在部门
            if(MapUtil.valueIsNull(map,"DEPT")){
                map.put("DEPT", MapUtil.stringValue(userProfile.getOrgInfo(), Constant.DEPT_NO));
            }
            //取当前人person_id
            if(MapUtil.valueIsNull(map,"PERSON_ID")){
                map.put("PERSON_ID",userProfile.getUserId());
                logger.info("PERSON_ID========"+userProfile.getUserId());
            }
            //获取日期列表，只获取当天以及前几天的，这个是根据设置进行的
            List<String> dayList = BaiyinUtils.genReasonDateList();
            String sql = AttendReasonServiceSQL.lateAndEarlyByDeptReason(map);
            logger.info("sql2========"+sql);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isNotEmpty(tList)) {
                for (Map m : tList) {
                    m.put("REMARKS", getRemarks(m));
                }
            } else {
                code = "1";
                msg = "没有查询到数据！";
            }
            json.put("dayList", dayList);
            json.put("tList", tList);
        } catch (Throwable e) {
            logger.error("9001", e);
            e.printStackTrace();
            throw new ServiceException("9001", "获取考勤迟到早退数据出错");
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
     * 确认事由
     */
    public String Confirmation(Map map) throws ServiceException{
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try {
            Date now = new Date();
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            String currentDateTime = DateUtil.formDate(now,"yyyy-MM-dd HH:mm:ss");
            String qdate = DateUtil.formDate(DateUtil.parse2Date(MapUtil.stringValue(map,"QUERY_DATE"),"yyyy-MM-dd"),"yyyyMMdd");
            String transactionId = qdate+MapUtil.stringValue(map,"PERSON_ID");
            map.put("CONFIRM_DATE",currentDateTime);
            String sql = AttendReasonServiceSQL.confirmDate(map);
            logger.info("sql============="+sql);
            new IbatisDBUtil().executeSql(sql);
        } catch (Throwable e) {
            logger.error("9003", e);
            e.printStackTrace();
            throw new ServiceException("9003", "执行添加事由时出错");
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
     * 获取备注显示
     *
     * @param map
     * @return
     */
    private String getRemarks(Map map) {
        String remarks = "";
        if (AttendConstant.CHECK_IN_STATE_LATE.equals(MapUtil.stringValue(map, "CHECK_IN_STATE"))) {
            remarks = MapUtil.stringValue(map, "CHECK_IN_INFO") + "<br/>";
        }
        if (AttendConstant.CHECK_OUT_STATE_EARLY.equals(MapUtil.stringValue(map, "CHECK_OUT_STATE"))) {
            remarks = remarks + MapUtil.stringValue(map, "CHECK_OUT_INFO")+ "<br/>";
        }
//        if(AttendConstant.CHECK_IN_STATE_REASON.equals(MapUtil.stringValue(map, "CHECK_IN_STATE"))
//                ||AttendConstant.CHECK_OUT_STATE_REASON.equals(MapUtil.stringValue(map, "CHECK_OUT_STATE"))){
//            remarks=MapUtil.stringValue(map, "NOTE");
//        }
        if(StringUtil.isNotBlank(MapUtil.stringValue(map, "NOTE"))){
            remarks=remarks+MapUtil.stringValue(map, "NOTE");
        }
        if (StringUtil.isNotBlank(remarks)&&remarks.length()>5&&remarks.substring(remarks.length()-5,remarks.length()).equals("<br/>")) {
            remarks = remarks.substring(0,remarks.lastIndexOf("<br/>"));
        }
        return remarks;
    }

    /**
     * 获取未打卡信息
     * 日期+当前部门
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String unClock(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM-dd");//所传日期，默认当天
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_DATE"))) {
                map.put("QUERY_DATE", scyf);
            }
            //取当前人所在部门
            if(MapUtil.valueIsNull(map,"DEPT")){
                map.put("DEPT", MapUtil.stringValue(userProfile.getOrgInfo(), Constant.DEPT_NO));
            }
            //获取日期列表，只获取当天以及前几天的，这个是根据设置进行的
//            List<String> dayList = BaiyinUtils.genReasonDateList();

            //获取本部门所有人,用登录人查询
            String sql = AttendReasonServiceSQL.clockByDept(map);
            List<Map> mList = new IbatisDBUtil().executeSql(sql);
            String personIds = "'1'";
            if (ListUtil.isNotEmpty(mList)) {

                for (Map m : mList) {
                    personIds += ",'" + (MapUtil.stringValue(m, "PERSON_ID")) + "'";
                }
            }
            //查询部门下所有人员
            map.put("PERSON_ID", "(" + personIds + ")");
            sql = ClockServiceSQL.personerList(map);
            logger.info("sql======="+sql);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            sql = AttendReasonServiceSQL.unClock(map);
            List<Map> uList = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isNotEmpty(tList)) {
                for (Map m : tList) {
                    m.put("TRANSACTION_ID", "");
                    m.put("REMARKS", "全天未打卡");
                    uList.add(m);
                }
            }
            //获取当天未打卡人员
            AttendReasonServiceSQL.unClock(map);
            mList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isNotEmpty(mList)){
                for(Map m:mList){
                    if(MapUtil.valueIsNull(m,"NOTE")){
                        m.put("REMARKS","下班未打卡");
                    }else{
                        m.put("REMARKS",MapUtil.stringValue(m,"NOTE"));
                    }
                    uList.add(m);

                }
            }
            if (ListUtil.isEmpty(uList)) {
                code = "1";
                msg = "没有查询到数据！";
            }
//            json.put("dayList", dayList);
            json.put("tList", tList);
        } catch (Throwable e) {
            logger.error("9002", e);
            e.printStackTrace();
            throw new ServiceException("9002", "获取未打卡数据出错");
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
     * 缺勤事由获取未打卡信息
     * 日期+当前部门
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String unClockReason(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        String scyf = DateUtil.getNow("yyyy-MM-dd");//所传日期，默认当天
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            if (StringUtil.isBlank(MapUtil.stringValue(map, "QUERY_DATE"))) {
                map.put("QUERY_DATE", scyf);
            }
            //取当前人所在部门
            if(MapUtil.valueIsNull(map,"DEPT")){
                map.put("DEPT", MapUtil.stringValue(userProfile.getOrgInfo(), Constant.DEPT_NO));
            }
            //获取日期列表，只获取当天以及前几天的，这个是根据设置进行的
//            List<String> dayList = BaiyinUtils.genReasonDateList();

            //获取本部门所有人,用登录人查询
            String sql = AttendReasonServiceSQL.clockByDept(map);
            List<Map> mList = new IbatisDBUtil().executeSql(sql);
            String personIds = "'1'";
            if (ListUtil.isNotEmpty(mList)) {

                for (Map m : mList) {
                    personIds += ",'" + (MapUtil.stringValue(m, "PERSON_ID")) + "'";
                }
            }
            //查询部门下所有人员
            map.put("PERSON_ID", "(" + personIds + ")");
            map.put("LOGIN_PERSON_ID",userProfile.getUserId());
            sql = ClockServiceSQL.personerList(map);
            logger.info("sql========="+sql);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            sql = AttendReasonServiceSQL.unClock(map);
            List<Map> uList = new IbatisDBUtil().executeSql(sql);
            String wdkPersonIds = "'1'";
            if (ListUtil.isNotEmpty(tList)) {
                for (Map m : tList) {
                    m.put("TRANSACTION_ID", "");
                    m.put("REMARKS", "全天未打卡");
                    wdkPersonIds += ",'" + (MapUtil.stringValue(m,"PERSON_ID")) + "'";
                    uList.add(m);
                }
            }
            //获取确认人是登录人的未打卡人员
            Map maps = new HashMap();
            maps.put("WDK_PERSON_ID","("+wdkPersonIds+")");
            maps.put("LOGIN_PERSON_ID",userProfile.getUserId());
            maps.put("QUERY_DATE",MapUtil.stringValue(map,"QUERY_DATE"));
            maps.put("DEPT",MapUtil.stringValue(map,"DEPT"));
            String sqls = ClockServiceSQL.personerListReason(maps);
            logger.info("sqls=============="+sqls);
            List<Map> wList = new IbatisDBUtil().executeSql(sqls);
            if(ListUtil.isNotEmpty(wList)){
                for(Map m:wList){
                    if(MapUtil.valueIsNull(m,"REMARKS")){
                        m.put("REMARKS","全天未打卡");
                    }else{
                        m.put("REMARKS",MapUtil.stringValue(m,"NOTE"));
                    }
                }
            }
            //获取当天未打卡人员
            AttendReasonServiceSQL.unClock(map);
            mList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isNotEmpty(mList)){
                for(Map m:mList){
                    if(MapUtil.valueIsNull(m,"NOTE")){
                        m.put("REMARKS","下班未打卡");
                    }else{
                        m.put("REMARKS",MapUtil.stringValue(m,"NOTE"));
                    }
                    uList.add(m);

                }
            }
            if (ListUtil.isEmpty(uList)) {
                code = "1";
                msg = "没有查询到数据！";
            }
//            json.put("dayList", dayList);
            json.put("tList", tList);
            json.put("wList",wList);
        } catch (Throwable e) {
            logger.error("9002", e);
            e.printStackTrace();
            throw new ServiceException("9002", "获取未打卡数据出错");
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
     * 设置迟到早退事由
     * @param map
     * @return
     * @throws ServiceException
     */
    public String reason(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try {
            Date now = new Date();
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            String qdate = DateUtil.formDate(DateUtil.parse2Date(MapUtil.stringValue(map,"QUERY_DATE"),"yyyy-MM-dd"),"yyyyMMdd");
            String transactionId = qdate+MapUtil.stringValue(map,"PERSON_ID");
            String sql = AttendReasonServiceSQL.confirmPerson(map);
            List<Map> confirmPerson = new IbatisDBUtil().executeSql(sql);
            map.put("PLAN_START_TIME",qdate+" 9:00:00");
            map.put("PLAN_END_TIME",qdate+" 17:00:00");
            map.put("CHECK_IN_STATE",AttendConstant.CHECK_IN_STATE_LATE);
            map.put("CHECK_OUT_STATE",AttendConstant.CHECK_OUT_STATE_EARLY);
            map.put("DEPT",(String)userProfile.getOrgInfo().get(Constant.DEPT_NO));
            map.put("ROWVERSION",DateUtil.formDate(now,"yyyy-MM-dd"));
            map.put("NOTE_TIME",DateUtil.formDate(now,"yyyy-MM-dd HH:mm:ss"));
            map.put("NOTE_PERSON",userProfile.getUserId());
            map.put("CONFIRM_PERSON",MapUtil.stringValue(confirmPerson.get(0),"CONFIRM_PERSON"));
            logger.info("confirmPerson=========="+MapUtil.stringValue(confirmPerson.get(0),"CONFIRM_PERSON"));
            sql = "";
            if(MapUtil.valueIsNull(map,"TRANSACTION_ID")){//插入
                map.put("TRANSACTION_ID",transactionId);
                sql = AttendReasonServiceSQL.reasonInsert(map);
            }else{//更新
                sql = AttendReasonServiceSQL.reasonUpdate(map);
            }
            logger.info("sql================"+sql);
            new IbatisDBUtil().executeSql(sql);
        } catch (Throwable e) {
            logger.error("9003", e);
            e.printStackTrace();
            throw new ServiceException("9003", "执行添加事由时出错");
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
     * 设置未打卡事由
     * @param map
     * @return
     * @throws ServiceException
     */
    public String wClockReason(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try {
            Date now = new Date();
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            String qdate = DateUtil.formDate(DateUtil.parse2Date(MapUtil.stringValue(map,"QUERY_DATE"),"yyyy-MM-dd"),"yyyyMMdd");
            String transactionId = qdate+MapUtil.stringValue(map,"PERSON_ID");
            String sql = AttendReasonServiceSQL.confirmPerson(map);
            List<Map> confirmPerson = new IbatisDBUtil().executeSql(sql);
            map.put("PLAN_START_TIME",qdate+" 9:00:00");
            map.put("PLAN_END_TIME",qdate+" 17:00:00");
            map.put("CHECK_IN_STATE","");
            map.put("CHECK_OUT_STATE","");
            map.put("DEPT",(String)userProfile.getOrgInfo().get(Constant.DEPT_NO));
            map.put("ROWVERSION",DateUtil.formDate(now,"yyyy-MM-dd"));
            map.put("NOTE_TIME",DateUtil.formDate(now,"yyyy-MM-dd HH:mm:ss"));
            map.put("NOTE_PERSON",userProfile.getUserId());
            map.put("CONFIRM_PERSON",MapUtil.stringValue(confirmPerson.get(0),"CONFIRM_PERSON"));
            logger.info("confirmPerson=========="+MapUtil.stringValue(confirmPerson.get(0),"CONFIRM_PERSON"));
            sql = "";
            if(MapUtil.valueIsNull(map,"TRANSACTION_ID")){//插入
                map.put("TRANSACTION_ID",transactionId);
                sql = AttendReasonServiceSQL.reasonInsert(map);
            }else{//更新
                sql = AttendReasonServiceSQL.reasonUpdate(map);
            }
            logger.info("sql================"+sql);
            new IbatisDBUtil().executeSql(sql);
        } catch (Throwable e) {
            logger.error("9003", e);
            e.printStackTrace();
            throw new ServiceException("9003", "执行添加事由时出错");
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
