select a.company,a.person_id,a.name,a.dept,a.transaction_day,b.be_late,b.leave_early,b.abnormal,b.regular
  from (select *
          from (SELECT company,
                       employee_id,
                       person_id,
                       name,
                       ifsapp.Company_Pers_Assign_API.Get_Org_Code(company,
                                                                   person_id,
                                                                   SYSDATE) dept,
                       ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name(company,
                                                                        person_id) emp_category
                  from ifsapp.COMPANY_EMP
                 where company = '10'
                   and ifsapp.update_news_person_api.Get_C_Check_Exist(person_id) =
                       'FALSE'
                   and ifsapp.COMPANY_EMP_CATEGORY_API.Get_Emp_Cat_Name(company,
                                                                        person_id) not in
                       ('08', '09')) person_info,
               (select to_char(to_date('20180428', 'yyyymmdd') - level + 1,
                               'yyyymmdd') as transaction_day
                  from dual
                connect by level <= 30) day_info) a
  left join (select person_id,
                    substr(transaction_id, 0, 8) transaction_day,
                    max(case
                          when t.plan_start_time < t.actual_start_time and
                               t.confirm_date is null then
                           1
                          else
                           0
                        end) as be_late,
                    max(case
                          when (t.plan_end_time > t.actual_end_time or
                               (actual_start_time is not null and
                               actual_end_time is null and
                               sysdate > plan_end_time + 20 / 24)) and
                               t.confirm_date is null then
                           1
                          else
                           0
                        end) as leave_early,
                    max(case
                          when (t.plan_start_time < t.actual_start_time or
                               t.plan_end_time > t.actual_end_time or
                               (actual_end_time is null and
                               sysdate > plan_end_time)) and
                               t.confirm_date is null then
                           1
                          else
                           0
                        end) as abnormal,
                    min(case
                          when (t.plan_start_time > t.actual_start_time and
                               t.plan_end_time < t.actual_end_time) or
                               t.confirm_date is not null then
                           1
                          else
                           0
                        end) as regular
               from ifsapp.C_TIME_TRANSACTION_tab t
              group by person_id, dept, substr(transaction_id, 0, 8)) b
    on a.person_id = b.person_id
   and a.transaction_day = b.transaction_day
   order by  b.transaction_day ,a.dept,a.name

/

 --   日期填写说明：
 --   　   
 --           1.日期填写格式为”YYYYMMDD“，即”4位年份+2位月份+2位日期“，如”20170126“；
 --           
 --           2.前推天数：为选择截止日期往前推多少天,这段时间内的考勤统计
 --      
 --           3.
 --   