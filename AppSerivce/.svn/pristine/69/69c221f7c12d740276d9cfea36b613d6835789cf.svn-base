package com.service.indexPage;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.indexPage.sql.WhiteBoardServiceSQL;
import com.utility.IbatisDBUtil;
import com.utility.JdbcDBUtil;
import com.utility.ListUtil;
import com.utility.MapUtil;
import org.json.JSONObject;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @Author:wangyg
 * @Description:白板公告相关服务
 * @Date:Created in 2018-03-7 10:15
 * @Modied By:
 **/
public class WhiteBoardService extends AJsonService implements IJsonService {

    /**
     * 获取公告白板列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listWhiteBoardNewspaper(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code="0";
        String msg = "success";
        try {
            String sql = WhiteBoardServiceSQL.whiteBoardNewspaper(map);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            json.put("tList",tList);
        } catch (Throwable e) {
            logger.error("6001", e);
            e.printStackTrace();
            throw new ServiceException("6001", "获取公告白板数据出错");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        }catch (Throwable e){
            e.printStackTrace();
        }
        return json.toString();
    }
    /**
     * 获取公告白板详情
     * @param map
     * @return
     * @throws ServiceException
     */
    public String FormWhiteBoardNewspaper(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code="0";
        String msg = "success";
        try {
            String sql = WhiteBoardServiceSQL.whiteBoardNewspaper(map);
            List<Map> tList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isNotEmpty(tList)){
                Map d=tList.get(0);
                json.put("detail",d);
            }else{
                code="1";
                msg="没有查询到数据！";
            }
//            json.put("tList",tList);
        }catch (Throwable e) {
            logger.error("6002", e);
            e.printStackTrace();
            throw new ServiceException("6002", "获取公告白板数据出错");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        }catch (Throwable e){
            e.printStackTrace();
        }
        return json.toString();
    }

    /**
     * 修改白板信息
     * @param map
     * @return
     * @throws ServiceException
     */
    public String FunWhiteBoardNewspaper(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code="0";
        String msg = "success";
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = WhiteBoardServiceSQL.UpdateWhiteBoardNewspaper(map);
            logger.info("sql==="+sql);
            boolean ok=jdbc.callProcedure(uProfile.getUserId(),uProfile.getPassWord(),sql);
            if(!ok){
               code="1";
               msg="执行白板更新时系统出错！";
            }
        }catch (SQLException e) {
            logger.error("6003", e);
            e.printStackTrace();
            if(e.getMessage().indexOf("ORA-06550")>=0){
                code="1";
                msg="您无权修改此条数据，请联系管理员！";
            }else{
                throw new ServiceException("6003", e.getMessage());
            }
        }catch (Throwable e) {
            logger.error("6003", e);
            e.printStackTrace();
            throw new ServiceException("6003", "修改白板公告数据出错");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        }catch (Throwable e){
            e.printStackTrace();
        }
        return json.toString();
    }
}
