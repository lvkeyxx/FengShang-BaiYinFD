package com.domain;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class UserProfile  implements Serializable{


	String userId=null;
	String passWord=null;
	String nickName=null;
	String 	deviceId=null;
	
	String orgId=null;
	String orgName=null;
	
	
	public String getOrgId() {
		return orgId;
	}
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	public String getOrgName() {
		return orgName;
	}
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	public String getDeviceId() {
		return deviceId;
	}
	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	UserDomain domain=new UserDomain();
	Map bizMap=new HashMap();
	private Map orgInfo;//部门信息

	public Map getOrgInfo() {
		return orgInfo;
	}

	public void setOrgInfo(Map orgInfo) {
		this.orgInfo = orgInfo;
	}

	public Map getBizMap() {
		return bizMap;
	}
	public void setBizMap(Map bizMap) {
		this.bizMap = bizMap;
	}




	public UserProfile(String userId,String passWord,String deviceId) {
		this.userId=userId;
		this.passWord=passWord;
		this.deviceId=deviceId;
	}	
	
	public void setProperties(Map mapSSO) {
/*		this.userId=userId;
		this.passWord=passWord;
		this.deviceId=deviceId;*/
		this.nickName=(String) mapSSO.get("internal_display_name");
		this.orgId=(String) mapSSO.get("ORG_CODE");
		this.orgName=(String) mapSSO.get("ORG_NAME");
	}
	
	
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassWord() {
		return passWord;
	}

	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}

	public UserDomain getDomain() {
		return domain;
	}

	public void setDomain(UserDomain domain) {
		this.domain = domain;
	}

}
