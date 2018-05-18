package com.service.target;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.target.sql.JournalServiceSQL;
import com.utility.DateUtil;
import com.utility.JdbcDBUtil;
import com.utility.ListUtil;
import com.utility.MapUtil;
import org.json.JSONObject;

/**
 * @description:运行日志相关处理
 * @author:wangyg
 * @date:2018-1-22
 */
public class JournalService extends AJsonService implements IJsonService {
    /**
     * 显示运行日志概览
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listOperRecorde(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
//            map.put("CONTRACT", MapUtil.stringValue(uProfile.getOrgInfo(), "CONTRACT"));
            if (MapUtil.valueIsNull(map, "RECORD_DATE")) {
                map.put("RECORD_DATE", DateUtil.formDate(new Date(), "yyyy-MM-dd"));
            }
            String sql = JournalServiceSQL.operRecorde(map);
            logger.info("listOperRecorde.sql==" + sql);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            String dc = "";
            for (Map m : rList) {
                m.put("CNAME",MapUtil.stringValue(m, "CONTRACT"));
                if (dc.equals(MapUtil.stringValue(m, "CONTRACT"))) {
                    m.put("CONTRACT", "");
                } else {
                    dc = MapUtil.stringValue(m, "CONTRACT");
                }
            }
            json.put("rList", rList);
        } catch (SQLException e) {
            //权限问题，不作为异常抛出
            if (e.getMessage().indexOf("ORA-01031") >= 0) {
                code = "1";
                msg = "您没有此项的操作权限，请联系管理员分配！";
            } else {
                e.printStackTrace();
                throw new ServiceException("3001", e.getMessage());
            }

        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3001", e.getMessage());
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
     * 显示集控中心日志概览
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listCenterOperRecorde(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            if (MapUtil.valueIsNull(map, "RECORD_DATE")) {
                map.put("RECORD_DATE", DateUtil.formDate(new Date(), "yyyy-MM-dd"));
            }
            String sql = JournalServiceSQL.centerOperRecorde(map);
            logger.info("listCenterOperRecorde.sql==" + sql);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            json.put("rList", rList);
        } catch (SQLException e) {
            //权限问题，不作为异常抛出
            if (e.getMessage().indexOf("ORA-01031") >= 0) {
                code = "1";
                msg = "您没有此项的操作权限，请联系管理员分配！";
            } else {
                e.printStackTrace();
                throw new ServiceException("3002", e.getMessage());
            }

        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3002", e.getMessage());
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
     * 运行日志-日志详情
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listOperRecordLine(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = JournalServiceSQL.operRecordLine(map);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(rList)) {
                throw new ServiceException("", "没有查询到运行日志数据");
            }
            json.put("rList", rList);
        } catch (ServiceException e) {
            throw new ServiceException("3003", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3003", e.getMessage());
        }
        return json.toString();
    }

    /**
     * 运行日志-运行方式
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listopeMode(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = JournalServiceSQL.opeMode(map);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(rList)) {
                throw new ServiceException("", "没有查询到运行方式数据");
            }
            json.put("rList", rList);
        } catch (ServiceException e) {
            throw new ServiceException("3004", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3004", e.getMessage());
        }
        return json.toString();
    }

    /**
     * 运行日志-接地线
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listgroupWire(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = JournalServiceSQL.groupWire(map);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(rList)) {
                throw new ServiceException("", "没有查询到接地线数据");
            }
            json.put("rList", rList);
        } catch (ServiceException e) {
            throw new ServiceException("3005", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3005", e.getMessage());
        }
        return json.toString();
    }

    /**
     * 运行日志-交接班
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listteamChange(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = JournalServiceSQL.teamChange(map);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(rList)) {
                throw new ServiceException("", "没有查询到交接班数据");
            }
            json.put("rList", rList);
        } catch (ServiceException e) {
            throw new ServiceException("3006", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3006", e.getMessage());
        }
        return json.toString();
    }

    /**
     * 集控中心-运行日志
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listcenterOperRecordLine(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = JournalServiceSQL.centerOperRecordLine(map);
            logger.info("sql==" + sql);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(rList)) {
                throw new ServiceException("", "没有查询到运行日志数据");
            }
            json.put("rList", rList);
        } catch (ServiceException e) {
            throw new ServiceException("3007", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3007", e.getMessage());
        }
        return json.toString();
    }

    /**
     * 集控中心-运行方式
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listcenterOperMode(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = JournalServiceSQL.centerOperMode(map);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(rList)) {
                throw new ServiceException("", "没有查询到运行方式数据");
            }
            json.put("rList", rList);
        } catch (ServiceException e) {
            throw new ServiceException("3008", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3008", e.getMessage());
        }
        return json.toString();
    }

    /**
     * 集控中心-接地线
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listcenterGroupWire(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = JournalServiceSQL.centerGroupWire(map);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(rList)) {
                throw new ServiceException("", "没有查询到接地线数据");
            }
            json.put("rList", rList);
        } catch (ServiceException e) {
            throw new ServiceException("3009", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3009", e.getMessage());
        }
        return json.toString();
    }

    /**
     * 集控中心-交接班
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listcenterOperRecord(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = JournalServiceSQL.centerOperRecord(map);
            List<Map> rList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(rList)) {
                throw new ServiceException("", "没有查询到交接班数据");
            }
            json.put("rList", rList);
        } catch (ServiceException e) {
            throw new ServiceException("3010", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("3010", e.getMessage());
        }
        return json.toString();
    }
}
