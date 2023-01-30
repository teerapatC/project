const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const multer = require('multer');
const upload = multer({dest:'./uploads/'});
const fs = require('fs');
const session = require('express-session');
const fetch = require('node-fetch');

const teacher = require("./teacher.json");

const appKey = 'Lh%TvmX@FW5@%@cWVUpENqm44kEX!78@L3dc94G#^biU5G@9rPnX@%i4pCtpa87^4ruXUmC78FKVh*tBrZFAt%iPM72RanfjwgTV&TWC$pPE^Jhac5MWnd$s7hFr%$aS';
const appKeyTU = 'TU0489b72c925ce111d4dec85273ba7e4629d711fa3ad28b3fa68957b3f43ffdcf8b15333d373a293395047a0f1ea449f5';

const sessinit = {
    secret: 'ye6wCHTXBv&*kKBaXSJKKrn&6XAyDPW%V!KwYwFeRsxufs%xo9x*K@Mn!A@r3sD27*Luxx6tmd4pq%Yf@MY&NSYrCef6#JLHsr5uRPpwR3A#ReLA!bPcc!9cimp7Gmj&',
    cookie: {
        maxAge: 1000*60*60,
        sameSite : false,
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(cors({
    origin: "http://localhost:8000",
    credentials: true,
}));
app.use(session(sessinit));

app.get('/auth/logout', (req, res) => {
    if(checkAppKey(req.headers.appkey)) return res.json({message: 'Appkey Error'});
    req.session.destroy();
    return res.json({
        logout: 1
    });
});

app.get('/auth/verify', (req, res) => {
    if(checkAppKey(req.headers.appkey)) return res.json({message: 'Appkey Error'});
    if(req.session.login) {
        return res.json({
            login: 1,
            datas: req.session.info
        });
    }
    res.json({
        login: 0
    });
});

app.post('/ping', (req, res) => {
    if(checkAppKey(req.headers.appkey)) return res.json({message: 'Appkey Error'});
    return res.json({
        text: "pong"
    });
});

app.post('/auth/login', async (req, res) => {
    if(checkAppKey(req.headers.appkey)) return res.json({message: 'Appkey Error'});
    if(!req.body.id || !req.body.password) {
        return res.json({
            login: 0
        });
    };

    if(!/^\d+$/.test(req.body.id)) {
        if(req.body.password !== '123456')
        return res.json({
            login: 0
        });
        const checkLogin = teacher.find((value) => {
            return value.Email == req.body.id;
        });
        if(!checkLogin)
        return res.json({
            login: 0
        });
        req.session.login = true;
        req.session.info = checkLogin;
        return res.json({
            login: 1,
            datas: checkLogin
        });
    }

    const body = {
        "UserName": req.body.id,
        "PassWord": req.body.password
    }

    const response = await fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': appKeyTU
        }
    });

    const resjson = await response.json();

    if(!resjson.status) return res.json({login: 0, message: 'AppkeyTU Error'});

    if(!resjson.status) {
        return res.json({
            login: 0
        });
    } else {
        req.session.login = true;
        req.session.info = resjson;
        return res.json({
            login: 1,
            datas: resjson
        });
    }
});

app.post('/upload', upload.single('inpFile'), (req, res) => {
    if(checkAppKey(req.headers.appkey)) return res.json({message: 'Appkey Error'});
    if(!req.session.login) return res.json({upload: 0, message: 'กรุณาเข้าสู่ระบบก่อนใช้งาน'});
    if(req.session.info.type !== 'student') return res.json({upload: 0, message: 'เฉพาะนักเรียนเท่านั้น'});
    const dir = `./database/student`;
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
    fs.writeFile(`./database/student/${req.session.info.username}.json`, req.body.PrivateInfo, () => {});
    if(req.file) {
        return res.json({
            upload: 1
        });
    }
    return res.json({
        upload: 0
    });
});

app.get('/approveinfo', (req, res) => {
    if(checkAppKey(req.headers.appkey)) return res.json({message: 'Appkey Error'});
    if(!req.session.login) return res.json({upload: 0, message: 'กรุณาเข้าสู่ระบบก่อนใช้งาน'});
    const infoarray = [];
    fs.readdir('./database/student', (err, files) => {
        if(files.length <= 0)
        return res.json({
			get: 0,
            message: 'ไม่มีไฟล์ในฐานข้อมูล'
		});
        for(i = 0; i < files.length; i++) {
            try {
                const info = fs.readFileSync(`./database/student/${files[i]}`);
                infojson = JSON.parse(info);
                infoarray[i] = infojson;
            } catch (err) {
                return res.json({
                    get: 0,
                    message: 'เกิดข้อผิดพลาดในตัว API (ERROR 500)'
                });
            }
        }
        return res.json({
            get: 1,
            info: infoarray
        });
    });
});

app.get('/studentinfo', (req, res) => {
    if(checkAppKey(req.headers.appkey)) return res.json({message: 'Appkey Error'});
    if(!req.session.login) return res.json({upload: 0, message: 'กรุณาเข้าสู่ระบบก่อนใช้งาน'});
    let infojson;
	try {
		const info = fs.readFileSync(`./database/student/${req.session.info.username}.json`);
		infojson = JSON.parse(info);
	} catch (err) {
		return res.json({
			get: 0
		});
	}
	return res.json({
		get: 1,
		info: infojson
	});
});

app.get('/studentinfodelete', (req, res) => {
    if(checkAppKey(req.headers.appkey)) return res.json({message: 'Appkey Error'});
    if(!req.session.login) return res.json({upload: 0, message: 'กรุณาเข้าสู่ระบบก่อนใช้งาน'});
	fs.unlinkSync(`./database/student/${req.session.info.username}.json`);
	return res.json({
		delete: 1
	});
});

app.listen(3000, () => {
  console.log('API Backend running at port 3000');
});

function checkAppKey(key) {
    if(key !== appKey) return true;
    return false;
};
