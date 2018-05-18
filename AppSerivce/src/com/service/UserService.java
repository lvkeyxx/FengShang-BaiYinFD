package com.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.constant.Global;
import com.utility.*;
import org.json.JSONException;
import org.json.JSONObject;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.dao.UserDAO;
import com.domain.UserDomain;
import com.domain.UserProfile;
import com.exception.ServiceException;

public class UserService extends AJsonService implements IJsonService {

    private UserDAO userDAO;

    public UserDAO getUserDAO() {
        return userDAO;
    }

    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public String login(Map map) throws ServiceException {

        String userId = (String) map.get(Constant.USER_ID);
        String passWord = (String) map.get(Constant.PASS_WORD);
        String deviceId = (String) map.get(Constant.DEVICE_ID);
        String signToken;
        int loginStatus = 0;
//        boolean isUserBindedDevice = true;
        List<Map> sec = new ArrayList<Map>();
        JSONObject jsonResult = new JSONObject();
        try {
            //步骤1:	将SSO LDAP用户 同步到 APP用户
            //			batchResigerAppUser();

            //步骤2:	验证APP用户是否可用
            //			if(!validateAppUser(userId)) throw new ServiceException("0101","对不起，您不是有效的APP用户!");

            //步骤3: 与SSO认证，认证成功后 userProfile对象写入 用户姓名（nickname）
            UserProfile userProfile = new UserProfile(userId, passWord, deviceId);
            if (validateSSOUserNew(userProfile)) {
                //步骤3: 根据userId生成 token
                String tokenFeed = getTokenFeed(userProfile);
                signToken = TokenUtils.makeToken(tokenFeed);
                //复查token的有效性，不是必须的步骤
                if (!TokenUtils.checkToken(tokenFeed, signToken)) throw new ServiceException("0102", "生成令牌错误，请重试！");

                //步骤4：	注册device和userId	,前提要求app用户表的login_name已经存在，即 login_name=userId
                //syncAPPOrgInfo();
                //确保app用户表中已经存在 userId
//                syncAPPUserInfo(userProfile);
                //获取当前用户的域以及部门编码
                userProfile.setOrgInfo(this.getContract(userId, userProfile.getPassWord()));

                //获取用户权限
                sec = getSecurity(userId);
                //步骤2:	验证APP用户是否可用
//                if (!validateAppUser(userId)) throw new ServiceException("0101", "对不起，您不是有效的APP用户!");

                //步骤5：	针对绑定了设备的用户,检查其使用设备的合法性
                //如果设备号存在、登录号也存在，并且是同一条数据，则正常
                //如果不是同一条数据，则需要提示当前设备已由xx登录。
                //如果设备没查询到数据，代码也没有查询到
                boolean needValidate = true;
                if (Constant.USER_BINDE_DEVICE) {//如果需要验证时才会验证

                    Map<String, String> deviceMap = getUserDeviceMap(userId);
                    if (null != deviceMap && deviceMap.size() > 0) {
                        if (deviceMap.containsKey("*")) {
                            needValidate = false;
                        } else {
                            if (deviceMap.size() > 1) {
                                throw new ServiceException("0103", "您的账号【" + userId + "】已经绑定了多个设备，请联系管理员解除！");
                            }
                            if (!deviceMap.containsKey(deviceId)) {//说明这个设备是绑定这个账号
                                throw new ServiceException("0103", "您的账号【" + userId + "】已在其他设备登录，请先解绑！");
                            }
                        }
                    }
                    deviceMap = getUserDeviceMapByDevice(deviceId);
                    if (null != deviceMap && deviceMap.size() > 0) {
                        if (deviceMap.containsKey("*")) {
                            needValidate = false;
                        } else {
                            if (deviceMap.size() > 1) {
                                Set<String> get = deviceMap.keySet();
                                String lname = "";
                                for (String t : get) {
                                    lname += t + ";";
                                }
                                throw new ServiceException("0103", "此设备已经登录了如下号码【" + lname + "】，请联系管理员解除！");
                            }
                            if (!deviceMap.containsKey(userId)) {//说明这个设备是绑定这个账号
                                Set<String> get = deviceMap.keySet();
                                String lname = "";
                                for (String t : get) {
                                    lname += t + "";
                                }
                                throw new ServiceException("0103", "此设备已经登录了如下号码【" + (lname) + "】，请联系管理员解除");
                            }
                        }
                    }
                }
                //设备信息
                if (needValidate) {//如果需要验证，则插入，否则不予插入
                    registerUserDevice(deviceId, userId);
                }
                //步骤6：	检查	userId 是否重复登录
                UserProfile upCache = ConfigCache.getInstance().getUserProfile(userId);
                if (null != upCache && upCache.getUserId().equals(userId)) {
                    //对于已经绑定到该userId的设备，即白名单允许重复登录、同时在线
                    //if(!findUserDevice(deviceId,userId))	throw new ServiceException("0103","不要在未认证的设备上重复登录,请休息"+Constant.CACHE_IDLE_TIMEOUT+"分钟后请再次登录");
                    if (null != upCache.getDeviceId()) {    //当前缓存在服务器后台的用户信息，即在线的活动用户有  设备ID号码
                        boolean isCurrentDevice = (null != deviceId && deviceId.equals(upCache.getDeviceId()));

                        if (!isCurrentDevice) {
                            map.put(Constant.ALERT_MSG, "系统检测出您已经在新设备上重复登录，在之前的设备上的登录信息将失效");
                        }
						/*						if(isUserBindedDevice){
							if(!isCurrentDevice){					
								map.put(Constant.ALERT_MSG, "系统检测出您已经在新设备上重复登录，在之前的设备上的登录信息将失效");
							}
							
						}else{						
							
							if(isCurrentDevice)
								throw new ServiceException("0104","请不要重复登录,若是异常退出请休息"+Constant.CACHE_IDLE_TIMEOUT+"分钟后请再次登录");
							else
								throw new ServiceException("0105","请不要在新设备上重复登录");	
						}*/

                    } else {
                        throw new ServiceException("0106", "系统检测出您已经在线");
                    }
                }
                //步骤7：	保存userID cache信息
                ConfigCache.getInstance().setUserProfile(userId, userProfile);
                loginStatus = 1;

                //步骤8：	同步极光信息
                //				syncJGUserInfo(userProfile);

            } else {
                throw new ServiceException("0108", "用户名或密码为空，或两者不匹配，登录失败");
            }

            jsonResult.put(Constant.LOGIN_STATUS, loginStatus);
            jsonResult.put(Constant.USER_ID, userId);
            jsonResult.put(Constant.SIGN_TOKEN, signToken);
            jsonResult.put("attendenceReasonDay", Global.getAttendenceReasonDay());
            jsonResult.put("sec", sec);
            jsonResult.put(Constant.USER_NAME, MapUtil.stringValue(userProfile.getOrgInfo(), "USER_NAME"));
            jsonResult.put(Constant.DEPT_NO, MapUtil.stringValue(userProfile.getOrgInfo(), "DEPT_NO"));
            jsonResult.put(Constant.DEPT_NAME, MapUtil.stringValue(userProfile.getOrgInfo(), "DEPT_NAME"));
            jsonResult.put(Constant.CONTRACT, MapUtil.stringValue(userProfile.getOrgInfo(), "CONTRACT"));
            jsonResult.put(Constant.CONTRACT_NAME, MapUtil.stringValue(userProfile.getOrgInfo(), "CONTRACT_NAME"));

        } catch (JSONException e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0109", "登录失败");
        }

        return jsonResult.toString();
    }

