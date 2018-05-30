create or replace procedure syn_yc_hs_6801 is
  occur_time varchar2(30);
  sqlstr     varchar2(4000);
  condition  varchar2(300);
begin
  select max(to_char(t.occur_time, 'yyyymmddhh24mi' £©£©into occur_time from yc_hs_6801 t;
  condition := '1=1';
  if occur_time is not null then
    condition := 'to_char(t.occur_time, ''yyyymmddhh24mi'' £© >' ||
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
      DBMS_OUTPUT.PUT_LINE('Í¬²½¡¾yc_hs_6801¡¿³ö´í!');
    end;
    commit;
end syn_yc_hs_6801;
/
