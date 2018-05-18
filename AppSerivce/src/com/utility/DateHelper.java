package com.utility;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

/*
 * 日期帮助类
 * @author boob
 *
 * TODO To change the template for this generated type comment go to Window -
 * Preferences - Java - Code Style - Code Templates
 */
public class DateHelper {
	static final String YYYY="年", MM="月",QQ="季",DD="日",HH="时";
	// 系统默认日期格式
	public static final String DATE_FORMAT = "yyyy-MM-dd";

	// 系统默认日期时间格式
	public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

	// 8位日期格式
	public static final String DATE_FORMAT_8 = "yyyyMMdd";
	
	// 10为日期时间格式
	public static final String DATE_TIME_FORMAT_10 = "yyyyMMddHH";

	// 14为日期时间格式
	public static final String DATE_TIME_FORMAT_14 = "yyyyMMddHHmmss";
	
	// 6为日期时间格式
	public static final String DATE_TIME_FORMAT_6 = "MMddHH";
	
	// 9为日期时间格式
	public static final String DATE_TIME_FORMAT_9 = "MM" + MM + "dd" + DD + "HH" + HH;

	// 系统默认日起时间格式
	public static final String TIME_FORMAT = "HH:mm:ss";

	// 系统默认日起时间格式
	public static final String TIME_FORMAT_6 = "HHmmss";

	public final static String YEAR = " year ";

	public final static String MONTH = " month ";

	public final static String DAY = " day ";

	public final static String WEEK = " week ";

	public final static String HOUR = " hour ";

	public final static String MINUTE = " minute ";

	public final static String SECOND = " second ";

	/**
	 * 默认的日期格式
	 */
	public static String DEFAULT_DATE_FORMAT = "yyyyMMdd";

	/**
	 * 取得当前日期
	 *
	 * @return Date 当前日期
	 */
	public static Date getCurrentDate() {
		return new Date(System.currentTimeMillis());
	}

	/**
	 * 返回当前日期对应的默认格式的字符串
	 *
	 * @return String 当前日期对应的字符串
	 */
	public static String getCurrentStringDate() {
		return convertDate2String(getCurrentDate(), DEFAULT_DATE_FORMAT);
	}

	/**
	 * 返回当前日期对应的指定格式的字符串
	 *
	 * @param dateFormat -
	 *            日期格式
	 * @return String 当前日期对应的字符串
	 */
	public static String getCurrentStringDate(String dateFormat) {
		return convertDate2String(getCurrentDate(), dateFormat);
	}

	/**
	 * 返回当前日期对应的默认格式的BigDecimal
	 *
	 * @return
	 */
	public static BigDecimal getCurrentBigDecimalDate() {
		return convertString2BigDecimal(getCurrentStringDate(DateHelper.DATE_FORMAT_8));
	}

	/**
	 * 返回当前时间对应的默认格式的BigDecimal
	 *
	 * @return
	 */
	public static BigDecimal getCurrentBigDecimalTime() {
		return convertStringTime2BigDecimal(getCurrentStringDate(DateHelper.TIME_FORMAT_6));
	}

	/**
	 * 将日期转换成指定格式的字符串
	 *
	 * @param date -
	 *            要转换的日期
	 * @param dateFormat -
	 *            日期格式
	 * @return String 日期对应的字符串
	 */
	public static String convertDate2String(Date date, String dateFormat) {
		if (null == date)
			date = new Date(0);
		Locale locale = Locale.US;
		SimpleDateFormat sdf = null;
		if (dateFormat != null && !dateFormat.equals("")) {
			try {
				sdf = new SimpleDateFormat(dateFormat, locale);
			} catch (Exception e) {
				// System.out.println(e.getMessage());
				sdf = new SimpleDateFormat(DEFAULT_DATE_FORMAT, locale);
			}
		} else {
			sdf = new SimpleDateFormat(DEFAULT_DATE_FORMAT, locale);
		}
		return sdf.format(date);
	}

	/**
	 * 将日期转换成默认格式（yyyyMMdd）的字符串
	 *
	 * @param date -
	 *            要转换的日期
	 * @return String 日期对应的字符串
	 */
	public static String convertDate2String(Date date) {
		return convertDate2String(date, DEFAULT_DATE_FORMAT);
	}

	/**
	 * 将字符串转换成日期
	 *
	 * @param stringDate -
	 *            要转换的字符串格式的日期
	 */
	public static BigDecimal convertString2BigDecimal(String stringDate) {
		return new BigDecimal(convertDate2String(convertString2Date(stringDate,
				DATE_FORMAT), DATE_FORMAT_8));
	}

