package com.utility;

import oracle.sql.CLOB;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import sun.misc.BASE64Decoder;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Utility {
	private static final String DefaultDecimalFormat = "###,##0.00";
	private final static byte[] KEY = "ipacsbj.".getBytes();
	private static String Algorithm = "DES";
	public static void main(String[] args) throws Exception {

		String s="xiaoweijie";
//		s="yhx";
//		byte[] data = (encode(s.getBytes(), KEY));
//		System.out.println("\n 00=" + data);
//		String str1=Utility.getBASE64(data);
//		System.out.println("\n 11=" + str1);
//		String str2=Utility.getFromBASE64(str1);
//		System.out.println("\n 22=" + str2);
//		data = (decode(str2.getBytes(), KEY));
//		System.out.println("\n 33=" + data);

		String name ="全国动力煤均价车板价(含税):(5000<Q<6000)";
		String name2= Utility.decodeHtml(name);
		System.out.println("\n name2=" + name2);

		Double data=new Double("12.123");
//		System.out.println("\n Utility.displayDays()=" + Utility.displayDays(data));
		System.out.println("\n Math.floor(1.634)=" +Math.floor(1.634));
//		System.out.println("\n aa=" + Utility.getBASE64(s));
//		System.out.println("\n bb=" + Utility.getFromBASE64(Utility.getBASE64(s)));

	}


	public static double round(double data, int i) {
		BigDecimal bd = new BigDecimal(data).setScale(i,
				BigDecimal.ROUND_HALF_UP);
		return bd.doubleValue();
	}

	public static Double Round(Double data, int i) {
		if (null == data)
			return data;
		return new Double(round(data.doubleValue(), i));
	}
	public static int getDaysInMonth(String yearMonth) {
		if(null!=yearMonth && yearMonth.length()>6)	yearMonth=yearMonth.substring(0, 6);
		return DateHelper.getDaysByYearMonth(yearMonth);
	}
	public static int getDaysInMonth(int year, int mon) {
		return DateHelper.getDaysInMonth(year, mon);
	}

	private static String getBASE64(byte[] data) {
		if (data == null)	return null;
		return (new sun.misc.BASE64Encoder()).encode(data);
	}

	public static String getBASE64(String s) {
		if (s == null)	return null;
		return getBASE64(s.getBytes());
	}

	//  BASE64
	public static String getFromBASE64(String s) {
		if (s == null)
			return null;
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			byte[] b = decoder.decodeBuffer(s);
			return new String(b);
		} catch (Exception e) {
			return null;
		}
	}



	public static byte[] encode(byte[] input, byte[] key) throws Exception {
		SecretKey deskey = new javax.crypto.spec.SecretKeySpec(key, Algorithm);

		Cipher c1 = Cipher.getInstance(Algorithm);
		c1.init(Cipher.ENCRYPT_MODE, deskey);
		byte[] cipherByte = c1.doFinal(input);

		return cipherByte;
	}


	public static byte[] decode(byte[] input, byte[] key) throws Exception {
		SecretKey deskey = new javax.crypto.spec.SecretKeySpec(key, Algorithm);
		Cipher c1 = Cipher.getInstance(Algorithm);
		c1.init(Cipher.DECRYPT_MODE, deskey);
		byte[] clearByte = c1.doFinal(input);
		return clearByte;
	}

	public static Double convertString2Double(String strValue) {
		return convertString2Double(strValue,null);
	}
	public static Double convertString2Double(String strValue,Double defaulfDouble) {
		Double dbNumber=defaulfDouble;
		if(null==strValue) return dbNumber;
		strValue=strValue.trim();
		if(strValue.length()<=0)	return dbNumber;

		DecimalFormat   nf   =   new   DecimalFormat( DefaultDecimalFormat);

		try
		{
		    Number a = null;
		    a = nf.parse(strValue);
			dbNumber=new Double(a.doubleValue());
		 }
		 catch (ParseException e)
		 {
		    e.printStackTrace();
		    dbNumber=new Double(0);
		 }

		return dbNumber;
	}
	public static String converMap2String(Map mapIndexNo) {
		Iterator it=mapIndexNo.entrySet().iterator();
		String strReturn="";
		while(it.hasNext()){
			Map.Entry entry = (Map.Entry)it.next();
			String item=(String)entry.getValue();
			strReturn = (strReturn.length()<=0) ? (item) : (strReturn + ","+item);
		}
		return strReturn;
	}
	/**
	 * indexno in entrySet
	 * @param mapIndexNo
	 * @return
	 */
	public static String converFormat4Sql(Map mapIndexNo) {
		Iterator it=mapIndexNo.entrySet().iterator();
		String strReturn="";
		while(it.hasNext()){
			Map.Entry entry = (Map.Entry)it.next();
			String item=(String)entry.getValue();
			strReturn = (strReturn.length()<=0) ? ("'"+item+"'") : (strReturn + ",'"+item+"'");
		}
		return strReturn;
	}

	public static String converFormat4Sql(String indexNoString) {
		String[] array=indexNoString.split(",");
		return converFormat4Sql(array);
	}

	public static String converFormat4Sql(String[] indexNoArray) {
		String strReturn="";
		for(int i=0;i<indexNoArray.length;i++){
			String item=indexNoArray[i];
			strReturn = (strReturn.length()<=0) ? ("'"+item+"'") : (strReturn + ",'"+item+"'");
		}
		return strReturn;
	}

	public static  int nextFrequence(int date, String frequence) {
		int	nextDate=date;
		if ("Q".equalsIgnoreCase(frequence)) nextDate= nextQuarter(date);
		if ("M".equalsIgnoreCase(frequence)) nextDate= nextMonth(date);
		if ("D".equalsIgnoreCase(frequence)) nextDate= nextDay(date,1);
		if ("Y".equalsIgnoreCase(frequence)) nextDate= nextYear(date,1);
		return nextDate;
	}
	public static  int beforeFrequence(int date, String frequence) {
		int	nextDate=date;
		if ("Q".equalsIgnoreCase(frequence)) nextDate= beforeQuarter(date);
		if ("M".equalsIgnoreCase(frequence)) nextDate= beforeMonth(date);
		if ("D".equalsIgnoreCase(frequence)) nextDate= nextDay(date,-1);
		return nextDate;
	}
	private static int nextDay(int day,int step) {
		int nextDay=day;
		String str = ""+day;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		try {
		    Date myDate = formatter.parse(str);
		    Calendar c = Calendar.getInstance();
		    c.setTime(myDate);
		    c.add(Calendar.DAY_OF_YEAR, step);
		    myDate = c.getTime();
		    nextDay=Integer.parseInt(formatter.format(myDate));
		} catch (ParseException e1) {
		    e1.printStackTrace();
		}
		return nextDay;
	}


	public static  int nextQuarter(int quarter) {
		int nextQuarter=quarter;

		int yyyymm =quarter / 100;
		int dd =quarter % 100;

		int yyyy = yyyymm /100;
		int mm = yyyymm % 100;
		mm += 3;
		if(mm>12){
			yyyy++;
			mm=1;
		}
		nextQuarter=(yyyy*100+mm)*100+dd;
		return nextQuarter;
	}

	private static int nextYear(int day,int step) {
		int nextDay=day;
		String str = ""+day;
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		try {
		    Date myDate = formatter.parse(str);
		    Calendar c = Calendar.getInstance();
		    c.setTime(myDate);
		    c.add(Calendar.YEAR, step);
		    myDate = c.getTime();
		    nextDay=Integer.parseInt(formatter.format(myDate));
		} catch (ParseException e1) {
		    e1.printStackTrace();
		}
		return nextDay;
	}


	public static  int beforeQuarter(int quarter) {
		int nextQuarter=quarter;

		int yyyymm =quarter / 100;
		int dd =quarter % 100;

		int yyyy = yyyymm /100;
		int mm = yyyymm % 100;
		mm -= 3;
		if(--mm<=0){
			yyyy--;
			mm=12;
		}
		nextQuarter=(yyyy*100+mm)*100+dd;
		return nextQuarter;
	}
	public static  int nextMonth(int month) {
		int nextMonth=month;

		int yyyymm =month / 100;
		int dd =month % 100;

		int yyyy = yyyymm /100;
		int mm = yyyymm % 100;
		if(++mm>12){
			yyyy++;
			mm=1;
		}
		nextMonth=(yyyy*100+mm)*100+dd;
		return nextMonth;
	}
	public static  String nextMonth(String month) {
		return ""+nextMonth(Integer.parseInt(month));
	}
	public static  int beforeMonth(int month) {
		int nextMonth=month;

		int yyyymm =month / 100;
		int dd =month % 100;

		int yyyy = yyyymm /100;
		int mm = yyyymm % 100;
		if(--mm<=0){
			yyyy--;
			mm=12;
		}
		nextMonth=(yyyy*100+mm)*100+dd;
		return nextMonth;
	}
	public static  String beforeMonth(String month) {
		return ""+beforeMonth(Integer.parseInt(month));
	}
	public static  int getMonth4LastYear(int month) {
		int nextMonth=month;

		int yyyymm =month / 100;
		int dd =month % 100;

		int yyyy = yyyymm /100;
		yyyy--;
		int mm = yyyymm % 100;

		nextMonth=(yyyy*100+mm)*100+dd;
		return nextMonth;
	}
	public static  int getNo12Month4LastYear(int month) {
		int nextMonth=month;

		int yyyymm =month / 100;
//		int dd =month % 100;
		int dd =1;

		int yyyy = yyyymm /100;
		yyyy--;
//		int mm = yyyymm % 100;
		int mm=12;
		nextMonth=(yyyy*100+mm)*100+dd;
		return nextMonth;
	}
	public static  String getMonth4LastYear(String month) {
		return ""+getMonth4LastYear(Integer.parseInt(month));
	}
	public static  String getNo12Month4LastYear(String month) {
		return ""+getNo12Month4LastYear(Integer.parseInt(month));
	}
	public static  int getDateStepByFrequences(int iMaxDate,int iMinDate, String frequence) {
		int step=0;
		if(frequence.equals("Q")||frequence.equals("M"))
			step= cntFrequences(iMaxDate, frequence)- Utility.cntFrequences(iMinDate, frequence)+1;
		else
		if(frequence.equals("D")){
			step=(int) DateHelper.betweenDays(""+iMaxDate,""+iMinDate)+1;
		}

		if(frequence.equals("Y")){
			step=(int)iMaxDate/10000-(int)iMinDate/10000+1;
		}

		return step;
	}

	public static  int cntFrequences(int month, String frequence) {
		int yyyymm =month / 100;
		int dd =month % 100;

		int yyyy = yyyymm /100;
		int mm = yyyymm % 100;
		int monthCnts=yyyy*12 + mm;

		return  "M".equalsIgnoreCase(frequence) ? monthCnts : monthCnts/3 ;
	}
	public static String formatNumber(double db) {
		BigDecimal bdValue = new BigDecimal(db);
		bdValue=bdValue.setScale(2, BigDecimal.ROUND_HALF_UP);
		DecimalFormat   df   =   new   DecimalFormat(DefaultDecimalFormat);
		return df.format(bdValue);
	}
	public static String formatNumber(double db,String decimalFormat) {
		BigDecimal bdValue = new BigDecimal(db);
		bdValue=bdValue.setScale(2, BigDecimal.ROUND_HALF_UP);
		DecimalFormat   df   =   new   DecimalFormat(decimalFormat);
		return df.format(bdValue);
	}
	public static String formatNumber(Double db,String decimalFormat) {
		return (null==db)?"0":formatNumber(db.doubleValue(),decimalFormat);
	}
	public static String formatNumber(Double db) {
		return (null==db)?"0":formatNumber(db.doubleValue());
	}
	/**
	 *
	 * @param month		yyyyMMdd形式整数型日					20140315
	 * @return			对应月份的所在季度的第一月的日期		20140115
	 */
	public static int findMonth4Q(int month) {
		int yyyymm =month / 100;
		int dd =month % 100;

		int yyyy = yyyymm /100;
		int mm = yyyymm % 100;
		int qq=(mm+2)/3 ;
		mm = (qq-1)*3 +1;
		return (yyyy*100+mm)*100+dd;
	}
	public static String findMonth4Q(String month) {
		return ""+findMonth4Q(Integer.parseInt(month));
	}
	public static boolean isZerro(Double D) {
		if(null==D || D.isInfinite() || D.isNaN())
			return true;
		else{
			double d =D.doubleValue();
			return  (d >=-0.000001) && (d <= 0.000001);
		}

	}
	public static boolean isZerro(Double D1,Double D2) {
		return isZerro(D1)||isZerro(D2);
	}
	public static boolean isZerro(Double D1,Double D2,Double D3) {
		return isZerro(D1,D2)||isZerro(D3);
	}
	public static boolean isNullString(String str) {
		return (null==str || str.trim().length()<=0);
	}
	public static boolean isNullMap(Map map) {
		return (null==map || map.size()<=0 || map.isEmpty());
	}
	/**
	 * 将Map数据转换�?array形式�?json格式,按照 value 排序
	 * @param map
	 * @return
	 */
	public static String map2JsonArrayString(Map map){
		return map2JsonArrayString(map,true);
	}
	/**
	 * 将Map数据转换�?array形式�?json格式,按照 value 排序
	 * @param map
	 * @param needSort	是否霢�要排�?
	 * @return
	 */
	public static String map2JsonArrayString(Map map,boolean needSort) {
		String str = null;
		JSONArray json = needSort ? map2OrderJsonArray(map) : map2JsonArray(map);
		str = json.toString();
		return str;
	}
	/**
	 * 将Map数据转换�?array形式�?json格式,按照 value 排序
	 * @param map
	 * @param needSort	是否霢�要排�?
	 * @return形式  [
	 * 					["",""],
	 * 					["",""],
	 * 					["",""]
	 * 				]
	 */
	public static JSONArray map2OrderJsonArray(Map map) {
		JSONArray json = new JSONArray();

		if (null!=map){

			List orderList = new ArrayList(map.entrySet());
	        Collections.sort(orderList, new Comparator() {
	            public int compare(Object o1, Object o2) {
	                // 降序：o2.getValue()-o1.getValue()
	                // 升序：o1.getValue()-o2.getValue()
	            	Map.Entry entry1=(Map.Entry) o1;
	            	Map.Entry entry2=(Map.Entry) o2;
	            	String str1=(String)entry1.getValue();
	            	String str2=(String)entry2.getValue();
	            	int code=0;

	            	if (null!=str1 && null!=str2)	code=(str1.compareTo(str2));
	            	else
	            	if (null==str1 && null==str2)	code=0;
		            else
	            	if (null==str1)            		code=-1;
	            	else
	            	if (null==str2)            		code=1;

	                return code;
	            }
	        });
			Iterator iter=orderList.iterator();
			while(iter.hasNext()){
				JSONArray js = new JSONArray();
				Map.Entry entry=(Map.Entry)iter.next();;
            	String code=(String)entry.getKey();
//            	String value=(String)entry.getValue();
				js.put(code);
				js.put(map.get(code));
				json.put(js);
			}
		}
		return json;
	}
	/**
	 *
	 * @param map
	 * @return形式  [
	 * 					["",""],
	 * 					["",""],
	 * 					["",""]
	 * 				]
	 */
	public static JSONArray map2JsonArray(Map map) {
		JSONArray json = new JSONArray();
		for (Iterator iter = map.keySet().iterator(); iter.hasNext();) {
			JSONArray js = new JSONArray();
			String code = (String) iter.next();
			String name = (String) map.get(code);
			js.put(code);
			js.put(name);
			json.put(js);
		}
		return json;
	}
	/**
	 * 将Map数据转换�?Map形式�?json格式
	 * @param map
	 * @return
	 */
	public static String map2JsonMapString(Map map) {
		String str = null;
		JSONObject json = map2JsonMap(map);
		try {
			str = json.toString(0);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return str;
	}
	public static JSONObject map2JsonMap(Map map) {
		JSONObject json = new JSONObject();
		if (null!=map)
		for (Iterator iter = map.keySet().iterator(); iter.hasNext();) {
			Object code = iter.next();
			try {
				json.put(""+code,map.get(code));
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		return json;
	}
	public static String myReplaceAll(String string,String str1,String str2) {
		String arrayString[]=string.split(str1);
		string=arrayString[0];
		for(int i=1;i<arrayString.length;i++){
			String item=arrayString[i];
			string += str2+item;
		}
		return string;
	}
	public static String decodeHtml(String string) {

		string=myReplaceAll(string,"<","&lt;");
		string=myReplaceAll(string,">","&gt;");

/*		StringUtils.replace(string,"<","&lt;");
		StringUtils.replace(string,">","&gt;");*/
		return string;
	}

	public static Double[][] convertData(List list,int cnt) {

		Double[][] returnData = new Double[list.size()][cnt];
		for (int i = 0; i < list.size(); i++) {
			List temp = (List) list.get(i);
			for (int j = 0; j < cnt; j++) {
				returnData[i][j] = (Double) temp.get(j);
			}
		}
		return returnData;
	}
	/**
	 * 加权计算平均数据
	 * @param list1		此list 中的数据代表权重，比如煤炭重�?
	 * @param list2
	 * @param cnt		�?�?�?日粒度的 数量个数
	 * @return
	 */
	public static List avg4weight(List list1, List list2,int cnt) {
		Double[][] doubleArray = convertData(list1,cnt);
		Double[][] doubleArray2 = convertData(list2,cnt);
//		 System.out.println("list1.size="+list1.size()+" list1="+list1);
//		 System.out.println("list2.size()="+list2.size()+" list2="+list2);
//		 System.out.println("doubleArray.length="+doubleArray.length);
//		 System.out.println("doubleArray2.length="+doubleArray2.length);
//
//		 testprint(doubleArray,"数量");
//		 testprint(doubleArray2,"热量");
		List returnList = new ArrayList();
		for (int j = 0; j < cnt; j++) {
			boolean isNull=true;
			double sum = 0, sum2 = 0;
			for (int i = 0; i < doubleArray.length; i++) {
				Double data = doubleArray[i][j];
				Double data2 = doubleArray2[i][j];
				System.out.println("j="+j +"  i="+i +" data="+data +" data2="+data2);

				if (data != null && data2 != null) {
					isNull=false;
					if( data.doubleValue()>0 && data2.doubleValue()>0 ){
						sum = sum + data.doubleValue();
						sum2 = sum2 + data.doubleValue() * data2.doubleValue();
					}
				}
			}
			Double double1=null;
			if(!isNull) {
				double1 = new Double(Utility.round((sum > 1) ? (sum2 / sum)	: 0, 2));
			}
			returnList.add(j, double1);
		}
		return returnList;
	}


	public static List sumList(List list, int cnt) {
		Double[][] doubleArray = convertData(list,cnt);
		List returnList = new ArrayList();
		for (int j = 0; j < cnt; j++) {
			boolean isNull=true;
			double sum = 0;
			for (int i = 0; i < doubleArray.length; i++) {
				Double data = doubleArray[i][j];
				if (data != null ) {
						isNull=false;
						sum = sum + data.doubleValue();
				}
			}
			Double double1 =null;
			if(!isNull) {
				double1 = new Double(Utility.round(sum, 2));
			}
			returnList.add(j, double1);
		}
		return returnList;
	}

	public static String displayDays(Double data) {
		if(null==data)return "";
		return ((int)Math.floor(data.doubleValue()))+"";
	}
	/**
	 * 默认长宽比为1.5，比�?360*240像素的图形文�?
	 * @param filePath
	 * @param increment 变形百分比： 0�?之间数字
	 * @return
	 */
	public static boolean checkPicture(String filePath, double increment){
		double std = 1.5;
		return checkPicture(filePath,std,increment);
	}
	public static boolean checkPicture(String filePath,double std, double increment){
		boolean rc=false;
		if(increment>1 || increment<0)	return rc;
		try {
			BufferedImage bufferedImage = ImageIO.read(new File(filePath));
			int width = bufferedImage.getWidth();
			int height = bufferedImage.getHeight();
			double value = (double)width/height;
			if((std-increment)<=value&&value<=(std+increment)){
				rc= true;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return rc;
	}

	/**
	 * @param filePath
	 * @param displayUnit 显示单位 默认为显示字节，可填：K,M,G
	 * @return
	 */
	public static double getFileSize(String filePath, String displayUnit){
		double rc= 0;
		File file = new File(filePath);
		if (file.exists() && file.isFile()){
			double space = file.length();
			if(displayUnit.equalsIgnoreCase("k")){rc = space/1024;}
			else if(displayUnit.equalsIgnoreCase("m")){rc = space/1048576;}
			else if(displayUnit.equalsIgnoreCase("g")){rc = space/1073741824;}
			else{rc = space;}
		}
		return rc;
	}

	/**
	 * @param filePath
	 * @return
	 */
	public static String getFileType(String filePath){
		String rc= "";
		File file = new File(filePath);
		if (file.exists() && file.isFile()){
			String fileName = file.getName();
			rc = fileName.substring(fileName.lastIndexOf(".")+1);
		}
		return rc;
	}
	public static Double sumDouble(Double double1, Double double2) {
		double v1=0,v2=0;

		try{
			v1=double1.doubleValue();
		}catch(Exception e){
			e.printStackTrace();
		}
		try{
			v2=double2.doubleValue();
		}catch(Exception e){
			e.printStackTrace();
		}

		return new Double(v1+v2);
	}
	public static String sumDouble(String double1, String double2,boolean round) {
		double v1=0,v2=0;

		try{
			v1=Double.parseDouble(double1);
		}catch(Exception e){
			e.printStackTrace();
		}
		try{
			v2=Double.parseDouble(double2);
		}catch(Exception e){
			e.printStackTrace();
		}
		String result= round ? ((int)Math.floor(v1+v2))+""	: (v1+v2)+"";
		return result;
	}
	
	public static String stringReplaceAll(String sourceString, char oldChar,char newChar) {
		if(null==sourceString)	return sourceString;
		StringBuffer sb= new StringBuffer(sourceString);
		for(int i=0;i<sb.length();i++){			
			if(sb.charAt(i)==oldChar)	sb.setCharAt(i,newChar);
		}
		return sb.toString();
	}	
	public static String oracleClob2Str(CLOB clob) throws Exception {
		return (clob != null ? clob.getSubString(1, (int) clob.length()) : null);
	}
	public static String clobToString(CLOB clob) throws Exception{
		 Reader inStreamDoc = clob.getCharacterStream(); 
		 char[] tempDoc = new char[(int) clob.length()]; 
		 inStreamDoc.read(tempDoc); 
		 inStreamDoc.close(); 
		 return new String(tempDoc); 
		} 
	public static String ClobToString1(Clob clob) throws SQLException, IOException {

		String reString = "";
		 Reader is = clob.getCharacterStream();// 得到流
		 BufferedReader br = new BufferedReader(is);
		 String s = br.readLine();
		 StringBuffer sb = new StringBuffer();
		 while (s != null) {// 执行循环将字符串全部取出付值给StringBuffer由StringBuffer转成STRING
		 sb.append(s);
		 s = br.readLine();
		 }
		 reString = sb.toString();
		 return reString;
		 }
	 public static String ClobToString(Clob clob) {
		  if (clob == null) {
		   return null;
		  }
		  BufferedReader reader = null;
		  try {
		   reader = new BufferedReader(clob.getCharacterStream());
		   StringBuffer buf = new StringBuffer();
		   String line = null;
		   while ((line = reader.readLine()) != null) {
		    buf.append(line);
		   }
		   return buf.toString();
		  } catch (Exception e) {
		   e.printStackTrace(System.out);
		   return null;
		  } finally {
		   if (reader != null) {
		    try {
		     reader.close();
		    } catch (IOException e) {
		     //
		    }
		   }
		  }
		 }
		public static Clob stringToClob(String str) {
		        if (null == str)
		         return null;
		        else {
		            try {
		                 Clob c = new javax.sql.rowset.serial.SerialClob(str
		                         .toCharArray());
		                 return c;
		             } catch (Exception e) {
		                 return null;
		            }
		        }
		    }
/*
		public static byte[] toByteArray(Blob fromBlob) {
		  ByteArrayOutputStream baos = new ByteArrayOutputStream();
		  try {
		   return toByteArrayImpl(fromBlob, baos);
		  } catch (SQLException e) {
		   throw new RuntimeException(e);
		  } catch (IOException e) {
		   throw new RuntimeException(e);
		  } finally {
		   if (baos != null) {
		    try {
		     baos.close();
		    } catch (IOException ex) {
		    }
		   }
		  }
		 }
*/
		public static Map getProperties(String url) {
			
			Properties prop = new Properties();
			
			File file = new File(url);
			try {
				FileInputStream fis = new FileInputStream(file);
				prop.load(fis);
				fis.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			return prop;
		}

}
