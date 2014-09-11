SELECT quizname,coursecode,AVG(score) as average_score,COUNT(*) number_taken FROM result LEFT JOIN quiz ON quiz.name=result.quizname GROUP BY  quizname,coursecode ORDER BY AVG(score) desc;

SELECT fname,lname,emailaddress,AVG(score) as average_score,COUNT(*) number_taken
 FROM useraccount LEFT JOIN result ON useraccount.id=result.userid GROUP BY useraccount.id,useraccount.fname,useraccount.lname,useraccount.emailaddress ORDER BY AVG(score) desc;

 SELECT fname,lname,emailaddress,coursecode,AVG(score) as average_score,COUNT(*) number_taken
 FROM useraccount LEFT JOIN result LEFT JOIN quiz ON quiz.name=result.quizname ON useraccount.id=result.userid GROUP BY useraccount.id,useraccount.fname,useraccount.lname,quiz.coursecode,useraccount.emailaddress ORDER BY AVG(score) desc;
