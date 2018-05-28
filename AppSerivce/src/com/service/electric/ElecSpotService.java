package com.service.electric;

import com.exception.ServiceException;
import com.service.AJsonService;
import com.service.IJsonService;
import com.service.electric.sql.ElecSpotSQL;
import com.utility.IbatisDBUtil;
import com.utility.ListUtil;
import com.utility.MapUtil;
import org.json.JSONObject;

import java.util.List;
import java.util.Map;

/**现货交易
 * Created by yangxx on 2018/5/25.
 */
public class ElecSpotService extends AJsonService implements IJsonService {

    /**
     * 现货交易列表
     * @param map
     * @return
     * @throws ServiceException
     */
    public String elecSpotList (Map map) throws ServiceException{
        JSONObject json = new JSONObject();
        String code = "0";
        String msg = "success";
        try{
            String sql = ElecSpotSQL.elecSpotList(map);
            logger.info("sql===="+sql);
            List<Map> sList = new IbatisDBUtil().executeSql(sql);
            if(ListUtil.isEmpty(sList)){
                code = "1";
                msg = "未查询到现货交易信息";
            }else {
                double a = 0;
                double b = 0;
                double c = 0;
                double d = 0;
                for(Map x : sList){
                    a = a + MapUtil.doubleValue(x,"APPLY_CHARGE_VALUE")*MapUtil.doubleValue(x,"APPLY_CHARGE_PRICE");
                    b = b + MapUtil.doubleValue(x,"APPLY_CHARGE_VALUE");
                    c = c + MapUtil.doubleValue(x,"CLEARING_CHARGE_VALUE")*MapUtil.doubleValue(x,"CLEARING_CHARGE_PRICE");
                    d = d + MapUtil.doubleValue(x,"CLEARING_CHARGE_VALUE");
                }
                json.put("APPLY_CHARGE_PRICE_SUM",a/b);
                json.put("CLEARING_CHARGE_PRICE_SUM",c/d);
                json.put("APPLY_CHARGE_VALUE_SUM",b);
                json.put("CLEARING_CHARGE_VALUE_SUM",d);
                json.put("sList",sList);
            }
        }catch (Throwable e){
            e.printStackTrace();
            throw new ServiceException("7003","获取现货交易信息出错");
        }try {
            json.put("code",code);
            json.put("msg",msg);
        }catch (Throwable e){
            e.printStackTrace();
        }

        return json.toString();
    }
}
