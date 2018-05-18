package com.service.target.sql;

import com.domain.UserProfile;
import com.exception.ServiceException;
import com.utility.MapUtil;
import org.json.JSONObject;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.*;

/**
 * @Author:wangyg
 * @Description:缺陷管理SQL
 * @Date:Created in 2018-01-30 17:40
 * @Modied By:
 **/
public class DefectManageServiceSQL {
    /**
     * 缺陷管理概览查询
     * 当前用户
     *
     * @param map
     * @return
     */
    public static String faultRepMain(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.FAULT_REP_ID,");
        sb.append(" t.err_descr,");
        sb.append(" t.contract_desc contract,");
        sb.append(" t.reported_by_id_desc reported_by_id,");
        sb.append(" t.required_start_date,");
        sb.append(" t.required_end_date,");
        sb.append("  real_end_date,");
        sb.append(" find_org_code,");
        sb.append("  find_org_code_desc,");
        sb.append(" t.mch_code,");
        sb.append("  mch_name,");
        sb.append(" t.err_descr_lo,");
        sb.append(" t.qx_type,");
        sb.append(" t.fault_department,");
        sb.append(" t.state,");
        sb.append(" t.FAULT_CANCEL_DESC,");
        sb.append(" t.FAULT_LEAVE_DESC,");
        sb.append(" t.FAULT_ACCEPTANCE,");
        sb.append(" org_code_desc org_code,");
        sb.append(" ERR_SYMPTOM_desc  ERR_SYMPTOM," +
                "t.REG_DATE ");
        sb.append(" from IFSAPP.Fault_Rep_Main t");
        sb.append(" where 1=1 ");
        //按状态查询
        if (MapUtil.valueIsNotNull(map, "STATE")) {
            sb.append(" and t.state='");
            sb.append(MapUtil.stringValue(map, "STATE"));
            sb.append("'");
        }
        //按缺陷编号查询
        if(MapUtil.valueIsNotNull(map,"FAULT_REP_ID")){
            sb.append(" and t.FAULT_REP_ID='");
            sb.append(MapUtil.stringValue(map,"FAULT_REP_ID"));
            sb.append("'");
        }
        //按设备编码查询
        if(MapUtil.valueIsNotNull(map,"MCH_CODE")){
            sb.append(" and t.MCH_CODE='");
            sb.append(MapUtil.stringValue(map,"MCH_CODE"));
            sb.append("'");
        }
        //按缺陷名称模糊查询
        if (MapUtil.valueIsNotNull(map, "ERR_DESCR")) {
            sb.append(" and t.ERR_DESCR like '%");
            sb.append(MapUtil.stringValue(map, "ERR_DESCR"));
            sb.append("%'");
        }
        //通过主键查询出来的是明细需要显示的
        if (MapUtil.valueIsNotNull(map, "FAULT_REP_ID")) {
            sb.append(" and t.FAULT_REP_ID='");
            sb.append(MapUtil.stringValue(map, "FAULT_REP_ID"));
            sb.append("'");
        }else{
            if(MapUtil.valueIsNotNull(map,"CONTRACT")){
                sb.append(" and t.contract='");
                sb.append(MapUtil.stringValue(map,"CONTRACT"));
                sb.append("'");
            }else{
                sb.append(" and t.CONTRACT IN ");
                sb.append(" (SELECT IFSAPP.User_Allowed_Site_API.Authorized(t.CONTRACT) FROM dual)");
            }
        }
        return sb.toString();
    }

