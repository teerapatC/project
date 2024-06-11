import React, {useEffect, useState, useRef} from "react";
import { Outlet} from "react-router-dom";
import "./Chat.css"
import iconSend from "./image/send.png"
import iconQrcode from "./image/qrcode.png"
import iconParcel from "./image/parcel.png"
import Axios from "axios"
import QRCode from "react-qr-code"
import io from "socket.io-client"
const socket = io('ws://localhost:4000')

const Chat = () => {
    
    const [chat, setChat] = useState([])
    const [chatId, setChatId] = useState('')
    const [ownerId, setOwnerId] = useState('')
    const [msgTitle, setMsgTitle] = useState('')
    const [receiveId, setReceiveId] = useState('')
    const [messages, setMessages] = useState([])
    const [sendId, setSendId] = useState([])
    const [messageTime, setMessageTime] = useState([])
    const [messageInput, setMessageInput] = useState('')
    const [acceptClick, setAcceptClick] = useState('')
    const [status, setStatus] = useState([])
    const [parcelStatus, setParcelStatus] = useState([])
    const [company, setCompany] = useState('ไปรษณีย์ไทย')
    const [tracking, setTracking] = useState('')
    const [trackingMsg, setTrackingMsg] = useState('')
    const [returnTracking, setReturnTracking] = useState('')
    // const [user2ParcelStatus, setUser2ParcelStatus] = useState('')
    const [review, setReview] = useState('')
    const [report, setReport] = useState('')
    const trackingMsgRef = useRef('')
    useEffect(() => {
        //Auth
        const token = localStorage.getItem('token')
        Axios.post('/authorization', {
            headers : {"Authorization" : `Bearer ${token}`}
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            localStorage.removeItem('token')
            alert("Authentication failed")
            window.location = '/login'
        })

        //Get chat list
        Axios.post('/chatlist', {
            headers: {"id": localStorage.getItem('id')}
        })
        .then(res => {
            setChat(prevChat => {
                return res.data
            })
        })
        .catch(err => console.log(err))

    },[])

    useEffect(() => {
        socket.on('message', ({msg, id, time}) => {
            if(Array.isArray(msg)){
                setMessages([])
                setSendId([])
                setMessageTime([])
                setMessages(prev => [...prev, ...msg])
                setSendId(prev => [...prev, ...id])
                setMessageTime(prev =>  time.map(value => {
                    let t = new Date(value)
                    t = t.toISOString().split('T')[0]+' '+t.toTimeString().split(' ')[0];
                    return t
                }))
            }else{
                setMessages(prev => [...prev, msg])
                setSendId(prev => [...prev, id])
                setMessageTime(prev => [...prev, time])
            }
        })
        socket.on('click', msg => {
            setAcceptClick(prev => {return msg})
        })
        return () => {
            socket.emit('online', (parseInt(localStorage.getItem('id'),10)))
            socket.off('message')
        }
    },[])

    useEffect(() => {
        document.querySelector('.chat-display').scrollTop = document.querySelector('.chat-display').scrollHeight
    }, [messages])
    
    useEffect(() => {
        //Get status
        Axios.get('/status').then(res => {
            setStatus(prevStatus => {
                return res.data
            })
        })
        .catch(err => console.log(err))
    }, [acceptClick])

    const enterRoom = (id, name, requesterName, ownerId ,requesterId) => {
        if(parseInt(localStorage.getItem('id'),10) === ownerId){
            setMsgTitle(requesterName)
            setReceiveId(requesterId)
        }else{
            setMsgTitle(name)
            setReceiveId(ownerId)
        }
        setOwnerId(ownerId)
        setChatId(id)
        setAcceptClick('')
        socket.emit('enterRoom', {
            chatId: id,
            sendId : parseInt(localStorage.getItem('id'),10), 
            receiveId: receiveId
        })
        //Get parcelStatus
        Axios.post('/parcelStatus',{
            headers: {"id": id}
        })
        .then(res => {
            setParcelStatus(prevParcelStatus => {
                return res.data
            })
        })
        .catch(err => console.log(err))
    }

    // if(params.get('id')){
    //     const succesChat = chat.find(data => data.id === parseInt(params.get('id'),10))
    //     if(succesChat){
    //         console.log(succesChat)
    //         enterRoom(succesChat?.id, succesChat?.name, succesChat?.ownerId, succesChat?.requesterId)
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(messageInput.trim() !== ''){
            socket.emit('message', {
                chatId: chatId,
                message : messageInput, 
                sendId : parseInt(localStorage.getItem('id'),10), 
                receiveId: receiveId
            })
            setMessageInput('')
        }
    }

    const handleKeydown = (e) => {
        //Key enter to submit message
        if(e.key === 'Enter' && !e.shiftKey){
            handleSubmit(e)
        }
    }

    const chatList = chat.map((e,i) => (
          
        <div className="chat-content" key={e.id} onClick={()=> enterRoom(e.id, e.name, e.requesterName, e.ownerId, e.requesterId)}
        style={chatId === e.id ? {backgroundColor:"#979797"} : {backgroundColor:"#b4ccff"}}>
            <div className={chatId === e.id ? "underline" : "none-underline"}>
                {parseInt(localStorage.getItem('id'),10) === e.ownerId ? <p>Your post</p> 
                :<p>Username: {e.name}</p>}
                <p>Game: {e.game}</p>
                <p>Platform: {e.platform}</p>
            </div>
        </div>
        
    ))
    
    const message = messages.map((msg, i) => (
        <li className={sendId[i] === parseInt(localStorage.getItem('id'),10) ? "msg-right" : "msg-left"} key={i}>
            <div className={sendId[i] === parseInt(localStorage.getItem('id'),10) ? "msg-user" : "msg-reply"}>
                <span className="msg-time">{messageTime[i]}</span>
                <span className="msg">{msg}</span>
            </div>
        </li>
    ))

    function checkBtnSwap1 ()  {
        if(ownerId === parseInt(localStorage.getItem('id'),10)){
            if(acceptClick === 'ownerclick'){
                return true
            }else{
                return false
            }
        }else{
            if(acceptClick === 'ownerclick'){
                return false
            }else{
                return true
            }
        }
    }

    function checkBtnSwap2 () {
        if(ownerId === parseInt(localStorage.getItem('id'),10)){
            if(status.find(data => data.chatId === chatId).ownerStatus === 'accept'){
                return true
            }else{
                return false
            }
        }else{
            if(status.find(data => data.chatId === chatId).requesterStatus === 'accept'){
                return true 
            }else{
                return false
            }
        }
    }

    const handleAcceptReq = () => {
        if(ownerId === parseInt(localStorage.getItem('id'),10)){
            Axios.post('/acceptreqowner',{
                ownerId: ownerId,
                ownerStatus: 'accept',
                requesterId: receiveId,
                chatId: chatId
            }).then(res => {
                console.log(res)
                setAcceptClick(prev => {return 'ownerclick'})
                socket.emit('click', {
                    msg: 'ownerclick',
                    chatId: chatId,
                    receiveId: receiveId,
                    sendId: parseInt(localStorage.getItem('id'),10)
                })
            })
            .catch(err => console.log(err))
        }else{
            Axios.put('/acceptrequpdate',{
                requesterStatus: 'accept',
                chatId: chatId,
                receiveId: receiveId,
                sendId: parseInt(localStorage.getItem('id'),10),
                ownerId: ownerId,
                format: chat.find(data => data.id === chatId)?.format
            }).then(res => {
                console.log(res)
                setAcceptClick(prev => {return 'requesterclick'})
            })
            .catch(err => console.log(err))
        }
        
    }
    
    function checkAccepStatus () {
        const find = status.find(data => data.chatId === chatId)
        if(find?.ownerStatus && find?.requesterStatus){
            return false
        }else{
            return true
        }
    }

    function checkStatus () {
        if(chat.find(data => data.id === chatId)?.format === "การแลกเปลี่ยนแบบนัดเจอ"){
            const find = status.find(data => data.chatId === chatId)
            if(find?.ownerStatus === "accept" || find?.ownerStatus === "receive" || find?.ownerStatus === "complete"){
                if(find?.requesterStatus === "accept" || find?.requesterStatus === "receive" || find?.requesterStatus === "complete"){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        }else{
            return false
        }
    }

    function qrconfirmDisable(){
        const userId = parseInt(localStorage.getItem('id'),10)
        const checkStatus = status.find(data => data.chatId === chatId)
        if(userId === checkStatus?.requesterId ){
            if(checkStatus?.requesterStatus === "receive" || checkStatus?.requesterStatus === "complete"){
                return true
            }else{
                return false
            }
        }else if(userId === checkStatus?.ownerId ){
            if(checkStatus?.ownerStatus === "receive" || checkStatus?.ownerStatus === "complete"){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }

    function checkParcelStatus () {
        if(chat.find(data => data.id === chatId)?.format === "การแลกเปลี่ยนแบบส่งของ"){
            const find = status.find(data => data.chatId === chatId)
            if(find?.ownerStatus && find?.requesterStatus){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }

    const showParcel = ()  => {
        document.getElementById("popupParcel").style.display="block"

        // const userParcelStatus = parcelStatus.find(data => 
        //     data.userId === parseInt(localStorage.getItem('id'),10) && data.chatId === chatId)
        // if(userParcelStatus?.tracking){
        //     setTrackingMsg(userParcelStatus.trackingStatus)
        //     setTracking(userParcelStatus.tracking)
        // }
        // setUser2ParcelStatus(parcelStatus.find(data => data.userId !== 
        //     parseInt(localStorage.getItem('id'),10) && data.chatId === chatId))
    }

    const handleParcel = () => {
        if(tracking.trim() !== ''){
            if(company === "ไปรษณีย์ไทย"){
                Axios.post('/checkparcel', {
                    tracking: tracking,
                    company: company,
                    chatId: chatId,
                    userId: parseInt(localStorage.getItem('id'),10)
                }).then(res => {
                    setTrackingMsg(res.data.msg)
                    setReturnTracking(res.data.tracking)
                })
                .catch(err => console.log(err))
            }
        }
    }

    const sendTracking = () => {
        const confirmTrackingMessage = "บริษัท: "+company+" เลขพัสดุ: "+returnTracking
        socket.emit('message', {
            chatId: chatId,
            message : confirmTrackingMessage, 
            sendId : parseInt(localStorage.getItem('id'),10), 
            receiveId: receiveId
        })
        Axios.put('/sendTracking',{
            chatId: chatId,
            userId: parseInt(localStorage.getItem('id'),10)
        }).then(res =>{
            window.location.reload()
        }).catch(err => console.log(err))
    }

    const receiveParcel = () => {
        Axios.put('/receiveParcel',{
            chatId: chatId,
            ownerId: ownerId,
            id: parseInt(localStorage.getItem('id'),10)
        }).then(res => {
            console.log(res)
            window.location.reload()
        }).catch(err => console.log(err))
    }

    function checkConfirmParcel () {
        const checkStatus = status.find(data => data.chatId === chatId)
        if(checkStatus?.ownerStatus === "report" || checkStatus?.requesterStatus === "report"){
            return true
        }else if(checkStatus?.ownerStatus === "complete" || checkStatus?.requesterStatus === "complete"){
            return true
        }else if(parseInt(localStorage.getItem('id'),10) === checkStatus?.ownerId && 
        checkStatus?.ownerStatus === "receive"){
            return true
        }else if(parseInt(localStorage.getItem('id'),10) === checkStatus?.requesterId && 
        checkStatus?.requesterStatus === "receive"){
            return true
        }else{
            return false
        }
    }

    function checkReceive () {
        const find = status.find(data => data.chatId === chatId)
        if((find?.ownerStatus === "receive" && find?.requesterStatus === "receive") || (find?.ownerStatus === "complete" || find?.requesterStatus === "complete")){
            if(parseInt(localStorage.getItem('id'),10) === find?.ownerId && find?.ownerStatus === "complete"){
                return false
            }else if(parseInt(localStorage.getItem('id'),10) === find?.requesterId && find?.requesterStatus === "complete"){
                return false
            }else{
                return true
            }
        }else{
            return false
        }
    }

    const handleReview = () => {
        Axios.post('/review',{
            review: review,
            id: parseInt(localStorage.getItem('id'),10),
            ownerId: ownerId,
            chatId: chatId,
            receiveId: receiveId
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleReport = () => {
        const userId = parcelStatus.find(data => data.userId !== parseInt(localStorage.getItem('id'),10) 
        && data.chatId === chatId)?.userId
        Axios.post('/report',{
            id: parseInt(localStorage.getItem('id'),10),
            report: report,
            userId: userId,
            chatId: chatId
        }).then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    function checkReport (){
        
        // if(parcelStatus.find(data => data.userId !== parseInt(localStorage.getItem('id'),10) 
        // && data.chatId === chatId)?.trackingStatus === "เลขพัสดุผิด"){
        //     if( status.find(data => data.chatId === chatId)?.ownerStatus === "report" || 
        //     status.find(data => data.chatId === chatId)?.requesterStatus === "report"){
        //         return false
        //     }else{
        //         return true
        //     }
        // }
        if( status.find(data => data.chatId === chatId)?.ownerStatus === "report" || 
            status.find(data => data.chatId === chatId)?.requesterStatus === "report"){
                return false
        }else if(parseInt(localStorage.getItem('id'),10) === ownerId){
            if(status.find(data => data.chatId === chatId)?.requesterStatus === "late"){
                return true
            }else{
                return false
            }
        }else if(parseInt(localStorage.getItem('id'),10) !== ownerId){
            if(status.find(data => data.chatId === chatId)?.ownerStatus === "late"){
                return true
            }else{
                return false
            }
        }
        else{
            return false
        }
    }

    return (
        <div>
            <div className="chat-container">
                {chatList}
            </div>
            <div className={msgTitle ? "message-container" : "offscreen"}>
                <div className="message-title">
                    <h1>{msgTitle}</h1>
                    <button type="button" className={checkAccepStatus()? "accept-button" : "offscreen"} 
                    disabled = {status.find(data => data.chatId === chatId)? checkBtnSwap2() 
                    : checkBtnSwap1()} onClick={handleAcceptReq}>
                        ตกลงการแลกเปลี่ยน
                    </button>
                    
                    <button type="button" className={checkStatus()? "qr-button" : "offscreen"}
                    onClick={()=>document.getElementById("popupQR").style.display = "block"}
                    disabled={qrconfirmDisable()? true : false}>
                        <img src={iconQrcode} alt="qrcode" className="qrcode"/>
                        QR code ยืนยัน
                    </button>
                    
                    <button type="button" className={checkParcelStatus()? "parcel-button" : "offscreen"}
                    onClick={()=>showParcel()} disabled={
                        parcelStatus.find(data => data.chatId === chatId && data.userId === parseInt(localStorage.getItem('id'),10))?.sendTracking === "yes"? true:false}>
                        <img src={iconParcel} alt="parcel" className="parcel"/>
                        ยืนยันการส่งของ
                    </button>

                    <button type="button" className={checkParcelStatus()?"parcelConfirm-button" : "offscreen"}
                    disabled={checkConfirmParcel()? true:false} onClick={()=> receiveParcel()}>
                        ยืนยันการได้รับเกม
                    </button>

                    <button type="button" className={checkReport()?"report":"offscreen"}
                    onClick={()=>document.getElementById("popupReport").style.display="block"}>
                        รีพอร์ต
                    </button>
                </div>
                <div  className="popupQR" id="popupQR">
                    <div className="qrcode-container">
                        <span className="close" 
                            onClick={()=>document.getElementById("popupQR").style.display="none"}>
                        &times;</span>
                        <QRCode 
                            value={`http://localhost:3000/receive?chat=${chatId}&id=${ownerId}`}
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                            size={250}
                        />
                    </div>
                </div>
                
                <div className="popupParcel" id="popupParcel">
                    <div className="parcel-container">
                        <span className="close" 
                        onClick={()=>{document.getElementById("popupParcel").style.display="none";setTracking('');setTrackingMsg('')}}>
                            &times;</span>
                        <div className="user2">
                            <p>กรอกรายละเอียดในการจัดส่งของคุณเพื่อยืนยันการส่งของ</p>
                            <label htmlFor="company">บริษัทในการจัดส่ง: </label>
                            <select name="company" id="company" 
                            onChange={(event)=>setCompany(event.target.value)}>
                                <option value="ไปรษณีย์ไทย">ไปรษณีย์ไทย</option>
                                <option value="Kerry express">Kerry express</option>
                                <option value="Flash express">Flash express</option>
                            </select>
                            <br/><br/>
                            <input type="text" placeholder="กรอกเลขพัสดุ"
                            onChange={(event) => setTracking(event.target.value)}/>
                            <button className="check-parcel" type="button" onClick={()=>handleParcel()}> 
                                ตรวจสอบเลขพัสดุ
                            </button>
                            {trackingMsg && 
                            <span ref={trackingMsgRef} className={trackingMsg === "เลขพัสดุถูกต้อง"? "correctTracking" : "notcorrectTracking"}>
                                {trackingMsg}
                            </span>}
                        </div>
                        <br/>
                        <button className="confirm-parcel" type="button" onClick={()=>sendTracking()}
                        disabled={trackingMsg === "เลขพัสดุถูกต้อง"? false: true}>ยืนยัน
                        </button>
                    </div>
                </div>
                
                <div className="popupReport" id="popupReport">
                    <div className="report-container">
                        <span className="close" 
                        onClick={()=>document.getElementById("popupReport").style.display="none"}>
                            &times;</span>
                        <p>รายงานปัญหาในการแลกเปลี่ยน</p>
                        <textarea row={5} cols={50} placeholder="เขียนรายงานปัญหาในการแลกเปลี่ยน"
                        onChange={(event)=>setReport(event.target.value)}/><br/>
                        <button type="button" onClick={handleReport}>รีพอร์ต</button>
                    </div>
                </div>

                <div className={checkReceive()? "popupReview" : "offscreen"}>
                    <div className="review-container">
                        <p>การแลกเปลี่ยนสำเร็จ</p>
                        <textarea row={5} cols={50} placeholder="เขียนความคิดเห็นในการแลกเปลี่ยน" 
                        onChange={(event)=>setReview(event.target.value)}/><br/>
                        <button type="button" onClick={handleReview}>ส่งความคิดเห็น</button>
                    </div>
                </div>

                <div className="message-list">
                    <ul className="chat-display">
                        {message}
                    </ul>  
                </div>

                {chat.find(data => data.id === chatId)?.available === "yes" &&
                <div className="chat-input">
                    <form onSubmit={handleSubmit}>
                        <textarea placeholder="เขียนข้อความ" type="text" value={messageInput}
                        onChange={(event) => setMessageInput(event.target.value)} 
                        onKeyDown={handleKeydown}/>
                        <button className="btn-send" type="submit">
                            <img src={iconSend} alt="icon-send" className="icon-send"/>
                        </button>
                    </form>
                </div>}
            </div>
            <Outlet />
        </div>
    )
}

export default Chat