import React, {useEffect, useRef, useState} from "react";
import { Outlet } from "react-router-dom";
import "./Mypost.css"
import iconPlus from "./image/plus.png"
import swap from "./image/changing_color.png"
import Axios from "axios"
import deletePost from "./deletePost";

const Mypost = () => {
    const hiddenFileInput = useRef(null)
    const hiddenFileInputEdit = useRef(null)
    const [btnText, setBtnText] = useState("เพิ่มรูปภาพ")
    //post detail variable
    const [format, setFormat] = useState("การแลกเปลี่ยนแบบนัดเจอ")
    const [place, setPlace] = useState()
    const [picture, setPicture] = useState()
    const [game, setGame] = useState()
    const [platform, setPlatform] = useState("PS5")
    const [wantedGame, setWantedGame] = useState()
    const [wantedPlatform, setWantedPlatform] = useState("PS5")
    const [fileSelected, setFileSelected] = useState(false)
    //edit post variable
    const [editId, setEditId] = useState("")
    const [editFormat, setEditFormat] = useState("")
    const [editPlace, setEditPlace] = useState("")
    const [editPicture, setEditPicture] = useState(null)
    const [editNewPicture, setEditNewPicture] = useState(null)
    const [editGame, setEditGame] = useState("")
    const [editPlatform, setEditPlatform] = useState("")
    const [editWantedGame, setEditWantedGame] = useState("")
    const [editWantedPlatform, setEditWantedPlatform] = useState("")

    const [post, setPost] = useState([])
    const [postToDelete, setPostToDelete] = useState([])
    const [totalSwaps, setTotalSwaps] = useState([])
    const formatChange = (format) => {
        const placInp = document.getElementById("place")
        if(format === "การแลกเปลี่ยนแบบส่งของ"){
            placInp.value = ""
            setPlace()
            placInp.style.display = "none"
            placInp.required = false
            setFormat("การแลกเปลี่ยนแบบส่งของ")
        } else{
            placInp.style.display = "block"
            placInp.required = true
            setFormat("การแลกเปลี่ยนแบบนัดเจอ")
        }
    }

    const formatChangeEdit = (formatEdit) => {
        const placeInpEdit = document.getElementById("place-edit")
        if(formatEdit === "การแลกเปลี่ยนแบบส่งของ"){
            placeInpEdit.value = ""
            placeInpEdit.style.display = "none"
            placeInpEdit.required = false
            setEditPlace("")
        } else{
            placeInpEdit.style.display = "block"
            placeInpEdit.required = true
        }
    }

    const showPopup = () =>{
        document.getElementById("popupPost").style.display = "block"
    }
    const closePopup = () => {
        document.getElementById("popupPost").style.display = "none"
    }
    const handdleClick = () => {
        //click file input button
        hiddenFileInput.current.click()
    }

    const handdleClickEdit = () => {
        hiddenFileInputEdit.current.click()
    }

    const showImage = (event) => {
        const fileImg = document.getElementById("newImg")
        if(event.target.files[0]){
            fileImg.src = URL.createObjectURL(event.target.files[0])
            setPicture(event.target.files[0])
            fileImg.style.display = "block"
            fileImg.onload = function() {
                URL.revokeObjectURL(fileImg.src)
            }
            setBtnText("")
            setFileSelected(true)
        }
    }

    const showImageEdit = (event) => {
        const editImg = document.getElementById("newImg-edit")
        if(event.target.files[0]){
            editImg.src = URL.createObjectURL(event.target.files[0])
            setEditNewPicture(event.target.files[0])
            editImg.onload = function() {
                URL.revokeObjectURL(editImg.src)
            }
        }
    }

    const savePost = (e) => {
        e.preventDefault()
        //store image to formdata
        const formData = new FormData();
        formData.append('image', picture)
        formData.append('format', format)
        formData.append('place', place)
        formData.append('game', game)
        formData.append('platform', platform)
        formData.append('wantedGame', wantedGame)
        formData.append('wantedPlatform', wantedPlatform)
        formData.append('id', localStorage.getItem('id'))
        //post request to server
        Axios.post('/savepost',formData)
        .then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

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
        Axios.post('/mypost',{
            headers: {"id": localStorage.getItem('id')}
        })
        .then(res => {
            setPost(prevPost => {
                return res.data
            })
        })
        .catch(err => console.log(err))

        //Get totalswaps
        Axios.post('/totalswaps',{
            headers: {"id": localStorage.getItem('id')}
        })
        .then(res => {
            console.log(res.data)
            setTotalSwaps(prevTotalSwaps => {
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

    const postList = post.map((e,i) => (
        <div className="post" key={e.id}>
            <span className="close" 
            onClick={() =>{document.getElementById("popupDelete").style.display = "block"; 
            setPostToDelete([e.id, e.picture, e.available])} }>
                &times;</span>
            <div className="post-title">
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
                {e.available === "no" &&<span>อยู่ระหว่างดำเนินการแลกเปลี่ยน <img src={swap} alt="swap"/>
                 </span>}
                <button type="button" className="btn-edit" onClick={()=>setEditPost(e)}
                disabled={e.available === "no"? true:false}>แก้ไข</button>
            </div>
        </div>
    ))

    const setEditPost = (e) =>{
        document.getElementById("popupEdit").style.display="block"
        setEditId(e.id)
        setEditFormat(e.format)
        if(e.place!== "undefined"){
            setEditPlace(e.place)
            document.getElementById("place-edit").style.display = "block"
            document.getElementById("place-edit").required = true
        }else{
            setEditPlace("")
            document.getElementById("place-edit").value = ""
            document.getElementById("place-edit").style.display = "none"
            document.getElementById("place-edit").required = false
        }
        setEditPicture(e.picture)
        setEditGame(e.game)
        setEditPlatform(e.platform)
        setEditWantedGame(e.wantedGame)
        setEditWantedPlatform(e.wantedPlatform)
    }

    const editPost = (e) => {
        e.preventDefault()
        if(editNewPicture){
            const formDataEdit = new FormData();
            formDataEdit.append('oldimage', editPicture)
            formDataEdit.append('image', editNewPicture)
            formDataEdit.append('id', editId)
            formDataEdit.append('format', editFormat)
            if(editPlace){
                formDataEdit.append('place', editPlace)
            }else{
                formDataEdit.append('place', undefined)
            }
            formDataEdit.append('game', editGame)
            formDataEdit.append('platform', editPlatform)
            formDataEdit.append('wantedGame', editWantedGame)
            formDataEdit.append('wantedPlatform', editWantedPlatform)
            //put request to server
            Axios.put('/editpost',formDataEdit)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
        }else{
            var editPlaceValue = "undefined"
            if(editPlace){
                editPlaceValue = editPlace
            }
            Axios.put('/editpostnoimage',{
                id: editId,
                format: editFormat,
                place: editPlaceValue,
                game: editGame,
                platform: editPlatform,
                wantedGame: editWantedGame,
                wantedPlatform: editWantedPlatform
            })
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div>
            <div className="post-container">
                <ul className="post-list">
                    {postList}
                </ul>
            </div>

            <div id="popupDelete" className="popupDelete">
                <div className="popupDelete-content">
                    <p>ต้องการลบโพสต์หรือไม่</p>
                    <button type="button" className="btn-delete" disabled={postToDelete[2] === "no"? true:false}
                    onClick={() =>deletePost(postToDelete[0],postToDelete[1])}>
                        ลบโพสต์
                    </button>
                    <button type="button" className="btn-cancel"
                    onClick={() =>document.getElementById("popupDelete").style.display = "none"}>
                        ยกเลิก
                    </button>
                </div>
            </div>
            
            <div id="popupEdit" className="popupEdit">
            <form onSubmit={(event)=>{editPost(event)}}>
                <div className="popup-content">
                        <span className="close" 
                        onClick={()=>document.getElementById("popupEdit").style.display="none"}>
                            &times;</span>
                        <label htmlFor="format-edit">เลือกรูปแบบการแลกเปลี่ยน: </label>
                        <select name="format-edit" id="format-edit" value={editFormat}
                        onChange={(event)=> {setEditFormat(event.target.value);
                        formatChangeEdit(document.getElementById("format-edit").value)}}>
                            <option value="การแลกเปลี่ยนแบบนัดเจอ">การแลกเปลี่ยนแบบนัดเจอ</option>
                            {totalSwaps[0]?.totalSwaps >= 3 &&<option value="การแลกเปลี่ยนแบบส่งของ">การแลกเปลี่ยนแบบส่งของ</option>}
                        </select>
                        <br></br>
                        <input id="place-edit" type="text" placeholder="เพิ่มสถานที่ที่ต้องการ" 
                        value={editPlace} onChange={(event)=>setEditPlace(event.target.value)}/>
                        <div className="img-content">
                            <button type="button" className="btn-upload" id="btn-upload-edit" onClick={handdleClickEdit} >
                                {editPicture && <img className="newImg" id="newImg-edit"  alt="upload" 
                                src={`http://localhost:4000/images/`+editPicture}/>}
                            </button>
                            <input accept="image/*" type="file" id="imgInput-edit" onChange={showImageEdit} 
                                style={{display: "none"}} ref={hiddenFileInputEdit} />
                            <br></br>
                        </div>
                        <div className="detail-content">
                            <input type="text" placeholder="เพิ่มชื่อเกม" required value={editGame}
                            onChange={(event)=>setEditGame(event.target.value)}/>
                            
                            <label htmlFor="platform">&nbsp;เลือกแพลตฟอร์ม: </label>
                            <select name="platform" value={editPlatform}
                            onChange={(event)=>setEditPlatform(event.target.value)}>
                                <option value="PS5">PS5</option>
                                <option value="PS4">PS4</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Nintendo">Nintendo</option>
                            </select>
                            <br></br><br></br>
                            <input type="text" placeholder="เพิ่มชื่อเกมที่ต้องการ" required value={editWantedGame}
                            onChange={(event)=>setEditWantedGame(event.target.value)}/>
                            
                            <label htmlFor="wanted-platform">&nbsp;เลือกแพลตฟอร์มที่ต้องการ: </label>
                            <select name="wanted-platform" value={editWantedPlatform}
                            onChange={(event)=>setEditWantedPlatform(event.target.value)}>
                                <option value="PS5">PS5</option>
                                <option value="PS4">PS4</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Nintendo">Nintendo</option>
                            </select>
                            <button type="submit" className="btn-confirm">ยืนยัน</button>
                        </div>
                </div>
                </form>
            </div>


            <div id="popupPost" className="popupPost">
                <form onSubmit={(event)=> {savePost(event)}}>
                <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <label htmlFor="format">เลือกรูปแบบการแลกเปลี่ยน: </label>
                        <select name="format" id="format" 
                        onChange={()=>formatChange(document.getElementById("format").value)}>
                            <option value="การแลกเปลี่ยนแบบนัดเจอ">การแลกเปลี่ยนแบบนัดเจอ</option>
                            {totalSwaps[0]?.totalSwaps >= 3 &&<option value="การแลกเปลี่ยนแบบส่งของ">การแลกเปลี่ยนแบบส่งของ</option>}
                        </select>
                        <br></br>
                        <input id="place" type="text" placeholder="เพิ่มสถานที่ที่ต้องการ" required
                        onChange={(event)=>setPlace(event.target.value)}/>
                        <div className="img-content">
                            <button type="button" className="btn-upload" id="btn-upload" onClick={handdleClick} >
                                {btnText}
                                <img className="newImg" id="newImg"  alt="upload" style={{display: "none"}}/>
                            </button>
                            <input accept="image/*" type="file" id="imgInput" onChange={showImage} 
                                style={{display: "none"}} ref={hiddenFileInput} />
                            <br></br>
                        </div>
                        <div className="detail-content">
                            <input type="text" placeholder="เพิ่มชื่อเกม" required 
                            onChange={(event)=>setGame(event.target.value)}/>
                            <label htmlFor="platform">&nbsp;เลือกแพลตฟอร์ม: </label>
                            <select name="platform" onChange={(event)=>setPlatform(event.target.value)}>
                                <option value="PS5">PS5</option>
                                <option value="PS4">PS4</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Nintendo">Nintendo</option>
                            </select>
                            <br></br><br></br>
                            <input type="text" placeholder="เพิ่มชื่อเกมที่ต้องการ" required
                            onChange={(event)=>setWantedGame(event.target.value)}/>
                            
                            <label htmlFor="wanted-platform">&nbsp;เลือกแพลตฟอร์มที่ต้องการ: </label>
                            <select name="wanted-platform" onChange={(event)=>setWantedPlatform(event.target.value)}>
                                <option value="PS5">PS5</option>
                                <option value="PS4">PS4</option>
                                <option value="Xbox">Xbox</option>
                                <option value="Nintendo">Nintendo</option>
                            </select>
                            <button type="submit" className="btn-confirm" disabled={!fileSelected}>ยืนยัน</button>
                        </div>
                </div>
                </form>
            </div>

            <div className="newPost">
                <button id="btn-plus1" className="btn-plus" onClick={showPopup}>
                    <img src={iconPlus} alt="icon-plus" className="icon-plus"/>
                </button>       
            </div>
            <Outlet />
        </div>
    )
}

export default Mypost