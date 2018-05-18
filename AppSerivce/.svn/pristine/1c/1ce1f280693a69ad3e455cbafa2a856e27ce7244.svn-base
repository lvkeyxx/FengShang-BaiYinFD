package com.constant;

import com.google.common.collect.Maps;
import com.utility.PropertiesLoader;
import org.apache.commons.lang.StringUtils;

import java.util.Map;

public class Global {
    public static Global global;
    /**
     * 保存全局属性值
     */
    private static Map<String, String> map = Maps.newHashMap();

    /**
     * 属性文件加载对象
     */
    private static PropertiesLoader propertiesLoader = new PropertiesLoader("baiyin.properties");

    /**
     * 获取当前对象实例
     */
    public static Global getInstance() {
        return global;
    }

    /**
     * 获取配置
     */
    public static String getConfig(String key) {
        String value = map.get(key);
        if (value == null){
            value = propertiesLoader.getProperty(key);
            map.put(key, value != null ? value : StringUtils.EMPTY);
        }
        return value;
    }
    /**
     * 获取weatherAk
     * 天气中百度的ak
     */
    public static String getWeatherAk() {
        return getConfig("weatherAk");
    }

    /**
     * 获取ftpIp
     * @return
     */
    public static String getFtpIp() {
        return getConfig("ftpIp");
    }

    /**
     * 获取FTP端口
     * @return
     */
    public static int getFtpPort() {
        return Integer.parseInt(getConfig("ftpPort"));
    }

    /**
     * ftp用户名
     * @return
     */
    public static String getFtpUsername() {
        return getConfig("ftpUsername");
    }

    /**
     * 获取ftp密码
     * @return
     */
    public static String getFtpPassword() {
        return getConfig("ftpPassword");
    }

    /**
     * 获取FTP基础路径
     * @return
     */
    public static String getFtpBasePath() {
        return getConfig("ftpBasePath");
    }

    /**
     * 获取FTP文件路径
     * @return
     */
    public static String getFtpFilePath() {
        return getConfig("ftpFilePath");
    }

    /**
     * 获取缺勤理由填写的天数
     * @return
     */
    public static String getAttendenceReasonDay() {
        return getConfig("attendenceReasonDay");
    }

}
