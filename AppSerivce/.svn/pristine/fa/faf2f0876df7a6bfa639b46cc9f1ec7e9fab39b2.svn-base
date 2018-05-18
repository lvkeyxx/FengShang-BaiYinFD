package com.service;


import java.util.List;
import java.util.Map;

import com.dao.CommonDAO;
import com.domain.CommonDomain;

public class CommonService{
	private CommonDAO commonDAO;
	public Object listTable(CommonDomain commonDomain) {
		return commonDAO.getTableList(commonDomain);		
	}
	public CommonDAO getCommonDAO() {
		return commonDAO;
	}
	public void setCommonDAO(CommonDAO commonDAO) {
		this.commonDAO = commonDAO;
	}
	public Object executeFreeSql(String freeSql) {
		return commonDAO.executeFreeSql(freeSql);		
	}
	public Object getColumnVolumnFromId(String table,String columnName,String keyName,Object keyVolumn){
		Object columnVolumn="";
		String sql=" select "+columnName+" from " + table + " where " +keyName+"='"+keyVolumn+"'";		

		List list =(List)executeFreeSql(sql);
		for (int i = 0; i < list.size(); i++) {
			Map mapItem = (Map) list.get(i);
			columnVolumn = mapItem.get(columnName);
			break;
		}
		return columnVolumn;
	}
}
