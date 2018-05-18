package com.utility;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author wangyg
 * @date 2017-12-06 10:14:34
 * 处理日期工具类
 */
public class DateUtil {

    public static String getIFSDate(String date) {
//        System.out.println("date==" + date);
        String ifsDate = "";
        try {
            String dateFormat = "yyyy-MM-dd-HH.mm.ss";
            String oldFormat = "yyyy-MM-dd HH:mm:ss";
            SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
            SimpleDateFormat sdf2 = new SimpleDateFormat(oldFormat);
            ifsDate = sdf.format(new Date());
            if (StringUtil.isNotBlank(date)) {
                if (date.length() == 11) {
                    ifsDate = date + "-00.00.00";
                } else if (date.length() > 11) {
                    ifsDate = sdf.format(sdf2.parse(date));
                }
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
//        System.out.println("ifsDate==" + ifsDate);
        return ifsDate;
    }

    /**
     * 日期格式的字符串，转换为想要的日期格式的字符串
     *
     * @param str
     * @param pattern
     * @return
     */
    public static String parseDate(String str, String pattern) {
        String pdate = "";
        try {
            String oldFormat = "yyyy-MM-dd HH:mm:ss";
            SimpleDateFormat sdf2 = new SimpleDateFormat(oldFormat);
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            pdate = sdf.format(sdf2.parse(str));
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return pdate;
    }

    /**
     * 通过传入的字符串已经表达式，转换出对应的日期
     * @param str
     * @param pattern
     * @return
     */
    public static Date parse2Date(String str, String pattern) {
        Date pdate = new Date();
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            pdate = sdf.parse(str);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return pdate;
    }

    /**
     * 日期按照指定格式转换
     *
     * @param date
     * @param pattern
     * @return
     */
    public static String formDate(Date date, String pattern) {
        String fdate = "";

        try {
            if (StringUtil.isBlank(pattern)) {
                pattern = "yyyy-MM-dd";
            }
            fdate = new SimpleDateFormat(pattern).format(date);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return fdate;
    }

    /**
     * 获取当前月份的天数
     *
     * @return
     */
    public static int getCurrentMonthDay() {

        Calendar a = Calendar.getInstance();
        a.set(Calendar.DATE, 1);
        a.roll(Calendar.DATE, -1);
        int maxDate = a.get(Calendar.DATE);
        return maxDate;
    }

    /**
     * 根据 年、月 获取对应的月份 的 天数
     */
    public static int getDaysByYearMonth(int year, int month) {

        Calendar a = Calendar.getInstance();
        a.set(Calendar.YEAR, year);
        a.set(Calendar.MONTH, month - 1);
        a.set(Calendar.DATE, 1);
        a.roll(Calendar.DATE, -1);
        int maxDate = a.get(Calendar.DATE);
        return maxDate;
    }

    /**
     * 根据日期 找到对应日期的 星期几
     */
    public static String getDayOfWeekByDate(String date) {
        String dayOfweek = "-1";
        try {
            SimpleDateFormat myFormatter = new SimpleDateFormat("yyyy-MM-dd");
            Date myDate = myFormatter.parse(date);
            SimpleDateFormat formatter = new SimpleDateFormat("E");
            String str = formatter.format(myDate);
            dayOfweek = str;

        } catch (Exception e) {
            System.out.println("错误!");
        }
        return dayOfweek;
    }

    /**
     * 获取当前时间，默认yyyy-MM-dd
     * @param pattern
     * @return
     */
    public static String getNow(String pattern) {
        String now = "";
        try {
            if(StringUtil.isBlank(pattern)){
                pattern = "yyyy-MM-dd";
            }
            SimpleDateFormat formatter = new SimpleDateFormat(pattern);
            now = formatter.format(new Date());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return now;
    }

    /**
     * 通过日期获取年份
     * @param date
     * @return
     */
    public static int getYear(Date date){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.YEAR);
    }
    /**
     * 通过日期获取月份
     * @param date
     * @return
     */
    public static int getMonth(Date date){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.MONTH)+1;
    }
    /**
     * 通过日期获取当前天
     * @param date
     * @return
     */
    public static int getDay(Date date){
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.DATE);
    }

    /**
     * 获取两个时间之间的分钟数
     * @param d1
     * @param d2
     * @return
     */
    public static long getMinBetweenTwoDate(Date d1,Date d2){
        long min = 0;
        long between=(d2.getTime()-d1.getTime())/1000;//除以1000是为了转换成秒
        min=between/60;
        return min;
    }
    public static void main(String[] args) {
        System.out.println(DateUtil.getNow("yyyy-MM-dd HH:mi:ss"));
    }
}
