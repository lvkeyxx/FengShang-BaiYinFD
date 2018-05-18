package com.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.utility.ListUtil;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.cache.ConfigCache;
import com.constant.Constant;
import com.dao.SdicIndexDataDAO;
import com.dao.SdicIndexDimensionDAO;
import com.dao.SdicSisDataDAO;
import com.dao.SdicSisIndexMappingDAO;
import com.domain.SdicIndexData;
import com.domain.SdicIndexDimension;
import com.exception.ServiceException;
import com.utility.DateHelper;
import com.utility.JsonUtil;

public class SDICIndexService extends AJsonService implements IJsonService {


    private SdicIndexDataDAO sdicIndexDataDAO;
    private SdicIndexDimensionDAO sdicIndexDimensionDAO;
    private SdicSisDataDAO sdicSisDataDAO;
    private SdicSisIndexMappingDAO sdicSisIndexMappingDAO;

    public SdicIndexDataDAO getSdicIndexDataDAO() {
        return sdicIndexDataDAO;
    }

    public void setSdicIndexDataDAO(SdicIndexDataDAO sdicIndexDataDAO) {
        this.sdicIndexDataDAO = sdicIndexDataDAO;
    }

    public SdicIndexDimensionDAO getSdicIndexDimensionDAO() {
        return sdicIndexDimensionDAO;
    }

    public void setSdicIndexDimensionDAO(SdicIndexDimensionDAO sdicIndexDimensionDAO) {
        this.sdicIndexDimensionDAO = sdicIndexDimensionDAO;
    }

    public SdicSisDataDAO getSdicSisDataDAO() {
        return sdicSisDataDAO;
    }

    public void setSdicSisDataDAO(SdicSisDataDAO sdicSisDataDAO) {
        this.sdicSisDataDAO = sdicSisDataDAO;
    }

    public SdicSisIndexMappingDAO getSdicSisIndexMappingDAO() {
        return sdicSisIndexMappingDAO;
    }

    public void setSdicSisIndexMappingDAO(
            SdicSisIndexMappingDAO sdicSisIndexMappingDAO) {
        this.sdicSisIndexMappingDAO = sdicSisIndexMappingDAO;
    }


    /**
     * 获取电力指标全集
     *
     * @param map TODO
     * @return
     */
    public String getIndexNameList(Map map) throws ServiceException {
        logger.info("enter into getIndexNameList");
        String returnString = "";
        try {
            List<SdicIndexDimension> list = sdicIndexDimensionDAO.getRecordList(null);
            if (ListUtil.isEmpty(list)) {
                throw new ServiceException("", "没有查询到电力指标！");
            }
            returnString = JsonUtil.ObjListToJson((ArrayList<?>) list, "indexId,indexName,iocImage");
        } catch (ServiceException e) {
            throw new ServiceException("0101", e.getMsg());
        } catch (Throwable e) {
            e.printStackTrace();
            throw new ServiceException("0101", e.getMessage());
        }
        return returnString;
    }

    /**
     * 根据綜合条件查询具体单一指标数据
     *
     * @param map
     * @return
     * @throws ServiceException
     */
    public String getIndexData(Map map) throws ServiceException {
        String indexId = (String) map.get(Constant.INDEX_ID);
        return getIndexData(indexId);
    }


    /**
     * 根据指标ID等条件查询指标数据
     *
     * @param indexObj
     * @return
     */
    public List<SdicIndexData> getIndexData(SdicIndexData indexObj) {

        return sdicIndexDataDAO.getRecordList(indexObj);
    }

