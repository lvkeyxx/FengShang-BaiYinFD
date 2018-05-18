package com.service.inspection.sql;

import com.constant.Constant;
import com.domain.UserProfile;
import com.utility.MapUtil;
import com.utility.baiyin.BaiyinUtils;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author:wangyg
 * @Description:现场巡查
 * @Date:Created in 2018-03-22 9:58
 * @Modied By:
 **/
public class InspectionServiceSQL {
    /**
     * 通过扫描二维码，获取设备和蓝牙对照关系
     *
     * @param map
     * @return
     */
    public static String cBluetoothEquip(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select c.PLAN_ID          PLAN_ID," +
                "       c.CONTRACT            CONTRACT," +
                "       c.DESCRIPTION 		  DESCRIPTION," +
                "       c.MCH_CODE            MCH_CODE," +
                "       c.MCH_NAME            MCH_NAME," +
                "       c.BLUETOOTH_SERIAL_NO BLUETOOTH_SERIAL_NO," +
                "       c.IS_MATCH_BLE        IS_MATCH," +
                "       c.DEVICE_LOCATION     ADDRESS," +
                "       c.SN_CODE             SN_CODE," +
                "       c.MCH_NAME            BLUETOOTH_DESC" +
                "  from ifsapp.C_INSPECT_SCHEDUL_TASK c" +
                "  where to_char(sysdate, 'yyyy-mm-dd') between" +
                "       to_char(c.begin_time, 'yyyy-mm-dd') and" +
                "       to_char(c.end_time, 'yyyy-mm-dd')");
        sb.append(" and c.contract = '");
        sb.append(MapUtil.stringValue(map, "CONTRACT"));
        sb.append("'");
        sb.append(" and c.mch_code = '");
        sb.append(MapUtil.stringValue(map, "MCH_CODE"));
        sb.append("'");
        sb.append(" and c.is_active_db='TRUE' ");
        sb.append(" and c.IS_MATCH_MCH='TRUE' ");
        sb.append(" and c.person_id='" + MapUtil.stringValue(map, Constant.USER_ID) + "' ");
        sb.append(" and c.PLAN_ID not in (select PLAN_ID from ifsapp.c_inspect_record ");
        sb.append(" 	where person_id ='" + MapUtil.stringValue(map, Constant.USER_ID) + "' and plan_id is not null)");
        sb.append(" order by c.PLAN_ID, c.TIME_SERIAL_NO ASC");
        return sb.toString();
    }
    
    /**
     * 通过扫描二维码，获取计划外的设备和蓝牙对照关系
     *
     * @param map
     * @return
     */
    public static String outBluetoothEquip(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.CONTRACT CONTRACT, t.MCH_CODE MCH_CODE, t.MCH_NAME MCH_NAME, "
        		+ " t.BLUETOOTH_SERIAL_NO BLUETOOTH_SERIAL_NO, t.IS_MATCH IS_MATCH, "
        		+ " t.IS_MATCH IS_MATCH, t.ADDRESS ADDRESS, t.SN_CODE SN_CODE, "
        		+ " t.BLUETOOTH_DESC BLUETOOTH_DESC FROM IFSAPP.C_BLUETOOTH_EQUIP t ");
        sb.append(" where t.contract = '");
        sb.append(MapUtil.stringValue(map, "CONTRACT"));
        sb.append("'");
        sb.append(" and t.mch_code = '");
        sb.append(MapUtil.stringValue(map, "MCH_CODE"));
        sb.append("'");
