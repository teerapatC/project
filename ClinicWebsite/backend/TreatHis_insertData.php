<?php
//======= เชื่อมต่อฐานข้อมูล =======
include ('../condb.php');


//======= รับค่าที่ส่งมาจากฟอร์ม ลงในตัวแปร =======
$bookdate = $_POST["bookdate"];
$symptom = $_POST["symptom"];
$animalid = $_POST["animalid"];
$citizenid = $_POST["citizenid"];


// $emskill= implode(",",$_POST["skills"]); //arary=> string

//====== บันทึกข้อมูล =======
$sql = "INSERT INTO Treatmenthistory(DDate,Symptom,AnimalID,EmpID) VALUES('$bookdate','$symptom','$animalid','$citizenid')";

$result = mysqli_query($condb,$sql);  //สั่งรันคำสั่ง sql
//เช็คเงื่อนไขการบันทึกข้อมูล
if($result){
    header("location:TreatHis_index.php");
    exit(0);
} else {
    echo mysqli_error($condb);
}
 ?>