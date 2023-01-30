<meta charset="utf-8">
<?php

include ('../condb.php');
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
// exit();

$o_id = $_POST["o_id"];
$a_name = $_POST["a_name"];
$a_id = $_POST["a_id"];
$a_birthdate = $_POST["a_birthdate"];
$a_type = $_POST["a_type"];
$a_age = $_POST["a_age"];
$sql = "INSERT INTO animal
(CitizenID, Name, AnimalID, BirthDate, Type, Age)
VALUES
('$o_id', '$a_name', '$a_id', '$a_birthdate', '$a_type', '$a_age')";
// $sql = "INSERT INTO owner (CitizenID)"

$result = mysqli_query($condb, $sql) ;


if($result){
    echo "<script>
alert('บันทึกข้อมูลเรียบร้อย');
window.location.href='homepage.php';
</script>";
    
}else{ echo "<script>
    alert('เกิดข้อผิดพลาด ไม่สามารถบันทึกข้อมูลได้');
    window.location.href='homepage.php';
    </script>";
    
}

?>