//        sb.append(" and t.IS_MATCH='FALSE' ");
//        sb.append(" and cr.person_id='" + MapUtil.stringValue(map, Constant.USER_ID) + "' ");
//        sb.append(" and cr.PLAN_ID not in (cr.PLAN_ID)");
        return sb.toString();
    }
    
    public static String downLoadXcDataSql(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT TEMP_ID,");
        sb.append(" DESCRIPTION,");
        sb.append(" ADDRESS,");
        sb.append(" MCH_NAME,");
        sb.append(" SN_CODE,");
        sb.append(" MCH_CODE,");
        sb.append(" IS_MATCH_MCH IS_MATCH_MCH,");
        sb.append(" IS_MATCH_BLE IS_MATCH,");
        sb.append(" INSPECT_TYPE,");
        sb.append(" BLUETOOTH_SERIAL_NO,");
        sb.append(" BEGIN_TIME,");
        sb.append(" END_TIME,");
        sb.append(" TIME_SERIAL_NO,");
        sb.append(" CONTRACT,");
        sb.append(" PLAN_PERSON,");
        sb.append(" INSPECT_PERSON,");
        sb.append(" to_char(RECORD_TIME, 'yyyy-mm-dd hh24:mi') RECORD_TIME,plan_id");
        sb.append(" FROM ifsapp.C_INSPECT_ROUTE_DETAIL t");
        sb.append(" where to_char(sysdate,'yyyy-mm-dd') between to_char(begin_time,'yyyy-mm-dd') and to_char(end_time,'yyyy-mm-dd') ");
        sb.append(" and t.temp_id = '");
        sb.append(map.get("TEMP_ID") + "'");
        sb.append(" and t.PLAN_PERSON = '");
        sb.append(MapUtil.stringValue(map, Constant.USER_ID) + "'");
        return sb.toString();
    }
    public static String upLoadXcDataSql(Map map){
        StringBuffer sql = new StringBuffer();
        sql.append("insert into ifsapp.c_inspect_record_tab");
        sql.append(" (record_id,person_id,");
        sql.append("  bluetooth_serial_no,");
        sql.append("  location_description, ");
        sql.append(" is_match,");
        sql.append("  equip_no, ");
        sql.append(" record_time, ");
        sql.append(" plan_id, ");
        sql.append(" rowversion, ");
        sql.append(" contract)");
        sql.append(" values");
        sql.append(" (RECORD_SEQ.nextval,");
        sql.append("'" + map.get(Constant.USER_ID)+ "', ");
        sql.append("'" + (map.get("BLUETOOTH_SERIAL_NO")) + "', ");
        sql.append("'" + (map.get("LOCATION_DESCRIPTION")) + "', ");
        sql.append("'" + (map.get("IS_MATCH")) + "', ");
        sql.append("'" + (map.get("EQUIP_NO")) + "', ");
        sql.append("to_date("+"'" + (map.get("RECORD_TIME")) + "'"+",'yyyy-MM-dd HH24:mi:ss'),");
        sql.append("'" + map.get("PLAN_ID") + "', ");
        sql.append("sysdate, ");
        sql.append("'" + (map.get("CONTRACT")) + "')");
        return sql.toString();
    }
    /**
     * 通过搜索蓝牙，获取设备和蓝牙对照关系
     *
     * @param map
     * @return
     */
    public static String sBluetoothEquip(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select "
        		+ "c.PLAN_ID PLAN_ID, c.CONTRACT CONTRACT, c.DESCRIPTION DESCRIPTION,"
        		+ "c.BLUETOOTH_SERIAL_NO BLUETOOTH_SERIAL_NO,c.SN_CODE SN_CODE, "
        		+ "c.MCH_CODE MCH_CODE, c.MCH_NAME MCH_NAME, c.DEVICE_LOCATION ADDRESS, "
        		+ "c.IS_MATCH_BLE IS_MATCH" 
        		+ " from ifsapp.C_INSPECT_SCHEDUL_TASK c  ");
        sb.append(" where c.sn_code = '");
        sb.append(BaiyinUtils.getSnWithoutColon(MapUtil.stringValue(map, "SN_CODE")));
        sb.append("'");
        sb.append(" and to_char(sysdate,'yyyy-mm-dd') between to_char(c.begin_time,'yyyy-mm-dd') and to_char(c.end_time,'yyyy-mm-dd')");
        sb.append(" and c.is_active_db='TRUE' ");
        sb.append(" and c.IS_MATCH_MCH = 'FALSE' ");
        sb.append(" and c.IS_MATCH_BLE = 'TRUE' ");
        sb.append(" and c.person_id='" + MapUtil.stringValue(map, Constant.USER_ID) + "' ");
        sb.append(" and c.PLAN_ID not in (select PLAN_ID from ifsapp.c_inspect_record");
        sb.append(" where person_id ='" + MapUtil.stringValue(map, Constant.USER_ID) + "' and plan_id is not null)");
        return sb.toString();
    }

    /**
     * 获取巡查路线
     *
     * @param userid
     * @return
     */
    public static String cInspectRoute(String userid) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT TEMP_ID,");
        sb.append(" DESCRIPTION,");
        sb.append(" INSPECT_TYPE,");
        sb.append(" START_TIME,");
        sb.append(" END_TIME,");
        sb.append(" CONTRACT,");
        sb.append(" sum(INSPECTED) inspected,");
        sb.append(" sum(INSPECT) inspect,");
        sb.append(" PLAN_PERSON");
        sb.append(" FROM ifsapp.C_INSPECT_ROUTE t");
        sb.append(" where to_char(sysdate,'yyyy-mm-dd') between to_char(t.start_time,'yyyy-mm-dd') and to_char(t.end_time,'yyyy-mm-dd')");
        sb.append(" and (t.plan_person = '" + userid + "'");
        sb.append(" or t.inspect_person = '" + userid + "')");
        sb.append(" group by t.temp_id,t.description,t.inspect_type,t.start_time,t.end_time,t.contract,plan_person");
        return sb.toString();
    }
    
    /**
     * 获取离线巡查路线（计划内）
     *
     * @param userid
     * @return
     */
    public static String outcInspectRoute(String userid) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT TEMP_ID,");
        sb.append(" DESCRIPTION,");
        sb.append(" INSPECT_TYPE,");
        sb.append(" START_TIME,");
        sb.append(" END_TIME,");
        sb.append(" CONTRACT,");
        sb.append(" sum(INSPECTED) inspected,");
        sb.append(" sum(INSPECT) inspect,");
        sb.append(" PLAN_PERSON");
        sb.append(" FROM ifsapp.C_INSPECT_ROUTE t");
        sb.append(" where to_char(sysdate,'yyyy-mm-dd') between to_char(t.start_time,'yyyy-mm-dd') and to_char(t.end_time,'yyyy-mm-dd')");
        sb.append(" and t.plan_person is not null");
        sb.append(" and (t.plan_person = '" + userid + "'");
        sb.append(" or t.inspect_person = '" + userid + "')");
        sb.append(" group by t.temp_id,t.description,t.inspect_type,t.start_time,t.end_time,t.contract,plan_person");
        return sb.toString();
    }

    /**
     * 获取路线历史记录
     *
     * @param map
     * @return
     */
    public static String cInspectRouteHistory(Map map) {
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT TEMP_ID,");
		sb.append(" nvl(t.TEMP_Description, t.inspect_type) DESCRIPTION,");
		sb.append(" t.INSPECT_TYPE,");
		sb.append(" count(t.inspect_person) as inspected,");
		sb.append(" count(1) as inspect");
		sb.append(" FROM ifsapp.c_inspect_analysis_detail t");
		sb.append(" WHERE 1 = 1 ");
		//巡查统计，没有天数
		if(map.get("startDate") != null && !"".equals(map.get("startDate").toString())){
			sb.append(" AND (to_char(begin_time,'yyyy-mm') between '" + map.get("startDate") + "'");
			sb.append(" AND '" + map.get("endDate") + "'");
			sb.append(" OR to_char(end_time,'yyyy-mm') between '" + map.get("startDate") + "'");
			sb.append(" AND '" + map.get("endDate") + "'");
			sb.append(" OR '" + map.get("startDate") + "' between ");
			sb.append(" to_char(begin_time,'yyyy-mm')");
			sb.append(" AND to_char(end_time,'yyyy-mm')");
			sb.append(" OR '" + map.get("endDate") + "' between ");
			sb.append(" to_char(begin_time,'yyyy-mm')");
			sb.append(" AND to_char(end_time,'yyyy-mm'))");
		}
		//原始的，有天数
		if(map.get("START_TIME") != null && !"".equals(map.get("START_TIME").toString())){
			sb.append(" AND (to_char(begin_time,'yyyy-mm-dd') between '" + map.get("START_TIME") + "' AND '" + map.get("END_TIME") + "'");
			sb.append(" OR to_char(end_time,'yyyy-mm-dd') between '" + map.get("START_TIME") + "' AND '" + map.get("END_TIME") + "'");
			sb.append(" OR '" + map.get("START_TIME") + "' between ");
			sb.append(" to_char(begin_time,'yyyy-mm-dd')");
			sb.append(" AND to_char(end_time,'yyyy-mm-dd')");
			sb.append(" OR '" + map.get("END_TIME") + "' between ");
			sb.append(" to_char(begin_time,'yyyy-mm-dd')");
			sb.append(" AND to_char(end_time,'yyyy-mm-dd'))");
		}
		//根据设备编码查询
		if(map.get("mchCode") != null && !"".equals(map.get("mchCode").toString())){
			sb.append(" AND MCH_CODE = '" + map.get("mchCode") + "'");
		}
		if(map.get("personId") != null && !"".equals(map.get("personId").toString())){
			//巡查统计跳转，查询选中人员的记录
			sb.append(" AND nvl(t.inspect_person,t.plan_person) = '" + (map.get("personId")) + "'");
		}else {
			//原始的，查询自己的记录
			sb.append(" and (t.plan_person = '" + (map.get(Constant.USER_ID)) + "' or t.INSPECT_PERSON = '" + (map.get(Constant.USER_ID)) + "')");
		}
		sb.append(" group by temp_id, t.TEMP_Description, t.inspect_type ");
		return sb.toString();
    }

    public static void main(String[] args) {
        Map map = new HashMap();
        map.put("UserID", "BY007");
        map.put("START_TIME", "2018-01-01");
        map.put("END_TIME", "2018-03-21");
        map.put("BLUETOOTH_SERIAL_NO","3");
        System.out.println(getPlanId(map));
    }

    /**
     * 通过TEMP_ID获取路线明细
     *
     * @param map
     * @return
     */
    public static String cInspectRouteDetailH(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT TEMP_ID,");
        sb.append(" DESCRIPTION,");
        sb.append(" MCH_NAME,");
        sb.append(" LOCATION ADDRESS,");
        sb.append(" INSPECT_TYPE,");
        sb.append(" BEGIN_TIME,");
        sb.append(" END_TIME,");
        sb.append(" TIME_SERIAL_NO,");
        sb.append(" CONTRACT,");
        sb.append(" PLAN_PERSON,");
        sb.append(" INSPECT_PERSON,");
        sb.append(" RECORD_TIME,plan_id");
        sb.append(" FROM ifsapp.C_INSPECT_ANALYSIS_DETAIL t");
        sb.append(" where t.temp_id = '");
        sb.append(map.get("TEMP_ID") + "'");
        String starttime = map.get("START_TIME").toString();
        if(starttime.length() == 7) {
        	sb.append(" and ((to_char(begin_time,'yyyy-mm') between '"+map.get("START_TIME")+"' and '"+map.get("END_TIME")+"'");
        	sb.append(" or to_char(end_time,'yyyy-mm') between '"+map.get("START_TIME")+"' and '"+map.get("END_TIME")+"'");
        	sb.append(" or '"+map.get("START_TIME")+"' between to_char(begin_time,'yyyy-mm') and to_char(end_time,'yyyy-mm')");
        	sb.append(" or '"+map.get("END_TIME")+"' between to_char(begin_time,'yyyy-mm') and to_char(end_time,'yyyy-mm')))");
        } else if(starttime.length() == 10) {
        	sb.append(" and ((to_char(begin_time,'yyyy-mm-dd') between '"+map.get("START_TIME")+"' and '"+map.get("END_TIME")+"'");
        	sb.append(" or to_char(end_time,'yyyy-mm-dd') between '"+map.get("START_TIME")+"' and '"+map.get("END_TIME")+"'");
        	sb.append(" or '"+map.get("START_TIME")+"' between to_char(begin_time,'yyyy-mm-dd') and to_char(end_time,'yyyy-mm-dd')");
        	sb.append(" or '"+map.get("END_TIME")+"' between to_char(begin_time,'yyyy-mm-dd') and to_char(end_time,'yyyy-mm-dd')))");
        }
        String plan_person = map.get("PLAN_PERSON").toString() == "null" ? MapUtil.stringValue(map, Constant.USER_ID).toString() : map.get("PLAN_PERSON").toString();
    	sb.append(" and (t.PLAN_PERSON = '" + plan_person + "'");
    	sb.append(" or t.INSPECT_PERSON = '" + plan_person + "')");
        //部分巡查统计页面进入，限定设备
  		if(map.get("MCH_CODE") != null && !"".equals(map.get("MCH_CODE").toString()) && !"null".equals(map.get("MCH_CODE").toString())){
  			sb.append(" AND MCH_CODE = '" + map.get("MCH_CODE") + "'");
  		}
        return sb.toString();
    }

    /**
     * 首页明细查询
     * @param map
     * @return
     */
    public static String cInspectRouteDetailPage(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT TEMP_ID,");
        sb.append(" DESCRIPTION,");
        sb.append(" ADDRESS,");
        sb.append(" MCH_NAME,");
        sb.append(" INSPECT_TYPE,");
        sb.append(" BEGIN_TIME,");
        sb.append(" END_TIME,");
        sb.append(" TIME_SERIAL_NO,");
        sb.append(" CONTRACT,");
        sb.append(" PLAN_PERSON,");
        sb.append(" INSPECT_PERSON,");
        sb.append(" to_char(RECORD_TIME, 'yyyy-mm-dd hh24:mi') RECORD_TIME,plan_id");
        sb.append(" FROM ifsapp.C_INSPECT_ROUTE_DETAIL t");
        sb.append(" where t.temp_id = '");
        sb.append(map.get("TEMP_ID") + "'");
        sb.append(" and ((to_char(sysdate,'yyyy-mm-dd') between to_char(begin_time,'yyyy-mm-dd') and to_char(end_time,'yyyy-mm-dd') ");
        sb.append(" and (t.PLAN_PERSON = '");
        sb.append(MapUtil.stringValue(map, Constant.USER_ID) + "'");
        sb.append(" or t.INSPECT_PERSON = '");
        sb.append(MapUtil.stringValue(map, Constant.USER_ID) + "')))");
        return sb.toString();
    }
    /**
     * 获取PLAN_ID
     *
     * @param map
     * @return
     */
    public static String getPlanId(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select PLAN_ID,");
        sb.append(" SERIAL_NO,");
        sb.append(" TEMP_ID,");
        sb.append(" DESCRIPTION,");
        sb.append(" INSPECT_TYPE,");
        sb.append(" BEGIN_TIME,");
        sb.append(" END_TIME,");
        sb.append(" PERSON_ID,");
        sb.append(" BLUETOOTH_SERIAL_NO,");
        sb.append(" IS_ACTIVE,");
        sb.append(" REMARK,");
        sb.append(" TIME_SERIAL_NO");
        sb.append(" from ifsapp.c_Inspect_Schedul_Task_Tab t");
        sb.append(" where to_char(sysdate,'yyyy-mm-dd') between to_char(begin_time,'yyyy-mm-dd') and to_char(end_time,'yyyy-mm-dd')");
        sb.append(" and is_active = 'TRUE'");
        sb.append(" and t.BLUETOOTH_SERIAL_NO = '" + (map.get("BLUETOOTH_SERIAL_NO")) + "'");
        sb.append(" and t.PERSON_ID = '" + (map.get(Constant.USER_ID)) + "'");
        if(MapUtil.valueIsNotNull(map,"TEMP_ID")){
            sb.append(" and t.temp_id='");
            sb.append(map.get("TEMP_ID"));
            sb.append("'");
        }
        sb.append(" and not exists(select 1 from ifsapp.c_inspect_record_tab r where t.plan_id=r.plan_id)");
        sb.append(" order by TIME_SERIAL_NO ");
        return sb.toString();
    }

    /**
     * @param map
     * @param plan_id
     * @return
     */
    public static String inspectRecord(Map map, String plan_id) {
        StringBuffer sql = new StringBuffer();
        sql.append("insert into ifsapp.c_inspect_record_tab");
        sql.append(" (record_id,person_id,");
        sql.append("  bluetooth_serial_no,");
        sql.append("  location_description, ");
        sql.append(" is_match,");
        sql.append("  equip_no, ");
        sql.append(" record_time, ");
        sql.append(" plan_id, ");
        sql.append(" rowversion, ");
        sql.append(" contract)");
        sql.append(" values");
        sql.append(" (RECORD_SEQ.nextval,");
        sql.append("'" + map.get(Constant.USER_ID) + "', ");
        sql.append("'" + (map.get("BLUETOOTH_SERIAL_NO")) + "', ");
        sql.append("'" + (map.get("LOCATION_DESCRIPTION")) + "', ");
        sql.append("'" + (map.get("IS_MATCH")) + "', ");
        sql.append("'" + (map.get("EQUIP_NO")) + "', ");
        sql.append("sysdate, ");
        sql.append("'" + plan_id + "', ");
        sql.append("sysdate, ");
        sql.append("'" + (map.get("CONTRACT")) + "')");
        return sql.toString();
    }

    /**
     * 按照人员信息获取
     * @param map
     * @return
     */
    public static String inspectStatisticsPerson(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select sum(out_plan) OUT_PLAN, sum(in_plan) IN_PLAN,sum(inspect) INSPECT, PERSON, PERSON_NAME");
        sb.append(" from (SELECT case when plan_person is null then inspected else 0 end out_plan,");
        sb.append(" case when plan_person is not null then inspected else 0 end in_plan,");
        sb.append(" inspect,");
        sb.append(" case when inspect_person is null then plan_person else inspect_person end person,");
        sb.append(" case when inspect_person is null then ifsapp.Person_Info_Api.Get_Name(plan_person) else ifsapp.Person_Info_Api.Get_Name(inspect_person) end person_name");
        sb.append(" FROM ifsapp.C_INSPECT_ROUTE t");
        sb.append(" where t.contract = '"+(map.get("CONTRACT"))+"'");
        sb.append(" and (to_char(start_time, 'yyyy-mm-dd') between '"+(map.get("START_TIME"))+"' and '"+(map.get("END_TIME"))+"' or");
        sb.append(" to_char(end_time, 'yyyy-mm-dd') between '"+(map.get("START_TIME"))+"' and '"+(map.get("END_TIME"))+"')) a");
        sb.append(" group by person, person_name");
        sb.append(" order by a.person");
        return sb.toString();
    }

    /**
     * 通过人员、开始时间、结束时间查询详情
     * @param map
     * @return
     */
    public static String inspectStatisticsRoute(Map map) {
        String person=map.get("PERSON_ID")+"";
        String startTime = map.get("START_TIME")+"";
        String endTime = map.get("END_TIME")+"";
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT t.TEMP_ID,");
        sb.append(" t.DESCRIPTION,");
        sb.append(" t.ADDRESS,");
        sb.append(" t.INSPECT_TYPE,");
        sb.append(" t.BEGIN_TIME,");
        sb.append(" t.END_TIME,");
        sb.append(" t.TIME_SERIAL_NO,");
        sb.append(" t.CONTRACT,");
        sb.append(" t.PLAN_PERSON,");
        sb.append(" t.INSPECT_PERSON,");
        sb.append(" to_char(t.RECORD_TIME, 'yyyy-mm-dd hh24:mi:ss') record_time,");
        sb.append(" t.plan_id,");
        sb.append(" r.INSPECTED,");
        sb.append(" r.INSPECT");
        sb.append(" FROM IFSAPP.C_INSPECT_ROUTE_DETAIL t, ifsapp.C_INSPECT_ROUTE r");
        sb.append(" where t.temp_id = r.temp_id");
        sb.append(" and (t.plan_person = '");
        sb.append(person);
        sb.append("' or t.inspect_person = '");
        sb.append(person);
        sb.append("')");
        sb.append(" and (to_char(t.begin_time, 'yyyy-mm-dd') between '");
        sb.append(startTime);
        sb.append("' and '");
        sb.append(endTime);
        sb.append("' or");
        sb.append(" to_char(t.end_time, 'yyyy-mm-dd') between '");
        sb.append(startTime);
        sb.append("' and '");
        sb.append(endTime);
        sb.append("')");
        sb.append(" order by t.begin_time desc");
        return sb.toString();
    }
    
    
    /**
     * 首页明细查询
     * @param map
     * @return
     */
    public static String selectUnRecordPlan(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT TEMP_ID,");
        sb.append(" DESCRIPTION,");
        sb.append(" ADDRESS,");
        sb.append(" MCH_NAME,");
        sb.append(" INSPECT_TYPE,");
        sb.append(" BEGIN_TIME,");
        sb.append(" END_TIME,");
        sb.append(" TIME_SERIAL_NO,");
        sb.append(" CONTRACT,");
        sb.append(" PLAN_PERSON,");
        sb.append(" INSPECT_PERSON,");
        sb.append(" to_char(RECORD_TIME, 'yyyy-mm-dd hh24:mi') RECORD_TIME,plan_id");
        sb.append(" FROM ifsapp.C_INSPECT_ROUTE_DETAIL t");
        sb.append(" where to_char(sysdate,'yyyy-mm-dd') between to_char(begin_time,'yyyy-mm-dd') and to_char(end_time,'yyyy-mm-dd') ");
        sb.append(" and t.PLAN_PERSON = '");
        sb.append(MapUtil.stringValue(map, Constant.USER_ID) + "'");
        sb.append(" and t.TEMP_ID=(select TEMP_ID from ifsapp.C_INSPECT_ROUTE_DETAIL where plan_id='" + MapUtil.stringValue(map, "PLAN_ID") + "')");
        return sb.toString();
    }
    
    /**
     * 通过人员、设备编码，模板、签到时间查询巡查记录详情
     * @param map
     * @return
     */
    public static String selectRecordPlan(Map map, String sbs) {
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT record_id,");
        sb.append(" person_id,");
        sb.append(" BLUETOOTH_SERIAL_NO,");
        sb.append(" location_description,");
        sb.append(" equip_no,");
        sb.append(" contract,");
        sb.append(" record_time,");
        sb.append(" plan_id,");
        sb.append(" rowid");
        sb.append(" FROM ifsapp.c_inspect_record ");
        sb.append(" where PERSON_ID = '");
        sb.append("" + map.get(Constant.USER_ID) + "'");
        sb.append(" and plan_id in (");
        sb.append(sbs);
        sb.append(")");
        sb.append(" and CONTRACT='" + MapUtil.stringValue(map, "CONTRACT") + "'");
        return sb.toString();
    }

    /**
     * 巡查统计页面数据
     */
	public static <K, V> String getInspectStatisticalSql(Map<K, V> map){
		String sql = "", where = "", groupBy = "";
		if("personnel".equals(map.get("restrict").toString())){
			//人员列表
			sql = "SELECT nvl(t.inspect_person, t.plan_person) AS person_id, person_name, t.org_name AS org_name, SUM(CASE WHEN plan_id IS NOT NULL AND record_time IS NOT NULL THEN 1 ELSE 0 END) AS plan_inspected, COUNT(plan_id) AS plan_inspect, SUM(CASE WHEN plan_id IS NULL AND record_time IS NOT NULL THEN 1 ELSE 0 END) AS out_plan_inspected FROM IFSAPP.C_INSPECT_ANALYSIS_DETAIL t ";
			where = "WHERE IFSAPP.C_INSPECT_BASE_SET_API.Get_Can_View('" + map.get(Constant.USER_ID).toString() + "', t.ORG_CODE) = 1 ";
			where += " AND (to_char(t.begin_time, 'YYYY-MM') BETWEEN '" + map.get("startTime").toString() + "' AND '" + map.get("endTime").toString() + "' OR to_char(t.end_time, 'YYYY-MM') BETWEEN '" + map.get("startTime").toString() + "' AND '" + map.get("endTime").toString() + "') ";
			groupBy = "GROUP BY nvl(t.inspect_person, t.plan_person), t.person_name, t.org_name";
			
			if(map.get("mch_code") != null && !"".equals(map.get("mch_code").toString())){
				where += " AND t.mch_code = '" + map.get("mch_code").toString() + "' ";
			}
			if(map.get("org_code") != null && !"".equals(map.get("org_code").toString())){
				where += " AND t.org_code = '" + map.get("org_code").toString() + "' ";
			}
		}else if("equipment".equals(map.get("restrict").toString())) {
			//设备列表
			sql = "SELECT MCH_CODE, mch_name, SUM(CASE WHEN plan_id IS NOT NULL AND record_time IS NOT NULL THEN 1 ELSE 0 END) AS plan_inspected, COUNT(plan_id) AS plan_inspect, SUM(CASE  WHEN plan_id IS NULL AND record_time IS NOT NULL THEN 1 ELSE 0 END) AS out_plan_inspected FROM IFSAPP.C_INSPECT_ANALYSIS_DETAIL t ";
			where = "WHERE (to_char(t.begin_time, 'YYYY-MM') BETWEEN '" + map.get("startTime").toString() + "' AND '" + map.get("endTime").toString() + "' OR to_char(t.end_time, 'YYYY-MM') BETWEEN '" + map.get("startTime").toString() + "' AND '" + map.get("endTime").toString() + "') ";
			groupBy = "GROUP BY t.mch_code, t.mch_name";
			
			if(map.get("person_id") != null && !"".equals(map.get("person_id").toString())){
				where += " AND nvl(t.inspect_person,t.plan_person) = '" + map.get("person_id").toString() + "' ";
			}
			if(map.get("org_code") != null && !"".equals(map.get("org_code").toString())){
				where += " AND t.org_code = '" + map.get("org_code").toString() + "' ";
			}
		}else if("department".equals(map.get("restrict").toString())) {
			//单位列表
			sql = "SELECT t.ORG_CODE, t.ORG_name, SUM(CASE WHEN plan_id IS NOT NULL AND record_time IS NOT NULL THEN 1 ELSE 0 END) AS plan_inspected , COUNT(plan_id) AS plan_inspect, SUM(CASE WHEN plan_id IS NULL AND record_time IS NOT NULL THEN 1 ELSE 0 END) AS out_plan_inspected FROM ifsapp.C_INSPECT_ANALYSIS_DETAIL t ";
			where = "WHERE IFSAPP.C_INSPECT_BASE_SET_API.Get_Can_View('" + map.get(Constant.USER_ID).toString() + "', t.ORG_CODE) = 1 ";
			where += " AND (to_char(t.begin_time, 'YYYY-MM') BETWEEN '" + map.get("startTime").toString() + "' AND '" + map.get("endTime").toString() + "' OR to_char(t.end_time, 'YYYY-MM') BETWEEN '" + map.get("startTime").toString() + "' AND '" + map.get("endTime").toString() + "') ";
			groupBy = "GROUP BY t.org_CODE, t.org_name";
			
			if(map.get("mch_code") != null && !"".equals(map.get("mch_code").toString())){
				where += " AND t.mch_code = '" + map.get("mch_code").toString() + "' ";
			}
			if(map.get("person_id") != null && !"".equals(map.get("person_id").toString())){
				where += " AND nvl(t.inspect_person,t.plan_person) = '" + map.get("person_id").toString() + "' ";
			}
		}
		
		return sql + where + groupBy;
	}
}
