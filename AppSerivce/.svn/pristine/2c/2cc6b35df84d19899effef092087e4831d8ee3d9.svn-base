package com.cache;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import com.constant.Constant;

public class EhCache {
	CacheManager singletonManager=null;
	Cache memoryOnlyCache =null;
	Cache cache=null;

	public EhCache(String cacheID) {	      
	     // CacheManager manager = new CacheManager();
	     //创建一个缓存管理器
	     singletonManager = CacheManager.create();
	     //建立一个缓存实例
	     memoryOnlyCache = new Cache(cacheID, 1000, false, false,Constant.CACHE_TOTAL_TIMEOUT*60,Constant.CACHE_IDLE_TIMEOUT*60);
	     //在内存管理器中添加缓存实例
	     singletonManager.addCache(memoryOnlyCache);
	     cache = singletonManager.getCache(cacheID);
	}
	public void put(String key,Object value){
        Element element = new Element(key, value);
        cache.put(element);
	}
	public Object get(String key){
       Element element = cache.get(key);
       if (element == null) {  
           return null;  
       }  
       return element.getValue(); 
	}
	public void remove(String key){
		cache.remove(key);
	}
	public void shutdown(String key){
		 singletonManager.shutdown();
	}
	public static void main(String[] args) {
		  System.out.println(1111111);	      
	      System.out.println(22222222);
	}
	

}
