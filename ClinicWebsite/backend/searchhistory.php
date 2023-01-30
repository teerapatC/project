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
      <div id="boxform" style="height: 1980px;">
         &emsp;
         <button type ="button" onclick="home()" class="hover-underline-animation">หน้าหลัก</button>
         <button type ="button" onclick="pethis()" class="hover-underline-animation">ประวัติสัตว์</button>
         <button type ="button" onclick="date()" class="hover-underline-animation">ตารางนัด</button>
         <button type ="button" onclick="medtable()" class="hover-underline-animation">Medicine Stock</button>
         <button type ="button" onclick="emp()" class="hover-underline-animation">บุคลากร</button> &emsp;&emsp;&emsp;&emsp;
         <img id="pic" src="../user.jpg" width="50" height="50">
         <p class="eiei" style="font-size: 1.5em; color: #eb4012;">&emsp;Natthima Noinon</p>&emsp;
         <img id="pic" style="cursor: pointer;" onclick="logout()" src="../setting.png" width="50" height="50">
         <div class="c" id="gbox">
            <br>
            <p style="font-size: 1.4em; color: #12788f;">
               <b>&emsp;&emsp;&emsp;&emsp;&emsp;ค้นหาประวัติสัตว์เลี้ยง</b>
            </p>
         </div>
   </form>
   <form action="searchhistory.php" method="get">
         <div class="search-box">
            <button class="btn-search"></button>
            <input type="text" class="input-search" name="a_search" placeholder="กรอกชื่อสัตว์เลี้ยง" id="nameA" required>
            <input type="text" class="input-search" name="o_search" placeholder="กรอกรหัสบัตรประชาชน" id="idO" required>
          </div>
          
   </form>       
   <form action="searchhistory_edit.php" method="post">
          <div class="rights" style="display: block;
          margin-left: auto;
          margin-right: auto;
          margin-top:30px;height:1450px;width:1160px; background-color: #f5f5f5;
          border-radius: 25px;">
            <div style="margin-left: 15%; font-size: 1.3em;" id="treat">
               <br>
               <p style="color: #c7502f;"><b>ข้อมูลเจ้าของ</b></p>
      
               <table style="text-align: left;">
                  <tr>
                     <th><p style="color: #265a66;">ชื่อ</p></th>
                     <th><p style="color: #265a66;">รหัสบัตรประชาชน</p></th>
                  </tr>
                  <tr>

                     <th>
                        
                     <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="o_Name" readonly value="<?php 
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($o_search){
                                 include ('../condb.php');
                                 $sql = "SELECT Name FROM owner 
                                 WHERE CitizenID = '$o_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                       echo $row["Name"];
                                 }
                                 $condb->close();
                              }
                        ?>" name="o_Name"></input>         
                     </th>
                               
                     <th>
                     <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="CitizenID" readonly value="<?php 
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($o_search){
                                 include ('../condb.php');
                                 $sql = "SELECT CitizenID FROM owner 
                                 WHERE CitizenID = '$o_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["CitizenID"];
                                 }
                                 $condb->close();
                              }
                        ?>" name="CitizenID"></input>         
                     </th>

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
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="HouseNo" readonly value="<?php 
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($o_search){
                                 include ('../condb.php');
                                 $sql = "SELECT HouseNo FROM owner 
                                 WHERE CitizenID = '$o_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["HouseNo"];
                                 }
                                 $condb->close();
                              }
                        ?>" name="HouseNo"></input>         
                     </th>
                  <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Street" readonly value="<?php 
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($o_search){
                                 include ('../condb.php');
                                 $sql = "SELECT Street FROM owner 
                                 WHERE CItizenID= '$o_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["Street"];
                                 }
                                 $condb->close();
                              }
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
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="District" readonly value="<?php 
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($o_search){
                                 include ('../condb.php');
                                 $sql = "SELECT District FROM owner 
                                 WHERE CitizenID = '$o_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["District"];
                                 }
                                 $condb->close();
                              }
                        ?>" name="District"></input>
                        </th>
                        <th><input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Province" readonly value="<?php 
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($o_search){
                                 include ('../condb.php');
                                 $sql = "SELECT Province FROM owner 
                                 WHERE CitizenID = '$o_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["Province"];
                                 }
                                 $condb->close();
                              }
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
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Code" readonly value="<?php 
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($o_search){
                                 include ('../condb.php');
                                 $sql = "SELECT Code FROM owner 
                                 WHERE CitizenID = '$o_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["Code"];
                                 }
                                 $condb->close();
                              }
                        ?>" name="Code"></input>
                        </th> 
                  <th>
                  <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Tel" readonly value="<?php 
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($o_search){
                                 include ('../condb.php');
                                 $sql = "SELECT Tel FROM tel_owner
                                 WHERE CitizenID = '$o_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["Tel"];
                                 }
                                 $condb->close();
                              }
                        ?>" name="Tel"></input>         
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
                        $a_search = (isset($_GET['a_search']) ? $_GET['a_search'] : '');
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($a_search){
                                 include ('../condb.php');
                                 $sql = "SELECT animal.AnimalID FROM animal
                                 INNER JOIN owner ON animal.CitizenID = owner.CitizenID                                  
                                 WHERE animal.CitizenID = '$o_search' && animal.Name = '$a_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["AnimalID"];
                                 }
                                 $condb->close();
                              }
                        ?>" name="AnimalID"></input>         
                     </th>
                  </tr>            
                  <tr>
                     <th><p style="color: #265a66;">ชื่อ</p></th>
                     <th><p style="color: #265a66;">ประเภท</p></th>
                  </tr>
                  <tr>

                     <th>
                     <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="a_Name" readonly value="<?php 
                        $a_search = (isset($_GET['a_search']) ? $_GET['a_search'] : '');
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($a_search){
                                 include ('../condb.php');
                                 $sql = "SELECT animal.Name FROM animal
                                 INNER JOIN owner ON animal.CitizenID = owner.CitizenID                                  
                                 WHERE animal.CitizenID = '$o_search' && animal.Name = '$a_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["Name"];
                                 }
                                 $condb->close();
                              }
                        ?>" name="a_Name"></input>             
                     </th>

                     <th>
                     <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Type" readonly value="<?php 
                        $a_search = (isset($_GET['a_search']) ? $_GET['a_search'] : '');
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                        if($a_search){
                           include ('../condb.php');
                           $sql = "SELECT animal.Type FROM animal
                           INNER JOIN owner ON animal.CitizenID = owner.CitizenID                                  
                           WHERE animal.CitizenID = '$o_search' && animal.Name = '$a_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["Type"];
                                 }
                              $condb->close();
                              }
                        ?>" name="Type"></input>  
                     </th>

                  </tr>
                  <tr>
                     <th><p style="color: #265a66;">วันเกิด</p></th>
                     <th><p style="color: #265a66;">อายุ</p></th>
                  </tr>
                  <tr>
                     <th>
                     <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="BirthDate" readonly value="<?php 
                        $a_search = (isset($_GET['a_search']) ? $_GET['a_search'] : '');
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                        if($a_search){
                           include ('../condb.php');
                           $sql = "SELECT animal.BirthDate FROM animal
                           INNER JOIN owner ON animal.CitizenID = owner.CitizenID                                  
                           WHERE animal.CitizenID = '$o_search' && animal.Name = '$a_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["BirthDate"];
                                 }
                              $condb->close();
                              }
                        ?>" name="BirthDate"></input>
                     </th>

                     <th>
                     <input style=" width: 70%;
                        font-size: 20px;
                        border: 1px;
                        padding: 10px 30px;
                        border-radius: 5px;
                        box-sizing: border-box;font-weight: normal; color: #636363;" id="Age" readonly value="<?php 
                        $a_search = (isset($_GET['a_search']) ? $_GET['a_search'] : '');
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                        if($a_search){
                           include ('../condb.php');
                           $sql = "SELECT animal.Age FROM animal
                           INNER JOIN owner ON animal.CitizenID = owner.CitizenID                                  
                           WHERE animal.CitizenID = '$o_search' && animal.Name = '$a_search'";
                                 $result = $condb->query($sql);
                                 while($row = $result->fetch_assoc()) {
                                    echo $row["Age"];
                                 }
                              $condb->close();
                              }
                        ?>" name="Age"></input>
                     </th>

                  </tr>
                  <tr>
                     <th><p style="color: #265a66;">ประวัติการรักษา</p></th>
                  </tr>
                  <tr>
                     <th><p style="font-weight: normal; color: #265a66;">วันที่</p></th>
                     <th><p style="font-weight: normal; color: #265a66;">การเข้ารักษา</p></th>
                  </tr>
                     <?php 
                        $a_search = (isset($_GET['a_search']) ? $_GET['a_search'] : '');
                        $o_search = (isset($_GET['o_search']) ? $_GET['o_search'] : '');
                              if($a_search){
                                 include ('../condb.php');
                                 $sql = "SELECT DDate, Symptom FROM treatmenthistory
                                 INNER JOIN animal ON animal.AnimalID = treatmenthistory.AnimalID 
                                 WHERE animal.CitizenID = '$o_search' && animal.Name = '$a_search'";
                                 $result = $condb->query($sql);
                                 $count = 1;
                                 while($row = $result->fetch_assoc()) {
                                    ?>
                                    <script>
                                       var createinput = document.createElement("input");
                                       var tr = document.createElement("tr");
                                       document.getElementById("table_a").appendChild(tr);
                                       var th = document.createElement("th");
                                       tr.appendChild(th);
                                       createinput.setAttribute("id","DDate"+"<?php echo$count ?>");
                                       createinput.setAttribute("name","DDate"+"<?php echo$count ?>");
                                       createinput.setAttribute("readonly",true);
                                       createinput.setAttribute("style"," width: 70%;font-size: 20px;border: 1px;padding: 10px 30px;border-radius: 5px;box-sizing: border-box;font-weight: normal; color: #636363;");
                                       createinput.setAttribute("value", "<?php echo$row["DDate"]; ?>");
                                       th.appendChild(createinput);
                                    </script>
                                    <?php
                                    ?>
                                    <script>
                                       var createinput = document.createElement("input");
                                       var th = document.createElement("th");
                                       tr.appendChild(th);
                                       createinput.setAttribute("id","Symptom"+"<?php echo$count ?>");
                                       createinput.setAttribute("name","Symptom"+"<?php echo$count ?>");
                                       createinput.setAttribute("readonly",true);
                                       createinput.setAttribute("style"," width: 70%;font-size: 20px;border: 1px;padding: 10px 30px;border-radius: 5px;box-sizing: border-box;font-weight: normal; color: #636363;");
                                       createinput.setAttribute("value", "<?php echo$row["Symptom"]; ?>");
                                       th.appendChild(createinput);
                                    </script>
                                    <?php
                                    $count++;
                                 }
                              $condb->close();
                              }
                     ?>
               </table>
            </div>
         </div>

         <br><br><br>
         <button style="display: block;margin-left: auto;margin-right: auto; margin-top:-20px"id="fixbutton" ></button>               
         </form>
   <script>
      function del(){
         var get_CitizenID = document.getElementById("CitizenID").value;
         var get_AnimalID = document.getElementById("AnimalID").value;
         window.location.href = "/project/backend/del_history.php?CitizenID="+get_CitizenID+"&AnimalID="+get_AnimalID;
         
      }
   </script>
   <?php $a_search = (isset($_GET['a_search']) ? $_GET['a_search'] : '');
         if($a_search){
   ?>      
   <button type="button" style="display: block;margin-left: auto;margin-right: auto; margin-top:10px" id="delbutton" onclick="del()"></button>
   <script> 
         var get_id = document.getElementById('CitizenID').value;
         if(get_id==""){
            document.getElementById("delbutton").style.display = "none";
         }
   </script>
   <?php
         }
   ?>
   
      </div>
   <br>

   <p>&emsp;©สงวนลิขสิทธิ์เฉพาะคลินิกรักษาสัตว์</p>




</body>

</html>