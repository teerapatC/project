import express from "express"
import { Server } from "socket.io"
import cors from "cors"
import mysql from "mysql"
import multer from "multer"
import path from "path"
import fs from "fs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Axios from "axios"
const secret = 'pliangamessystem182543'
const salt = 10
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json()) 
app.use(express.static('public'))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : 
        ["http://localhost:3000", "http://127.0.0.1:3000"]
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname +"_"+ Date.now() +path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "Pliangamessystem"
})

app.post('/signup', (req,res) => {
    db.query("SELECT * FROM useraccount WHERE username = ?",[req.body.username], async (err,result) => {
        if(err){
            console.log(err)
            return
        }else if(result.length > 0){
            return res.status(400).json({success: false, message: "Username already exists"})
        }else{
            const hashedPassword = await bcrypt.hash(req.body.password,salt)
            const sql = "INSERT INTO useraccount (name, userName, userPassword, totalSwaps, tel, houseNo, district, province, zipCode) VALUES(?,?,?,?,?,?,?,?,?)"
            db.query(sql, [req.body.name, req.body.username, hashedPassword, 0, req.body.tel, req.body.houseno, req.body.district, req.body.province, req.body.zip],
            (err,result) => {
                if(err){
                    console.log(err)
                }else{
                    res.send(result)
                }
            })
        }
    })
    
}) 

app.post('/login', (req,res) => {
    const sql = "SELECT * FROM useraccount WHERE username = ?"
    db.query(sql, [req.body.username], async (err,result) => {
        if(err){
            console.log(err)
        }else if(result.length > 0){
            const match = await bcrypt.compare(req.body.password, result[0].userPassword)
            if(match){
                const token = jwt.sign({ username: result[0].username}, secret, {expiresIn: '3h'})
                res.json({status : "ok",  message: "Login success", id: `${result[0].id}`, token})
            }else{
                res.status(401).json({status : "error", message: "Invalid password"})
            }
        }else{
            res.status(401).json({status : "error", message: "Invalid username"})
        }
    })
})

app.post('/authorization', (req,res) => {
    try{
        const token = req.body.headers.Authorization.split(' ')[1]
        const decoded = jwt.verify(token, secret)
        res.json({status : "ok", decoded})
    }catch(err){
        res.status(401).json({status : "error", message : err.message})
    }

})

