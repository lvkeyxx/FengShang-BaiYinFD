DROP TABLESPACE SDICAPP INCLUDING CONTENTS AND DATAFILES;

--���Կ�
CREATE TABLESPACE SDICAPP DATAFILE 
  '/u01/app/oradata/PROD/sdicapp.dbf' SIZE 600M AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED
LOGGING
ONLINE
PERMANENT
EXTENT MANAGEMENT LOCAL AUTOALLOCATE
BLOCKSIZE 8K
SEGMENT SPACE MANAGEMENT AUTO
FLASHBACK ON;

--��ʽ��
CREATE TABLESPACE SDICAPP DATAFILE 
  '+PROD_DATA/prod/datafile/sdicapp.dbf' SIZE 600M AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED
LOGGING
ONLINE
PERMANENT
EXTENT MANAGEMENT LOCAL AUTOALLOCATE
BLOCKSIZE 8K
SEGMENT SPACE MANAGEMENT AUTO
FLASHBACK ON;

DROP USER SDICAPP CASCADE;

CREATE USER SDICAPP
  IDENTIFIED BY "IFSAPP"
  DEFAULT TABLESPACE SDICAPP
  TEMPORARY TABLESPACE TEMP
  PROFILE DEFAULT
  ACCOUNT UNLOCK;
  -- 3 Roles for SDICAPP 
  GRANT CONNECT TO SDICAPP;
  GRANT RESOURCE TO SDICAPP;
  GRANT DBA TO SDICAPP;
  ALTER USER SDICAPP DEFAULT ROLE ALL;
  -- 1 System Privilege for SDICAPP 
  GRANT UNLIMITED TABLESPACE TO SDICAPP;
  -- 4 Object Privileges for SDICAPP  APPROVAL_FORM_CONTRAST_TAB/APP_FORM_INFO_DONE Ϊ9��
  --GRANT SELECT ON IFSAPP.APPROVAL_FORM_CONTRAST_TAB TO SDICAPP;
  --GRANT SELECT ON IFSAPP.APP_FORM_INFO_DONE TO SDICAPP;
  GRANT SELECT ON IFSAPP.TODO_ITEM_COMPLETED TO SDICAPP;
  GRANT SELECT ON IFSAPP.TODO_ITEM_TO_APPROVE_LINK_TAB TO SDICAPP;
    
grant create session to SDICAPP with admin option;
grant create table to SDICAPP with admin option;
grant create sequence to SDICAPP with admin option;

--�������ݱ�������������
CREATE TABLE SDIC_INDEX_DATA (
MEASURE_PERIOD VARCHAR(10) NOT NULL, --ʱ��
MEASURE_TYPE VARCHAR(2) NOT NULL, --ʱ������
COMPANY_ID INT NOT NULL, --��˾ID
INDEX_ID INT NOT NULL, --ָ��ID
POWER_UNIT_ID INT NOT NULL, --����ID
NUM_VALUE Float, --ָ��ֵ
LAST_UPDATE_DATE date DEFAULT sysdate --������ʱ��
);

alter table SDIC_INDEX_DATA
  add constraint PK_KEY primary key (MEASURE_PERIOD, COMPANY_ID, INDEX_ID, POWER_UNIT_ID, MEASURE_TYPE);

--����SIS���ݱ�
CREATE TABLE SDIC_SIS_DATA (
MEASURE_POINT_ID VARCHAR(200), --�������
MEASURE_TIME VARCHAR(10), --���ʱ��
MEASURE_POINT_VALUE Float, --���ֵ
LAST_UPDATE_DATE date DEFAULT sysdate --������ʱ��
);

--�������ָ��ӳ���
CREATE TABLE SDIC_SIS_INDEX_MAPPING (
ID INT NOT NULL, --id
MEASURE_POINT_ID VARCHAR(200), --���ID
MEASURE_POINT_NAME VARCHAR(200), --�������
INDEX_ID INT NOT NULL, --ָ��ID
POWER_UNIT_ID INT NOT NULL, --�����
primary key (MEASURE_POINT_ID, INDEX_ID, POWER_UNIT_ID)
);

