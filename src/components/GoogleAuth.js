import React, { useEffect } from "react";
import clientId from "../config/GoogleClientId";
import GoogleLogin from 'react-google-login';

async function onSuccess(user) {
    console.log(user, "lets goooo");
    fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.tokenId}`
        },
        body: JSON.stringify(user),
    }).then(res => console.log(res));
}



function GoogleAuth() {
    return (
        <GoogleLogin 
            clientId={clientId}
            buttonText="Login"
            onSuccess={async (user) => onSuccess(user)}
            onFailure={(user) => console.log("TODO: oAuth failure", user)}
            cookiePolicy={'single_host_origin'}
            redirectUri="localhost:3000/"
            hostedDomain="vt.edu"
            uxMode="popup"
        />
    );
}


export default GoogleAuth;
