<meta charset="utf-8">
<?php 

include ('../condb.php');
// echo '<pre>';
// print_r($_GET);
// echo '</pre>';
// exit();

$CitizenID = $_GET['CitizenID'];
$AnimalID = $_GET['AnimalID'];

$sql = "DELETE FROM treatmenthistory WHERE AnimalID = $AnimalID";
$result = mysqli_query($condb, $sql);

$sql = "DELETE FROM attends WHERE AnimalID = $AnimalID";
$result = mysqli_query($condb, $sql);

$sql = "DELETE FROM animal WHERE AnimalID = $AnimalID";
$result = mysqli_query($condb, $sql);

// $sql = "DELETE FROM tel_owner WHERE CitizenID = $CitizenID";
// $result = mysqli_query($condb, $sql);

// $sql = "DELETE FROM owner WHERE CitizenID = $CitizenID";
// $result = mysqli_query($condb, $sql);
mysqli_close($condb);

if($result){
    echo "<script>";
    echo "alert('ลบข้อมูลแล้ว');";
    echo "window.location = 'searchhistory.php';";
    echo "</script>";
}
?>