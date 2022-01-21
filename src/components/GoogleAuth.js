import React, { useEffect } from "react";
import clientId from "../config/GoogleClientId";
import GoogleLogin from 'react-google-login';

function GoogleAuth() {

    return (
        <GoogleLogin 
            clientId={clientId}
            buttonText="Login"
            onSuccess={() => console.log("lets go")}
            onFailure={() => console.log("yah aye!")}
            cookiePolicy={'single_host_origin'}
        />
    );
}


export default GoogleAuth;
