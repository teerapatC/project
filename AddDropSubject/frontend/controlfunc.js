let add = document.getElementById("add");
let withDraw = document.getElementById("withdraw");
let tableAdd = document.getElementById("addtable");
let tableWit = document.getElementById("withdrawtable");
var subject={AddSubject:[],withdrawSubject:[],Because:[]};
var finalInfo = {};
var alertMessage = "";
var JSONINFO;
var subjectlist;

function addjson(){
    extractor()
    

    for(let i=1;i<=withDraw.value;i++){
        let withinfo ={
            coursecode: document.getElementById('codewd'+i+'0').value,
            coursename: document.getElementById('codewd'+i+'1').value,
            section: document.getElementById('codewd'+i+'2').value,
            date: document.getElementById('codewd'+i+'3').value,
            credit: document.getElementById('codewd'+i+'4').value,
            teacher: document.getElementById('codewd'+i+'5').value,
            teachercheck: document.getElementById('codewd'+i+'6').checked
        }
        subject.withdrawSubject.push(withinfo);
    }
    for(let j=1; j<=add.value; j++){
        let addinfo ={
            coursecode: document.getElementById('codeadd'+j+'0').value,
            coursename: document.getElementById('codeadd'+j+'1').value,
            section: document.getElementById('codeadd'+j+'2').value,
            date: document.getElementById('codeadd'+j+'3').value,
            credit: document.getElementById('codeadd'+j+'4').value,
            teacher: document.getElementById('codeadd'+j+'5').value,
            teachercheck: document.getElementById('codeadd'+j+'6').checked
        }
        subject.AddSubject.push(addinfo);
    }
    
    let motive ={
        because: document.getElementById("because").value
    }
    subject.Because.push(motive);
}

function checkinput(){

    if(checker()){
        if(add.value == 0 && withDraw.value == 0){
            alert("กรุณากรอกรายวิชาที่ต้องการเพิ่ม-ถอน");
            return false;
        }
    
        for(let i=1;i<=add.value;i++){
            if(document.getElementById('codeadd'+i+'0').value == ""){
                alert("กรุณากรอกรหัสวิชาที่ต้องการเพิ่ม");
                return false;
            }
            if(document.getElementById('codeadd'+i+'1').value == ""){
                alert("กรุณกรอกชื่อวิชาที่ต้อการเพิ่ม");
                return false;
            }
            if(document.getElementById('codeadd'+i+'2').value == ""){
                alert("กรุณกรอกsectionรายวิชาที่ต้องการเพิ่ม");
                return false;
            }
            if(document.getElementById('codeadd'+i+'3').value == ""){
                alert("กรุณกรอกวันที่/เวลารายวิชาที่ต้องการเพิ่ม");
                return false;
            }
            if(document.getElementById('codeadd'+i+'4').value == ""){
                alert("กรุณากรอกหน่วยกิตรายวิชาที่ต้องการเพิ่ม");
                return false;
            }
            if(document.getElementById('codeadd'+i+'5').value == ""){
                alert("กรุณากรอกชื่อผู้สอนรายวิชาที่ต้องการเพิ่ม");
                return false;
            }
        }
    
        for(let i=1;i<=withDraw.value;i++){
            if(document.getElementById('codewd'+i+'0').value == ""){
                alert("กรุณากรอกรหัสวิชาที่ต้องการถอน");
                return false;
            }
            if(document.getElementById('codewd'+i+'1').value == ""){
                alert("กรุณกรอกชื่อวิชาที่ต้องการถอน");
                return false;
            }
            if(document.getElementById('codewd'+i+'2').value == ""){
                alert("กรุณกรอกsectionรายวิชาที่ต้องการถอน");
                return false;
            }
            if(document.getElementById('codewd'+i+'3').value == ""){
                alert("กรุณกรอกวันที่รายวิชาที่ต้องการถอน");
                return false;
            }
            if(document.getElementById('codewd'+i+'4').value == ""){
                alert("กรุณากรอกหน่วยกิตรายวิชาที่ต้องการถอน");
                return false;
            }
            if(document.getElementById('codewd'+i+'5').value == ""){
                alert("กรุณากรอกชื่อผู้สอนรายวิชาที่ต้องการถอน");
                return false;
            }
        }
    }
    else{
        alert(alertMessage);
        return false;
    }
    
    return true;


    
}

