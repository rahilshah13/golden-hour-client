
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// style stuff
const container = {width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"};
const col_container = {width: "100%", display: "flex", flexDirection: "row", margin: "1vw", marginLeft: "5%"};
const col = {width: "100%", display: "flex", alignItems: "left", flexDirection: "column", marginLeft: "1vw", marginRight: "1vw"};
const addBox = {marginTop: "5%"}


// hardcoded for demo purposes only
const blackList = ["bobligma@vt.edu", "sumodeeznuts@vt.edu", "carlsigma@vt.edu", "sigmabulls@vt.edu"];

// const currentAdmins = ["rahil@vt.edu", "scdrake19@vt.edu", "aribali3@vt.edu"];

// lol the state management here is so bad and lazy
function AdminPanel({userState, setUser, setAuth}) {

    const [isAdmin, setIsAdmin] = useState(false);
    const [appData, setAppData] = useState({"users": {"n":0,"avg_age":0,"avg_gender":0},"events":{"n":0},"interactions":{"n":0,"nl":0,"nr":0,"avg_dl":0,"avg_rl":0}});
    const [admins, setAdmins] = useState([]);
    const [outcomes, setOutcomes] = useState([]);
    const [bl, setBl] = useState(blackList);
    const [a, setA] = useState("");
    const [b, setB] = useState("");

    let navigate = useNavigate();

    useEffect(async () => { 
            const url =  'http://localhost:5000/api/isAdmin';
            let token = localStorage.getItem("token");
            if (!token)
              return false;
        
            fetch(url, {method: "GET", headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}})
            .then(async (res) => {
                if(res.status === 200) {
                    setIsAdmin(true);
                    let data = await res.json();
                    setAppData(data);
                    setOutcomes(data.outcomes);
                    setAdmins(data.admins.map(x => x.email));
                    console.log(data);
                }
                    
                else {
                    navigate("/");
                }
            })
            .catch(e => console.log(e));
        }, []
    );

    const a_add_onsubmit = async (e) => {
        let token = localStorage.getItem("token");
        if (!token)
          return false;

        fetch('http://localhost:5000/api/admin/add', {
            method: "POST", 
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} , 
            body: JSON.stringify({"admin": a})
        }).then(async (res) => {
            let data = await res.json();
            console.log(data.admins)
            setAdmins(data.admins.map(x => x.email));
        });
        setA("");
    };

    const a_delete_onsubmit = async (e) => {
        let token = localStorage.getItem("token");
        if (!token)
          return false;

        fetch('http://localhost:5000/api/admin/delete', {method: "POST", headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} , body: JSON.stringify({"admin": a})})
        .then(async (res) => {
            if (res.status === 200) {
                let data = await res.json();
                console.log(data.admins);
                setAdmins(data.admins.map(x => x.email));
            } else {
                console.log("can't delete not existant admin");
            }
        });
        setA("");
    };

    const b_onsubmit = (e) => {
        let newBl = bl;
        newBl.push(b);
        setBl(newBl);
        setB("");
    };

    const onChangeA = (e) => {setA(e.target.value)};
    const onChangeB = (e) => {setB(e.target.value)};
    
    return(
        isAdmin 
        ? 
            <div style={container}>
                <h2>Admin Panel</h2>
                <div style={col_container}>
                    <div style={col}>
                        <h3>Statistics</h3>
                        <li>{appData.users["n"]} active users</li>
                        <li>The Average user age is {appData.users.avg_age.toFixed(3)} years</li>
                        <li>The Average user gender is {appData.users.avg_gender.toFixed(3)} </li>
                        <li>{appData.interactions.n} total interactions</li>
                        <li>{appData.interactions.nl} left swipes averaging {appData.interactions.avg_dl.toFixed(3)}</li>
                        <li>{appData.interactions.nr} right swipes averaging {appData.interactions.avg_rl.toFixed(3)}</li>
                        <li>{appData.events.n} scheduled events!</li>
                    </div>
                    <div style={col}>
                        <h3>Current Admins</h3>
                        {
                            admins.map((user, index) => {
                                return <li key={index}> {user} </li>
                            })
                        }

                    </div>
                    <div style={col}>
                        <h3>Blacklisted Users</h3>
                        {bl.map((user, index) => {
                            return <li key={index}> {user} </li>
                        })}      
                    </div>
                </div>
                <div style={col_container}> 
                        <div style={col}>

                        </div>
                        <div style={col}>
                            <span style={addBox}>
                                <input type="text" value={a} onChange={onChangeA}></input>
                                <span>
                                    <button onClick={a_add_onsubmit}>add admin</button>
                                    <button onClick={a_delete_onsubmit}>delete admin</button>
                                </span>
                            </span>
                        </div>
                        <div style={col}>
                            <span style={addBox}>
                                <input type="text" value={b} onChange={onChangeB}></input>
                                <button onClick={b_onsubmit}>blacklist user</button>
                            </span>
                        </div>
                </div>
                <div style={col_container}>
                    <div style={col}>
                        <h3>Outcomes</h3>
                        {outcomes.map((o, index) => {
                            return <li key={index}> {`${o.participant_1_email} --> ${o.participant_2_email}: ${o.outcome}, ${parseFloat(o.duration).toFixed(3)} mins`} </li>
                        })}
                    </div>
                </div> 
            </div>
        : 
            <p>unauthorized</p>
    );
}

export default AdminPanel;