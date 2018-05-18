package com.domain;

import com.constant.Constant;


public class Message {
	public Message(String code, String msg, String data) {
		super();
		this.code = code;
		this.msg = msg;
		this.data = data;
	}
	public Message(String code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	}
	
	public Message() {
		// TODO Auto-generated constructor stub
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	
	private	String	code=Constant.MSG_SUCCESS_CODE;
	private	String	msg=Constant.MSG_SUCCESS_MSG;
	private	String	data="{}";
	public String toString() {
		return "code="+code+" msg="+msg+" data="+data;
	}
	
}
