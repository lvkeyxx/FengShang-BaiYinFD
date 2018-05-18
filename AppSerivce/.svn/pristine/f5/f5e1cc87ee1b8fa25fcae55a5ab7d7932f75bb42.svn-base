package com.utility;

import com.google.gson.JsonNull;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by wangyg on 2017-12-13.
 */
public class MapUtil {
    /**
     * map中value是否为空，如果空则返回true
     *
     * @param map
     * @param key
     * @return
     */
    public static boolean valueIsNull(Map map, String key) {
        String value = map.get(key)+"";
        if (value == null) {
            return true;
        }
        if (StringUtil.isBlank(value)) {
            return true;
        }
        if ("null".equals(value)) {
            return true;
        }
        return false;
    }

    /**
     * map中的value不为空则返回true
     *
     * @param map
     * @param key
     * @return
     */
    public static boolean valueIsNotNull(Map map, String key) {
        String value = map.get(key)+"";
        if (value == null) {
            return false;
        }
        if (StringUtil.isBlank(value) || "null".equals(value)) {
            return false;
        }
        return true;
    }

    /**
     * 转换为整型
     *
     * @param map
     * @param key
     * @return
     */
    public static int intValue(Map map, String key) {
        int value = 0;
        if (valueIsNotNull(map, key)) {
            value = Integer.parseInt(map.get(key)+"");
        }
        return value;
    }


    /**
     * 返回String类型
     *
     * @param map
     * @param key
     * @return
     */
    public static String stringValue(Map map, String key) {

        String value = "";
        if (valueIsNotNull(map, key)) {
//            System.out.println("map.get(key).toClass==="+map.get(key).getClass().toString());
            value = map.get(key)+"";
        }
        return value;
    }

    /**
     * 转换为java.sql.Date
     *
     * @param map
     * @param key
     * @return
     */
    public static Date dateValue(Map map, String key) {
        Date date = null;
        if (valueIsNull(map, key)) {
            return null;
        }
        String pattern = "yyyy-MM-dd";
        try {
            String dpattern = "";
            String dtime = "";
            String dValue = stringValue(map, key);
            if (dValue.indexOf("年") >= 0) {
                dpattern = "yyyy年MM月dd日";
            } else if (dValue.indexOf("/") >= 0) {
                dpattern = "yyyy/MM/dd";
            } else if (dValue.indexOf("-") >= 0) {
                dpattern = "yyyy-MM-dd";
            }

            if (dValue.indexOf("上午") >= 0 || dValue.indexOf("下午") >= 0) {
                if (dValue.split(":").length == 1) {
                    dValue += ":00:00";
                } else if (dValue.split(":").length == 2) {
                    dValue += ":00";
                }
                dtime = " ahh:mm:ss";
            }
            if (dValue.indexOf("T") >= 0) {
                if (dValue.split(":").length == 1) {
                    dValue += ":00:00";
                } else if (dValue.split(":").length == 2) {
                    dValue += ":00";
                }
                dValue = dValue.replaceAll("T", " ");
                dtime = " HH:mm:ss";
            }
            pattern = dpattern + dtime;
//            System.out.println("pattern===" + pattern);
//            System.out.println("dValue===" + dValue);
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            date = new Date(sdf.parse(dValue).getTime());
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return date;
    }

    /**
     * 转换为double类型
     *
     * @param map
     * @param key
     * @return
     */
    public static Double doubleValue(Map map, String key) {
        Double value = 0d;
        if (valueIsNotNull(map, key)) {
            if (map.get(key) instanceof Double) {
                value = (Double) map.get(key);
            } else {
                value = Double.valueOf(stringValue(map, key));
            }

        }
        return value;
    }

    public static void main(String[] args) {
        Map umap = new HashMap();
        umap.put("datetime", "2017-12-30T12");
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(MapUtil.dateValue(umap, "datetime")));
    }
}