	/**
	 * 将字符串转换成时间
	 *
	 * @param stringDate -
	 *            要转换的字符串格式的时间
	 */
	public static BigDecimal convertStringTime2BigDecimal(String stringDate) {
		return new BigDecimal(convertDate2String(convertString2Date(stringDate,
				TIME_FORMAT), TIME_FORMAT_6));
	}
	/**
	 * 将字符串日期转换成 BigDecimal 日期
	 * @param stringDate
	 * @param srcFormat
	 * @param desFormat
	 * @return	BigDecimal
	 */
	public static BigDecimal convertString2BigDecimal(String stringDate,
			String srcFormat, String desFormat) {
		return new BigDecimal(convertDate2String(convertString2Date(stringDate,
				srcFormat), desFormat));
	}
	/**
	 * 将字符串日期转换成字符串日期
	 * @param stringDate
	 * @param srcFormat
	 * @param desFormat
	 * @return	String
	 */
	public static String convertString2String(String stringDate,
			String srcFormat, String desFormat) {
		return convertDate2String(convertString2Date(stringDate,srcFormat), desFormat);
	}
	/**
	 * 将字符串转换成日期
	 *
	 * @param stringDate -
	 *            要转换的字符串格式的日期
	 * @param dateFormat -
	 *            要转换的字符串对应的日期格式
	 * @return Date 字符串对应的日期
	 */
	public static Date convertBigDecimal2Date(BigDecimal bdDate,
			String srcFormat, String desFormat) {
		return convertString2Date(bdDate.toString(), desFormat);
	}

	/**
	 * 将字符串转换成日期
	 *
	 * @param stringDate -
	 *            要转换的字符串格式的日期
	 * @param dateFormat -
	 *            要转换的字符串对应的日期格式
	 * @return Date 字符串对应的日期
	 */
	public static String convertBigDecimal2String(BigDecimal bdDate) {
		if (null == bdDate) {
			return getCurrentStringDate(DATE_FORMAT);
		}
		return formatStringDate(bdDate.toString(), DATE_FORMAT_8, DATE_FORMAT);
	}

	/**
	 * 将字符串转换成时间
	 *
	 * @param stringDate -
	 *            要转换的字符串格式的时间
	 * @param dateFormat -
	 *            要转换的字符串对应的时间格式
	 * @return Date 字符串对应的时间
	 */
	public static String convertBigDecimalT2String(BigDecimal bdDate) {
		if (null == bdDate) {
			return getCurrentStringDate(TIME_FORMAT);
		}
		return formatStringDate(bdDate.toString(), TIME_FORMAT_6, TIME_FORMAT);
	}

	/**
	 * 将字符串转换成日期
	 *
	 * @param stringDate -
	 *            要转换的字符串格式的日期
	 * @param dateFormat -
	 *            要转换的字符串对应的日期格式
	 * @return Date 字符串对应的日期
	 */
	public static Date convertString2Date(String stringDate, String dateFormat) {
		if (null == stringDate || stringDate.length() <= 0)
			return new Date(0);
		Locale locale = Locale.US;
		SimpleDateFormat sdf = null;
		if (dateFormat != null && !dateFormat.equals("")) {
			try {
				sdf = new SimpleDateFormat(dateFormat, locale);
			} catch (Exception e) {
				// System.out.println(e.getMessage());
				sdf = new SimpleDateFormat(DEFAULT_DATE_FORMAT, locale);
			}
		} else {
			sdf = new SimpleDateFormat(DEFAULT_DATE_FORMAT, locale);
		}
		try {
			return sdf.parse(stringDate);
		} catch (ParseException pe) {
			// System.out.println(pe.getMessage());
			return new Date(System.currentTimeMillis());
		}
	}

	/**
	 * 将一种格式的日期字符串转换成默认格式的日期字符串
	 *
	 * @param oldStringDate -
	 *            要格式化的日期字符串
	 * @param oldFormat -
	 *            要格式化的日期的格式
	 * @return String 格式化后的日期字符串
	 */
	public static String formatStringDate(String oldStringDate, String oldFormat) {
		return convertDate2String(convertString2Date(oldStringDate, oldFormat),
				DEFAULT_DATE_FORMAT);
	}

