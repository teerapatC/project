<?php

include ('../condb.php');

$id = $_POST["id"];
$bookdate = $_POST["bookdate"];
$symptom = $_POST["symptom"];
$animalid = $_POST["animalid"];
$citizenid = $_POST["citizenid"];



$sql ="UPDATE Treatmenthistory SET DDate = '$bookdate',Symptom='$symptom' , AnimalID  = '$animalid', EmpID  = '$citizenid' WHERE TreatmentID =$id ";

$result =mysqli_query($condb,$sql);

if($result){
    header("location:TreatHis_index.php");
    exit(0);
} else {
    echo mysqli_error($condb);}

 



?>