----����ָ��ά�ȱ�
CREATE TABLE SDIC_INDEX_DIMENSION (
INDEX_ID INT NOT NULL PRIMARY KEY, --ָ��ID
INDEX_NAME VARCHAR(200), --ָ������
INDEX_TYPE VARCHAR(200), --ָ������
CAL_TYPE VARCHAR(2) DEFAULT 'n', --��������
MEASURE_TYPE VARCHAR(2) NOT NULL, --ʱ������
IOC_IMAGE VARCHAR(200),      --ͼ���ļ�
UNIT_NAME NVARCHAR2(20)     --ָ�굥λ
);

--�����
CREATE TABLE SDIC_APP_SUGGESTION (
ID INTEGER NOT NULL PRIMARY KEY,   --����ID��
SUBJECT  VARCHAR2(50),    --���������
CONTENT  VARCHAR2(2000),    --���������
PHONE  VARCHAR2(50),    --��������ϵ��ʽ
USER_NAME  VARCHAR2(50),  --����������
USER_ID  VARCHAR2(20),    --������ID
ORG_CODE VARCHAR2(50),    --��֯��������
SUBMIT_TIME date DEFAULT sysdate --������ʱ�� 
);

--����sequence
CREATE SEQUENCE seqSuggestion
INCREMENT BY 1
START WITH 1
NOMAXvalue
NOCYCLE
CACHE 10;

--��־��
CREATE TABLE SDIC_APP_LOG (
ID INTEGER NOT NULL PRIMARY KEY,   --��־ID��
REQUEST_URL VARCHAR2(2000),       --url
CLIENT_IP VARCHAR2(50),            --�ͻ��˵�ַ
CLIENT_TYPE VARCHAR2(10) default 'APP', --�ͻ�������(APP,WEB)
USER_ID VARCHAR2(50),               --�û�ID
SERVICE_NAME VARCHAR2(50),         --������
TRANS_NAME VARCHAR2(50),           --������
RESPONSE_CODE VARCHAR2(10),       --������
INPUT_PARAM_MAP VARCHAR2(2000),    --�������
OUTPUT_PARAM_MAP CLOB,             --������
START_TIME TIMESTAMP(6) WITH LOCAL TIME ZONE,                   --��ʼʱ��
END_TIME TIMESTAMP(6) WITH LOCAL TIME ZONE,                 --����ʱ��
LAST_UPDATE_DATE date DEFAULT sysdate --������ʱ�� 
);

--��־sequence
CREATE SEQUENCE seqLog
INCREMENT BY 1
START WITH 1
NOMAXvalue
NOCYCLE
CACHE 10;

CREATE TABLE SDIC_APP_USER_DEVICE (
DEVICE_ID VARCHAR(100),
USER_ID NUMBER,
REGISTER_TIME date DEFAULT sysdate,
isdelete VARCHAR2(1) DEFAULT '1',
LOGIN_NAME VARCHAR(50)
);

comment on column SDIC_APP_USER_DEVICE.device_id
  is '�豸��';
comment on column SDIC_APP_USER_DEVICE.user_id
  is '�û�ID';
comment on column SDIC_APP_USER_DEVICE.register_time
  is '����ʱ��';
comment on column SDIC_APP_USER_DEVICE.isdelete
  is '��Ч��־,1Ϊ��Ч,0Ϊ��Ч';
  
alter table SDIC_APP_USER_DEVICE
  add constraint UK_USER_ID_DEVICE_ID primary key (DEVICE_ID, USER_ID);


create table SDIC_APP_USER
(
  user_id    NUMBER not null,
  user_name  VARCHAR2(50),
  org_id     NUMBER,
  login_name VARCHAR2(50) unique,
  password   VARCHAR2(50),
  image      VARCHAR2(200),
  isdelete   VARCHAR2(1)
);

comment on column SDIC_APP_USER.user_id
  is '�û�ID';
comment on column SDIC_APP_USER.user_name
  is '�û���';
comment on column SDIC_APP_USER.org_id
  is '����ID';
comment on column SDIC_APP_USER.login_name
  is '��¼��';
