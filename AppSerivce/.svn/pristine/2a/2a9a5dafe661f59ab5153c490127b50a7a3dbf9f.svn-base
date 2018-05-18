package com.service.target.sql;

import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.utility.MapUtil;
import org.json.JSONObject;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Types;
import java.util.*;

/**
 * 隐患排查SQL处理
 * wangyg
 * 2018-1-23
 */
public class HiddenDangerServiceSQL {
    /**
     * 隐患排查等级查询
     * 按照当前用户查询
     *
     * @param map
     * @return
     */
    public static String sehHiddenDangerLevel(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append(" select HIDDEN_DANGER_LEVEL,DESCRIPTION");
        sb.append(" from ifsapp.SEH_HIDDEN_DANGER_LEVEL");
        sb.append(" where 1=1");
        return sb.toString();
    }

    /**
     * 隐患排查-新建
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public static JSONObject CreateSehHiddenDanger(DataSource dataSource, Map map,
                                               UserProfile uProfile) throws ServiceException {
        JSONObject jsonResult = new JSONObject();
        Connection conn = null;
        CallableStatement proc = null;
        String strSql = "";
//        System.out.println("params===\n");
//        System.out.println(MapUtil.stringValue(uProfile.getOrgInfo(),"CONTRACT"));
//        System.out.println(uProfile.getUserId());
//        System.out.println(new Date(new java.util.Date().getTime()));
//        System.out.println(MapUtil.stringValue(map, "DANGER_CONTENT"));
//        System.out.println(MapUtil.stringValue(map, "DANGER_LEVEL"));
//        System.out.println(MapUtil.stringValue(uProfile.getOrgInfo(),Constant.DEPT_NO));
        try {
            conn = dataSource.getConnection(uProfile.getUserId(),
                    uProfile.getPassWord());
            strSql = "call IFSAPP.SEH_HIDDEN_DANGER_API.Create_Seh_Hidden_Danger(?,?,?,?,?,?,?)";
            proc = conn.prepareCall("{ " + strSql + " }");
            proc.registerOutParameter(1, Types.VARCHAR);
            proc.setString(2, MapUtil.stringValue(uProfile.getOrgInfo(),Constant.CONTRACT));
            proc.setString(3, uProfile.getUserId());
            proc.setDate(4, new Date(new java.util.Date().getTime()));
            proc.setString(5, MapUtil.stringValue(map, "DANGER_CONTENT"));
            proc.setString(6, MapUtil.stringValue(map, "DANGER_LEVEL"));
            proc.setString(7, MapUtil.stringValue(uProfile.getOrgInfo(), Constant.DEPT_NO));
            proc.execute();
            jsonResult.put("HIDDEN_DANGER_NO", proc.getString(1));
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
     * 隐患排查的查询功能
     *
     * @param map
     * @return
     */
    public static String sehHiddenDanger(Map map) {
        StringBuffer sb = new StringBuffer();
        sb.append("select t.HIDDEN_DANGER_NO,");
        sb.append(" t.contract_desc CONTRACT_NAME,");
        sb.append(" IFSAPP.PERSON_INFO_API.GET_NAME(t.discover_user) DISCOVER_USER,");
        sb.append(" t.DISCOVER_TIME,");
        sb.append(" t.danger_level_desc DANGER_LEVEL,");
        sb.append(" t.STATE,");
        sb.append(" t.DANGER_CONTENT");
        sb.append(" from ifsapp.SEH_HIDDEN_DANGER t");
        sb.append(" where CONTRACT IN");
        sb.append(" (SELECT contract");
        sb.append(" FROM ifsapp.USER_ALLOWED_SITE");
        sb.append(" WHERE userid = ifsapp.Fnd_Session_API.Get_Fnd_User)");
        if (MapUtil.valueIsNotNull(map, "STATE")) {
            sb.append(" and t.state='");
            sb.append(MapUtil.stringValue(map, "STATE"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "CONTRACT")) {
            sb.append(" and t.CONTRACT='");
            sb.append(MapUtil.stringValue(map, "CONTRACT"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "DANGER_LEVEL")) {
            sb.append(" and t.danger_level='");
            sb.append(MapUtil.stringValue(map, "DANGER_LEVEL"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "START_DATE")) {
            sb.append(" and TO_CHAR(t.DISCOVER_TIME,'yyyy-mm-dd')>='");
            sb.append(MapUtil.stringValue(map, "START_DATE"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "END_DATE")) {
            sb.append(" and TO_CHAR(t.DISCOVER_TIME,'yyyy-mm-dd')<='");
            sb.append(MapUtil.stringValue(map, "END_DATE"));
            sb.append("'");
        }
        if (MapUtil.valueIsNotNull(map, "DANGER_CONTENT")) {
            sb.append(" and t.danger_content LIKE '%");
            sb.append(MapUtil.stringValue(map, "DANGER_CONTENT"));
            sb.append("%'");
        }
        return sb.toString();
    }

    /**
     * 隐患排查上传文档
     * @param map
     * @return
     */
    public static String createDocForApp(Map map) {
        StringBuffer sb = new StringBuffer("{");
        sb.append(" call IFSAPP.DOC_TITLE_API.Create_Doc_For_App('");
        sb.append("21-6");
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"FILE_NAME"));
        sb.append("','");
        sb.append("SehHiddenDanger");
        sb.append("','");
        sb.append("/21-6/");
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"KEY_REF"));
        sb.append("','");
        sb.append(".png");
        sb.append("')");
        sb.append("}");
        return sb.toString();
    }

    /**
     * 提交审批
     * @param map
     * @return
     */
    public static String CreateSubappFromApp(Map map,UserProfile uProfile){
        StringBuffer sb = new StringBuffer("{");
        sb.append("call IFSAPP.APPROVAL_ROUTING_API.Create_Subapp_From_App('");
        sb.append(MapUtil.stringValue(uProfile.getOrgInfo(),"CONTRACT"));
        sb.append("','");
        sb.append(MapUtil.stringValue(map,"HIDDEN_DANGER_NO"));
        sb.append("')");
        sb.append("}");
        return sb.toString();
    }

    /**
     * 查询文档列表
     * @param type
     * @return
     */
    public static String edmFile(String type,String luName){
        StringBuffer sb = new StringBuffer();
        sb.append(" select t.doc_class,t.doc_no,t.file_name,t.path");
        sb.append(" from ifsapp.edm_file t");
        sb.append(" left join ifsapp.DOC_REFERENCE_OBJECT a ");
        sb.append(" on t.doc_class=a.doc_class ");
        sb.append(" and t.doc_no = a.doc_no");
        sb.append(" and t.doc_sheet = a.doc_sheet ");
        sb.append(" and t.doc_rev = a.doc_rev");
        sb.append(" where a.lu_name='");
        sb.append(luName);
        sb.append("' and a.key_ref='");
        sb.append(type);
        sb.append("'");
        return sb.toString();
    }
}