    /**
     * 同步APP用户信息，密码是关键信息、
     * <p>
     * //@param userProfile
     */
    /*private void syncAPPUserInfo(UserProfile userProfile) throws ServiceException {
//			if(null==userProfile) return;

        try {
            String userId = userProfile.getUserId();
            String passWord = userProfile.getPassWord();
            String nickName = userProfile.getNickName();
            String orgId = userProfile.getOrgId();

            String strSql = "SDICAPP.SDIC_APP_USER where LOGIN_NAME = '" + userId + "'";
            List<Map> list = new IbatisDBUtil().queryTable(strSql);
            if (null == list || list.size() <= 0) {
                strSql = "insert into SDICAPP.SDIC_APP_USER(USER_ID,ORG_ID,USER_NAME,LOGIN_NAME,PASSWORD,ISDELETE) "
                        + "values ((select max(USER_ID)+1 from SDICAPP.SDIC_APP_USER),"
                        + "(select ORG_ID from SDICAPP.SDIC_APP_ORG where IFS_ORG_ID = '" + orgId + "'), '"
                        + nickName + "','"
                        + userId + "','"
                        + passWord + "','1')";
            } else {
                strSql = "update SDICAPP.SDIC_APP_USER set "
                        + " ORG_ID = (select ORG_ID from SDICAPP.SDIC_APP_ORG where IFS_ORG_ID = '" + orgId + "'),"
                        + " USER_NAME = '" + nickName + "',"
                        + " LOGIN_NAME = '" + userId + "',"
                        + " PASSWORD = '" + passWord + "'"
                        + " where LOGIN_NAME = '" + userId + "'";
            }
            new IbatisDBUtil().executeSql(strSql);

        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
//				throw new ServiceException("0107","UserService.registerUserDevice() 调用失败");
        }
    }*/

