package com.service.electric.sql;

import com.utility.MapUtil;

import java.util.Map;

/**现货交易
 * Created by yangxx on 2018/5/25.
 */
public class ElecSpotSQL {

    /**
     * 现货交易列表
     * @param map
     * @return
     */
    public static String elecSpotList(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT ");
        if(MapUtil.valueIsNotNull(map,"TRADE_YEAR")){
            sb.append(" substr(TRADE_DAY,1,4),");
        }
        if(MapUtil.valueIsNotNull(map,"TRADE_MONTH")){
            sb.append(" substr(TRADE_DAY,1,6),");
        }
        if(MapUtil.valueIsNotNull(map,"TRADE_DAY")){
            sb.append(" TRADE_DAY,");
        }
        sb.append("     IFSAPP.Company_Site_API.Get_Description(contract) CONTRACT_NAME," +
                "       sum(apply_charge_value) APPLY_CHARGE_VALUE," +
                "       sum(apply_charge_price*apply_charge_value)/sum(apply_charge_value) APPLY_CHARGE_PRICE," +
                "       sum(clearing_charge_value) CLEARING_CHARGE_VALUE," +
                "       sum(clearing_charge_price) CLEARING_CHARGE_PRICE" +
                "  FROM IFSAPP.C_ELEC_SPOT_TRADE");
        sb.append(" WHERE 1=1 ");
        if(MapUtil.valueIsNotNull(map,"TRADE_YEAR")){
            sb.append(" and substr(TRADE_DAY,1,4) = '");
            sb.append(MapUtil.stringValue(map,"TRADE_YEAR"));
            sb.append("'");
            sb.append(" group by substr(TRADE_DAY,1,4),IFSAPP.Company_Site_API.Get_Description(contract)");
            sb.append(" order by substr(TRADE_DAY,1,4) desc");
        }
        if(MapUtil.valueIsNotNull(map,"TRADE_MONTH")){
            sb.append(" and substr(TRADE_DAY,1,6) = '");
            sb.append(MapUtil.stringValue(map,"TRADE_MONTH"));
            sb.append("'");
            sb.append(" group by substr(TRADE_DAY,1,6),IFSAPP.Company_Site_API.Get_Description(contract)");
            sb.append(" order by substr(TRADE_DAY,1,6) desc");
        }
        if(MapUtil.valueIsNotNull(map,"TRADE_DAY")){
            sb.append(" and TRADE_DAY = '");
            sb.append(MapUtil.stringValue(map,"TRADE_DAY"));
            sb.append("'");
            sb.append(" group by TRADE_DAY,IFSAPP.Company_Site_API.Get_Description(contract)");
            sb.append(" order by TRADE_DAY desc");
        }

        return sb.toString();
    }
}