    /**
     * 根据设备名称模糊查询设备编码。
     * 当前用户
     *
     * @param map
     * @return
     */
    public static String equipmentFunctionalUiv(Map map, UserProfile uProfile) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.MCH_CODE,");
        sb.append(" t.MCH_NAME");
        sb.append(" from IFSAPP.MAINT_OBJECT_LOV t");
        sb.append(" where 1=1 ");
        //通过设备编码模糊查询
        if (MapUtil.valueIsNotNull(map, "MCH_CODE")) {
            sb.append(" and t.MCH_CODE like '%");
            sb.append(MapUtil.stringValue(map, "MCH_CODE"));
            sb.append("%'");

        }//通过设备名称模糊查询
        if (MapUtil.valueIsNotNull(map, "MCH_NAME")) {
            sb.append(" and t.MCH_NAME like '%");
            sb.append(MapUtil.stringValue(map, "MCH_NAME"));
            sb.append("%'");

        }
        //通过默认域
        sb.append(" and t.contract = '");
        sb.append(MapUtil.stringValue(uProfile.getOrgInfo(), "CONTRACT"));
        sb.append("'");
        return sb.toString();
    }

    /**
     * 查询执行部门
     * 当前用户
     *
     * @param map
     * @return
     */
    public static String orgCodeAllowedSiteLov(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.org_code,");
        sb.append(" t.description");
        sb.append(" from IFSAPP.ORG_CODE_ALLOWED_SITE_LOV t order by t.org_code ");
        return sb.toString();
    }

    /**
     * 查询现象
     * 当前用户
     * @param map
     * @return
     */
    public static String workOrderSymptCode(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.err_symptom, t.description ");
        sb.append(" from IFSAPP.WORK_ORDER_SYMPT_CODE t ");
        sb.append(" order by to_number(t.err_symptom)");
        return sb.toString();
    }

    /**
     * 设备状态:FAULT_SS
     * 缺陷专业：WODEPART
     * 缺陷分类：FAULTLEVEL
     * 默认用户查询
     * @param type
     * @return
     */
    public static String custLovConf(String type){
        StringBuffer sb = new StringBuffer();
        sb.append("SELECT lov_value");
        sb.append(" FROM IFSAPP.cust_lov_conf ");
        sb.append(" WHERE lov_type = '");
        sb.append(type);
        sb.append("'");
        return sb.toString();
    }

    /**
     * 新建管理缺陷
     * @param dataSource
     * @param map
     * @param uProfile
     * @return
     * @throws ServiceException
     */
    public static JSONObject CreateFaultMainFromApp(DataSource dataSource, Map map,
                                                   UserProfile uProfile) throws ServiceException {
        JSONObject jsonResult = new JSONObject();
        Connection conn = null;
        CallableStatement proc = null;
        String strSql = "";
        try {
            conn = dataSource.getConnection(uProfile.getUserId(),
                    uProfile.getPassWord());
            strSql = "call IFSAPP.fault_rep_main_api.Create_Fault_Main_From_App(?,?,?,?,?,?,?,?,?,?,?)";
            proc = conn.prepareCall("{ " + strSql + " }");
            proc.registerOutParameter(1, Types.VARCHAR);
            proc.setString(2, MapUtil.stringValue(map,"ERR_DESCR"));
            proc.setString(3, MapUtil.stringValue(map,"SYSTEM_STATUS"));
            proc.setString(4, MapUtil.stringValue(uProfile.getOrgInfo(),"CONTRACT"));
            proc.setString(5, MapUtil.stringValue(map,"QX_TYPE"));
            proc.setString(6, MapUtil.stringValue(map,"FAULT_DEPARTMENT"));
            proc.setString(7, MapUtil.stringValue(map,"MCH_CODE"));
            proc.setString(8, uProfile.getUserId());
            proc.setString(9, MapUtil.stringValue(map,"ORG_CODE"));
            proc.setString(10, MapUtil.stringValue(map,"ERR_SYMPTOM"));
            proc.setString(11, MapUtil.stringValue(map,"ERR_DESCR_LO"));
            proc.execute();
            jsonResult.put("FAULT_REP_ID", proc.getString(1));
        } catch (SQLException e) {
            throw new ServiceException("", e.getMessage());
        } catch (Throwable e) {
            throw new ServiceException("", e.getMessage());
        } finally {
            try {
                if (proc != null)
                    proc.close();
                if (conn != null)
                    conn.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return jsonResult;
    }
    /**
     * 缺陷管理上传文档
     * @param map
     * @return
     */
    public static String CreateDocForApp(Map map) {
        StringBuffer sb = new StringBuffer("{");
        sb.append(" call IFSAPP.DOC_TITLE_API.Create_Doc_For_App('");
        sb.append("20-5");
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"FILE_NAME"));
        sb.append("','");
        sb.append("FaultRepMain");
        sb.append("','");
        sb.append("/20-5/");
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"KEY_REF"));
        sb.append("','");
        sb.append(".png");
        sb.append("')");
        sb.append("}");
        return sb.toString();
    }
}
