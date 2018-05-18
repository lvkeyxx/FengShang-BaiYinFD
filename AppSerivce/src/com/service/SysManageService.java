package com.service;

import java.util.Map;

import com.utility.baiyin.BaiyinUtils;
import org.json.JSONObject;

import com.constant.Constant;
import com.exception.ServiceException;
import com.utility.IbatisDBUtil;

public class SysManageService extends AJsonService implements IJsonService {
	
	
	/**
	 * 获取最新版本
	 * @param map TODO
	 * @return
	 */
	public JSONObject getNewVersion(Map map) throws ServiceException{
		
		JSONObject	jsonResult = new JSONObject();
		String exist = "N";
		
		try{
//			String strSql = "select * from SDICAPP.WEB_CATALOG";
			String appVersion = (String) map.get(Constant.APP_VERSION);
//			List<Map> list = new IbatisDBUtil().executeSql(strSql);
			String version = "";
//			if(null!=list && list.size()==1){
//				Map item = (Map) list.get(0);
//				version = ""+item.get("APP_VERSION");
//			}
			version = IbatisDBUtil.getDictionaryValue("APP_VERSION","Constant");
			if(!version.equals(appVersion)) {
				exist = "Y";
			}
			jsonResult.put("exist", exist);
//			String uri = (String) ConfigCache.getInstance().getMapSysConfig(Constant.SERVER_URI + Thread.currentThread().getId());
//			String webRoot = (String) ConfigCache.getInstance().getMapSysConfig(Constant.WEB_ROOT);
//			String url= BaiyinUtils.getUrl(url);
			jsonResult.put("iosUrl","itms-apps://itunes.apple.com/cn/app/id1346435448?mt=8");
			jsonResult.put("url", url+Constant.WEB_ROOT + "/appDownload.html");
		} catch (Exception e) {
			logger.error(e.getMessage());
			e.printStackTrace();
			throw new ServiceException("0601","查询App新版本信息失败");
		}			
		return jsonResult;
	}
}