comment on column SDIC_APP_USER.password
  is '����';
comment on column SDIC_APP_USER.image
  is 'ͷ��ͼƬ·��';
comment on column SDIC_APP_USER.isdelete
  is '��Ч��־,1Ϊ��Ч,0Ϊ��Ч';

alter table SDIC_APP_USER
  add constraint PK_USER_ID primary key (USER_ID);
  
create table SDIC_APP_ROLE
(
  role_id   NUMBER not null,
  role_name VARCHAR2(20),
  isdelete  VARCHAR2(1)
);

comment on column SDIC_APP_ROLE.role_id
  is '��ɫID';
comment on column SDIC_APP_ROLE.role_name
  is '��ɫ����';
comment on column SDIC_APP_ROLE.isdelete
  is '��Ч��־,1Ϊ��Ч,0Ϊ��Ч';

alter table SDIC_APP_ROLE
  add constraint PK_ROLE_ID primary key (ROLE_ID);
  
create table SDIC_APP_USER_ROLE
(
  user_id NUMBER,
  role_id NUMBER
);

comment on column SDIC_APP_USER_ROLE.user_id
  is '�û�ID';
comment on column SDIC_APP_USER_ROLE.role_id
  is '��ɫID';
  
alter table SDIC_APP_USER_ROLE
  add constraint PK_USER_ID_ROLE_ID primary key (USER_ID, ROLE_ID);
  
create table SDIC_APP_PRIVILEGE
(
  privilege_id   NUMBER not null,
  privilege_name VARCHAR2(50),
  privilege_type VARCHAR2(20),
  isdelete       VARCHAR2(1)
);

comment on column SDIC_APP_PRIVILEGE.privilege_id
  is 'Ȩ��ID';
comment on column SDIC_APP_PRIVILEGE.privilege_name
  is 'Ȩ������';
comment on column SDIC_APP_PRIVILEGE.privilege_type
  is 'Ȩ������(��˵�ΪMENU)';
comment on column SDIC_APP_PRIVILEGE.isdelete
  is '��Ч��־,1Ϊ��Ч,0Ϊ��Ч';

alter table SDIC_APP_PRIVILEGE
  add constraint PK_PRIVILEGE_ID primary key (PRIVILEGE_ID);
  
create table SDIC_APP_ROLE_PRIVILEGE
(
  role_id      NUMBER,
  privilege_id NUMBER
);

comment on column SDIC_APP_ROLE_PRIVILEGE.role_id
  is '��ɫID';
comment on column SDIC_APP_ROLE_PRIVILEGE.privilege_id
  is 'Ȩ��ID';
  
alter table SDIC_APP_ROLE_PRIVILEGE
  add constraint PK_ROLE_ID_PRIVILEGE_ID primary key (ROLE_ID, PRIVILEGE_ID);
  
create table SDIC_APP_MENU
(
  menu_id   NUMBER not null,
  menu_name VARCHAR2(20),
  parent_id NUMBER,
  url       VARCHAR2(200),
  sort      NUMBER
);

comment on column SDIC_APP_MENU.menu_id
  is '�˵�ID';
comment on column SDIC_APP_MENU.menu_name
  is '�˵�����';
comment on column SDIC_APP_MENU.parent_id
  is '�����˵�ID';
comment on column SDIC_APP_MENU.url
  is '�˵�����';
comment on column SDIC_APP_MENU.sort
  is '���';

alter table SDIC_APP_MENU
  add constraint PK_MENU_ID primary key (MENU_ID);

create table SDIC_APP_MENU_PRIVILEGE
(
  privilege_id NUMBER,
  menu_id      NUMBER
);

comment on column SDIC_APP_MENU_PRIVILEGE.privilege_id
  is 'Ȩ��ID';
comment on column SDIC_APP_MENU_PRIVILEGE.menu_id
  is '�˵�ID';
  
alter table SDIC_APP_MENU_PRIVILEGE
  add constraint PK_PRIVILEGE_ID_MENU_ID primary key (PRIVILEGE_ID, MENU_ID);
  