    /**
     * 根据指标ID等条件查询指标数据
     *
     * @param indexId
     * @return
     * @throws ServiceException
     */
    public String getIndexData(String indexId) throws ServiceException {
        JSONObject jsonResult = new JSONObject();
        String strRetrun = "";//"{\"series\":[{\"name\":\"负荷\",\"data\":[\"500.0\",\"450.0\",\"500.0\",\"400.0\",\"600.0\",\"450.0\",\"500.0\",\"300.0\",\"450.0\",\"450.0\",\"450.0\",\"450.0\",\"500.0\",\"450.0\",\"300.0\",\"450.0\",\"450.0\",\"450.0\",\"600.0\",\"450.0\",\"450.0\",\"300.0\",\"450.0\",\"400.0\",\"600.0\"],\"type\":\"line\"}],\"yAxis\":{\"name\":\"负荷\"},\"xAxis\":{\"name\":\"小时\",\"data\":[\"2016121001\",\"2016121002\",\"2016121003\",\"2016121004\",\"2016121005\",\"2016121006\",\"2016121007\",\"2016121008\",\"2016121009\",\"2016121010\",\"2016121011\",\"2016121012\",\"2016121013\",\"2016121014\",\"2016121015\",\"2016121016\",\"2016121016\",\"2016121017\",\"2016121017\",\"2016121018\",\"2016121019\",\"2016121020\",\"2016121021\",\"2016121022\",\"2016121023\"],\"nameLocation\":\"start

        SdicIndexData indexObj = new SdicIndexData();
        indexObj.setIndexId(new BigDecimal(indexId));

        String unitNoArray[] = ConfigCache.getInstance().getUnitNoArrayById(indexId);

        for (int i = 0; i < unitNoArray.length; i++) {
            indexObj.setPowerUnitId(new BigDecimal(unitNoArray[i]));
            try {
                JSONObject obj = makeEchartJsonByUnit(indexObj);
                jsonResult.put(unitNoArray[i] + "#", obj);
            } catch (JSONException e) {
                logger.error(e.getMessage());
                e.printStackTrace();
                throw new ServiceException("0201", "getIndexData 查询指标数据,json格式异常");
            }
        }

        logger.debug(jsonResult.toString());
        return jsonResult.toString();
    }

    /**
     * todo
     * 按照指定机组查询指标数据，返回echart json数据
     *
     * @param indexObj
     * @return
     * @throws JSONException
     */
    private JSONObject makeEchartJsonByUnit(SdicIndexData indexObj) throws JSONException {
        JSONObject jsonResult = new JSONObject();
        Map map = ConfigCache.getInstance().getIndexMapById("" + indexObj.getIndexId());
        String indexName = (String) (map.get("INDEX_NAME"));
        String indexUnit = (String) (map.get("UNIT_NAME"));
        String currentDate = "";

        List listData = getIndexData(indexObj);
        String strJson = JsonUtil.ObjListToJson((ArrayList<?>) listData, "measurePeriod,numValue");
        JSONArray jsonArray = new JSONArray(strJson);
        //JSONArray jsonarray = JSONArray.fromObject(strJson);
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            String measurePeriod = obj.getString("measurePeriod");
            String dateStr = DateHelper.convertString2String(measurePeriod,
                    DateHelper.DATE_TIME_FORMAT_10, "HH");
            currentDate = DateHelper.convertString2String(measurePeriod,
                    DateHelper.DATE_TIME_FORMAT_10, "yyyy-MM-dd");
            obj.put("measurePeriod", dateStr);
        }
        JSONObject xAxis = new JSONObject();
        xAxis.put("name", "时");
        xAxis.put("nameLocation", "end");
        xAxis.put("data", JsonUtil.fetchJsonArray2List(jsonArray, "measurePeriod"));

        JSONObject yAxis = new JSONObject();
        yAxis.put("name", " (" + indexUnit + ")");
        yAxis.put("scale", true);

        JSONArray series = new JSONArray();
        JSONObject series1 = new JSONObject();
        series1.put("name", indexName);
        series1.put("type", "line");
        series1.put("data", JsonUtil.fetchJsonArray2List(jsonArray, "numValue"));
        series.put(series1);

        JSONObject title = new JSONObject();
        title.put("text", currentDate);
        title.put("subtext", indexName);
        title.put("left", 10);

        jsonResult.put("xAxis", xAxis);
        jsonResult.put("yAxis", yAxis);
        jsonResult.put("series", series);
        jsonResult.put("title", title);

        return jsonResult;
    }
}
