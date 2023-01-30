<?php
    include ('../condb.php');

    $id = $_POST["e_id"];
    
    $EmpID = $_POST["e_id"];
    $Name = $_POST["e_name"];
    $Street = $_POST["e_street"];
    $District = $_POST["e_district"];
    $Province = $_POST["e_province"];
    $Code = $_POST["e_code"];
    $Tel = $_POST["e_tel"];
    $Salary = $_POST["e_salary"];
    $StartDate = $_POST["e_startDate"];
    $HouseNo = $_POST["e_houseNo"];

    $sql = "UPDATE Employee SET Empid = $EmpID , Name = '$Name', StartDate = '$StartDate', Salary = $Salary, HouseNo = '$HouseNo', Code = '$Code', Province = '$Province', Street = '$Street', District = '$District' WHERE EmpID = $id";
    

    $result = mysqli_query($condb,$sql);

    if($result){
        echo "<script>";
    echo "alert('บันทึกข้อมูลที่แก้ไขแล้ว');";
    echo "window.location = 'employee.php';";
    echo "</script>";
 }else{
    echo "<script>";
    echo "alert('เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้');";
    echo "window.location = 'employee.php';";
    echo "</script>";
    }
    
?>