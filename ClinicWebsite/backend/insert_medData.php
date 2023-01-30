<?php
    include ('../condb.php');
    
    $MID = $_POST["mid"];
    $Name = $_POST["med"];
    $Qua = $_POST["qua"];

    $sql = "INSERT INTO medicine(MedID,MedName,Quantity) VALUES($MID,'$Name',$Qua)";

    $result = mysqli_query($condb,$sql);

    //บันทึกข้อมูลแล้วกลับไปหน้าหลักอัตโนมัติ
    if($result){
        header("location:index_medStock.php");
        exit(0);
    }else{
        echo "คุณยังไม่ได้กรอกข้อมูล กรุณากรอกข้อมูล หรือข้อมูลไม่ถูกต้อง";
        //echo mysqli_error($condb);
        
    }

?>