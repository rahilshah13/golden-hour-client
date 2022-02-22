import React, { useEffect } from "react";
import clientId from "../config/GoogleClientId";
import GoogleLogin from 'react-google-login';
import "../styles/home.css";



function GoogleAuth({userState, setUser, setAuth}) {

    //TODO: TEST REQ NOT WORKING FLOW
    async function onSuccess(user, setAuth) {
        fetch(process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.tokenId}`
            },
            body: JSON.stringify(user),
        })
        .then(res => res.json())
        .then((data) => {
            setAuth(true);
            localStorage.setItem("token", data.token);
            console.log("data", data);
            setUser({...userState, "name": data.name, "pid": data.pid, "pic": data.pic});
        }).catch(e => console.log(e));
    }

    return (
        <div className="oAuthButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={async (user) => onSuccess(user, setAuth)}
                onFailure={(user) => console.log("TODO: oAuth failure", user)}
                cookiePolicy={'single_host_origin'}
                redirectUri="localhost:3000/"
                hostedDomain="vt.edu"
                uxMode="popup"
            />
        </div>
    );
}


export default GoogleAuth;