	/**
	 * 将一种格式的日期字符串转换成另一种格式的日期字符串
	 *
	 * @param oldStringDate -
	 *            要格式化的日期字符串
	 * @param oldFormat -
	 *            要格式化的日期的格式
	 * @param newFormat -
	 *            格式化后的日期的格式
	 * @return String 格式化后的日期字符串
	 */
	public static String formatStringDate(String oldStringDate,
			String oldFormat, String newFormat) {
		return convertDate2String(convertString2Date(oldStringDate, oldFormat),
				newFormat);
	}
	/**
	 *
	 * @param oldDate
	 * @param newFormat
	 * @return
	 */
	public static String formatDate(Date oldDate,String newFormat) {
		return convertDate2String(oldDate,newFormat);
	}
	/**
	 * 计算两个日期的天数差值
	 *
	 * @param beginDate -
	 *            开始日期
	 * @param endDate -
	 *            结束日期
	 * @return String 格式化后的日期字符串
	 */
	public static long betweenDays(Date beginDate, Date endDate) {
		long beginTime = beginDate.getTime();
		long endTime = endDate.getTime();
		long betweenDays = (long) ((endTime - beginTime)
				/ (1000 * 60 * 60 * 24) + 0.5);
		return betweenDays;
	}

	public static long betweenDays(String time1, String time2) {
		long quot = 0;
		SimpleDateFormat ft = new SimpleDateFormat("yyyyMMdd");
		try {
			Date date1 = ft.parse(time1);
			Date date2 = ft.parse(time2);
			quot = date1.getTime() - date2.getTime();
			quot = quot / 1000 / 60 / 60 / 24;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return quot;
	}

	/**
	 * 返回年份
	 *
	 * @param date
	 *            日期
	 * @return 返回年份
	 */
	public static int getYear(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.YEAR);
	}

