package com.service.electric.sql;

import com.utility.MapUtil;

import java.util.Map;

/**市场化交易
 * Created by yangxx on 2018/5/24.
 */
public class ElecMarketSQL {

    /**
     * 交易列表
     * @param map
     * @return
     */
    public static String elecMarketList(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append(" select " +
                "       TRADE_MONTH," +
                "       sum(APPLY_CHARGE_VALUE)  APPLY_CHARGE_VALUE," +
                "       sum(CLEARING_CHARGE_VALUE)  CLEARING_CHARGE_VALUE," +
                "       ifsapp.Company_Site_API.Get_Description(CONTRACT) CONTRANCT_NAME" +
                "  from ifsapp.C_ELEC_MARKET_TRADE_DETAIL" );
        sb.append(" where TRADE_MONTH = '");
        sb.append(MapUtil.stringValue(map,"TRADE_MONTH"));
        sb.append("'");
        sb.append(" group by TRADE_MONTH,ifsapp.Company_Site_API.Get_Description(CONTRACT)");
        sb.append(" order by TRADE_MONTH desc");

        return sb.toString();
    }

    /**
     * 交易公告
     * @param map
     * @return
     */
    public static String elecMarketNotice(Map map){
        StringBuffer sb = new StringBuffer();
        sb.append(" select TRADE_NO, TITLE, CONTENT, BILLING_CHARGE_PRICE " +
                "  from ifsapp.C_ELEC_MARKET_TRADE" );
        if(MapUtil.valueIsNotNull(map,"TITLE")){
            sb.append(" where TITLE like '%");
            sb.append(MapUtil.stringValue(map,"TITLE"));
            sb.append("%'");
        }
        if(MapUtil.valueIsNotNull(map,"CONTENT")){
            sb.append(" where CONTENT like %'");
            sb.append(MapUtil.stringValue(map,"CONTENT"));
            sb.append("%'");
        }

        return sb.toString();
    }
}
