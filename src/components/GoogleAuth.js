import React, { useEffect } from "react";
import clientId from "../config/GoogleClientId";
import GoogleLogin from 'react-google-login';

// oauth with google works
async function onSuccess(user) {
    console.log(user, "lets goooo");

    fetch("/api/auth/login", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
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
        />
    );
}


export default GoogleAuth;