function addplus() {
    add.value++;
    addTable(tableAdd, add.value, "add");
}

function addminus() {
    if (add.value > 0){
    	deleteTable(tableAdd, add.value, "add");
    	add.value--;
    }
}

function withdrawplus() {
    withDraw.value++;
    addTable(tableWit, withDraw.value, "wd");
}

function withdrawminus() {
    if (withDraw.value > 0){
    	deleteTable(tableWit, withDraw.value, "wd");
      withDraw.value--;
  }
}

//AddTablefunc
function addTable(table, count, name) {
    var trElement = document.createElement("tr");
    trElement.id = name + count;
    trElement.innerHTML += '<td>' + count + '</td>';

    for (var i = 0; i < 4; i++){
        trElement.innerHTML += '<td><input class="form-control" id="code'+name+count+ i +'" type="text" name="" required></td>';
    }
    trElement.innerHTML += '<td><input class="form-control" id="code'+name+count+ 4 +'" type="number" name="" min="1" required></td>';
    trElement.innerHTML += '<td><input class="form-control" type="text" id="code'+name+count+ 5 +'" name="" required></td>';
    trElement.innerHTML += '<td><input class="form-checkbox" type="checkbox" name="" id="code'+name+count+ 6 +'" ></td>';
    table.appendChild(trElement);
}

//DeleteTablefunc
function deleteTable(table, count, name){
	let trElements = document.querySelectorAll("#" + name + count);
	for(let trElement of trElements){
		table.removeChild(trElement);
	}
}




//reset all variable
function reset(){
    alertMessage = "";
    finalInfo = {};
}

//checking all input
function checker(){
    //reset
    reset();
    //all values from form
    
    let firstName   = document.getElementById('f_name').value;
    let lastName    = document.getElementById('l_name').value;
    
    let studentId   = document.getElementById('stu_id').value;
    let faculty     = document.getElementById('faculty').value;
    
    let houseNum    = document.getElementById('houseNum').value;
    let moo         = document.getElementById('moo').value;
    let subDistrict = document.getElementById('subDistrict').value;
    let district    = document.getElementById('district').value;
    let province    = document.getElementById('province').value;
    let postalCode  = document.getElementById('postalCode').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let housePhone  = document.getElementById('housePhone').value;
    let advisor     = document.getElementById('advisor').value;
    let inpFile     = document.getElementById('inpFile').value;

    //Validating input
    if( firstName == "" || lastName == ""){
        alertMessage += "Please provide your Name!!\n";
        return false;
    }
    if(studentId == "") {
        alertMessage +="Please enter Student ID\n ";
        return false;
    }
    if(studentId != ""){
        if(studentId.length != 10){
            alertMessage += "Student ID must be 10 digits\n";
            return false;
        }
        else if(isNaN(studentId)){
        alertMessage += "Student ID must be digits only!!\n";
        return false;
        }
    }
    
    if(faculty == ""){
        alertMessage += "Please enter Faculty!!\n";
        return false;
    }
    if(houseNum == ""){
        alertMessage += "Please enter House number!!\n";
        return false;
    }
    if(moo == ""){
        alertMessage += "Please enter Moo!!\n";
        return false;
    }
    if(isNaN(moo)){
        alertMessage += "Moo must be digits only!!\n";
        return false;
    }
    if(subDistrict == ""){
        alertMessage += "Please enter Sub-District!!\n";
        return false;
    }
    if(district == ""){
        alertMessage += "Please enter District!!\n";
        return false;
    }
    if(province == ""){
        alertMessage += "Please enter Province!!\n";
        return false;
    }

    if(postalCode == ""){
        alertMessage += "Please enter Postal-Code!!\n";
        return false;
    }
    else{
        if(isNaN(postalCode) ){
            alertMessage += "Postal-Code must be Digits!!\n";
            return false;
        }
        if(postalCode.length != 5){
            alertMessage += "Postal-Code must contain 5 Digits!!\n";
            return false;
        }
    }
    
    if(phoneNumber == ""){
        alertMessage += "Please enter Phone number!!\n";
        return false;
    }
    if(phoneNumber != ""){
        if(isNaN(phoneNumber) || phoneNumber.length != 10){
            alertMessage += "Phone number must be 10 digits!!\n";
            return false;
        }
        else if(phoneNumber.charAt(0) != '0'){
            alertMessage += "Phone number must start with 0 \n";
            return false;
        }
    }
    
    //opional
    if(housePhone != ""){
        
        if(isNaN(housePhone) || housePhone.length != 9){
            alertMessage += "Laneline phone number must be 9 digits!!\n";
            return false;
        }
        else if(housePhone.charAt(0) != '0'){
            alertMessage += "Lanline phone number must start with 0\n";
            return false;
        }
    }
    if(advisor == ""){
        alertMessage += "Please enter Advisor name!!\n";
        return false;
    }
    if(because == "" ){
        alertMessage += "Please comment reason!!\n";
        return false;
    }
    if(inpFile == ""){
        alertMessage += "Please Upload file!!";
        return false;
    }
    //if can pass all condition
    return true;

}

