package com.domain;
import ipacs.dataaccess.model.PO;
import ipacs.dataaccess.model.POImpl;

import java.util.List;

public class CommonDomain extends POImpl implements PO {
	List  conditions=null;

	public List getConditions() {
		return conditions;
	}

	public void setConditions(List conditions) {
		this.conditions = conditions;
	}
	private String orderString;

	public String getOrderString() {
		return orderString;
	}

	public void setOrderString(String orderString) {
		this.orderString = orderString;
	}
}
