import React, {useEffect, useState, useRef} from "react";
import { Outlet } from "react-router-dom";
import "./Login.css"
import Axios from "axios"


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef()
    useEffect(() => {
        document.getElementById('container1').style.display = "none"
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()

        Axios.post('/login',{
            username : username,
            password : password
        })
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            window.location = '/'
        })
        .catch(err => {
            console.log(err)
            setErrMsg(err.response.data.message)
            errRef.current.focus()
        })
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
                    <input type="text" onChange={(event) => setUsername(event.target.value)} 
                    className="login-input" required placeholder="Username"/>
                    <br/> <br/>
                    <input type="password" onChange={(event) => setPassword(event.target.value)}
                    className="login-input" required placeholder="Password"/>
                    <br/> <br/>
                    <button className="login-btn">
                        Login
                    </button>
                    <p>
                        <br/>
                        Not registered yet?&nbsp; 
                        <a href="/signup">Create an Account</a>
                    </p>
                </form>
            </div>
            <Outlet />
        </div>
    ) 
}


export default Login