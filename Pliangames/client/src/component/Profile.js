import React, {useEffect, useState} from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import "./Profile.css"
import iconDetail from "./image/right.png"
import Axios from "axios";

const Profile = () => {
    const [userSearch] = useSearchParams()
    const [profile, setProfile] = useState([])
    const [review, setReview] = useState([])
    const [report, setReport] = useState([])
    
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

        Axios.post('/profile', {
            headers : {"id": userSearch.get('user')}
        })
        .then(res => {
            setProfile(prev => {
                return res.data
            })
        })
        .catch(err => console.log(err))

        Axios.post('/getreview', {
            headers : {"id": userSearch.get('user')}
        })
        .then(res => {
            setReview(prev => {
                return res.data
            })
        })
        .catch(err => console.log(err))

        Axios.post('/getreport', {
            headers : {"id": userSearch.get('user')}
        })
        .then(res => {
            setReport(prev => {
                return res.data
            })
        })
        .catch(err => console.log(err))

    },[userSearch])

    const reviewList = review.map((e,i) => (
        <div className="review-content" key={i}>
            <p>From: {e.reviewFrom}</p>
            <p>Review: {e.review}</p>
        </div>
    ))

    const reportList = report.map((e,i) => (
        <div className="report-content" key={i}>
            <p>From: {e.reportFrom}</p>
            <p>Report: {e.report}</p>
        </div>
    ))

    return(
        <div>
            <div className="profile-container">
                <div className="profile-content">
                    <p> User name: {profile[0]?.name}</p>
                    <p> Total swaps: {profile[0]?.totalSwaps}</p>
                    <p className="title"> ความคิดเห็นในการแลกเปลี่ยน: {review.length} &nbsp;
                        <button onClick={()=>document.getElementById("popupDetailReview").style.display="block"}>ดูทั้งหมด<img src={iconDetail} alt="detail" /> </button>
                    </p>
                    <div className="reviewsample">
                        {reviewList[0]}
                        {reviewList[1]}
                    </div>
                    <p className="title"> รีพอร์ต: {report.length} &nbsp;
                        <button onClick={()=>document.getElementById("popupDetailReport").style.display="block"}>ดูทั้งหมด<img src={iconDetail} alt="detail" /> </button>
                    </p>
                    <div className="reportsample">
                        {reportList[0]}
                        {reportList[1]}
                    </div>
                </div>
            </div>

            <div className="popupDetailReview" id="popupDetailReview">
                <div className="detail-container">
                    <span className="close" 
                        onClick={()=>document.getElementById("popupDetailReview").style.display="none"}>
                        &times;
                    </span>
                    {reviewList}
                </div>
            </div>

            <div className="popupDetailReport" id="popupDetailReport">
                <div className="detail-container">
                    <span className="close" 
                        onClick={()=>document.getElementById("popupDetailReport").style.display="none"}>
                        &times;
                    </span>
                    {reportList}
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default Profile