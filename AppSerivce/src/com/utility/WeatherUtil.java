package com.utility;

import com.constant.Global;
import com.exception.ServiceException;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class WeatherUtil {
   public static String getWeatherInform(String cityName) throws ServiceException{

        //百度天气API
        StringBuffer strBuf = new StringBuffer();

        try {
            //通过浏览器直接访问http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=5slgyqGDENN7Sy7pw29IUvrZ
            //5slgyqGDENN7Sy7pw29IUvrZ 是我自己申请的一个AK(许可码)，如果访问不了，可以自己去申请一个新的ak
            //百度ak申请地址：http://lbsyun.baidu.com/apiconsole/key
            //要访问的地址URL，通过URLEncoder.encode()函数对于中文进行转码
            String baiduUrl = "http://api.map.baidu.com/telematics/v3/weather?location=" + URLEncoder.encode(cityName, "utf-8") + "&output=json&ak="+ Global.getWeatherAk();
            URL url = new URL(baiduUrl);
            URLConnection conn = url.openConnection();
            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));//转码。
            String line = null;
            while ((line = reader.readLine()) != null)
                strBuf.append(line + " ");
            reader.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new ServiceException("",e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            throw new ServiceException("",e.getMessage());
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("",e.getMessage());
        }

        return strBuf.toString();
    }
    public static void main(String[] args){
        //System.out.println(getWeatherInform("哈密地区"));
    }
}
