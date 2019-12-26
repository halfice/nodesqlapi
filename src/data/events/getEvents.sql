SELECT
sum(
   isnull(
     TRY_CONVERT(
       FLOAT
      ,days)
    ,0))
   consumedpermissiontime
  
, Floor((480 - (sum(
   isnull(
     TRY_CONVERT(
       FLOAT
      ,days)
    ,0)) * 8 *60))/60) RemainingBalanceHours
                ,ceiling((480 - (sum(
   isnull(
     TRY_CONVERT(
       decimal(18,2)
      ,days)
      
    ,0)) * 8 *60))%60.00) RemainingBalanceMins
    
,fk_employeeid
,employeeno
FROM
emp_permissionsrequest
INNER JOIN dbo.employee
   ON dbo.employee.employeeid = dbo.emp_permissionsrequest.fk_employeeid
WHERE
TRY_CONVERT(
   FLOAT
  ,days)
   IS NOT NULL AND
year(permdate) = year(getdate()) AND
month(permdate) = month(getdate())
AND employeeNo = @EmpNo
GROUP BY
fk_employeeid
,employeeno


SELECT
employeeno
,dbo.emp_move_in_out.in_time_num
,dbo.emp_move_in_out.out_time_num
,isnull(
   dbo.emp_move_in_out.in_time_num
  ,0)
   intime
,CASE
   WHEN in_time_num IS NULL
   THEN
     0
   ELSE
     isnull(
       dbo.emp_move_in_out.out_time_num
      ,480 + dbo.emp_move_in_out.in_time_num)
END
  AS outtime
,floor(
   isnull(
     dbo.emp_move_in_out.in_time_num
    ,0) /
   60)
   AS intimehours
,isnull(
   dbo.emp_move_in_out.in_time_num
  ,0) % 60
   AS intimeminutes
,cast(
   floor(
     isnull(
       dbo.emp_move_in_out.in_time_num
      ,0) /
     60) AS VARCHAR(2)) +
':' +
cast(
   isnull(
     dbo.emp_move_in_out.in_time_num
    ,0) % 60 AS VARCHAR(2))
   AS intimestring
,CASE
   WHEN dbo.emp_move_in_out.in_time_num IS NULL
   THEN
     0
   ELSE
     floor(
       isnull(
         dbo.emp_move_in_out.out_time_num
        ,480 + dbo.emp_move_in_out.in_time_num) /
       60)
END
   AS outtimehours
,CASE
   WHEN dbo.emp_move_in_out.in_time_num IS NULL
   THEN
     0
   ELSE
     floor(
       isnull(
         dbo.emp_move_in_out.out_time_num
        ,480 + dbo.emp_move_in_out.in_time_num) % 60)
END
   AS outtimeminutes
,CASE
   WHEN CASE
          WHEN in_time_num IS NULL
          THEN
            0
          ELSE
            isnull(
              dbo.emp_move_in_out.out_time_num
             ,480 + dbo.emp_move_in_out.in_time_num)
        END < 900
   THEN
     '3:00'
   ELSE
     CASE
       WHEN dbo.emp_move_in_out.in_time_num IS NULL
       THEN
         '00:00'
       ELSE
         cast(
           floor(
             isnull(
               dbo.emp_move_in_out.out_time_num
              ,480 + dbo.emp_move_in_out.in_time_num) /
             60) AS VARCHAR(2)) +
         ':' +
         cast(
           floor(
             isnull(
               dbo.emp_move_in_out.out_time_num
              ,480 + dbo.emp_move_in_out.in_time_num) % 60) AS VARCHAR(2))
     END
END
   AS outtimestring
FROM
emp_move_in_out
INNER JOIN dbo.employee
   ON dbo.employee.employeeid = emp_move_in_out.fk_employeeid
WHERE
move_date = cast(getdate()-10 AS DATE) AND
employeeno = @EmpNo


