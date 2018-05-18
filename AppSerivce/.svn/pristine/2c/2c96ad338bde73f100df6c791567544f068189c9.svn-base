package com.utility.baiyin;

import com.constant.Constant;
import com.constant.Global;
import com.domain.UserProfile;
import com.exception.ServiceException;
import com.service.attendence.entity.AttendancePeriod;
import com.service.attendence.entity.Attendence;
import com.utility.DateUtil;
import com.utility.FTPUtil;
import com.utility.MapUtil;
import com.utility.StringUtil;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.apache.log4j.Logger;
import org.aspectj.weaver.patterns.ThisOrTargetAnnotationPointcut;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.sql.rowset.serial.SerialException;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

public class BaiyinUtils {
	private static Logger logger = Logger.getLogger(BaiyinUtils.class);

	/**
	 * 生成当前月的日期，从1号开始到传入的日期
	 *
	 * @return
	 */
	public static List<String> genCurrDateList(String currDate) throws ServiceException {
		List<String> dList = new ArrayList<String>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM");
		try {
			Date cDate = sdf.parse(currDate);
			// 如果是1号，则直接返回
			int day = Integer.parseInt(new SimpleDateFormat("dd").format(cDate));
			String month = sdf2.format(cDate) + "-";
			if (day == 1) {
				dList.add(currDate);
			} else {
				for (int i = 1; i <= day; i++) {
					dList.add(month + genDay(i));
				}
			}
		} catch (Throwable e) {
			throw new ServiceException("", e.getMessage());
		}
		return dList;
	}

	/**
	 * 将日期转换为双位数
	 *
	 * @param i
	 * @return
	 */
	public static String genDay(int i) {
		if (i < 10) {
			return "0" + i;
		} else {
			return i + "";
		}
	}

	/**
	 * 获取系统imagesUrl
	 *
	 * @return
	 */
	public static String imagesUrl(String url) {
		return url + Constant.WEB_ROOT + "/images/";
	}

	/**
	 * // 通过base64来转化图片
	 *
	 * @param imageFile
	 * @return
	 */
	public static InputStream getImageByte(String imageFile) {
		// 通过base64来转化图片
		imageFile = imageFile.replaceAll("data:image/jpeg;base64,", "");
		imageFile = imageFile.replaceAll("data:image/png;base64,", "");
		imageFile = imageFile.replaceAll(" ", "+");
		imageFile = imageFile.replaceAll("!fs!", "=");
		BASE64Decoder decoder = new BASE64Decoder();
		// Base64解码
		byte[] imageByte = null;
		InputStream input = null;
		try {
			imageByte = decoder.decodeBuffer(imageFile);
			for (int i = 0; i < imageByte.length; ++i) {
				if (imageByte[i] < 0) {// 调整异常数据
					imageByte[i] += 256;
				}
			}
			// 调试内容
			/*
			 * String fn = new SimpleDateFormat("yyyy-MM-ddHHmmssSSSS").format(new Date());
			 * FileOutputStream fos=new FileOutputStream("c:/upload/"+fn+".png");
			 * fos.write(imageByte); fos.flush(); fos.close();
			 */
			// 正常内容
			input = new ByteArrayInputStream(imageByte);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return input;
	}

	/**
	 * 通过时间+随机数生成image名称
	 *
	 * @return
	 */
	public static String getImageName(String type) {
		String files = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date())
				+ (new Random().nextInt(9000) % (9000 - 1000 + 1) + 1000) + ".png";
		return files;
	}

	/**
	 * 将SQL改为分页SQL
	 *
	 * @param sql
	 * @param pageSize
	 * @param pageNo
	 * @return
	 */
	public static String genPageSql(String sql, int pageSize, int pageNo) {
		int startPage = (pageNo - 1) * pageSize, endPage = pageNo * pageSize;
		sql = "select * from (select a.*,rownum rid from (" + sql + ") a ) b where b.rid >" + startPage + " and b.rid<="
				+ endPage;
		// logger.info("getPageSql===\n" + sql);
		return sql;
	}