    /*private void syncAPPOrgInfo() throws ServiceException {

        try {
            //获取已有的组织机构列表
            String strSql = "select IFS_ORG_ID,ORG_NAME from SDICAPP.SDIC_APP_ORG";
            List orgList = new IbatisDBUtil().executeSql(strSql);

            //获取最新的组织机构列表
            Set set = new HashSet();
            UserAuthenticate ua = new UserAuthenticate();
            Map map = ua.getSSOUserMap();
            Iterator iter = map.keySet().iterator();
            while (iter.hasNext()) {
                String key = "" + iter.next();
                Map item = (Map) map.get(key);
                if (null != item) {
                    Map orgInfoMap = new HashMap();
                    orgInfoMap.put("IFS_ORG_ID", (String) item.get("orgId"));
                    orgInfoMap.put("ORG_NAME", (String) item.get("orgName"));
                    set.add(orgInfoMap);
                }
            }

            //将原有的组织机构从最新的组织机构列表中剔除
            Iterator iterSet = set.iterator();
            while (iterSet.hasNext()) {
                Map item = (Map) iterSet.next();
                for (int i = 0; i < orgList.size(); i++) {
                    Map orgMap = (Map) orgList.get(i);
                    String key = (String) orgMap.get("IFS_ORG_ID");
                    String keySet = (String) item.get("IFS_ORG_ID");
                    if (null != item && keySet.equals(key)) {
                        iterSet.remove();
                    }
                }
            }

            //更新组织机构列表
            iterSet = set.iterator();
            while (iterSet.hasNext()) {
                Map orgMap = (Map) iterSet.next();
                String ifsOrgId = (String) orgMap.get("IFS_ORG_ID");
                String orgName = (String) orgMap.get("ORG_NAME");
                String shortName = orgName;
                int sort = 0;
                int parentId = 1;

                strSql = "insert into SDICAPP.SDIC_APP_ORG(org_id,org_name,parent_id,short_name,sort,IFS_ORG_ID) values ((select max(org_id)+1 from SDICAPP.SDIC_APP_ORG),'"
                        + orgName + "'," + parentId + ",'"
                        + shortName + "',"
                        + sort + ",'"
                        + ifsOrgId + "')";
                new IbatisDBUtil().executeSql(strSql);
            }

            //更新字段parent_id
            strSql = "select ORG_ID,IFS_ORG_ID from SDICAPP.SDIC_APP_ORG where org_id > 1";
            List org = new IbatisDBUtil().executeSql(strSql);
            for (int i = 0; i < org.size(); i++) {
                Map orgMap = (Map) org.get(i);
                BigDecimal orgId = (BigDecimal) orgMap.get("ORG_ID");
                String ifsOrgId = (String) orgMap.get("IFS_ORG_ID");
                String[] parentIds = ifsOrgId.split("-");
                String parentId = "00";
                int parentIdLen = parentIds.length;
                if (null != parentIds && parentIdLen > 1) parentId = parentIds[parentIdLen - 2];
                strSql = "update SDICAPP.SDIC_APP_ORG set parent_id = "
                        + "(select org_id from SDICAPP.SDIC_APP_ORG where IFS_ORG_ID='" + parentId + "') "
                        + "where org_id > 1 and org_id = " + orgId;
                new IbatisDBUtil().executeSql(strSql);
            }

            //更新字段sort
            strSql = "update SDICAPP.SDIC_APP_ORG set sort = org_id";
            new IbatisDBUtil().executeSql(strSql);

        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
//			throw new ServiceException("0107","UserService.syncAPPOrgInfo() 调用失败");
        }
    }*/

