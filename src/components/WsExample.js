import React, {useState} from "react";
import { socket } from '../helpers/Websocket';

function WsExample() {

    const [values, setValues] = useState({content: ""});

    const onSubmit = (e) => {
        socket.send(values.content);
        console.log("sending over ws: ", values)
        return;
    }
    
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }   

    return (
        <div>
            <form>
                <label>type sum:</label><br/>
                <input type="text" id="content" name="content" value={values.content} onChange={handleChange}/><br/>
            </form>
            <button onClick={onSubmit}>SEND</button>
        </div>
    );
}

export default WsExample;