	/**
	 * 将fpt文件生成到本地
	 *
	 * @param map
	 * @param m
	 * @param uProfile
	 * @return
	 */
	public static String genLoacalFile(Map map, Map m, UserProfile uProfile, String remotePath, String url)
			throws ServiceException {
		String fileName = "";
		try {
			// String localPath = MapUtil.stringValue(map, "localPath") + "\\" +
			// Constant.IFSDOC + "\\" + uProfile.getUserId();
			// logger.info("localPath==" + localPath);
			// File file = new File(localPath);
			// judeDirExists(file);
			// FTPUtil.downloadFile(Global.getFtpIp(), Global.getFtpPort(),
			// Global.getFtpUsername(), Global.getFtpPassword(), remotePath,
			// MapUtil.stringValue(m, "FILE_NAME"), localPath);
			// fileName = getUrl() + "/" + Constant.IFSDOC + "/" + uProfile.getUserId() +
			// "/" + MapUtil.stringValue(m, "FILE_NAME");
			fileName = url + "/" + Constant.IFSDOC + remotePath + MapUtil.stringValue(m, "FILE_NAME");
		} catch (Throwable e) {
			e.printStackTrace();
			throw new ServiceException("", e.getMessage());
		}

		return fileName;
	}

	/**
	 * 1是图片，0不是图片
	 *
	 * @param fileName
	 * @return
	 */
	public static String checkImage(String fileName) {
		String isImage = "0";
		if (StringUtil.isBlank(fileName)) {
			return "0";
		}
		String extension = "";
		int i = fileName.lastIndexOf('.');
		if (i > 0) {
			extension = fileName.substring(i + 1);
		}
		String imageType = "image png tif jpg jpeg bmp";
		if (imageType.contains(extension)) {
			isImage = "1";
		}
		return isImage;
	}

