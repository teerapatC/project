<?php
    include ('../condb.php');

    $sql = "SELECT * FROM employee INNER JOIN tel_employee on Employee.EmpID = Tel_employee.EmpID ";
    $result = mysqli_query($condb,$sql);

    $row = mysqli_fetch_assoc($result);
?>
<!DOCTYPE html>
<html>

<head>
   <meta charset="utf-8">
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
            background-color: #eaeaea;
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
            <p style="font-size: 1.4em; color: #12788f;">
               <b>&emsp;&emsp;&emsp;&emsp;&emsp;<font size="6">บุคลากร</font></b>
            </p>
         </div>
         <br><br><br>
         <table style="width:70%  ; margin-left: 15%;">
                <thead>
                  <tr>
                     <td colspan=8  height="80" width="300"> <font size="7" color ="#509897"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;รายชื่อบุคลากร</font><br></td>
                  </tr>
                
                  <tr>
                     <th> <font style="color:#5f5f5d ;" size="5.5"> EmpID </font></th>
                     <th> <font style="color:#5f5f5d ;" size="5.5"> ชื่อ </font></th> 
                     <th> <font style="color:#5f5f5d ;" size="5.5"> ที่อยู่ </font></th> 
                     <th> <font style="color:#5f5f5d ;" size="5.5"> เงินเดือน </font></th> 
                     <th> <font style="color:#5f5f5d ;" size="5.5"> เบอร์มือถือ </font></th> 
                     <th> <font style="color:#5f5f5d ;" size="5.5"> วันที่เริ่มงาน </font></th>
                     <th> <font style="color:#5f5f5d ;" size="5.5"> แก้ไข </font></th>
                     <th> <font style="color:#5f5f5d ;" size="5.5"> ลบ </font></th> 
                  </tr>
                </thead>
                <tbody>
                    <?php while($row=mysqli_fetch_assoc($result)) { ?>
                   <tr>
                        <td><?php echo $row["EmpID"]; ?></td>
                        <td><?php echo $row["Name"]; ?></td>
                        <td><label><?php echo "บ้านเลขที่: ". $row["HouseNo"]."<br>" . " ถนน: ". $row["Street"]. "<br>" . " อำเภอ: ". $row["District"] . "<br>" . " จังหวัด: ". $row["Province"] . "<br>" . " รหัสไปรษณีย์: ". $row["Code"]; ?><label></td>
                        <td><?php echo $row["Salary"]; ?></td>
                        <td><?php echo $row["Tel"]; ?></td>
                        <td><?php echo $row["StartDate"]; ?></td>
                        <td><a href="editForm_employee.php?idemp=<?php echo $row["EmpID"];?>" class="btn">แก้ไข</a></td>
                        <td><a href="deleteEmployee.php?idemp=<?php echo $row["EmpID"];?>" onclick="return confirm('คุณต้องการลบข้อมูลหรือไม่')" class="btn">ลบ</a></td>
                   </tr> 
                   <?php } ?>  
                   <tr>
                     <td colspan=8 height="80" > <button onclick="location.href='/project/backend/employee.php'" id="bbutton"></button></td>
                 </tr>
                </tdody>
         </table>
         <br><br><br>
    </div>

  
   <br>

   <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>




</body>

</html>