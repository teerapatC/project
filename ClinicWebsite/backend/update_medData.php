<?php
    include ('../condb.php');

    $id = $_POST["updateid"];

    $MedID = $_POST["mid"];
    $MedName = $_POST["med"];
    $Qua = $_POST["qua"];

    $sql = "UPDATE medicine SET MedID = $MedID , MedName = '$MedName' , Quantity = $Qua WHERE MedID = $id ";

    $result = mysqli_query($condb,$sql);

    if($result){
        header("location:index_medStock.php");
        exit(0);
    }else{
        echo mysqli_error($condb);
    }
    
?>