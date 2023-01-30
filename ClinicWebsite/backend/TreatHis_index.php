<?php
include ('../condb.php');

$sql = "SELECT * FROM Treatmenthistory ORDER BY DDate ASC";
$result = mysqli_query($condb,$sql);

$count =mysqli_num_rows($result);
$order =1;
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
         <img id="pic" style="cursor: pointer;" onclick="logout()" src="../setting.png" width="50" height="50">

         <div class="c" id="gbox">
            <br>
            <p style="font-size: 1.4em; color: #265a66;">
               <b>&emsp;&emsp;&emsp;&emsp;&emsp;<font size="6">ตารางนัด</font></b>
            </p>
         </div>
         <br>

   
        <h1 style="color: #265a66; " class="text-center">&emsp;ข้อมูลตารางนัดหมาย</h1>
      
        <?php if($count>0){?>
            <form action="TreatHis_searchData.php"  class="form-group" method="POST">
            <label for="">&emsp;&emsp;ค้นหาข้อมูลการนัดหมาย</label>
            <input type="text" placeholder="ป้อนIDสัตว์เลี้ยง" name="animal" class="form-control">
            <input style="margin-left:-1.5cm" type="submit" value="Search" class="btn btn-dark my-2">
        </form> 
        
       <br>

    
    
    <table class="table table-dark">
        <thead>
            <tr>
                <th>ลำดับ</th>
                <th>เวลา</th>
                <th>อาการ</th>
                <th>ID สัตว์เลี้ยง</th>
                <th>ID สัตวแพทย์</th>
                <th>แก้ไขข้อมูล</th>
                <th>ลบข้อมูล</th>
                <th>ลบข้อมูล (Checkbox)</th>
            </tr>
        </thead>
        <tbody>
        <?php while($row = mysqli_fetch_assoc($result)){?>
                <tr>
                    <td><?php echo $order++; ?> </td>
                    <td><?php echo $row["DDate"]; ?></td>
                    <td><?php echo $row["Symptom"]; ?></td>
                    <td><?php echo $row["AnimalID"]; ?></td>
                    <td><?php echo $row["EmpID"]; ?></td>

                    
                    
                    
                    
                  
                    <td>
                    <a href="TreatHis_editForm.php?id=<?php echo $row["TreatmentID"]?>" class="btn btn-primary">แก้ไข</a>




                    </td>

                    <td>
                    <a href="TreatHis_deleteQueryString.php?idemp=<?php echo $row["TreatmentID"] ?>" 
                    class="btn btn-danger"
                    onclick="return confirm('คุณต้องการลบข้อมูลหรือไม่')"> ลบข้อมูล </a>
                    </td>
                    <form action="TreatHis_multipleDelete.php" method="POST">
                    <td>
                    <input type="checkbox"  name="idcheckbox[]" value="<?php echo $row["TreatmentID"];?>">
                     </td>
                          
            
            </tr>
                <?php } ?>

        </tbody>
    </table>
    
    <?php } else {?>
        <div class="alert alert-danger">
        <b style = "color:#5f5f5d; font-size: 30px; text-align: center; margin-left:7cm">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;ไม่มีข้อมูลตารางการนัดหมายในฐานข้อมูล</b>
        </div>
        <?php } ?>
    
<br>
    <a style=" border-radius: 50px; padding: 0.4em 1em; background-color: #265a66; color:#e6e6e6 ;font-size: 1.5em; margin-left:2cm" href="TreatHis_insertForm.php" class="btn btn-success">เพิ่มข้อมูลการนัดหมาย</a>

     <?php if($count>0){?>
    <input style=" border-radius: 50px; padding: 0.4em 1em ;color:#e6e6e6; background-color:#80003A ;font-size: 1.5em;  width: 7cm; margin-left: 350px;" type="submit" value="ลบข้อมูล(Checkbox)" class="btn btn-danger" style="float: right;">
    <?php } ?>
    </form>  
    
    <?php if($count>0){?>
        <button style=" border-radius: 50px; padding: 0.4em 1em; color:  #e6e6e6; background-color:#f1a470 ;font-size: 1.5em; "  class="btn btn-warning" onclick="checkAll()">เลือกทั้งหมด</button>
        <button style=" border-radius: 50px; padding: 0.4em 1em; color:  #e6e6e6; background-color:#ac2a2a ;font-size: 1.5em; "  class="btn btn-warning" onclick="uncheckAll()"> ยกเลิกทั้งหมด </button>

    <?php } ?>
   
    
   
</body>

<script>
    function checkAll(){
        var form_element=document.forms[1].length;
        for(i=0;i<form_element-1;i++){
            document.forms[1].elements[i].checked=true;

        }
}

function uncheckAll(){
        var form_element=document.forms[1].length;
        for(i=0;i<form_element-1;i++){
            document.forms[1].elements[i].checked=false;

        }
}
</script>

</html>