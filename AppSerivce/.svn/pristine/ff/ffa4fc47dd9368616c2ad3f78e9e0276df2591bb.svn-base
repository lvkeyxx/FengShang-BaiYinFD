package com.service.attendence.sql;

import com.utility.MapUtil;
import com.utility.baiyin.BaiyinUtils;

import java.util.Map;

import static sun.font.FontManager.logger;

/**
 * @Author:wangyg
 * @Description:考勤统计SQL
 * @Date:Created in 2018-03-12 10:44
 * @Modied By:
 **/
public class AttendStatisticsServiceSQL {
    /**
     * 获取我的考勤列表信息
     *
     * @param map
     * @return
     */
    public static String myAttendence(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.TRANSACTION_ID||'' TRANSACTION_ID,");
        sb.append(" t.PERSON_ID,");
        sb.append(" to_char(t.PLAN_START_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_START_TIME,");
        sb.append(" TO_CHAR(t.PLAN_END_TIME,'yyyy-mm-dd hh24:mi:ss') PLAN_END_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_START_TIME,'yyyy-mm-dd hh24:mi:ss') ACTUAL_START_TIME,");
        sb.append(" TO_CHAR(t.ACTUAL_END_TIME,'yyyy-mm-dd hh24:mi:ss') ACTUAL_END_TIME,");
        sb.append(" t.IN_BLUETOOTH_NO||'' IN_BLUETOOTH_NO,");
        sb.append(" t.OUT_BLUETOOTH_NO||'' OUT_BLUETOOTH_NO,");
        sb.append(" t.CHECK_IN_ADDR,");
        sb.append(" t.CHECK_OUT_ADDR,");
        sb.append(" t.CHECK_IN_INFO,");
        sb.append(" t.CHECK_OUT_INFO,");
        sb.append(" t.CHECK_IN_STATE,");
        sb.append(" t.CHECK_OUT_STATE,");
        sb.append(" t.NOTE,");
        sb.append(" to_char(t.NOTE_TIME,'yyyy-mm-dd hh24:mi:ss') NOTE_TIME,");
        sb.append(" t.NOTE_PERSON,t.DEPT||'' DEPT,");
        sb.append(" t.CONFIRM_DATE");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_TAB t ");
        sb.append(" where 1=1 ");
        //按日期查询
        if (MapUtil.valueIsNotNull(map, "QUERY_DATE")) {
            sb.append(" and to_char(t.PLAN_START_TIME,'yyyy-mm-dd')='");
            sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
            sb.append("'");
        }
       /* //按月份查询
        if (MapUtil.valueIsNotNull(map, "QUERY_MONTH")) {
            sb.append(" and to_char(t.PLAN_START_TIME,'yyyy-mm')='");
            sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
            sb.append("'");
        }*/
        //按月份查询
        if (MapUtil.valueIsNotNull(map, "QUERY_MONTH")) {
            sb.append(" and substr(t.TRANSACTION_ID,0,4)||'-'||substr(t.TRANSACTION_ID, 5, 2)='");
            sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
            sb.append("'");
        }
        //根据部门代码
        if (MapUtil.valueIsNotNull(map, "DEPT")) {
            sb.append(" and t.DEPT='");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        //按人员代码查询
        if (MapUtil.valueIsNotNull(map, "PERSON_ID")) {
            sb.append(" and t.person_id='");
            sb.append(MapUtil.stringValue(map, "PERSON_ID"));
            sb.append("'");
        }
        return sb.toString();
    }

    /**
     * 本部门所有人,登录人查询
     *
     * @param map
     * @return
     */
    public static String allPersonByDeptNum(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT count(1) COUNT");
        sb.append(" from ifsapp.COMPANY_EMP");
        sb.append(" where company = '10'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE) is not null");
        }else {
            sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE) = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name(company, person_id) not in ('08', '09')");
        return sb.toString();
    }
    /**
     * 本部门所有人详情,登录人查询
     *
     * @param map
     * @return
     */
    public static String allPersonByDept(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT *");
        sb.append(" from ifsapp.COMPANY_EMP");
        sb.append(" where company = '10'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE) is not null");
        }else {
            sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE) = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name(company, person_id) not in ('08', '09')");
        return sb.toString();
    }

    /**
     * 本部门未打卡，迟到，早退，正常人
     *
     * @param map
     * @return
     */
    public static String monthStatisticsPersons(Map map) {
        StringBuffer sb = new StringBuffer();
        String query_month = MapUtil.stringValue(map,"QUERY_MONTH").replace("-","");
        sb.append("select person_id,dept,person_name,substr(transaction_day, 0, 6) transaction_mon,sum(be_late) be_late,sum(leave_early) leave_early,");
        sb.append(" sum(abnormal) abnormal,sum(regular) regular  ");
        sb.append(" from (select person_id,dept,ifsapp.Person_Info_Api.Get_Name(person_id) person_name,");
        sb.append(" substr(transaction_id, 0, 8) transaction_day,");
        sb.append(" max(case when t.plan_start_time < t.actual_start_time and t.confirm_date is null then 1 else 0 end) as be_late,");
        sb.append(" max(case when (t.plan_end_time > t.actual_end_time or (actual_start_time is not null and actual_end_time is null and sysdate > plan_start_time+20/24))");
        sb.append(" and t.confirm_date is null then 1 else 0 end) as leave_early,");
        sb.append(" max(case when (t.plan_start_time < t.actual_start_time or t.plan_end_time > t.actual_end_time or");
        sb.append(" (actual_end_time is null and sysdate > plan_end_time)) and t.confirm_date is null then 1 else 0 end) as abnormal,");
        sb.append(" min(case when (t.plan_start_time > t.actual_start_time and t.plan_end_time < t.actual_end_time)");
        sb.append(" or t.confirm_date is not null then 1 else 0 end) as regular");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_tab t");
        sb.append(" group by person_id, dept,substr(transaction_id, 0, 8))");
        sb.append(" where 1=1");
        if(MapUtil.valueIsNotNull(map,"QUERY_MONTH")){
            sb.append(" and substr(transaction_day, 0, 6) = '");
            sb.append(query_month);
            sb.append("'");
        }
        if(MapUtil.valueIsNotNull(map,"DEPT")){
            if(MapUtil.stringValue(map,"DEPT").equals("10")){
                sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code('10', person_id, SYSDATE) is not null");
            }else {
                sb.append(" and dept='");
                sb.append(MapUtil.stringValue(map,"DEPT"));
                sb.append("'");
                sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code('10', person_id, SYSDATE) = '");
                sb.append(MapUtil.stringValue(map, "DEPT"));
                sb.append("'");
            }
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group by person_id,dept, person_name, substr(transaction_day, 0, 6)");

        return sb.toString();
    }
    /**
     * 本部门打卡人
     *
     * @param map
     * @return
     */
    public static String clockPersonByDept(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select  count(distinct person_id)  COUNT");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where to_char(t.plan_start_time, 'yyyy-mm-dd') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
        sb.append("'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.dept is not null");
        }else{
            sb.append(" and t.dept = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and (actual_start_time is not null or actual_end_time is not null)");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        return sb.toString();
    }

    /**
     * 本部门迟到人数
     *
     * @param map
     * @return
     */
    public static String latePersonByDept(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select count(a.PERSON_ID) COUNT from(");
        sb.append("select  person_id  PERSON_ID,");
        sb.append(" confirm_date CONFIRM_DATE");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where to_char(t.plan_start_time, 'yyyy-mm-dd') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
        sb.append("'");
        sb.append(" and t.check_in_state='迟到'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.dept is not null");
        }else{
            sb.append(" and t.dept = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(")a  where a.CONFIRM_DATE is null");
        return sb.toString();
    }

    /**
     * 本部门早退人
     *
     * @param map
     * @return
     */
    public static String earlyPersonByDept(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select count(a.PERSON_ID) COUNT from(");
        sb.append("select  person_id  PERSON_ID,");
        sb.append(" confirm_date CONFIRM_DATE");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where to_char(t.plan_start_time, 'yyyy-mm-dd') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
        sb.append("'");
        sb.append(" and t.check_out_state='早退'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.dept is not null");
        }else{
            sb.append(" and t.dept = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(")a  where a.CONFIRM_DATE is null");
        return sb.toString();
    }
    /**
     * 本部门正常人
     *
     * @param map
     * @return
     */
    public static String normalPersonByDept(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select  count(distinct person_id) COUNT");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where to_char(t.plan_start_time, 'yyyy-mm-dd') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
        sb.append("'");
        sb.append(" and ((t.check_out_state='正常' and t.check_in_state='正常')");
        sb.append(" or (CONFIRM_DATE is not null and t.check_in_state='迟到')");
        sb.append(" or (CONFIRM_DATE is not null and t.check_out_state='早退')");
        sb.append(" or (t.check_in_state='正常' and to_date(t.plan_end_time) < to_date(t.plan_start_time + 20/24)))");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.dept is not null");
        }else{
            sb.append(" and t.dept = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        return sb.toString();
    }
    /**
     * 本部门打卡人,月度打卡人数
     *
     * @param map
     * @return
     */
    public static String clockPersonByDeptM(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select count(1)||'' COUNT FROM(select count(1)||'' COUNT");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where to_char(t.plan_start_time, 'yyyy-mm') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
        sb.append("'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.dept is not null");
        }else{
            sb.append(" and t.dept = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group by t.person_id) a");
        return sb.toString();
    }

    /**
     * 本部门迟到人数,月统计
     *
     * @param map
     * @return
     */
    public static String latePersonByDeptM(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select count(1)||'' COUNT from(select count(1)||'' COUNT");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where to_char(t.plan_start_time, 'yyyy-mm') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
        sb.append("'");
        sb.append(" and t.check_in_state='迟到'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.dept is not null");
        }else{
            sb.append(" and t.dept = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group by person_id) a");
        return sb.toString();
    }

    /**
     * 本部门早退人,月统计
     *
     * @param map
     * @return
     */
    public static String earlyPersonByDeptM(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select count(1)||'' COUNT from (select count(1)||'' COUNT");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where to_char(t.plan_start_time, 'yyyy-mm') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
        sb.append("'");
        sb.append(" and t.check_out_state='早退'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.dept is not null");
        }else{
            sb.append(" and t.dept = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group  by t.person_id) a");
        return sb.toString();
    }
    /**
     * 本部门早退人,月统计
     *
     * @param map
     * @return
     */
    public static String normalPersonByDeptM(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select count(1)||'' COUNT from (select count(1)||'' COUNT");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where to_char(t.plan_start_time, 'yyyy-mm') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
        sb.append("'");
        sb.append(" and t.check_out_state='正常' and t.check_in_state='正常'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.dept is not null");
        }else{
            sb.append(" and t.dept = '");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group  by t.person_id) a");
        return sb.toString();
    }
    /**
     * 通过部门和月份的查询条件，显示人员统计的列表和数值 未打卡
     *
     * @param map
     * @return
     */
    public static String groupByPerson(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select person_id,");
        sb.append(" ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME,");
        sb.append(" count(distinct person_id)||'' COUNT ");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where 1=1 ");
        if (MapUtil.valueIsNotNull(map, "CHECK_IN_STATE")) {
            sb.append(" AND CHECK_IN_STATE='");
            sb.append(MapUtil.stringValue(map, "CHECK_IN_STATE"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "CHECK_OUT_STATE")) {
            sb.append(" AND CHECK_OUT_STATE='");
            sb.append(MapUtil.stringValue(map, "CHECK_OUT_STATE"));
            sb.append("'");
        }
        sb.append(" and to_char(t.plan_start_time, 'yyyy-mm') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
        sb.append("'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.DEPT is not null");
        }else {
            sb.append(" and t.DEPT='");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group by person_id");
        return sb.toString();
    }
    /**
     * 通过部门和月份的查询条件，显示人员统计的列表和数值 迟到
     *
     * @param map
     * @return
     */
    public static String groupByPersonLate(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select person_id,");
        sb.append(" ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME,");
        sb.append(" count(1)||'' COUNT ");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where 1=1 ");
        if (MapUtil.valueIsNotNull(map, "CHECK_IN_STATE")) {
            sb.append(" AND CHECK_IN_STATE='");
            sb.append(MapUtil.stringValue(map, "CHECK_IN_STATE"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "CHECK_OUT_STATE")) {
            sb.append(" AND CHECK_OUT_STATE='");
            sb.append(MapUtil.stringValue(map, "CHECK_OUT_STATE"));
            sb.append("'");
        }
        sb.append(" and to_char(t.plan_start_time, 'yyyy-mm') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
        sb.append("'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.DEPT is not null");
        }else {
            sb.append(" and t.DEPT='");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group by person_id");
        return sb.toString();
    }
    /**
     * 通过部门和月份的查询条件，显示人员统计的列表和数值 早退
     *
     * @param map
     * @return
     */
    public static String groupByPersonEarly(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select person_id,");
        sb.append(" ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME,");
        sb.append(" count(1)||'' COUNT ");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where 1=1 ");
        if (MapUtil.valueIsNotNull(map, "CHECK_IN_STATE")) {
            sb.append(" AND CHECK_IN_STATE='");
            sb.append(MapUtil.stringValue(map, "CHECK_IN_STATE"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "CHECK_OUT_STATE")) {
            sb.append(" AND CHECK_OUT_STATE='");
            sb.append(MapUtil.stringValue(map, "CHECK_OUT_STATE"));
            sb.append("'");
        }
        sb.append(" and to_char(t.plan_start_time, 'yyyy-mm') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
        sb.append("'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.DEPT is not null");
        }else {
            sb.append(" and t.DEPT='");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group by person_id");
        return sb.toString();
    }
    /**
     * 通过部门和月份的查询条件，显示人员统计的列表和数值 正常
     *
     * @param map
     * @return
     */
    public static String groupByPersonNormal(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select person_id,");
        sb.append(" ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME,");
        sb.append(" count(1)||'' COUNT ");
        sb.append(" from ifsapp.c_time_transaction_tab t");
        sb.append(" where 1=1 ");
        if (MapUtil.valueIsNotNull(map, "CHECK_IN_STATE")) {
            sb.append(" AND CHECK_IN_STATE='");
            sb.append(MapUtil.stringValue(map, "CHECK_IN_STATE"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "CHECK_OUT_STATE")) {
            sb.append(" AND CHECK_OUT_STATE='");
            sb.append(MapUtil.stringValue(map, "CHECK_OUT_STATE"));
            sb.append("'");
        }
        sb.append(" and to_char(t.plan_start_time, 'yyyy-mm') = '");
        sb.append(MapUtil.stringValue(map, "QUERY_MONTH"));
        sb.append("'");
        if(MapUtil.stringValue(map,"DEPT").equals("10")){
            sb.append(" and t.DEPT is not null");
        }else {
            sb.append(" and t.DEPT='");
            sb.append(MapUtil.stringValue(map, "DEPT"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name('10', person_id) not in ('08', '09')");
        sb.append(" group by person_id");
        return sb.toString();
    }

}
