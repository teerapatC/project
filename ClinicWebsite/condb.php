<?php
$condb = mysqli_connect("localhost", "root", "", "clinic") or die("Error: ". mysqli_error($condb));
//echo "เชื่อมต่อสำเร็จ";
mysqli_query($condb, "SET NAMES 'utf8' ");
error_reporting( error_reporting() & ~E_NOTICE );
date_default_timezone_set('Asia/Bangkok');
?>