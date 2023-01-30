<!DOCTYPE html>
<html>

<head>
   <meta charset="utf-8">
   <script src="function.js"></script>
   <title>คลินิกรักษาสัตว์</title>
   <link rel="stylesheet" href="../style2.css">
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
   <form action="indexCheck.php" method="POST">
      
      <div id="loginbox" id="password" style="background: url('../login.png') no-repeat left 10px top 1px ,#ffffff;
      background-size: 100px;">
         <br>
         <p style="font-size: 23px; 
         color: #0a353f;">
         <b>&emsp;&emsp;&emsp;&ensp;&ensp;&ensp;เข้าสู่ระบบ</b>
         </p>
         
         <input id = iconuser style=" width: 50%;
         margin-top: 6%;
         margin-left: 24%;
         box-sizing: border-box;
         border: none;
         color: #63746c;
         border-radius: 25px;
         font-size: 20px;
         font-family: 'Kanit', sans-serif;
         background: url('../username.png') no-repeat 11px center ,#cededb;
         background-size: 25px;
         padding: 12px 20px 12px 45px;"
         type="text" name="userid" placeholder="username" required>
         <input id = iconpass style=" width: 50%;
         margin-top: 8.5%;
         margin-left: 24%;
         box-sizing: border-box;
         border: none;
         color: #63746c;
         border-radius: 25px;
         font-size: 20px;
         font-family: 'Kanit', sans-serif;
         background: url('../password.png') no-repeat 11px center ,#cededb;
         background-size: 25px;
         padding: 12px 20px 12px 45px;"
         type="text" name="passid" placeholder="password" required>
         <button  type ="submit"  id="loginbutton"></button>
        
      </div>
      
     
   </form>
   <br>

   <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>




</body>

</html>