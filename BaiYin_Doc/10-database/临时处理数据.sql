truncate table yc_hs_6801;
insert into yc_hs_6801 select * from ondb2.yc_hs_6801@byfd_test t where t.occur_time>sysdate-1;
commit;
truncate table yc_hs_6800;
insert into yc_hs_6800 select * from ondb2.yc_hs_6800@byfd_test t where t.occur_time>sysdate-1;
commit;
