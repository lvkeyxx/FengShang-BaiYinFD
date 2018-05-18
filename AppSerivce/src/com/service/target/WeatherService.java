package com.service.target;


import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.utility.JsonUtil;
import com.utility.MapUtil;
import com.utility.WeatherUtil;
import com.utility.baiyin.BaiyinUtils;
import org.json.JSONArray;

import java.util.*;
/**
 * @description:天气相关处理
 * @author:wangyg
 * @date:2018-1-22
 */
public class WeatherService extends AJsonService implements IJsonService {
    /**
     * 获取天气列表
     * @param map
     * @return
     */
    public String weatherList(Map map) throws ServiceException {
        String wmsg = "";
        try {
            String city = MapUtil.stringValue(map, "city");
            logger.info("city==="+city);
            String json = WeatherUtil.getWeatherInform(city);
            Map m = JsonUtil.jsonParamsToMap(json);
            String status = MapUtil.stringValue(m, "status");
            logger.info("status===" + status + "///" + m);
            if ("success".equals(status)) {//成功，将数据做处理
                JSONArray wstr = (JSONArray) m.get("results");
                m = JsonUtil.jsonParamsToMap(wstr.get(0).toString());
                wstr = (JSONArray) m.get("weather_data");
                m = JsonUtil.jsonParamsToMap(wstr.get(0).toString());
                handlImage(m);
                wmsg = JsonUtil.mapToJsonString(m, null);
            } else {
                throw new ServiceException("", "获取天气失败，请检查网络");
            }
        } catch (ServiceException e) {
            logger.error("2001", e);
            e.printStackTrace();
            throw new ServiceException("2001", e.getMsg());
        } catch (Throwable e) {
            logger.error("2001", e);
            e.printStackTrace();
            throw new ServiceException("2001", e.getMessage());
        }
        return wmsg;
    }

    /**
     * 天气预报图片处理
     * @param m
     */
    private void handlImage(Map m) {
        String weather = MapUtil.stringValue(m,"weather");
        String imageUrl = BaiyinUtils.imagesUrl(url);
        if(weather.indexOf("阴")>=0){
            m.put("dayPictureUrl",imageUrl+"yin.png");
        }else if(weather.indexOf("多云")>=0){
            m.put("dayPictureUrl",imageUrl+"duoyun.png");
        }else if(weather.indexOf("雪")>=0){
            m.put("dayPictureUrl",imageUrl+"xiaxue.png");
        }else if(weather.indexOf("雨")>=0){
            m.put("dayPictureUrl",imageUrl+"xiayu.png");
        }else{
            m.put("dayPictureUrl",imageUrl+"qing.png");
        }
    }

    public static void main(String[] args) {
        try {
            WeatherService ws = new WeatherService();
            Map map = new HashMap();
            map.put("city", "兰州市");
//            System.out.println(ws.weatherList(map));
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
}