package com.service.equipment.sql;

import com.utility.MapUtil;

import java.util.Map;

/**设备信息查询
 * Created by Administrator on 2018/5/15.
 */
public class EquipServiceSQL {

    public static String equipmentInfo(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select t.mch_code," +
                "       t.mch_name," +
                "       t.contract," +
                "       t.contract_name," +
                "       t.operational_status," +
                "       t.type," +
                "       t.serial_no," +
                "       t.manufacturer_no," +
                "       t.manufacturer_name," +
                "       t.equipment_general," +
                "       t.equipment_check_info," +
                "       t.equipment_infor," +
                "       t.process_mode," +
                "       t.risk_factors_preven" +
                "  from ifsapp.EQUIPMENT_FUNCTIONAL_APP t" +
                " where t.mch_code = '");
        sb.append(MapUtil.stringValue(map,"MCH_CODE"));
        sb.append("'");

        return sb.toString();
    }

    /**
     * 获取设备缺陷履历
     * @param map
     * @return
     */
    public static String equipmentDefect(Map map){

        StringBuffer sb = new StringBuffer();
        sb.append(" select t.mch_code," +
                "       t.mch_name," +
                "       t.fact_mch_code," +
                "       t.fact_mch_name," +
                "       t.fault_rep_id," +
                "       t.err_descr," +
                "       t.err_descr_lo," +
                "       t.reg_date," +
                "       t.fault_state" +
                " from ifsapp.EQUIPMENT_FUNCTIONAL_FAULT t" +
                " where mch_code = '");
        sb.append(MapUtil.stringValue(map,"MCH_CODE"));
        sb.append("'");
        return sb.toString();
    }

    /**
     * 检修工单履历
     * @param map
     * @return
     */
    public static String repairInspection(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append(" select t.mch_code," +
                "       t.mch_name," +
                "       t.fact_mch_code," +
                "       t.fact_mch_name," +
                "       t.wo_no," +
                "       t.err_descr," +
                "       t.work_order_type," +
                "       t.plan_f_date," +
                "       t.work_leader_sign," +
                "       t.work_leader_name," +
                "       t.work_master_sign," +
                "       t.work_master_name," +
                "       t.performed_action_lo," +
                "       t.work_type," +
                "       t.wo_state" +
                " from ifsapp.EQUIPMENT_FUNCTIONAL_WO_APP t" +
                " where t.mch_code = '");
        sb.append(MapUtil.stringValue(map,"MCH_CODE"));
        sb.append("'");

        return sb.toString();
    }

    /**
     * 巡查记录-按设备查询统计
     * @param map
     * @return
     */
    public static String inspectionRecordAsE(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("select t.MCH_CODE," +
                "  t.mch_name," +
                "  nvl(t.inspect_person,t.plan_person) person_id," +
                "  ifsapp.person_info_api.Get_Name(nvl(t.inspect_person,t.plan_person)) person_name," +
                "  sum(case when plan_id is not null and record_time is not null then 1 else 0 end ) plan_inspected," +
                "  count(plan_id)  plan_inspect," +
                "  sum(case when plan_id is  null and record_time is not null then 1 else 0 end )        out_plan_inspected" +
                " from ifsapp.C_INSPECT_ANALYSIS_DETAIL t" +
                "   where   t.MCH_CODE = '" );
        sb.append(MapUtil.stringValue(map,"MCH_CODE"));
        sb.append("'");
        sb.append(" group by t.MCH_CODE,");
        sb.append(" t.mch_name,nvl(t.inspect_person,t.plan_person)");

        return sb.toString();
    }

    /**
     * 巡查记录-按设备和人员查询统计
     * @param map
     * @return
     */
    public static String inspectionRecordAsEP(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append("select t.MCH_CODE," +
                " t.mch_name," +
                " t.plan_id," +
                " nvl(t.inspect_person,t.plan_person) person_id," +
                " ifsapp.person_info_api.Get_Name(nvl(t.inspect_person,t.plan_person)) person_name," +
                " t.DESCRIPTION," +
                " t.begin_time," +
                " sum(case when plan_id is not null and record_time is not null then 1 else 0 end ) plan_inspected," +
                " count(plan_id)  plan_inspect," +
                " sum(case when plan_id is  null and record_time is not null then 1 else 0 end )        out_plan_inspected" +
                " from ifsapp.C_INSPECT_ANALYSIS_DETAIL t" +
                " where  t.MCH_CODE = '");
        sb.append(MapUtil.stringValue(map,"MCH_CODE"));
        sb.append("'");
        sb.append(" and  nvl(t.inspect_person,t.plan_person) = '");
        sb.append(MapUtil.stringValue(map,"PERSON_ID"));
        sb.append("'");
        sb.append("  group by t.MCH_CODE,t.mch_name,nvl(t.inspect_person,t.plan_person),t.DESCRIPTION,t.begin_time,t.plan_id");
        sb.append(" order by t.begin_time DESC");

        return sb.toString();
    }

    /**
     * 巡查记录-按设备人员和计划查询统计
     * @param map
     * @return
     */
    public static String inspectionRecordAsEPP(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append(" select t.MCH_CODE," +
                "       t.mch_name," +
                "       nvl(t.inspect_person,t.plan_person) person_id," +
                "       ifsapp.person_info_api.Get_Name(nvl(t.inspect_person,t.plan_person)) person_name," +
                "       t.DESCRIPTION," +
                "       t.begin_time," +
                "       t.end_time," +
                "       t.inspect_type," +
                "       t.location," +
                "       t.record_time" +
                " from ifsapp.C_INSPECT_ANALYSIS_DETAIL t" +
                " where  t.MCH_CODE = '");
        sb.append(MapUtil.stringValue(map,"MCH_CODE"));
        sb.append("'");
        sb.append(" and  nvl(t.inspect_person,t.plan_person) = '");
        sb.append(MapUtil.stringValue(map,"PERSON_ID"));
        sb.append("'");
        sb.append(" and  t.plan_id = '");
        sb.append(MapUtil.stringValue(map,"PLAN_ID"));
        sb.append("'");
        sb.append(" group by t.MCH_CODE,t.mch_name,nvl(t.inspect_person,t.plan_person),t.DESCRIPTION,t.begin_time,t.end_time,t.inspect_type,t.location,t.record_time");
        sb.append(" order by t.record_time DESC");

        return sb.toString();
    }
}
