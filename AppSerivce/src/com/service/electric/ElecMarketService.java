package com.service.electric;

import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.electric.sql.ElecMarketSQL;
import com.utility.IbatisDBUtil;
import com.utility.ListUtil;
import com.utility.MapUtil;
import org.json.JSONObject;

import java.util.List;
import java.util.Map;

/**
 * Created by yangxx on 2018/5/24.
 */
public class ElecMarketService extends AJsonService implements IJsonService {

    /**
     * 市场化交易列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String elecMarketList(Map map) throws ServiceException{
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try{
            String sql = ElecMarketSQL.elecMarketList(map);
            logger.info("sql====="+sql);
            List<Map> eList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isEmpty(eList)){
                code = "1";
                msg = "未查询到市场化交易信息";
            }else {
                double a = 0;
                double b = 0;
                for(Map e : eList){
                    a = a + MapUtil.doubleValue(e,"APPLY_CHARGE_VALUE");
                    b = b + MapUtil.doubleValue(e,"CLEARING_CHARGE_VALUE");
                }
                json.put("APPLY_CHARGE_VALUE_SUM",a);
                json.put("CLEARING_CHARGE_VALUE_SUM",b);
                json.put("eList",eList);
            }
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("7003","获取市场化交易信息出错");
        }try{
            json.put("code",code);
            json.put("msg",msg);
        }catch (Throwable e){
            e.printStackTrace();
        }

        return json.toString();
    }

    /**
     * 市场化交易公告
     * @param map
     * @return
     * @throws ServiceException
     */
    public String elecMarketNotice(Map map) throws ServiceException{
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try{
            String sql = ElecMarketSQL.elecMarketNotice(map);
            logger.info("sql====="+sql);
            List<Map> eList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isEmpty(eList)){
                code = "1";
                msg = "未查询到市场化交易信息";
            }else {
                json.put("eList",eList);
            }
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("7003","获取市场化交易信息出错");
        }try{
            json.put("code",code);
            json.put("msg",msg);
        }catch (Throwable e){
            e.printStackTrace();
        }

        return json.toString();
    }
}
