 
<?php

    function GetImageExtension($imagetype)
     {
       if(empty($imagetype)) return false;
       switch($imagetype)
       {
           case 'image/bmp': return '.bmp';
           case 'image/gif': return '.gif';
           case 'image/jpeg': return '.jpg';
           case 'image/png': return '.png';
           default: return false;
       }
     }
   
   
   
if (!empty($_FILES["uploadedimage"]["name"])) {

  $file_name=$_FILES["uploadedimage"]["name"];
  $temp_name=$_FILES["uploadedimage"]["tmp_name"];
  $imgtype=$_FILES["uploadedimage"]["type"];
  $ext= GetImageExtension($imgtype);
  $imagename=date("d-m-Y")."-".time().$ext;
  $target_path = "images/".$imagename;
  

if(move_uploaded_file($temp_name, $target_path)) {
  $connectionString = "host=ec2-54-225-101-64.compute-1.amazonaws.com port=5432 dbname=d1nigmib60rp1v user=jykiewmddlbjft password=kRqkD183znoOpPNTlDq6f_Xs29";
  $dbconnection = pg_connect($connectionString);

  $query_upload="INSERT into 'images_tbl' ('images_path','submission_date') VALUES ('".$target_path."','".date("Y-m-d")."')";
  $result = pg_query($dbconnection,
      $query_upload);  
}else{

   exit("Error While uploading image on the server");
} 

}

?>;