	// 判断文件是否存在
	public static void judeFileExists(File file) {

		if (file.exists()) {
			System.out.println("file exists");
		} else {
			System.out.println("file not exists, create it ...");
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}

	// 判断文件夹是否存在
	public static void judeDirExists(File file) {
		try {
			if (file.exists()) {
				if (file.isDirectory()) {
					System.out.println("dir exists");
				} else {
					System.out.println("the same name file exists, can not create dir");
				}
			} else {
				System.out.println("dir not exists, create it ...");
				file.mkdir();
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}

	}

	/**
	 * 通过日期获取日期+星期数据列表
	 * 
	 * @param date
	 * @return
	 */
	public static List<Attendence> getMonthDayWeekList(String date) {
		List<Attendence> dwList = new ArrayList<Attendence>();
		Attendence attendence = null;
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Date thisDate = sdf.parse(date);
			int year = DateUtil.getYear(thisDate);
			int month = DateUtil.getMonth(thisDate);
			int maxDate = DateUtil.getDaysByYearMonth(year, month);
			String week = "";
			for (int i = 1; i <= maxDate; i++) {
				week = DateUtil.getDayOfWeekByDate(year + "-" + month + "-" + i);
				attendence = new Attendence();
				attendence.setYear(year);
				attendence.setMonth(month);
				attendence.setDate(i);
				attendence.setWeek(week);
				dwList.add(attendence);
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return dwList;
	}

	/**
	 * 将sn转换为没有冒号。
	 * 
	 * @param sn
	 * @return
	 */
	public static String getSnWithoutColon(String sn) {
		return sn.replaceAll(":", "");
	}

	/**
	 * 让具有冒号
	 * 
	 * @param sn
	 * @return
	 */
	public static String getSnHasColon(String sn) {
		StringBuffer sb = new StringBuffer();
		sb.append(sn);
		if (sn.indexOf(":") < 0) {
			for (int i = 2; i < sb.length(); i += 3) {
				sb.insert(i, ":");
			}
		}
		return sb.toString();
	}

	public static void main(String[] args) {
	//	System.out.println(getSnWithoutColon("1918FC0289"));
		
	//	System.out.println(genTransactionDayPeriod("16:00","01:00"));
		System.out.println("1234567890".substring(0, 8));
		System.out.println("20180927".compareTo("20180928"));
		System.out.println("20180927".compareTo("20180926"));
	
		
		
	}

	/**
	 * transactionId格式为 yyyyMMdd+userid
	 * 
	 * @param userid
	 * @return
	 */
	public static String genTransactionId(String userid) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		return sdf.format(new Date()) + userid;
	}
	

	/**
	 * transactionId格式为 yyyyMMdd 根据开始时间,结束时间   
	 *     传出：获取当前班次的开始日期时间，截止日期时间。。
	 *     和transactionId 
	 *     
	 *     
	 * @return
	 * 	      返回所属班次AttendancePeriod 的transactionId的日期字符串:  yyyyMMdd
	 * @author Reid
	 * 
	 */
	public static AttendancePeriod genTransactionDayPeriod(String startTimeStr,String endTimeStr,String transactionId) {
		Date startTime;
		Date endTime;
		String transactionStr = "";
		if (transactionId != null )
			transactionStr = transactionId.substring(0, 8);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Calendar cal = Calendar.getInstance();
		int hour = Integer.parseInt(startTimeStr.substring(0,startTimeStr.indexOf(":")));
		int min = Integer.parseInt(startTimeStr.substring(startTimeStr.indexOf(":")+1));
		Date now = cal.getTime();
		cal.set(Calendar.HOUR_OF_DAY, hour);
		cal.set(Calendar.MINUTE, min);
		Date today = cal.getTime();
		cal.add(Calendar.DATE, -1);
		Date pre = cal.getTime();
		cal.add(Calendar.DATE, 2);
		Date tomorrow = cal.getTime();
		
		startTime = null ;
		if(Math.abs(now.getTime()-today.getTime())  > Math.abs(now.getTime()-pre.getTime())) {
			startTime = pre;
		}else if (Math.abs(now.getTime()-today.getTime())  > Math.abs(now.getTime()-tomorrow.getTime())) {
			startTime = tomorrow;
		}else {
			startTime = today;
		}		
		
		hour = Integer.parseInt(endTimeStr.substring(0,endTimeStr.indexOf(":")));
		min = Integer.parseInt(endTimeStr.substring(endTimeStr.indexOf(":")+1));
		cal.setTime(startTime);
		cal.set(Calendar.HOUR_OF_DAY, hour);
		cal.set(Calendar.MINUTE, min);
		endTime = cal.getTime();
		
		Date transactionDay = startTime;
		if(endTime.getTime()-startTime.getTime() <0 ) {
			cal.setTime(endTime);
			cal.add(Calendar.DAY_OF_MONTH, 1);
			endTime = cal.getTime();
		
			cal.set(Calendar.HOUR_OF_DAY,0);
			cal.set(Calendar.MINUTE,0);
			cal.set(Calendar.MILLISECOND,0);
			cal.set(Calendar.MILLISECOND,0);
			transactionDay = cal.getTime();
			
			
			if((transactionDay.getTime()- startTime.getTime()) < (transactionDay.getTime()- endTime.getTime())) {
				transactionDay = endTime;
			}else{
				transactionDay = startTime;
			}
		}
        if (sdf.format(transactionDay).equals(transactionStr) ||"".equals(transactionStr) ||transactionStr==null) {
        	transactionStr = sdf.format(transactionDay);
        }else {
        	if(transactionStr.compareTo(sdf.format(transactionDay)) >0 ) {
        		//往前推一天
    			cal.setTime(startTime);
    			cal.add(Calendar.DAY_OF_MONTH, -1);
    			cal.setTime(endTime);
    			cal.add(Calendar.DAY_OF_MONTH, -1);
        	}else {
        		//整体往后推一天 
    			cal.setTime(startTime);
    			cal.add(Calendar.DAY_OF_MONTH, 1);
    			cal.setTime(endTime);
    			cal.add(Calendar.DAY_OF_MONTH, 1);
        	}
        	// if(transactionStr>transactionDay)
        }
		AttendancePeriod period = new AttendancePeriod(startTime, endTime, transactionStr);
		return period;
	}
	
	

	/**
	 * 获取考勤理由的天列表
	 * 
	 * @return
	 */
	public static List<String> genReasonDateList() {
		List<String> dayList = new ArrayList<String>();
		Date now = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(now);
		int day = Integer.parseInt(Global.getAttendenceReasonDay());
		for (int i = 0; i < day; i++) {
			cal.add(Calendar.DATE, -i);
			dayList.add(DateUtil.formDate(cal.getTime(), "yyyy-MM-dd"));
		}
		return dayList;
	}

}
