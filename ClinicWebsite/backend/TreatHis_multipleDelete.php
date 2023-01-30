<?php
include ('../condb.php');

$id_arr= $_POST["idcheckbox"];

$multiple_id=implode("," ,$id_arr);

$sql ="DELETE FROM treatmenthistory WHERE TreatmentID in ($multiple_id)";

$result=mysqli_query($condb,$sql);

if($result){
    header("location:TreatHis_index.php");
    exit(0);
}else{
    header("location:TreatHis_index.php");
    exit(0);
}


?>



