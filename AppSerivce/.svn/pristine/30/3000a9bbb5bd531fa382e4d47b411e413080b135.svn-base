package com.service.target.sql;

import com.utility.MapUtil;

import java.util.*;

/**
 * @des:运行日志SQL处理
 * @author:wangyg
 * @date:2018-1-22
 */
public class JournalServiceSQL {
    /**
     * 运行日志-概览
     * 生产日志。
     *
     * @param map
     * @return
     */
    public static String operRecorde(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select t.event_no,");
        sb.append(" ifsapp.COMPANY_SITE_API.Get_Description(t.contract)  contract,");
        sb.append(" t.work_seq,");
        sb.append(" t.oper_group,");
        sb.append(" ifsapp.PERSON_INFO_API.GET_NAME(t.record_person)   record_person,");
        sb.append(" t.opelog_type,");
        sb.append(" state");
        sb.append(" from ifsapp.OPER_RECORD t");
        sb.append(" where CONTRACT IN");
        sb.append(" (SELECT ifsapp.User_Allowed_Site_API.Authorized(CONTRACT) FROM dual)");
        /*sb.append(" where t.contract='");
        sb.append(MapUtil.stringValue(map, "CONTRACT"));
        sb.append("'");*/
        if (MapUtil.valueIsNotNull(map, "WORK_SEQ")) {
            sb.append(" and t.work_seq='");
            sb.append(MapUtil.stringValue(map, "WORK_SEQ"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "RECORD_DATE")) {
            sb.append(" and to_char(t.record_date,'yyyy-MM-dd')='");
            sb.append(MapUtil.stringValue(map, "RECORD_DATE"));
            sb.append("'");
        }
        sb.append(" order by contract asc,event_no desc");
        return sb.toString();
    }

    /**
     * 运行日志-概览
     * 集控中心日志。
     *
     * @param map
     * @return
     */
    public static String centerOperRecorde(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select t.event_no,");
        sb.append(" '集控运行中心'  contract,");
        sb.append(" t.work_seq,");
        sb.append(" t.oper_group,");
        sb.append(" ifsapp.PERSON_INFO_API.GET_NAME(t.record_person)   record_person,");
        sb.append(" t.opelog_type,");
        sb.append(" state");
        sb.append(" from ifsapp.CENTER_OPER_RECORD t");
        sb.append(" where 1=1");
        if (MapUtil.valueIsNotNull(map, "WORK_SEQ")) {
            sb.append(" and t.work_seq='");
            sb.append(MapUtil.stringValue(map, "WORK_SEQ"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "RECORD_DATE")) {
            sb.append(" and to_char(t.record_date,'yyyy-MM-dd')='");
            sb.append(MapUtil.stringValue(map, "RECORD_DATE"));
            sb.append("'");
        }
        sb.append(" order by event_no desc");
        return sb.toString();
    }

    /**
     * 运行日志详情
     * 当前用户查询
     *
     * @param map
     * @return
     */
    public static String operRecordLine(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select T.LINE_NO, T.CONTENT, to_char(T.RECORD_DATE,'yyyy-MM-dd hh24:mi') RECORD_DATE");
        sb.append(" from ifsapp.OPER_RECORD_LINE t");
        sb.append(" where t.EVENT_NO = '");
        sb.append(MapUtil.stringValue(map, "EVENT_NO"));
        sb.append("'");
        sb.append(" order by to_number(T.LINE_NO)");
        return sb.toString();
    }

    /**
     * 运行日志-运行方式
     * 当前用户查询
     * @param map
     * @return
     */
    public static String opeMode(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select T.OPE_MODE_ID,");
        sb.append(" t.OPE_MODE_PARA,");
        sb.append(" t.OPE_MODE_PARA_KEY,");
        sb.append(" t.REMARK");
        sb.append(" from ifsapp.OPE_MODE t");
        sb.append(" where event_no = '");
        sb.append(MapUtil.stringValue(map, "EVENT_NO"));
        sb.append("'");
        sb.append(" order by to_number(t.ope_mode_id)");
        return sb.toString();
    }

    /**
     * 运行日志-接地线
     * 当前用户查询
     * @param map
     * @return
     */
    public static String groupWire(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT T.GROUND_WIRE_N_O,T.REGISTER_DATE,T.CONTENT ");
        sb.append(" FROM IFSAPP.GROUND_WIRE T ");
        sb.append(" where event_no = '");
        sb.append(MapUtil.stringValue(map, "EVENT_NO"));
        sb.append("'");
        sb.append(" order by to_number(t.ground_wire_n_o) ");
        return sb.toString();
    }

    /**
     * 运行日志-交接班
     * 当前用户查询
     * @param map
     * @return
     */
    public static String teamChange(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT IFSAPP.COMPANY_SITE_API.GET_DESCRIPTION(CONTRACT) CONTRACT,");
        sb.append(" IFSAPP.PERSON_INFO_API.GET_NAME(HAND_OVER_PERSON) HAND_OVER_PERSON_NAME,");
        sb.append(" REMARK,");
        sb.append(" TAKE_OVER_TIME,");
        sb.append(" IFSAPP.PERSON_INFO_API.GET_NAME(TAKE_OVER_PERSON) TAKE_OVER_PERSON_NAME,");
        sb.append(" OPINION");
        sb.append(" FROM IFSAPP.TEAM_CHANGE");
        sb.append(" WHERE CONTRACT IN");
        sb.append(" (SELECT IFSAPP.USER_ALLOWED_SITE_API.AUTHORIZED(CONTRACT) FROM DUAL)");
        sb.append(" AND EVENT_NO ='");
        sb.append(MapUtil.stringValue(map, "EVENT_NO"));
        sb.append("'");
        return sb.toString();
    }

    /**
     * 集控运行日志-运行日志
     * @param map
     * @return
     */
    public static String centerOperRecordLine(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select LINE_NO,");
        sb.append(" ifsapp.COMPANY_SITE_API.Get_Description(CONTRACT) CONTRACT,");
        sb.append(" PROVINCE,");
        sb.append(" RECORD_DATE,");
        sb.append(" WORK_TYPE,");
        sb.append(" CONTENT,");
        sb.append(" REMARK");
        sb.append(" from ifsapp.CENTER_OPER_RECORD_LINE");
        sb.append(" where EVENT_NO = '");
        sb.append(MapUtil.stringValue(map, "EVENT_NO"));
        sb.append("'");
        sb.append(" order by to_number(line_no) asc");
        return sb.toString();
    }

    /**
     * 集控中心运行方式
     * 运行方式
     * @param map
     * @return
     */
    public static String centerOperMode(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select LINE_NO,");
        sb.append(" SYSTEM_NAME,");
        sb.append(" PROJECT_SITE1,");
        sb.append(" PROJECT_SITE2,");
        sb.append(" PROJECT_SITE3,");
        sb.append(" PROJECT_SITE4,");
        sb.append(" PROJECT_SITE5,");
        sb.append(" PROJECT_SITE6,");
        sb.append(" PROJECT_SITE7,");
        sb.append(" PROJECT_SITE8,");
        sb.append(" PROJECT_SITE9,");
        sb.append(" PROJECT_SITE10,");
        sb.append(" PROJECT_SITE11,");
        sb.append(" PROJECT_SITE12,");
        sb.append(" PROJECT_SITE13,");
        sb.append(" PROJECT_SITE14,");
        sb.append(" REMARK");
        sb.append(" from ifsapp.CENTER_OPER_MODE");
        sb.append(" where EVENT_NO = '");
        sb.append(MapUtil.stringValue(map, "EVENT_NO"));
        sb.append("'");
        sb.append(" order by TO_NUMBER(LINE_NO)");
        return sb.toString();
    }

    /**
     * 集控运行日志-接地线
     * @param map
     * @return
     */
    public static String centerGroupWire(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select GROUND_LINE_NO,");
        sb.append(" ifsapp.COMPANY_SITE_API.Get_Description(CONTRACT) CONTRACT,");
        sb.append(" RECORD_AREA,");
        sb.append(" RECORD_DATE");
        sb.append(" from ifsapp.CENTER_GROUND_WIRE");
        sb.append(" where EVENT_NO = '");
        sb.append(MapUtil.stringValue(map, "EVENT_NO"));
        sb.append("'");
        sb.append(" order by to_number(GROUND_LINE_NO)");
        return sb.toString();
    }

    /**
     * 集控中心日志
     * 交接班
     * @param map
     * @return
     */
    public static String centerOperRecord(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select REMARK  from ifsapp.CENTER_OPER_RECORD");
        sb.append(" where CONTRACT IN");
        sb.append(" (SELECT ifsapp.User_Allowed_Site_API.Authorized(CONTRACT) FROM dual)");
        sb.append(" and EVENT_NO = '");
        sb.append(MapUtil.stringValue(map, "EVENT_NO"));
        sb.append("'");
        return sb.toString();
    }

}
