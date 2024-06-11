import React,{useEffect, useState} from "react"
import { Outlet, useSearchParams, NavLink} from 'react-router-dom'
import "./Main.css"
import iconChat from "./image/chat.png"
import  Axios  from "axios"


const Main = () => {
    const [search] = useSearchParams()
    const [post, setPost] = useState([])
    const [msgOwnerId, setMsgOwnerId] = useState('')
    const [msgName, setMsgName] = useState('')
    const [msgGame, setMsgGame] = useState('')
    const [msgPlatform, setMsgPlatform] = useState('')
    const [message, setMessage] = useState('')
    const [postId, setPostId] = useState('')
    const [format, setFormat] = useState('')
    const [chat, setChat] = useState([])

    useEffect(()=>{
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
            localStorage.removeItem('id')
            alert("Authentication failed")
            window.location = '/login'
        })
        //Get post data
        Axios.get('/main')
        .then(res=>{
            setPost(prevPost => {
                return res.data
            })
        })
        .catch(err => console.log(err))

        //Get chat
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

    function checkPlace (place){
        if(place === "undefined"){
            return <br></br>
        }else{
            return "สถานที่: " + place
        }
    }

    const setMsgPopup = (e) => {
        document.getElementById('popupMsg').style.display = "block"
        setMsgName(e.name)
        setMsgGame(e.game)
        setMsgPlatform(e.platform)
        setMsgOwnerId(e.ownerId)
        setPostId(e.id)
        setFormat(e.format)
    }

    //search part
    let searchResult
    if(search.get('search')){
        searchResult = post.filter(data => {
            if(search.get('game') === 'game'){
                if(search.get('platform') === 'all'){
                    return data.game === search.get('search')
                }else{
                    return data.game === search.get('search') && data.platform === search.get('platform')
                }
            }else if(search.get('game') === 'wantedGame'){
                if(search.get('platform') === 'all'){
                    return data.wantedGame === search.get('search')
                }else{
                    return data.wantedGame === search.get('search') && data.wantedPlatform === search.get('platform')
                }
            }else{
                if(search.get('platform') === 'all'){
                    return data.game === search.get('search') || data.wantedGame === search.get('search')
                }else{
                    return (data.game === search.get('search') || data.wantedGame === search.get('platform')) 
                    && (data.platform === search.get('platform') || data.wantedPlatform === search.get('platform'))   
                }
            }
        })
    }else{
        searchResult = post.filter(data => {
            if(search.get('game') === 'game'){
                return data.platform === search.get('platform')
            }else if(search.get('game') === 'wantedGame'){
                return data.wantedPlatform === search.get('platform')
            }else{
                return data.platform === search.get('platform') || data.wantedPlatform === search.get('platform')
            }
        })
    }
    if(search.size > 0){
        if(search.get('search') === '' && search.get('game') === 'all' && search.get('platform') === 'all'){
            searchResult = post
        }else if(search.get('search') === '' && search.get('platform') === 'all'){
            searchResult = post
        }else if(searchResult.length === 0){
            searchResult = []
        }
    }else{
        searchResult = post
    }
    //post card
    const postList = searchResult.filter(data => data.available !== "no").map((e,i) => (
        <div className="post" key={e.id}>
            <div className="post-title">
                <NavLink to={{pathname:'/profile', search:`?user=${e.ownerId}`}}>
                    <p className="link">{e.name} : Total swap {e.totalSwaps}</p>
                </NavLink>
                <p>{e.format}</p> 
                <p id="placeId">{checkPlace(e.place)}</p>
            </div>
            <div className="post-image">
                <img src={`http://localhost:4000/images/`+e.picture} alt="game"/>
            </div>
            <div className="post-detail">
                <p>Game: {e.game}</p>
                <p>Platform: {e.platform}</p>
                <br></br>
                <p>Wanted game: {e.wantedGame}</p>
                <p>Wanted platform: {e.wantedPlatform}</p>
                <button type="button" className="btn-message" 
                disabled={ e.ownerId === parseInt(localStorage.getItem('id'), 10) || e.id === chat.find(data => data.postId === e.id)?.postId} 
                onClick={()=> setMsgPopup(e)}>
                    <img src={iconChat} alt="icon-message" className="icon-message"/>
                    ส่งข้อความ
                </button>
            </div>
        </div>
    ))
    
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('/requestswap', {
            postId: postId,
            name: msgName,
            game: msgGame,
            platform: msgPlatform,
            message: message,
            receiveId: msgOwnerId,
            format: format,
            sendId: localStorage.getItem('id')
        })
        .then(res => {
            console.log(res)
            window.location = '/chat'
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="mainPage">
            <div className="post-container">
                <ul className="post-list">
                    {postList}
                </ul>
            </div>
            <div className="popupMsg" id="popupMsg">
                <form onSubmit={handleSubmit}>
                    <div className="popupMsg-content">
                        <span className="close" 
                            onClick={()=>{document.getElementById("popupMsg").style.display="none";setMessage('')}}>
                            &times;</span>
                        <div className="msg-title">
                            <p>ส่งข้อความถึง : {msgName}</p>
                            <p>Game : {msgGame}</p>
                            <p>Platform : {msgPlatform}</p>
                        </div>
                        <div className="msg-text">
                            <label>
                                ส่งข้อความเพื่อยื่นข้อเสนอในการแลกเปลี่ยน
                                <textarea row={5} cols={50} placeholder="เขียนข้อความ" value={message}
                                onChange={(e)=>setMessage(e.target.value)}/>
                            </label>
                        </div>
                        <button disabled={!message? true : false}>
                            <img src={iconChat} alt="icon-message" />
                            ส่งข้อความ
                        </button>
                    </div>
                </form>
            </div>
            <Outlet />
        </div>
    )
}

export default Main