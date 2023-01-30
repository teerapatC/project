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
   
      <div id="boxform">
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
               <b>&emsp;&emsp;&emsp;&emsp;&emsp;กรอกประวัติสัตว์เลี้ยงที่ไม่มีประวัติเจ้าของ</b>
            </p>
         </div>

         <div id="obox" style="display: inline-block;">

            <br>
            <div class="c">
               <p class="eiei" style="font-size: 2em; color: #f1a470;">&ensp; 1</p>
            </div>

            <div id="inobox" class="d">
               <br>
               <p class="eiei" style="font-size: 1.3em; color: #ffffff;">&emsp;&ensp;ประวัติเจ้าของ</p>
            </div>
            
         </div>
         
         <div id="connect" style="display: inline-block;">

         </div>


         <div id="obox2" style="display: inline-block;">

            <br>
            <div class="c">
               <p class="eiei" style="font-size: 2em; color: #919090">&ensp; 2</p>
            </div>

            <div id="inobox2" class="d">
               <br>
               <p class="eiei" style="font-size: 1.3em; color: #ffffff;">&emsp; ประวัติสัตว์เลีัยง</p>
            </div>
            
         </div>
         

         <br><br>
         <form action = "/project/backend/insert_owner.php" method = "post">
         <p style="font-size: 1.2em; color: #265a66;"><b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;ข้อมูลเจ้าของ</b></p>
          <table>
            <tr>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" name="o_name" placeholder="ชื่อ-นามสกุล" required>
               <span class="border"></span>
            </div></th>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" name="o_id" placeholder="รหัสบัตรประชาชนเจ้าของ" required>
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
                  <input class="input" type="text" name="o_HouseNo" placeholder="บ้านเลขที่" required>
                  <span class="border"></span>
               </div></th>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" name="o_street" placeholder="ถนน" required>
               <span class="border"></span>
            </div></th>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" name="o_district" placeholder="อำเภอ" required>
               <span class="border"></span>
            </div></th>    
            </tr>
          </table>
          <br><br>
          <table>
            <tr>
               <th><div class="content mt-5 mx-auto">
                  <input class="input" type="text" name="o_province" placeholder="จังหวัด" required>
                  <span class="border"></span>
               </div></th>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" name="o_code" placeholder="รหัสไปรษณีย์" required>
               <span class="border"></span>
            </div></th>
              <th><div class="content mt-5 mx-auto">
               <input class="input" type="text" name="o_tel" placeholder="เบอร์โทรศัพท์" required>
               <span class="border"></span>
            </div></th>
            </tr>
          </table>
         <br><br><br>
            <button id="nextbutton"></button>
         </form>

      </div>

   
   <br>

   <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>




</body>

</html>