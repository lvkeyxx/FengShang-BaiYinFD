package com.service.attendence.entity;

import java.io.Serializable;

/**
 * @Author:wangyg
 * @Description:
 * @Date:Created in 2018-03-14 18:19
 * @Modied By:
 **/
public class Attendence implements Serializable{

    public Attendence(Attendence attendence) {
        this.year = attendence.getYear();//所属年份
        this.month = attendence.getMonth();//所属月份
        this.date = attendence.getDate();//所属日
        this.week= attendence.getWeek();;//所属星期
        this.transactionId= attendence.getTransactionId();;//
        this.personalId= attendence.getPersonalId();//考勤人
        this.planStartTime= attendence.getPlanStartTime();//计划打卡开始时间
        this.planEndTime= attendence.getPlanEndTime();//计划打卡结束时间
        this.actualStartTime= attendence.getActualStartTime();//实际打卡开始时间
        this.actualEndTime= attendence.getActualEndTime();//实际打卡结束时间
        this.inBlueToothNo= attendence.getInBlueToothNo();//打卡时蓝牙号
        this.outBlueToothNo= attendence.getOutBlueToothNo();//下班打卡时蓝牙号
        this.checkInAddr= attendence.getCheckInAddr();//上班打卡蓝牙地址
        this.checkOutAddr= attendence.getCheckOutAddr();//下班打卡蓝牙地址
        this.checkInInfo= attendence.getCheckInInfo();//上班打卡提示
        this.checkOutInfo= attendence.getCheckOutInfo();//下班打卡提示
        this.checkInState= attendence.getCheckInState();//上班打卡状态
        this.checkOutState= attendence.getCheckOutState();//下班打卡状态
        this.note= attendence.getNote();//缺勤事由
        this.notePerson= attendence.getNotePerson();//记录事由人
        this.noteTime= attendence.getNoteTime();//记录事由时间
        this.dept= attendence.getDept();//测试部门
        this.confirmDate= attendence.getConfirmDate();//确认时间
        this.remarks= attendence.getRemarks();//备注字段
    }

    public Attendence() {

    }

    private static final long serialVersionUID = 4943893934802L;

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPersonalId() {
        return personalId;
    }

    public void setPersonalId(String personalId) {
        this.personalId = personalId;
    }

    public String getPlanStartTime() {
        return planStartTime;
    }

    public void setPlanStartTime(String planStartTime) {
        this.planStartTime = planStartTime;
    }

    public String getPlanEndTime() {
        return planEndTime;
    }

    public void setPlanEndTime(String planEndTime) {
        this.planEndTime = planEndTime;
    }

    public String getActualStartTime() {
        return actualStartTime;
    }

    public void setActualStartTime(String actualStartTime) {
        this.actualStartTime = actualStartTime;
    }

    public String getActualEndTime() {
        return actualEndTime;
    }

    public void setActualEndTime(String actualEndTime) {
        this.actualEndTime = actualEndTime;
    }

    public String getInBlueToothNo() {
        return inBlueToothNo;
    }

    public void setInBlueToothNo(String inBlueToothNo) {
        this.inBlueToothNo = inBlueToothNo;
    }

    public String getOutBlueToothNo() {
        return outBlueToothNo;
    }

    public void setOutBlueToothNo(String outBlueToothNo) {
        this.outBlueToothNo = outBlueToothNo;
    }

    public String getCheckInAddr() {
        return checkInAddr;
    }

    public void setCheckInAddr(String checkInAddr) {
        this.checkInAddr = checkInAddr;
    }

    public String getCheckOutAddr() {
        return checkOutAddr;
    }

    public void setCheckOutAddr(String checkOutAddr) {
        this.checkOutAddr = checkOutAddr;
    }

    public String getCheckInInfo() {
        return checkInInfo;
    }

    public void setCheckInInfo(String checkInInfo) {
        this.checkInInfo = checkInInfo;
    }

    public String getCheckOutInfo() {
        return checkOutInfo;
    }

    public void setCheckOutInfo(String checkOutInfo) {
        this.checkOutInfo = checkOutInfo;
    }

    public String getCheckInState() {
        return checkInState;
    }

    public void setCheckInState(String checkInState) {
        this.checkInState = checkInState;
    }

    public String getCheckOutState() {
        return checkOutState;
    }

    public void setCheckOutState(String checkOutState) {
        this.checkOutState = checkOutState;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getNotePerson() {
        return notePerson;
    }

    public void setNotePerson(String notePerson) {
        this.notePerson = notePerson;
    }

    public String getNoteTime() {
        return noteTime;
    }

    public void setNoteTime(String noteTime) {
        this.noteTime = noteTime;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getConfirmDate() {
        return confirmDate;
    }

    public void setConfirmDate(String confirmDate) {
        this.confirmDate = confirmDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    private int year;//所属年份
    private int month;//所属月份
    private int date;//所属日
    private String week;//所属星期
    private String transactionId;//
    private String personalId;//考勤人
    private String planStartTime;//计划打卡开始时间
    private String planEndTime;//计划打卡结束时间
    private String actualStartTime;//实际打卡开始时间
    private String actualEndTime;//实际打卡结束时间
    private String inBlueToothNo;//打卡时蓝牙号
    private String outBlueToothNo;//下班打卡时蓝牙号
    private String checkInAddr;//上班打卡蓝牙地址
    private String checkOutAddr;//下班打卡蓝牙地址
    private String checkInInfo;//上班打卡提示
    private String checkOutInfo;//下班打卡提示
    private String checkInState;//上班打卡状态
    private String checkOutState;//下班打卡状态
    private String note;//缺勤事由
    private String notePerson;//记录事由人
    private String noteTime;//记录事由时间
    private String dept;//测试部门
    private String confirmDate;//确认时间
    private String remarks;//备注字段

    @Override
    public String toString() {
        return "Attendence{" +
                "year=" + year +
                ", month=" + month +
                ", date=" + date +
                ", week='" + week + '\'' +
                ", transactionId='" + transactionId + '\'' +
                ", personalId='" + personalId + '\'' +
                ", planStartTime='" + planStartTime + '\'' +
                ", planEndTime='" + planEndTime + '\'' +
                ", actualStartTime='" + actualStartTime + '\'' +
                ", actualEndTime='" + actualEndTime + '\'' +
                ", inBlueToothNo='" + inBlueToothNo + '\'' +
                ", outBlueToothNo='" + outBlueToothNo + '\'' +
                ", checkInAddr='" + checkInAddr + '\'' +
                ", checkOutAddr='" + checkOutAddr + '\'' +
                ", checkInInfo='" + checkInInfo + '\'' +
                ", checkOutInfo='" + checkOutInfo + '\'' +
                ", checkInState='" + checkInState + '\'' +
                ", checkOutState='" + checkOutState + '\'' +
                ", note='" + note + '\'' +
                ", notePerson='" + notePerson + '\'' +
                ", noteTime='" + noteTime + '\'' +
                ", dept='" + dept + '\'' +
                ", confirmDate='" + confirmDate + '\'' +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
