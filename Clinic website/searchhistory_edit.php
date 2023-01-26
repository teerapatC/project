<!DOCTYPE html>
<html>
<?php

$o_Name = $_POST["o_Name"];
$CitizenID = $_POST["CitizenID"];
$HouseNo = $_POST["HouseNo"];
$Tel = $_POST["Tel"];
$a_Name = $_POST["a_Name"];
$AnimalID = $_POST["AnimalID"];
$Type = $_POST["Type"];
$BirthDate = $_POST["BirthDate"];
$Age = $_POST["Age"];
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
// exit();
?>
<head>
   <meta charset="utf-8">
   <script src="function.js"></script>
   <title>คลินิกรักษาสัตว์</title>
   <link rel="stylesheet" href="style1.css">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400&display=swap" rel="stylesheet">
   <style>

   </style>
</head>

<body style="background-color:#d1ede4;;">

   <div>
      <div id="box1" class="eiei"></div>
      <div id="box2" class="eiei"></div>
   </div>

   <div id="logo">
      <img src="logo.png" width="100" height="70">
   </div>

   <div id="clinic">
      <b>คลินิกรักษาสัตว์</b>

   </div>
   <form>
      <div id="boxform" style="height: 1700px;">
         &emsp;
         <button class="hover-underline-animation">หน้าหลัก</button>
         <button class="hover-underline-animation">ประวัติสัตว์</button>
         <button class="hover-underline-animation">ตารางนัด</button>
         <button class="hover-underline-animation">Medecine Stock</button>
         <button class="hover-underline-animation">บุคลากร</button> &emsp;&emsp;&emsp;&emsp;
         <img id="pic" src="user.jpg" width="50" height="50">
         <p class="eiei" style="font-size: 1.5em; color: #eb4012;">&emsp;Natthima Noinon</p>&emsp;
         <img id="pic" src="setting.png" width="50" height="50">

         <div class="c" id="gbox">
            <br>
            <p style="font-size: 1.4em; color: #12788f;">
               <b>&emsp;&emsp;&emsp;&emsp;&emsp;แก้ไขประวัติสัตว์เลี้ยง</b>
            </p>
         </div>

         <!-- <div class="search-box">
            <button type="button" onclick="searchID()" class="btn-search"></button>
            <input type="text" class="input-search" placeholder="กรอกไอดีสัตว์เลี้ยง" id="idA">
          </div> -->
   </form>
   <form action="/project/backend/edit_history.php" method="post">
          <div class="rights" style="display: block;
          margin-left: auto;
          margin-right: auto;
          margin-top:30px;height:1200px;width:1160px; background-color: #f5f5f5;
          border-radius: 25px;">
            <div style="margin-left: 15%; font-size: 1.3em;">
               <br>
               <p style="color: #c7502f;"><b>ข้อมูลเจ้าของ</b></p>
      
               <table style="text-align: left;">
                  <tr>
                     <th><p style="color: #265a66;">ชื่อ</p></th>
                     <th><p style="color: #265a66;">รหัสบัตรประชาชน</p></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="o_Name" required value="<?php
                        echo $o_Name;
                        ?>" name="o_Name"></input></th>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="CitizenID" readonly value="<?php
                        echo $CitizenID;
                        ?>" name="CitizenID"></input></th>
                  </tr>
                  <tr>
                     <th><p style="color: #265a66;">ที่อยู่</p></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 700px;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="HouseNo" required value="<?php
                        echo $HouseNo;
                        ?>" name="HouseNo"></input></th>
                  </tr>
                  <tr>
                     <th><p style="color: #265a66;">เบอร์โทรศัพท์</p></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Tel" required value="<?php
                        echo $Tel;
                        ?>" name="Tel"></input></th>
                  </tr>
               </table>
      
               <p style="color: #c7502f;"><b>ข้อมูลสัตว์</b></p>
               <table style="text-align: left;">

               <tr>
                     <th><p style="color: #265a66;">รหัสสัตว์เลี้ยง</p></th>
                  </tr>
                  <tr>
                  <th>
                  <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="AnimalID" readonly value="<?php
                        echo $AnimalID;
                        ?>" name="AnimalID"></input>         
                     </th>
                  </tr>

                  <tr>
                     <th><p style="color: #265a66;">ชื่อ</p></th>
                     <th><p style="color: #265a66;">ประเภท</p></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="a_Name" required value="<?php
                        echo $a_Name;
                        ?>" name="a_Name"></input></th>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Type" required value="<?php
                        echo $Type;
                        ?>" name="Type"></input></th>
                  </tr>
                  <tr>
                     <th><p style="color: #265a66;">วันเกิด</p></th>
                     <th><p style="color: #265a66;">อายุ</p></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="BirthDate" required value="<?php
                        echo $BirthDate;
                        ?>" name="BirthDate"></input></th>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Age" required value="<?php
                        echo $Age;
                        ?>" name="Age"></input></th>
                  </tr>
                  <tr>
                     <th><p style="color: #265a66;">ประวัติการรักษา</p></th>
                  </tr>
                  <tr>
                     <th><p style="font-weight: normal; color: #265a66;">วันที่</p></th>
                     <th><p style="font-weight: normal; color: #265a66;">การเข้ารักษา</p></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="date1" readonly></input></th>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="treat1" readonly></input></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="date2" readonly></input></th>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="treat2" readonly></input></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="date3" readonly></input></th>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="treat3" readonly></input></th>
                  </tr>
                  <tr>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="date4" readonly></input></th>
                     <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="tr" readonly></input></th>
                  </tr>
               </table>
            </div>
         </div>
          <!-- <iframe id="animalH" src="animalHis.html"  style="height:440px;width:1160px;" >
            
         </iframe> -->
          

         <br><br><br>
         <button  id="fixbutton" ></button>


      </div>

   </form>
   <br>

   <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>




</body>

</html>