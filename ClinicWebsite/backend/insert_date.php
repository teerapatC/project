<meta charset="utf-8">
<?php

include ('../condb.php');

$ddate = $_POST["ddate"];
$a_id = $_POST["a_id"];
$e_id = $_POST["e_id"];
$sym = $_POST["sym"];

$sql = "INSERT INTO treatmenthistory
(EmpID, AnimalID, DDate, Symptom)
VALUES
('$e_id', '$a_id', '$ddate', '$sym' )";

$result = mysqli_query($condb, $sql) ;


?>