    /*private boolean validateSSOUser(UserProfile userProfile) {
        String userId = userProfile.getUserId();
        String pswd = userProfile.getPassWord();

        UserAuthenticate ua = new UserAuthenticate();
        Map map = ua.getSSOUserMap();
        if (map.containsKey(userId)) {
            Map user = (Map) map.get(userId);
            String password = (String) user.get("utrustpwd");

            if (pswd.equals(password)) {
                userProfile.setProperties(user);
                return true;
            }
        }
        return false;
    }
*/
    private boolean validateSSOUserNew(UserProfile userProfile) {
        String userId = userProfile.getUserId();
        String pswd = userProfile.getPassWord();

        String strSql = "select * from dual";

        JdbcDBUtil jdbc = new JdbcDBUtil();
        boolean bRc = false;
        try {
            bRc = jdbc.callProcedure(userId, pswd, strSql);
            if (bRc) {
                UserDomain user = new UserDomain();
                user.setPersonId(userId);
                List<UserDomain> list = userDAO.getRecordList(user);
                if (null != list && list.size() > 0) {
                    Map userMap = (Map) list.get(0);
                    userProfile.setProperties(userMap);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return bRc;
    }

    private void registerUserDevice(String deviceId, String userId) throws ServiceException {
        if (null == deviceId || deviceId.trim().length() <= 0) return;
        try {
            String strSql = "IFSAPP.SDIC_APP_USER_DEVICE where DEVICE_ID = '" + deviceId + "' and LOGIN_NAME = '" + userId + "'";
            List<Map> list = new IbatisDBUtil().queryTable(strSql);
            if (null == list || list.size() <= 0) {
                strSql = "insert into IFSAPP.SDIC_APP_USER_DEVICE_TAB(USER_ID,DEVICE_ID,LOGIN_NAME,rowversion,register_time,isdelete) values (0,'"
                        + deviceId + "','"
                        + userId + "',sysdate,sysdate,'1')";
                new IbatisDBUtil().executeSql(strSql);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * 通过用户名查询设备及用户名
     *
     * @param userId
     * @return
     * @throws ServiceException
     */
    private Map<String, String> getUserDeviceMap(String userId) throws ServiceException {
        Map map = new HashMap();

        if (null == userId || userId.trim().length() <= 0) return map;
        try {
            String strSql = "select DEVICE_ID,LOGIN_NAME from ifsapp.SDIC_APP_USER_DEVICE where ISDELETE='1' and LOGIN_NAME = '" + userId + "'";
            List<Map> list = new IbatisDBUtil().executeSql(strSql);
            if (null != list && list.size() > 0) {
                for (int i = 0; i < list.size(); i++) {
                    Map item = (Map) list.get(i);
                    String deviceId = "" + item.get("DEVICE_ID");
                    map.put(deviceId, deviceId);
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
//			throw new ServiceException("0107","UserService.registerUserDevice() 调用失败");
        }
        return map;
    }

    /**
     * 通过设备号查询设备及人的对应关系
     *
     * @param device
     * @return
     * @throws ServiceException
     */
    private Map<String, String> getUserDeviceMapByDevice(String device) throws ServiceException {
        Map map = new HashMap();
        try {
            String strSql = "select DEVICE_ID,LOGIN_NAME from ifsapp.SDIC_APP_USER_DEVICE where ISDELETE='1' and DEVICE_ID = '" + device + "'";
            List<Map> list = new IbatisDBUtil().executeSql(strSql);
            if (null != list && list.size() > 0) {
                for (int i = 0; i < list.size(); i++) {
                    Map item = (Map) list.get(i);
                    String login_name = "" + item.get("LOGIN_NAME");
                    map.put(login_name, login_name);
                }
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
//			throw new ServiceException("0107","UserService.registerUserDevice() 调用失败");
        }
        return map;
    }

    /*private boolean validateAppUser(String userId) throws ServiceException {
        boolean rc = false;
        if (null == userId || userId.trim().length() <= 0) return rc;
        try {
            String strSql = "SDICAPP.SDIC_APP_USER where isdelete = '1' and LOGIN_NAME = '" + userId + "'";
            List<Map> list = new IbatisDBUtil().queryTable(strSql);
            if (null != list && list.size() > 0) {
                rc = true;
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            String code = "0198";
            String message = e.getMessage();
            if (null != message && message.indexOf("ORA-01017") >= 0) {
                code = "0199";
                message = "系统严重错误：访问App数据库用户名ifsapp与密码不符，请您立即与系统管理员联系";
            }
            throw new ServiceException(code, message);
        }
        return rc;
    }*/

    public String logout(Map map) throws ServiceException {

        String userId = (String) map.get(Constant.USER_ID);
        String signToken = (String) map.get(Constant.SIGN_TOKEN);
        int loginStatus = 1;

        JSONObject jsonResult = new JSONObject();
        try {

            if ((null != userId) && userId.trim().length() > 0) {
                ConfigCache.getInstance().removeUserProfile(userId);
                loginStatus = 0;
                signToken = "";
            }

            jsonResult.put(Constant.LOGIN_STATUS, loginStatus);
            jsonResult.put(Constant.USER_ID, userId);
            jsonResult.put(Constant.SIGN_TOKEN, signToken);

        } catch (JSONException e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0104", "登出失败，请重试");
        }

        return jsonResult.toString();
    }

    public String getOrganiztionList(Map map) throws ServiceException {

        String returnString = "{}";

        String strSql = " select distinct ORG_CODE,COMPANY_ORG_API.GET_ORG_NAME(COMPANY_ID,ORG_CODE) as ORG_NAME"
                + " from ifsapp.COMPANY_PERSON cp where org_code is not null and org_code != '99' "
                + " order by ORG_CODE";
        try {
            String organiztion = (String) ConfigCache.getInstance().getMapSysConfig(Constant.USER_ORGANIZTION);
            if (null != organiztion && organiztion.equals("")) return organiztion;
            List<Map> list = new IbatisDBUtil().executeSql(strSql);

            returnString = JsonUtil.mapListToJsonString(list);
            ConfigCache.getInstance().setMapSysConfig(Constant.USER_ORGANIZTION, returnString);
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0111", "获取组织列表信息失败");
        }

        return returnString;
    }

    /**
     * 根据指定的 ORG_CODE 获取部门的地址
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String getAddressList(Map map) throws ServiceException {

        String returnString = "{}";

        String ORG_CODE = (String) map.get(Constant.IFS_ORG_CODE);
        if (null == ORG_CODE || ORG_CODE.trim().length() <= 0)
            throw new ServiceException("0106", "机构编码 ORG_CODE 不能为空，调用失败");

        UserDomain user = new UserDomain();
        user.setOrgCode(ORG_CODE);

        String cacheId = Constant.USER_ADDRESS + strMethod + ORG_CODE;

        try {
            returnString = (String) ConfigCache.getInstance().getSystemCache(cacheId);
            if (null == returnString || returnString.trim().length() <= 0) {
                List<UserDomain> list = userDAO.getRecordList(user);

                returnString = JsonUtil.mapListToJsonString(list);
                ConfigCache.getInstance().setSystemCache(cacheId, returnString);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0112", "查询指定部门的通讯录 失败");
        }

        return returnString;
    }

    public String getAllAddressInfo(Map map) throws ServiceException {

        String returnString = "{}";

        UserDomain user = new UserDomain();
        user.setOrgCode(null);

        try {
            returnString = (String) ConfigCache.getInstance().getSystemCache(Constant.USER_ADDRESS + strMethod);
            if (null == returnString || returnString.trim().length() <= 0) {
                List<UserDomain> list = userDAO.getRecordList(user);

                returnString = JsonUtil.mapListToJsonString(list);
                ConfigCache.getInstance().setSystemCache(Constant.USER_ADDRESS + strMethod, returnString);
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0113", "查询全部人员通讯录 失败");
        }

        return returnString;
    }

    /**
     * 根据登录UserID获得地址信息
     *
     * @param personId
     * @return
     * @throws ServiceException
     */
    public JSONObject getAddressInfoById(String personId) throws ServiceException {

        JSONObject json = new JSONObject();

        UserDomain user = new UserDomain();
        user.setPersonId(personId);

        try {
            List<UserDomain> list = userDAO.getRecordList(user);
            if (null != list) {
                Map map = (Map) list.get(0);
                json = JsonUtil.mapToJsonObject(map);
            }

        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0114", "查询" + personId + "的通讯录 失败");
        }

        return json;
    }

    /**
     * 通过个人代码查询对应的域及部门编码
     *
     * @param personId
     * @return
     * @throws ServiceException
     */
    public Map getContract(String personId, String password) throws ServiceException {
        Map map = new HashMap();
        try {
            String sql = " SELECT T.CONTRACT,T.CONTRACT_NAME," +
                    " T.COMPANY_ID,T.person_id USER_ID," +
                    " T.employee_name USER_NAME,T.ORG_CODE DEPT_NO," +
                    " T.DEPT_NAME DEPT_NAME " +
                    " FROM ifsapp.COMPANY_PERSON_APP T " +
                    " WHERE T.person_id='" + personId + "'";
//            JdbcDBUtil jdbc = new JdbcDBUtil();
            List<Map> uList = new IbatisDBUtil().executeSql(sql);
            if (ListUtil.isNotEmpty(uList)) {
                map = uList.get(0);
            }
        } catch (Throwable e) {
            logger.error("", e);
            e.printStackTrace();
            throw new ServiceException("0115", "查询" + personId + "的域及部门编码出错 失败");
        }
        return map;
    }

    /**
     * 获取人员权限
     *
     * @param personId
     * @return
     * @throws ServiceException
     */
    public List<Map> getSecurity(String personId) throws ServiceException {
        List<Map> uList = new ArrayList<Map>();
        try {
            String sql = " select C.SECURITY_NO SEC_NO,C.DESCRIPTION SEC_NAME " +
                    " from ifsapp.C_APP_SECURITY c, " +
                    " ifsapp.C_APP_SECURITY_GROUP cg," +
                    " ifsapp.DOCUMENT_GROUP g, " +
                    " ifsapp.DOCUMENT_GROUP_MEMBERS m " +
                    " where c.security_no=cg.security_no " +
                    " and cg.group_id=g.group_id " +
                    " and g.group_id=m.group_id " +
                    "and m.person_id='" + personId + "'";
            uList = new IbatisDBUtil().executeSql(sql);
        } catch (Throwable e) {
            logger.error("", e);
            e.printStackTrace();
            throw new ServiceException("0116", "查询" + personId + "的权限出错 失败");
        }
        return uList;
    }

    public static void main(String[] args) throws ServiceException {
//		new UserService().syncAPPOrgInfo();
//		new UserService().batchResigerAppUser();
        Map map = new HashMap();
        map.put("1", "1");
        map.put("2", "2");
        map.put("3", "3");
        System.out.println("map.size==" + map.size());
    }
}