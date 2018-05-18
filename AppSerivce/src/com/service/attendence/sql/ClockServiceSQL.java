package com.service.attendence.sql;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.utility.DateUtil;
import com.utility.MapUtil;
import com.utility.baiyin.BaiyinUtils;

import java.util.Date;
import java.util.Map;

/**
 * @Author:wangyg
 * @Description:打卡相关SQL
 * @Date:Created in 2018-03-12 10:30
 * @Modied By:
 **/
public class ClockServiceSQL {
    /**
     * 通过蓝牙编号查询蓝牙对应数据
     *
     * @param map
     * @return
     */
    public static String blueToothDetail(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT t.serial_no       SERIAL_NO,");
        sb.append(" t.contract        CONTRACT,");
        sb.append(" t.province        PROVINCE,");
        sb.append(" t.city            CITY,");
        sb.append(" t.county          COUNTY,");
        sb.append(" t.company         COMPANY,");
        sb.append(" t.dept_id         DEPT_ID,");
        sb.append(" t.address         ADDRESS,");
        sb.append(" b.rule_id         RULE_ID,");
        sb.append(" b.bluetooth_no         BLUETOOTH_NO,");
        sb.append(" r.start_time         START_TIME,");
        sb.append(" r.end_time         END_TIME,");
        sb.append(" r.rule_desc        RULE_DESC,");
        sb.append(" t.device_location DEVICE_LOCATION,");
        sb.append(" t.sn_code         SN_CODE,");
        sb.append(" t.bluetooth_desc  BLUETOOTH_DESC,");
        sb.append(" t.remark          REMARK");
        sb.append(" FROM ifsapp.bluetooth_control_info t ");
        sb.append(" left join ifsapp.C_TIME_RULE_BLUETOOTH_tab b");
        sb.append(" on b.bluetooth_no = t.serial_no");
        sb.append(" left join ifsapp.C_TIME_RULE_tab r");
        sb.append(" on b.rule_id = r.rule_id");
        sb.append(" where b.rule_id is not null and t.sn_code='");
        sb.append(BaiyinUtils.getSnWithoutColon(MapUtil.stringValue(map, "SN")));
        sb.append("'");

        return sb.toString();
    }

    /**
     * 查询所有蓝牙数据
     *
     * @param map
     * @return
     */
    public static String blueToothList(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT serial_no       SERIAL_NO,");
        sb.append(" contract        CONTRACT,");
        sb.append(" province        PROVINCE,");
        sb.append(" city            CITY,");
        sb.append(" county          COUNTY,");
        sb.append(" company         COMPANY,");
        sb.append(" dept_id         DEPT_ID,");
        sb.append(" address         ADDRESS,");
        sb.append(" device_location DEVICE_LOCATION,");
        sb.append(" sn_code         SN_CODE,");
        sb.append(" bluetooth_desc  BLUETOOTH_DESC,");
        sb.append(" remark          REMARK");
        sb.append(" FROM ifsapp.bluetooth_control_info t ");
        sb.append(" where 1=1 ");
        return sb.toString();
    }

    /**
     * 查询所有蓝牙数量
     *
     * @param map
     * @return
     */
    public static String blueToothCount(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT count(1) COUNT");
        sb.append(" FROM ifsapp.bluetooth_control_info t ");
        sb.append(" where 1=1 ");
        return sb.toString();
    }

    /**
     * 通过蓝牙设备号获取考勤日期
     *
     * @param map
     * @return
     */
    public static String clockTimeBySn(Map map) {
        /**
         * sb.append("select t.TRANSACTION_ID,");
         sb.append(" to_char('hh24:mi', t.plan_start_time) start_time,");
         sb.append(" to_char('hh24:mi', t.plan_end_time) end_time,");
         sb.append(" t.CHECK_IN_STATE,");
         sb.append(" t.CHECK_IN_INFO,");
         sb.append(" t.CHECK_OUT_STATE,");
         sb.append(" t.CHECK_OUT_INFO");
         */
        StringBuffer sb = new StringBuffer();
        sb.append("select '' TRANSACTION_ID,''CHECK_IN_STATE,''CHECK_IN_INFO,''CHECK_OUT_STATE,''CHECK_OUT_INFO,''ACTUAL_END_TIME,''ACTUAL_START_TIME,");
        sb.append(" r.START_TIME,");
        sb.append(" r.END_TIME");
        sb.append(" from ifsapp.c_time_rule_bluetooth_tab t,");
        sb.append(" ifsapp.c_time_rule_tab           r,");
        sb.append(" ifsapp.bluetooth_control_info    i");
        sb.append(" where t.rule_id = r.rule_id");
        sb.append(" and t.bluetooth_no = i.serial_no");
        sb.append(" and i.sn_code='");
        sb.append(BaiyinUtils.getSnWithoutColon(MapUtil.stringValue(map, "SN")));
        sb.append("'");
        sb.append(" and t.rule_id='");
        sb.append(MapUtil.stringValue(map, "RULE_ID"));
        sb.append("'");
        return sb.toString();
    }

