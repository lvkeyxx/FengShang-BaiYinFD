package com.service.attendence.sql;

import com.utility.MapUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author:wangyg
 * @Description:考勤事由服务SQL
 * @Date:Created in 2018-03-12 10:44
 * @Modied By:
 **/
public class AttendReasonServiceSQL {
    /**
     * 通过部门查询迟到和早退人员列表
     *
     * @param map
     * @return
     */
    public static String lateAndEarlyByDept(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.TRANSACTION_ID||'' TRANSACTION_ID,");
        sb.append(" t.PERSON_ID,ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME,");
        sb.append(" to_char(t.PLAN_START_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_START_TIME,");
        sb.append(" TO_CHAR(t.PLAN_END_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_END_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_START_TIME,'hh24:mi') ACTUAL_START_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_END_TIME,'hh24:mi') ACTUAL_END_TIME,");
        sb.append(" t.IN_BLUETOOTH_NO||'' IN_BLUETOOTH_NO,");
        sb.append(" t.OUT_BLUETOOTH_NO||'' OUT_BLUETOOTH_NO,");
        sb.append(" t.CHECK_IN_ADDR,");
        sb.append(" t.CHECK_OUT_ADDR,");
        sb.append(" t.CHECK_IN_INFO,");
        sb.append(" t.CHECK_OUT_INFO,");
        sb.append(" t.CHECK_IN_STATE,");
        sb.append(" t.CHECK_OUT_STATE,");
        sb.append(" t.NOTE,");
        sb.append(" t.NOTE_TIME,");
        sb.append(" t.CONFIRM_DATE,");
        sb.append(" t.NOTE_PERSON,t.DEPT||'' DEPT");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_TAB t ");
        sb.append(" where 1=1 ");
        sb.append(" and (t.check_in_state='迟到' or t.check_out_state='早退' or (t.check_out_state='早退' and t.confirm_date is not null)");
        sb.append(" or (to_date(t.plan_end_time) < to_date(t.plan_start_time + 20 / 24)))");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        //按日期查询
        if (MapUtil.valueIsNotNull(map, "QUERY_DATE")) {
            sb.append(" and to_char(t.PLAN_START_TIME,'yyyy-mm-dd')='");
            sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
            sb.append("'");
        }
        //根据部门代码
        if (MapUtil.valueIsNotNull(map, "DEPT")) {
            if(MapUtil.stringValue(map,"DEPT").equals("10")){
                sb.append(" and t.DEPT is not null");
            }else {
                sb.append(" and t.DEPT='");
                sb.append(MapUtil.stringValue(map, "DEPT"));
                sb.append("'");
            }
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        return sb.toString();
    }
    /**
     * 通过部门查询正常人员列表
     *
     * @param map
     * @return
     */
    public static String normalByDept(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.TRANSACTION_ID||'' TRANSACTION_ID,");
        sb.append(" t.PERSON_ID,ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME,");
        sb.append(" to_char(t.PLAN_START_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_START_TIME,");
        sb.append(" TO_CHAR(t.PLAN_END_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_END_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_START_TIME,'hh24:mi') ACTUAL_START_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_END_TIME,'hh24:mi') ACTUAL_END_TIME,");
        sb.append(" t.IN_BLUETOOTH_NO||'' IN_BLUETOOTH_NO,");
        sb.append(" t.OUT_BLUETOOTH_NO||'' OUT_BLUETOOTH_NO,");
        sb.append(" t.CHECK_IN_ADDR,");
        sb.append(" t.CHECK_OUT_ADDR,");
        sb.append(" t.CHECK_IN_INFO,");
        sb.append(" t.CHECK_OUT_INFO,");
        sb.append(" t.CHECK_IN_STATE,");
        sb.append(" t.CHECK_OUT_STATE,");
        sb.append(" t.NOTE,");
        sb.append(" t.NOTE_TIME,");
        sb.append(" t.CONFIRM_DATE,");
        sb.append(" t.NOTE_PERSON,t.DEPT||'' DEPT");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_TAB t ");
        sb.append(" where 1=1 ");
        sb.append(" and ((t.check_in_state='正常' and t.check_out_state='正常') or (t.check_in_state='迟到' and t.confirm_date is not null) or (t.check_out_state='早退' and t.confirm_date is not null)");
        sb.append(" or (t.check_in_state='正常' and to_date(t.plan_end_time) < to_date(t.plan_start_time + 20 / 24)))");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        //按日期查询
        if (MapUtil.valueIsNotNull(map, "QUERY_DATE")) {
            sb.append(" and to_char(t.PLAN_START_TIME,'yyyy-mm-dd')='");
            sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
            sb.append("'");
        }
        //根据部门代码
        if (MapUtil.valueIsNotNull(map, "DEPT")) {
            if(MapUtil.stringValue(map,"DEPT").equals("10")){
                sb.append(" and t.DEPT is not null");
            }else {
                sb.append(" and t.DEPT='");
                sb.append(MapUtil.stringValue(map, "DEPT"));
                sb.append("'");
            }
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        return sb.toString();
    }

    /**
     * 缺勤事由迟到早退
     * @param map
     * @return
     */
    public static String lateAndEarlyByDeptReason(Map map) {
        StringBuffer sb = new StringBuffer();
        String personId = MapUtil.stringValue(map,"PERSON_ID");
        sb.append("select t.TRANSACTION_ID||'' TRANSACTION_ID,");
        sb.append(" t.PERSON_ID,ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME,");
        sb.append(" to_char(t.PLAN_START_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_START_TIME,");
        sb.append(" TO_CHAR(t.PLAN_END_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_END_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_START_TIME,'hh24:mi') ACTUAL_START_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_END_TIME,'hh24:mi') ACTUAL_END_TIME,");
        sb.append(" t.IN_BLUETOOTH_NO||'' IN_BLUETOOTH_NO,");
        sb.append(" t.OUT_BLUETOOTH_NO||'' OUT_BLUETOOTH_NO,");
        sb.append(" t.CHECK_IN_ADDR,");
        sb.append(" t.CHECK_OUT_ADDR,");
        sb.append(" t.CHECK_IN_INFO,");
        sb.append(" t.CHECK_OUT_INFO,");
        sb.append(" t.CHECK_IN_STATE,");
        sb.append(" t.CHECK_OUT_STATE,");
        sb.append(" t.CONFIRM_DATE,");
        sb.append(" t.NOTE,");
        sb.append(" t.NOTE_TIME,");
        sb.append(" t.CONFIRM_DATE,");
        sb.append(" t.NOTE_PERSON,t.DEPT||'' DEPT");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_TAB t ");
        sb.append(" where 1=1 ");
        sb.append(" and (t.check_in_state='迟到' or t.check_out_state='早退')");
        //根据确认人查询
        sb.append(" and t.CONFIRM_PERSON='"+personId+"'");
        //按日期查询
        if (MapUtil.valueIsNotNull(map, "QUERY_DATE")) {
            sb.append(" and to_char(t.PLAN_START_TIME,'yyyy-mm-dd')='");
            sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
            sb.append("'");
        }
/*        //根据部门代码
        if (MapUtil.valueIsNotNull(map, "DEPT")) {
            sb.append(" and t.DEPT='");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }*/
        return sb.toString();
    }

    /**
     * 查询未打卡信息
     *
     * @param map
     * @return
     */
    public static String unClock(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.TRANSACTION_ID||'' TRANSACTION_ID,'下班未打卡' REMARKS,");
        sb.append(" t.PERSON_ID,ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME ");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_TAB t ");
        sb.append(" where 1=1 ");
        sb.append(" and (t.check_out_state is null)");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        //按日期查询
        if (MapUtil.valueIsNotNull(map, "QUERY_DATE")) {
            sb.append(" and to_char(t.PLAN_START_TIME,'yyyy-mm-dd')='");
            sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
            sb.append("'");
        }
        //根据部门代码
        if (MapUtil.valueIsNotNull(map, "DEPT")) {
            if(MapUtil.stringValue(map,"DEPT").equals("10")){
                sb.append(" and t.DEPT is not null");
            }else {
                sb.append(" and t.DEPT='");
                sb.append(MapUtil.stringValue(map, "DEPT"));
                sb.append("'");
            }
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        return sb.toString();
    }

    /**
     * 获取打卡列表
     *
     * @param map
     * @return
     */
    public static String clockByDept(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.TRANSACTION_ID||'' TRANSACTION_ID,");
        sb.append(" t.PERSON_ID,ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME,");
        sb.append(" to_char(t.PLAN_START_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_START_TIME,");
        sb.append(" TO_CHAR(t.PLAN_END_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_END_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_START_TIME,'hh24:mi') ACTUAL_START_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_END_TIME,'hh24:mi') ACTUAL_END_TIME,");
        sb.append(" t.IN_BLUETOOTH_NO||'' IN_BLUETOOTH_NO,");
        sb.append(" t.OUT_BLUETOOTH_NO||'' OUT_BLUETOOTH_NO,");
        sb.append(" t.CHECK_IN_ADDR,");
        sb.append(" t.CHECK_OUT_ADDR,");
        sb.append(" t.CHECK_IN_INFO,");
        sb.append(" t.CHECK_OUT_INFO,");
        sb.append(" t.CHECK_IN_STATE,");
        sb.append(" t.CHECK_OUT_STATE,");
        sb.append(" t.NOTE,");
        sb.append(" t.NOTE_TIME,");
        sb.append(" t.NOTE_PERSON,t.DEPT||'' DEPT");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_TAB t ");
        sb.append(" where 1=1 ");
        sb.append(" and (actual_start_time is not null or actual_end_time is not null)");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        //按日期查询
        if (MapUtil.valueIsNotNull(map, "QUERY_DATE")) {
            sb.append(" and to_char(t.PLAN_START_TIME,'yyyy-mm-dd')='");
            sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
            sb.append("'");
        }
        //根据部门代码
        if (MapUtil.valueIsNotNull(map, "DEPT")) {
            if(MapUtil.stringValue(map,"DEPT").equals("10")){
                sb.append(" and t.dept is not null");
            }else{
                sb.append(" and t.dept = '");
                sb.append(MapUtil.stringValue(map, "DEPT"));
                sb.append("'");
            }
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        return sb.toString();
    }

    public static void main(String[] args) {
        Map map = new HashMap();
        map.put("DEPT", "101");
        map.put("QUERY_DATE", "2018-03-19");
        System.out.println(unClock(map));
    }

    /**
     * 确认人查询
     */
    public static String confirmPerson(Map map){
        StringBuffer sb = new StringBuffer();
        String personConfirm = MapUtil.stringValue(map,"PERSON_ID");
        sb.append("select IFSAPP.ATTEND_CAN_VIEW_API.Get_Attend_Person ('");
        sb.append(personConfirm+"') CONFIRM_PERSON");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_TAB");

        return sb.toString();
    }

    /**
     * 确认时间插入
     */
    public static String confirmDate(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("update ");
        sb.append(" ifsapp.c_time_transaction_tab set ");
        sb.append("confirm_date=to_date('");
        sb.append(MapUtil.stringValue(map, "CONFIRM_DATE"));
        sb.append("','yyyy-mm-dd hh24:mi:ss') WHERE transaction_id='");
        sb.append(MapUtil.stringValue(map, "TRANSACTION_ID"));
        sb.append("'");

        return sb.toString();
    }
    /**
     * 插入事由
     *
     * @param map
     * @return
     */
    public static String reasonInsert(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("insert into ");
        sb.append(" ifsapp.c_time_transaction_tab(");
        sb.append("transaction_id,");
        sb.append("person_id,");
        sb.append("check_in_state,");
        sb.append("check_out_state,");
        sb.append("note,rowversion,");
        sb.append("note_time,");
        sb.append("plan_start_time,");
        sb.append("plan_end_time,");
        sb.append("note_person,");
        sb.append("dept,");
        sb.append("confirm_person");
        sb.append(")");
        sb.append("values(");
        sb.append("'");
        sb.append(MapUtil.stringValue(map, "TRANSACTION_ID"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map, "PERSON_ID"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map, "CHECK_IN_STATE"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map, "CHECK_OUT_STATE"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map, "NOTE"));
        sb.append("',to_date('");
        sb.append(MapUtil.stringValue(map, "ROWVERSION"));
        sb.append("','yyyy-mm-dd'),to_date('");
        sb.append(MapUtil.stringValue(map, "NOTE_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),to_date('");
        sb.append(MapUtil.stringValue(map, "PLAN_START_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),to_date('");
        sb.append(MapUtil.stringValue(map, "PLAN_END_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),'");
        sb.append(MapUtil.stringValue(map, "NOTE_PERSON"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map, "DEPT"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"CONFIRM_PERSON"));
        sb.append("'");
        sb.append(")");

        return sb.toString();
    }

    /**
     * 更新事由
     *
     * @param map
     * @return
     */
    public static String reasonUpdate(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("update ");
        sb.append(" ifsapp.c_time_transaction_tab set ");
        sb.append(" person_id='");
        sb.append(MapUtil.stringValue(map, "PERSON_ID"));
        sb.append("',");
        sb.append("note='");
        sb.append(MapUtil.stringValue(map, "NOTE"));
        sb.append("',");
        sb.append("rowversion=to_date('");
        sb.append(MapUtil.stringValue(map, "ROWVERSION"));
        sb.append("','yyyy-mm-dd'),");
        sb.append("note_time=to_date('");
        sb.append(MapUtil.stringValue(map, "NOTE_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),");
        sb.append("note_person='");
        sb.append(MapUtil.stringValue(map, "NOTE_PERSON"));
        sb.append("',");
        sb.append("dept='");
        sb.append(MapUtil.stringValue(map, "DEPT"));
        sb.append("',");
        sb.append("confirm_person='");
        sb.append(MapUtil.stringValue(map, "CONFIRM_PERSON"));
        sb.append("' WHERE transaction_id='");
        sb.append(MapUtil.stringValue(map, "TRANSACTION_ID"));
        sb.append("'");

        return sb.toString();
    }


}
