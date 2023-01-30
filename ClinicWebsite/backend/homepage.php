<!DOCTYPE html>
<html>

<head>
   <meta charset="utf-8">
   <title>คลินิกรักษาสัตว์</title>
   <link rel="stylesheet" href="../style2.css">
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
   <form>
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
         <div class="c" id="gboxhome">
            <img class ="center"  src="../vet_clinic_phuket_thai_residential.jpg";>
         </div>

        

         


         <div id="addhistory" style="display: inline-block;">

            <br>
            <div class="c">
               <p class="eiei" style="font-size: 1.4em; color: #f1a470;font-weight:bold;">&ensp;&ensp; กรอกประวัติสัตว์เลีัยง</p>
            </div>

           
         </div>
         <br><br><br>

        
         <div class="inner"><button type ="button" onclick= "hasown()" id="oldbutton"></button></div>
         <div class="inner"><button  type ="button" onclick= "noown()" id="newbutton"></button></div>
        
         <p style= "font-size: 24px; color: #265a66; margin-left: 14.84cm;">มีประวัติเจ้าของ &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;ไม่มีประวัติเจ้าของ</p>
          
         


      </div>

   </form>
   <br>

   <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>




</body>

</html>