    /**
     * 通过域获取上下班时间
     *
     * @param map
     * @return
     */
    public static String clockTimeByContract(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select  '' TRANSACTION_ID,''CHECK_IN_STATE,''CHECK_IN_INFO,''CHECK_OUT_STATE,''CHECK_OUT_INFO,''ACTUAL_END_TIME,''ACTUAL_START_TIME, r.start_time, r.end_time");
        sb.append(" from ifsapp.c_time_rule_contract_tab t, ");
        sb.append(" ifsapp.c_time_rule_tab r");
        sb.append(" where t.rule_id = r.rule_id");
        sb.append(" and t.contract='");
        sb.append(MapUtil.stringValue(map, "CONTRACT"));
        sb.append("'");
        return sb.toString();
    }

    /**
     * 上班打卡SQL
     * @param map
     * @return
     */
    public static String punchInClock(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("insert into ifsapp.c_time_transaction_tab");
        sb.append("(transaction_id, person_id, plan_start_time, plan_end_time, actual_start_time,in_bluetooth_no, check_in_addr,check_in_info, check_in_state, dept,rowversion)");
        sb.append("values");
        sb.append("('");
        sb.append(MapUtil.stringValue(map,"TRANSACTION_ID"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"PERSON_ID"));
        sb.append("',to_date('");
        sb.append(MapUtil.stringValue(map,"PLAN_START_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),to_date('");
        sb.append(MapUtil.stringValue(map,"PLAN_END_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),to_date('");
        sb.append(MapUtil.stringValue(map,"ACTUAL_START_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),'");
        sb.append(MapUtil.stringValue(map,"IN_BLUETOOTH_NO"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"CHECK_IN_ADDR"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"CHECK_IN_INFO"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"CHECK_IN_STATE"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"DEPT"));
        sb.append("',to_date('");
        sb.append(DateUtil.formDate(new Date(),"yyyy-MM-dd"));
        sb.append("','yyyy-mm-dd'))");
        return sb.toString();
    }

    /**
     * 下班打卡SQL
     * @param map
     * @return
     */
    public static String punchOutClock(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("update ifsapp.c_time_transaction_tab ");
        sb.append(" set plan_end_time = to_date('");
        sb.append(MapUtil.stringValue(map,"END_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),");
        sb.append("  actual_end_time = to_date('");
        sb.append(MapUtil.stringValue(map,"ACTUAL_END_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),");
        sb.append(" out_bluetooth_no = '");
        sb.append(MapUtil.stringValue(map,"OUT_BLUETOOTH_NO"));
        sb.append("',");
        sb.append(" check_out_addr = '");
        sb.append(MapUtil.stringValue(map,"CHECK_OUT_ADDR"));
        sb.append("',");
        sb.append(" check_out_info = '");
        sb.append(MapUtil.stringValue(map,"CHECK_OUT_INFO"));
        sb.append("',");
        sb.append(" check_out_state = '");
        sb.append(MapUtil.stringValue(map,"CHECK_OUT_STATE"));
        sb.append("',");
        sb.append(" rowversion = to_date('");
        sb.append(DateUtil.formDate(new Date(),"yyyy-MM-dd"));
        sb.append("','yyyy-mm-dd')");
        sb.append(" where transaction_id = '");
        sb.append(MapUtil.stringValue(map,"TRANSACTION_ID"));
        sb.append("'");
        return sb.toString();
    }

    /**
     * 通过人员和规则查找打卡信息
     * @param personId
     * @param ruleId
     * @return
     */
    public static String getClockDetail(String personId,String ruleId) {
  //      String transaction = transactionId.replaceAll("_"+ruleId, "");
    	StringBuffer sb = new StringBuffer();
        sb.append("select t.TRANSACTION_ID,");
        sb.append(" to_char(t.plan_start_time,'yyyy-MM-dd hh24:mi:ss') start_time,");
        sb.append(" to_char(t.plan_start_time,'hh24:mi') START_TIME_HOUR,");
        sb.append(" to_char(t.plan_end_time,'yyyy-MM-dd hh24:mi:ss') end_time,");
        sb.append(" to_char(t.plan_end_time,'hh24:mi') END_TIME_HOUR,");
        sb.append(" to_char(t.actual_start_time,'yyyy-MM-dd hh24:mi:ss') ACTUAL_START_TIME,");
        sb.append(" to_char(t.actual_end_time,'yyyy-MM-dd hh24:mi:ss') ACTUAL_END_TIME,");
        sb.append(" t.CHECK_IN_STATE,");
        sb.append(" t.CHECK_IN_INFO,");
        sb.append(" t.CHECK_OUT_STATE,");
        sb.append(" t.CHECK_OUT_INFO");
        sb.append(" from (");
        sb.append("     select ROW_NUMBER() over(partition by person_id order by actual_start_time desc) row_num,       t1.*");
        sb.append("   from ifsapp.C_TIME_TRANSACTION_tab t1 ");
        sb.append("  where 1=1 and  nvl(substr(TRANSACTION_ID, instr(TRANSACTION_ID || '_', '_') + 1), 0) in ");
        sb.append("  (select rule_id ");
        sb.append("   from ifsapp.C_TIME_RULE_tab   ");
        sb.append("            where time_rule_type in (select time_rule_type  ");
        sb.append("                          from ifsapp.C_TIME_RULE_tab  ");
        sb.append("    where rule_id = '"+ruleId+"')  or rule_id = '"+ruleId+"')  ");
        sb.append("     and person_id = '"+personId+"' ");
        sb.append("    and sysdate - t1.plan_start_time < 20 / 24  ) t   where row_num = 1   ");
        
        return sb.toString();
    }
    
    /**
     * 通过考勤ID查找打卡信息
     * @param transactionId
     * @param ruleId
     * @return
     */
    public static String getClockDetail(String transactionId) {
  //      String transaction = transactionId.replaceAll("_"+ruleId, "");
    	StringBuffer sb = new StringBuffer();
        sb.append("select t.TRANSACTION_ID,");
        sb.append(" to_char(t.plan_start_time,'yyyy-MM-dd hh24:mi:ss') start_time,");
        sb.append(" to_char(t.plan_start_time,'hh24:mi') START_TIME_HOUR,");
        sb.append(" to_char(t.plan_end_time,'yyyy-MM-dd hh24:mi:ss') end_time,");
        sb.append(" to_char(t.plan_end_time,'hh24:mi') END_TIME_HOUR,");
        sb.append(" to_char(t.actual_start_time,'yyyy-MM-dd hh24:mi:ss') ACTUAL_START_TIME,");
        sb.append(" to_char(t.actual_end_time,'yyyy-MM-dd hh24:mi:ss') ACTUAL_END_TIME,");
        sb.append(" t.CHECK_IN_STATE,");
        sb.append(" t.CHECK_IN_INFO,");
        sb.append(" t.CHECK_OUT_STATE,");
        sb.append(" t.CHECK_OUT_INFO");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_tab t");
        sb.append(" where TRANSACTION_ID = '"+transactionId+"'");
        return sb.toString();
    }
    
    /**
     * 刚进页面查询打卡明细
     * @param personId
     * @return
     */
    public static String getClockDetailIn(String personId) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.TRANSACTION_ID,");
        sb.append(" to_char(t.plan_start_time,'yyyy-MM-dd hh24:mi:ss') start_time,");
        sb.append(" to_char(t.plan_end_time,'yyyy-MM-dd hh24:mi:ss') end_time,");
        sb.append(" to_char(t.plan_start_time,'hh24:mi') start_time_HOUR,");
        sb.append(" to_char(t.plan_end_time,'hh24:mi') end_time_HOUR,");
        sb.append(" to_char(t.actual_start_time,'yyyy-MM-dd hh24:mi:ss') ACTUAL_START_TIME,");
        sb.append(" to_char(t.actual_end_time,'yyyy-MM-dd hh24:mi:ss') ACTUAL_END_TIME,");
        sb.append(" t.CHECK_IN_STATE,");
        sb.append(" t.CHECK_IN_INFO,");
        sb.append(" t.CHECK_OUT_STATE,");
        sb.append(" t.CHECK_OUT_INFO");
        sb.append(" from(");
        sb.append(" select ROW_NUMBER() over(partition by person_id order by actual_start_time desc) row_num,");
        sb.append(" t.*");
        sb.append(" from ifsapp.C_TIME_TRANSACTION_tab t");
        sb.append(" where person_id = '"+personId+"'");
        sb.append(" and (substr(transaction_id, 0, 8) = to_char(sysdate,'YYYYMMDD') or sysdate - actual_start_time <= 0.5)");
        /*if(ruleId != ""){
            sb.append(" and rule_id='");
            sb.append(ruleId);
            sb.append("'");
        }*/
        sb.append(" order by actual_start_time desc");
        sb.append(" ) t where row_num = 1");

        return sb.toString();
    }

    /**
     * 获取部门列表
     * @param userId
     * @return
     */
    public static String deptList(String userId) {
        StringBuffer sb = new StringBuffer();
        sb.append("select PERSON_ID, PERSON_NAME, ORG_CODE, ORG_NAME");
        sb.append(" from ifsapp.ATTEND_CAN_VIEW_FOR_APP");
        sb.append(" WHERE person_id = '"+userId+"'");
        return sb.toString();
    }

    /**
     * 获取人员列表
     * @param map
     * @return
     */
    public static String personList(Map map) {
        String dept = MapUtil.stringValue(map,"DEPT");
        StringBuffer sb = new StringBuffer();
        sb.append(" select ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE)  ORG_CODE,");
        sb.append(" ifsapp.Company_Org_API.Get_Org_Name(company,ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE)) org_name,");
        sb.append(" person_id   person_id,");
        sb.append(" ifsapp.Person_Info_Api.Get_Name(person_id) person_name");
        sb.append(" from ifsapp.COMPANY_EMP");
        sb.append(" where company = '10'");
        if(dept.equals("10")){
            sb.append(" and ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE) is not null");
        }else {
            sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE) = '"+dept+"'");
        }
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name(company, person_id) not in ('08', '09')");
        sb.append(" order by person_Id ");
       /* sb.append("SELECT ORG_CODE,");
        sb.append(" ifsapp.Company_Org_API.Get_Org_Name(COMPANY_ID, ORG_CODE) ORG_NAME,");
        sb.append(" PERSON_ID,");
        sb.append(" ifsapp.Person_Info_Api.Get_Name(person_id) PERSON_NAME");
        sb.append(" FROM ifsapp.COMPANY_PERSON_NEW");
        sb.append(" WHERE EMPLOYEE_STATUS = '在职' AND org_code = '"+dept+"'");
        if(MapUtil.valueIsNotNull(map,"PERSON_ID")){
            sb.append(" and person_id not in ");
            sb.append(MapUtil.stringValue(map,"PERSON_ID"));
        }
        sb.append(" order by person_id ");*/
        return sb.toString();
    }
    //获取未打卡人员列表
    public static String personerList(Map map) {
        String dept = MapUtil.stringValue(map,"DEPT");
        String alreadyClock = MapUtil.stringValue(map,"PERSON_ID");
        StringBuffer sb = new StringBuffer();
        sb.append("select ORG_CODE,org_name,person_id,person_name from(");
        sb.append(" select ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE)  ORG_CODE,");
        sb.append(" ifsapp.Company_Org_API.Get_Org_Name(company,ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE)) org_name,");
        sb.append(" person_id   person_id,");
        sb.append(" ifsapp.Person_Info_Api.Get_Name(person_id) person_name");
        sb.append(" from ifsapp.COMPANY_EMP");
        sb.append(" where company = '10'");
        sb.append(" and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name(company, person_id) not in ('08', '09')");
        if(dept.equals("10")){
            sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE) is not null)");
        }else{
            sb.append(" and  ifsapp.Company_Pers_Assign_API.Get_Org_Code(company, person_id, SYSDATE) = '"+dept+"')");
        }
        sb.append(" where ");
        sb.append(" person_id not in "+alreadyClock);
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        sb.append(" order by person_Id ");
        return sb.toString();
    }

    //缺勤事由获取未打卡人员列表
    public static String personerListReason(Map map) {
        String dept = MapUtil.stringValue(map,"DEPT");
        String wdkPersonIds = MapUtil.stringValue(map,"WDK_PERSON_ID");
        String loginPersonId = MapUtil.stringValue(map,"LOGIN_PERSON_ID");
        StringBuffer sb = new StringBuffer();
        sb.append(" select person_id,confirm_date,note,");
        sb.append(" TRANSACTION_ID||'' TRANSACTION_ID,");
        sb.append(" ifsapp.Person_Info_Api.Get_Name(person_id) person_name");
        sb.append(" from ifsapp.c_time_transaction_tab");
        sb.append(" where 1=1");
//        sb.append(" and person_id not in "+wdkPersonIds);
        sb.append(" and confirm_person='"+loginPersonId+"'");
        sb.append(" and ACTUAL_START_TIME is null");
        sb.append(" and ACTUAL_END_TIME is null");
        sb.append(" and dept = '"+dept+"'");
        //按日期查询
        if (MapUtil.valueIsNotNull(map, "QUERY_DATE")) {
            sb.append(" and to_char(PLAN_START_TIME,'yyyy-mm-dd')='");
            sb.append(MapUtil.stringValue(map, "QUERY_DATE"));
            sb.append("'");
        }
        sb.append(" and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) = 'FALSE'");
        return sb.toString();
    }
    public static void main(String [] args){
        //System.out.println(getClockDetail("20180316BY002"));
    }

    /**
     * 上班时间更新
     * @param map
     * @return
     */
    public static String punchInClockUpdate(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("update ifsapp.c_time_transaction_tab ");
        sb.append(" set actual_start_time = to_date('");
        sb.append(MapUtil.stringValue(map,"ACTUAL_START_TIME"));
        sb.append("','yyyy-mm-dd hh24:mi:ss'),");
        sb.append(" in_bluetooth_no = '");
        sb.append(MapUtil.stringValue(map,"IN_BLUETOOTH_NO"));
        sb.append("',");
        sb.append(" check_in_addr = '");
        sb.append(MapUtil.stringValue(map,"CHECK_IN_ADDR"));
        sb.append("',");
        sb.append(" check_in_info = '");
        sb.append(MapUtil.stringValue(map,"CHECK_IN_INFO"));
        sb.append("',");
        sb.append(" check_in_state = '");
        sb.append(MapUtil.stringValue(map,"CHECK_IN_STATE"));
        sb.append("',");
        sb.append(" rowversion = to_date('");
        sb.append(DateUtil.formDate(new Date(),"yyyy-MM-dd"));
        sb.append("','yyyy-mm-dd')");
        sb.append(" where transaction_id = '");
        sb.append(MapUtil.stringValue(map,"TRANSACTION_ID"));
        sb.append("'");
        return sb.toString();
    }
    /**
     * 获取上班时间
     * @param map
     * @return
     */
    public static String getSbTime(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select rule_id,rule_desc,start_time,end_time from ifsapp.C_TIME_RULE_tab ");
        sb.append(" where rule_id = '");
        sb.append(MapUtil.stringValue(map,"RULE_ID"));
        sb.append("'");
        return sb.toString();
    }

    /**
     * 录入蓝牙信息SQL
     */
	public static <K, V> String entryBluetooth(Map<K, V> map, String fieldLimited){
		String sql = "";
		for(K key : map.keySet()){
			if(fieldLimited.indexOf("." + key.toString() + ".") != -1){
				sql += key.toString().toUpperCase()
						+ ((char) 31)
						+ map.get(key).toString()
						+ ((char) 30);
			}
		}
		return sql;
	}
}
