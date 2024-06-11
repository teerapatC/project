import React from "react"
import { useSearchParams } from "react-router-dom"
import Axios from "axios"
const Receive = () =>{
    const [params] = useSearchParams()

    if(parseInt(localStorage.getItem('id'),10) === parseInt(params.get('id'))){
        Axios.put('/receiveowner',{
            ownerStatus : "receive",
            chatId : params.get('chat')
        }).then(res => {
            console.log(res)
            // window.location.href = `/chat?id=${params.get('chat')}`
            window.location.href = '/chat'
        })
        .catch(err => console.log(err))
    }else{
        Axios.put('/receive',{
            requesterStatus : "receive",
            chatId : params.get('chat')
        }).then(res => {
            console.log(res)
            // window.location.href = `/chat?id=${params.get('chat')}`
            window.location.href = '/chat'
        })
        .catch(err => console.log(err))
    }
    
    return (
        <>
        </>
    )
}

export default Receive