create table SDIC_APP_ORG
(
  org_id     NUMBER not null,
  org_name   VARCHAR2(50),
  parent_id  NUMBER,
  short_name VARCHAR2(50),
  sort       NUMBER,
  IFS_ORG_ID VARCHAR2(20)
);

comment on column SDIC_APP_ORG.org_id
  is '����ID';
comment on column SDIC_APP_ORG.org_name
  is '��������';
comment on column SDIC_APP_ORG.parent_id
  is '��������ID';
comment on column SDIC_APP_ORG.short_name
  is '�������';
comment on column SDIC_APP_ORG.sort
  is '���';
comment on column SDIC_APP_ORG.IFS_ORG_ID
  is 'IFS����ID';
  
alter table SDIC_APP_ORG
  add constraint PK_ORG_ID primary key (ORG_ID);
  
alter table SDIC_APP_ORG
  add constraint UK_IFS_ORG_ID unique (IFS_ORG_ID);
  
create table SDIC_APP_GROUP
(
  group_id   NUMBER not null,
  group_name VARCHAR2(50),
  isdelete   VARCHAR2(1)
);

comment on column SDIC_APP_GROUP.group_id
  is '�û���ID';
comment on column SDIC_APP_GROUP.group_name
  is '�û�������';
comment on column SDIC_APP_GROUP.isdelete
  is '��Ч��־,1Ϊ��Ч,0Ϊ��Ч';
  
alter table SDIC_APP_GROUP
  add constraint PK_GROUP_ID primary key (GROUP_ID);
  
create table SDIC_APP_USER_GROUP
(
  user_id  NUMBER,
  group_id NUMBER
);

comment on column SDIC_APP_USER_GROUP.user_id
  is '�û�ID';
comment on column SDIC_APP_USER_GROUP.group_id
  is '�û���ID';
  
alter table SDIC_APP_USER_GROUP
  add constraint PK_USER_ID_GROUP_ID primary key (USER_ID, GROUP_ID);

create table SDIC_APP_GROUP_ROLE
(
  role_id  NUMBER,
  group_id NUMBER
);

comment on column SDIC_APP_GROUP_ROLE.role_id
  is '��ɫID';
comment on column SDIC_APP_GROUP_ROLE.group_id
  is '�û���ID';
  
alter table SDIC_APP_GROUP_ROLE
  add constraint PK_ROLE_ID_GROUP_ID primary key (ROLE_ID, GROUP_ID);
  

--ҵ���
-- Create table
create table SDIC_APP_BUSIN_TYPE
(
  type_id   VARCHAR2(20) not null,
  type_name VARCHAR2(50),
  isdelete  VARCHAR2(1)
);

-- Add comments to the columns 
comment on column SDIC_APP_BUSIN_TYPE.type_id  is 'ҵ�����ͱ���';
comment on column SDIC_APP_BUSIN_TYPE.type_name  is 'ҵ����������';
comment on column SDIC_APP_BUSIN_TYPE.isdelete  is '��Ч��־,1Ϊ��Ч,0Ϊ��Ч';
-- Create/Recreate primary, unique and foreign key constraints 
alter table SDIC_APP_BUSIN_TYPE
  add constraint PK_TYPE_ID primary key (TYPE_ID);
 




--�ֵ��
-- Create table
create table SDIC_APP_DICTIONARY
(
  busin_id   VARCHAR2(20) not null,
  busin_name VARCHAR2(500),
  type_id    VARCHAR2(20) not null,
  isdelete   VARCHAR2(1),
  sort       NUMBER
);

-- Add comments to the columns 
comment on column SDIC_APP_DICTIONARY.busin_id  is 'ҵ�����';
comment on column SDIC_APP_DICTIONARY.busin_name  is 'ҵ������';
comment on column SDIC_APP_DICTIONARY.type_id  is 'ҵ�����ͱ���';
comment on column SDIC_APP_DICTIONARY.isdelete  is '��Ч��־,1Ϊ��Ч,0Ϊ��Ч';
comment on column SDIC_APP_DICTIONARY.sort  is '���';
-- Create/Recreate primary, unique and foreign key constraints 
alter table SDIC_APP_DICTIONARY
  add constraint PK_BUSIN_ID primary key (BUSIN_ID, TYPE_ID);
  
