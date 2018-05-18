package com.service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.utility.StringUtil;
import org.json.JSONArray;
import org.json.JSONObject;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.utility.IbatisDBUtil;
import com.utility.JdbcDBUtil;
import com.utility.JsonUtil;

public class CMSService extends AJsonService implements IJsonService {


    /**
     * 获取CMS模型列表
     *
     * @param map TODO
     * @return
     */
    public String getCMSModelList(Map map) throws ServiceException {
        String returnString = "{}";

        try {
            String strSql = "select ID,CANAME from SDICAPP.WEB_CATALOG where ID in (10,11,7)";
            //strSql="select ID,CANAME from SDICAPP.WEB_CATALOG where ID in (11,5,15)";	//5	新闻中心			11	通知公告			15	党建工作

            List<Map> list = new IbatisDBUtil().executeSql(strSql);
            returnString = JsonUtil.mapListToJsonString(list);
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0401", "获取CMS板块列表失败");
        }
        return returnString;
    }

    /**
     * 根据CMS模型获取CMS内容列表
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String getContentlList(Map map) throws ServiceException {
        String returnString = "{}";
        try {
            String id = (String) map.get(Constant.ID);
            String pageNo = (String) map.get(Constant.PAGENO);
            String pageCnt = (String) map.get(Constant.PAGECNT);
            int pageInt = 1;
            if (null != pageNo && pageNo.trim().length() > 0) pageInt = Integer.valueOf(pageNo);
            if (pageInt < 1) pageInt = 1;
            int pageCount = 10;
            if (null != pageCnt && pageCnt.trim().length() > 0) pageCount = Integer.valueOf(pageCnt);
            if (pageCount < 1) pageCount = 1;

            int offset = 0;//页码偏移量
            if (2 == pageInt) {
                pageInt = 1;
                pageCount = 8;
                offset = 2;
            }
            if (pageInt > 2) {
                --pageInt;
            }

            int minValue = (pageInt - 1) * pageCount + offset;
            int maxValue = pageInt * pageCount + offset;
            String serviceSql = "select a.caname,b.ID,b.FILETITLE,b.FILENAME,replace(b.pubdate,'-','/') as pubdate "
                    + "from SDICAPP.WEB_CATALOG a,SDICAPP.WEB_REPOSITORY b"
                    + " where b.state='4' and a.caid=b.caid and a.id "
                    + "in (select id from SDICAPP.WEB_CATALOG "
                    + "where CAID like  (select CAID||'%' from SDICAPP.WEB_CATALOG where id = " + id + ")) "
                    + " order by b.pubdate desc";

            String strSql = "select CANAME,ID,FILETITLE,FILENAME,pubdate from "
                    + "(select c.*,rownum as ROW_NUM from "
                    + "(" + serviceSql + ") c) where ROW_NUM > " + minValue
                    + " and  " + maxValue + " >= ROW_NUM";
            logger.info("strSql==" + strSql);
            List<Map> list = new IbatisDBUtil().executeSql(strSql);
            if("7".equals(id)){
                list = dealTopOneItem(list);
            }
            returnString = JsonUtil.mapListToJsonString(list);

        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0402", "获取CMS内容信息列表失败");
        }

        return returnString;
    }


    /**
     * 图片处理
     * @param list
     * @return
     */
    private List<Map> dealTopOneItem(List<Map> list) {
//        String url = BaiyinUtils.getUrl();
//        logger.info("url=="+url);
        String imageFile = "";
        for (Map map:list) {
            String file = (String) map.get("FILENAME");
            if (StringUtil.isNotBlank(file)) {
                imageFile = url + "/images/" + file;
                map.put("isShow",true);
            }else{
//                imageFile = url+"/images/noneTopNews.jpg";
                map.put("isShow",false);
            }
//            logger.info("imageFile==="+imageFile);
            map.put("FILENAME", imageFile);
        }
        return list;
    }

