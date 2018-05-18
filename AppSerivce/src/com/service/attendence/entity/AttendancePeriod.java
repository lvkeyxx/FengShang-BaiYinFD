package com.service.attendence.entity;

import java.util.Date;

public class AttendancePeriod {

	public AttendancePeriod() {
		
	}
	@Override
	public String toString() {
		return "AttendancePeriod [startTime=" + startTime + ", endTime=" + endTime + ", periodDayStr=" + periodDayStr
				+ "]";
	}
	public AttendancePeriod(Date startTime, Date endTime, String periodDayStr) {
		super();
		this.startTime = startTime;
		this.endTime = endTime;
		this.periodDayStr = periodDayStr;
	}
	private Date startTime;
	private Date endTime;
	private String periodDayStr;
	
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public String getPeriodDayStr() {
		return periodDayStr;
	}
	public void setPeriodDayStr(String periodDayStr) {
		this.periodDayStr = periodDayStr;
	}
}