function extractor(){
    //all values from form
    let gender      = document.getElementById('gender').value;
    let firstName   = document.getElementById('f_name').value;
    let lastName    = document.getElementById('l_name').value;
    let year        = document.getElementById('year').value;
    let studentId   = document.getElementById('stu_id').value;
    let faculty     = document.getElementById('faculty').value;
    
    let houseNum    = document.getElementById('houseNum').value;
    let moo         = document.getElementById('moo').value;
    let subDistrict = document.getElementById('subDistrict').value;
    let district    = document.getElementById('district').value;
    let province    = document.getElementById('province').value;
    let postalCode  = document.getElementById('postalCode').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let housePhone  = document.getElementById('housePhone').value;
    let advisor     = document.getElementById('advisor').value;
    let date        = document.getElementById('date').value;

    //input all file to array
    finalInfo['gender']          = gender;
    finalInfo['firstName']       = firstName;
    finalInfo['lastName']        = lastName;
    finalInfo['year']            = year;
    finalInfo['studentId']       = studentId ;
    finalInfo['faculty']         = faculty ;
    finalInfo['houseNum']        = houseNum ;
    finalInfo['moo']             = moo ;
    finalInfo['subDistrict']     = subDistrict;
    finalInfo['district']        = district ;
    finalInfo['province']        = province ;
    finalInfo['postalCode']      = postalCode ;
    finalInfo['phoneNumber']     = phoneNumber ;
    finalInfo['status']          = null;
    finalInfo['comment']         = "";
    finalInfo['date']            = date;


    if(housePhone != ''){
        finalInfo['housePhone']  = housePhone;
    }
    finalInfo['advisor']         = advisor ;
}

function send(){
    
    if(checkinput()){
        addjson();
        var FinalArray = {};

        FinalArray['Data1'] = finalInfo;
        FinalArray['Data2'] = subject;


        var FinalToSend = JSON.stringify(FinalArray);

        const inpFile = document.getElementById("inpFile");
        
        
        
        const endpoint = "http://localhost:3000/upload";
            const formData = new FormData();

            formData.append("inpFile", inpFile.files[0]);
            formData.append("PrivateInfo" , FinalToSend);

            uploadfile();

            async function uploadfile() {
                const response = await fetch(endpoint, {
                    method: "post",
                    body: formData,
					credentials: "include",
					headers: {
						'appkey': 'Lh%TvmX@FW5@%@cWVUpENqm44kEX!78@L3dc94G#^biU5G@9rPnX@%i4pCtpa87^4ruXUmC78FKVh*tBrZFAt%iPM72RanfjwgTV&TWC$pPE^Jhac5MWnd$s7hFr%$aS',
					},
                });

                const resjson = await response.json();

                const showstatus = document.getElementById('status');

                if(resjson.upload === 1) {
                    showstatus.innerHTML = 'อัปโหลดสำเร็จ';
                    //Change html
                } else {
                    showstatus.innerHTML = 'อัปโหลดไม่สำเร็จ';
                }
            }


        
    }
    
    
}