	/**
	 * 返回月份
	 *
	 * @param date
	 *            日期
	 * @return 返回月份
	 */
	public static int getMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.MONTH) + 1;
	}

	/**
	 * 返回日份
	 *
	 * @param date
	 *            日期
	 * @return 返回日份
	 */
	public static int getDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 返回小时
	 *
	 * @param date
	 *            日期
	 * @return 返回小时
	 */
	public static int getHour(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.HOUR_OF_DAY);
	}

	/**
	 * 返回分钟
	 *
	 * @param date
	 *            日期
	 * @return 返回分钟
	 */
	public static int getMinute(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.MINUTE);
	}

	/**
	 * 返回秒钟
	 *
	 * @param date
	 *            日期
	 * @return 返回秒钟
	 */
	public static int getSecond(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.SECOND);
	}

	/**
	 * 返回毫秒
	 *
	 * @param date
	 *            日期
	 * @return 返回毫秒
	 */
	public static long getMillis(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.getTimeInMillis();
	}

	/**
	 * 日期相加
	 *
	 * @param date
	 *            日期
	 * @param day
	 *            天数
	 * @return 返回相加后的日期
	 */
	public static Date addDate(Date date, int day) {
		Calendar c = Calendar.getInstance();
		c.setTimeInMillis(getMillis(date) + ((long) day) * 24 * 3600 * 1000);
		return c.getTime();
	}

	/**
	 * 日期相减
	 *
	 * @param date
	 *            日期
	 * @param date1
	 *            日期
	 * @return 返回相减后的日期
	 */
	public static int diffDate(Date date, Date date1) {
		return (int) ((getMillis(date) - getMillis(date1)) / (24 * 3600 * 1000));
	}

	/**
	 * 日期天数增加
	 *
	 * @param date
	 * @param days
	 * @return
	 */
	public static Date addDays(Date date, int days) {
		if (0 == days) {
			return date;
		}
		Locale loc = Locale.getDefault();
		Calendar cal = new GregorianCalendar(loc);
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_MONTH, days);

		return cal.getTime();
	}

	public static java.sql.Date convertUitlD2SqlD(Date utilDate) {
		GregorianCalendar da = new GregorianCalendar();
		Date time = da.getTime();
		java.sql.Date sqlDate = new java.sql.Date(time.getTime());
		return sqlDate;
	}

	/**
	 * 日期天数减少
	 *
	 * @param date
	 * @param days
	 * @return
	 */
	public static Date minusDays(Date date, int days) {
		return addDays(date, (0 - days));
	}

	/**
	 * 按时间格式相加
	 *
	 * @param dateStr
	 *            原来的时间
	 * @param pattern
	 *            时间格式
	 * @param type
	 *            "year"年、"month"月、"day"日、"week"周、 "hour"时、"minute"分、"second"秒
	 *            通过常量来设置,e.g.DateFormatUtils.YEAR
	 * @param count
	 *            相加数量
	 * @return
	 */
	public static Date addDate(Date date, String type, int count) {
		if (0 == count) {
			return date;
		}
		Locale loc = Locale.getDefault();
		Calendar cal = new GregorianCalendar(loc);
		cal.setTime(date);

		if (DateHelper.YEAR.equals(type)) {
			cal.add(Calendar.YEAR, count);
		} else if (DateHelper.MONTH.equals(type)) {
			cal.add(Calendar.MONTH, count);
		} else if (DateHelper.DAY.equals(type)) {
			cal.add(Calendar.DAY_OF_MONTH, count);
		} else if (DateHelper.WEEK.equals(type)) {
			cal.add(Calendar.WEEK_OF_MONTH, count);
		} else if (DateHelper.HOUR.equals(type)) {
			cal.add(Calendar.HOUR, count);
		} else if (DateHelper.MINUTE.equals(type)) {
			cal.add(Calendar.MINUTE, count);
		} else if (DateHelper.SECOND.equals(type)) {
			cal.add(Calendar.SECOND, count);
		} else {
			return null;
		}

		return cal.getTime();
	}

	/**
	 * 那时间格式相减
	 *
	 * @param dateStr
	 * @param pattern
	 * @param type
	 * @param count
	 * @return
	 */
	public static Date minusDate(Date date, String type, int count) {
		return addDate(date, type, (0 - count));
	}

	public static BigDecimal getCurrentTimeValues() {
		Date currentDate = getCurrentDate();
		return new BigDecimal(getHour(currentDate) * 10000
				+ getMinute(currentDate) * 100 + getSecond(currentDate));

	}

	/**
	 * 显示日期格式
	 *
	 * @param bizDate
	 *            YYYYMMDD
	 * @param frequence
	 *            Q W M W D
	 * @return
	 */
	public static String displayDate(String bizDate, String frequence) {
		if (null == bizDate || bizDate.length() < 8)
			return bizDate;
		String displayTime = bizDate;

		int date = Integer.parseInt(bizDate);
		int yyyymm = date / 100;
		int yyyy = yyyymm / 100;
		int mm = yyyymm % 100;
		int dd = date % 100;

		if (frequence.equalsIgnoreCase("Y")) {
			displayTime = yyyy +""+YYYY;
		} else if (frequence.equalsIgnoreCase("Q")) {
			displayTime = yyyy + YYYY + (mm / 3 + 1)+QQ;
		} else if (frequence.equalsIgnoreCase("M")) {
			displayTime = yyyy + YYYY + (mm)+MM;
		} else if (frequence.equalsIgnoreCase("D")||frequence.equalsIgnoreCase("W")) {
			displayTime = yyyy + YYYY + (mm) + MM + (dd)+DD;
		}
		return displayTime;
	}

	/**
	 * 通过指定年计算去年
	 *
	 * @param year
	 *            指定年 String YYYY
	 * @return last year 去年 String YYYY
	 */
	public static String computeLastYear(String year) {
		return computeYearByStep(year,-1);
	}
	/**
	 * 通过指定年和步长，计算年
	 * @param year	指定年 String YYYY
	 * @param step	步长  int	可正 可负
	 * @return
	 */
	public static String computeYearByStep(String year,int step) {
		Long lYear = new Long(year);
		return lYear.longValue()+ step + "";
	}
	 /**
	  * 获取当月的 天数
	  */
	 public static int getCurrentMonthDay() {

	     Calendar a = Calendar.getInstance();
	     a.set(Calendar.DATE, 1);
	     a.roll(Calendar.DATE, -1);
	     int maxDate = a.get(Calendar.DATE);
	     return maxDate;
	 }
	 /**
	  * 根据年 月 获取对应的月份 天数
	  * @param yearMonth	YYYYMM
	  * @return
	  */
	 public static int getDaysByYearMonth(String yearMonth) {
		 int year,month;
		 if(null==yearMonth || yearMonth.trim().length()!=6) return 31;
		 try {
			year=Integer.parseInt(yearMonth.substring(0, 4));
			 month=Integer.parseInt(yearMonth.substring(4, 6));
		} catch (NumberFormatException e) {
			e.printStackTrace();
			return 31;
		}
		 return getDaysByYearMonth(year,month);
	 }
	 /**
	  * 根据年 月 获取对应的月份 天数
	  * @param year		int
	  * @param month	int
	  * @return
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
	  * 根据年 月 获取对应的月份 天数
	  * @param year		int
	  * @param month	int
	  * @return
	  */
	public static int getDaysInMonth(int year, int mon) {
			GregorianCalendar date = new GregorianCalendar(
					year, mon - 1, 1);
			return (date.getActualMaximum(Calendar.DAY_OF_MONTH));
	}

}