    /**
     * 根据CMS内容获取详情
     *
     * @param map
     * @return
     */
    public String getContentDetail(Map map) throws ServiceException {
        String returnString = "{}";
        try {
            String id = (String) map.get(Constant.ID);
            String strSql = "select b.ID,case when b.showtitle = 'Y' then '' else b.FILETITLE end FILETITLE,replace(b.pubdate,'-','/') as pubdate,b.sortno,b.filename,"
                    + "b.showtitle,b.readnum,b.SOURCEADDR  "
                    + "from SDICAPP.WEB_REPOSITORY b "
                    + "where  b.filetype in ('I','N') and b.state='4' and b.ID = " + id;
            List<Map> list = new IbatisDBUtil().executeSql(strSql);
            if (null != list && list.size() == 1) {    //todo 若返回多条记录如何处理?
                Map item = (Map) list.get(0);
                JdbcDBUtil jdbc = new JdbcDBUtil();
                String freeSql = "select content from SDICAPP.WEB_REPOSITORY where ID = " + id;
                String content = jdbc.fectchClobString(freeSql);
                //content="abcdefg<?xml:namespace kljljlkj;lj;l;lk />hijklmn";
                content = transFormHtmlContent(content);
                content = instateImage(content);
                item.put("content", content);

                String filename = "" + item.get("filename");
                filename = transImageFilePath(filename);
                item.put("filename", filename);

                returnString = JsonUtil.mapToJsonObject(item).toString();
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0403", "获取CMS内容详细信息失败");
        }

        return returnString;
    }

    /**
     * 替换内容里面插件图标
     * @param content
     * @return
     */
    private String instateImage(String content) {
        //替换pdf图标
        List<String> tList = new ArrayList<String>();
        tList.add("/plugins/ewebeditor/sysimage/icon16/pdf.gif");//gif
        tList.add("/plugins/ewebeditor/sysimage/icon16/doc.gif");//word
        tList.add("/plugins/ewebeditor/sysimage/icon16/xls.gif");//excel
        tList.add("/plugins/ewebeditor/sysimage/icon16/unknow.gif");//unknow
        //在替换之前，首先需要替换掉IP，然后再替换，有些带IP，有些不带IP
        content = content.replaceAll(url+"/plugins/","/plugins/");
        for(String s:tList){
            content = content.replaceAll(s,url+s);
        }
        return content;
    }

    /**
     * 根据id获取点赞列表
     *
     * @param map
     * @return
     */
    public String getPraiseList(Map map) throws ServiceException {
        String returnString = "{}";
        try {
            String id = (String) map.get(Constant.ID);
            String strSql = "select ARTID, USERNAME from SDICAPP.WEB_PRAISELIST "
                    + "where ARTID = " + id
                    + " order by CREATETIME ";
            List<Map> list = new IbatisDBUtil().executeSql(strSql);
            returnString = JsonUtil.mapListToJsonString(list);
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0403", "获取点赞列表失败");
        }

        return returnString;
    }

    /**
     * 根据id点赞
     *
     * @param map
     * @return
     */
    public String doPraise(Map map) throws ServiceException {
        String returnString = "{}";
        String tableName = "web_praiselist.id";
        String id = getPrimaryKey(tableName);
        String artId = (String) map.get(Constant.ID);
        String userId = (String) map.get(Constant.USER_ID);
        String strSql = "select ID from SDICAPP.WEB_PRAISELIST "
                + "where USERCODE = '" + userId + "' "
                + "and ARTID = " + artId;
        List list = new IbatisDBUtil().executeSql(strSql);
        if (null != list && list.size() > 0) {
            throw new ServiceException("0403", "亲！您已经点过赞了哦！");
        }
        try {
            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(userId);
            String userName = userProfile.getNickName();
            String remoteIP = (String) map.get("remoteIP");
            strSql = "insert into SDICAPP.WEB_PRAISELIST"
                    + "(ID, ARTID, USERNAME, USERCODE, CREATETIME, IPADDRESS)"
                    + " values (" + id + ", " + artId + ", '"
                    + userName + "', '" + userId + "', to_char(systimestamp,'YYYY-MM-DD HH24:MI:SS'), '" + remoteIP + "')";
            new IbatisDBUtil().executeSql(strSql);
            strSql = "update SDICAPP.keytable set keyvalue = '" + id
                    + "' where keyname = '" + tableName + "'";
            new IbatisDBUtil().executeSql(strSql);
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0403", "点赞失败");
        }

        return returnString;
    }

    /**
     * 根据id获取评论列表
     *
     * @param map
     * @return
     */
    public String getCommentsList(Map map) throws ServiceException {
        String returnString = "{}";
        try {
            JSONArray jsonArray = new JSONArray();
            String id = (String) map.get(Constant.ID);
            String strSql = "select TO_CHAR(ID) as ID, TO_CHAR(ARTID) as ARTID, "
                    + "USERNAME, USERCODE, COMMENTS, CREATETIME "
                    + "from SDICAPP.WEB_COMMENT "
                    + "where ARTID = " + id + " order by CREATETIME";
            List<Map> list = new IbatisDBUtil().executeSql(strSql);
            for (int i = 0; i < list.size(); i++) {
                Map item = list.get(i);
                String plId = (String) item.get("ID");
                String artID = (String) item.get("ARTID");
                String userName = (String) item.get("USERNAME");
                String userCode = (String) item.get("USERCODE");
                String comments = (String) item.get("COMMENTS");
                String createTime = (String) item.get("CREATETIME");
                String strSubSql = "select ID, ARTID, USERNAME, USERCODE, COMMENTS, CREATETIME "
                        + "from SDICAPP.WEB_COMMENT_HF "
                        + "where ARTID = " + id
                        + " and PINGLUNID = " + plId
                        + " order by CREATETIME";
                List<Map> listSub = new IbatisDBUtil().executeSql(strSubSql);
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("id", plId);
                jsonObject.put("artId", artID);
                jsonObject.put("userName", userName);
                jsonObject.put("loginName", userCode);
                jsonObject.put("comment", comments);
                jsonObject.put("createTime", createTime);
                jsonObject.put("pinglun", JsonUtil.mapListToJsonArray(listSub));

                jsonArray.put(jsonObject);
            }
            returnString = jsonArray.toString();
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0403", "获取评论列表失败");
        }

        return returnString;
    }

    /**
     * 评论及回复评论
     *
     * @param map
     * @return
     */
    public String doComments(Map map) throws ServiceException {
        String returnString = "{}";
        try {
            String tableName = "web_comment.id";
            String tableNameHF = "web_comment_hf.id";
            String commentId = getPrimaryKey(tableName);
            String commentHFId = getPrimaryKey(tableNameHF);
            String artId = (String) map.get(Constant.ID);
            String userId = (String) map.get(Constant.USER_ID);
            String plId = (String) map.get("PingLunID");
            String comments = (String) map.get("comments");

            UserProfile userProfile = ConfigCache.getInstance().getUserProfile(userId);
            String userName = userProfile.getNickName();
            String remoteIP = (String) map.get("remoteIP");
            String strSql = "";
            if (null != plId && Integer.valueOf(plId) == 0) {
                strSql = "insert into SDICAPP.WEB_COMMENT"
                        + "(ID, ARTID, USERNAME, USERCODE, COMMENTS, CREATETIME, IPADDRESS)"
                        + " values (" + commentId + ", " + artId + ", '"
                        + userName + "', '" + userId + "', '" + comments
                        + "', to_char(systimestamp,'YYYY-MM-DD HH24:MI:SS'), '" + remoteIP + "')";
            } else {
                strSql = "insert into SDICAPP.WEB_COMMENT_HF"
                        + "(ID, ARTID, PINGLUNID, USERNAME, USERCODE, COMMENTS, CREATETIME, IPADDRESS)"
                        + " values (" + commentId + ", " + artId + ", '" + plId + "', '"
                        + userName + "', '" + userId + "', '" + comments
                        + "', to_char(systimestamp,'YYYY-MM-DD HH24:MI:SS'), '" + remoteIP + "')";
            }
            new IbatisDBUtil().executeSql(strSql);
            strSql = "update SDICAPP.keytable set keyvalue = '" + commentId
                    + "' where keyname = '" + tableName + "'";
            new IbatisDBUtil().executeSql(strSql);
            strSql = "update SDICAPP.keytable set keyvalue = '" + commentHFId
                    + "' where keyname = '" + tableNameHF + "'";
            new IbatisDBUtil().executeSql(strSql);
        } catch (Exception e) {
            logger.error(e.getMessage());
            e.printStackTrace();
            throw new ServiceException("0403", "评论及回复评论失败");
        }

        return returnString;
    }

    private String getPrimaryKey(String tableName) {

        String returnValue = "";
        String strSql = "select TO_CHAR(KEYVALUE) as KEYVALUE from SDICAPP.keytable "
                + "where keyname = '" + tableName + "'";
        List list = new IbatisDBUtil().executeSql(strSql);
        if (null != list && list.size() == 1) {
            Map item = (Map) list.get(0);
            returnValue = (String) item.get("KEYVALUE");
            int key = (Integer.valueOf(returnValue) + 1);
            returnValue = "" + key;
        }

        return returnValue;
    }

    private String transFormHtmlContent(String content) throws UnsupportedEncodingException {
        content = transImageFilePath(content);

        int beginIndex = 0, endIndex = 0;

        byte[] dirtyHeader = "<?xml:namespace".getBytes(Constant.CHAR_SET_UTF_8);
        byte[] dirtyTailer = "/>".getBytes(Constant.CHAR_SET_UTF_8);
        byte[] source = content.getBytes(Constant.CHAR_SET_UTF_8);
        byte[] target = new byte[source.length];

        if (content.length() < (dirtyHeader.length - dirtyHeader.length)) return content;
        for (int i = 0; i < source.length - dirtyHeader.length; i++) {
            byte[] buff = new byte[dirtyHeader.length];
            System.arraycopy(source, i, buff, 0, buff.length);
            if (Arrays.equals(dirtyHeader, buff)) {
                beginIndex = i;
                break;
            }
        }
        for (int i = beginIndex + 1; i < source.length - dirtyTailer.length; i++) {
            byte[] buff = new byte[dirtyTailer.length];
            System.arraycopy(source, i, buff, 0, buff.length);
            if (Arrays.equals(dirtyTailer, buff)) {
                endIndex = i + dirtyTailer.length;
                break;
            }
        }
        System.arraycopy(source, 0, target, 0, beginIndex);
        System.arraycopy(source, endIndex, target, beginIndex, source.length - endIndex);
		
/*		int beginIndex=content.indexOf(dirtyHeader);
		if(beginIndex>0){
			
			int endIndex=content.indexOf(dirtyTailer,beginIndex);
			String dirty=content.substring(beginIndex, endIndex+2);
			System.out.println("==========================================================================================");
			System.out.println(dirty);
			content=content.replaceAll(dirty, "");
			//content=content.replaceAll("<?", "");
		}*/

        return new String(target, Constant.CHAR_SET_UTF_8);
    }

    private String transImageFilePath(String content) {
        //String ImageHostIP="172.168.1.21";
        //有些images带ip，有些没带，首先处理掉IP
        content = content.replaceAll("http://10.0.12.29/images/","/images/");
        content = content.replaceAll("/images/", url + "/images/");
        return content;
    }
}