async function getinfo() {
    const response = await fetch('http://localhost:3000/studentinfo', {
        method: 'get',
        credentials: "include",
        headers: {
            'appkey': 'Lh%TvmX@FW5@%@cWVUpENqm44kEX!78@L3dc94G#^biU5G@9rPnX@%i4pCtpa87^4ruXUmC78FKVh*tBrZFAt%iPM72RanfjwgTV&TWC$pPE^Jhac5MWnd$s7hFr%$aS',
        },
    });

    const res = await response.json();
    console.log(res);
    if(res["get"]!=0){
        console.log(res["info"]["Data1"]["firstName"]);
        document.getElementById("date").value = res["info"]["Data1"]["date"];
        document.getElementById("gender").value = res["info"]["Data1"]["gender"];
        document.getElementById("f_name").value = res["info"]["Data1"]["firstName"];
        document.getElementById("l_name").value = res["info"]["Data1"]["lastName"];
        document.getElementById("stu_id").value = res["info"]["Data1"]["studentId"];
        document.getElementById("year").value = res["info"]["Data1"]["year"];
        document.getElementById("faculty").value = res["info"]["Data1"]["faculty"];

        document.getElementById("moo").value = res["info"]["Data1"]["moo"];
        document.getElementById("subDistrict").value = res["info"]["Data1"]["subDistrict"];
        document.getElementById("district").value = res["info"]["Data1"]["district"];
        document.getElementById("province").value = res["info"]["Data1"]["province"];
        document.getElementById("postalCode").value = res["info"]["Data1"]["postalCode"];
        document.getElementById("phoneNumber").value = res["info"]["Data1"]["phoneNumber"];
        document.getElementById("houseNum").value = res["info"]["Data1"]["houseNum"];
        if(res["info"]["Data1"]["housePhone"] != undefined)
            document.getElementById("housePhone").value = res["info"]["Data1"]["housePhone"];
        else document.getElementById("housePhone").value = "";
        document.getElementById("advisor").value = res["info"]["Data1"]["advisor"];

        console.log(res["info"]["Data2"]);
        for(let i=1; i<=res["info"]["Data2"]["AddSubject"].length; i++){
            addplus();
            document.getElementById("codeadd"+i+'0').value = res["info"]["Data2"]["AddSubject"][i-1]["coursecode"];
            document.getElementById("codeadd"+i+'1').value = res["info"]["Data2"]["AddSubject"][i-1]["coursename"];
            document.getElementById("codeadd"+i+'2').value = res["info"]["Data2"]["AddSubject"][i-1]["section"];
            document.getElementById("codeadd"+i+'3').value = res["info"]["Data2"]["AddSubject"][i-1]["date"];
            document.getElementById("codeadd"+i+'4').value = res["info"]["Data2"]["AddSubject"][i-1]["credit"];
            document.getElementById("codeadd"+i+'5').value = res["info"]["Data2"]["AddSubject"][i-1]["teacher"];
            document.getElementById("codeadd"+i+'6').checked = res["info"]["Data2"]["AddSubject"][i-1]["teachercheck"];
        }
        for(let i=1; i<=res["info"]["Data2"]["withdrawSubject"].length; i++){
            withdrawplus();
            document.getElementById("codewd"+i+'0').value = res["info"]["Data2"]["withdrawSubject"][i-1]["coursecode"];
            document.getElementById("codewd"+i+'1').value = res["info"]["Data2"]["withdrawSubject"][i-1]["coursename"];
            document.getElementById("codewd"+i+'2').value = res["info"]["Data2"]["withdrawSubject"][i-1]["section"];
            document.getElementById("codewd"+i+'3').value = res["info"]["Data2"]["withdrawSubject"][i-1]["date"];
            document.getElementById("codewd"+i+'4').value = res["info"]["Data2"]["withdrawSubject"][i-1]["credit"];
            document.getElementById("codewd"+i+'5').value = res["info"]["Data2"]["withdrawSubject"][i-1]["teacher"];
            document.getElementById("codewd"+i+'6').checked = res["info"]["Data2"]["withdrawSubject"][i-1]["teachercheck"];
        }
        document.getElementById("because").value = res["info"]["Data2"]["Because"][0]["because"];

    }
}
getinfo();












