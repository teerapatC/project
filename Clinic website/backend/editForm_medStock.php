<?php
    include ('../condb.php');

  $MedID = $_GET["idmed"];

    $sql = "SELECT * FROM medicine WHERE MedID = $MedID";

    $result = mysqli_query($condb,$sql);

    $row = mysqli_fetch_assoc($result);

    
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>คลินิกรักษาสัตว์</title>

    <link rel="stylesheet" href="../style3.css">
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
         <img id="pic" style="cursor: pointer;" onclick="logout()" src="../setting.png" width="50" height="50">
         <div class="c" id="gbox">
            <br>
            <p style="font-size: 1.4em; color: #265a66;">
               <b>&emsp;&emsp;&emsp;&emsp;&emsp;<font size="6">Medicine stock</font></b>
            </p>
         </div>
         <br><br>

        
                  
                    
        <font size="7" color ="#265a66" > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;แก้ไขข้อมูล </font>
                    
    <form action="update_medData.php" method="POST">   
        <input style=" width: 30%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" type="hidden" value="<?php echo $row["MedID"]?>" name="updateid">         
        <div>
            <label for=""><font  style="color:#265a66 ;" size="5.5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; รหัสยา </font></label>
            <input style=" width: 30%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" type="text" id="" name="mid" style="width:372px" value="<?php echo $row["MedID"]?>">
        </div>
        <div>
            <label for=""><font  style="color:#265a66 ;" size="5.5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ชื่อยา </font></label>
            <input style=" width: 30%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;"  type="text" id="" name="med" style="width:372px"value="<?php echo $row["MedName"]?>">
        </div>
        <div>
            <font  style="color:#265a66 ;" size="5.5"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;จำนวนคงเหลือ (มล.) </font>
            <input style=" width: 30%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" type="text" id="" name="qua" style="width:372px" value="<?php echo $row["Quantity"]?>">
        </div>
         <br>
         <button type="button" onclick="location.href='edit_medStock.php'" id="bbutton"></button>     
        <input style ="font-size : 1.5em ; font-family: 'Kanit', sans-serif;" id ="nnbutton" type="submit" value = "บันทึก" onclick="return confirm('คุณต้องบึนทึกการเปลี่ยนแปลงหรือไม่')"></td>
       
                
    </div>
    </form>
    
    <br>
    <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>
</body>
</html>
