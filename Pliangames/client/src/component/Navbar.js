import React, {useState, useEffect, useRef} from "react"
import "./Navbar.css"
import { Outlet,NavLink} from "react-router-dom"
import iconNoti from "./image/bell.png"
import iconSearch from "./image/search.png"
import iconFilter from "./image/filter.png"
import iconChat from "./image/chat.png"
import iconProfile from "./image/profile.png"
import iconLogout from "./image/logout.png"
import iconNew from "./image/warning.png"
import Axios  from "axios"
import io from "socket.io-client"
const socket = io('ws://localhost:4000')

function Navbar() {
    const [search, setSearch] = useState('')
    const [gameOpt, setGameOpt] = useState('all')
    const [platformOpt, setPlatformOpt] = useState('all')
    const [notification, setNotification] = useState([])
    const [notiShown, setNotiShown] = useState(false)
    const [newNoti, setNewNoti] = useState(false)
    const popupRef = useRef(null)
    const notiRef = useRef(null)
    useEffect(() => {
        Axios.post('/notification',{
            headers: {"id": localStorage.getItem('id')}
        })
        .then(res => {
            setNotification(prev => {
                return res.data
            })
            if(res.data.filter(data => data.messageRead === "no").length > 0){
                setNewNoti(prev => {
                    return true
                })
            }
        })
        .catch(err => console.log(err))
    }, [newNoti])
    useEffect(() => {
        socket.emit('online', (parseInt(localStorage.getItem('id'),10)))
        socket.on('notification',(data) => {
            console.log(data)
            setNotification(prev => [...prev,data])
            setNewNoti(prev => {
                return !prev
            })
        })
        return () => {
            socket.off('notification')
        }
    },[])
    useEffect(() => {
        function handdleClickOutside (e) {
            if(popupRef.current && !popupRef.current.contains(e.target) && !notiRef.current.contains(e.target)){
                setNotiShown(false)
            }
        }
        document.addEventListener('mousedown', handdleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handdleClickOutside)
        }
    },[])

    const handleLogout = () => {
        if(window.confirm('Do you want to logout ?')){
            socket.emit('logout', (parseInt(localStorage.getItem('id'),10)))        
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            window.location = '/login'
        }
    } 
    const noti = notification.map((e,i) => (
        <div className="noti-content" key={i}>
            <p>{e.ownerId === parseInt(localStorage.getItem('id'),10) ? "Your post" : e.name}</p>
            <p>Gmae : {e.game}</p>
            <p>Platform : {e.platform}</p>
            <p>{e.message}</p>
        </div>
    ))
    
    const handleNoti = () => {
        if(notiShown === false){
            if(notification.filter(data => data.messageRead === "no").length > 0){
                Axios.put('/readnotification', {
                    headers: {"id": localStorage.getItem('id')}
                }).then(res => setNewNoti(false))
                .catch(err => console.log(err))
            }
        }
        setNotiShown(!notiShown)
    }

    return(
        <div>
            <div className="container1" id="container1">
                <div className="logo">
                    <NavLink end to="/" className="pliangames">เปลี่ยนเกมส์</NavLink>
                </div>
                <div className="mypost">
                    <NavLink to="/mypost" className="icon-mypost">My Post</NavLink>
                </div>
                <div className="searchBar">
                    <div className="text-search">
                        <input type="text" placeholder="ค้นหาเกม" id="search"
                        onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <button className="btn-search" type="button">
                        <NavLink to={{pathname:'/', search:`?search=${search}&game=${gameOpt}&platform=${platformOpt}`}}>
                            <img src={iconSearch} alt="icon-search" className="icon-search"/>
                        </NavLink>
                    </button>
                    <button className="btn-filter" type="button"
                    onClick={()=>document.getElementById('popupSearch').style.display = "block"}>
                        <img src={iconFilter} alt="icon-filter" className="icon-filter"/>
                    </button>
                </div>
                <div className="icon-group">
                    <button className="btn-noti" type="button" onClick={handleNoti} ref={notiRef}>
                        {newNoti && <img src={iconNew} alt="icon-new" className="icon-new"/>}
                        <img src={iconNoti} alt="icon-noti" className="icon-noti"/>
                        
                    </button>
                    <button className="btn-chat" type="button">
                        <NavLink to="/chat"> <img src={iconChat} alt="icon-chat" className="icon-chat"/> </NavLink>
                    </button>
                    <button className="btn-profile" type="button">
                        <NavLink to={{pathname:'/profile', search:`?user=${localStorage.getItem('id')}`}}> 
                            <img src={iconProfile} alt="icon-profile" className="icon-profile"/> 
                        </NavLink>
                    </button>
                    <button className="btn-logout" onClick={handleLogout} type="button">
                         <img src={iconLogout} alt="icon-logout" className="icon-logout"/> 
                    </button>
                </div>

            </div>
            
            <div className="popupSearch" id="popupSearch">
                <div className="popupSearch-content">
                    <label htmlFor="game-option">ค้นหาเกมจาก: </label>
                    <select name="game-option" id="game-option" value={gameOpt}
                    onChange={(e)=> setGameOpt(e.target.value)}>
                        <option value="all">เกมทั้งหมด</option>
                        <option value="game">เกมที่โพสต์</option>
                        <option value="wantedGame">เกมที่ต้องการ</option>
                    </select><br/><br/>
                    <label htmlFor="platform-option">แพลตฟอร์มที่ต้องการ: </label>
                    <select name="platform-option" id="platform-option" value={platformOpt}
                    onChange={(e)=> setPlatformOpt(e.target.value)}>
                        <option value="all">ทุกแพลตฟอร์ม</option>
                        <option value="PS5">PS5</option>
                        <option value="PS4">PS4</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo">Nintendo</option>
                    </select><br/><br/>
                    <button className="confirm" type="button"
                    onClick={()=>document.getElementById('popupSearch').style.display = "none"}>
                        ยืนยัน
                    </button>
                </div>
            </div>

            {notiShown && (<div className="popupNoti" id="popupNoti" ref={popupRef}>
                {noti}
            </div>)}
            <Outlet />
        </div>
    )
}

export default Navbar