<meta charset="utf-8">
<?php

include ('../condb.php');

//$pos1 = $_POST["pos1"];
$e_id = $_POST["e_id"];
$e_name = $_POST["e_name"];
$e_street = $_POST["e_street"];
$e_district = $_POST["e_district"];
$e_province = $_POST["e_province"];
$e_code = $_POST["e_code"];
$e_tel = $_POST["e_tel"];
$e_salary = $_POST["e_salary"];
$e_tel = $_POST["e_tel"];
$e_startDate = $_POST["e_startDate"];
$e_houseNo = $_POST["e_houseNo"];
$e_certificate = $_POST["e_certificate"];

$sql = "INSERT INTO employee 
(Empid, Name, StartDate, Salary, HouseNo, Code, Province, Street, District)
VALUES
('$e_id', '$e_name', '$e_startDate', '$e_salary',  '$e_houseNo', '$e_code', '$e_province', '$e_street', '$e_district')";

$result = mysqli_query($condb, $sql);

$sql = "INSERT INTO tel_Employee
(EmpID, Tel)
VALUES
('$e_id', '$e_tel')";

$result = mysqli_query($condb, $sql);

$sql = "INSERT INTO vet
(Empid, Name, StartDate, Salary, Certificate, HouseNo, Code, Province, Street, District)
VALUES
('$e_id', '$e_name', '$e_startDate', '$e_salary', '$e_certificate',  '$e_houseNo', '$e_code', '$e_province', '$e_street', '$e_district')";
$result = mysqli_query($condb, $sql);

if($result){
    echo "<script>
alert('บันทึกข้อมูลเรียบร้อย');
window.location.href='employee.php';
</script>";
}else{
    echo "<script>
alert('เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้');
window.location.href='employee.php';
</script>";
}
?>
?>