--��Ϣ���Ͷ��б�
CREATE TABLE SDIC_APP_MESSAGE (
ID INT primary key,--ID��
DESTINATION  VARCHAR(50),--����Ŀ��
CONTENT VARCHAR(2000),--��������
TYPE VARCHAR(10),--��������
SENDRESULT VARCHAR(10) DEFAULT 'FALSE', --���ͽ��״̬
RESPONSECODE INT, --���������
SENDCOUNT INT DEFAULT 0,--���ʹ���
REMARK VARCHAR(100), --��ע
SENDTIME timestamp DEFAULT sysdate, --����ʱ��
CREATETIME timestamp DEFAULT sysdate--����ʱ��
);

--������
CREATE TABLE SDIC_APP_ATTACHMENT(
ATTACHMENT_ID INT,--������ID��
ATTACHMENT_NO INT,--������
USER_ID VARCHAR(50),--�ϴ���
FILE_SIZE VARCHAR(20),--�ֽ���
FILE_EXTENSION VARCHAR(10),--�ļ���׺
FILE_NAME VARCHAR(200), --�ļ�����
FILE_NAME_SOURCE VARCHAR(200), --ԭ�ļ�����
FILE_TYPE VARCHAR(50), --�ļ�����
FILE_PATH VARCHAR(500),--�ļ�·��
LAST_UPDATE_TIME timestamp DEFAULT systimestamp, --������ʱ��
CREATETIME timestamp DEFAULT systimestamp--����ʱ��
);

alter table SDIC_APP_ATTACHMENT
  add constraint PK_ATTACHMENT_ID primary key (ATTACHMENT_ID, ATTACHMENT_NO);

insert into  SDIC_APP_ORG values (1,'�ܻ���',0,'�ܻ���',1,'00');
insert into sdic_app_menu values(1,'�˵�',0,'',1);
insert into SDIC_APP_USER values(1,'admin',1,'admin','bjadmin2017','','1');

grant select on sdic_index_data to ifsapp;
grant select on sdic_index_dimension to ifsapp;
grant select on sdic_sis_index_mapping to ifsapp;
grant select on sdic_sis_data to ifsapp;
grant select on SDIC_APP_SUGGESTION to ifsapp;
grant insert on SDIC_APP_SUGGESTION to ifsapp;
grant select on SDIC_APP_LOG to ifsapp;
grant insert on SDIC_APP_LOG to ifsapp;
grant select on seqLog to ifsapp;
grant select on seqSuggestion to ifsapp;
grant select on SDIC_APP_USER_DEVICE to ifsapp;
grant insert on SDIC_APP_USER_DEVICE to ifsapp;
grant select on  SDIC_APP_USER to ifsapp;
grant insert on  SDIC_APP_USER to ifsapp;
grant update on  SDIC_APP_USER to ifsapp;
grant select on  SDIC_APP_ROLE to ifsapp;
grant select on  SDIC_APP_USER_ROLE to ifsapp;
grant select on  SDIC_APP_PRIVILEGE to ifsapp;
grant select on  SDIC_APP_ROLE_PRIVILEGE to ifsapp;
grant select on  SDIC_APP_MENU to ifsapp;
grant select on  SDIC_APP_MENU_PRIVILEGE to ifsapp;
grant select on  SDIC_APP_ORG to ifsapp;
grant insert on  SDIC_APP_ORG to ifsapp;
grant update on  SDIC_APP_ORG to ifsapp;
grant select on  SDIC_APP_GROUP to ifsapp;
grant select on  SDIC_APP_USER_GROUP to ifsapp;
grant select on  SDIC_APP_GROUP_ROLE to ifsapp;

grant select, insert, update, delete on SDIC_APP_BUSIN_TYPE to ifsapp;
grant select, insert, update, delete on SDIC_APP_DICTIONARY to ifsapp;

grant select, insert, update on  SDIC_APP_MESSAGE to ifsapp;
grant select, insert, update, delete on  SDIC_APP_ATTACHMENT to ifsapp;
    
    
    
    
    
    
    
    
    