-----------------------------------------------------
-- Export file for user SDICAPP                    --
-- Created by Administrator on 2018/5/29, 16:04:15 --
-----------------------------------------------------

spool sdicapp-ifsapp.log

prompt
prompt Creating table SDIC_APP_ATTACHMENT
prompt ==================================
prompt
create table SDICAPP.SDIC_APP_ATTACHMENT
(
  ATTACHMENT_ID    INTEGER not null,
  ATTACHMENT_NO    INTEGER not null,
  USER_ID          VARCHAR2(50),
  FILE_SIZE        VARCHAR2(20),
  FILE_EXTENSION   VARCHAR2(10),
  FILE_NAME        VARCHAR2(200),
  FILE_NAME_SOURCE VARCHAR2(200),
  FILE_TYPE        VARCHAR2(50),
  FILE_PATH        VARCHAR2(500),
  LAST_UPDATE_TIME TIMESTAMP(6) default systimestamp,
  CREATETIME       TIMESTAMP(6) default systimestamp--创建时间
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
alter table SDICAPP.SDIC_APP_ATTACHMENT
  add constraint PK_ATTACHMENT_ID primary key (ATTACHMENT_ID, ATTACHMENT_NO)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_BUSIN_TYPE
prompt ==================================
prompt
create table SDICAPP.SDIC_APP_BUSIN_TYPE
(
  TYPE_ID   VARCHAR2(20) not null,
  TYPE_NAME VARCHAR2(50),
  ISDELETE  VARCHAR2(1)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_BUSIN_TYPE.TYPE_ID
  is '业务类型编码';
comment on column SDICAPP.SDIC_APP_BUSIN_TYPE.TYPE_NAME
  is '业务类型名称';
comment on column SDICAPP.SDIC_APP_BUSIN_TYPE.ISDELETE
  is '有效标志,1为有效,0为无效';
alter table SDICAPP.SDIC_APP_BUSIN_TYPE
  add constraint PK_TYPE_ID primary key (TYPE_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_DICTIONARY
prompt ==================================
prompt
create table SDICAPP.SDIC_APP_DICTIONARY
(
  BUSIN_ID   VARCHAR2(20) not null,
  BUSIN_NAME VARCHAR2(500),
  TYPE_ID    VARCHAR2(20) not null,
  ISDELETE   VARCHAR2(1),
  SORT       NUMBER
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SDICAPP.SDIC_APP_DICTIONARY.BUSIN_ID
  is '业务代码';
comment on column SDICAPP.SDIC_APP_DICTIONARY.BUSIN_NAME
  is '业务名称';
comment on column SDICAPP.SDIC_APP_DICTIONARY.TYPE_ID
  is '业务类型编码';
comment on column SDICAPP.SDIC_APP_DICTIONARY.ISDELETE
  is '有效标志,1为有效,0为无效';
comment on column SDICAPP.SDIC_APP_DICTIONARY.SORT
  is '序号';
alter table SDICAPP.SDIC_APP_DICTIONARY
  add constraint PK_BUSIN_ID primary key (BUSIN_ID, TYPE_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table SDIC_APP_GROUP
prompt =============================
prompt
create table SDICAPP.SDIC_APP_GROUP
(
  GROUP_ID   NUMBER not null,
  GROUP_NAME VARCHAR2(50),
  ISDELETE   VARCHAR2(1)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_GROUP.GROUP_ID
  is '用户组ID';
comment on column SDICAPP.SDIC_APP_GROUP.GROUP_NAME
  is '用户组名称';
comment on column SDICAPP.SDIC_APP_GROUP.ISDELETE
  is '有效标志,1为有效,0为无效';
alter table SDICAPP.SDIC_APP_GROUP
  add constraint PK_GROUP_ID primary key (GROUP_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_GROUP_ROLE
prompt ==================================
prompt
create table SDICAPP.SDIC_APP_GROUP_ROLE
(
  ROLE_ID  NUMBER not null,
  GROUP_ID NUMBER not null
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_GROUP_ROLE.ROLE_ID
  is '角色ID';
comment on column SDICAPP.SDIC_APP_GROUP_ROLE.GROUP_ID
  is '用户组ID';
alter table SDICAPP.SDIC_APP_GROUP_ROLE
  add constraint PK_ROLE_ID_GROUP_ID primary key (ROLE_ID, GROUP_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_LOG
prompt ===========================
prompt
create table SDICAPP.SDIC_APP_LOG
(
  ID               INTEGER not null,
  REQUEST_URL      VARCHAR2(2000),
  CLIENT_IP        VARCHAR2(50),
  CLIENT_TYPE      VARCHAR2(10) default 'APP',
  USER_ID          VARCHAR2(50),
  SERVICE_NAME     VARCHAR2(50),
  TRANS_NAME       VARCHAR2(500),
  RESPONSE_CODE    VARCHAR2(10),
  INPUT_PARAM_MAP  VARCHAR2(2000),
  OUTPUT_PARAM_MAP CLOB,
  START_TIME       TIMESTAMP(6) WITH LOCAL TIME ZONE,
  END_TIME         TIMESTAMP(6) WITH LOCAL TIME ZONE,
  LAST_UPDATE_DATE DATE default sysdate --最后更新时间
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SDICAPP.SDIC_APP_LOG
  add primary key (ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table SDIC_APP_MENU
prompt ============================
prompt
create table SDICAPP.SDIC_APP_MENU
(
  MENU_ID   NUMBER not null,
  MENU_NAME VARCHAR2(20),
  PARENT_ID NUMBER,
  URL       VARCHAR2(200),
  SORT      NUMBER
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SDICAPP.SDIC_APP_MENU.MENU_ID
  is '菜单ID';
comment on column SDICAPP.SDIC_APP_MENU.MENU_NAME
  is '菜单名称';
comment on column SDICAPP.SDIC_APP_MENU.PARENT_ID
  is '父级菜单ID';
comment on column SDICAPP.SDIC_APP_MENU.URL
  is '菜单链接';
comment on column SDICAPP.SDIC_APP_MENU.SORT
  is '序号';
alter table SDICAPP.SDIC_APP_MENU
  add constraint PK_MENU_ID primary key (MENU_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table SDIC_APP_MENU_PRIVILEGE
prompt ======================================
prompt
create table SDICAPP.SDIC_APP_MENU_PRIVILEGE
(
  PRIVILEGE_ID NUMBER not null,
  MENU_ID      NUMBER not null
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_MENU_PRIVILEGE.PRIVILEGE_ID
  is '权限ID';
comment on column SDICAPP.SDIC_APP_MENU_PRIVILEGE.MENU_ID
  is '菜单ID';
alter table SDICAPP.SDIC_APP_MENU_PRIVILEGE
  add constraint PK_PRIVILEGE_ID_MENU_ID primary key (PRIVILEGE_ID, MENU_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_MESSAGE
prompt ===============================
prompt
create table SDICAPP.SDIC_APP_MESSAGE
(
  ID           INTEGER not null,
  DESTINATION  VARCHAR2(50),
  CONTENT      VARCHAR2(2000),
  TYPE         VARCHAR2(10),
  SENDRESULT   VARCHAR2(10) default 'FALSE',
  RESPONSECODE INTEGER,
  SENDCOUNT    INTEGER default 0,
  REMARK       VARCHAR2(100),
  SENDTIME     TIMESTAMP(6) default sysdate,
  CREATETIME   TIMESTAMP(6) default sysdate--创建时间
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
alter table SDICAPP.SDIC_APP_MESSAGE
  add primary key (ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_ORG
prompt ===========================
prompt
create table SDICAPP.SDIC_APP_ORG
(
  ORG_ID     NUMBER not null,
  ORG_NAME   VARCHAR2(50),
  PARENT_ID  NUMBER,
  SHORT_NAME VARCHAR2(50),
  SORT       NUMBER,
  IFS_ORG_ID VARCHAR2(20)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SDICAPP.SDIC_APP_ORG.ORG_ID
  is '机构ID';
comment on column SDICAPP.SDIC_APP_ORG.ORG_NAME
  is '机构名称';
comment on column SDICAPP.SDIC_APP_ORG.PARENT_ID
  is '父级机构ID';
comment on column SDICAPP.SDIC_APP_ORG.SHORT_NAME
  is '机构简称';
comment on column SDICAPP.SDIC_APP_ORG.SORT
  is '序号';
comment on column SDICAPP.SDIC_APP_ORG.IFS_ORG_ID
  is 'IFS机构ID';
alter table SDICAPP.SDIC_APP_ORG
  add constraint PK_ORG_ID primary key (ORG_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SDICAPP.SDIC_APP_ORG
  add constraint UK_IFS_ORG_ID unique (IFS_ORG_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table SDIC_APP_PRIVILEGE
prompt =================================
prompt
create table SDICAPP.SDIC_APP_PRIVILEGE
(
  PRIVILEGE_ID   NUMBER not null,
  PRIVILEGE_NAME VARCHAR2(50),
  PRIVILEGE_TYPE VARCHAR2(20),
  ISDELETE       VARCHAR2(1)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_PRIVILEGE.PRIVILEGE_ID
  is '权限ID';
comment on column SDICAPP.SDIC_APP_PRIVILEGE.PRIVILEGE_NAME
  is '权限名称';
comment on column SDICAPP.SDIC_APP_PRIVILEGE.PRIVILEGE_TYPE
  is '权限类型(如菜单为MENU)';
comment on column SDICAPP.SDIC_APP_PRIVILEGE.ISDELETE
  is '有效标志,1为有效,0为无效';
alter table SDICAPP.SDIC_APP_PRIVILEGE
  add constraint PK_PRIVILEGE_ID primary key (PRIVILEGE_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_ROLE
prompt ============================
prompt
create table SDICAPP.SDIC_APP_ROLE
(
  ROLE_ID   NUMBER not null,
  ROLE_NAME VARCHAR2(20),
  ISDELETE  VARCHAR2(1)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_ROLE.ROLE_ID
  is '角色ID';
comment on column SDICAPP.SDIC_APP_ROLE.ROLE_NAME
  is '角色名称';
comment on column SDICAPP.SDIC_APP_ROLE.ISDELETE
  is '有效标志,1为有效,0为无效';
alter table SDICAPP.SDIC_APP_ROLE
  add constraint PK_ROLE_ID primary key (ROLE_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_ROLE_PRIVILEGE
prompt ======================================
prompt
create table SDICAPP.SDIC_APP_ROLE_PRIVILEGE
(
  ROLE_ID      NUMBER not null,
  PRIVILEGE_ID NUMBER not null
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_ROLE_PRIVILEGE.ROLE_ID
  is '角色ID';
comment on column SDICAPP.SDIC_APP_ROLE_PRIVILEGE.PRIVILEGE_ID
  is '权限ID';
alter table SDICAPP.SDIC_APP_ROLE_PRIVILEGE
  add constraint PK_ROLE_ID_PRIVILEGE_ID primary key (ROLE_ID, PRIVILEGE_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_SUGGESTION
prompt ==================================
prompt
create table SDICAPP.SDIC_APP_SUGGESTION
(
  ID          INTEGER not null,
  SUBJECT     VARCHAR2(50),
  CONTENT     VARCHAR2(2000),
  PHONE       VARCHAR2(50),
  USER_NAME   VARCHAR2(50),
  USER_ID     VARCHAR2(20),
  ORG_CODE    VARCHAR2(50),
  SUBMIT_TIME DATE default sysdate --最后更新时间
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SDICAPP.SDIC_APP_SUGGESTION
  add primary key (ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table SDIC_APP_USER
prompt ============================
prompt
create table SDICAPP.SDIC_APP_USER
(
  USER_ID    NUMBER not null,
  USER_NAME  VARCHAR2(50),
  ORG_ID     NUMBER,
  LOGIN_NAME VARCHAR2(50),
  PASSWORD   VARCHAR2(50),
  IMAGE      VARCHAR2(200),
  ISDELETE   VARCHAR2(1)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SDICAPP.SDIC_APP_USER.USER_ID
  is '用户ID';
comment on column SDICAPP.SDIC_APP_USER.USER_NAME
  is '用户名';
comment on column SDICAPP.SDIC_APP_USER.ORG_ID
  is '机构ID';
comment on column SDICAPP.SDIC_APP_USER.LOGIN_NAME
  is '登录名';
comment on column SDICAPP.SDIC_APP_USER.PASSWORD
  is '密码';
comment on column SDICAPP.SDIC_APP_USER.IMAGE
  is '头像图片路径';
comment on column SDICAPP.SDIC_APP_USER.ISDELETE
  is '有效标志,1为有效,0为无效';
alter table SDICAPP.SDIC_APP_USER
  add constraint PK_USER_ID primary key (USER_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
alter table SDICAPP.SDIC_APP_USER
  add unique (LOGIN_NAME)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table SDIC_APP_USER_DEVICE
prompt ===================================
prompt
create table SDICAPP.SDIC_APP_USER_DEVICE
(
  DEVICE_ID     VARCHAR2(100) not null,
  USER_ID       NUMBER not null,
  REGISTER_TIME DATE default sysdate,
  ISDELETE      VARCHAR2(1) default '1',
  LOGIN_NAME    VARCHAR2(50)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on column SDICAPP.SDIC_APP_USER_DEVICE.DEVICE_ID
  is '设备号';
comment on column SDICAPP.SDIC_APP_USER_DEVICE.USER_ID
  is '用户ID';
comment on column SDICAPP.SDIC_APP_USER_DEVICE.REGISTER_TIME
  is '设置时间';
comment on column SDICAPP.SDIC_APP_USER_DEVICE.ISDELETE
  is '有效标志,1为有效,0为无效';
alter table SDICAPP.SDIC_APP_USER_DEVICE
  add constraint UK_USER_ID_DEVICE_ID primary key (DEVICE_ID, USER_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table SDIC_APP_USER_GROUP
prompt ==================================
prompt
create table SDICAPP.SDIC_APP_USER_GROUP
(
  USER_ID  NUMBER not null,
  GROUP_ID NUMBER not null
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_USER_GROUP.USER_ID
  is '用户ID';
comment on column SDICAPP.SDIC_APP_USER_GROUP.GROUP_ID
  is '用户组ID';
alter table SDICAPP.SDIC_APP_USER_GROUP
  add constraint PK_USER_ID_GROUP_ID primary key (USER_ID, GROUP_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_APP_USER_ROLE
prompt =================================
prompt
create table SDICAPP.SDIC_APP_USER_ROLE
(
  USER_ID NUMBER not null,
  ROLE_ID NUMBER not null
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on column SDICAPP.SDIC_APP_USER_ROLE.USER_ID
  is '用户ID';
comment on column SDICAPP.SDIC_APP_USER_ROLE.ROLE_ID
  is '角色ID';
alter table SDICAPP.SDIC_APP_USER_ROLE
  add constraint PK_USER_ID_ROLE_ID primary key (USER_ID, ROLE_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_INDEX_DATA
prompt ==============================
prompt
create table SDICAPP.SDIC_INDEX_DATA
(
  MEASURE_PERIOD   VARCHAR2(10) not null,
  MEASURE_TYPE     VARCHAR2(2) not null,
  COMPANY_ID       INTEGER not null,
  INDEX_ID         INTEGER not null,
  POWER_UNIT_ID    INTEGER not null,
  NUM_VALUE        FLOAT,
  LAST_UPDATE_DATE DATE default sysdate --最后更新时间
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
alter table SDICAPP.SDIC_INDEX_DATA
  add constraint PK_KEY primary key (MEASURE_PERIOD, COMPANY_ID, INDEX_ID, POWER_UNIT_ID, MEASURE_TYPE)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_INDEX_DIMENSION
prompt ===================================
prompt
create table SDICAPP.SDIC_INDEX_DIMENSION
(
  INDEX_ID     INTEGER not null,
  INDEX_NAME   VARCHAR2(200),
  INDEX_TYPE   VARCHAR2(200),
  CAL_TYPE     VARCHAR2(2) default 'n',
  MEASURE_TYPE VARCHAR2(2) not null,
  IOC_IMAGE    VARCHAR2(200),
  UNIT_NAME    NVARCHAR2(20)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
alter table SDICAPP.SDIC_INDEX_DIMENSION
  add primary key (INDEX_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table SDIC_SIS_DATA
prompt ============================
prompt
create table SDICAPP.SDIC_SIS_DATA
(
  MEASURE_POINT_ID    VARCHAR2(200),
  MEASURE_TIME        VARCHAR2(10),
  MEASURE_POINT_VALUE FLOAT,
  LAST_UPDATE_DATE    DATE default sysdate --最后更新时间
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;

prompt
prompt Creating table SDIC_SIS_INDEX_MAPPING
prompt =====================================
prompt
create table SDICAPP.SDIC_SIS_INDEX_MAPPING
(
  ID                 INTEGER not null,
  MEASURE_POINT_ID   VARCHAR2(200) not null,
  MEASURE_POINT_NAME VARCHAR2(200),
  INDEX_ID           INTEGER not null,
  POWER_UNIT_ID      INTEGER not null
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
alter table SDICAPP.SDIC_SIS_INDEX_MAPPING
  add primary key (MEASURE_POINT_ID, INDEX_ID, POWER_UNIT_ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255;

prompt
prompt Creating table WEB_COMMENT
prompt ==========================
prompt
create table SDICAPP.WEB_COMMENT
(
  ID         INTEGER not null,
  ARTID      INTEGER,
  USERNAME   VARCHAR2(32),
  USERCODE   VARCHAR2(32),
  COMMENTS   VARCHAR2(4000),
  CREATETIME VARCHAR2(19),
  IPADDRESS  VARCHAR2(16)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table SDICAPP.WEB_COMMENT
  is '文章评论表';
comment on column SDICAPP.WEB_COMMENT.ID
  is 'ID';
comment on column SDICAPP.WEB_COMMENT.ARTID
  is '文章id';
comment on column SDICAPP.WEB_COMMENT.USERNAME
  is '用户名';
comment on column SDICAPP.WEB_COMMENT.USERCODE
  is '用户号';
comment on column SDICAPP.WEB_COMMENT.COMMENTS
  is '评论内容';
comment on column SDICAPP.WEB_COMMENT.CREATETIME
  is '发表时间';
comment on column SDICAPP.WEB_COMMENT.IPADDRESS
  is 'IP地址';
alter table SDICAPP.WEB_COMMENT
  add constraint PK_WEB_COMMENT primary key (ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table WEB_COMMENT_HF
prompt =============================
prompt
create table SDICAPP.WEB_COMMENT_HF
(
  ID         INTEGER not null,
  ARTID      INTEGER,
  PINGLUNID  INTEGER,
  USERNAME   VARCHAR2(32),
  USERCODE   VARCHAR2(32),
  COMMENTS   VARCHAR2(4000),
  CREATETIME VARCHAR2(19),
  IPADDRESS  VARCHAR2(16)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );
comment on table SDICAPP.WEB_COMMENT_HF
  is '评论回复表';
comment on column SDICAPP.WEB_COMMENT_HF.ID
  is 'ID';
comment on column SDICAPP.WEB_COMMENT_HF.ARTID
  is '文章id';
comment on column SDICAPP.WEB_COMMENT_HF.PINGLUNID
  is '评论id';
comment on column SDICAPP.WEB_COMMENT_HF.USERNAME
  is '用户名';
comment on column SDICAPP.WEB_COMMENT_HF.USERCODE
  is '用户号';
comment on column SDICAPP.WEB_COMMENT_HF.COMMENTS
  is '回复内容';
comment on column SDICAPP.WEB_COMMENT_HF.CREATETIME
  is '发表时间';
comment on column SDICAPP.WEB_COMMENT_HF.IPADDRESS
  is 'IP地址';
alter table SDICAPP.WEB_COMMENT_HF
  add constraint PK_WEB_COMMENT_HF primary key (ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table WEB_PRAISELIST
prompt =============================
prompt
create table SDICAPP.WEB_PRAISELIST
(
  ID         INTEGER not null,
  ARTID      INTEGER,
  USERNAME   VARCHAR2(32),
  USERCODE   VARCHAR2(32),
  CREATETIME VARCHAR2(19),
  IPADDRESS  VARCHAR2(16)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255;
comment on table SDICAPP.WEB_PRAISELIST
  is '文章点赞信息';
comment on column SDICAPP.WEB_PRAISELIST.ID
  is 'ID';
comment on column SDICAPP.WEB_PRAISELIST.ARTID
  is '文章id';
comment on column SDICAPP.WEB_PRAISELIST.USERNAME
  is '用户名';
comment on column SDICAPP.WEB_PRAISELIST.USERCODE
  is '用户号';
comment on column SDICAPP.WEB_PRAISELIST.CREATETIME
  is '创建时间';
comment on column SDICAPP.WEB_PRAISELIST.IPADDRESS
  is 'ip地址';
alter table SDICAPP.WEB_PRAISELIST
  add constraint PK_WEB_PRAISELIST primary key (ID)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table YC_HS_6800
prompt =========================
prompt
create table SDICAPP.YC_HS_6800
(
  OCCUR_TIME DATE not null,
  CUR_01     FLOAT(24),
  STA_01     NUMBER(3),
  CUR_02     FLOAT(24),
  STA_02     NUMBER(3),
  CUR_03     FLOAT(24),
  STA_03     NUMBER(3),
  CUR_04     FLOAT(24),
  STA_04     NUMBER(3),
  CUR_05     FLOAT(24),
  STA_05     NUMBER(3),
  CUR_06     FLOAT(24),
  STA_06     NUMBER(3),
  CUR_07     FLOAT(24),
  STA_07     NUMBER(3),
  CUR_08     FLOAT(24),
  STA_08     NUMBER(3),
  CUR_09     FLOAT(24),
  STA_09     NUMBER(3),
  CUR_10     FLOAT(24),
  STA_10     NUMBER(3),
  CUR_11     FLOAT(24),
  STA_11     NUMBER(3),
  CUR_12     FLOAT(24),
  STA_12     NUMBER(3),
  CUR_13     FLOAT(24),
  STA_13     NUMBER(3),
  CUR_14     FLOAT(24),
  STA_14     NUMBER(3),
  CUR_15     FLOAT(24),
  STA_15     NUMBER(3),
  CUR_16     FLOAT(24),
  STA_16     NUMBER(3),
  CUR_17     FLOAT(24),
  STA_17     NUMBER(3),
  CUR_18     FLOAT(24),
  STA_18     NUMBER(3),
  CUR_19     FLOAT(24),
  STA_19     NUMBER(3),
  CUR_20     FLOAT(24),
  STA_20     NUMBER(3),
  CUR_21     FLOAT(24),
  STA_21     NUMBER(3),
  CUR_22     FLOAT(24),
  STA_22     NUMBER(3),
  CUR_23     FLOAT(24),
  STA_23     NUMBER(3),
  CUR_24     FLOAT(24),
  STA_24     NUMBER(3),
  CUR_25     FLOAT(24),
  STA_25     NUMBER(3),
  CUR_26     FLOAT(24),
  STA_26     NUMBER(3),
  CUR_27     FLOAT(24),
  STA_27     NUMBER(3),
  CUR_28     FLOAT(24),
  STA_28     NUMBER(3),
  CUR_29     FLOAT(24),
  STA_29     NUMBER(3),
  CUR_30     FLOAT(24),
  STA_30     NUMBER(3),
  CUR_31     FLOAT(24),
  STA_31     NUMBER(3),
  CUR_32     FLOAT(24),
  STA_32     NUMBER(3),
  CUR_33     FLOAT(24),
  STA_33     NUMBER(3),
  CUR_34     FLOAT(24),
  STA_34     NUMBER(3),
  CUR_35     FLOAT(24),
  STA_35     NUMBER(3),
  CUR_36     FLOAT(24),
  STA_36     NUMBER(3),
  CUR_37     FLOAT(24),
  STA_37     NUMBER(3),
  CUR_38     FLOAT(24),
  STA_38     NUMBER(3),
  CUR_39     FLOAT(24),
  STA_39     NUMBER(3),
  CUR_40     FLOAT(24),
  STA_40     NUMBER(3),
  CUR_41     FLOAT(24),
  STA_41     NUMBER(3),
  CUR_42     FLOAT(24),
  STA_42     NUMBER(3),
  CUR_43     FLOAT(24),
  STA_43     NUMBER(3),
  CUR_44     FLOAT(24),
  STA_44     NUMBER(3),
  CUR_45     FLOAT(24),
  STA_45     NUMBER(3),
  CUR_46     FLOAT(24),
  STA_46     NUMBER(3),
  CUR_47     FLOAT(24),
  STA_47     NUMBER(3),
  CUR_48     FLOAT(24),
  STA_48     NUMBER(3),
  CUR_49     FLOAT(24),
  STA_49     NUMBER(3),
  CUR_50     FLOAT(24),
  STA_50     NUMBER(3),
  CUR_51     FLOAT(24),
  STA_51     NUMBER(3),
  CUR_52     FLOAT(24),
  STA_52     NUMBER(3),
  CUR_53     FLOAT(24),
  STA_53     NUMBER(3),
  CUR_54     FLOAT(24),
  STA_54     NUMBER(3),
  CUR_55     FLOAT(24),
  STA_55     NUMBER(3),
  CUR_56     FLOAT(24),
  STA_56     NUMBER(3),
  CUR_57     FLOAT(24),
  STA_57     NUMBER(3),
  CUR_58     FLOAT(24),
  STA_58     NUMBER(3),
  CUR_59     FLOAT(24),
  STA_59     NUMBER(3),
  CUR_60     FLOAT(24),
  STA_60     NUMBER(3),
  CUR_61     FLOAT(24),
  STA_61     NUMBER(3),
  CUR_62     FLOAT(24),
  STA_62     NUMBER(3),
  CUR_63     FLOAT(24),
  STA_63     NUMBER(3),
  CUR_64     FLOAT(24),
  STA_64     NUMBER(3),
  CUR_65     FLOAT(24),
  STA_65     NUMBER(3),
  CUR_66     FLOAT(24),
  STA_66     NUMBER(3),
  CUR_67     FLOAT(24),
  STA_67     NUMBER(3),
  CUR_68     FLOAT(24),
  STA_68     NUMBER(3),
  CUR_69     FLOAT(24),
  STA_69     NUMBER(3),
  CUR_70     FLOAT(24),
  STA_70     NUMBER(3),
  CUR_71     FLOAT(24),
  STA_71     NUMBER(3),
  CUR_72     FLOAT(24),
  STA_72     NUMBER(3),
  CUR_73     FLOAT(24),
  STA_73     NUMBER(3),
  CUR_74     FLOAT(24),
  STA_74     NUMBER(3),
  CUR_75     FLOAT(24),
  STA_75     NUMBER(3),
  CUR_76     FLOAT(24),
  STA_76     NUMBER(3),
  CUR_77     FLOAT(24),
  STA_77     NUMBER(3),
  CUR_78     FLOAT(24),
  STA_78     NUMBER(3),
  CUR_79     FLOAT(24),
  STA_79     NUMBER(3),
  CUR_80     FLOAT(24),
  STA_80     NUMBER(3),
  CUR_81     FLOAT(24),
  STA_81     NUMBER(3),
  CUR_82     FLOAT(24),
  STA_82     NUMBER(3),
  CUR_83     FLOAT(24),
  STA_83     NUMBER(3),
  CUR_84     FLOAT(24),
  STA_84     NUMBER(3),
  CUR_85     FLOAT(24),
  STA_85     NUMBER(3),
  CUR_86     FLOAT(24),
  STA_86     NUMBER(3),
  CUR_87     FLOAT(24),
  STA_87     NUMBER(3),
  CUR_88     FLOAT(24),
  STA_88     NUMBER(3),
  CUR_89     FLOAT(24),
  STA_89     NUMBER(3),
  CUR_90     FLOAT(24),
  STA_90     NUMBER(3),
  CUR_91     FLOAT(24),
  STA_91     NUMBER(3),
  CUR_92     FLOAT(24),
  STA_92     NUMBER(3),
  CUR_93     FLOAT(24),
  STA_93     NUMBER(3),
  CUR_94     FLOAT(24),
  STA_94     NUMBER(3),
  CUR_95     FLOAT(24),
  STA_95     NUMBER(3),
  CUR_96     FLOAT(24),
  STA_96     NUMBER(3),
  CUR_97     FLOAT(24),
  STA_97     NUMBER(3),
  CUR_98     FLOAT(24),
  STA_98     NUMBER(3),
  CUR_99     FLOAT(24),
  STA_99     NUMBER(3),
  CUR_100    FLOAT(24),
  STA_100    NUMBER(3)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 16K
    next 8K
    minextents 1
    maxextents unlimited
  );
alter table SDICAPP.YC_HS_6800
  add primary key (OCCUR_TIME)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 2M
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table YC_HS_6801
prompt =========================
prompt
create table SDICAPP.YC_HS_6801
(
  OCCUR_TIME DATE not null,
  CUR_01     FLOAT(24),
  STA_01     NUMBER(3),
  CUR_02     FLOAT(24),
  STA_02     NUMBER(3),
  CUR_03     FLOAT(24),
  STA_03     NUMBER(3),
  CUR_04     FLOAT(24),
  STA_04     NUMBER(3),
  CUR_05     FLOAT(24),
  STA_05     NUMBER(3),
  CUR_06     FLOAT(24),
  STA_06     NUMBER(3),
  CUR_07     FLOAT(24),
  STA_07     NUMBER(3),
  CUR_08     FLOAT(24),
  STA_08     NUMBER(3),
  CUR_09     FLOAT(24),
  STA_09     NUMBER(3),
  CUR_10     FLOAT(24),
  STA_10     NUMBER(3),
  CUR_11     FLOAT(24),
  STA_11     NUMBER(3),
  CUR_12     FLOAT(24),
  STA_12     NUMBER(3),
  CUR_13     FLOAT(24),
  STA_13     NUMBER(3),
  CUR_14     FLOAT(24),
  STA_14     NUMBER(3),
  CUR_15     FLOAT(24),
  STA_15     NUMBER(3),
  CUR_16     FLOAT(24),
  STA_16     NUMBER(3),
  CUR_17     FLOAT(24),
  STA_17     NUMBER(3),
  CUR_18     FLOAT(24),
  STA_18     NUMBER(3),
  CUR_19     FLOAT(24),
  STA_19     NUMBER(3),
  CUR_20     FLOAT(24),
  STA_20     NUMBER(3),
  CUR_21     FLOAT(24),
  STA_21     NUMBER(3),
  CUR_22     FLOAT(24),
  STA_22     NUMBER(3),
  CUR_23     FLOAT(24),
  STA_23     NUMBER(3),
  CUR_24     FLOAT(24),
  STA_24     NUMBER(3),
  CUR_25     FLOAT(24),
  STA_25     NUMBER(3),
  CUR_26     FLOAT(24),
  STA_26     NUMBER(3),
  CUR_27     FLOAT(24),
  STA_27     NUMBER(3),
  CUR_28     FLOAT(24),
  STA_28     NUMBER(3),
  CUR_29     FLOAT(24),
  STA_29     NUMBER(3),
  CUR_30     FLOAT(24),
  STA_30     NUMBER(3),
  CUR_31     FLOAT(24),
  STA_31     NUMBER(3),
  CUR_32     FLOAT(24),
  STA_32     NUMBER(3),
  CUR_33     FLOAT(24),
  STA_33     NUMBER(3),
  CUR_34     FLOAT(24),
  STA_34     NUMBER(3),
  CUR_35     FLOAT(24),
  STA_35     NUMBER(3),
  CUR_36     FLOAT(24),
  STA_36     NUMBER(3),
  CUR_37     FLOAT(24),
  STA_37     NUMBER(3),
  CUR_38     FLOAT(24),
  STA_38     NUMBER(3),
  CUR_39     FLOAT(24),
  STA_39     NUMBER(3),
  CUR_40     FLOAT(24),
  STA_40     NUMBER(3),
  CUR_41     FLOAT(24),
  STA_41     NUMBER(3),
  CUR_42     FLOAT(24),
  STA_42     NUMBER(3),
  CUR_43     FLOAT(24),
  STA_43     NUMBER(3),
  CUR_44     FLOAT(24),
  STA_44     NUMBER(3),
  CUR_45     FLOAT(24),
  STA_45     NUMBER(3),
  CUR_46     FLOAT(24),
  STA_46     NUMBER(3),
  CUR_47     FLOAT(24),
  STA_47     NUMBER(3),
  CUR_48     FLOAT(24),
  STA_48     NUMBER(3),
  CUR_49     FLOAT(24),
  STA_49     NUMBER(3),
  CUR_50     FLOAT(24),
  STA_50     NUMBER(3),
  CUR_51     FLOAT(24),
  STA_51     NUMBER(3),
  CUR_52     FLOAT(24),
  STA_52     NUMBER(3),
  CUR_53     FLOAT(24),
  STA_53     NUMBER(3),
  CUR_54     FLOAT(24),
  STA_54     NUMBER(3),
  CUR_55     FLOAT(24),
  STA_55     NUMBER(3),
  CUR_56     FLOAT(24),
  STA_56     NUMBER(3),
  CUR_57     FLOAT(24),
  STA_57     NUMBER(3),
  CUR_58     FLOAT(24),
  STA_58     NUMBER(3),
  CUR_59     FLOAT(24),
  STA_59     NUMBER(3),
  CUR_60     FLOAT(24),
  STA_60     NUMBER(3),
  CUR_61     FLOAT(24),
  STA_61     NUMBER(3),
  CUR_62     FLOAT(24),
  STA_62     NUMBER(3),
  CUR_63     FLOAT(24),
  STA_63     NUMBER(3),
  CUR_64     FLOAT(24),
  STA_64     NUMBER(3),
  CUR_65     FLOAT(24),
  STA_65     NUMBER(3),
  CUR_66     FLOAT(24),
  STA_66     NUMBER(3),
  CUR_67     FLOAT(24),
  STA_67     NUMBER(3),
  CUR_68     FLOAT(24),
  STA_68     NUMBER(3),
  CUR_69     FLOAT(24),
  STA_69     NUMBER(3),
  CUR_70     FLOAT(24),
  STA_70     NUMBER(3),
  CUR_71     FLOAT(24),
  STA_71     NUMBER(3),
  CUR_72     FLOAT(24),
  STA_72     NUMBER(3),
  CUR_73     FLOAT(24),
  STA_73     NUMBER(3),
  CUR_74     FLOAT(24),
  STA_74     NUMBER(3),
  CUR_75     FLOAT(24),
  STA_75     NUMBER(3),
  CUR_76     FLOAT(24),
  STA_76     NUMBER(3),
  CUR_77     FLOAT(24),
  STA_77     NUMBER(3),
  CUR_78     FLOAT(24),
  STA_78     NUMBER(3),
  CUR_79     FLOAT(24),
  STA_79     NUMBER(3),
  CUR_80     FLOAT(24),
  STA_80     NUMBER(3),
  CUR_81     FLOAT(24),
  STA_81     NUMBER(3),
  CUR_82     FLOAT(24),
  STA_82     NUMBER(3),
  CUR_83     FLOAT(24),
  STA_83     NUMBER(3),
  CUR_84     FLOAT(24),
  STA_84     NUMBER(3),
  CUR_85     FLOAT(24),
  STA_85     NUMBER(3),
  CUR_86     FLOAT(24),
  STA_86     NUMBER(3),
  CUR_87     FLOAT(24),
  STA_87     NUMBER(3),
  CUR_88     FLOAT(24),
  STA_88     NUMBER(3),
  CUR_89     FLOAT(24),
  STA_89     NUMBER(3),
  CUR_90     FLOAT(24),
  STA_90     NUMBER(3),
  CUR_91     FLOAT(24),
  STA_91     NUMBER(3),
  CUR_92     FLOAT(24),
  STA_92     NUMBER(3),
  CUR_93     FLOAT(24),
  STA_93     NUMBER(3),
  CUR_94     FLOAT(24),
  STA_94     NUMBER(3),
  CUR_95     FLOAT(24),
  STA_95     NUMBER(3),
  CUR_96     FLOAT(24),
  STA_96     NUMBER(3),
  CUR_97     FLOAT(24),
  STA_97     NUMBER(3),
  CUR_98     FLOAT(24),
  STA_98     NUMBER(3),
  CUR_99     FLOAT(24),
  STA_99     NUMBER(3),
  CUR_100    FLOAT(24),
  STA_100    NUMBER(3)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 16K
    next 8K
    minextents 1
    maxextents unlimited
  );
alter table SDICAPP.YC_HS_6801
  add primary key (OCCUR_TIME)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating table YC_HS_6802
prompt =========================
prompt
create table SDICAPP.YC_HS_6802
(
  OCCUR_TIME DATE not null,
  CUR_01     FLOAT(24),
  STA_01     NUMBER(3),
  CUR_02     FLOAT(24),
  STA_02     NUMBER(3),
  CUR_03     FLOAT(24),
  STA_03     NUMBER(3),
  CUR_04     FLOAT(24),
  STA_04     NUMBER(3),
  CUR_05     FLOAT(24),
  STA_05     NUMBER(3),
  CUR_06     FLOAT(24),
  STA_06     NUMBER(3),
  CUR_07     FLOAT(24),
  STA_07     NUMBER(3),
  CUR_08     FLOAT(24),
  STA_08     NUMBER(3),
  CUR_09     FLOAT(24),
  STA_09     NUMBER(3),
  CUR_10     FLOAT(24),
  STA_10     NUMBER(3),
  CUR_11     FLOAT(24),
  STA_11     NUMBER(3),
  CUR_12     FLOAT(24),
  STA_12     NUMBER(3),
  CUR_13     FLOAT(24),
  STA_13     NUMBER(3),
  CUR_14     FLOAT(24),
  STA_14     NUMBER(3),
  CUR_15     FLOAT(24),
  STA_15     NUMBER(3),
  CUR_16     FLOAT(24),
  STA_16     NUMBER(3),
  CUR_17     FLOAT(24),
  STA_17     NUMBER(3),
  CUR_18     FLOAT(24),
  STA_18     NUMBER(3),
  CUR_19     FLOAT(24),
  STA_19     NUMBER(3),
  CUR_20     FLOAT(24),
  STA_20     NUMBER(3),
  CUR_21     FLOAT(24),
  STA_21     NUMBER(3),
  CUR_22     FLOAT(24),
  STA_22     NUMBER(3),
  CUR_23     FLOAT(24),
  STA_23     NUMBER(3),
  CUR_24     FLOAT(24),
  STA_24     NUMBER(3),
  CUR_25     FLOAT(24),
  STA_25     NUMBER(3),
  CUR_26     FLOAT(24),
  STA_26     NUMBER(3),
  CUR_27     FLOAT(24),
  STA_27     NUMBER(3),
  CUR_28     FLOAT(24),
  STA_28     NUMBER(3),
  CUR_29     FLOAT(24),
  STA_29     NUMBER(3),
  CUR_30     FLOAT(24),
  STA_30     NUMBER(3),
  CUR_31     FLOAT(24),
  STA_31     NUMBER(3),
  CUR_32     FLOAT(24),
  STA_32     NUMBER(3),
  CUR_33     FLOAT(24),
  STA_33     NUMBER(3),
  CUR_34     FLOAT(24),
  STA_34     NUMBER(3),
  CUR_35     FLOAT(24),
  STA_35     NUMBER(3),
  CUR_36     FLOAT(24),
  STA_36     NUMBER(3),
  CUR_37     FLOAT(24),
  STA_37     NUMBER(3),
  CUR_38     FLOAT(24),
  STA_38     NUMBER(3),
  CUR_39     FLOAT(24),
  STA_39     NUMBER(3),
  CUR_40     FLOAT(24),
  STA_40     NUMBER(3),
  CUR_41     FLOAT(24),
  STA_41     NUMBER(3),
  CUR_42     FLOAT(24),
  STA_42     NUMBER(3),
  CUR_43     FLOAT(24),
  STA_43     NUMBER(3),
  CUR_44     FLOAT(24),
  STA_44     NUMBER(3),
  CUR_45     FLOAT(24),
  STA_45     NUMBER(3),
  CUR_46     FLOAT(24),
  STA_46     NUMBER(3),
  CUR_47     FLOAT(24),
  STA_47     NUMBER(3),
  CUR_48     FLOAT(24),
  STA_48     NUMBER(3),
  CUR_49     FLOAT(24),
  STA_49     NUMBER(3),
  CUR_50     FLOAT(24),
  STA_50     NUMBER(3),
  CUR_51     FLOAT(24),
  STA_51     NUMBER(3),
  CUR_52     FLOAT(24),
  STA_52     NUMBER(3),
  CUR_53     FLOAT(24),
  STA_53     NUMBER(3),
  CUR_54     FLOAT(24),
  STA_54     NUMBER(3),
  CUR_55     FLOAT(24),
  STA_55     NUMBER(3),
  CUR_56     FLOAT(24),
  STA_56     NUMBER(3),
  CUR_57     FLOAT(24),
  STA_57     NUMBER(3),
  CUR_58     FLOAT(24),
  STA_58     NUMBER(3),
  CUR_59     FLOAT(24),
  STA_59     NUMBER(3),
  CUR_60     FLOAT(24),
  STA_60     NUMBER(3),
  CUR_61     FLOAT(24),
  STA_61     NUMBER(3),
  CUR_62     FLOAT(24),
  STA_62     NUMBER(3),
  CUR_63     FLOAT(24),
  STA_63     NUMBER(3),
  CUR_64     FLOAT(24),
  STA_64     NUMBER(3),
  CUR_65     FLOAT(24),
  STA_65     NUMBER(3),
  CUR_66     FLOAT(24),
  STA_66     NUMBER(3),
  CUR_67     FLOAT(24),
  STA_67     NUMBER(3),
  CUR_68     FLOAT(24),
  STA_68     NUMBER(3),
  CUR_69     FLOAT(24),
  STA_69     NUMBER(3),
  CUR_70     FLOAT(24),
  STA_70     NUMBER(3),
  CUR_71     FLOAT(24),
  STA_71     NUMBER(3),
  CUR_72     FLOAT(24),
  STA_72     NUMBER(3),
  CUR_73     FLOAT(24),
  STA_73     NUMBER(3),
  CUR_74     FLOAT(24),
  STA_74     NUMBER(3),
  CUR_75     FLOAT(24),
  STA_75     NUMBER(3),
  CUR_76     FLOAT(24),
  STA_76     NUMBER(3),
  CUR_77     FLOAT(24),
  STA_77     NUMBER(3),
  CUR_78     FLOAT(24),
  STA_78     NUMBER(3),
  CUR_79     FLOAT(24),
  STA_79     NUMBER(3),
  CUR_80     FLOAT(24),
  STA_80     NUMBER(3),
  CUR_81     FLOAT(24),
  STA_81     NUMBER(3),
  CUR_82     FLOAT(24),
  STA_82     NUMBER(3),
  CUR_83     FLOAT(24),
  STA_83     NUMBER(3),
  CUR_84     FLOAT(24),
  STA_84     NUMBER(3),
  CUR_85     FLOAT(24),
  STA_85     NUMBER(3),
  CUR_86     FLOAT(24),
  STA_86     NUMBER(3),
  CUR_87     FLOAT(24),
  STA_87     NUMBER(3),
  CUR_88     FLOAT(24),
  STA_88     NUMBER(3),
  CUR_89     FLOAT(24),
  STA_89     NUMBER(3),
  CUR_90     FLOAT(24),
  STA_90     NUMBER(3),
  CUR_91     FLOAT(24),
  STA_91     NUMBER(3),
  CUR_92     FLOAT(24),
  STA_92     NUMBER(3),
  CUR_93     FLOAT(24),
  STA_93     NUMBER(3),
  CUR_94     FLOAT(24),
  STA_94     NUMBER(3),
  CUR_95     FLOAT(24),
  STA_95     NUMBER(3),
  CUR_96     FLOAT(24),
  STA_96     NUMBER(3),
  CUR_97     FLOAT(24),
  STA_97     NUMBER(3),
  CUR_98     FLOAT(24),
  STA_98     NUMBER(3),
  CUR_99     FLOAT(24),
  STA_99     NUMBER(3),
  CUR_100    FLOAT(24),
  STA_100    NUMBER(3)
)
tablespace SDICAPP
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 16K
    next 8K
    minextents 1
    maxextents unlimited
  );
alter table SDICAPP.YC_HS_6802
  add primary key (OCCUR_TIME)
  using index 
  tablespace SDICAPP
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    next 1M
    minextents 1
    maxextents unlimited
  );

prompt
prompt Creating sequence RECORD_SEQ
prompt ============================
prompt
create sequence SDICAPP.RECORD_SEQ
minvalue 1000000000
maxvalue 9999999999
start with 1000000582
increment by 2
cache 20;

prompt
prompt Creating sequence SEQLOG
prompt ========================
prompt
create sequence SDICAPP.SEQLOG
minvalue 1
maxvalue 9999999999999999999999999999
start with 317262
increment by 1
cache 10;

prompt
prompt Creating sequence SEQSUGGESTION
prompt ===============================
prompt
create sequence SDICAPP.SEQSUGGESTION
minvalue 1
maxvalue 9999999999999999999999999999
start with 31
increment by 1
cache 10;

prompt
prompt Creating view KEYTABLE
prompt ======================
prompt
create or replace view sdicapp.keytable as
select "KEYNAME","KEYVALUE" from eip.keytable@EIP_ON
          WITH READ ONLY;

prompt
prompt Creating view WEB_CATALOG
prompt =========================
prompt
create or replace view sdicapp.web_catalog as
select "ID","SITEID","SUBSITEID","SITETYPE","CAID","CANAME","CATYPE","CANOTE","GRADENO","SORTNO","READNUM","NEEDAPPROVE","ISWAP" from eip.WEB_CATALOG@EIP_ON
          WITH READ ONLY;

prompt
prompt Creating materialized view WEB_REPOSITORY
prompt =========================================
prompt
CREATE MATERIALIZED VIEW SDICAPP.WEB_REPOSITORY
REFRESH COMPLETE ON DEMAND
START WITH TO_DATE('29-05-2018 17:00:04', 'DD-MM-YYYY HH24:MI:SS') NEXT SYSDATE+1/24   
AS
SELECT "WEB_REPOSITORY"."ID" "ID","WEB_REPOSITORY"."SITEID" "SITEID","WEB_REPOSITORY"."SUBSITEID" "SUBSITEID","WEB_REPOSITORY"."SITETYPE" "SITETYPE","WEB_REPOSITORY"."CAID" "CAID","WEB_REPOSITORY"."FILETYPE" "FILETYPE","WEB_REPOSITORY"."FILETITLE" "FILETITLE","WEB_REPOSITORY"."FILEKEYS" "FILEKEYS","WEB_REPOSITORY"."PUBDATE" "PUBDATE","WEB_REPOSITORY"."CONTENT" "CONTENT","WEB_REPOSITORY"."PUBLISHER" "PUBLISHER","WEB_REPOSITORY"."AUTHOR" "AUTHOR","WEB_REPOSITORY"."AUTHORNAME" "AUTHORNAME","WEB_REPOSITORY"."TYPIST" "TYPIST","WEB_REPOSITORY"."TYPISTNAME" "TYPISTNAME","WEB_REPOSITORY"."AUDITOR" "AUDITOR","WEB_REPOSITORY"."AUDITORNAME" "AUDITORNAME","WEB_REPOSITORY"."RELEASER" "RELEASER","WEB_REPOSITORY"."RELEASERNAME" "RELEASERNAME","WEB_REPOSITORY"."READNUM" "READNUM","WEB_REPOSITORY"."SOURCEADDR" "SOURCEADDR","WEB_REPOSITORY"."UPFILENAME" "UPFILENAME","WEB_REPOSITORY"."FILENAME" "FILENAME","WEB_REPOSITORY"."FILESIZE" "FILESIZE","WEB_REPOSITORY"."FILENOTE" "FILENOTE","WEB_REPOSITORY"."STATE" "STATE","WEB_REPOSITORY"."SORTNO" "SORTNO","WEB_REPOSITORY"."SHOWTITLE" "SHOWTITLE" FROM "EIP"."WEB_REPOSITORY"@"EIP_ON" "WEB_REPOSITORY";

prompt
prompt Creating procedure REFRESH_MVIEW_FOR_APPNEWS
prompt ============================================
prompt
CREATE OR REPLACE PROCEDURE SDICAPP.refresh_mview_for_appnews
AS
BEGIN
  dbms_mview.REFRESH('WEB_REPOSITORY');
END;
/

prompt
prompt Creating procedure SYN_YC_HS_6800
prompt =================================
prompt
create or replace procedure sdicapp.syn_yc_hs_6800 is
  occur_time varchar2(30);
  sqlstr     varchar2(4000);
  condition  varchar2(300);
begin
  select max(to_char(t.occur_time, 'yyyymmddhh24mi' ））into occur_time from yc_hs_6800 t;
  dbms_output.put_line(occur_time);
  condition := '1=1';
  if occur_time is not null then
    condition := 'to_char(t.occur_time, ''yyyymmddhh24mi'' ） >' ||
                 occur_time;
  end if;

  sqlstr := 'insert into yc_hs_6800 select * from ondb2.yc_hs_6800@byfd_test t where  ' ||
            condition;
  DBMS_OUTPUT.PUT_LINE(sqlstr);
  execute immediate (sqlstr);
  commit;
exception
  when others then
    begin
      rollback;
      DBMS_OUTPUT.PUT_LINE('同步【yc_hs_6800】出错!');
    end;
    commit;
end syn_yc_hs_6800;
/

prompt
prompt Creating procedure SYN_YC_HS_6801
prompt =================================
prompt
create or replace procedure sdicapp.syn_yc_hs_6801 is
  occur_time varchar2(30);
  sqlstr     varchar2(4000);
  condition  varchar2(300);
begin
  select max(to_char(t.occur_time, 'yyyymmddhh24mi' ））into occur_time from yc_hs_6801 t;
  condition := '1=1';
  if occur_time is not null then
    condition := 'to_char(t.occur_time, ''yyyymmddhh24mi'' ） >' ||
                 occur_time;
  end if;

  sqlstr := 'insert into yc_hs_6801 select * from ondb2.yc_hs_6801@byfd_test t where  ' ||
            condition;
  DBMS_OUTPUT.PUT_LINE(sqlstr);
  execute immediate (sqlstr);
  commit;
exception
  when others then
    begin
      rollback;
      DBMS_OUTPUT.PUT_LINE('同步【yc_hs_6801】出错!');
    end;
    commit;
end syn_yc_hs_6801;
/

prompt
prompt Creating procedure SYN_YC_HS_6802
prompt =================================
prompt
create or replace procedure sdicapp.syn_yc_hs_6802 is
  occur_time varchar2(30);
  sqlstr     varchar2(4000);
  condition  varchar2(300);
begin
  select max(to_char(t.occur_time, 'yyyymmddhh24mi' ））into occur_time from yc_hs_6802 t;
  condition := '1=1';
  if occur_time is not null then
    condition := 'to_char(t.occur_time, ''yyyymmddhh24mi'' ） >' ||
                 occur_time;
  end if;

  sqlstr := 'insert into yc_hs_6802 select * from ondb2.yc_hs_6802@byfd_test t where  ' ||
            condition;
  DBMS_OUTPUT.PUT_LINE(sqlstr);
  execute immediate (sqlstr);
  commit;
exception
  when others then
    begin
      rollback;
      DBMS_OUTPUT.PUT_LINE('同步【yc_hs_6802】出错!');
    end;
    commit;
end syn_yc_hs_6802;
/

prompt
prompt Creating package body COMPANY_PERSON_API
prompt ========================================
prompt
CREATE OR REPLACE PACKAGE BODY SDICAPP.COMPANY_PERSON_API IS

TYPE Dummy_Rec IS RECORD
   (fname pers_tab.name1%TYPE,
    lname pers_tab.name4%TYPE,
    name2 pers_tab.name2%TYPE,
    name3 pers_tab.name3%TYPE,
    name5 pers_tab.name5%TYPE,
    name6 pers_tab.name6%TYPE,
    name7 pers_tab.name7%TYPE,
    name8 pers_tab.name8%TYPE,
    internal_display_name person_info_tab.name%TYPE,
    external_display_name pers_tab.external_display_name%TYPE,
    date_of_birth  pers_tab.date_of_birth%TYPE,
    place_of_birth pers_tab.place_of_birth%TYPE,
    citizenship    pers_tab.citizenship%TYPE,
    insurance_id   pers_tab.insurance_id%TYPE,
    sex            pers_tab.sex%TYPE,
    marital_status_id pers_tab.marital_status_id%TYPE ,
    blood_type     pers_tab.blood_type%TYPE,
    have_child     pers_tab.have_child%TYPE,
    emp_no_dummy   company_person_tab.emp_no%TYPE,
    picture_id     person_info_tab.picture_id%TYPE,
    person_id      pers_tab.person_id%TYPE,
    protected      person_info_tab.protected%TYPE,
    company_id     company_person_tab.company_id%TYPE
    );

TYPE Free_Rec IS RECORD
   (free_field1  VARCHAR2(100),
    free_field2  VARCHAR2(100),
    free_field3  VARCHAR2(100),
    free_field4  VARCHAR2(100),
    free_field5  VARCHAR2(100),
    free_field6  VARCHAR2(100),
    free_field7  VARCHAR2(100),
    free_field8  VARCHAR2(100),
    free_field9  VARCHAR2(100),
    free_field10 VARCHAR2(100),
    valid_from1  DATE,
    valid_from2  DATE,
    valid_from3  DATE,
    valid_from4  DATE,
    valid_from5  DATE,
    valid_from6  DATE,
    valid_from7  DATE,
    valid_from8  DATE,
    valid_from9  DATE,
    valid_from10  DATE,
    valid_to1  DATE,
    valid_to2  DATE,
    valid_to3  DATE,
    valid_to4  DATE,
    valid_to5  DATE,
    valid_to6  DATE,
    valid_to7  DATE,
    valid_to8  DATE,
    valid_to9  DATE,
    valid_to10  DATE,
    property_no1 NUMBER,
    property_no2 NUMBER,
    property_no3 NUMBER,
    property_no4 NUMBER,
    property_no5 NUMBER,
    property_no6 NUMBER,
    property_no7 NUMBER,
    property_no8 NUMBER,
    property_no9 NUMBER,
    property_no10 NUMBER);

-----------------------------------------------------------------------------
-------------------- LU SPECIFIC IMPLEMENTATION METHOD DECLARATIONS ---------
-----------------------------------------------------------------------------

FUNCTION Check_Payment_Possible___ (
   emp_cat_name_ IN COMPANY_PERSON.emp_cat_name%TYPE,
   person_id_  IN pers_tab.person_id%TYPE ) RETURN BOOLEAN;


PROCEDURE Check_Emp_Card___ (
   lu_rec_ IN COMPANY_PERSON_TAB%ROWTYPE,
   objid_  IN VARCHAR2 );

-----------------------------------------------------------------------------
-------------------- IMPLEMENTATION BASE METHODS ----------------------------
-----------------------------------------------------------------------------
-- Lock_By_Id___
--    Client-support to lock a specific instance of the logical unit.
--
-- Lock_By_Keys___
--    Server support to lock a specific instance of the logical unit.
--
-- Get_Object_By_Id___
--    Get LU-record from the database with a specified object identity.
--
-- Get_Object_By_Keys___
--    Get LU-record from the database with specified key columns.
--
-- Check_Exist___
--    Check if a specific LU-instance already exist in the database.
--
-- Get_Id_Version_By_Keys___
--    Get the current OBJID and OBJVERSION for a specific LU-instance.
-----------------------------------------------------------------------------

FUNCTION Lock_By_Id___ (
   objid_      IN  VARCHAR2,
   objversion_ IN  VARCHAR2 ) RETURN COMPANY_PERSON_TAB%ROWTYPE
IS
   row_changed EXCEPTION;
   row_deleted EXCEPTION;
   row_locked  EXCEPTION;
   PRAGMA      exception_init(row_locked, -0054);
   rec_        COMPANY_PERSON_TAB%ROWTYPE;
   dummy_      NUMBER;
   CURSOR lock_control IS
      SELECT *
      FROM   COMPANY_PERSON_TAB
      WHERE  rowid = objid_
      AND    ltrim(lpad(to_char(rowversion),2000)) = objversion_
      FOR UPDATE NOWAIT;
   CURSOR exist_control IS
      SELECT 1
      FROM   COMPANY_PERSON_TAB
      WHERE  rowid = objid_;
BEGIN
   OPEN lock_control;
   FETCH lock_control INTO rec_;
   IF (lock_control%FOUND) THEN
      CLOSE lock_control;
      RETURN rec_;
   END IF;
   CLOSE lock_control;
   OPEN exist_control;
   FETCH exist_control INTO dummy_;
   IF (exist_control%FOUND) THEN
      CLOSE exist_control;
      RAISE row_changed;
   ELSE
      CLOSE exist_control;
      RAISE row_deleted;
   END IF;
EXCEPTION
   WHEN row_locked THEN
      Error_SYS.Record_Locked(lu_name_);
   WHEN row_changed THEN
      Error_SYS.Record_Modified(lu_name_);
   WHEN row_deleted THEN
      Error_SYS.Record_Removed(lu_name_);
END Lock_By_Id___;

FUNCTION Lock_By_Keys___ (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN COMPANY_PERSON_TAB%ROWTYPE
IS
   row_deleted    EXCEPTION;
   rec_           COMPANY_PERSON_TAB%ROWTYPE;
   CURSOR lock_control IS
      SELECT *
      FROM  COMPANY_PERSON_TAB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_
      FOR UPDATE;
BEGIN
   OPEN lock_control;
   FETCH lock_control INTO rec_;
   IF (lock_control%FOUND) THEN
      CLOSE lock_control;
      RETURN rec_;
   ELSE
      CLOSE lock_control;
      RAISE row_deleted;
   END IF;
EXCEPTION
   WHEN row_deleted THEN
      Error_SYS.Record_Removed(lu_name_);
END Lock_By_Keys___;

FUNCTION Get_Object_By_Id___ (
   objid_ IN VARCHAR2 ) RETURN COMPANY_PERSON_TAB%ROWTYPE
IS
   lu_rec_ COMPANY_PERSON_TAB%ROWTYPE;
   CURSOR getrec IS
      SELECT *
      FROM   COMPANY_PERSON_TAB
      WHERE  rowid = objid_;
BEGIN
   OPEN getrec;
   FETCH getrec INTO lu_rec_;
   IF (getrec%NOTFOUND) THEN
      CLOSE getrec;
      Error_SYS.Record_Removed(lu_name_);
   END IF;
   CLOSE getrec;
   RETURN(lu_rec_);
END Get_Object_By_Id___;


FUNCTION Get_Object_By_Keys___ (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN COMPANY_PERSON_TAB%ROWTYPE
IS
   lu_rec_ COMPANY_PERSON_TAB%ROWTYPE;
   CURSOR getrec IS
      SELECT *
      FROM   COMPANY_PERSON_TAB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN getrec;
   FETCH getrec INTO lu_rec_;
   CLOSE getrec;
   RETURN(lu_rec_);
END Get_Object_By_Keys___;


FUNCTION Check_Exist___ (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN BOOLEAN
IS
   dummy_        NUMBER;
   CURSOR exist_control IS
      SELECT 1
      FROM  COMPANY_PERSON_TAB
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;

BEGIN
   OPEN exist_control;
      FETCH exist_control INTO dummy_;
      IF (exist_control%FOUND) THEN
         CLOSE exist_control;
         RETURN(TRUE);
      END IF;
      CLOSE exist_control;
   RETURN(FALSE);
END Check_Exist___;


PROCEDURE Get_Id_Version_By_Keys___ (
   objid_      IN OUT VARCHAR2,
   objversion_ IN OUT VARCHAR2,
   company_id_ IN     VARCHAR2,
   emp_no_     IN     VARCHAR2)
IS
   CURSOR get_id_version IS
      SELECT rowid, ltrim(lpad(to_char(rowversion),2000))
      FROM  COMPANY_PERSON_TAB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;

BEGIN
   OPEN  get_id_version;
   FETCH get_id_version INTO objid_, objversion_;
   CLOSE get_id_version;
END Get_Id_Version_By_Keys___;

-----------------------------------------------------------------------------
-------------------- IMPLEMENTATION BASE METHODS FOR INSERT -----------------
-----------------------------------------------------------------------------
-- Prepare_Insert___
--    Set all default values for a new instance (ON-NEW-RECORD) of this
--    logical unit by calling procedure Add_Attr.
--
-- Unpack_Check_Insert___
--    Unpack the attribute list, check all attributes from the client
--    and generate all default values before creation of the new object.
--
-- Insert___
--    Insert a new LU-instance into the database and return the values
--    for OBJID and OBJVERSION.
-----------------------------------------------------------------------------

PROCEDURE Prepare_Insert___ (
   attr_ IN OUT VARCHAR2 )
IS
   company_id_       COMPANY_PERSON_TAB.company_id%TYPE;
   employee_status_  VARCHAR2(20);
BEGIN
   company_id_ := Client_SYS.Get_Item_Value('COMPANY_ID', attr_);
   employee_status_ := Employee_Status_API.Get_Active_Status(company_id_);
   Client_SYS.Clear_Attr(attr_);
   Client_SYS.Add_To_Attr('TIME_CLOCK_USER','FALSE',attr_);
END Prepare_Insert___;

PROCEDURE Unpack_Check_Insert___ (
   attr_   IN OUT VARCHAR2,
   newrec_ IN OUT COMPANY_PERSON_TAB%ROWTYPE,
   dummy_rec_ IN OUT Dummy_Rec,
   free_rec_  IN OUT Free_Rec)
IS
   ptr_         NUMBER;
   name_        VARCHAR2(30);
   value_       VARCHAR2(2000);
   fname_exist_ INTEGER;
   lname_exist_ INTEGER;
   field_       VARCHAR2(2);
   desc_        VARCHAR2(40);
   property_code_ VARCHAR2(10);
   ext_name_exist_ INTEGER;
   name2_exist_ INTEGER;
   name3_exist_ INTEGER;
   name5_exist_ INTEGER;
   name6_exist_ INTEGER;
   name7_exist_ INTEGER;
   name8_exist_ INTEGER;
   picture_id_exist_ INTEGER;
   date_of_birth_exist_ INTEGER;
   place_of_birth_exist_ INTEGER;
   citizenship_exist_ INTEGER;
   insurance_id_check_ INTEGER;
   insurance_id_exist_ INTEGER;
   marital_status_exist_ INTEGER;
   blood_type_exist_ INTEGER;
   sex_exist_ INTEGER;
   have_child_exist_ INTEGER;
   int_name_    COMPANY_PERSON.internal_display_name%TYPE;
   tmp_person_id_ NUMBER;
   temp_view_          VARCHAR2(200);
   i_                  NUMBER;
   temp_data_type_     VARCHAR2(200);
   cur_validate_       INTEGER;
   NATIVE CONSTANT     INTEGER := 1;
   cnt_                INTEGER;
   --start License mgt attributes
   activation_date_    DATE;
   diff_               NUMBER;
   curr_status_        NUMBER;
   --start end

   CURSOR check_sign IS
      SELECT '1'
      FROM   company_person_tab
      WHERE  company_id  = newrec_.company_id
      AND    sign        = newrec_.sign;

   CURSOR get_dummy_rec IS
      SELECT name
      FROM   Person_info_tab
      WHERE  person_id = dummy_rec_.person_id;
   CURSOR check_mast IS
      SELECT COUNT(*)
      FROM   company_person
      WHERE  company_id = newrec_.company_id
      AND    person_id = dummy_rec_.person_id
      AND    master_employment = '1';

   CURSOR lu_keys (ref_view_name_  VARCHAR2) IS
       SELECT A.column_name, A.comments
         FROM user_col_comments A, user_tab_columns B
        WHERE A.table_name  = B.table_name
          AND A.column_name = B.column_name
          AND A.table_name  = upper(ref_view_name_)
          AND A.comments LIKE 'FLAGS=K%L%'
     ORDER BY B.column_id;

   key_       lu_keys%ROWTYPE;

   dummy_master_ NUMBER;
BEGIN
   dummy_rec_.emp_no_dummy := NULL;
   dummy_rec_.person_id := NULL;
   dummy_rec_.internal_display_name := NULL;
   dummy_rec_.picture_id := NULL;
   dummy_rec_.emp_no_dummy := Client_SYS.Get_Item_Value('EMP_NO_DUMMY', attr_);
   IF (dummy_rec_.emp_no_dummy IS NOT NULL) THEN
      newrec_.company_id := Client_SYS.Get_Item_Value('COMPANY_ID', attr_);
      IF User_Access_API.Is_User_Available_Emp_No(newrec_.company_id, dummy_rec_.emp_no_dummy) = dummy_rec_.emp_no_dummy THEN
        newrec_ := Get_Object_By_Keys___(newrec_.company_id, dummy_rec_.emp_no_dummy);
      ELSE
        Error_SYS.Record_General(lu_name_, 'NOTDUPLICATE: You are not authorized to copy data from employee :P1', dummy_rec_.emp_no_dummy);
      END IF;
   END IF;
   fname_exist_ := 0;
   lname_exist_ := 0;
   name2_exist_ := 0;
   name3_exist_ := 0;
   name5_exist_ := 0;
   name6_exist_ := 0;
   name7_exist_ := 0;
   name8_exist_ := 0;
   date_of_birth_exist_ :=0;
   place_of_birth_exist_ :=0;
   citizenship_exist_ :=0;
   insurance_id_exist_ :=0;
   marital_status_exist_ :=0;
   blood_type_exist_ :=0;
   sex_exist_ :=0;
   have_child_exist_ :=0;
   ext_name_exist_ := 0;
   picture_id_exist_ := 0;
   ptr_ := NULL;
   WHILE (Client_SYS.Get_Next_From_Attr(attr_, ptr_, name_, value_)) LOOP
      IF (name_ = 'COMPANY_ID') THEN
         newrec_.company_id := value_;
         Person_Company_API.Exist(newrec_.company_id);
      ELSIF (name_ = 'EMP_NO') THEN
         newrec_.emp_no := value_;
--         Company_Emp_API.Exist(newrec_.company_id, newrec_.emp_no); could not be checked
      ELSIF (name_ = 'PERSON_ID') THEN
         dummy_rec_.person_id := value_;
--         Pers_API.Exist(dummy_rec_.person_id); could not be checked

--2014/11/5 LiuJiangwu ADD START
       ELSIF (name_ = 'SUB_COMPANY_ID') THEN
         newrec_.sub_company_id := value_;
  --2014/11/5 LiuJiangwu ADD END
      ELSIF (name_ = 'OPERATOR') THEN
         newrec_.operator := User_Access_API.Get_User;
      ELSIF (name_ = 'FNAME') THEN
         dummy_rec_.fname := value_;
         fname_exist_  := 1;
      ELSIF (name_ = 'LNAME') THEN
         dummy_rec_.lname := value_;
         lname_exist_  := 1;
      ELSIF (name_ = 'SIGN') THEN
         newrec_.sign := value_;
      ELSIF (name_ = 'EMP_CARD') THEN
         newrec_.emp_card := value_;
      ELSIF (name_ = 'EMP_REMARK') THEN
         newrec_.emp_remark := value_;
      ELSIF (name_ = 'EMP_PUBLIC_REMARK') THEN
         newrec_.emp_public_remark := value_;
      ELSIF (name_ = 'AREA_CODE') THEN
         newrec_.area_code := value_;
         IF (value_ IS NOT NULL) THEN
            Company_Area_API.Exist(newrec_.company_id, newrec_.area_code);
         END IF;
      ELSIF (name_ = 'EMP_NO_DUMMY') THEN
         dummy_rec_.emp_no_dummy := value_;


      ELSIF (name_ = 'PICTURE_ID') THEN
         dummy_rec_.picture_id := Client_SYS.Attr_Value_To_Number(value_);
         picture_id_exist_ := 1;
      ELSIF (name_ = 'FREE_FIELD1') THEN
         free_rec_.free_field1 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '1' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field1,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field1) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD2') THEN
         free_rec_.free_field2 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '2' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field2,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field2) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD3') THEN
         free_rec_.free_field3 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '3' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field3,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field3) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD4') THEN
         free_rec_.free_field4 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '4' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field4,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field4) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD5') THEN
         free_rec_.free_field5 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '5' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field5,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field5) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD6') THEN
         free_rec_.free_field6 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '6' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field6,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field6) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD7') THEN
         free_rec_.free_field7 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '7' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field7,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field7) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD8') THEN
         free_rec_.free_field8 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '8' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field8,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field8) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD9') THEN
         free_rec_.free_field9 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '9' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field9,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field9) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD10') THEN
         free_rec_.free_field10 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '10' ;
            Company_Person_API.Get_Property_Code(Desc_,property_code_,field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field10,Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field10) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_,'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'VALID_FROM1') THEN
         free_rec_.valid_from1 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM2') THEN
         free_rec_.valid_from2 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM3') THEN
         free_rec_.valid_from3 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM4') THEN
         free_rec_.valid_from4 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM5') THEN
         free_rec_.valid_from5 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM6') THEN
         free_rec_.valid_from6 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM7') THEN
         free_rec_.valid_from7 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM8') THEN
         free_rec_.valid_from8 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM9') THEN
         free_rec_.valid_from9 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM10') THEN
         free_rec_.valid_from10 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO1') THEN
         free_rec_.valid_to1 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO2') THEN
         free_rec_.valid_to2 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO3') THEN
         free_rec_.valid_to3 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO4') THEN
         free_rec_.valid_to4 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO5') THEN
         free_rec_.valid_to5 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO6') THEN
         free_rec_.valid_to6 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO7') THEN
         free_rec_.valid_to7 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO8') THEN
         free_rec_.valid_to8 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO9') THEN
         free_rec_.valid_to9 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO10') THEN
         free_rec_.valid_to10 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'PROPERTY_NO1') THEN
         free_rec_.property_no1 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO2') THEN
         free_rec_.property_no2 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO3') THEN
         free_rec_.property_no3 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO4') THEN
         free_rec_.property_no4 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO5') THEN
         free_rec_.property_no5 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO6') THEN
         free_rec_.property_no6 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO7') THEN
         free_rec_.property_no7 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO8') THEN
         free_rec_.property_no8 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO9') THEN
         free_rec_.property_no9 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO10') THEN
         free_rec_.property_no10 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'EMP_CAT_NAME') THEN
         newrec_.emp_cat_id := Company_Emp_Category_API.Encode(newrec_.company_id,value_);
         IF (value_ IS NOT NULL) THEN
            Company_Emp_Category_API.Exist(newrec_.company_id,value_);
         END IF;
      ELSIF (name_ = 'MASTER_EMPLOYMENT') THEN
         newrec_.master_employment := value_;
      ELSIF (name_ = 'NAME2') THEN
         dummy_rec_.name2 := value_;
          name2_exist_ := 1;
      ELSIF (name_ = 'NAME3') THEN
         dummy_rec_.name3 := value_;
         name3_exist_ := 1;
      ELSIF (name_ = 'NAME5') THEN
         dummy_rec_.name5 := value_;
         name5_exist_ := 1;
      ELSIF (name_ = 'NAME6') THEN
         dummy_rec_.name6 := value_;
         name6_exist_ := 1;
      ELSIF (name_ = 'NAME7') THEN
         dummy_rec_.name7 := value_;
         name7_exist_ := 1;
      ELSIF (name_ = 'NAME8') THEN
         dummy_rec_.name8 := value_;
         name8_exist_ := 1;
      ELSIF (name_ = 'INTERNAL_DISPLAY_NAME') THEN
        dummy_rec_.internal_display_name := value_;
      ELSIF (name_ = 'EXTERNAL_DISPLAY_NAME') THEN
        dummy_rec_.external_display_name := value_;
        ext_name_exist_ := 1;
      ELSIF (name_ = 'DATE_OF_BIRTH') THEN
         date_of_birth_exist_ := 1;
         dummy_rec_.date_of_birth := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'PLACE_OF_BIRTH') THEN
         place_of_birth_exist_ := 1;
         dummy_rec_.place_of_birth := value_;
      ELSIF (name_ = 'CITIZENSHIP') THEN
         dummy_rec_.citizenship := Iso_Country_API.Encode(value_);
         citizenship_exist_ := 1;
      ELSIF (name_ = 'INSURANCE_ID') THEN
         dummy_rec_.insurance_id := value_;
         insurance_id_exist_ := 1;
      ELSIF (name_ = 'MARITAL_STATUS') THEN
         dummy_rec_.marital_status_id := Marital_Status_API.Encode(value_);
         marital_status_exist_ := 1;
      ELSIF (name_ = 'BLOOD_TYPE') THEN
         dummy_rec_.blood_type := Blood_Type_API.Encode(value_);
         blood_type_exist_ := 1;
      ELSIF (name_ = 'SEX') THEN
         dummy_rec_.sex := Person_Sex_API.Encode(value_);
         sex_exist_ := 1;
      ELSIF (name_ = 'HAVE_CHILD') THEN
         dummy_rec_.have_child := value_;
         have_child_exist_ := 1;
      ELSIF (name_ = 'EMPLOYEE_STATUS') THEN
         IF newrec_.company_id IS NULL THEN
            newrec_.company_id := Client_SYS.Get_Item_Value('COMPANY_ID', attr_);
         END IF;
      ELSIF (name_ = 'TIME_CLOCK_USER') THEN
         newrec_.time_clock_user := value_;
	    ELSIF (name_ = 'EMPLOYEE_NAME') THEN
        Null;
      --ybx 20130924 add start
      ELSIF (name_ = 'INTERNAL_ID') THEN
         newrec_.internal_id := value_;
      ELSIF (name_ = 'BEGIN_WORK_TIME') THEN
         newrec_.begin_work_time := Client_SYS.Attr_Value_To_Date(value_);
      --ybx 20130924 add end
      ELSIF (name_ = 'ORG_CODE') THEN
         IF (value_ IS NOT NULL) THEN
            company_org_api.Exist(newrec_.company_id,value_);
         END IF;
      ELSE
         Error_SYS.Item_Not_Exist(lu_name_, name_, value_);
      END IF;
   END LOOP;
   Client_SYS.Clear_Attr(attr_);

   IF (dummy_rec_.person_id IS NULL) THEN
       tmp_person_id_:= (Party_Identity_Series_API.Get_Next_Value(Party_Type_API.Decode('PERSON')));
       dummy_rec_.person_id := to_char(tmp_person_id_ +1);
   END IF;

   IF ((Check_First_Employee(newrec_.company_id,dummy_rec_.person_id) = 'TRUE') or (Check_No_Employee(newrec_.company_id,dummy_rec_.person_id) = 'TRUE')) THEN
      newrec_.master_employment := '1';
   END IF;

   IF (newrec_.emp_no IS NOT NULL) THEN
      IF Company_Emp_API.Get_Person_Id(newrec_.company_id, newrec_.emp_no) != dummy_rec_.person_id THEN
         Error_SYS.Record_General(lu_name_, 'PERSID: Changing the Person ID is not allowed.');
      END IF;
   END IF;

   IF  newrec_.time_clock_user IS NULL THEN
      newrec_.time_clock_user := 'FALSE';
   END IF;

   Error_SYS.Check_Not_Null(lu_name_, 'COMPANY_ID', newrec_.company_id);
--   Error_SYS.Check_Not_Null(lu_name_, 'EMP_NO', newrec_.emp_no);
   Error_SYS.Check_Not_Null(lu_name_, 'PERSON_ID', dummy_rec_.person_id);
   --start license mgt
   IF newrec_.time_clock_user = 'TRUE' THEN
      curr_status_ := EMPLOYEE_STATUS_DETAILS_API.Get_Emp_Status_Seq(newrec_.company_id, newrec_.emp_no, sysdate);
      IF curr_status_ = 1 THEN
         activation_date_ := sysdate;
      ELSE
         activation_date_ := EMPLOYEE_STATUS_DETAILS_API.Get_Activation_Date(newrec_.company_id, newrec_.emp_no);
      END IF;
      IF activation_date_ IS NOT NULL THEN
         EMPLOYEE_STATUS_DETAILS_API.Check_License_Violation(newrec_.company_id, activation_date_, diff_);
         IF diff_ < 0 THEN
            Error_SYS.Record_General(lu_name_, 'LICENSEVIOLATION: Time clock user license exceed - cannot create the employee with the Time Clock User flag on.');
         ELSIF diff_ < 10 THEN
            Client_SYS.Add_Info(lu_name_, 'LICENSEWARNING: Time clock user license only available for :P1 more employees.', diff_);
         END IF;
      END IF;
   END IF;
   --end license mgt

   IF (fname_exist_ = 0) THEN
      dummy_rec_.fname := Pers_API.Get_Name1(dummy_rec_.person_id);
   END IF;
   IF (lname_exist_ = 0) THEN
      dummy_rec_.lname := Pers_API.Get_Name4(dummy_rec_.person_id);
   END IF;
   IF (dummy_rec_.internal_display_name is null)  THEN
      OPEN get_dummy_rec;
      FETCH get_dummy_rec INTO int_name_;
      IF (get_dummy_rec%FOUND) THEN
         dummy_rec_.internal_display_name := int_name_;
      ELSE
         dummy_rec_.internal_display_name := dummy_rec_.fname || ' ' || dummy_rec_.lname;
      END IF;
      CLOSE get_dummy_rec;
   END IF;
   Error_SYS.Check_Not_Null(lu_name_, 'INTERNAL_DISPLAY_NAME', dummy_rec_.internal_display_name);
   IF (name2_exist_ = 0) THEN
      dummy_rec_.name2 := Pers_API.Get_Name2(dummy_rec_.person_id);
   END IF;
   IF (name3_exist_ = 0) THEN
      dummy_rec_.name3 := Pers_API.Get_Name3(dummy_rec_.person_id);
   END IF;
   IF (name5_exist_ = 0) THEN
      dummy_rec_.name5 := Pers_API.Get_Name5(dummy_rec_.person_id);
   END IF;
   IF (name6_exist_ = 0) THEN
      dummy_rec_.name6 := Pers_API.Get_Name6(dummy_rec_.person_id);
   END IF;
   IF (name7_exist_ = 0) THEN
      dummy_rec_.name7 := Pers_API.Get_Name7(dummy_rec_.person_id);
   END IF;
   IF (name8_exist_ = 0) THEN
      dummy_rec_.name8 := Pers_API.Get_Name8(dummy_rec_.person_id);
   END IF;
   IF (ext_name_exist_ = 0) THEN
      dummy_rec_.external_display_name := Pers_API.Get_external_display_name(dummy_rec_.person_id);
   END IF;
   IF (insurance_id_exist_ = 0) THEN
      dummy_rec_.insurance_id := Pers_API.Get_Insurance_Id(dummy_rec_.person_id);
   END IF;
   IF (date_of_birth_exist_ = 0) THEN
      dummy_rec_.date_of_birth := Pers_API.Get_Date_Of_Birth(dummy_rec_.person_id);
   END IF;
   IF (place_of_birth_exist_ = 0) THEN
      dummy_rec_.place_of_birth := Pers_API.Get_Place_Of_Birth(dummy_rec_.person_id);
   END IF;
   IF (have_child_exist_ = 0) THEN
      dummy_rec_.have_child := Pers_API.Get_Have_Child(dummy_rec_.person_id);
   END IF;
   IF (sex_exist_ = 0) THEN
      dummy_rec_.sex := Person_Sex_API.Encode(Pers_API.Get_Sex(dummy_rec_.person_id));
   END IF;
   IF (marital_status_exist_ = 0) THEN
      dummy_rec_.marital_status_id := Marital_Status_API.Encode(Pers_API.Get_Marital_Status(dummy_rec_.person_id));
   END IF;
   IF (citizenship_exist_ = 0) THEN
      dummy_rec_.citizenship := Iso_Country_API.Encode(Pers_API.Get_Citizenship(dummy_rec_.person_id));
   END IF;
   IF (blood_type_exist_ = 0) THEN
      dummy_rec_.blood_type := Blood_Type_API.Encode(Pers_API.Get_Blood_Type(dummy_rec_.person_id));
   END IF;
   IF (picture_id_exist_ = 0) THEN
      dummy_rec_.picture_id := Person_Info_API.Get_Picture_Id(dummy_rec_.person_id);
   END IF;
   dummy_rec_.company_id := newrec_.company_id;
   newrec_.operator := User_Access_API.Get_User;
   Check_Emp_Card___(newrec_, NULL);
   IF (newrec_.sign IS NOT NULL) THEN
      OPEN check_sign;
      FETCH check_sign INTO value_;
      IF (check_sign%FOUND) THEN
         Client_SYS.Add_Warning(lu_name_, 'EMPSIGN: Employee signature alreay exists. You may not want this.');
      END IF;
      CLOSE check_sign;
   END IF;
   IF User_Access_API.Exist(newrec_.company_id, dummy_rec_.person_id) = TRUE THEN
      Client_SYS.Add_Info(lu_name_, 'CONNECTUSER: The employee already have a defined connection in Multi Company Access for this company.');
   END IF;

   OPEN check_mast;
   FETCH check_mast INTO dummy_master_;
   IF (check_mast%FOUND) THEN
      IF ((dummy_master_ > 1) OR ((dummy_master_ = 1) AND (newrec_.master_employment = '1'))) THEN
         Client_SYS.Add_Warning(lu_name_, 'MASTEMP: The master employment will be changed to this employee number.');
      END IF;
   END IF;
   CLOSE check_mast;
   Error_SYS.Check_Not_Null(lu_name_, 'TIME_CLOCK_USER', newrec_.time_clock_user);

   --IF (NVL(insurance_id_check_,0) = 1) THEN
   --   Pers_API.Check_Swe_Insurance(dummy_rec_.insurance_id);
   --END IF;
EXCEPTION
   WHEN value_error THEN
      Error_SYS.Item_Format(lu_name_, name_, value_);
END Unpack_Check_Insert___;


PROCEDURE Insert___ (
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   newrec_     IN OUT COMPANY_PERSON_TAB%ROWTYPE,
   attr_       IN OUT VARCHAR2,
   dummy_rec_  IN OUT Dummy_Rec,
   free_rec_   IN OUT Free_Rec,
   get_objid_  IN     BOOLEAN DEFAULT TRUE )
IS
   temp_attr_         VARCHAR2(2000);
   free_attr_         VARCHAR2(2000);
   CURSOR get_objid IS
      SELECT rowid
      FROM  COMPANY_PERSON_TAB
      WHERE company_id = newrec_.company_id
      AND   emp_no = newrec_.emp_no;
   tem_attr_         VARCHAR2(2000);
   info_             VARCHAR2(2000);
   temp_pers_id      NUMBER;
   temp_objid        VARCHAR2(2000);
   temp_objversion   VARCHAR2(100);
   source_available_ BOOLEAN := FALSE;
   source_module_    VARCHAR(10);
BEGIN
   newrec_.rowversion := 1;
   objversion_ := to_char(newrec_.rowversion);

   temp_pers_id := PARTY_IDENTITY_SERIES_API.GET_NEXT_VALUE(Party_Type_API.Decode('PERSON'));

   IF ((temp_pers_id IS NOT NULL) AND (dummy_rec_.person_id = to_char(temp_pers_id + 1))) THEN
       Party_Identity_Series_API.Get_Next_Identity( dummy_rec_.person_id, 'PERSON');
   END IF;

   IF (newrec_.emp_no IS NULL) THEN
      LOOP
         Company_Property_Api.Get_Employee_Id_Property_Value(newrec_.emp_no,newrec_.company_id,'EMPLOYEEID');
         IF(newrec_.emp_no IS  NULL) THEN
            Party_Identity_Series_API.Get_Next_Identity( newrec_.emp_no, 'EMPLOYEE');
         END IF;
         IF (newrec_.emp_no IS NULL) THEN
            Error_SYS.Record_General(lu_name_,
               'EMP_ERROR: Error while retrieving the next free identity. Check the identity series for employee');
         ELSE
            Company_Property_Api.Emp_Apply_Mask(newrec_.emp_no,newrec_.company_id);
         END IF;
         EXIT WHEN not Check_Exist___(newrec_.company_id, newrec_.emp_no);
      END LOOP;
   END IF;

   IF (newrec_.master_employment='1') THEN
      Check_Master_Employment__ (newrec_.company_id,dummy_rec_.person_id);
   END IF;


   INSERT
      INTO company_person_tab (
         company_id,
         emp_no,
         operator,
         sign,
         emp_card,
         emp_remark,
         emp_public_remark,
         area_code,
		   emp_cat_id,
         master_employment,
         time_clock_user,
         internal_id,
         begin_work_time,
         rowversion,
	        --2014/11/5 LiuJiangwu ADD START
       sub_company_id
       --2014/11/5 LiuJiangwu ADD END
	 )
      VALUES (
         newrec_.company_id,
         newrec_.emp_no,
         newrec_.operator,
         newrec_.sign,
         newrec_.emp_card,
         newrec_.emp_remark,
         newrec_.emp_public_remark,
         newrec_.area_code,
         newrec_.emp_cat_id,
         newrec_.master_employment,
         newrec_.time_clock_user,
         newrec_.internal_id,
         newrec_.begin_work_time,
         newrec_.rowversion,
		        --2014/11/5 LiuJiangwu ADD START
       newrec_.sub_company_id
       --2014/11/5 LiuJiangwu ADD END
	 );
   IF get_objid_ THEN
      OPEN get_objid;
      FETCH get_objid INTO objid_;
      CLOSE get_objid;
      --
      -- update person register
      --
      Client_SYS.Clear_Attr(temp_attr_);
      Client_SYS.Add_To_Attr('COMPANY_ID', dummy_rec_.company_id, temp_attr_);
      Client_SYS.Add_To_Attr('NAME1', dummy_rec_.fname, temp_attr_);
      Client_SYS.Add_To_Attr('NAME2', dummy_rec_.name2, temp_attr_);
      Client_SYS.Add_To_Attr('NAME3', dummy_rec_.name3, temp_attr_);
      Client_SYS.Add_To_Attr('NAME4', dummy_rec_.lname, temp_attr_);
      Client_SYS.Add_To_Attr('NAME5', dummy_rec_.name5, temp_attr_);
      Client_SYS.Add_To_Attr('NAME6', dummy_rec_.name6, temp_attr_);
      Client_SYS.Add_To_Attr('NAME7', dummy_rec_.name7, temp_attr_);
      Client_SYS.Add_To_Attr('NAME8', dummy_rec_.name8, temp_attr_);
      Client_SYS.Add_To_Attr('EXTERNAL_DISPLAY_NAME', dummy_rec_.external_display_name, temp_attr_);
      Client_SYS.Add_To_Attr('INTERNAL_DISPLAY_NAME', dummy_rec_.internal_display_name, temp_attr_);
      Client_SYS.Add_To_Attr('DATE_OF_BIRTH', dummy_rec_.date_of_birth, temp_attr_);
      Client_SYS.Add_To_Attr('PLACE_OF_BIRTH', dummy_rec_.place_of_birth, temp_attr_);
      Client_SYS.Add_To_Attr('CITIZENSHIP', Iso_Country_API.Decode(dummy_rec_.citizenship), temp_attr_);
      Client_SYS.Add_To_Attr('INSURANCE_ID', dummy_rec_.insurance_id, temp_attr_);
      Client_SYS.Add_To_Attr('BLOOD_TYPE', Blood_Type_API.decode(dummy_rec_.blood_type), temp_attr_);
      Client_SYS.Add_To_Attr('SEX', Person_Sex_API.Decode(dummy_rec_.sex), temp_attr_);
      Client_SYS.Add_To_Attr('HAVE_CHILD', dummy_rec_.have_child, temp_attr_);
      Client_SYS.Add_To_Attr('MARITAL_STATUS', Marital_Status_API.Decode(dummy_rec_.marital_status_id), temp_attr_);
      IF dummy_rec_.picture_id IS NOT NULL THEN
         Client_SYS.Add_To_Attr('PICTURE_ID',dummy_rec_.picture_id, temp_attr_);
      END IF;
      Client_SYS.Add_To_Attr('PERSON_ID', dummy_rec_.person_id, temp_attr_);
      Pers_API.New_Modify(temp_attr_);

      Client_SYS.Clear_Attr(free_attr_);
      Client_SYS.Add_To_Attr('COMPANY_ID', newrec_.company_id, free_attr_);
      Client_SYS.Add_To_Attr('EMP_NO', newrec_.emp_no, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD1', free_rec_.free_field1, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD2', free_rec_.free_field2, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD3', free_rec_.free_field3, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD4', free_rec_.free_field4, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD5', free_rec_.free_field5, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD6', free_rec_.free_field6, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD7', free_rec_.free_field7, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD8', free_rec_.free_field8, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD9', free_rec_.free_field9, free_attr_);
      Client_SYS.Add_To_Attr('FREE_FIELD10', free_rec_.free_field10, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM1', free_rec_.valid_from1, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM2', free_rec_.valid_from2, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM3', free_rec_.valid_from3, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM4', free_rec_.valid_from4, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM5', free_rec_.valid_from5, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM6', free_rec_.valid_from6, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM7', free_rec_.valid_from7, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM8', free_rec_.valid_from8, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM9', free_rec_.valid_from9, free_attr_);
      Client_SYS.Add_To_Attr('VALID_FROM10', free_rec_.valid_from10, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO1', free_rec_.valid_to1, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO2', free_rec_.valid_to2, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO3', free_rec_.valid_to3, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO4', free_rec_.valid_to4, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO5', free_rec_.valid_to5, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO6', free_rec_.valid_to6, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO7', free_rec_.valid_to7, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO8', free_rec_.valid_to8, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO9', free_rec_.valid_to9, free_attr_);
      Client_SYS.Add_To_Attr('VALID_TO10', free_rec_.valid_to10, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO1', free_rec_.property_no1, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO2', free_rec_.property_no2, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO3', free_rec_.property_no3, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO4', free_rec_.property_no4, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO5', free_rec_.property_no5, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO6', free_rec_.property_no6, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO7', free_rec_.property_no7, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO8', free_rec_.property_no8, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO9', free_rec_.property_no9, free_attr_);
      Client_SYS.Add_To_Attr('PROPERTY_NO10', free_rec_.property_no10, free_attr_);
      Company_Employee_Property_API.New_Modify(free_attr_);

      IF Company_Emp_API.Check_Exist(newrec_.company_id, newrec_.emp_no) = 'FALSE' THEN
         IF Company_Emp_API.Get_Expire_Date(newrec_.company_id, newrec_.emp_no) IS NULL THEN
            Company_Emp_API.New(newrec_.company_id, newrec_.emp_no, dummy_rec_.person_id);
         END IF;
      END IF;
      Client_SYS.Add_To_Attr( 'EMP_NO_DUMMY', newrec_.emp_no, attr_ );
      Client_SYS.Add_To_Attr( 'MASTER_EMPLOYMENT', newrec_.master_employment, attr_ );
      Client_SYS.Add_To_Attr( 'EMP_NO', newrec_.emp_no, attr_ );
      Client_SYS.Add_To_Attr( 'PERSON_ID', dummy_rec_.person_id, attr_ );
   END IF;
   source_available_ := Client_SYS.Item_Exist('SOURCE_MODULE', attr_);
   IF (source_available_) THEN
      source_module_ := Client_SYS.Get_Item_Value('SOURCE_MODULE',attr_);
      IF (source_module_ = 'ENTERP') THEN
         Client_SYS.Clear_Attr(tem_attr_);
         Client_SYS.Add_To_Attr('VALID_FROM',TRUNC(SYSDATE),tem_attr_);
         Client_SYS.Add_To_Attr('COMPANY_ID',newrec_.company_id,tem_attr_);
         Client_SYS.Add_To_Attr('EMP_NO',newrec_.emp_no,tem_attr_);
         Client_SYS.Add_To_Attr('EMPLOYEE_STATUS',Employee_Status_API.Get_Active_Status(newrec_.company_id),tem_attr_);
         Employee_Status_Details_API.New__(info_,temp_objid,temp_objversion,tem_attr_,'DO');
         Client_SYS.Clear_Attr(tem_attr_);
      END IF;
   END IF;
EXCEPTION
   WHEN dup_val_on_index THEN
      Error_SYS.Record_Exist(lu_name_);
END Insert___;
-----------------------------------------------------------------------------
-------------------- IMPLEMENTATION BASE METHODS FOR UPDATE -----------------
-----------------------------------------------------------------------------
-- Unpack_Check_Update___
--    Unpack the attribute list, check all attributes from the client
--    and generate all default values before modifying the object.
--
-- Update___
--    Update an existing LU-instance in the database and return the
--    the new OBJVERSION.
-----------------------------------------------------------------------------

PROCEDURE Unpack_Check_Update___ (
   attr_      IN OUT VARCHAR2,
   newrec_    IN OUT COMPANY_PERSON_TAB%ROWTYPE,
   objid_     IN     VARCHAR2,
   dummy_rec_ IN OUT Dummy_Rec,
   free_rec_  IN OUT Free_Rec )
IS
   ptr_                NUMBER;
   name_               VARCHAR2(30);
   value_              VARCHAR2(2000);
   field_              VARCHAR2(2);
   desc_               VARCHAR2(40);
   property_code_      VARCHAR2(10);
   oldrec_             COMPANY_PERSON_TAB%ROWTYPE;
   master_employment_  VARCHAR2(1);
   dummy_person_       VARCHAR2(20);
   dummy_master_       NUMBER;
   insurance_id_check_ INTEGER;
   insurance_id_exist_ INTEGER;
   temp_objid_         COMPANY_PERSON.objid%TYPE;
   temp_objversion_    COMPANY_PERSON.objversion%TYPE;
   temp_data_type_     VARCHAR2(200);
   temp_view_          VARCHAR2(200);
   cur_validate_       INTEGER;
   i_                  NUMBER;
   NATIVE CONSTANT     INTEGER := 1;
   cnt_                INTEGER;

   activation_date_    DATE;
   diff_               NUMBER;
   curr_status_        NUMBER;

   CURSOR get_dummy_rec IS
      SELECT p.name1, p.name4, p.person_id, p.name2, p.name3,
             p.name5, p.name6, p.name7, p.name8, p.external_display_name, ip.name,
             p.date_of_birth, p.place_of_birth, p.citizenship, p.insurance_id, p.marital_status_id,
             p.blood_type, p.sex, p.have_child,ip.picture_id
      FROM   company_emp_tab ce, pers_tab p, person_info_tab ip
      WHERE  p.person_id = ce.person_id
      AND    ce.company = newrec_.company_id
      AND    ce.employee_id = newrec_.emp_no
      AND    p.person_id = ip.person_id;

   CURSOR check_sign IS
      SELECT '1'
      FROM   company_person_tab cp
      WHERE  company_id  = newrec_.company_id
      AND    sign        = newrec_.sign
      AND    rowid     != temp_objid_;

   CURSOR check_mast IS
      SELECT COUNT(*)
      FROM   company_person
      WHERE  company_id = newrec_.company_id
      AND    person_id = dummy_rec_.person_id
      AND    master_employment = '1';

   CURSOR lu_keys (ref_view_name_  VARCHAR2) IS
       SELECT A.column_name, A.comments
         FROM user_col_comments A, user_tab_columns B
        WHERE A.table_name  = B.table_name
          AND A.column_name = B.column_name
          AND A.table_name  = upper(ref_view_name_)
          AND A.comments LIKE 'FLAGS=K%L%'
     ORDER BY B.column_id;

   key_       lu_keys%ROWTYPE;

BEGIN
   insurance_id_exist_ :=0;
   ptr_ := NULL;
   OPEN get_dummy_rec;
   FETCH get_dummy_rec INTO dummy_rec_.fname, dummy_rec_.lname, dummy_rec_.person_id, dummy_rec_.name2, dummy_rec_.name3, dummy_rec_.name5
   , dummy_rec_.name6, dummy_rec_.name7, dummy_rec_.name8, dummy_rec_.external_display_name, dummy_rec_.internal_display_name, dummy_rec_.date_of_birth
   , dummy_rec_.place_of_birth, dummy_rec_.citizenship, dummy_rec_.insurance_id, dummy_rec_.marital_status_id, dummy_rec_.blood_type
   , dummy_rec_.sex, dummy_rec_.have_child,dummy_rec_.picture_id;
   CLOSE get_dummy_rec;
   WHILE (Client_SYS.Get_Next_From_Attr(attr_, ptr_, name_, value_)) LOOP
      IF (name_ = 'COMPANY_ID') THEN
         Error_SYS.Item_Update(lu_name_, 'COMPANY_ID');
      ELSIF (name_ = 'EMP_NO') THEN
         Error_SYS.Item_Update(lu_name_, 'EMP_NO');
      ELSIF (name_ = 'PERSON_ID') THEN
         Error_SYS.Item_Update(lu_name_, 'PERSON_ID');
      ELSIF (name_ = 'OPERATOR') THEN
         newrec_.operator := User_Access_API.Get_User;
      ELSIF (name_ = 'FNAME') THEN
         dummy_rec_.fname := value_;
      ELSIF (name_ = 'LNAME') THEN
         dummy_rec_.lname := value_;
      ELSIF (name_ = 'SIGN') THEN
         newrec_.sign := value_;
      ELSIF (name_ = 'EMP_CARD') THEN
         newrec_.emp_card := value_;
      ELSIF (name_ = 'EMP_REMARK') THEN
         newrec_.emp_remark := value_;
      ELSIF (name_ = 'EMP_PUBLIC_REMARK') THEN
         newrec_.emp_public_remark := value_;
      ELSIF (name_ = 'AREA_CODE') THEN
         newrec_.area_code := value_;
         IF (value_ IS NOT NULL) THEN
            Company_Area_API.Exist(newrec_.company_id, newrec_.area_code);
         END IF;
      ELSIF (name_ = 'EMP_NO_DUMMY') THEN
         Error_SYS.Item_Update(lu_name_, 'EMP_NO_DUMMY');

--2014/11/5 LiuJiangwu ADD START
       ELSIF (name_ = 'SUB_COMPANY_ID') THEN
         newrec_.sub_company_id := value_;
  --2014/11/5 LiuJiangwu ADD END
      ELSIF (name_ = 'PICTURE_ID') THEN
         dummy_rec_.picture_id := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'FREE_FIELD1') THEN
         free_rec_.free_field1 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '1' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field1, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field1) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD2') THEN
         free_rec_.free_field2 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '2' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field2, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field2) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD3') THEN
         free_rec_.free_field3 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '3' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field3, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field3) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD4') THEN
         free_rec_.free_field4 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '4' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field4, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field4) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD5') THEN
         free_rec_.free_field5 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '5' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field5, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field5) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD6') THEN
         free_rec_.free_field6 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '6' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field6, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field6) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD7') THEN
         free_rec_.free_field7 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '7' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field7, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field7) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD8') THEN
         free_rec_.free_field8 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '8' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field8, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field8) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD9') THEN
         free_rec_.free_field9 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '9' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field9, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field9) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'FREE_FIELD10') THEN
         free_rec_.free_field10 := value_;
         IF (value_ IS NOT NULL) THEN
            field_ := '10' ;
            Company_Person_API.Get_Property_Code(Desc_, property_code_, field_);
            IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '3')) THEN
               Property_Value_API.Validate_date(free_rec_.free_field10, Property_Rule_API.Get_Date_Format_Raw(property_code_));
            ELSE
               IF Property_Rule_API.Get_Length(property_code_)IS NOT NULL THEN
                  IF length(free_rec_.free_field10) > Property_Rule_API.Get_Length(property_code_) THEN
                     Error_SYS.Record_General(lu_name_, 'INVLENTHPR: Invalid Length');
                  END IF;
               END IF;
               IF ((Data_Type_API.Encode(Property_Rule_API.Get_Data_Type(property_code_)) = '2')) THEN
                  Property_Value_API.validate_number(property_code_, value_);
                  value_ := REPLACE(value_,',','.');
               END IF;
            END IF;
            IF Property_Rule_API.Get_Use_Lov_For_Validation(property_code_) = '1' THEN
               temp_view_  := Property_Rule_API.Get_Lov_View(property_code_);
               i_ := INSTR(temp_view_,'(');
               IF i_ > 1 THEN
                  temp_view_ := RTRIM(SUBSTR(temp_view_,1,i_-1));
               END IF;
               IF (temp_view_ ='PROPERTY_VALUE') THEN
                  Property_Value_API.Exist(property_code_, value_);
               ELSE
                  temp_data_type_ := Property_Rule_API.Get_Data_Type(property_code_);
                  OPEN lu_keys(temp_view_);
                  FETCH lu_keys INTO key_;
                  CLOSE lu_keys;
                  cur_validate_ := dbms_sql.open_cursor;
                  Assert_Sys.Assert_Is_View(temp_view_);
                  Assert_Sys.Assert_Is_View_Column(temp_view_,key_.Column_name);
                  -- ifs_assert_safe ovjose 20051115
                  dbms_sql.parse(cur_validate_,'SELECT 1  FROM '||temp_view_|| ' WHERE '||key_.Column_name||' = :value' ,NATIVE);
                  DBMS_SQL.BIND_VARIABLE(cur_validate_, 'value', value_);
                  cnt_ := dbms_sql.execute(cur_validate_);
                  cnt_ := dbms_sql.fetch_rows(cur_validate_);
                  dbms_sql.close_cursor(cur_validate_);
                  IF  cnt_ <= 0 THEN
                      Error_SYS.Record_General(lu_name_, 'NOTINLOV: Inavalid property value , :P1 ', value_);
                  END IF;
               END IF;
            END IF;
         END IF;
      ELSIF (name_ = 'VALID_FROM1') THEN
         free_rec_.valid_from1 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM2') THEN
         free_rec_.valid_from2 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM3') THEN
         free_rec_.valid_from3 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM4') THEN
         free_rec_.valid_from4 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM5') THEN
         free_rec_.valid_from5 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM6') THEN
         free_rec_.valid_from6 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM7') THEN
         free_rec_.valid_from7 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM8') THEN
         free_rec_.valid_from8 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM9') THEN
         free_rec_.valid_from9 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_FROM10') THEN
         free_rec_.valid_from10 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO1') THEN
         free_rec_.valid_to1 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO2') THEN
         free_rec_.valid_to2 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO3') THEN
         free_rec_.valid_to3 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO4') THEN
         free_rec_.valid_to4 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO5') THEN
         free_rec_.valid_to5 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO6') THEN
         free_rec_.valid_to6 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO7') THEN
         free_rec_.valid_to7 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO8') THEN
         free_rec_.valid_to8 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO9') THEN
         free_rec_.valid_to9 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'VALID_TO10') THEN
         free_rec_.valid_to10 := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'PROPERTY_NO1') THEN
         free_rec_.property_no1 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO2') THEN
         free_rec_.property_no2 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO3') THEN
         free_rec_.property_no3 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO4') THEN
         free_rec_.property_no4 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO5') THEN
         free_rec_.property_no5 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO6') THEN
         free_rec_.property_no6 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO7') THEN
         free_rec_.property_no7 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO8') THEN
         free_rec_.property_no8 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO9') THEN
         free_rec_.property_no9 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'PROPERTY_NO10') THEN
         free_rec_.property_no10 := Client_SYS.Attr_Value_To_Number(value_);
      ELSIF (name_ = 'EMP_CAT_NAME') THEN
         newrec_.emp_cat_id := Company_Emp_Category_API.Encode(newrec_.company_id, value_);
         IF (value_ IS NOT NULL) THEN
            Company_Emp_Category_API.Exist(newrec_.company_id, value_);
         END IF;
      ELSIF (name_ = 'MASTER_EMPLOYMENT') THEN
         newrec_.master_employment := value_;
      ELSIF (name_ = 'NAME2') THEN
         dummy_rec_.name2 := value_;
      ELSIF (name_ = 'NAME3') THEN
         dummy_rec_.name3 := value_;
      ELSIF (name_ = 'NAME5') THEN
         dummy_rec_.name5 := value_;
      ELSIF (name_ = 'NAME6') THEN
         dummy_rec_.name6 := value_;
      ELSIF (name_ = 'NAME7') THEN
         dummy_rec_.name7 := value_;
      ELSIF (name_ = 'NAME8') THEN
         dummy_rec_.name8 := value_;
      ELSIF (name_ = 'INTERNAL_DISPLAY_NAME') THEN
         dummy_rec_.internal_display_name := value_;
      ELSIF (name_ = 'EXTERNAL_DISPLAY_NAME') THEN
         dummy_rec_.external_display_name := value_;
      ELSIF (name_ = 'DATE_OF_BIRTH') THEN
         dummy_rec_.date_of_birth := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'PLACE_OF_BIRTH') THEN
         dummy_rec_.place_of_birth := value_;
      ELSIF (name_ = 'CITIZENSHIP') THEN
         dummy_rec_.citizenship := Iso_Country_API.Encode(value_);
      ELSIF (name_ = 'INSURANCE_ID') THEN
         dummy_rec_.insurance_id := value_;
         insurance_id_exist_ :=1;
      ELSIF (name_ = 'MARITAL_STATUS') THEN
         dummy_rec_.marital_status_id := Marital_Status_API.Encode(value_);
      ELSIF (name_ = 'BLOOD_TYPE') THEN
         dummy_rec_.blood_type :=  Blood_Type_API.Encode(value_);
      ELSIF (name_ = 'SEX') THEN
         dummy_rec_.sex := Person_Sex_API.Encode(value_);
      ELSIF (name_ = 'HAVE_CHILD') THEN
         dummy_rec_.have_child := value_;
      ELSIF (name_ = 'PROTECTED') THEN
         dummy_rec_.protected := value_;
      ELSIF (name_ = 'TIME_CLOCK_USER') THEN
         newrec_.time_clock_user := value_;
      --ybx 20130924 add start
      ELSIF (name_ = 'INTERNAL_ID') THEN
         newrec_.internal_id := value_;
      ELSIF (name_ = 'BEGIN_WORK_TIME') THEN
         newrec_.begin_work_time := Client_SYS.Attr_Value_To_Date(value_);
      --ybx 20130924 add end
      ELSE
         Error_SYS.Item_Not_Exist(lu_name_, name_, value_);
      END IF;
   END LOOP;

   Client_SYS.Clear_Attr(attr_);
   --Start check License mgt
   IF newrec_.time_clock_user = 'TRUE' THEN
      curr_status_ := EMPLOYEE_STATUS_DETAILS_API.Get_Emp_Status_Seq(newrec_.company_id, newrec_.emp_no, sysdate);
      IF curr_status_ = 1 THEN
         activation_date_ := sysdate;
      ELSE
         activation_date_ := EMPLOYEE_STATUS_DETAILS_API.Get_Activation_Date(newrec_.company_id, newrec_.emp_no);
      END IF;
      IF activation_date_ IS NOT NULL THEN
         EMPLOYEE_STATUS_DETAILS_API.Check_License_Violation(newrec_.company_id, activation_date_, diff_);
         IF diff_ < 0 THEN
            Error_SYS.Record_General(lu_name_, 'LICENSEVIOLATION: Time clock user license exceed - cannot create the employee with the Time Clock User flag on.');
         ELSIF diff_ < 10 THEN
            Client_SYS.Add_Info(lu_name_, 'LICENSEWARNING: Time clock user license only available for :P1 more employees.', diff_);
         END IF;
      END IF;
   END IF;
   --End License mgt

   IF objid_ IS NULL THEN
      Get_Id_Version_By_Keys___(temp_objid_, temp_objversion_, newrec_.company_id, newrec_.emp_no);
   ELSE
      temp_objid_ := objid_;
   END IF;
   oldrec_ := Get_Object_By_Id___(temp_objid_);
   master_employment_ := oldrec_.master_employment;
   dummy_person_ := Get_Person(newrec_.company_id, newrec_.emp_no);
   IF((Check_Master_Employee(newrec_.company_id, dummy_person_)= 'TRUE') AND (newrec_.master_employment = '0') AND (master_employment_ = '1'))THEN
      Client_SYS.Add_Warning(lu_name_, 'NOAUTH: The person :P1 :P2 does not have any Master Employment any more', dummy_person_, dummy_rec_.internal_display_name);
   END IF;
   IF (dummy_rec_.internal_display_name is null)  THEN
      dummy_rec_.internal_display_name := dummy_rec_.fname || ' ' || dummy_rec_.lname;
   END IF;
   Error_SYS.Check_Not_Null(lu_name_, 'INTERNAL_DISPLAY_NAME', dummy_rec_.internal_display_name);
   newrec_.operator := User_Access_API.Get_User;
   Check_Emp_Card___(newrec_, temp_objid_);
   IF (newrec_.sign IS NOT NULL) THEN
      OPEN check_sign;
      FETCH check_sign INTO value_;
      IF (check_sign%FOUND) THEN
         Client_SYS.Add_Warning(lu_name_, 'EMPSIGN: Employee signature alreay exists. You may not want this.');
      END IF;
      CLOSE check_sign;
   END IF;
   OPEN check_mast;
   FETCH check_mast INTO dummy_master_;
   IF (check_mast%FOUND) THEN
      IF (master_employment_ != '1') THEN
         IF ((dummy_master_ > 1) OR ((dummy_master_ = 1) AND (newrec_.master_employment = '1'))) THEN
            Client_SYS.Add_Warning(lu_name_, 'MASTEMP: The master employment will be changed to this employee number.');
         END IF;
      END IF;
   END IF;
   CLOSE check_mast;

   --IF (NVL(insurance_id_check_,0) = 1) THEN
   --   Pers_API.Check_Swe_Insurance(dummy_rec_.insurance_id);
   --END IF;
   Error_SYS.Check_Not_Null(lu_name_, 'TIME_CLOCK_USER', newrec_.time_clock_user);
EXCEPTION
WHEN value_error THEN
      Error_SYS.Item_Format(lu_name_, name_, value_);
END Unpack_Check_Update___;

PROCEDURE Update___ (
   objid_      IN     VARCHAR2,
   oldrec_     IN     COMPANY_PERSON_TAB%ROWTYPE,
   newrec_     IN OUT COMPANY_PERSON_TAB%ROWTYPE,
   attr_       IN OUT VARCHAR2,
   objversion_ IN OUT VARCHAR2,
   dummy_rec_   IN    Dummy_Rec,
   free_rec_   IN     Free_Rec,
   by_keys_    IN BOOLEAN DEFAULT FALSE )
IS
   temp_attr_    VARCHAR2(2000);
   free_attr_    VARCHAR2(2000);

BEGIN

   IF User_Access_API.Is_User_Available_Emp_No(newrec_.company_id, newrec_.emp_no) IS NULL THEN
       Error_SYS.Record_General(lu_name_, 'NOAUTHMODIFY: You are not authorized to modify information on employee :P1 in company :P2', newrec_.emp_no, newrec_.company_id);
   END IF;
   newrec_.rowversion := newrec_.rowversion + 1;
   objversion_ := to_char(newrec_.rowversion);
   IF ((newrec_.master_employment='1') AND (oldrec_.master_employment='0')) THEN
      Check_Master_Employment__ (newrec_.company_id,dummy_rec_.person_id);
   END IF;
   IF by_keys_ THEN
      UPDATE company_person_tab
      SET company_id = newrec_.company_id,
          emp_no = newrec_.emp_no,
          operator = newrec_.operator,
          sign = newrec_.sign,
          emp_card = newrec_.emp_card,
          emp_remark = newrec_.emp_remark,
          emp_public_remark = newrec_.emp_public_remark,
          area_code = newrec_.area_code,
          emp_cat_id = newrec_.emp_cat_id,
          master_employment = newrec_.master_employment,
          time_clock_user = newrec_.time_clock_user,
          internal_id = newrec_.internal_id,
          begin_work_time = newrec_.begin_work_time,
	  --2014/11/5 LiuJiangwu ADD START
          sub_company_id = newrec_.sub_company_id,
          --2014/11/5 LiuJiangwu ADD END
          rowversion = newrec_.rowversion
      WHERE company_id = newrec_.company_id
      AND   emp_no = newrec_.emp_no;
   ELSE
      UPDATE company_person_tab
      SET company_id = newrec_.company_id,
          emp_no = newrec_.emp_no,
          operator = newrec_.operator,
          sign = newrec_.sign,
          emp_card = newrec_.emp_card,
          emp_remark = newrec_.emp_remark,
          emp_public_remark = newrec_.emp_public_remark,
          area_code = newrec_.area_code,
          emp_cat_id = newrec_.emp_cat_id,
          master_employment = newrec_.master_employment,
          time_clock_user = newrec_.time_clock_user,
          internal_id = newrec_.internal_id,
          begin_work_time = newrec_.begin_work_time,
	  --2014/11/5 LiuJiangwu ADD START

          sub_company_id = newrec_.sub_company_id ,
          --2014/11/5 LiuJiangwu ADD END
          rowversion = newrec_.rowversion
      WHERE rowid = objid_;
   END IF;

   --
   -- update person register
   --

   Client_SYS.Clear_Attr(temp_attr_);
   Client_SYS.Add_To_Attr('NAME1', dummy_rec_.fname, temp_attr_);
   Client_SYS.Add_To_Attr('NAME2', dummy_rec_.name2, temp_attr_);
   Client_SYS.Add_To_Attr('NAME3', dummy_rec_.name3, temp_attr_);
   Client_SYS.Add_To_Attr('NAME4', dummy_rec_.lname, temp_attr_);
   Client_SYS.Add_To_Attr('NAME5', dummy_rec_.name5, temp_attr_);
   Client_SYS.Add_To_Attr('NAME6', dummy_rec_.name6, temp_attr_);
   Client_SYS.Add_To_Attr('NAME7', dummy_rec_.name7, temp_attr_);
   Client_SYS.Add_To_Attr('NAME8', dummy_rec_.name8, temp_attr_);
   Client_SYS.Add_To_Attr('EXTERNAL_DISPLAY_NAME', dummy_rec_.external_display_name, temp_attr_);
   Client_SYS.Add_To_Attr('INTERNAL_DISPLAY_NAME', dummy_rec_.internal_display_name, temp_attr_);
   Client_SYS.Add_To_Attr('DATE_OF_BIRTH', dummy_rec_.date_of_birth, temp_attr_);
   Client_SYS.Add_To_Attr('PLACE_OF_BIRTH', dummy_rec_.place_of_birth, temp_attr_);
   Client_SYS.Add_To_Attr('CITIZENSHIP', Iso_Country_API.Decode(dummy_rec_.citizenship), temp_attr_);
   Client_SYS.Add_To_Attr('INSURANCE_ID', dummy_rec_.insurance_id, temp_attr_);
   Client_SYS.Add_To_Attr('BLOOD_TYPE', Blood_Type_API.decode(dummy_rec_.blood_type), temp_attr_);
   Client_SYS.Add_To_Attr('SEX', Person_Sex_API.Decode(dummy_rec_.sex), temp_attr_);
   Client_SYS.Add_To_Attr('HAVE_CHILD', dummy_rec_.have_child, temp_attr_);
   Client_SYS.Add_To_Attr('MARITAL_STATUS', Marital_Status_API.Decode(dummy_rec_.marital_status_id), temp_attr_);
   Client_SYS.Add_To_Attr('PICTURE_ID',dummy_rec_.picture_id, temp_attr_);
   Client_SYS.Add_To_Attr('PERSON_ID', dummy_rec_.person_id, temp_attr_);
   IF dummy_rec_.protected IS NOT NULL THEN
         Client_SYS.Add_To_Attr('PROTECTED',dummy_rec_.protected, temp_attr_);
   END IF;
   Pers_API.New_Modify(temp_attr_);

   Client_SYS.Clear_Attr(free_attr_);
   Client_SYS.Add_To_Attr('COMPANY_ID', newrec_.company_id, free_attr_);
   Client_SYS.Add_To_Attr('EMP_NO', newrec_.emp_no, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD1', free_rec_.free_field1, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD2', free_rec_.free_field2, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD3', free_rec_.free_field3, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD4', free_rec_.free_field4, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD5', free_rec_.free_field5, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD6', free_rec_.free_field6, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD7', free_rec_.free_field7, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD8', free_rec_.free_field8, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD9', free_rec_.free_field9, free_attr_);
   Client_SYS.Add_To_Attr('FREE_FIELD10', free_rec_.free_field10, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM1', free_rec_.valid_from1, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM2', free_rec_.valid_from2, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM3', free_rec_.valid_from3, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM4', free_rec_.valid_from4, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM5', free_rec_.valid_from5, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM6', free_rec_.valid_from6, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM7', free_rec_.valid_from7, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM8', free_rec_.valid_from8, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM9', free_rec_.valid_from9, free_attr_);
   Client_SYS.Add_To_Attr('VALID_FROM10', free_rec_.valid_from10, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO1', free_rec_.valid_to1, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO2', free_rec_.valid_to2, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO3', free_rec_.valid_to3, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO4', free_rec_.valid_to4, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO5', free_rec_.valid_to5, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO6', free_rec_.valid_to6, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO7', free_rec_.valid_to7, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO8', free_rec_.valid_to8, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO9', free_rec_.valid_to9, free_attr_);
   Client_SYS.Add_To_Attr('VALID_TO10', free_rec_.valid_to10, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO1', free_rec_.property_no1, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO2', free_rec_.property_no2, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO3', free_rec_.property_no3, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO4', free_rec_.property_no4, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO5', free_rec_.property_no5, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO6', free_rec_.property_no6, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO7', free_rec_.property_no7, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO8', free_rec_.property_no8, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO9', free_rec_.property_no9, free_attr_);
   Client_SYS.Add_To_Attr('PROPERTY_NO10', free_rec_.property_no10, free_attr_);
   Company_Employee_Property_API.New_Modify(free_attr_);
EXCEPTION
   WHEN dup_val_on_index THEN
      Error_SYS.Record_Exist(lu_name_);
END Update___;
-----------------------------------------------------------------------------
-------------------- IMPLEMENTATION BASE METHODS FOR DELETE -----------------
-----------------------------------------------------------------------------
-- Check_Delete___
--    Checks whether a specific LU-record may be removed or not.
--    The procedure should check business rules like attribute values
--    as well as database constraints (defined or not).
--
-- Delete___
--    Deletion of the specific LU-object from the database.
-----------------------------------------------------------------------------

PROCEDURE Check_Delete___ (
   remrec_ IN COMPANY_PERSON_TAB%ROWTYPE )
IS
   key_ VARCHAR2(2000);
BEGIN
   key_ := remrec_.company_id || '^' || remrec_.emp_no || '^';
   Reference_SYS.Check_Restricted_Delete(lu_name_, key_);
   Reference_SYS.Check_Restricted_Delete('CompanyPers', key_);
END Check_Delete___;


PROCEDURE Delete___ (
   objid_   IN VARCHAR2,
   remrec_  IN COMPANY_PERSON_TAB%ROWTYPE,
   by_keys_ IN BOOLEAN DEFAULT FALSE )
IS
   key_       VARCHAR2(2000);
   newrec_    COMPANY_PERSON_TAB%ROWTYPE;
   person_id_ VARCHAR2(20);

  CURSOR get_person IS
      SELECT person_id
      FROM   company_person
      WHERE  emp_no   = remrec_.emp_no
      AND    company_id =remrec_.company_id;
BEGIN
   IF User_Access_API.Is_User_Available_Emp_No(remrec_.company_id, remrec_.emp_no) IS NULL THEN
      Error_SYS.Record_General(lu_name_, 'NOAUTHREMOVE: You are not authorized to remove information on employee :P1 in company :P2', remrec_.emp_no, remrec_.company_id);
   END IF;
   key_ := remrec_.company_id || '^' || remrec_.emp_no || '^';
   Reference_SYS.Do_Cascade_Delete(lu_name_, key_);
   Reference_SYS.Do_Cascade_Delete('CompanyPers', key_);
   IF by_keys_ THEN
      newrec_ := remrec_;
      DELETE FROM COMPANY_PERSON_TAB
         WHERE company_id = newrec_.company_id
         AND   emp_no = newrec_.emp_no;
   ELSE
      DELETE
         FROM  company_person_tab
         WHERE rowid = objid_;
   END IF;

   OPEN get_person;
   FETCH get_person INTO person_id_;
   CLOSE get_person;
END Delete___;

-----------------------------------------------------------------------------
-------------------- PRIVATE BASE METHODS -----------------------------------
-----------------------------------------------------------------------------
-- Lock__
--    Client-support to lock a specific instance of the logical unit.
--
-- New__
--    Client-support interface to create LU instances.
--       action_ = 'PREPARE'
--          Default values and handle of information to client.
--          The default values are set in procedure Prepare_Insert___.
--       action_ = 'CHECK'
--          Check all attributes before creating new object and handle of
--          information to client. The attribute list is unpacked, checked
--          and prepared (defaults) in procedure Unpack_Check_Insert___.
--       action_ = 'DO'
--          Creation of new instances of the logical unit and handle of
--          information to client. The attribute list is unpacked, checked
--          and prepared (defaults) in procedure Unpack_Check_Insert___
--          before calling procedure Insert___.
--
-- Modify__
--    Client-support interface to modify attributes for LU instances.
--       action_ = 'CHECK'
--          Check all attributes before modifying an existing object and
--          handle of information to client. The attribute list is unpacked,
--          checked and prepared(defaults) in procedure Unpack_Check_Update___.
--       action_ = 'DO'
--          Modification of an existing instance of the logical unit. The
--          procedure unpacks the attributes, checks all values before
--          procedure Update___ is called.
--
-- Remove__
--    Client-support interface to remove LU instances.
--       action_ = 'CHECK'
--          Check whether a specific LU-instance may be removed or not.
--          The procedure fetches the complete record by calling procedure
--          Get_Object_By_Id___. Then the check is made by calling procedure
--          Check_Delete___.
--       action_ = 'DO'
--          Remove an existing instance of the logical unit. The procedure
--          fetches the complete LU-record, checks for a delete and then
--          deletes the record by calling procedure Delete___.
-----------------------------------------------------------------------------

PROCEDURE Lock__ (
   info_       OUT VARCHAR2,
   objid_      IN  VARCHAR2,
   objversion_ IN  VARCHAR2 )
IS
   dummy_ COMPANY_PERSON_TAB%ROWTYPE;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Lock__');
   dummy_ := Lock_By_Id___(objid_, objversion_);
   info_ := Client_SYS.Get_All_Info;
END Lock__;


PROCEDURE New__ (
   info_       OUT    VARCHAR2,
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   attr_       IN OUT VARCHAR2,
   action_     IN     VARCHAR2 )
IS
   newrec_ COMPANY_PERSON_TAB%ROWTYPE;
   dummy_rec_ Dummy_Rec;
   free_rec_ Free_Rec;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'New__');
   IF (action_ = 'PREPARE') THEN
      Prepare_Insert___(attr_);
   ELSIF (action_ = 'CHECK') THEN
      Unpack_Check_Insert___(attr_, newrec_, dummy_rec_, free_rec_);
   ELSIF (action_ = 'DO') THEN
      Unpack_Check_Insert___(attr_, newrec_, dummy_rec_, free_rec_);
      Insert___(objid_, objversion_, newrec_, attr_, dummy_rec_, free_rec_);
   END IF;
   info_ := Client_SYS.Get_All_Info;
END New__;


PROCEDURE Modify__ (
   info_       OUT    VARCHAR2,
   objid_      IN     VARCHAR2,
   objversion_ IN OUT VARCHAR2,
   attr_       IN OUT VARCHAR2,
   action_     IN     VARCHAR2 )
IS
   oldrec_ COMPANY_PERSON_TAB%ROWTYPE;
   newrec_ COMPANY_PERSON_TAB%ROWTYPE;
   dummy_rec_ Dummy_Rec;
   free_rec_ Free_Rec;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Modify__');
   IF (action_ = 'CHECK') THEN
      newrec_ := Get_Object_By_Id___(objid_);
      Unpack_Check_Update___(attr_, newrec_, objid_, dummy_rec_, free_rec_);
   ELSIF (action_ = 'DO') THEN
      oldrec_ := Lock_By_Id___(objid_, objversion_);
      newrec_ := oldrec_;
      Unpack_Check_Update___(attr_, newrec_, objid_, dummy_rec_, free_rec_);
      Update___(objid_, oldrec_, newrec_, attr_, objversion_, dummy_rec_, free_rec_);
   END IF;
   info_ := Client_SYS.Get_All_Info;
END Modify__;


PROCEDURE Remove__ (
   info_       OUT VARCHAR2,
   objid_      IN  VARCHAR2,
   objversion_ IN  VARCHAR2,
   action_     IN  VARCHAR2 )
IS
   remrec_ COMPANY_PERSON_TAB%ROWTYPE;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Remove__');
   IF (action_ = 'CHECK') THEN
      remrec_ := Get_Object_By_Id___(objid_);
      Check_Delete___(remrec_);
   ELSIF (action_ = 'DO') THEN
      remrec_ := Lock_By_Id___(objid_, objversion_);
      Check_Delete___(remrec_);
      Delete___(objid_, remrec_);
   END IF;
   info_ := Client_SYS.Get_All_Info;
END Remove__;

-----------------------------------------------------------------------------
-------------------- PUBLIC BASE METHODS ------------------------------------
-----------------------------------------------------------------------------
-- Exist
--   Checks if given pointer (e.g. primary key) to an instance of this
--   logical unit exists. If not an exception will be raised.
-----------------------------------------------------------------------------

PROCEDURE Exist (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Exist', TRUE);
   --IF (emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_)) THEN
      IF (Check_Exist___(company_id_, emp_no_)) THEN
         RETURN;
      END IF;
   --END IF;
   Error_SYS.Record_Not_Exist(lu_name_);
END Exist;

PROCEDURE Check_Exist (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Check_Exist');
   IF (Check_Exist___(company_id_, emp_no_)) THEN
      RETURN;
   END IF;
   Error_SYS.Record_General(lu_name_, 'EMPNOEXIST: Employee does not exist');
END Check_Exist;

-----------------------------------------------------------------------------
-------------------- LU SPECIFIC IMPLEMENTATION METHODS ---------------------
-----------------------------------------------------------------------------

FUNCTION Check_Payment_Possible___ (
   emp_cat_name_ IN COMPANY_PERSON.emp_cat_name%TYPE,
   person_id_  IN pers_tab.person_id%TYPE ) RETURN BOOLEAN
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Check_Payment_Possible___');
   IF emp_cat_name_ IS NULL OR person_id_ IS NULL THEN
      RETURN FALSE;
   END IF;
   IF Pers_API.Get_Insurance_Id(person_id_) IS NULL THEN
      RETURN FALSE;
   END IF;
   IF Pers_API.Get_Date_Of_Birth(person_id_) IS NULL THEN
      RETURN FALSE;
   END IF;
   RETURN TRUE;
END Check_Payment_Possible___;


PROCEDURE Check_Emp_Card___ (
   lu_rec_ IN COMPANY_PERSON_TAB%ROWTYPE,
   objid_  IN VARCHAR2 )
IS
   temp_       INTEGER;
   CURSOR get_attr IS
      SELECT COUNT(*)
      FROM  company_person_tab cp
      WHERE company_id  = lu_rec_.company_id
      AND   emp_card    = lu_rec_.emp_card
      AND   (objid_ IS NULL OR objid_ != rowid);
BEGIN
   IF lu_rec_.emp_card IS NOT NULL THEN
      OPEN get_attr;
      FETCH get_attr INTO temp_;
      CLOSE get_attr;
      IF temp_ > 0 THEN
         Error_SYS.Record_General(lu_name_, 'EMPCARD: Employee card no must be unique.');
      END IF;
   END IF;
END Check_Emp_Card___;



-----------------------------------------------------------------------------
-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------
-----------------------------------------------------------------------------

FUNCTION Get_Objid__ (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   objid_        VARCHAR2(200);
   CURSOR get_rec IS
      SELECT rowid
      FROM   company_person_tab cp
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;
BEGIN
   --IF emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_) THEN
   OPEN get_rec;
   FETCH get_rec INTO objid_;
   CLOSE get_rec;
   --END IF;
   RETURN objid_;
END Get_Objid__;


PROCEDURE Notify_Payment_Possible__ (
   person_id_ IN VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Notify_Payment_Possible__');
   Null;
END Notify_Payment_Possible__;


PROCEDURE Cascade_Check_Remove__ (
   keys_ IN VARCHAR2 )
IS
   emp_no_     COMPANY_PERSON_TAB.emp_no%TYPE;
   company_id_ COMPANY_PERSON_TAB.company_id%TYPE;
   remrec_     COMPANY_PERSON_TAB%ROWTYPE;
   cnt_        NUMBER;
   lu_prompt_  VARCHAR2(100);
   CURSOR count_emp IS
      SELECT COUNT(*)
      FROM   company_person_tab
      WHERE  company_id = company_id_
      AND    emp_no  = emp_no_
      AND    emp_no_ NOT IN
       (SELECT emp_no
        FROM COMPANY_PERSON
        WHERE company_id = company_id_
        AND emp_no = emp_no_);
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Cascade_Check_Remove__');
   company_id_ := SUBSTR(keys_, 1, INSTR(keys_,'^',1,1)-1);
   emp_no_ := SUBSTR(keys_, INSTR(keys_,'^',1,1)+1, LENGTH(keys_) -1);
-- First check employee table.
-- Current user may not have access to this employee.
   OPEN count_emp;
   FETCH count_emp INTO cnt_;
   CLOSE count_emp;
   IF (cnt_ > 0) THEN
      lu_prompt_ := Language_SYS.Translate_Lu_Prompt_('CompanyPerson');
      Error_SYS.Record_Constraint('CompanyPerson', lu_prompt_, to_char(cnt_));
   END IF;
   remrec_ := Get_Object_By_Keys___(company_id_, emp_no_);
   Check_Delete___(remrec_);
END Cascade_Check_Remove__;


PROCEDURE Check_Master_Employment__ (
   company_id_ IN VARCHAR2,
   person_id_  IN VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Check_Master_Employment__');

   UPDATE company_person_tab
      SET    master_employment = '0',
          rowversion = rowversion + 1
      WHERE company_id = company_id_
      AND emp_no IN
            (SELECT employee_id FROM company_emp_tab
      WHERE company = company_id_
      AND person_id = person_id_);

END Check_Master_Employment__;
-----------------------------------------------------------------------------
-------------------- LU SPECIFIC PROTECTED METHODS --------------------------
-----------------------------------------------------------------------------

PROCEDURE Move_Employee_ (
   attr_ IN VARCHAR2 )
IS
   new_company_id_   VARCHAR2(20);
   old_company_id_   VARCHAR2(20);
   new_emp_no_       VARCHAR2(11);
   old_emp_no_       VARCHAR2(11);
   attrib_           VARCHAR2(2000);
   newrec_           COMPANY_PERSON_TAB%ROWTYPE;
   oldrec_           COMPANY_PERSON_TAB%ROWTYPE;
   objid_            VARCHAR2(2000);
   objversion_       VARCHAR2(2000);
   sign_             COMPANY_PERSON_TAB.sign%TYPE;
   emp_card_         COMPANY_PERSON_TAB.emp_card%TYPE;
   sign_flag_        VARCHAR2(1);
   card_number_      VARCHAR2(1);
   dummy_rec_        Dummy_Rec;
   free_rec_        Free_Rec;
   CURSOR get_old_emp IS
      SELECT sign, emp_card
      FROM  COMPANY_PERSON_TAB
      WHERE company_id = old_company_id_
      AND   emp_no = old_emp_no_;

   CURSOR get_new_emp IS
      SELECT rowid, ltrim(lpad(to_char(rowversion),2000))
      FROM  COMPANY_PERSON_TAB cp
      WHERE company_id = new_company_id_
      AND   emp_no = new_emp_no_;

BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Move_Employee_');
   new_company_id_ := Client_SYS.Get_Item_Value('NEW_COMPANY_ID', attr_);
   old_company_id_ := Client_SYS.Get_Item_Value('OLD_COMPANY_ID', attr_);
   new_emp_no_     := Client_SYS.Get_Item_Value('NEW_EMP_NO', attr_);
   old_emp_no_     := Client_SYS.Get_Item_Value('OLD_EMP_NO', attr_);
   sign_flag_ := Client_SYS.Get_Item_Value('PERSON_SIGN', attr_);
   card_number_ := Client_SYS.Get_Item_Value('PERSON_CARD_NUMBER', attr_);
   IF (sign_flag_ = '1' OR card_number_ = '1') THEN
      OPEN get_old_emp;
      FETCH get_old_emp INTO sign_, emp_card_;
      IF (get_old_emp%FOUND AND old_emp_no_ = User_Access_API.Is_User_Available_Emp_No( old_company_id_, old_emp_no_)) THEN
         OPEN get_new_emp;
         FETCH get_new_emp INTO objid_, objversion_;
         IF (get_new_emp%FOUND) THEN
            Client_SYS.Clear_Attr(attrib_);
            IF (sign_flag_ = '1') THEN
               Client_SYS.Add_To_Attr('SIGN', sign_ , attrib_);
            END IF;
            IF (card_number_ = '1') THEN
               Client_SYS.Add_To_Attr('EMP_CARD', emp_card_ , attrib_);
            END IF;
            oldrec_ := Lock_By_Id___(objid_, objversion_);
            newrec_ := oldrec_;
            Unpack_Check_Update___(attrib_, newrec_, objid_, dummy_rec_, free_rec_);
            Update___(objid_, oldrec_, newrec_, attrib_, objversion_, dummy_rec_, free_rec_);
         END IF;
         CLOSE get_new_emp;
      END IF;
   CLOSE get_old_emp;
   END IF;
END Move_Employee_;



-----------------------------------------------------------------------------
-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------
-----------------------------------------------------------------------------

FUNCTION Get_Sign (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON_TAB.sign%TYPE;
   CURSOR get_attr IS
      SELECT sign
      FROM COMPANY_PERSON_TAB
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;
BEGIN
   --IF emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_) THEN
      OPEN get_attr;
      FETCH get_attr INTO temp_;
      CLOSE get_attr;
   --END IF;
   RETURN temp_;
END Get_Sign;


FUNCTION Get_Emp_Remark (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON_TAB.emp_remark%TYPE;
   CURSOR get_attr IS
      SELECT emp_remark
      FROM COMPANY_PERSON_TAB
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;
BEGIN
   --IF emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_) THEN
      OPEN get_attr;
      FETCH get_attr INTO temp_;
      CLOSE get_attr;
   --END IF;
   RETURN temp_;
END Get_Emp_Remark;


FUNCTION Get_Emp_Public_Remark (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON_TAB.emp_public_remark%TYPE;
   CURSOR get_attr IS
      SELECT emp_public_remark
      FROM COMPANY_PERSON_TAB
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;
BEGIN
   --IF emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_) THEN
      OPEN get_attr;
      FETCH get_attr INTO temp_;
      CLOSE get_attr;
   --END IF;
   RETURN temp_;
END Get_Emp_Public_Remark;
FUNCTION Get_Emp_Card (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON_TAB.emp_card%TYPE;
   CURSOR get_attr IS
      SELECT emp_card
      FROM COMPANY_PERSON_TAB
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;
BEGIN
   --IF emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_) THEN
      OPEN get_attr;
      FETCH get_attr INTO temp_;
      CLOSE get_attr;
   --END IF;
   RETURN temp_;
END Get_Emp_Card;


FUNCTION Get_Fname (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.fname%TYPE;
   CURSOR get_attr IS
      SELECT fname
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Fname;


FUNCTION Get_Lname (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.lname%TYPE;
   CURSOR get_attr IS
      SELECT lname
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Lname;


FUNCTION Get_Name2 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.name2%TYPE;
   CURSOR get_attr IS
      SELECT name2
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Name2;


FUNCTION Get_Name3 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.name3%TYPE;
   CURSOR get_attr IS
      SELECT name3
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Name3;


FUNCTION Get_Name5 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.name5%TYPE;
   CURSOR get_attr IS
      SELECT name5
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Name5;


FUNCTION Get_Name6 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.name6%TYPE;
   CURSOR get_attr IS
      SELECT name6
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Name6;


FUNCTION Get_Name7 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.name7%TYPE;
   CURSOR get_attr IS
      SELECT name7
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Name7;


FUNCTION Get_Name8 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.name8%TYPE;
   CURSOR get_attr IS
      SELECT name8
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Name8;


FUNCTION Get_Internal_Display_Name (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.internal_display_name%TYPE;
   CURSOR get_attr IS
      SELECT internal_display_name
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Internal_Display_Name;


FUNCTION Get_External_Display_Name (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.external_display_name%TYPE;
   CURSOR get_attr IS
      SELECT external_display_name
      FROM COMPANY_PERSON
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_External_Display_Name;


FUNCTION Get_Person_Id (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ VARCHAR2(20);
   CURSOR get_attr IS
      SELECT ce.person_id
      FROM   company_emp_tab ce
      WHERE  company = company_id_
      AND    employee_id = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Person_Id;


FUNCTION Get_Free_Field1 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field1');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '1', date_);
END Get_Free_Field1;


FUNCTION Get_Free_Field2 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field2');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '2', date_);
END Get_Free_Field2;


FUNCTION Get_Free_Field3 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field3');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '3', date_);
END Get_Free_Field3;


FUNCTION Get_Free_Field4 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field4');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '4', date_);
END Get_Free_Field4;


FUNCTION Get_Free_Field5 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field5');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '5', date_);
END Get_Free_Field5;


FUNCTION Get_Free_Field6 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field6');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '6', date_);
END Get_Free_Field6;


FUNCTION Get_Free_Field7 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field7');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '7', date_);
END Get_Free_Field7;


FUNCTION Get_Free_Field8 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field8');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '8', date_);
END Get_Free_Field8;


FUNCTION Get_Free_Field9 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field9');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '9', date_);
END Get_Free_Field9;


FUNCTION Get_Free_Field10 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   date_       IN DATE DEFAULT sysdate ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Free_Field10');
   RETURN Company_Employee_Property_API.Get_Free_Field_Value(company_id_, emp_no_, '10', date_);
END Get_Free_Field10;


FUNCTION Get_Company_Office (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   RETURN Employee_Work_Location_API.Get_Current_Work_Location( company_id_, emp_no_);
END Get_Company_Office;
FUNCTION Get_Master_Employment (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON_TAB.master_employment%TYPE;
   CURSOR get_attr IS
      SELECT master_employment
      FROM COMPANY_PERSON_TAB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Master_Employment;


FUNCTION Get_Area_Code (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON_TAB.area_code%TYPE;
   CURSOR get_attr IS
      SELECT area_code
      FROM COMPANY_PERSON_TAB
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;
BEGIN
   --IF emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_) THEN
      OPEN get_attr;
      FETCH get_attr INTO temp_;
      CLOSE get_attr;
   --END IF;
   RETURN temp_;
END Get_Area_Code;


FUNCTION Get_Emp_Cat_Name (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.emp_cat_name%TYPE;
   CURSOR get_attr IS
      SELECT emp_cat_name
      FROM COMPANY_PERSON_PUB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Emp_Cat_Name;


FUNCTION Get_Name (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   RETURN Pers_API.Get_Name(Get_Person_Id(company_id_, emp_no_));
END Get_Name;


FUNCTION Get_Emp_No (
   company_id_ IN VARCHAR2,
   emp_card_   IN VARCHAR2 ) RETURN VARCHAR2
IS
   emp_no_       company_person_tab.emp_no%TYPE;
   CURSOR getrec_card IS
      SELECT emp_no
      FROM   company_person_tab
      WHERE  company_id = company_id_
      AND    emp_card = emp_card_;
    CURSOR getrec_emp IS
      SELECT emp_no
      FROM   company_person_tab
      WHERE  company_id = company_id_
      AND    emp_no = emp_card_;
BEGIN
      OPEN getrec_card;
      FETCH getrec_card INTO emp_no_;
      CLOSE getrec_card;
      IF emp_no_ IS NULL THEN
         OPEN getrec_emp;
         FETCH getrec_emp INTO emp_no_;
         CLOSE getrec_emp;
      END IF;
   RETURN emp_no_;
END Get_Emp_No;


FUNCTION Get_Age (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2,
   at_date_    IN DATE DEFAULT Sysdate ) RETURN NUMBER
IS
BEGIN
   RETURN Pers_API.Get_Age(Get_Person_Id(company_id_, emp_no_), at_date_);
END Get_Age;


FUNCTION Check_Wage_Payment_Possible (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN BOOLEAN
IS
   person_id_ pers_tab.person_id%TYPE;
   emp_cat_name_ COMPANY_PERSON.emp_cat_name%TYPE;
   CURSOR get_rec IS
      SELECT ce.person_id, cp.emp_cat_name
      FROM COMPANY_PERSON cp, company_emp_tab ce
      WHERE cp.company_id = company_id_
      AND   ce.company = company_id_
      AND   cp.emp_no = emp_no_
      AND   ce.employee_id = emp_no_;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Check_Wage_Payment_Possible');
   OPEN get_rec ;
   FETCH get_rec INTO person_id_, emp_cat_name_;
   CLOSE get_rec;
   RETURN Check_Payment_Possible___( emp_cat_name_, person_id_);
END Check_Wage_Payment_Possible;


PROCEDURE Get_Control_Type_Value_Desc (
   desc_       OUT VARCHAR2,
   company_id_ IN  VARCHAR2,
   emp_no_     IN  VARCHAR2 )
IS
BEGIN
   desc_ := substr(Get_Name(company_id_, emp_no_), 1, 35);
END Get_Control_Type_Value_Desc;


FUNCTION Get_Name_Lname_First (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   RETURN Pers_API.Get_Name(Get_Person_Id(company_id_, emp_no_), 'LAST');
END Get_Name_Lname_First;


FUNCTION Get_Date_Of_Birth (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN DATE
IS
BEGIN
   RETURN Pers_API.Get_Date_Of_Birth(Get_Person_Id(company_id_, emp_no_));
END Get_Date_Of_Birth;


FUNCTION Get_Emp_Address (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   RETURN Pers_Address_API.Get_Default_Address(Get_Person_Id(company_id_, emp_no_));
END Get_Emp_Address;


FUNCTION Get_Insurance_Id (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   RETURN Pers_API.Get_Insurance_Id(Get_Person_Id(company_id_, emp_no_));
END Get_Insurance_Id;


FUNCTION Get_Sex (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   RETURN Pers_API.Get_Sex(Get_Person_Id(company_id_, emp_no_));
END Get_Sex;


PROCEDURE New_Modify (
   attr_ IN VARCHAR2 )
IS
   objid_      VARCHAR2(200);
   objversion_ VARCHAR2(200);
   company_id_ COMPANY_PERSON_TAB.company_id%TYPE;
   emp_no_     COMPANY_PERSON_TAB.emp_no%TYPE;
   internal_display_name_ COMPANY_PERSON.internal_display_name%TYPE;
   external_display_name_ COMPANY_PERSON.external_display_name%TYPE;
   fname_      COMPANY_PERSON.fname%TYPE;
   lname_      COMPANY_PERSON.lname%TYPE;
   newattr_    VARCHAR2(32000);
   newrec_     COMPANY_PERSON_TAB%ROWTYPE;
   oldrec_     COMPANY_PERSON_TAB%ROWTYPE;
   ptr_        NUMBER;
   name_       VARCHAR2(30);
   value_      VARCHAR2(2000);
   dummy_rec_ Dummy_Rec;
   free_rec_  Free_Rec;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'New_Modify');
   company_id_ := Client_SYS.Get_Item_Value('COMPANY_ID', attr_);
   emp_no_ := Client_SYS.Get_Item_Value('EMP_NO', attr_);
   internal_display_name_ := Client_SYS.Get_Item_Value('INTERNAL_DISPLAY_NAME', attr_);
   external_display_name_ := Client_SYS.Get_Item_Value('EXTERNAL_DISPLAY_NAME', attr_);
   IF (internal_display_name_ IS NULL) OR (external_display_name_ IS NULL) THEN
       fname_ := Client_SYS.Get_Item_Value('FNAME', attr_);
       lname_ := Client_SYS.Get_Item_Value('LNAME', attr_);
       IF  (internal_display_name_ IS NULL)
       AND (fname_ IS NOT NULL OR fname_ IS NOT NULL) THEN
          internal_display_name_ := fname_ || ' ' || lname_;
       END IF;
       IF  (external_display_name_ IS NULL)
       AND (fname_ IS NOT NULL OR fname_ IS NOT NULL) THEN
          external_display_name_ := fname_ || ' ' || lname_;
       END IF;
   END IF;
   IF NOT Check_Exist___(company_id_, emp_no_) THEN
      Client_SYS.Add_To_Attr('COMPANY_ID',company_id_, newattr_);
      Prepare_Insert___(newattr_);
      WHILE (Client_SYS.Get_Next_From_Attr(attr_, ptr_, name_, value_)) LOOP
         IF name_ NOT IN ('INTERNAL_DISPLAY_NAME', 'EXTERNAL_DISPLAY_NAME') THEN
            Client_SYS.Add_To_Attr(name_, value_, newattr_);
         END IF;
      END LOOP;
      IF (internal_display_name_ IS NOT NULL) THEN
          Client_SYS.Add_To_Attr('INTERNAL_DISPLAY_NAME',internal_display_name_, newattr_);
      END IF;
      IF (external_display_name_ IS NOT NULL) THEN
          Client_SYS.Add_To_Attr('EXTERNAL_DISPLAY_NAME',external_display_name_, newattr_);
      END IF;
      Unpack_Check_Insert___(newattr_, newrec_, dummy_rec_, free_rec_);
      Insert___(objid_, objversion_, newrec_, newattr_, dummy_rec_, free_rec_);
   ELSE
       Client_SYS.Clear_Attr(newattr_);
       WHILE (Client_SYS.Get_Next_From_Attr(attr_, ptr_, name_, value_)) LOOP
          IF name_ NOT IN ('COMPANY_ID', 'EMP_NO', 'PERSON_ID','INTERNAL_DISPLAY_NAME','EXTERNAL_DISPLAY_NAME') THEN
             Client_SYS.Add_To_Attr(name_, value_, newattr_);
          END IF;
       END LOOP;
       IF (internal_display_name_ IS NOT NULL) THEN
          Client_SYS.Add_To_Attr('INTERNAL_DISPLAY_NAME',internal_display_name_, newattr_);
       END IF;
       IF (external_display_name_ IS NOT NULL) THEN
          Client_SYS.Add_To_Attr('EXTERNAL_DISPLAY_NAME',external_display_name_, newattr_);
       END IF;
       oldrec_ := Lock_By_Keys___(company_id_, emp_no_);
       newrec_ := oldrec_;
       Unpack_Check_Update___(newattr_, newrec_, objid_, dummy_rec_, free_rec_);
       Update___(objid_, oldrec_, newrec_, newattr_, objversion_,dummy_rec_, free_rec_,TRUE);
   END IF;
END New_Modify;


PROCEDURE Exist2 (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Exist2');
   IF (company_id_ = User_Access_API.Is_User_Company_Id(company_id_)) THEN
      IF (Check_Exist___(company_id_, emp_no_)) THEN
         RETURN;
      END IF;
   END IF;
   Error_SYS.Record_Not_Exist(lu_name_);
END Exist2;


PROCEDURE Transfer_Broadcast (
   attr_ IN VARCHAR2 )
IS
   CURSOR all_copy_pkgs IS
      SELECT name
      FROM  user_source
      WHERE type = 'PACKAGE'
      AND   text LIKE '%PROCEDURE%Copy_Existing_Employee%';
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Transfer_Broadcast');
   Company_Pers_Assign_API.Move_Employee_(attr_);
   Move_Employee_(attr_);
   FOR pkg IN all_copy_pkgs LOOP
      Transaction_SYS.Dynamic_Call(pkg.name || '.Copy_Existing_Employee', attr_);
   END LOOP;
END Transfer_Broadcast;


FUNCTION Get_Marital_Status (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   RETURN Pers_API.Get_Marital_Status(Get_Person_Id(company_id_, emp_no_));
END Get_Marital_Status;


FUNCTION In_Other_Company (
   person_id_  IN VARCHAR2,
   company_id_ IN VARCHAR2 ) RETURN VARCHAR2
IS
   company_id COMPANY_PERSON_TAB.company_id%TYPE;
   emp_no_ COMPANY_PERSON_TAB.emp_no%TYPE;
   count_  NUMBER;
   CURSOR get_other_emp IS
      SELECT company_id, emp_no
      FROM   company_emp_tab ce, company_person_tab
      WHERE  company = company_id
      AND    employee_id = emp_no
      AND    company_id <> company_id_
      AND    ce.person_id = person_id_;
BEGIN
   count_ := 0;
   OPEN get_other_emp;
   FETCH get_other_emp INTO company_id, emp_no_;
   while (get_other_emp%FOUND) LOOP
      IF (emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_)) THEN
         count_ := count_ + 1;
      END IF;
   FETCH get_other_emp INTO company_id, emp_no_;
   END LOOP;
   CLOSE get_other_emp;
   IF (count_ > 0) THEN
      RETURN '1';
   ELSE
      RETURN '0';
   END IF;
END In_Other_Company;


FUNCTION Pers_External_Check_Exist (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN NUMBER
IS
   dummy_    NUMBER;
   CURSOR check_data IS
      SELECT COUNT(*)
      FROM   company_person_tab
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;
BEGIN
   OPEN check_data;
   FETCH check_data INTO dummy_;
   CLOSE check_data;
   RETURN dummy_;
END Pers_External_Check_Exist;


FUNCTION Get_Person_Emp_No (
   company_id_ IN VARCHAR2,
   person_id_  IN VARCHAR2 ) RETURN VARCHAR2
IS
   return_emp_no_  VARCHAR2(11);
   CURSOR fetch_emp_no IS
      SELECT min(employee_id)
      FROM  company_emp_tab ce, company_person_tab cp
      WHERE ce.company = company_id_
      AND   ce.person_id = person_id_
      AND   ce.company = cp.company_id
      AND   ce.employee_id = cp.emp_no;
BEGIN
   OPEN fetch_emp_no;
   FETCH fetch_emp_no INTO return_emp_no_;
   CLOSE fetch_emp_no;
   RETURN return_emp_no_;
END Get_Person_Emp_No;


FUNCTION Check_Person_Internal (
   person_id_ IN VARCHAR2 ) RETURN VARCHAR2
IS
  dummy_ NUMBER;
   CURSOR emp_exist IS
   SELECT COUNT(employee_id)
   FROM company_emp_tab
   WHERE person_id = person_id_;

BEGIN
   OPEN emp_exist;
   FETCH emp_exist INTO dummy_;
   CLOSE emp_exist;
   IF (dummy_ > 0) THEN
      RETURN '1';
   END IF;
   RETURN '0';
END Check_Person_Internal;


FUNCTION Company_Pers_Check_Exist (
   company_id_ IN VARCHAR2,
   person_id_  IN VARCHAR2 ) RETURN BOOLEAN
IS
   CURSOR get_defa(comp_id_ VARCHAR2, person_id_ VARCHAR2) IS
      SELECT 1
      FROM  company_person
      WHERE company_id = comp_id_
      AND   person_id = person_id_;
   temp_  get_defa%ROWTYPE;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Company_Pers_Check_Exist');
   OPEN get_defa(company_id_, person_id_);
   FETCH get_defa INTO temp_;
   IF (get_defa%FOUND) THEN
      CLOSE get_defa;
      RETURN TRUE;
   ELSE
      CLOSE get_defa;
      RETURN FALSE;
   END IF;
END Company_Pers_Check_Exist;


PROCEDURE Get_Blocked_Free_Fields (
   blocked_free_fields_ IN OUT VARCHAR2,
   company_             IN     VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Blocked_Free_Fields');

   Company_Employee_Property_API.Get_Blocked_Free_Fields(blocked_free_fields_, company_);
END Get_Blocked_Free_Fields;


PROCEDURE Get_Company_Id_From_Emp (
   company_id_ IN OUT VARCHAR2,
   emp_no_     IN     VARCHAR2 )
IS
   CURSOR check_emp_count IS
   SELECT COUNT(emp_no)
   FROM   company_person
   WHERE  emp_no = emp_no_;

   CURSOR getrec_no_company_card IS
   SELECT company_id
   FROM   company_person_tab
   WHERE  emp_no = emp_no_;

   count_   NUMBER;

BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Company_Id_From_Emp');

   OPEN check_emp_count;
   FETCH check_emp_count INTO count_;
   CLOSE check_emp_count;

   IF (count_>1) THEN
      Error_SYS.Record_General(lu_name_, 'NOTUNIQUEEMPLOYEE: Employee number must be unique.');
   ELSE
      OPEN getrec_no_company_card;
      FETCH getrec_no_company_card INTO company_id_;
      CLOSE getrec_no_company_card;
   END IF;
END Get_Company_Id_From_Emp;

PROCEDURE Get_Employee_Id_From_Emp_Card (
   company_id_ IN OUT VARCHAR2,
   emp_no_     IN OUT VARCHAR2,
   emp_card_   IN     VARCHAR2 )
IS
   CURSOR check_emp_count IS
   SELECT COUNT(emp_no)
   FROM   company_person
   WHERE  emp_card = emp_card_;

   CURSOR getrec_no_company_card IS
   SELECT company_id,emp_no
   FROM   company_person_tab
   WHERE  emp_card = emp_card_;

   count_   NUMBER;

BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Employee_Id_From_Emp_Card');

   OPEN check_emp_count;
   FETCH check_emp_count INTO count_;
   CLOSE check_emp_count;

   IF (count_>1) THEN
      Error_SYS.Record_General(lu_name_, 'NOTUNIQUE: Card must be unique.');
   ELSE
      OPEN getrec_no_company_card;
      FETCH getrec_no_company_card INTO company_id_,emp_no_;
      CLOSE getrec_no_company_card;
   END IF;
END Get_Employee_Id_From_Emp_Card;


FUNCTION Is_Free_Field_Used (
   free_field_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Is_Free_Field_Used');
   RETURN Company_Employee_Property_API.Is_Free_Field_Used(free_field_);
END Is_Free_Field_Used;


PROCEDURE Get_Property_Code (
   field_desc_   IN OUT VARCHAR2,
   propert_code_ IN OUT VARCHAR2,
   free_field_   IN     VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Property_Code');

   Company_Employee_Property_API.Get_Property_Code(field_desc_, propert_code_, free_field_);
END Get_Property_Code;

FUNCTION Get_Emp_Cat_Id (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN NUMBER
IS
   temp_ COMPANY_PERSON_TAB.emp_cat_id%TYPE;
   CURSOR get_attr IS
      SELECT emp_cat_id
      FROM COMPANY_PERSON_TAB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Emp_Cat_Id;


FUNCTION Get_Time_Clock_User (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON_TAB.time_clock_user%TYPE;
   CURSOR get_attr IS
      SELECT time_clock_user
      FROM COMPANY_PERSON_TAB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Time_Clock_User;

PROCEDURE Create_Employee (
   attr_ IN VARCHAR2 )
IS
   emp_no_           VARCHAR2(11);
   person_           VARCHAR2(20);
   company_id_       VARCHAR2(20);
   new_attr_         VARCHAR2(2000);
   objid_            VARCHAR2(200);
   objversion_       VARCHAR2(2000);
   newrec_           COMPANY_PERSON_TAB%ROWTYPE;
   dummy_rec_        DUMMY_REC;
   free_rec_         FREE_REC;
   int_display_name_ VARCHAR2(100);
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Create_Employee');
   emp_no_ := Client_SYS.Get_Item_Value('EMPLOYEE_ID', attr_);
   company_id_ := Client_SYS.Get_Item_Value('COMPANY', attr_);
   IF (Check_Exist___(company_id_,emp_no_) = FALSE) THEN
      person_ := Client_SYS.Get_Item_Value('PERSON_ID', attr_);
      int_display_name_ := Person_Info_API.Get_Name(person_);
      Client_SYS.Clear_Attr(new_attr_);
      Client_SYS.Add_To_Attr('COMPANY_ID', company_id_, new_attr_);
      Prepare_Insert___(new_attr_);
      Client_SYS.Add_To_Attr('COMPANY_ID', company_id_, new_attr_);
      Client_SYS.Add_To_Attr('EMP_NO', emp_no_, new_attr_);
      Client_SYS.Add_To_Attr('PERSON_ID', person_, new_attr_);
      Client_SYS.Add_To_Attr('INTERNAL_DISPLAY_NAME', int_display_name_, new_attr_);
      Unpack_Check_Insert___(new_attr_, newrec_, dummy_rec_, free_rec_);
      Client_SYS.Add_To_Attr('SOURCE_MODULE', 'ENTERP', new_attr_);
      Insert___(objid_, objversion_, newrec_, new_attr_, dummy_rec_, free_rec_);
    END IF;
END Create_Employee;


FUNCTION Check_Master (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ VARCHAR2(20);
   dummy_ NUMBER;
   CURSOR check_mast IS
      SELECT 1
      FROM   company_person
      WHERE  company_id = company_id_
      AND    person_id = temp_
      AND    master_employment = '1';
BEGIN
   temp_ := Get_Person_Id(company_id_, emp_no_);
   OPEN check_mast;
   FETCH check_mast INTO dummy_;
   IF (check_mast%FOUND) THEN
      CLOSE check_mast;
      RETURN 'TRUE';
   ELSE
      CLOSE check_mast;
      RETURN 'FALSE';
   END IF;
END Check_Master;


FUNCTION Get_Master_Emp_No (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ VARCHAR2(20);
   dummy_ VARCHAR2(20);
   CURSOR get_mast IS
      SELECT emp_no
      FROM   company_person
      WHERE  company_id = company_id_
      AND    person_id = temp_
      AND    master_employment = '1';
BEGIN
   temp_ := Get_Person_Id(company_id_, emp_no_);
   OPEN get_mast;
   FETCH get_mast INTO dummy_;
   IF (get_mast%FOUND) THEN
      CLOSE get_mast;
      RETURN dummy_;
   ELSE
      CLOSE get_mast;
      RETURN NULL;
   END IF;
END Get_Master_Emp_No;


PROCEDURE Terminate_Employment (
   attr_ IN VARCHAR2 )
IS
CURSOR all_copy_pkgs IS
      SELECT method
      FROM register_hr_wizard
      where wizard = 'TERMINATE_EMPLOYMENT';

   package_name_     VARCHAR2(2000);
   method_name_      VARCHAR2(2000);
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Terminate_Employment');
   FOR pkg IN all_copy_pkgs LOOP
      package_name_ := SUBSTR( pkg.method, 1, INSTR( pkg.method, '.' ) - 1 );
      method_name_ :=  SUBSTR( pkg.method, INSTR( pkg.method, '.' ) + 1 );
      IF (Transaction_SYS.Method_Is_Installed(package_name_, method_name_)) THEN
         Transaction_SYS.Dynamic_Call(pkg.method, attr_);
      END IF;
   END LOOP;
   Remove_Employee(attr_);
   Client_SYS.Clear_Info;
END Terminate_Employment;


PROCEDURE Remove_Employee (
   attr_ IN VARCHAR2 )
IS
   ptr_   NUMBER;
   name_  VARCHAR2(30);
   value_ VARCHAR2(2000);
   temp_attr_ VARCHAR2(2000);
   TYPE rec_type_ IS RECORD
   (company_id         COMPANY_PERSON_TAB.COMPANY_ID%TYPE,
    emp_no             COMPANY_PERSON_TAB.EMP_NO%TYPE,
    valid_to           COMPANY_PERS_ASSIGN_TAB.VALID_TO%TYPE,
    leaving_cause_type LEAVING_CAUSE_TAB.LEAVING_CAUSE_TYPE%TYPE,
    leaving_notification_date EMP_EMPLOYED_TIME_TAB.LEAVING_NOTIFICATION_DATE%TYPE,
    employee_status    EMPLOYEE_STATUS_TAB.EMPLOYEE_STATUS%TYPE,
    employment_end_reason EMP_EMPLOYED_TIME_TAB.EMPLOYMENT_END_REASON%TYPE);
   temp_rec_  rec_type_;

   CURSOR get_emp_date_ IS
    SELECT date_of_employment FROM
    EMP_EMPLOYED_TIME_TAB WHERE
    COMPANY_ID = temp_rec_.company_id
    AND EMP_NO = temp_rec_.emp_no
    AND DATE_OF_EMPLOYMENT <= temp_rec_.valid_to
    AND DATE_OF_LEAVING    >= temp_rec_.valid_to;
   emp_date_rec_  get_emp_date_%ROWTYPE;

   CURSOR get_emp_salary_ IS
    SELECT valid_to FROM
    EMPLOYEE_SALARY_TAB WHERE
    COMPANY_ID = temp_rec_.company_id
    AND EMP_NO = temp_rec_.emp_no
    AND VALID_FROM <= temp_rec_.valid_to
    AND VALID_TO    >= temp_rec_.valid_to;
   emp_salary_rec_  get_emp_salary_%ROWTYPE;

   CURSOR get_emp_reduction_ IS
    SELECT seq_no FROM
    EMPLOYMENT_REDUCTION_TAB WHERE
    COMPANY_ID = temp_rec_.company_id
    AND EMP_NO = temp_rec_.emp_no
    AND REDUCTION_START_DATE <= temp_rec_.valid_to
    AND REDUCTION_END_DATE    >= temp_rec_.valid_to;
   emp_reduction_rec_  get_emp_reduction_%ROWTYPE;

   CURSOR get_pos_date_ IS
    SELECT pos_code,valid_from FROM
    company_pers_assign_tab WHERE
    COMPANY_ID = temp_rec_.company_id
    AND EMP_NO = temp_rec_.emp_no
    AND VALID_TO  > temp_rec_.valid_to;

   CURSOR get_job_date_ IS
    SELECT job_id,valid_from FROM
    emp_job_assign_tab WHERE
    COMPANY_ID = temp_rec_.company_id
    AND EMP_NO = temp_rec_.emp_no
    AND VALID_TO  > temp_rec_.valid_to;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Remove_Employee');
   ptr_ := NULL;
   WHILE (Client_SYS.Get_Next_From_Attr(attr_, ptr_, name_, value_)) LOOP
      IF (name_ = 'COMPANY_ID') THEN
         temp_rec_.company_id := value_;
      ELSIF (name_ = 'EMP_NO') THEN
         temp_rec_.emp_no := value_;
         Company_Person_API.Exist(temp_rec_.company_id,temp_rec_.emp_no);
      ELSIF (name_ = 'VALID_TO') THEN
         temp_rec_.valid_to := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'LEAVING_CAUSE_TYPE') THEN
         temp_rec_.leaving_cause_type := value_;
         Leaving_Cause_API.Exist(value_);
      ELSIF (name_ = 'LEAVING_NOTIFICATION_DATE') THEN
         temp_rec_.leaving_notification_date := Client_SYS.Attr_Value_To_Date(value_);
      ELSIF (name_ = 'EMPLOYEE_STATUS') THEN
         temp_rec_.employee_status := value_;
      ELSIF (name_ = 'EMPLOYMENT_END_REASON') THEN
         temp_rec_.employment_end_reason := value_;
      END IF;
   END LOOP;
   OPEN get_emp_date_;
   FETCH get_emp_date_ INTO emp_date_rec_;
   IF get_emp_date_%FOUND THEN
      Client_SYS.Add_To_Attr('COMPANY_ID', temp_rec_.company_id, temp_attr_);
      Client_SYS.Add_To_Attr('EMP_NO', temp_rec_.emp_no, temp_attr_);
      Client_SYS.Add_To_Attr('DATE_OF_EMPLOYMENT', emp_date_rec_.date_of_employment, temp_attr_);
      Client_SYS.Add_To_Attr('DATE_OF_LEAVING', temp_rec_.valid_to, temp_attr_);
      Client_SYS.Add_To_Attr('LEAVING_CAUSE_TYPE', temp_rec_.leaving_cause_type, temp_attr_);
      Client_SYS.Add_To_Attr('LEAVING_NOTIFICATION_DATE', temp_rec_.leaving_notification_date, temp_attr_);
      Client_SYS.Add_To_Attr('REMOVE_EMPLOYEE', 'TRUE', temp_attr_);
      Client_SYS.Add_To_Attr('EMPLOYMENT_END_REASON', temp_rec_.employment_end_reason, temp_attr_);
      EMP_EMPLOYED_TIME_API.New_Modify(temp_attr_);
      Client_SYS.Clear_Attr(temp_attr_);
   END IF;
   CLOSE get_emp_date_;

   OPEN get_emp_salary_;
   FETCH get_emp_salary_ INTO emp_salary_rec_;
   IF get_emp_salary_%FOUND THEN
      Client_SYS.Add_To_Attr('COMPANY_ID', temp_rec_.company_id, temp_attr_);
      Client_SYS.Add_To_Attr('EMP_NO', temp_rec_.emp_no, temp_attr_);
      Client_SYS.Add_To_Attr('VALID_TO', emp_salary_rec_.valid_to, temp_attr_);
      Client_SYS.Add_To_Attr('NEW_VALID_TO', temp_rec_.valid_to, temp_attr_);
      Client_SYS.Add_To_Attr('REMOVE_EMPLOYEE', 'TRUE', temp_attr_);
      EMPLOYEE_SALARY_API.New_Modify(temp_attr_);
      Client_SYS.Clear_Attr(temp_attr_);
   END IF;
   CLOSE get_emp_salary_;

   OPEN get_emp_reduction_;
   FETCH get_emp_reduction_ INTO emp_reduction_rec_;
   IF get_emp_reduction_%FOUND THEN
      Client_SYS.Add_To_Attr('COMPANY_ID', temp_rec_.company_id, temp_attr_);
      Client_SYS.Add_To_Attr('EMP_NO', temp_rec_.emp_no, temp_attr_);
      Client_SYS.Add_To_Attr('SEQ_NO', emp_reduction_rec_.seq_no, temp_attr_);
      Client_SYS.Add_To_Attr('REDUCTION_END_DATE', temp_rec_.valid_to, temp_attr_);
      EMPLOYMENT_REDUCTION_API.End_Reduction__(temp_attr_);
      Client_SYS.Clear_Attr(temp_attr_);
   END IF;
   CLOSE get_emp_reduction_;

   FOR pos_date_rec_ IN get_pos_date_ LOOP
      IF pos_date_rec_.valid_from <= temp_rec_.valid_to THEN
       Client_SYS.Add_To_Attr('COMPANY_ID', temp_rec_.company_id, temp_attr_);
       Client_SYS.Add_To_Attr('EMP_NO', temp_rec_.emp_no, temp_attr_);
       Client_SYS.Add_To_Attr('POS_CODE', pos_date_rec_.pos_code, temp_attr_);
       Client_SYS.Add_To_Attr('VALID_FROM',pos_date_rec_.valid_from, temp_attr_);
       Client_SYS.Add_To_Attr('VALID_TO', temp_rec_.valid_to, temp_attr_);
       COMPANY_PERS_ASSIGN_API.New_Modify(temp_attr_);
       Client_SYS.Clear_Attr(temp_attr_);
      ELSE
       COMPANY_PERS_ASSIGN_API.Remove_Pos(temp_rec_.company_id,temp_rec_.emp_no,pos_date_rec_.valid_from,pos_date_rec_.pos_code);
      END IF;
   END LOOP;
   FOR job_date_rec_ IN get_job_date_ LOOP
      IF job_date_rec_.valid_from <= temp_rec_.valid_to THEN
       Client_SYS.Add_To_Attr('COMPANY_ID', temp_rec_.company_id, temp_attr_);
       Client_SYS.Add_To_Attr('EMP_NO', temp_rec_.emp_no, temp_attr_);
       Client_SYS.Add_To_Attr('JOB_ID', job_date_rec_.job_id, temp_attr_);
       Client_SYS.Add_To_Attr('VALID_FROM',job_date_rec_.valid_from, temp_attr_);
       Client_SYS.Add_To_Attr('VALID_TO', temp_rec_.valid_to, temp_attr_);
       EMP_JOB_ASSIGN_API.New_Modify(temp_attr_);
       Client_SYS.Clear_Attr(temp_attr_);
      ELSE
       EMP_JOB_ASSIGN_API.Remove_Job(temp_rec_.company_id,temp_rec_.emp_no,job_date_rec_.job_id,job_date_rec_.valid_from);
      END IF;
   END LOOP;
   COMPANY_EMP_API.Update_Expire_Date(temp_rec_.company_id, temp_rec_.emp_no, trunc(temp_rec_.valid_to));
END Remove_Employee;


FUNCTION Get_Field_Description (
   field_no_ IN NUMBER ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Field_Description');
   RETURN Company_Employee_Property_API.Get_Field_Description(field_no_);
END Get_Field_Description;


FUNCTION Check_Master_Employee (
   company_id_ IN VARCHAR2,
   person_id_  IN VARCHAR2 ) RETURN VARCHAR2
IS
   CURSOR get_emp IS
      SELECT COUNT(emp_no)
      FROM company_person
      WHERE company_id = company_id_
      AND   person_id = person_id_;
   CURSOR get_mast IS
      SELECT 1
      FROM   company_person
      WHERE  company_id = company_id_
      AND    person_id  = person_id_
      AND    master_employment='1';
   emp_no_dummy_   NUMBER;
   dummy_value_    NUMBER;
BEGIN
   OPEN get_emp;
   FETCH get_emp INTO  emp_no_dummy_;
   CLOSE get_emp;
   IF (emp_no_dummy_ >= 1) THEN
      OPEN get_mast;
      FETCH get_mast INTO dummy_value_;
      IF (get_mast%FOUND) THEN
         CLOSE get_mast;
         RETURN 'TRUE';
      ELSE
         CLOSE get_mast;
         RETURN 'FALSE';
      END IF;
   END IF;
   RETURN 'FALSE';
END Check_Master_Employee;


FUNCTION Get_Person (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   CURSOR get_person IS
      SELECT person_id
      FROM company_person
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
   temp_ VARCHAR2(20);
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Person');
   OPEN get_person;
   FETCH get_person INTO temp_;
   CLOSE get_person;
   RETURN temp_;
END Get_Person;


FUNCTION Check_No_Employee (
   company_id_ IN VARCHAR2,
   person_id_  IN VARCHAR2 ) RETURN VARCHAR2
IS
   CURSOR check_emp IS
      SELECT COUNT(emp_no)
      FROM company_person
      WHERE company_id = company_id_
      AND   person_id = person_id_
      AND    master_employment='1';
   emp_count_ NUMBER;
BEGIN
   OPEN check_emp;
   FETCH check_emp INTO  emp_count_;
   IF (emp_count_ = 0) THEN
      RETURN 'TRUE';
   ELSE
      RETURN 'FALSE';
   END IF;
   CLOSE check_emp;
END Check_No_Employee;


FUNCTION Check_First_Employee (
   company_id_ IN VARCHAR2,
   person_id_  IN VARCHAR2 ) RETURN VARCHAR2
IS
   CURSOR first_emp IS
      SELECT COUNT(emp_no)
      FROM company_person
      WHERE company_id = company_id_
      AND   person_id = person_id_;
   emp_count_ NUMBER;
BEGIN
   OPEN first_emp;
   FETCH first_emp INTO  emp_count_;
   IF (emp_count_ = 0) THEN
      RETURN 'TRUE';
   ELSE
      RETURN 'FALSE';
   END IF;
   CLOSE first_emp;
END Check_First_Employee;


FUNCTION Get_Emp_Status_Seq_No (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN NUMBER
IS
BEGIN
   RETURN Employee_Status_Details_API.Get_Emp_Status_Seq(company_id_,emp_no_,SYSDATE);
END Get_Emp_Status_Seq_No;


FUNCTION Get_Employee_Status (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   RETURN Employee_Status_Details_API.Get_Status(company_id_,emp_no_,SYSDATE);
END Get_Employee_Status;


FUNCTION Get_Work_Phone (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Work_Phone');
   RETURN Pers_Comms_Work_Api.Get_Work_Phone(company_id_, emp_no_);
END Get_Work_Phone;

FUNCTION Get_Work_Mobile (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Work_Mobile');
   RETURN Pers_Comms_Work_Api.Get_Work_Mobile(company_id_, emp_no_);
END Get_Work_Mobile;

FUNCTION Get_Work_Email (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Work_Email');
   RETURN Pers_Comms_Work_Api.Get_Work_Email(company_id_, emp_no_);
END Get_Work_Email;

FUNCTION Get_Work_Fax (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Work_Fax');
   RETURN Pers_Comms_Work_Api.Get_Work_Fax(company_id_, emp_no_);
END Get_Work_Fax;

FUNCTION Get_Work_Address (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Work_Address');
   RETURN Pers_Comms_Work_Api.Get_Work_Address(company_id_, emp_no_);
END Get_Work_Address;

FUNCTION Get_Objid_Comp_Per (
   company_id_   IN VARCHAR2,
   emp_no_       IN VARCHAR2,
   account_date_ IN DATE ) RETURN VARCHAR2
IS
   objid_ COMPANY_PERSON.objid%TYPE;
   CURSOR get_objid IS
      SELECT rowid
      FROM  COMPANY_PERSON_TAB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_
      AND   Company_Pers_Assign_API.Get_Objid_For_Primary(company_id_, emp_no_, account_date_) IS NOT NULL;
BEGIN
   OPEN get_objid;
   FETCH get_objid INTO objid_;
   CLOSE get_objid;
   RETURN objid_;
END Get_Objid_Comp_Per;

FUNCTION Check_Emp_No_Exist (
   company_id_ IN VARCHAR2,
   emp_no_ IN VARCHAR2 ) RETURN VARCHAR2
IS
   dummy_        NUMBER;
   CURSOR exist_control IS
      SELECT 1
      FROM  COMPANY_PERSON_TAB
      WHERE  company_id = company_id_
      AND    emp_no = emp_no_;
BEGIN
   OPEN exist_control;
      FETCH exist_control INTO dummy_;
      IF (exist_control%FOUND) THEN
         CLOSE exist_control;
         RETURN 'TRUE';
      END IF;
      CLOSE exist_control;
   RETURN 'FALSE';
END Check_Emp_No_Exist;

FUNCTION Is_Emp_Available_To_Emp (
   company_id_   IN VARCHAR2,
   emp_no_       IN VARCHAR2,
   counselor_no_ IN VARCHAR2,
   plan_date_    IN DATE DEFAULT SYSDATE ) RETURN VARCHAR2
IS
   temp_pos_code_       user_access_tab.pos_code%TYPE;
   available_emp_no_    company_pers_assign_tab.emp_no%TYPE;
   counselor_person_id_ company_emp_tab.person_id%TYPE;

  CURSOR check_emp_no IS
      SELECT A.emp_no
      FROM   company_authorization_temp_tab t,
           company_pers_assign_tab        a
      WHERE  a.company_id     = company_id_
      AND    a.emp_no         = emp_no_
      AND    a.valid_from     <= plan_date_
      AND    a.valid_to       >= plan_date_
      AND    t.company_id     = a.company_id
      AND    t.pos_code       = temp_pos_code_
      AND    t.avail_pos_code = a.pos_code;
BEGIN
   counselor_person_id_ := Get_Person_Id(company_id_,counselor_no_);
   IF(Pers_API.Is_Company_Admin_(counselor_person_id_) = 1) THEN
      RETURN emp_no_;
   ELSE
      FOR RECO_ IN (SELECT pos_code
         FROM company_pers_assign_tab
         WHERE company_id=company_id_
         AND emp_no =counselor_no_
         AND TRUNC(plan_date_) BETWEEN valid_from AND
         valid_to)LOOP
         temp_pos_code_ := RECO_.pos_code;
         OPEN check_emp_no;
         FETCH check_emp_no INTO available_emp_no_;
         IF (check_emp_no%FOUND) THEN
            CLOSE check_emp_no;
            RETURN available_emp_no_;
         END IF;
         CLOSE check_emp_no;
       END LOOP;
       RETURN NULL;
    END IF;
END Is_Emp_Available_To_Emp;

FUNCTION Get (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN Public_Rec
IS
   temp_ Public_Rec;
   CURSOR get_attr IS
      SELECT sign, emp_card, emp_remark, area_code, emp_cat_id, company_office, master_employment, emp_public_remark, time_clock_user
      FROM COMPANY_PERSON_TAB
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   --IF emp_no_ = User_Access_API.Is_User_Available_Emp_No(company_id_, emp_no_) THEN
      OPEN get_attr;
      FETCH get_attr INTO temp_;
      CLOSE get_attr;
   --END IF;
   RETURN temp_;
END Get;


FUNCTION Get_Person_Employees (
   company_id_ IN VARCHAR2,
   person_id_     IN VARCHAR2) RETURN VARCHAR2
IS
   tmp_          VARCHAR2(1000);
   CURSOR get_person_emp_no IS
      SELECT employee_id
      FROM   company_emp_tab
      WHERE  company  = company_id_
      AND    person_id    = person_id_
      AND    Company_Person_API.Get_Employee_Status(company_id_, employee_id) = Employee_Status_API.Get_Active_Status(company_id_)
      AND   (expire_date > sysdate OR expire_date IS NULL);
BEGIN
    FOR rec_ IN get_person_emp_no LOOP
      IF (tmp_ IS NULL) THEN
         tmp_ := rec_.employee_id;
      ELSE
         tmp_ := substr(tmp_ || ', ' || rec_.employee_id, 1, 1000);
      END IF;
   END LOOP;
   RETURN tmp_;
END Get_Person_Employees;

FUNCTION Get_Internal_Id (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   CURSOR get_person IS
      SELECT internal_id
      FROM company_person_tab
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
   temp_ VARCHAR2(20);
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_PERSON_API', 'Get_Internal_Id');
   OPEN get_person;
   FETCH get_person INTO temp_;
   CLOSE get_person;
   RETURN temp_;
END Get_Internal_Id;

--ybx 20140407 add start
FUNCTION Get_Begin_Work_Time (
   company_id_ IN VARCHAR2,
   emp_no_     IN VARCHAR2 ) RETURN VARCHAR2
IS
   temp_ COMPANY_PERSON.begin_work_time%TYPE;
   CURSOR get_attr IS
      SELECT begin_work_time
      FROM company_person_tab
      WHERE company_id = company_id_
      AND   emp_no = emp_no_;
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Begin_Work_Time;
--ybx 20140407 add end


--LiuJiangwu 2014/12/12 add begin
PROCEDURE Enumerate_PersonDegree__ (
   lov_value_ OUT VARCHAR2 )
IS

BEGIN
   lov_value_ := '高级管理人员^中级管理人员^其他员工^劳务派遣员工^外包人员';
   lov_value_ := Domain_SYS.Enumerate_(lov_value_);

END Enumerate_PersonDegree__;

--LiuJiangwu 2014/12/12 add end

--9:36 10.04.2015 Grissom add start
FUNCTION Get_Sub_Company_Id(
   emp_no_ IN VARCHAR2) RETURN VARCHAR2
IS
   temp_ VARCHAR2(1000);
   CURSOR get_attr IS
      SELECT SUB_COMPANY_ID
        FROM COMPANY_PERSON_TAB
       WHERE EMP_NO = emp_no_
         AND COMPANY_ID = '10';
BEGIN
   OPEN get_attr;
   FETCH get_attr INTO temp_;
   CLOSE get_attr;
   RETURN temp_;
END Get_Sub_Company_Id;
--9:36 10.04.2015 Grissom add end
-----------------------------------------------------------------------------
-------------------- FOUNDATION1 METHODS ------------------------------------
-----------------------------------------------------------------------------
-- Init
--   Dummy procedure that can be called at database startup to ensure that
--   this package is loaded into memory for performance reasons only.
-----------------------------------------------------------------------------

PROCEDURE Init
IS
BEGIN
   NULL;
END Init;


END COMPANY_PERSON_API;
/

prompt
prompt Creating package body COMPANY_SITE_API
prompt ======================================
prompt
CREATE OR REPLACE PACKAGE BODY SDICAPP.COMPANY_SITE_API IS

-----------------------------------------------------------------------------
-------------------- GLOBAL LU CONSTANTS ------------------------------------
-----------------------------------------------------------------------------

inst_Accrul_   CONSTANT BOOLEAN := Dictionary_SYS.Component_Is_Installed('ACCRUL');
inst_Site_     CONSTANT BOOLEAN := Dictionary_SYS.Logical_Unit_Is_Installed('Site');

-----------------------------------------------------------------------------
-------------------- MICRO CACHE --------------------------------------------
-----------------------------------------------------------------------------

micro_cache_value_       Public_Rec;
micro_cache_contract_    VARCHAR2(20);
micro_cache_time_        NUMBER := 0;


PROCEDURE Invalidate_Cache___
IS
   null_value_ Public_Rec;
BEGIN
   micro_cache_contract_    := NULL;
   micro_cache_value_       := null_value_;
END Invalidate_Cache___;


PROCEDURE Update_Cache___ (
   contract_ IN VARCHAR2 )
IS
   null_value_ Public_Rec;
   time_       NUMBER;
   expired_    BOOLEAN;

   CURSOR get_attr IS
      SELECT company, description, country
      FROM COMPANY_SITE_TAB
      WHERE contract = contract_;
BEGIN
   time_    := Database_SYS.Get_Time_Offset;
   expired_ := ((time_-micro_cache_time_) > 10);
   IF NOT expired_ AND (micro_cache_contract_ = contract_) THEN
      NULL;
   ELSE
      OPEN get_attr;
      FETCH get_attr INTO micro_cache_value_;
      IF get_attr%NOTFOUND THEN
         micro_cache_value_ := null_value_;
      END IF;
      CLOSE get_attr;
      micro_cache_contract_   := contract_;
      micro_cache_time_       := time_;
   END IF;
END Update_Cache___;


-----------------------------------------------------------------------------
-------------------- LU SPECIFIC IMPLEMENTATION METHOD DECLARATIONS ---------
-----------------------------------------------------------------------------


-----------------------------------------------------------------------------
-------------------- IMPLEMENTATION BASE METHODS ----------------------------
-----------------------------------------------------------------------------
-- Lock_By_Id___
--    Client-support to lock a specific instance of the logical unit.
--
-- Lock_By_Keys___
--    Server support to lock a specific instance of the logical unit.
--
-- Get_Object_By_Id___
--    Get LU-record from the database with a specified object identity.
--
-- Get_Object_By_Keys___
--    Get LU-record from the database with specified key columns.
--
-- Check_Exist___
--    Check if a specific LU-instance already exist in the database.
--
-- Get_Id_Version_By_Keys___
--    Get the current OBJID and OBJVERSION for a specific LU-instance.
-----------------------------------------------------------------------------

FUNCTION Lock_By_Id___ (
   objid_      IN  VARCHAR2,
   objversion_ IN  VARCHAR2 ) RETURN COMPANY_SITE_TAB%ROWTYPE
IS
   row_changed EXCEPTION;
   row_deleted EXCEPTION;
   row_locked  EXCEPTION;
   PRAGMA      exception_init(row_locked, -0054);
   rec_        COMPANY_SITE_TAB%ROWTYPE;
   dummy_      NUMBER;
   CURSOR lock_control IS
      SELECT *
      FROM   COMPANY_SITE_TAB
      WHERE  rowid = objid_
      AND    to_char(rowversion,'YYYYMMDDHH24MISS') = objversion_
      FOR UPDATE NOWAIT;
   CURSOR exist_control IS
      SELECT 1
      FROM   COMPANY_SITE_TAB
      WHERE  rowid = objid_;
BEGIN
   OPEN lock_control;
   FETCH lock_control INTO rec_;
   IF (lock_control%FOUND) THEN
      CLOSE lock_control;
      RETURN rec_;
   END IF;
   CLOSE lock_control;
   OPEN exist_control;
   FETCH exist_control INTO dummy_;
   IF (exist_control%FOUND) THEN
      CLOSE exist_control;
      RAISE row_changed;
   ELSE
      CLOSE exist_control;
      RAISE row_deleted;
   END IF;
EXCEPTION
   WHEN row_locked THEN
      Error_SYS.Record_Locked(lu_name_);
   WHEN row_changed THEN
      Error_SYS.Record_Modified(lu_name_);
   WHEN row_deleted THEN
      Error_SYS.Record_Removed(lu_name_);
END Lock_By_Id___;

FUNCTION Lock_By_Keys___ (
   contract_ IN VARCHAR2 ) RETURN COMPANY_SITE_TAB%ROWTYPE
IS
   row_deleted EXCEPTION;
   rec_        COMPANY_SITE_TAB%ROWTYPE;
   CURSOR lock_control IS
      SELECT *
      FROM  COMPANY_SITE_TAB
      WHERE contract = contract_
      FOR UPDATE;
BEGIN
   OPEN lock_control;
   FETCH lock_control INTO rec_;
   IF (lock_control%FOUND) THEN
      CLOSE lock_control;
      RETURN rec_;
   ELSE
      CLOSE lock_control;
      RAISE row_deleted;
   END IF;
EXCEPTION
   WHEN row_deleted THEN
      Error_SYS.Record_Removed(lu_name_);
END Lock_By_Keys___;

FUNCTION Get_Object_By_Id___ (
   objid_ IN VARCHAR2 ) RETURN COMPANY_SITE_TAB%ROWTYPE
IS
   lu_rec_ COMPANY_SITE_TAB%ROWTYPE;
   CURSOR getrec IS
      SELECT *
      FROM   COMPANY_SITE_TAB
      WHERE  rowid = objid_;
BEGIN
   OPEN getrec;
   FETCH getrec INTO lu_rec_;
   IF (getrec%NOTFOUND) THEN
      CLOSE getrec;
      Error_SYS.Record_Removed(lu_name_);
   END IF;
   CLOSE getrec;
   RETURN(lu_rec_);
END Get_Object_By_Id___;


FUNCTION Get_Object_By_Keys___ (
   contract_ IN VARCHAR2 ) RETURN COMPANY_SITE_TAB%ROWTYPE
IS
   lu_rec_ COMPANY_SITE_TAB%ROWTYPE;
   CURSOR getrec IS
      SELECT *
      FROM  COMPANY_SITE_TAB
      WHERE contract = contract_;
BEGIN
   OPEN getrec;
   FETCH getrec INTO lu_rec_;
   CLOSE getrec;
   RETURN(lu_rec_);
END Get_Object_By_Keys___;

FUNCTION Check_Exist___ (
   contract_ IN VARCHAR2 ) RETURN BOOLEAN
IS
   dummy_ NUMBER;
   CURSOR exist_control IS
      SELECT 1
      FROM   COMPANY_SITE_TAB
      WHERE contract = contract_;
BEGIN
   OPEN exist_control;
   FETCH exist_control INTO dummy_;
   IF (exist_control%FOUND) THEN
      CLOSE exist_control;
      RETURN(TRUE);
   END IF;
   CLOSE exist_control;
   RETURN(FALSE);
END Check_Exist___;

PROCEDURE Get_Id_Version_By_Keys___ (
   objid_      IN OUT VARCHAR2,
   objversion_ IN OUT VARCHAR2,
   contract_ IN VARCHAR2)
IS
   CURSOR get_version IS
   SELECT rowid, to_char(rowversion,'YYYYMMDDHH24MISS')
      FROM  COMPANY_SITE_TAB
      WHERE contract = contract_;
BEGIN
   OPEN get_version;
   FETCH get_version INTO objid_, objversion_;
   CLOSE get_version;
END Get_Id_Version_By_Keys___;

-----------------------------------------------------------------------------
-------------------- IMPLEMENTATION BASE METHODS FOR INSERT -----------------
-----------------------------------------------------------------------------
-- Prepare_Insert___
--    Set all default values for a new instance (ON-NEW-RECORD) of this
--    logical unit by calling procedure Add_Attr.
--
-- Unpack_Check_Insert___
--    Unpack the attribute list, check all attributes from the client
--    and generate all default values before creation of the new object.
--
-- Insert___
--    Insert a new LU-instance into the database and return the values
--    for OBJID and OBJVERSION.
-----------------------------------------------------------------------------

PROCEDURE Prepare_Insert___ (
   attr_ IN OUT VARCHAR2 )
IS
BEGIN
   Client_SYS.Clear_Attr(attr_);
END Prepare_Insert___;


PROCEDURE Unpack_Check_Insert___ (
   attr_   IN OUT VARCHAR2,
   newrec_ IN OUT COMPANY_SITE_TAB%ROWTYPE )
IS
   ptr_   NUMBER;
   name_  VARCHAR2(30);
   value_ VARCHAR2(2000);
BEGIN
   ptr_ := NULL;
   WHILE (Client_SYS.Get_Next_From_Attr(attr_, ptr_, name_, value_)) LOOP
      IF (name_ = 'CONTRACT') THEN
         newrec_.contract := value_;
      ELSIF (name_ = 'DESCRIPTION') THEN
         newrec_.description := value_;
      ELSIF (name_ = 'COMPANY') THEN
         newrec_.company := value_;
         Company_API.Exist(newrec_.company);
         IF inst_Accrul_ THEN
            -- ifs_assert_safe samwlk 070515
            EXECUTE IMMEDIATE 'BEGIN Company_Finance_API.Exist(:value); END;'
               USING value_;
         END IF;
      ELSIF (name_ = 'COUNTRY') THEN
         newrec_.country := Iso_Country_API.Encode(value_);
         IF (value_ IS NOT NULL) THEN
            Iso_Country_API.Exist(value_);
         END IF;
      ELSIF (name_ = 'COUNTRY_DB') THEN
         newrec_.country := value_;
         IF (value_ IS NOT NULL) THEN
            Iso_Country_API.Exist_Db(value_);
         END IF;
      ELSE
         Error_SYS.Item_Not_Exist(lu_name_, name_, value_);
      END IF;
   END LOOP;


   Client_SYS.Clear_Attr(attr_);
   Error_SYS.Check_Not_Null(lu_name_, 'CONTRACT', newrec_.contract);
   Error_SYS.Check_Not_Null(lu_name_, 'DESCRIPTION', newrec_.description);
   Error_SYS.Check_Not_Null(lu_name_, 'COMPANY', newrec_.company);
   Error_SYS.Check_Not_Null(lu_name_, 'COUNTRY', newrec_.country);
EXCEPTION
   WHEN value_error THEN
      Error_SYS.Item_Format(lu_name_, name_, value_);
END Unpack_Check_Insert___;


PROCEDURE Insert___ (
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   newrec_     IN OUT COMPANY_SITE_TAB%ROWTYPE,
   attr_       IN OUT VARCHAR2 )
IS
BEGIN
   newrec_.rowversion := sysdate;
   objversion_ := to_char(newrec_.rowversion,'YYYYMMDDHH24MISS');
   INSERT
      INTO company_site_tab (
         contract,
         description,
         company,
         country,
         rowversion)
      VALUES (
         newrec_.contract,
         newrec_.description,
         newrec_.company,
         newrec_.country,
         newrec_.rowversion)
   RETURNING rowid INTO objid_;
EXCEPTION
   WHEN dup_val_on_index THEN
      Error_SYS.Record_Exist(lu_name_);
END Insert___;

-----------------------------------------------------------------------------
-------------------- IMPLEMENTATION BASE METHODS FOR UPDATE -----------------
-----------------------------------------------------------------------------
-- Unpack_Check_Update___
--    Unpack the attribute list, check all attributes from the client
--    and generate all default values before modifying the object.
--
-- Update___
--    Update an existing LU-instance in the database and return the
--    the new OBJVERSION.
-----------------------------------------------------------------------------

PROCEDURE Unpack_Check_Update___ (
   attr_   IN OUT VARCHAR2,
   newrec_ IN OUT COMPANY_SITE_TAB%ROWTYPE,
   objid_  IN     VARCHAR2 )
IS
   ptr_         NUMBER;
   name_        VARCHAR2(30);
   value_       VARCHAR2(2000);
   oldrec_      COMPANY_SITE_TAB%ROWTYPE;
   stmt_        VARCHAR2(2000);
   del_addr_    VARCHAR2(50);
   del_country_ VARCHAR2(2);
BEGIN
   ptr_ := NULL;
   oldrec_ := newrec_;

   WHILE (Client_SYS.Get_Next_From_Attr(attr_, ptr_, name_, value_)) LOOP
      IF (name_ = 'CONTRACT') THEN
         Error_SYS.Item_Update(lu_name_, 'CONTRACT');
      ELSIF (name_ = 'DESCRIPTION') THEN
         newrec_.description := value_;
      ELSIF (name_ = 'COMPANY') THEN
         Error_SYS.Item_Update(lu_name_, 'COMPANY');
      ELSIF (name_ = 'COUNTRY') THEN
         newrec_.country := Iso_Country_API.Encode(value_);
      ELSIF (name_ = 'COUNTRY_DB') THEN
         newrec_.country := value_;
      ELSE
         Error_SYS.Item_Not_Exist(lu_name_, name_, value_);
      END IF;
   END LOOP;

   Client_SYS.Clear_Attr(attr_);
   Error_SYS.Check_Not_Null(lu_name_, 'DESCRIPTION', newrec_.description);
   Error_SYS.Check_Not_Null(lu_name_, 'COUNTRY', newrec_.country);

   Iso_Country_API.Exist(newrec_.country);

   IF (oldrec_.country <> newrec_.country) THEN
      IF (inst_Site_) THEN
         stmt_ := 'BEGIN :del_addr := Site_API.Get_Delivery_Address(:contract); END;';
         -- ifs_assert_safe MaMalk 20101216
         EXECUTE IMMEDIATE stmt_ USING OUT del_addr_, IN newrec_.contract;

         IF (del_addr_ IS NOT NULL) THEN
            del_country_ := Company_Address_API.Get_Country_Db(newrec_.company, del_addr_);
            IF ( del_country_ <> newrec_.country) THEN
               Client_SYS.Add_Info(lu_name_,'DIFFCOUNTRY: Site :P1 has a Delivery Address in Country :P2.', newrec_.contract, ISO_Country_API.Decode(del_country_));
            END IF;
         END IF;
      END IF;
   END IF;

EXCEPTION
   WHEN value_error THEN
      Error_SYS.Item_Format(lu_name_, name_, value_);
END Unpack_Check_Update___;


PROCEDURE Update___ (
   objid_      IN     VARCHAR2,
   oldrec_     IN     COMPANY_SITE_TAB%ROWTYPE,
   newrec_     IN OUT COMPANY_SITE_TAB%ROWTYPE,
   attr_       IN OUT VARCHAR2,
   objversion_ IN OUT VARCHAR2,
   by_keys_    IN BOOLEAN DEFAULT FALSE )
IS
BEGIN
   newrec_.rowversion := sysdate;
   objversion_ := to_char(newrec_.rowversion,'YYYYMMDDHH24MISS');
   IF by_keys_ THEN
      UPDATE company_site_tab
      SET contract = newrec_.contract,
          description = newrec_.description,
          company = newrec_.company,
          country = newrec_.country,
          rowversion = newrec_.rowversion
      WHERE contract = newrec_.contract;
   ELSE
      UPDATE company_site_tab
      SET contract = newrec_.contract,
          description = newrec_.description,
          company = newrec_.company,
          country = newrec_.country,
          rowversion = newrec_.rowversion
      WHERE rowid = objid_;
   END IF;
   Invalidate_Cache___;
EXCEPTION
   WHEN dup_val_on_index THEN
      Error_SYS.Record_Exist(lu_name_);
END Update___;

-----------------------------------------------------------------------------
-------------------- IMPLEMENTATION BASE METHODS FOR DELETE -----------------
-----------------------------------------------------------------------------
-- Check_Delete___
--    Checks whether a specific LU-record may be removed or not.
--    The procedure should check business rules like attribute values
--    as well as database constraints (defined or not).
--
-- Delete___
--    Deletion of the specific LU-object from the database.
-----------------------------------------------------------------------------

PROCEDURE Check_Delete___ (
   remrec_ IN COMPANY_SITE_TAB%ROWTYPE )
IS
   key_ VARCHAR2(2000);
BEGIN
   key_ := remrec_.contract || '^';
   Reference_SYS.Check_Restricted_Delete(lu_name_, key_);
END Check_Delete___;


PROCEDURE Delete___ (
   objid_  IN VARCHAR2,
   remrec_ IN COMPANY_SITE_TAB%ROWTYPE )
IS
   key_ VARCHAR2(2000);
BEGIN
   key_ := remrec_.contract || '^';
   Reference_SYS.Do_Cascade_Delete(lu_name_, key_);
   DELETE
      FROM  COMPANY_SITE_TAB
      WHERE rowid = objid_;
END Delete___;

-----------------------------------------------------------------------------
-------------------- PRIVATE BASE METHODS -----------------------------------
-----------------------------------------------------------------------------
-- Lock__
--    Client-support to lock a specific instance of the logical unit.
--
-- New__
--    Client-support interface to create LU instances.
--       action_ = 'PREPARE'
--          Default values and handle of information to client.
--          The default values are set in procedure Prepare_Insert___.
--       action_ = 'CHECK'
--          Check all attributes before creating new object and handle of
--          information to client. The attribute list is unpacked, checked
--          and prepared (defaults) in procedure Unpack_Check_Insert___.
--       action_ = 'DO'
--          Creation of new instances of the logical unit and handle of
--          information to client. The attribute list is unpacked, checked
--          and prepared (defaults) in procedure Unpack_Check_Insert___
--          before calling procedure Insert___.
--
-- Modify__
--    Client-support interface to modify attributes for LU instances.
--       action_ = 'CHECK'
--          Check all attributes before modifying an existing object and
--          handle of information to client. The attribute list is unpacked,
--          checked and prepared(defaults) in procedure Unpack_Check_Update___.
--       action_ = 'DO'
--          Modification of an existing instance of the logical unit. The
--          procedure unpacks the attributes, checks all values before
--          procedure Update___ is called.
--
-- Remove__
--    Client-support interface to remove LU instances.
--       action_ = 'CHECK'
--          Check whether a specific LU-instance may be removed or not.
--          The procedure fetches the complete record by calling procedure
--          Get_Object_By_Id___. Then the check is made by calling procedure
--          Check_Delete___.
--       action_ = 'DO'
--          Remove an existing instance of the logical unit. The procedure
--          fetches the complete LU-record, checks for a delete and then
--          deletes the record by calling procedure Delete___.
-----------------------------------------------------------------------------

PROCEDURE Lock__ (
   info_       OUT VARCHAR2,
   objid_      IN  VARCHAR2,
   objversion_ IN  VARCHAR2 )
IS
   dummy_ COMPANY_SITE_TAB%ROWTYPE;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_SITE_API', 'Lock__');
   dummy_ := Lock_By_Id___(objid_, objversion_);
   info_ := Client_SYS.Get_All_Info;
END Lock__;


PROCEDURE New__ (
   info_       OUT    VARCHAR2,
   objid_      OUT    VARCHAR2,
   objversion_ OUT    VARCHAR2,
   attr_       IN OUT VARCHAR2,
   action_     IN     VARCHAR2 )
IS
   newrec_ COMPANY_SITE_TAB%ROWTYPE;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_SITE_API', 'New__');
   IF (action_ = 'PREPARE') THEN
      Prepare_Insert___(attr_);
   ELSIF (action_ = 'CHECK') THEN
      Unpack_Check_Insert___(attr_, newrec_);
   ELSIF (action_ = 'DO') THEN
      Unpack_Check_Insert___(attr_, newrec_);
      Insert___(objid_, objversion_, newrec_, attr_);
   END IF;
   info_ := Client_SYS.Get_All_Info;
END New__;


PROCEDURE Modify__ (
   info_       OUT    VARCHAR2,
   objid_      IN     VARCHAR2,
   objversion_ IN OUT VARCHAR2,
   attr_       IN OUT VARCHAR2,
   action_     IN     VARCHAR2 )
IS
   oldrec_ COMPANY_SITE_TAB%ROWTYPE;
   newrec_ COMPANY_SITE_TAB%ROWTYPE;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_SITE_API', 'Modify__');
   IF (action_ = 'CHECK') THEN
      newrec_ := Get_Object_By_Id___(objid_);
      Unpack_Check_Update___(attr_, newrec_, objid_);
   ELSIF (action_ = 'DO') THEN
      oldrec_ := Lock_By_Id___(objid_, objversion_);
      newrec_ := oldrec_;
      Unpack_Check_Update___(attr_, newrec_, objid_);
      Update___(objid_, oldrec_, newrec_, attr_, objversion_);
   END IF;
   info_ := Client_SYS.Get_All_Info;
END Modify__;


PROCEDURE Remove__ (
   info_       OUT VARCHAR2,
   objid_      IN  VARCHAR2,
   objversion_ IN  VARCHAR2,
   action_     IN  VARCHAR2 )
IS
   remrec_ COMPANY_SITE_TAB%ROWTYPE;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_SITE_API', 'Remove__');
   IF (action_ = 'CHECK') THEN
      remrec_ := Get_Object_By_Id___(objid_);
      Check_Delete___(remrec_);
   ELSIF (action_ = 'DO') THEN
      remrec_ := Lock_By_Id___(objid_, objversion_);
      Check_Delete___(remrec_);
      Delete___(objid_, remrec_);
   END IF;
   info_ := Client_SYS.Get_All_Info;
END Remove__;

-----------------------------------------------------------------------------
-------------------- PUBLIC BASE METHODS ------------------------------------
-----------------------------------------------------------------------------
-- Exist
--   Checks if given pointer (e.g. primary key) to an instance of this
--   logical unit exists. If not an exception will be raised.
-----------------------------------------------------------------------------

PROCEDURE Exist (
   contract_ IN VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_SITE_API', 'Exist', TRUE);
   IF (NOT Check_Exist___(contract_)) THEN
      Error_SYS.Record_Not_Exist(lu_name_);
   END IF;
END Exist;

-----------------------------------------------------------------------------
-------------------- LU SPECIFIC IMPLEMENTATION METHODS ---------------------
-----------------------------------------------------------------------------


-----------------------------------------------------------------------------
-------------------- LU SPECIFIC PRIVATE METHODS ----------------------------
-----------------------------------------------------------------------------


-----------------------------------------------------------------------------
-------------------- LU SPECIFIC PROTECTED METHODS --------------------------
-----------------------------------------------------------------------------


-----------------------------------------------------------------------------
-------------------- LU SPECIFIC PUBLIC METHODS -----------------------------
-----------------------------------------------------------------------------

FUNCTION Get_Description (
   contract_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   Update_Cache___(contract_);
   RETURN micro_cache_value_.description;
END Get_Description;

FUNCTION Get_Company (
   contract_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   Update_Cache___(contract_);
   RETURN micro_cache_value_.company;
END Get_Company;

FUNCTION Get_Country (
   contract_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   Update_Cache___(contract_);
   RETURN Iso_Country_API.Decode(micro_cache_value_.country);
END Get_Country;

FUNCTION Get_Country_Db (
   contract_ IN VARCHAR2 ) RETURN VARCHAR2
IS
BEGIN
   Update_Cache___(contract_);
   RETURN micro_cache_value_.country;
END Get_Country_Db;



PROCEDURE Get_Info (
   country_code_db_  OUT    VARCHAR2,
   description_      IN OUT VARCHAR2,
   company_          IN OUT VARCHAR2,
   company_name_     IN OUT VARCHAR2,
   contract_         IN     VARCHAR2 )
IS
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_SITE_API', 'Get_Info' );
   description_  := Get_Description(contract_);
   company_      := Get_Company(contract_);
   company_name_ := Company_API.Get_Name(company_);
   country_code_db_ := Get_Country_Db(contract_);
END Get_Info;

FUNCTION Check_Exist (
   contract_ IN VARCHAR2 ) RETURN NUMBER
IS
BEGIN
   IF (Check_Exist___(contract_)) THEN
      RETURN 1;
   ELSE
      RETURN 0;
   END IF;
END Check_Exist;

PROCEDURE Create_Company_Site (
   contract_               IN VARCHAR2,
   description_            IN VARCHAR2,
   company_                IN VARCHAR2,
   country_db_             IN VARCHAR2 DEFAULT NULL)
IS
   attr_        VARCHAR2(32000);
   objid_       VARCHAR2(30);
   objversion_  VARCHAR2(30);
   newrec_      COMPANY_SITE_TAB%ROWTYPE;
BEGIN
   General_SYS.Init_Method(lu_name_, 'COMPANY_SITE_API', 'Create_Company_Site');
   --Create's a new site in the CompanySite.
   Client_SYS.Clear_Attr(attr_);
   Client_SYS.Add_To_Attr('CONTRACT', contract_, attr_ );
   Client_SYS.Add_To_Attr('DESCRIPTION', description_, attr_ );
   Client_SYS.Add_To_Attr('COMPANY', company_, attr_ );
   Client_SYS.Add_To_Attr('COUNTRY_DB', NVL(country_db_, Company_API.Get_Country_Db(company_)), attr_ );

   Unpack_Check_Insert___(attr_, newrec_);
   Insert___(objid_, objversion_, newrec_, attr_);
   Invalidate_cache___;
END Create_Company_Site;

FUNCTION Get (
   contract_ IN VARCHAR2 ) RETURN Public_Rec
IS
BEGIN
   Update_Cache___(contract_);
   RETURN micro_cache_value_;
END Get;


--14:34 16.01.2015 Grissom add start
FUNCTION Get_Company_Name(
   contract_ IN VARCHAR2) RETURN VARCHAR2
IS

BEGIN
   RETURN COMPANY_API.GET_NAME(COMPANY_SITE_API.GET_COMPANY(contract_));
END Get_Company_Name;
--14:34 16.01.2015 Grissom add end
-----------------------------------------------------------------------------
-------------------- FOUNDATION1 METHODS ------------------------------------
-----------------------------------------------------------------------------
-- Init
--   Dummy procedure that can be called at database startup to ensure that
--   this package is loaded into memory for performance reasons only.
-----------------------------------------------------------------------------

PROCEDURE Init
IS
BEGIN
   Invalidate_Cache___;
END Init;


END COMPANY_SITE_API;
/


spool off
