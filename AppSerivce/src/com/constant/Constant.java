package com.constant;

public class Constant {
    //测试环境
//    public static final String OUTER_IP = "http://10.0.12.73:57001";
//    public static final String INTER_IP = "http://10.0.12.73:57001";
    //正式环境
    public static final String OUTER_IP = "http://61.178.91.96:57001";
    public static final String INTER_IP = "http://10.0.12.80:57001";

    public static final String IFSDOC = "ifsdoc";
    public static final String WEB_ROOT = "/AppSerivce";
    public static final String SERVLET_REAL_PATH = "servletPath";
    public static final String APP_LAST_VERSION = "1.0.9";
    public static final String URL_TYPE="urlType";
    public static final String MSG_SUCCESS_CODE = "0";
    public static final String MSG_SUCCESS_MSG = "成功";
    public static final String ALERT_MSG = "ALERT_MSG";

    public static final String JG_APP_KEY = "fe4f8ab070bb1cdc751a0d1d";
    public static final String JG_MASTER_SECRET = "85fe2f7d569c1512355e3e99";

    public static final String CHAR_SET_UTF_8 = "UTF-8";
    public static final String JSONP_TAG = "callback";

    public static final String USER_ID = "UserID";
    public static final String USER_NAME = "USER_NAME";//用户名
    public static final String DEPT_NO = "DEPT_NO";//部门编码
    public static final String DEPT_NAME = "DEPT_NAME";//部门名称
    public static final String CONTRACT = "CONTRACT";//域编码
    public static final String CONTRACT_NAME = "CONTRACT_NAME";//域名称
    public static final String PASS_WORD = "PassWord";
    public static final String DEVICE_ID = "DeviceID";
    public static final String DEVICE_TYPE = "DeviceType";

    public static final String JM_USER_ID = "JMUserID";
    public static final String JM_PASS_WORD = "JMPassWord";


    public static final String SERVICE_NAME = "ServiceName";
    public static final String TRANS_NAME = "TransName";
    public static final String SIGN_TOKEN = "SignToken";
    //	public static final String NEXT_TOKEN 		= "NextToken";
    public static final String LOGIN_STATUS = "LoginStatus";


    public static final String Index_ID_Group = "IndexIDGroup";
    public static final String INDEX_ID = "IndexID";
    public static final String POWER_TYPE = "PowerType";


    public static final String IFS_ORG_CODE = "ORG_CODE";

    //	IFS审批流程 主键信息
    public static final String IFS_LU_NAME = "LU_NAME";
    public static final String KEY_REF = "KEY_REF";
    public static final String IFS_LINE_NO = "LINE_NO";
    public static final String IFS_STEP_NO = "STEP_NO";

    /**
     * 审批意见
     */
    public static final String IFS_APP_FORM_INFO = "APP_FORM_INFO";
    public static final String IFS_APPROVAL_STATUS = "APPROVAL_STATUS";        //审批状态 : APP or REJ
    /**
     * 审批通过
     */
    public static final String IFS_APPROVAL_APPROVE = "APP";                    //审批通过
    /**
     * 审批拒绝
     */
    public static final String IFS_APPROVAL_REJECT = "REJ";                    //审批拒绝


    public static final String ID = "ID";

    /**
     * 建议
     */
    public static final String SUBJECT = "SUBJECT";
    public static final String CONTENT = "CONTENT";
    public static final String PHONE = "PHONE";

    /**
     * 系统管理
     */
    public static final String APP_VERSION = "APP_VERSION";

    /**
     * cache
     */
    //public static final String SERVER_URI = "SERVER_URI";
    //public static final String WEB_ROOT = "WEB_ROOT";
    public static final String USER_ORGANIZTION = "USER_ORGANIZTION";
    public static final String USER_ADDRESS = "USER_ADDRESS";

    /**
     * 分页
     */
    public static final String PAGENO = "PageNo";
    public static final String PAGECNT = "PageCnt";
    /**
     * cache 总超时分钟数量
     */
    public static final int CACHE_TOTAL_TIMEOUT = 30;
    /**
     * cache 空闲超时分钟数量
     */
    public static final int CACHE_IDLE_TIMEOUT = 10;

    public static final String COMPANY_ID = "GTBJ";
    /**
     * 走势图所传日期格式
     */
    public static final String CHART_COND = "condition";
    public static final boolean USER_BINDE_DEVICE=true;
    static {


    }


}
