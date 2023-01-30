function searchID(){
	
    console.log("asdd")

    let x = document.getElementById("idA").value;
	if (x === "123"){
        document.getElementById("nameP").value = "นายยินดี ไม่มีปัญหา";
        document.getElementById("nameP").value = "นายยินดี ไม่มีปัญหา";
        document.getElementById("idP").value = "1809901060222";
        document.getElementById("address").value = "1/12 ถนนคนเดิน อำเภอเมืองปทุมธานี จังหวัดปทุมธานี 80000";
        document.getElementById("phone").value = "0986957878";
        document.getElementById("nameA").value = "ไข่ต้ม";
        document.getElementById("type").value = "แมว";
        document.getElementById("bDate").value = "1/10/2564";
        document.getElementById("age").value = "1";
        document.getElementById("date1").value = "1/04/2565";
        document.getElementById("treat1").value = "ฉีดวัคซีนพิษสุนัขบ้า";
	}
    else{
        document.getElementById("nameP").value = "-";
        document.getElementById("idP").value = "-";
        document.getElementById("address").value = "-";
        document.getElementById("phone").value = "-";
        document.getElementById("nameA").value = "-";
        document.getElementById("type").value = "-";
        document.getElementById("bDate").value = "-";
        document.getElementById("age").value = "-";
        document.getElementById("date1").value = "-";
        document.getElementById("treat1").value = "-";
        document.getElementById("date2").value = "-";
        document.getElementById("treat2").value = "-";
        document.getElementById("date3").value = "-";
        document.getElementById("treat3").value = "-";
        document.getElementById("date4").value = "-";
        document.getElementById("treat4").value = "-";
    }
	
}

function fixhis(){
    
    document.getElementById("nameP").readOnly = false;
    document.getElementById("idP").readOnly = false;
    document.getElementById("address").readOnly = false;
    document.getElementById("phone").readOnly = false;
    document.getElementById("nameA").readOnly = false;
    document.getElementById("type").readOnly = false;
    document.getElementById("bDate").readOnly = false;
    document.getElementById("age").readOnly = false;
    document.getElementById("date1").readOnly = false;
    document.getElementById("treat1").readOnly = false;
    document.getElementById("date2").readOnly = false;
    document.getElementById("treat2").readOnly = false;
    document.getElementById("date3").readOnly = false;
    document.getElementById("treat3").readOnly = false;
    document.getElementById("date4").readOnly = false;
    document.getElementById("treat4").readOnly = false;
}