<?php
    include ('../condb.php');

    $EmpID = $_GET["idemp"];

    $sql = "SELECT * FROM employee INNER JOIN tel_employee on employee.EmpID = tel_employee.EmpID WHERE employee.EmpID = $EmpID ";
    $result = mysqli_query($condb,$sql);

    $row = mysqli_fetch_assoc($result);

?>

<!DOCTYPE html>
<html>

<head>
   <meta charset="utf-8">
   <title>คลินิกรักษาสัตว์</title>
   <link rel="stylesheet" href="../style1.css">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400&display=swap" rel="stylesheet">
   <script src = 'link.js'></script>

   <style>
      
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
      <div id="boxform" style="height: 1000px;">
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
               <b>&emsp;&emsp;&emsp;&emsp;&emsp;กรอกข้อมูลบุคลากร</b>
            </p>
         </div>

         <div id="obox" style="display: inline-block;">

            <br>
            <div class="c">
               <p class="eiei" style="font-size: 2em; color: #f1a470;">&ensp; </p>
            </div>

            <div id="inobox" class="d">
               <br>
               <p class="eiei" style="font-size: 1.3em; color: #ffffff;">&emsp;&ensp;ข้อมูลบุคคลากร</p>
            </div>
            
         </div>
         
         
        <form action = "/project/backend/update_employee.php" method = "post">
         <br><br>
         <p style="font-size: 1.2em; color: #265a66;"><b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;ข้อมูลบุคคลากร</b></p>
          <table>
            <tr>
              <th><div class="content mt-5 mx-auto">
              <input class="input" type="text" name="e_id" placeholder="รหัสพนักงาน" value="<?php echo $row["EmpID"]?>">     
               <span class="border"></span>
            </div></th>
              <th><div class="content mt-5 mx-auto">
              <input class="input" type="text" name="e_name" placeholder="ชื่อ" value="<?php echo $row["Name"]?>">
               <span class="border"></span>
            </div></th>
            <th><div></div></tr>
            </table>
            <br><br>
            <table>
            <th><div class="content mt-5 mx-auto">
                <input class="input" type="text" value="<?php echo $row["StartDate"]?>" name="e_startDate" placeholder="วันที่เริ่มงาน">
                 <span class="border"></span>
            </div></th>
            <th><div class="content mt-5 mx-auto">
                <input class="input" type="text" value="<?php echo $row["Salary"]?>" name="e_salary" placeholder="เงินเดือน">
                 <span class="border"></span>
            </div></th>
              <th><div>
            </div></th>
            </tr>
          </table>

         <br>

         <p style="font-size: 1.2em; color: #265a66;"><b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;ที่อยู่</b></p>
         
         <table>
            <tr>
            <th><div class="content mt-5 mx-auto">
                  <input class="input" type="text" value="<?php echo $row["HouseNo"]?>" name="e_houseNo" placeholder="บ้านเลขที่">
                  <span class="border"></span>
            </div></th>   
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" value="<?php echo $row["Street"]?>" name="e_street" placeholder="ถนน">
               <span class="border"></span>
            </div></th>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" value="<?php echo $row["District"]?>" name="e_district" placeholder="อำเภอ">
               <span class="border"></span>
            </div></th>
              
            </tr>
          </table>
          <br><br>
          <table>
            <tr>
               <th><div class="content mt-5 mx-auto">
                  <input class="input" type="text" value="<?php echo $row["Province"]?>" name="e_province" placeholder="จังหวัด">
                  <span class="border"></span>
               </div></th>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" value="<?php echo $row["Code"]?>" name="e_code" placeholder="รหัสไปรษณีย์">
               <span class="border"></span>
            </div></th>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" value="<?php echo $row["Tel"]?>"name="e_tel" placeholder="เบอร์โทรศัพท์">
               <span class="border"></span>
            </div></th>
            </tr>
          </table>
         <br><br><br>
         <button onclick="location.href='/project/backend/edit_employee.php'" id="nbutton" onclick="return confirm('คุณต้องบึนทึกการเปลี่ยนแปลงหรือไม่')>
         <input type="submit" value="บันทึกการแก้ไข" onclick="return confirm('คุณต้องบึนทึกการเปลี่ยนแปลงหรือไม่')"></td>
          

            </div>
        </form>
   <br>

   <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>




</body>

</html>