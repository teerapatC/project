<?php
                 $name = $_POST['userid'];
                 $pass = $_POST['passid'];
             

                 if($name== 'clinic_admin' && $pass=='123456'){
                    echo "<script>";
                echo "alert('เข้าสู่ระบบสำเร็จ');";
                echo "window.location = 'homepage.php';";
                echo "</script>";
             }else{
                echo "<script>";
                echo "alert('เกิดข้อผิดพลาด ไม่สามารถเข้าสู่ระบบได้');";
                echo "window.location = 'index.php';";
                echo "</script>";
                }
                
            ?>