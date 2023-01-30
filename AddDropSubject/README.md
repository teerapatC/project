# วิธีการติดตั้ง
สิ่งที่ต้องมี
- python (ไว้เปิด http.server)
- nodejs (16+)

ทำการโหลดไฟล์ทั้งหมด
ทำการติดตั้ง npm i
รันตัวหลังบ้าน node index.js

ทำการเข้าไปใน folder ตัวอย่าง
พิมพ์ python -m http.server
เข้าไปที่ http://localhost:8000/

ลองใช้งาน

```javascript
appKey = 'Lh%TvmX@FW5@%@cWVUpENqm44kEX!78@L3dc94G#^biU5G@9rPnX@%i4pCtpa87^4ruXUmC78FKVh*tBrZFAt%iPM72RanfjwgTV&TWC$pPE^Jhac5MWnd$s7hFr%$aS';
```

## วิธีการใช้เบื้องต้น
```javascript
const response = await fetch('http://endpoint/ping', {
            method: "post",
            headers: {
                    'appkey': 'appKey'
                }
        });

ค่าที่คาดว่าจะได้รับ
{
    "text": "pong"
}
```
## /auth/logout
```javascript
const response = await fetch('http://endpoint/auth/logout', {
            method: "get",
            headers: {
                    'appkey': 'appKey'
                }
        });

ค่าที่คาดว่าจะได้รับ
{
    "logout": 0
}
```
## /auth/verify
```javascript
const response = await fetch('http://endpoint/auth/verify', {
            method: "get",
            headers: {
                    'appkey': 'appKey'
                }
        });

ค่าที่คาดว่าจะได้รับ
{
    "login": 0
}
หรือ
{
    "login": 1,
    "datas": {
        "status": true,
        "message": "Success",
        "type": "student",
        "username": "6300000000",
        "tu_status": "ปกติ",
        "statusid": "00",
        "displayname_th": "สมชาย สมชาย",
        "displayname_en": "Somchai Somchai",
        "email": "som.chat@dome.tu.ac.th",
        "department": "ภาควิชาวิทยาการคอมพิวเตอร์",
        "faculty": "คณะวิทยาศาสตร์และเทคโนโลยี"
    }
}
หรือ
{
    "login": 1,
    "datas": {
        "First_Name_Th": "ทรงศักดิ์",
        "Last_Name_Th": "รองวิริยะพานิช",
        "First_Name_En": "SONGSAKDI",
        "Last_Name_En": "RONGVIRIYAPANISH",
        "Faculty_Name_Th": "คณะวิทยาศาสตร์และเทคโนโลยี",
        "Faculty_Name_En": "Faculty of Science and Technology",
        "Email": "rongviri@staff.tu.ac.th"
    }
}
```

## /auth/login
```javascript
body = {
    "id": id,
    "password": password
}

หรือ

body = {
    "id": "emailอาจารย์",
    "password": "123456"
}

const response = await fetch('http://endpoint/auth/verify', {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                    'appkey': 'appKey'
                }
        });

ค่าที่คาดว่าจะได้รับ
{
    "login": 0
}
หรือ
{
    "login": 1,
    "datas": {
        "status": true,
        "message": "Success",
        "type": "student",
        "username": "6300000000",
        "tu_status": "ปกติ",
        "statusid": "00",
        "displayname_th": "สมชาย สมชาย",
        "displayname_en": "Somchai Somchai",
        "email": "som.chat@dome.tu.ac.th",
        "department": "ภาควิชาวิทยาการคอมพิวเตอร์",
        "faculty": "คณะวิทยาศาสตร์และเทคโนโลยี"
    }
}
หรือ
{
    "login": 1,
    "datas": {
        "First_Name_Th": "ทรงศักดิ์",
        "Last_Name_Th": "รองวิริยะพานิช",
        "First_Name_En": "SONGSAKDI",
        "Last_Name_En": "RONGVIRIYAPANISH",
        "Faculty_Name_Th": "คณะวิทยาศาสตร์และเทคโนโลยี",
        "Faculty_Name_En": "Faculty of Science and Technology",
        "Email": "rongviri@staff.tu.ac.th"
    }
}
```

## /upload กรุณาดูตัวอย่างในโฟลเดอร์ "ตัวอย่าง"
