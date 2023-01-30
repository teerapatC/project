<?php
include ('../condb.php');

$id =$_GET["id"];
$sql ="SELECT * FROM treatmenthistory WHERE TreatmentID = $id";

$result = mysqli_query($condb,$sql);

$row=mysqli_fetch_assoc($result);

// $skill_arr=array("Java","PHP","Python","HTML"); //เตรียมตัวเลือก 4 ตัวเลือก

// echo $row["skills"]; // String => array // java,pyhton => ["java","python"]


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>คลินิกรักษาสัตว์</title>

    <link rel="stylesheet" href="../style3.css">
    <link rel="stylesheet" href="../style1.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400&display=swap" rel="stylesheet">
    <script src = 'link.js'></script>
    <style>
         table, th, td {
            border: 3px solid #509897;
            border-collapse: collapse;
            background-color: #f7f4f4;
         }
         input{
            height: 30px;
            border: none;
				text-align:center;
				border-radius: 8px;
            font-size:large;
            background-color:rgb(228, 228, 228);
            
         }
   </style>

</head>

<body style="background-color:#d1ede4;">
<div>
      <div id="box1" class="eiei"></div>
      <div id="box2" class="eiei"></div>
   </div>

   <div id="logo">
      <img src="../logo.png" width="100" height="70">
   </div>

   <div id="clinic">
      <b>คลินิกรักษาสัตว์</b>

   </div>
   
   <div id="boxform">
         &emsp;
         <button type ="button" onclick="home()" class="hover-underline-animation">หน้าหลัก</button>
         <button type ="button" onclick="pethis()" class="hover-underline-animation">ประวัติสัตว์</button>
         <button type ="button" onclick="date()" class="hover-underline-animation">ตารางนัด</button>
         <button type ="button" onclick="medtable()" class="hover-underline-animation">Medicine stock</button>
         <button type ="button" onclick="emp()" class="hover-underline-animation">บุคลากร</button> &emsp;&emsp;&emsp;&emsp;
         <img id="pic" src="../user.jpg" width="50" height="50">
         <p class="eiei" style="font-size: 1.5em; color: #eb4012;">&emsp;Natthima Noinon</p>&emsp;
         <img id="pic" src="../setting.png" width="50" height="50">

         <div class="c" id="gbox">
            <br>
            <p style="font-size: 1.4em; color: #265a66;">
               <b >&emsp;&emsp;&emsp;&emsp;&emsp;<font size="6">เพิ่มข้อมูลการนัดหมาย</font></b>
            </p>
         </div>
         <br>
    

    <h2 style="font-size: 1.4em; color: #265a66;"class="text-center">&emsp;แบบฟอร์มแก้ไขข้อมูลตารางนัดหมาย</h2>
    <form action="TreatHis_updateData.php" method="POST">
      
        
        <input type="hidden" value="<?php echo $row["TreatmentID"]; ?>" name="id"> 
        <div class="form-group">
            <label for="bookingdate">&emsp; วัน เวลานัดหมาย</label>
            <input type="datetime-local" name="bookdate" id="" value="<?php echo $row["DDate"]?>"
        </div>
        <div class="form-group">
            <label for="Symptom">&emsp;อาการ</label>
            <input type="text" name="symptom" id="" class ="form-control"value="<?php echo $row["Symptom"]?>"
        </div>
        
        <div class="form-group">
            <label for="animalID">&emsp;ID สัตว์เลี้ยง</label>
            <input type="text" name="animalid" id="" class ="form-control"value="<?php echo $row["AnimalID"]?>"
        </div>
        
        <div class="form-group">
            <label for="citizenID">&emsp;ID สัตวแพทย์</label>
            <input type="text" name="citizenid" id="" class ="form-control"value="<?php echo $row["EmpID"]?>"
        </div>
   
        
        <div class="form-group">
        <input style=" border-radius: 50px; padding: 0.4em 1em; background-color:  #265a66; color:#e6e6e6 ;font-size: 1.5em; " type="submit" type="submit" value="อัปเดตข้อมูล" class = "btn btn-success">
        <input style=" border-radius: 50px; padding: 0.4m 1em; background-color: #ac2a2a; color:#e6e6e6 ;font-size: 1.5em; " type="reset" value="ล้างข้อมูล" class = "btn btn-danger">
        <a style=" border-radius: 50px; padding: 0.7em 1em; background-color: #265a66; color:#e6e6e6 ;font-size: 1.5em; margin-left:25cm" href="TreatHis_index.php"class="btn btn-primary" >กลับหน้าแรก</a>
        </div>
   

        </form>
    </div>