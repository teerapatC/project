<?php
include ('../condb.php');

$id =$_GET["idemp"];

$sql="DELETE FROM treatmenthistory WHERE TreatmentID = $id";

$result=mysqli_query($condb,$sql);

if($result){
    header("location:TreatHis_index.php");
    exit(0);
}else{
    echo "เกิดข้อผิดพลาดเกิดขึ้น";
}

?>










