package com.exception;

public class ServiceException extends Exception {

	public ServiceException(String code, String msg) {
		super();
		this.code = code;
		this.msg = msg.split("\n")[0].replaceAll("\"","\\\\\"");;
	}
	
	public ServiceException() {
		super();
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
	
	private	String	code="ServiceException";
	private	String	msg="This is Service Exception";
}
