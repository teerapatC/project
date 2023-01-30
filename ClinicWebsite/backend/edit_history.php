<meta charset="utf-8">
<?php

include ('../condb.php');
$count = 0;
$newinput_num =0;
foreach($_POST as $n){
   if($count>12){
      $newinput_num++;
   }
   $count++;
}
$newinput_num = $newinput_num/4-1;
$DDate[$newinput_num] = null;
$old_DDate[$newinput_num] = null;
$Symptom[$newinput_num] = null;
$old_Symptom[$newinput_num] = null;
$count_date = 0;
$count_old_date = 0;
$count_sym = 0;
$count_old_sym = 0;
$count = 0;
foreach($_POST as $n){
   if($count>12){
      if($count%10==3){
         $DDate[$count_date] = $n;
         $count_date++;
      }else if($count%10==4){
        $old_DDate[$count_old_date] = $n;
        $count_old_date++;
      }else if($count%10==5){
         $Symptom[$count_sym] =$n;
         $count_sym++;
      }else if($count%10==6){
        $old_Symptom[$count_old_sym] = $n;
        $count_old_sym++;
        $count=12;
      }
   }
   $count++;
}

$o_Name = $_POST["o_Name"];
$CitizenID = $_POST["CitizenID"];
$HouseNo = $_POST["HouseNo"];
$Street = $_POST["Street"];
$District = $_POST["District"];
$Province = $_POST["Province"];
$Code = $_POST["Code"];
$Tel = $_POST["Tel"];
$a_Name = $_POST["a_Name"];
$AnimalID = $_POST["AnimalID"];
$Type = $_POST["Type"];
$BirthDate = $_POST["BirthDate"];
$Age = $_POST["Age"];

// echo '<pre>';
// print_r($_POST);
// print($newinput_num);
// print_r($DDate);
// print_r($old_DDate);
// print_r($Symptom);
// print_r($old_Symptom);
// echo '</pre>';
// exit();
$count = 0;
$sql = "UPDATE owner SET
Name = '$o_Name',
HouseNo = '$HouseNo',
Street = '$Street',
District = '$District',
Province = '$Province',
Code = '$Code'
WHERE CitizenID = $CitizenID
";
$result = mysqli_query($condb, $sql) ;

$sql = "UPDATE tel_owner SET
Tel = '$Tel'
WHERE CitizenID = $CitizenID
";
$result = mysqli_query($condb, $sql) ;

$sql = "UPDATE animal SET
Name = '$a_Name',
Type = '$Type',
BirthDate = '$BirthDate',
Age = '$Age'
WHERE AnimalID = $AnimalID
";
$result = mysqli_query($condb, $sql) ;

while($count<=$newinput_num){
$sql ="UPDATE treatmenthistory SET
    DDate = '$DDate[$count]',
    Symptom = '$Symptom[$count]'
    WHERE DDate = '$old_DDate[$count]' && Symptom = '$old_Symptom[$count]' && AnimalID = '$AnimalID';
";
$result = mysqli_query($condb, $sql) ;   
$count++;
}


mysqli_close($condb);
if($result){
    echo "<script>";
    echo "alert('บันทึกข้อมูลที่แก้ไขแล้ว');";
    echo "window.location = 'searchhistory.php';";
    echo "</script>";
}
?>