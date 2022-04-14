
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function AdminPanel({userState, setUser, setAuth}) {

    const [isAdmin, setIsAdmin] = useState(false);
    let navigate = useNavigate();

    useEffect(async () => { 
            const url =  'http://localhost:5000/api/isAdmin';
            let token = localStorage.getItem("token");
            if (!token)
              return false;
        
            fetch(url, {method: "GET", headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
            .then(res => {
                if(res.status === 200)
                    setIsAdmin(true);
                else 
                    navigate("/");
            })
            .catch(e => console.log(e));
        }, []
    );

    return(
        isAdmin 
        ? 
            <div>
                <p>Admin Panel</p>
            </div>
        : 
            <p>unauthorized</p>
    );
}

export default AdminPanel;