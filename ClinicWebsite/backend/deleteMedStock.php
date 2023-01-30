<?php

include ('../condb.php');

$MedID = $_GET["idmed"];

$sql = "DELETE FROM medicine WHERE MedID = $MedID";

$result = mysqli_query($condb,$sql);

if($result){
    header("location:edit_medStock.php");
    exit(0);
}else{
    echo mysqli_errors($condb);
}

?>