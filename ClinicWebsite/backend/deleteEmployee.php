<?php
    include ('../condb.php');

    $EmpID = $_GET["idemp"];

    $sql = "DELETE  FROM tel_employee WHERE EmpID = $EmpID ";
    // $sql = "DELETE  FROM employee WHERE EmpID = $EmpID ";
    $result = mysqli_query($condb,$sql);
    $sql = "DELETE  FROM vet WHERE EmpID = $EmpID ";
    $result = mysqli_query($condb,$sql);
    $sql = "DELETE  FROM assistance WHERE EmpID = $EmpID ";
    $result = mysqli_query($condb,$sql);
    $sql = "DELETE  FROM employee WHERE EmpID = $EmpID ";
    $result = mysqli_query($condb,$sql);
    if($result){
        header("location:edit_employee.php");
        exit(0);
    }else{
        echo mysqli_errors($condb);
    }
?>