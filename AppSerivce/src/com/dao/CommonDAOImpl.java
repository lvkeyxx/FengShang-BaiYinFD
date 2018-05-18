package com.dao;

import ipacs.dataaccess.impl.IpacsStoreProcedureDaoImpl;

import com.domain.CommonDomain;

public class CommonDAOImpl extends IpacsStoreProcedureDaoImpl implements CommonDAO {

	public Object getTableList(CommonDomain commonDomain) {
		
		return smcTemplate.queryForList("common_table",commonDomain);
	}

	public Object executeFreeSql(String freeSql) {
		return smcTemplate.queryForList("execute_free_sql",freeSql);
	}
	
	
}
