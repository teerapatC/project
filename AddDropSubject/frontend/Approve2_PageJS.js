async function getinfo() {
    const response = await fetch('http://localhost:3000/studentinfo', {
        method: 'get',
        credentials: "include",
        headers: {
            'appkey': 'Lh%TvmX@FW5@%@cWVUpENqm44kEX!78@L3dc94G#^biU5G@9rPnX@%i4pCtpa87^4ruXUmC78FKVh*tBrZFAt%iPM72RanfjwgTV&TWC$pPE^Jhac5MWnd$s7hFr%$aS',
        },
    });
    var res = await response.json();
    return res;
}

async function check() {
    const response = await fetch('http://localhost:3000/auth/verify', {
        method: 'get',
        credentials: "include",
        headers: {
            'appkey': 'Lh%TvmX@FW5@%@cWVUpENqm44kEX!78@L3dc94G#^biU5G@9rPnX@%i4pCtpa87^4ruXUmC78FKVh*tBrZFAt%iPM72RanfjwgTV&TWC$pPE^Jhac5MWnd$s7hFr%$aS',
        },
    });
    const res = await response.json();
    return res;    
}

var stu;
main();
async function main() {
    let res = await getinfo();
    stu = res;

    let cookie = await check();

    let fname = document.getElementById('f_name');
    let lname = document.getElementById('l_name');
    let stuId = document.getElementById('stu_id');
    let year = document.getElementById('year');
    let faculty = document.getElementById('faculty');
    let email = document.getElementById('email');
    let phoneNumber = document.getElementById('phoneNumber');
    let because = document.getElementById('because');

    fname.innerHTML += stu.info.Data1.firstName;
    lname.innerHTML += stu.info.Data1.lastName;
    stuId.innerHTML += stu.info.Data1.studentId;
    year.innerHTML += stu.info.Data1.year;
    faculty.innerHTML += stu.info.Data1.faculty;
    email.innerHTML += cookie.datas.email;
    phoneNumber.innerHTML += stu.info.Data1.phoneNumber;
    because.innerHTML += stu.info.Data2.Because[0].because;


    let addList = document.getElementById('addList');
    let addTbody = document.createElement('tbody');
    for(var i = 0; i < stu.info.Data2.AddSubject.length; i++){
        if(stu.info.Data2.AddSubject[i].teachercheck){
            addTbody.innerHTML += `<tr>
                                    <th scope="row">`+ (i+1) +`</th>
                                    <td>`+ stu.info.Data2.AddSubject[i].coursecode +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].coursename +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].section +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].date +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].credit +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].teacher +`</td>
                                    <td>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled"  disabled checked>
                                            <label class="form-check-label" for="flexCheckDisabled"></label>
                                        </div>
                                    </td>
                                </tr>`
        }else {
            addTbody.innerHTML += `<tr>
                                    <th scope="row">`+ (i+1) +`</th>
                                    <td>`+ stu.info.Data2.AddSubject[i].coursecode +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].coursename +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].section +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].date +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].credit +`</td>
                                    <td>`+ stu.info.Data2.AddSubject[i].teacher +`</td>
                                    <td>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled"  disabled >
                                            <label class="form-check-label" for="flexCheckDisabled"></label>
                                        </div>
                                    </td>
                                </tr>`
        }
    }
    addList.appendChild(addTbody);

    let witList = document.getElementById('witList');
    let witTbody = document.createElement('tbody');
    for(var j = 0; j < stu.info.Data2.withdrawSubject.length; j++){
        if(stu.info.Data2.withdrawSubject[j].teachercheck){
            witTbody.innerHTML += `<tr>
                                    <th scope="row">`+ (j+1) +`</th>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].coursecode +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].coursename +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].section +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].date +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].credit +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].teacher +`</td>
                                    <td>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value=""  id="flexCheckDisabled"  disabled checked>
                                            <label class="form-check-label" for="flexCheckDisabled"></label>
                                        </div>
                                    </td>
                                </tr>`
        }else{
            witTbody.innerHTML += `<tr>
                                    <th scope="row">`+ (j+1) +`</th>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].coursecode +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].coursename +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].section +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].date +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].credit +`</td>
                                    <td>`+ stu.info.Data2.withdrawSubject[j].teacher +`</td>
                                    <td>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value=""  id="flexCheckDisabled"  disabled>
                                            <label class="form-check-label" for="flexCheckDisabled"></label>
                                        </div>
                                    </td>
                                </tr>`
        }
    }
    witList.appendChild(witTbody);
}

function send() {
    //comment
    let comment = document.getElementById('comment').value;
    stu.info.Data1.comment = comment;
 
    //teacher approve
    let approve = document.getElementById('inlineRadio1');
    let notApprove = document.getElementById('inlineRadio2');
    if(approve.checked){
        stu.info.Data1.status = true;
    }
    if(notApprove.checked){
        stu.info.Data1.status = false;
    }

    //upload file
    var sendstu = JSON.stringify(stu.info);
    const endpoint = "http://localhost:3000/upload";
    const formData = new FormData();

    formData.append("PrivateInfo" , sendstu);
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
    }
    window.location.href = 'Approve_Page.html'
}