app.post('/totalswaps', (req,res) => {
    const sql = "SELECT totalSwaps FROM useraccount WHERE id = ?"
    db.query(sql, req.body.headers.id ,(err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.get('/main', (req,res) => {
    const sql = "SELECT post.*, useraccount.name, useraccount.totalSwaps FROM post INNER JOIN useraccount ON post.ownerId = useraccount.id"
    db.query(sql, (err,result) => {
        if(err){
            console.log(err)
        }else{
            result.sort(function(a,b){
                return b.postTime - a.postTime
            })
            res.send(result)
        }
    })
})

app.post('/profile', (req,res) => {
    const sql = "SELECT useraccount.name, useraccount.totalSwaps FROM useraccount WHERE id = ?"
    db.query(sql, req.body.headers.id, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post('/getreview', (req,res) => {
    const sql = "SELECT userreview.id, userreview.reviewFrom, userreview.review FROM userreview WHERE userId = ?"
    db.query(sql, req.body.headers.id, (err, result) => {
        if(err){
            console.log(err)
        }else{
            result.sort(function(a,b){
                return b.id - a.id
            })
            res.send(result)
        }
    })
})

app.post('/getreport', (req,res) => {
    const sql = "SELECT userreport.id, userreport.reportFrom, userreport.report FROM userreport WHERE userId = ?"
    db.query(sql, req.body.headers.id, (err, result) => {
        if(err){
            console.log(err)
        }else{
            result.sort(function(a,b){
                return b.id - a.id
            })
            res.send(result)
        }
    })
})

app.post('/mypost', (req,res) => {
    const sql = "SELECT * FROM post WHERE ownerId = ?"
    db.query(sql, req.body.headers.id, (err, result) => {
        if(err){
            console.log(err)
        }else{
            result.sort(function(a,b){
                return b.postTime - a.postTime
            })
            res.send(result)
        }
    })
})

app.post('/savepost', upload.single('image') ,(req,res) => {
    const imageData = req.file.filename
    const sql = "INSERT INTO post (format, place, picture, game, platform, wantedGame, wantedPlatform, ownerId, postTime) VALUES(?,?,?,?,?,?,?,?,?)"
    db.query( sql,[req.body.format, req.body.place, imageData, req.body.game, req.body.platform, 
        req.body.wantedGame, req.body.wantedPlatform, req.body.id, getDatetime()],
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/editpost', upload.single('image'), (req,res)=>{
    const imageData = req.file.filename
    const imagePath = `./public/images/${req.body.oldimage}`
    const sql = "UPDATE post SET format = ?, place = ?, picture = ?, game = ?, platform = ?, wantedGame = ?, wantedPlatform = ? WHERE id = ?"
    db.query(sql,[req.body.format, req.body.place, imageData, req.body.game, req.body.platform, 
        req.body.wantedGame, req.body.wantedPlatform, req.body.id],
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            fs.unlink(imagePath, (err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log('image deleted')
                }
            })
            res.send(result)
        }
    })
    db.query("UPDATE chat SET game = ?, platform = ?, format = ? WHERE postId = ?", 
    [req.body.game, req.body.platform, req.body.format, req.body.id], (err,result) => {
        if(err){
            console.log(err)
        }else{

        }
    })
})

app.put('/editpostnoimage', (req,res) => {
    const sql = "UPDATE post SET format = ?, place = ?, game = ?, platform = ?, wantedGame = ?, wantedPlatform = ? WHERE id = ?"
    db.query(sql, [req.body.format, req.body.place, req.body.game, req.body.platform, 
        req.body.wantedGame, req.body.wantedPlatform, req.body.id],
    (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })

    db.query("UPDATE chat SET game = ?, platform = ?, format = ? WHERE postId = ?", 
    [req.body.game, req.body.platform, req.body.format, req.body.id], (err,result) => {
        if(err){
            console.log(err)
        }else{
            
        }
    })
})

app.delete('/deletepost/:id/:image', (req,res) => {
    const id = req.params.id
    const imagePath = `./public/images/${req.params.image}`
    const sql = "DELETE FROM post WHERE id = ?"
    db.query(sql, [id], (err,result) => {
        if(err){
            console.log(err)
        }else{
            fs.unlink(imagePath, (err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log('image deleted')
                }
            })
            res.send(result)
        }
    })
})

app.post('/chatlist', (req,res) => {
    const sql = "SELECT * FROM chat WHERE requesterId = ? OR ownerId = ?"
    db.query(sql, [req.body.headers.id,req.body.headers.id], (err, result) => {
        if(err){
            console.log(err)
        }else{
            result.sort(function(a,b){
                return b.creationdate - a.creationdate
            })
            res.send(result)
        }
    })
})

app.post('/requestswap', (req,res) => {
    db.query("INSERT INTO chat (requesterName, creationdate, name, game, platform, requesterId, ownerId, postId, format) SELECT name,?,?,?,?,?,?,?,? FROM useraccount WHERE id = ?",
        [getDatetime(), req.body.name, req.body.game, req.body.platform, req.body.sendId, req.body.receiveId, req.body.postId, req.body.format, req.body.sendId],
        (err, result) => {
            if(err){
                console.log(err)
            }else{
                const sql = "INSERT INTO message (messageText, sentDateTime, sendId, receiveId, chatId) VALUES(?,?,?,?,?)"
                db.query(sql,[req.body.message, getDatetime(), req.body.sendId, req.body.receiveId, result.insertId], 
                (err, result) => {
                    if(err){
                        console.log(err)
                    }else{
                        
                    }
                })

                db.query("INSERT INTO notification (message, userId, chatId) VALUES (?,?,?)", ["มีคำขอการแลกเปลี่ยน", req.body.receiveId, result.insertId],
                (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        res.send(result)
                    }
                })
            }
    })
})

app.post('/getmessage', (req,res) => {
    const sql = "SELECT * FROM message WHERE chatId = ?"
    db.query(sql, req.body.headers.chatId, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.get('/status', (req,res) => {
    const sql = "SELECT * FROM swapstatus"
    db.query(sql, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post('/acceptreqowner', (req,res) => {
    const sql = "INSERT INTO swapstatus (ownerId, ownerStatus, ownerTime, requesterId, chatId) VALUES(?,?,?,?,?)"
    db.query(sql, [req.body.ownerId, req.body.ownerStatus, getDatetime(), req.body.requesterId, req.body.chatId], 
    (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.send(result)
        }
    }) 
})

app.put('/acceptrequpdate', (req,res) => {
    const sql = "UPDATE swapstatus SET requesterStatus = ?, requesterTime = ? WHERE chatId = ?"
    db.query(sql, [req.body.requesterStatus, getDatetime(), req.body.chatId], (err, result) => {
        if(err){
            console.log(err)
        }else{
            clearTimeout(getTimer(req.body.chatId).id)
            clearTimer(req.body.chatId)
            setPostAvailable(req.body.chatId, "no")
            if(req.body.format === "การแลกเปลี่ยนแบบส่งของ"){
                createparcelStatus(req.body.chatId, req.body.sendId, req.body.receiveId)
                parcelTimer(req.body.chatId, req.body.sendId, req.body.receiveId, req.body.ownerId)
            }
            res.send(result)
        }
    })
})

app.put('/receiveowner', (req,res) => {
    const sql = "UPDATE swapstatus SET ownerStatus = ?, ownerTime = ? WHERE chatId = ?"
    db.query(sql, [req.body.ownerStatus, getDatetime(), req.body.chatId], (err, result) => {
        if(err){
            console.log(err)
        }else{
            checkStatus(req.body.chatId)
            res.send(result)
        }
    })
})

app.put('/receive', (req,res) => {
    const sql = "UPDATE swapstatus SET requesterStatus = ?, requesterTime = ? WHERE chatId = ?"
    db.query(sql, [req.body.requesterStatus, getDatetime(), req.body.chatId], (err, result) => {
        if(err){
            console.log(err)
        }else{
            checkStatus(req.body.chatId)
            res.send(result)
        }
    })
})

app.post('/checkparcel', (req,res) => {
    const config = {
        method: 'post',
        url: 'https://trackapi.thailandpost.co.th/post/api/v1/authenticate/token',
        headers: {
            'Authorization': 'Token GYSRU&YqM3WKFDW*KIJ*B?FxIXBxVBR=T6TXVFZ5FsQxU0S%MUOYSXYnF_KJN#I8HbAeJGRIK2S^YSSrYhZpYWFHHzZuRZLWBUF.',
            'Content-Type': 'application/json'
        }
    }
    Axios(config)
    .then(function (response) {
        if(response.data.token && response.data.expire){
            const token = response.data.token

            const data = JSON.stringify({
                "status": "all",
                "language": "TH",
                "barcode": [req.body.tracking]
            })

            const config = {
                method: 'post',
                url: 'https://trackapi.thailandpost.co.th/post/api/v1/track',
                headers: {
                    'Authorization': 'Token ' + token,
                    'Content-Type': 'application/json'
                },
                data: data
            }

            Axios(config)
            .then(function (response) {
                if(response.data.response.items[req.body.tracking].length > 0){
                    db.query("UPDATE parcelstatus SET company = ?, tracking = ?, trackingStatus = ? WHERE userId = ? AND chatId = ?",
                [req.body.company, req.body.tracking, "เลขพัสดุถูกต้อง", req.body.userId, req.body.chatId], (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        res.send({msg:"เลขพัสดุถูกต้อง", tracking: req.body.tracking})
                    }
                })
                }else{
                    db.query("UPDATE parcelstatus SET company = ?, tracking = ?, trackingStatus = ? WHERE userId = ? AND chatId = ?",
                [req.body.company, req.body.tracking, "เลขพัสดุผิด", req.body.userId, req.body.chatId], (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        res.send("เลขพัสดุผิด")
                    }
                })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    })
    .catch(function (error) {
        console.log(error)
    })
})

app.post('/parcelStatus', (req,res) => {
    db.query("SELECT * FROM parcelStatus WHERE chatId = ?", req.body.headers.id, (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/sendTracking', (req,res) => {
    db.query("UPDATE parcelstatus SET sendTracking = ? WHERE chatId = ? AND userId = ?", ["yes", req.body.chatId, req.body.userId],
        (err,result) => {
            if(err){
                console.log(err)
            }else{
                if(getTimer(req.body.chatId+req.body.userId)?.id){
                    clearTimeout(getTimer(req.body.chatId+req.body.userId).id)
                    clearTimer(req.body.chatId+req.body.userId)
                }
                res.send(result)
            }
        })
})

app.put('/receiveParcel', (req,res) => {
    if(req.body.ownerId === req.body.id){
        db.query("UPDATE swapstatus SET ownerStatus = ?, ownerTime = ? WHERE chatId = ?",
        ["receive", getDatetime(), req.body.chatId], (err,result) => {
            if(err){
                console.log(err)
            }else{
                console.log("Owner receive")
                if(!getTimer(req.body.chatId)){
                    confirmParcelTimer(req.body.chatId)
                }
                checkStatus(req.body.chatId)
                res.send(result)
            }
        })
    }else{
        db.query("UPDATE swapstatus SET requesterStatus = ?, requesterTime = ? WHERE chatId = ?",
        ["receive", getDatetime(), req.body.chatId], (err,result) => {
            if(err){
                console.log(err)
            }else{
                console.log("Requester receive")
                if(!getTimer(req.body.chatId)){
                    confirmParcelTimer(req.body.chatId)
                }
                checkStatus(req.body.chatId)
                res.send(result)
            }
        })
    }
})

app.post('/review', (req,res) => {
    db.query("INSERT INTO userreview (reviewFrom, review, userId) SELECT name,?,? FROM useraccount WHERE id = ?", 
    [req.body.review, req.body.receiveId, req.body.id], (err,result) => {
        if(err){
            console.log(err)
        }else{
            
        }
    })
    let sql 
    if(req.body.id === req.body.ownerId){
        sql = "UPDATE swapstatus SET ownerStatus = ? WHERE chatId = ?"
    }else{
        sql = "UPDATE swapstatus SET requesterStatus = ? WHERE chatId = ?"
    }
    db.query(sql, ["complete",req.body.chatId], (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
    clearSwap(req.body.chatId)
    chatTimeout(req.body.chatId, "no")
})

app.post('/report', (req,res) => {
    const sql = "INSERT INTO userreport (reportFrom, report, userId) SELECT name,?,? FROM useraccount WHERE id = ?"
    db.query(sql, [req.body.report, req.body.userId, req.body.id], (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
    db.query("SELECT ownerId FROM chat WHERE id = ?", req.body.chatId, (err,result) => {
        if(err){
            console.log(err)
        }else{
            if(result[0].ownerId === req.body.userId){
                clearSwap(req.body.chatId)
                chatTimeout(req.body.chatId, "no")
                db.query("UPDATE swapstatus SET ownerStatus = ? WHERE chatId = ?",["report", req.body.chatId],
                (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("report owner")
                    }
                })
            }else{
                setPostAvailable(req.body.chatId, "yes")
                chatTimeout(req.body.chatId, "no")
                db.query("UPDATE swapstatus SET requesterStatus = ? WHERE chatId = ?",["report", req.body.chatId],
                (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("report requester")
                    }
                })
            }
        }
    })
})

app.post('/notification', (req,res) => {
    const sql = "SELECT notification.id, notification.message, notification.userId, notification.messageRead, chat.name, chat.game, chat.platform, chat.ownerId FROM notification INNER JOIN chat ON notification.chatId = chat.id"
    db.query(sql, (err,result) => {
        if(err){
            console.log(err)
        }else{
            result.sort(function(a,b){
                return b.id - a.id
            })
            res.send(result.filter(data => data.userId === parseInt(req.body.headers.id),10))
        }
    })
})

app.put('/readnotification', (req,res) => {
    const sql = "UPDATE notification SET messageRead = ? WHERE userId = ?"
    db.query(sql, ["yes", req.body.headers.id], (err,result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

const UsersState = {
    users: [],
    setUsers: function(newUsersArray){
        this.users = newUsersArray
    }
}

const timersState = {
    timers: [],
    setTimers: function(newTimersArray){
        this.timers = newTimersArray
    }
}

io.on('connection', socket => {
    console.log(`User ${socket.id.substring(0,5)} connected`)

    socket.on('online', (id) => {
        const prevRoom = getUser(id)?.room
        if(prevRoom){
            socket.leave(prevRoom)
        }
        const user = activateUser(id, 'user'+id)
        socket.join(user.room)
    })

    socket.on('enterRoom', ({chatId, sendId, receiveId}) => {
        //leave previous room
        const prevRoom = getUser(sendId)?.room
        if(prevRoom){
            socket.leave(prevRoom)
        }

        const user = activateUser(sendId, chatId)

        //join room
        socket.join(user.room)
        const sql = "SELECT * FROM message WHERE chatId = ?"
        db.query(sql, chatId, (err, result) => {
            if(err){
                console.log(err)
            }else{
                io.to(user.room).emit('message', {
                    msg : result.map(data => data.messageText), 
                    id : result.map(data => data.sendId),
                    time :  result.map(data => data.sentDateTime)
                })
            }
        })
    })

    socket.on('logout', (id) => {
        userLeavePage(id)
    })
    socket.on('click', ({msg, chatId, receiveId, sendId}) => {
        socket.broadcast.to(chatId).emit('click', msg)
        const timeOut = setTimeout(() => {
            db.query("INSERT INTO notification (message, userId, chatId) VALUES(?,?,?), (?,?,?)",["ไม่มีการตอบสนองยืนยันการแลกเปลี่ยน",receiveId,chatId, "ไม่มีการตอบสนองยืนยันการแลกเปลี่ยน",sendId,chatId],
        (err, result) => {
            if(err){
                console.log(err)
            }else{
                console.log('Notification save')
                db.query("SELECT name, game, platform, ownerId FROM chat WHERE id = ?", chatId,
                (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        io.to('user'+receiveId).to('user'+sendId).emit('notification',{
                            game: result.game,
                            message: "ไม่มีการตอบสนองยืนยันการแลกเปลี่ยน",
                            messageRead: "no",
                            name: result.name,
                            ownerId: result.ownerId,
                            platform: result.platform
                        })
                    }
                })
                db.query("DELETE FROM swapstatus WHERE chatId = ?", chatId, (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Request Delete")
                    }
                })
            }
        })
        }, 1000 * 30)
        activeTimer(timeOut, chatId)
    })

    socket.on('message', ({chatId ,message, sendId, receiveId}) => {
        console.log(message)
        const msgTime = getDatetime()
        const sql = "INSERT INTO message (messageText, sentDateTime, sendId, receiveId, chatId) VALUES(?,?,?,?,?)"
        db.query(sql, [message, msgTime, sendId, receiveId, chatId], (err, result) => {
            if(err){
                console.log(err)
            }else{
                console.log("Message saved to database")
                io.to(chatId).emit('message', {
                    msg : message, 
                    id : sendId,
                    time :  msgTime
                })
            }
        })
    })
})

function getDatetime () {
    let msgTime = new Date()
    msgTime = msgTime.toISOString().split('T')[0]+' '+msgTime.toTimeString().split(' ')[0];
    return msgTime
}

function activateUser (id, room) {
    const user = {id, room}
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id), user
    ])
    return user
}

function getUser(id){
    return UsersState.users.find( user => user.id === id)
}

function userLeavePage(id) {
    UsersState.setUsers(
        UsersState.users.filter(user => user.id !== id)
    )
}

function activeTimer(id, chat) {
    const timer = {id, chat}
    timersState.setTimers([
        ...timersState.timers, timer
    ])
}

function getTimer(chat){
    return timersState.timers.find( timer => timer.chat === chat)
}

function clearTimer(chat){
    timersState.setTimers(
        timersState.timers.filter(timer => timer.chat !== chat)
    )
}

function checkStatus (chatId){
    db.query("SELECT ownerStatus, requesterStatus, ownerId, requesterId FROM swapstatus WHERE chatId = ?", chatId, (err, result) => {
        if(err){
            console.log(err)
        }else{
            if(result[0].ownerStatus === 'receive' && result[0].requesterStatus === 'receive'){
                db.query("UPDATE useraccount SET totalSwaps = totalSwaps +1 WHERE id IN (?,?)",[result[0].ownerId,result[0].requesterId],
                (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        clearTimeout(getTimer(chatId)?.id)
                        clearTimer(chatId)
                        console.log("User totalSwaps update")
                    }
                })
            }
        }
    })
}

function chatTimeout(chatId, msg){
    setTimeout(() => {
        db.query("UPDATE chat SET available = ? WHERE id = ?", [msg, chatId], (err, result) => {
            if(err){
                console.log(err)
            }else{
                console.log(chatId, "chat available update")
            }
        })
    }, 1000 * 30)
}

function clearSwap (chatId){
    db.query("SELECT post.id, post.picture FROM post INNER JOIN chat ON post.id = chat.postId WHERE chat.id = ?", chatId, (err,result) => {
        if(err){
            console.log(err)
        }else if(result.length > 0){
            const imagePath = `./public/images/${result[0].picture}`
            db.query("DELETE FROM post WHERE id = ?", result[0].id, (err,result) => {
                if(err){
                    console.log(err)
                }else{
                    fs.unlink(imagePath, (err) => {
                        if(err){
                            console.log(err)
                        }else{
                            console.log('image deleted')
                        }
                    })
                }
            })
        }
    })

}

function setPostAvailable (chatId, available) {
    db.query("SELECT postId FROM chat WHERE id = ?", chatId, (err,result) => {
        if(err){
            console.log(err)
        }else{
            db.query("UPDATE post SET available = ? WHERE id = ?", [available, result[0].postId], (err,result) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("update post available")
                }
            })
        }
    })
}

function createparcelStatus (chatId, sendId, receiveId){
    db.query("INSERT INTO parcelstatus (userId, chatId) VALUES(?,?), (?,?)", [sendId, chatId, receiveId, chatId],
    (err,resutl) => {
        if(err){
            console.log(err)
        }else{
            console.log("create parcel status")
        }
    })
}

function parcelTimer (chatId, sendId, receiveId, ownerId){
    if(ownerId === sendId){
        const timeOutOwner = setTimeout(() => {
            db.query("UPDATE swapstatus SET ownerStatus = ?, ownerTime = ? WHERE chatId = ?", 
            ["late", getDatetime(), chatId], (err,result) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("Owner late")
                }
            })
        }, 1000 * 60)
        activeTimer(timeOutOwner, chatId+sendId)

        const timeOutRequester = setTimeout(() => {
            db.query("UPDATE swapstatus SET requesterStatus = ?, requesterTime = ? WHERE chatId = ?", 
            ["late", getDatetime(), chatId], (err,result) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("requester late")
                }
            })
        }, 1000 * 60)
        activeTimer(timeOutRequester, chatId+receiveId)
    }else{
        const timeOutOwner = setTimeout(() => {
            db.query("UPDATE swapstatus SET ownerStatus = ?, ownerTime = ? WHERE chatId = ?", 
            ["late", getDatetime(), chatId], (err,result) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("Owner late")
                }
            })
        }, 1000 * 60)
        activeTimer(timeOutOwner, chatId+receiveId)

        const timeOutRequester = setTimeout(() => {
            db.query("UPDATE swapstatus SET requesterStatus = ?, requesterTime = ? WHERE chatId = ?", 
            ["late", getDatetime(), chatId], (err,result) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("requester late")
                }
            })
        }, 1000 * 60)
        activeTimer(timeOutRequester, chatId+sendId)
    }
}

function confirmParcelTimer (chatId){
    const timeOut = setTimeout(() => {
        db.query("SELECT requesterId, ownerId FROM chat WHERE id = ?" ,chatId, (err,result) => {
            if(err){
                console.log(err)
            }else{
                db.query("INSERT INTO notification (message, userId, chatId) VALUES(?,?,?), (?,?,?)", 
                ["ไม่มีการตอบสนองยืนยันการได้รับเกม", result[0].requesterId, chatId, "ไม่มีการตอบสนองยืนยันการได้รับเกม", result[0].ownerId, chatId],
                (err,result) => {
                    if(err){
                        console.log(err)
                    }else{
                        console.log("Notification Cancel confirm parcel")
                    }
                })
            }
        })
        
        db.query("UPDATE swapstatus SET ownerStatus = ?, requesterStatus = ? WHERE chatId = ?", 
        ["accept", "accept", chatId], (err,result) => {
            if(err){
                console.log(err)
            }else{
                console.log("Cancel confirm parcel")
            }
        })
    }, 1000 * 30)
    activeTimer(timeOut, chatId)
}