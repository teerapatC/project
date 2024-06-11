import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import "./Signup.css"
import Yes from "./image/yes.png"
import No from "./image/remove.png"
import Axios from "axios";
const USER_REGEX = /^[A-z][A-z0-9]{3,29}$/
const PASSWORD_REGEX = /[A-z0-9!@#$%]{6,30}$/

const Signup = () => {
    const [userName, setUserName] = useState('')
    const [validUser, setValidUser] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [match, setMatch] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [name, setName] = useState('')
    const [tel, setTel] = useState('')
    const [houseNo, setHouseNo] = useState('')
    const [district, setDistrict] = useState('')
    const [province, setProvince] = useState('')
    const [zip, setZip] = useState('')

    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef()

    useEffect(() => {
        document.getElementById('container1').style.display = "none"
    },[])

    useEffect(() => {
        setValidUser(USER_REGEX.test(userName))
        setErrMsg('')
    },[userName])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password))
        setValidMatch(password === match)
    }, [password, match])

    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post('/signup',{
            username : userName,
            password : password,
            name : name,
            tel : tel,
            houseno : houseNo,
            district : district,
            province : province,
            zip : zip
        })
        .then(res => {
            setUserName('')
            setPassword('')
            setMatch('')
            setName('')
            setTel('')
            setHouseNo('')
            setDistrict('')
            setProvince('')
            setZip('')
            alert('Sign up success!!')
            window.location = '/login'
        })
        .catch(err => {
            setErrMsg(err.response.data.message)
            errRef.current.focus()
        })
    }

    return(
        <div className="signup-page">
            <div className="signup-container">
                <h1>Sign up</h1>
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userName" className="signup-label">Username: 
                        <img src={Yes} className={validUser ? "yes" : "offscreen"} alt="yes"/>
                        <img src={No} className={validUser || !userName ? "offscreen" : "no"} alt="no" />
                    </label> <br/>
                    <input className="signup-input" type="text" id="userName" autoComplete="off" required
                    onChange={(event)=> setUserName(event.target.value)}
                    onFocus={()=> setUserFocus(true)}
                    onBlur={()=> setUserFocus(false)}
                    maxLength={30}/><br/>
                    <p className={userFocus && userName && !validUser ? "instruction" : "offscreen"}>
                        Must begin with a letter,
                         4 to 30 characters.<br/>
                        Letters and numbers allowed.
                    </p>
                    <br/>
                    <label htmlFor="password" className="signup-label">Password:
                        <img src={Yes} className={validPassword ? "yes" : "offscreen"} alt="yes"/>
                        <img src={No} className={validPassword || !password ? "offscreen" : "no"} alt="no" />
                    </label> <br/>
                    <input className="signup-input" type="password" id="password" required
                    onChange={(event) => setPassword(event.target.value)}
                    onFocus={()=> setPasswordFocus(true)}
                    onBlur={()=> setPasswordFocus(false)}
                    maxLength={30}/><br/>
                    <p className={passwordFocus && password && !validPassword ? "instruction" : "offscreen"}>
                        6 to 30 characters,
                        allowed special characters.
                    </p>
                    <br/>
                    <label htmlFor="confirm-password" className="signup-label">Confirm password: 
                        <img src={Yes} className={validMatch && match ? "yes" : "offscreen"} alt="yes"/>
                        <img src={No} className={validMatch || !match ? "offscreen" : "no"} alt="no" />
                    </label> <br/>
                    <input className="signup-input" type="password" id="confirm-password" required
                    onChange={(event)=> setMatch(event.target.value)}
                    onFocus={()=> setMatchFocus(true)}
                    onBlur={()=> setMatchFocus(false)}
                    /><br/>
                    <p className={matchFocus && match && !validMatch ? "instruction" : "offscreen"}>
                    Must match password input field.
                    </p>
                    <br/>
                    <label htmlFor="name" className="signup-label">Name: </label> <br/>
                    <input className="signup-input" type="text" id="name" required
                    onChange={(event)=> setName(event.target.value)}
                    /><br/>
                    <br/>
                    <label htmlFor="phone" className="signup-label">Phone number: </label> <br/>
                    <input className="signup-input" type="number" id="phone" required
                    onChange={(event)=> setTel(event.target.value)}
                    /><br/>
                    <br/>
                    <label htmlFor="houseno" className="signup-label">House no: </label> <br/>
                    <input className="signup-input" type="text" id="houseno" required
                    onChange={(event)=> setHouseNo(event.target.value)}
                    /><br/>
                    <br/>
                    <label htmlFor="district" className="signup-label">District: </label> <br/>
                    <input className="signup-input" type="text" id="district" required
                    onChange={(event)=> setDistrict(event.target.value)}
                    /><br/>
                    <br/>
                    <label  htmlFor="province" className="signup-label">Province: </label> <br/>
                    <input className="signup-input" type="text" id="province" required
                    onChange={(event)=> setProvince(event.target.value)}
                    /><br/>
                    <br/>
                    <label htmlFor="zipcode" className="signup-label">Zipcode: </label> <br/>
                    <input className="signup-input" type="number" id="zipcode" required
                    onChange={(event)=> setZip(event.target.value)}
                    /><br/>
                    <button disabled={!validUser || !validPassword || !validMatch  ? true : false}
                    className="signup-btn">
                        Signup
                    </button>
                </form>
                <p>
                    <br/>
                    Already have an account?&nbsp;  
                     <a href="/login">Login</a>
                </p>
            </div>
            <Outlet />
        </div>
    )
}

export default Signup