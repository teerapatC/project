<!DOCTYPE html>
<html>
<?php

// if($_POST['send']=='delete'){
//    $CitizenID = $_POST["CitizenID"];
//    // echo $CitizenID;
//    // exit();
//     echo "<script>";
//     echo "window.location = '/project/backend/del_history.php?CitizenID='+$CitizenID;";
//     echo "</script>";
// }
$count = 0;
$newinput_num =0;
foreach($_POST as $n){
   if($count>12){
      $newinput_num++;
   }
   $count++;
}
$newinput_num = $newinput_num/2-1;
$DDate[$newinput_num] = null;
$Symptom[$newinput_num] = null;
$count_date = 0;
$count_sym = 0;
$count = 0;
foreach($_POST as $n){
   if($count>12){
      if($count%2==1){
         $DDate[$count_date] = $n;
         $count_date++;
      }else{
         $Symptom[$count_sym] =$n;
         $count_sym++;
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

if($CitizenID==""){
   echo "<script>
   window.location.href='searchhistory.php';
   </script>";

}





// echo '<pre>';
// print_r($_POST);
// print($newinput_num);
// print_r($DDate);
// print_r($Symptom);
// echo '</pre>';
// exit();
?>
<head>
   <meta charset="utf-8">
   <!-- <script src="../function.js"></script> -->
   <title>คลินิกรักษาสัตว์</title>
   <link rel="stylesheet" href="../style1.css">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400&display=swap" rel="stylesheet">
   <script src = 'link.js'></script>

   
   <style>

   </style>
</head>

<body style="background-color:#d1ede4;;">

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
   <form>
      <div id="boxform" style="height: 1870px;">
         &emsp;
         <button type ="button" onclick="home()" class="hover-underline-animation">หน้าหลัก</button>
         <button type ="button" onclick="pethis()" class="hover-underline-animation">ประวัติสัตว์</button>
         <button type ="button" onclick="date()" class="hover-underline-animation">ตารางนัด</button>
         <button type ="button" onclick="medtable()" class="hover-underline-animation">Medicine stock</button>
         <button type ="button" onclick="emp()" class="hover-underline-animation">บุคลากร</button> &emsp;&emsp;&emsp;&emsp;
         <img id="pic" src="../user.jpg" width="50" height="50">
         <p class="eiei" style="font-size: 1.5em; color: #eb4012;">&emsp;Natthima Noinon</p>&emsp;
         <img id="pic" style="cursor: pointer;" onclick="logout()" src="../setting.png" width="50" height="50">
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
          margin-top:30px;height:1450px;width:1160px; background-color: #f5f5f5;
          border-radius: 25px;">
            <div style="margin-left: 15%; font-size: 1.3em;" >
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
                  <th><p style="color: #265a66;">บ้านเลขที่</p></th>
                  <th><p style="color: #265a66;">ถนน</p></th>
                  </tr>
                  <tr>
                     
                  <th>
                  <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="HouseNo" required value="<?php
                        echo $HouseNo;
                        ?>" name="HouseNo"></input>         
                     </th>
                  <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Street" required value="<?php
                        echo $Street;
                        ?>" name="Street"></input>
                        </th>         
                  </tr>
                  <tr>
                  <th><p style="color: #265a66;">อำเภอ</p></th>
                  <th><p style="color: #265a66;">จังหวัด</p></th>
                  </tr>
                  <tr>
                  <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="District" required value="<?php
                        echo $District;
                        ?>" name="District"></input>
                        </th>
                        <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Province" required value="<?php
                        echo $Province;
                        ?>" name="Province"></input>
                        </th>
                  </tr>
                  <tr>
                  <th><p style="color: #265a66;">รหัสไปรษณีย์</p></th>
                  <th><p style="color: #265a66;">เบอร์โทรศัพท์</p></th>
                  </tr>
                  <tr>
                  <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Code" required value="<?php
                        echo $Code;
                        ?>" name="Code"></input>
                        </th> 
                  <th>
                  <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Tel" required value="<?php
                        echo $Tel;
                        ?>" name="Tel"" name="Tel"></input>         
                     </th>          
                  </tr> 
               </table>
      
               <p style="color: #c7502f;"><b>ข้อมูลสัตว์</b></p>
               <table style="text-align: left;" id="table_a">

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
                  <?php 
                                 $count = 1;
                                 $round = 0;
                                 while($round<=$newinput_num) {
                                    ?>
                                    <script>
                                       var createinput = document.createElement("input");
                                       var tr = document.createElement("tr");
                                       document.getElementById("table_a").appendChild(tr);
                                       var th = document.createElement("th");
                                       tr.appendChild(th);
                                       createinput.setAttribute("id","DDate"+"<?php echo$count ?>");
                                       createinput.setAttribute("name","DDate"+"<?php echo$count ?>");
                                       createinput.setAttribute("required",true);
                                       createinput.setAttribute("style"," width: 70%;font-size: 20px;border: 1px;padding: 10px 30px;border-radius: 5px;box-sizing: border-box;font-weight: normal; color: #636363;");
                                       createinput.setAttribute("value", "<?php echo$DDate[$round]; ?>");
                                       th.appendChild(createinput);

                                       var hidinput = document.createElement("input");
                                       hidinput.setAttribute("id","oldDDate"+"<?php echo$count ?>");
                                       hidinput.setAttribute("name","oldDDate"+"<?php echo$count ?>");
                                       hidinput.setAttribute("hidden",true);
                                       hidinput.setAttribute("value", "<?php echo$DDate[$round]; ?>");
                                       th.appendChild(hidinput);
                                    </script>
                                    <?php

                                    ?>
                                    <script>
                                       var createinput = document.createElement("input");
                                       var th = document.createElement("th");
                                       tr.appendChild(th);
                                       createinput.setAttribute("id","Symptom"+"<?php echo$count ?>");
                                       createinput.setAttribute("name","Symptom"+"<?php echo$count ?>");
                                       createinput.setAttribute("required",true);
                                       createinput.setAttribute("style"," width: 70%;font-size: 20px;border: 1px;padding: 10px 30px;border-radius: 5px;box-sizing: border-box;font-weight: normal; color: #636363;");
                                       createinput.setAttribute("value", "<?php echo$Symptom[$round]; ?>");
                                       th.appendChild(createinput);

                                       var hidinput = document.createElement("input");
                                       hidinput.setAttribute("id","oldSymptom"+"<?php echo$count ?>");
                                       hidinput.setAttribute("name","oldSymptom"+"<?php echo$count ?>");
                                       hidinput.setAttribute("hidden",true);
                                       hidinput.setAttribute("value", "<?php echo$Symptom[$round]; ?>");
                                       th.appendChild(hidinput);
                                    </script>
                                    <?php
                                    $count++;
                                    $round++;
                                 }        
                     ?>
               </table>
            </div>
         </div>
          
         <br><br><br>
         <button style="display: block;margin-left: auto;margin-right: auto;" id="savebutton" ></button>


      </div>

   </form>
   <br>

   <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>




</body>

</html>