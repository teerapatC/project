<meta charset="utf-8">
<?php

include ('../condb.php');
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
// exit();
$o_name = $_POST["o_name"];
$o_id = $_POST["o_id"];
$o_HouseNo = $_POST["o_HouseNo"];
$o_street = $_POST["o_street"];
$o_district = $_POST["o_district"];
$o_province = $_POST["o_province"];
$o_code = $_POST["o_code"];
$o_tel = $_POST["o_tel"];

$sql = "INSERT INTO owner
(CitizenID, Name, HouseNo, Code, Province, Street, District)
VALUES
('$o_id', '$o_name', '$o_HouseNo', '$o_code', '$o_province', '$o_street', '$o_district' )";

// $sql = "INSERT INTO tel_owner
// (CitizenID, Tel)
// VALUES
// ('$o_id', '$o_tel')";

$result = mysqli_query($condb, $sql) ;

$sql = "INSERT INTO tel_owner
(CitizenID, Tel)
VALUES
('$o_id', '$o_tel')";

$result = mysqli_query($condb, $sql);
mysqli_close($condb);

if($result){
    echo "<script>";
    echo "window.location = '../animal.html?oid='+$o_id;";
    echo "</script>";
}
?>