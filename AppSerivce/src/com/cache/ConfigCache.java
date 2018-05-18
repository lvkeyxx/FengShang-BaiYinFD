package com.cache;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.domain.UserProfile;
import com.utility.IbatisDBUtil;


public class ConfigCache {
	private final static ConfigCache INSTANCE = new ConfigCache();
	private Map mapSysConfig=new HashMap();	
	
	public Object  getMapSysConfig(String key) {
		return mapSysConfig.get(key);
	}
	public void setMapSysConfig(String key,Object v) {
		mapSysConfig.put(key, v);
	}
	//private Map mapUserProfile=new HashMap();	
	private EhCache mapUserProfile=new EhCache("userProfileCache");	
	private EhCache mapSystemCache=new EhCache("systemCache");
	
	private Map mapIndex=new HashMap();
	
	private static List indexIdList,indexUnitList;

	private ConfigCache() {		
//		indexIdList = new IbatisDBUtil().queryTable("SDICAPP.SDIC_INDEX_DIMENSION where 1=1 ");
//		indexUnitList = new IbatisDBUtil().queryTable("SDICAPP.SDIC_SIS_INDEX_MAPPING order by POWER_UNIT_ID ");
//
//		for (int i = 0; i < indexIdList.size(); i++) {
//			Map item=(Map)indexIdList.get(i);
////			mapIndex.put(item.get("INDEX_ID"), item.get("INDEX_NAME"));
//			mapIndex.put(""+item.get("INDEX_ID"), item);
//		}
	}
	public static ConfigCache getInstance() {
		return INSTANCE;
	}	
	
	public Map getIndexMapById(String indexId) {
		return (Map)mapIndex.get(indexId);
	}
	public String[] getUnitNoArrayById(String indexId) {
		//String unitNoArray[]=new String[indexUnitList.size()];
		List list=new ArrayList();
		for(int i=0;i<indexUnitList.size();i++){
			Map item=(Map)indexUnitList.get(i);
			String id=""+item.get("INDEX_ID");
			if(indexId.equals(id))		list.add(""+item.get("POWER_UNIT_ID"));		
		}
		return (String[])list.toArray(new String[0]);
	}	
//	public Map getIndexMapById(String Id) {
//
//			Map mapDictionary= new TreeMap();
//			for (int i = 0; i < indexIdList.size(); i++) {
//				Map item=(Map)indexIdList.get(i);
//				String id = ""+item.get("businID");
//				String name = ""+item.get("businName");
//				String bizKey = ""+item.get("businTypeID");
//				if(key.equals(bizKey))
//					mapDictionary.put(id, name);
//			}
//			return mapDictionary;
//	}
	public UserProfile getUserProfile(String userId) {
		return (UserProfile) mapUserProfile.get(userId);
	}
	public void setUserProfile(String userId,UserProfile userProfile) {
		mapUserProfile.put(userId,userProfile);
	}	
	public void removeUserProfile(String userId) {
		mapUserProfile.remove(userId);
	}	
	
	public Object getSystemCache(String key) {
		return mapSystemCache.get(key);
	}
	public void setSystemCache(String key,Serializable v) {
		mapSystemCache.put(key,v);
	}

}