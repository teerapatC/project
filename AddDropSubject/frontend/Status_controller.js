main();

async function main() {
    let arr = await getinfo();
    
    let div = document.getElementById('myPadding');
    for (let i = 0 ; i < 1; i++){ 
        let x = "output" + i ;
        let output = document.createElement('div');
        output.id = x;
        output.className = "card text-center";
        output.innerHTML += `<div class="card-header" id = "form_number`+i+`">
                                <h3>แบบฟอร์มที่ ` + (i+1) + `</h3>
                            </div>`
        let sta;
        if(arr.info.Data1.status == null){
            sta = "bg-warning'>รออนุมัติ";
        }else if (arr.info.Data1.status == true){
            sta = "bg-success'>อนุมัติ";
        }else if (arr.info.Data1.status == false){
            sta = "bg-danger'>ไม่อนุมัติ";
        }

        output.innerHTML += `<div class="card text-center" id="output`+i+`">
                            <div class="card-body">
                                <h5><span id="status`+i+`" class='badge rounded-pill ` + sta + `</span></h5>
                                <button class="btn btn-outline-danger" type="button" id="canceled" onclick="deleteCard(`+i+`)">ยกเลิกคำร้อง</button>
                                
                            </div>
                            </div>
                            <div class="card-footer text-muted" id = "date`+i+`">
                            `+arr.info.Data1.date+`
                            </div>`
        let datex = "date" + i;
        let dateStyle = document.getElementById(datex);


        let row = document.createElement('div');
        row.className = 'row';
        row.style = 'padding: 25px';

        //add subject
        let addSub = "";
        console.log(arr.info.Data2.AddSubject.length);
        for(let j = 0; j < arr.info.Data2.AddSubject.length; j++){
            addSub += "<div class='card-body'>" + arr.info.Data2.AddSubject[j].coursecode + "</div>";
        }
        row.innerHTML += `<div class="col-sm-6" id="add`+i+`">
                            <div class="card text-dark bg-light mb-3">
                                
                                    <h5 class="card-header">วิชาที่เพิ่ม</h5>
                                    <div class="card-body">` + addSub +`</div>
                                
                            </div>
                        </div>`


        //withdraw subject
        let witSub = "";
        for(let k = 0; k < arr.info.Data2.withdrawSubject.length; k++){
            witSub += "<div class='card-body'>" + arr.info.Data2.withdrawSubject[k].coursecode + "</div> ";
        }
        row.innerHTML += `<div class="col-sm-6" id="wit`+i+`">
                            <div class="card text-dark bg-light mb-3">
                               
                                    <h5 class="card-header">วิชาที่ถอน</h5>
                                    <div class="card-body">` + witSub + `</div>        
                                
                            </div>
                        </div>`

        //comment
        row.innerHTML += `<div class="col-sm-6 " style="width: 110rem;" id="comment`+i+`">
                            <div class="card text-dark bg-light mb-3">
                            <h5 class="card-header">Comment (ความคิดเห็นจากอาจารย์ที่ปรึษา)</h5>
                                <div class="card-body" >
                                    <div class="card-tital">` + arr.info.Data1.comment + `</div>                              
                                </div>
                            </div>
                            </div>`
        output.appendChild(row);
        div.appendChild(output);
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
var res = await response.json();
return res;
}

async function deleteCard(index) {
    let outx = "output" + index;
    let out = document.getElementById(outx);
    out.innerHTML = "";
    const response = await fetch('http://localhost:3000/studentinfodelete', {
        method: 'get',
        credentials: "include",
        headers: {
            'appkey': 'Lh%TvmX@FW5@%@cWVUpENqm44kEX!78@L3dc94G#^biU5G@9rPnX@%i4pCtpa87^4ruXUmC78FKVh*tBrZFAt%iPM72RanfjwgTV&TWC$pPE^Jhac5MWnd$s7hFr%$aS',
        },
    });
    const res = await response.json();
    console.log(res);
}