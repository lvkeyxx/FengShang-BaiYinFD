package com.service.target;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.constant.Global;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.target.sql.DefectManageServiceSQL;
import com.service.target.sql.HiddenDangerServiceSQL;
import com.utility.*;
import com.utility.baiyin.BaiyinUtils;
import org.json.JSONObject;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 缺陷管理服务
 * wangyg
 * 2018-1-30
 */
public class DefectManageService extends AJsonService implements IJsonService {
    private DataSource dataSource;

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    /**
     * 缺陷管理列表页
     * 当前用户查询
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listFaultRepMain(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = DefectManageServiceSQL.faultRepMain(map);
            int pageSize = 0;
            int pageNo = 0;
            if (map.get(Constant.PAGECNT) != null && MapUtil.intValue(map,Constant.PAGECNT) != 0) {
                pageSize = MapUtil.intValue(map,Constant.PAGECNT);
                pageNo = MapUtil.intValue(map,Constant.PAGENO);
                sql = BaiyinUtils.genPageSql(sql, pageSize, pageNo);
            }
            logger.info("sql=="+sql);
            List<Map> hList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(hList)) {
                throw new ServiceException("", "没有查询缺陷管理数据！");
            }
            json.put("hList", hList);
        } catch (SQLException e) {
            if (e.getMessage().indexOf("ORA-01031") >= 0) {
                throw new ServiceException("5001","您没有此项的操作权限，请联系管理员分配！");
            } else {
                e.printStackTrace();
                throw new ServiceException("5001", e.getMessage());
            }
        }catch (ServiceException e) {
            throw new ServiceException("5001", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("5001", "缺陷管理查询出错！");
        }
        return json.toString();
    }

    /**
     * 显示缺陷明细
     * @param map
     * @return
     * @throws ServiceException
     */
    public String detailFaultRepMain(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = DefectManageServiceSQL.faultRepMain(map);
            List<Map> hList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(hList)) {
                throw new ServiceException("", "没有查询缺陷管理数据！");
            }
            json.put("detail", hList.get(0));
        } catch (ServiceException e) {
            throw new ServiceException("5002", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("5002", "缺陷管理首页查询出错！");
        }
        return json.toString();

    }

    /**
     * 获取设备列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listEquipmentFunctionalUiv(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = DefectManageServiceSQL.equipmentFunctionalUiv(map,uProfile);
            int pageSize = 0;
            int pageNo = 0;
            if (map.get(Constant.PAGECNT) != null && MapUtil.intValue(map,Constant.PAGECNT) != 0) {
                pageSize = MapUtil.intValue(map,Constant.PAGECNT);
                pageNo = MapUtil.intValue(map,Constant.PAGENO);
                sql = BaiyinUtils.genPageSql(sql, pageSize, pageNo);
            }
            logger.info("sql=="+sql);
            List<Map> hList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(hList)) {
                throw new ServiceException("", "没有查询到设备管理数据！");
            }
            json.put("hList", hList);
        } catch (ServiceException e) {
            throw new ServiceException("5003", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("5003", "设备管理查询出错！");
        }
        return json.toString();
    }

    /**
     * 执行部门查询
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listOrgCodeAllowedSiteLov(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = DefectManageServiceSQL.orgCodeAllowedSiteLov(map);
            List<Map> hList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(hList)) {
                throw new ServiceException("", "没有查询到执行部门数据！");
            }
            json.put("hList", hList);
        } catch (ServiceException e) {
            throw new ServiceException("5004", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("5004", "执行部门查询出错！");
        }
        return json.toString();
    }
    /**
     * 现象数据查询
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listWorkOrderSymptCode(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = DefectManageServiceSQL.workOrderSymptCode(map);
            List<Map> hList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(hList)) {
                throw new ServiceException("", "没有查询到现象数据！");
            }
            json.put("hList", hList);
        } catch (ServiceException e) {
            throw new ServiceException("5005", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("5005", "现象查询出错！");
        }
        return json.toString();
    }

    /**
     * 设备状态:FAULT_SS
     * 缺陷专业：WODEPART
     * 缺陷分类：FAULTLEVEL
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listCustLovConf(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            //查询设备状态
            String sql = DefectManageServiceSQL.custLovConf("FAULT_SS");
            List<Map> hList = new IbatisDBUtil().executeSql(sql);
            json.put("ztList", hList);
            //缺陷专业
            sql = DefectManageServiceSQL.custLovConf("WODEPART");
            hList = new IbatisDBUtil().executeSql(sql);
            json.put("zyList", hList);
            //缺陷分类
            sql = DefectManageServiceSQL.custLovConf("FAULTLEVEL");
            hList = new IbatisDBUtil().executeSql(sql);
            json.put("flList", hList);
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("5006", "状态等查询出错！");
        }
        return json.toString();
    }

    /**
     * 新建缺陷
     * @param map
     * @return
     * @throws ServiceException
     */
    public String funCreateFaultMainFromApp(Map map)throws ServiceException{
        logger.info("map=="+map);
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            //插入数据，获取缺陷编码
            json = DefectManageServiceSQL.CreateFaultMainFromApp(dataSource,map,uProfile);
            String hiddenNo = json.getString("FAULT_REP_ID");
            //调用审批接口
            map.put("FAULT_REP_ID",hiddenNo);
            //如果上传文件，则进行传入
            if(MapUtil.valueIsNotNull(map,"FILE_NAME")){
                int count = MapUtil.intValue(map,"COUNT");
                //调用文件服务器，返回文件路径
                for(int i=0;i<count;i++){
                    String key = "FILE"+i;
                    String im = MapUtil.stringValue(map,key);
                    String fileName = BaiyinUtils.getImageName("20-5");
                    InputStream in = BaiyinUtils.getImageByte(im);
                    boolean flag = FTPUtil.uploadFile(Global.getFtpIp(), Global.getFtpPort(), Global.getFtpUsername(), Global.getFtpPassword(), Global.getFtpBasePath(), "/20-5/",fileName, in);
                    //保存文件信息
                    map.put("FILE_NAME",fileName);
                    map.put("KEY_REF","FAULT_REP_ID="+MapUtil.stringValue(map,"FAULT_REP_ID")+"^");
                    String sql = DefectManageServiceSQL.CreateDocForApp(map);
                    boolean ok = jdbc.callProcedure(uProfile.getUserId(),uProfile.getPassWord(),sql);
                    if(!ok){
                        throw new ServiceException("","保存文档时，数据库出错！");
                    }
                }

            }
        } catch (ServiceException e) {
            throw new ServiceException("5008", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("5008", "缺陷管理查询出错！");
        }
        return json.toString();
    }
    /**
     * 缺陷文档生成
     * 当前用户查询
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listEdmFile(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code="0";
        String msg = "success";
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String type="FAULT_REP_ID="+MapUtil.stringValue(map,"FAULT_REP_ID")+"^";
            String luName="FaultRepMain";
            String sql = HiddenDangerServiceSQL.edmFile(type,luName);
            logger.info("sql=="+sql);
            List<Map> hList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(hList)) {
                code="1";
                msg ="没有查询到缺陷文档据数！";
            }
            //将文件本地化
            for(Map m:hList){
                String fileName = BaiyinUtils.genLoacalFile(map,m,uProfile,"/20-5/",url);
                logger.info("fileName==="+fileName);
                m.put("FILE_URL",fileName);
                m.put("isImage",BaiyinUtils.checkImage(fileName));
            }
            json.put("fList", hList);

        } catch (ServiceException e) {
            e.printStackTrace();
            //throw new ServiceException("4002", e.getMessage());
            code="1";
            msg = e.getMsg();
        } catch (SQLException e) {
            e.printStackTrace();
            //throw new ServiceException("4002", e.getMessage());
            code="1";
            msg = e.getMessage();
        } catch (Throwable e) {
            e.printStackTrace();
            code ="1";
            msg = "缺陷文档提取错误！";
            //throw new ServiceException("5009", "缺陷文档出错！");
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
