package com.service.target;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.constant.Global;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.target.sql.HiddenDangerServiceSQL;
import com.utility.*;
import com.utility.baiyin.BaiyinUtils;
import org.json.JSONObject;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.*;

/**
 * 隐患排查查询
 */
public class HiddenDangerService extends AJsonService implements IJsonService {
    private DataSource dataSource;

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    /**
     * 隐患排查等级查询
     * 当前用户查询
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listSehHiddenDangerLevel(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = HiddenDangerServiceSQL.sehHiddenDangerLevel(map);
            int pageSize = 0;
            int pageNo = 0;
            if (map.get(Constant.PAGECNT) != null && MapUtil.intValue(map,Constant.PAGECNT) != 0) {
                pageSize = MapUtil.intValue(map,Constant.PAGECNT);
                pageNo = MapUtil.intValue(map,Constant.PAGENO);
                sql = BaiyinUtils.genPageSql(sql, pageSize, pageNo);
            }
            List<Map> hList = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isEmpty(hList)) {
                throw new ServiceException("", "没有查询排查等级数据！");
            }
            json.put("hList", hList);
        } catch (ServiceException e) {
            throw new ServiceException("4001", e.getMsg());
        } catch (Throwable e) {
            if (e.getMessage().indexOf("ORA-01031") >= 0) {
                throw new ServiceException("4001","您没有此项的操作权限，请联系管理员分配！");
            } else {
                e.printStackTrace();
                throw new ServiceException("4001", "隐患排查等级查询出错！");
            }
        }
        return json.toString();
    }

    /**
     * 隐患排查查询
     * 当前用户查询
     * @param map
     * @return
     * @throws ServiceException
     */
    public String listSehHiddenDanger(Map map) throws ServiceException {
        JSONObject json = new JSONObject();
        String code="0";
        String msg = "success";
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            String sql = HiddenDangerServiceSQL.sehHiddenDanger(map);
            int pageSize = 0;
            int pageNo = 0;
            if (map.get(Constant.PAGECNT) != null && MapUtil.intValue(map,Constant.PAGECNT) != 0) {
                pageSize = MapUtil.intValue(map,Constant.PAGECNT);
                pageNo = MapUtil.intValue(map,Constant.PAGENO);
                sql = BaiyinUtils.genPageSql(sql, pageSize, pageNo);
            }
            List<Map> hList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(hList)) {
                code="1";
                msg ="没有查询到隐患排查数据！";
            }
            json.put("hList", hList);

        } catch (SQLException e) {
            e.printStackTrace();
            //throw new ServiceException("4002", e.getMessage());
            code="1";
            msg = e.getMessage();
        } catch (Throwable e) {
            e.printStackTrace();
            code ="1";
            msg = "隐患排查查询出错！";
//            throw new ServiceException("4002", "隐患排查查询出错！");
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
     * 新建隐患排查
     * @param map
     * @return
     * @throws ServiceException
     */
    public String funCreateSehHiddenDanger(Map map)throws ServiceException{
        JSONObject json = new JSONObject();
        try {
            UserProfile uProfile = ConfigCache.getInstance().getUserProfile(MapUtil.stringValue(map, Constant.USER_ID));
            JdbcDBUtil jdbc = new JdbcDBUtil();
            //插入数据，获取隐患代码
            json = HiddenDangerServiceSQL.CreateSehHiddenDanger(dataSource,map,uProfile);
            String hiddenNo = json.getString("HIDDEN_DANGER_NO");
            logger.info("hiddenNo==="+hiddenNo);
            //调用审批接口
            map.put("HIDDEN_DANGER_NO",hiddenNo);
            String sql = HiddenDangerServiceSQL.CreateSubappFromApp(map,uProfile);
            logger.info("sql==="+sql);
            boolean ok = jdbc.callProcedure(uProfile.getUserId(),uProfile.getPassWord(),sql);
            if(!ok){
                throw new ServiceException("","提交审批时，数据库出错！");
            }
            //如果上传文件，则进行传入
            if(MapUtil.valueIsNotNull(map,"FILE_NAME")){
                int count = MapUtil.intValue(map,"COUNT");
                //调用文件服务器，返回文件路径
                for(int i=0;i<count;i++){
                    String key = "FILE"+i;
                    String im = MapUtil.stringValue(map,key);
                    String fileName = BaiyinUtils.getImageName("21-6");
                    InputStream in = BaiyinUtils.getImageByte(im);
                    boolean flag = FTPUtil.uploadFile(Global.getFtpIp(), Global.getFtpPort(), Global.getFtpUsername(), Global.getFtpPassword(), Global.getFtpBasePath(), Global.getFtpFilePath(),fileName, in);
                    //保存文件信息
                    map.put("FILE_NAME",fileName);
                    map.put("KEY_REF","CONTRACT="+MapUtil.stringValue(uProfile.getOrgInfo(),"CONTRACT")+"^HIDDEN_DANGER_NO="+MapUtil.stringValue(map,"HIDDEN_DANGER_NO")+"^");
                    sql = HiddenDangerServiceSQL.createDocForApp(map);
                    ok = jdbc.callProcedure(uProfile.getUserId(),uProfile.getPassWord(),sql);
                    if(!ok){
                        throw new ServiceException("","保存文档时，数据库出错！");
                    }
                }

            }
        } catch (ServiceException e) {
            throw new ServiceException("4003", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("4003", e.getMessage());
        }
        return json.toString();
    }
    /**
     * 隐患文档生成
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
            String type="CONTRACT="+(MapUtil.stringValue(map,"CONTRACT"))+"^HIDDEN_DANGER_NO="+(MapUtil.stringValue(map,"HIDDEN_DANGER_NO"))+"^";
            String luName="SehHiddenDanger";
            String sql = HiddenDangerServiceSQL.edmFile(type,luName);
            logger.info("sql=="+sql);
            List<Map> hList = jdbc.query(uProfile.getUserId(), uProfile.getPassWord(), sql);
            if (ListUtil.isEmpty(hList)) {
                code="1";
                msg ="没有查询到隐患排查文档！";
            }
            //将文件本地化
            for(Map m:hList){
                String fileName = BaiyinUtils.genLoacalFile(map,m,uProfile,"/21-6/",url);
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
            msg = "隐患排查文档提取错误！";
            throw new ServiceException("4004", "隐患排查文档出错！");
        }
        try {
            json.put("code", code);
            json.put("msg", msg);
        }catch (Throwable e){
            e.printStackTrace();
        }
        return json.toString();
    }
    public static void main(String[] args){
        System.out.println("System.getProperty(\"user.dir\") "+System.getProperty("user.dir") );
    }
}
