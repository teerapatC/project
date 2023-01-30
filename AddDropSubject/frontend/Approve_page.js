main()

async function main() {
    let stu = await getinfo();
    let check1 = await check()
    let div = document.getElementById('myPadding');
    for(let i=0;i<1;i++){
        let x = 'output' + i;
        let output = document.createElement('div');
        output.id = x;
        output.className = "card text-center";
        output.innerHTML += `<div class="card-header" id="name`+i+`">
            <h4>ชื่อ `+stu.info.Data1.gender+stu.info.Data1.firstName+` `+stu.info.Data1.lastName+`</h4>
            </div>`

            let sta;
            if(stu.info.Data1.status == null){
                sta = "bg-warning'>รออนุมัติ";
            }else if (stu.info.Data1.status == true){
                sta = "bg-success'>อนุมัติ";
            }else if (stu.info.Data1.status == false){
                sta = "bg-danger'>ไม่อนุมัติ";
            }

        output.innerHTML += `<div class="card-body" >
            <h6 clss="card-title" id = "email`+i+`">
            E-mail: `+check1.datas.email+`&nbsp&nbsp&nbsp&nbsp 
            </h6><span id ="stu_ID`+i+`">เลขทะเบียนนักศึกษา: `+stu.info.Data1.studentId+`</span>
            <h5><br>
            <span " id = "status`+i+`" class='badge rounded-pill ` + sta + `</span></h5>
        </div>
        <div class="d-grid mx-auto">
        <button type="button" class="btn btn-outline-success" onclick="gonext()">จัดการคำร้อง</button>
        </div>
        <br>
        <div class="card-footer text-muted" id = "date`+i+`">
            `+stu.info.Data1.date+`
        </div></div>`
            div.appendChild(output);
    }
}
function gonext(){
    window.location.href = 'Approve2_Page.html'
}

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
    console.log(res);
    return res;
    }