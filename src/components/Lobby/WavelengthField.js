import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { FaWaveSquare, FaInfoCircle } from "react-icons/fa";
import emojiSet from '../../helpers/emojiSet';

const operatorSet = new Set(["(", ")", "+", "-", "*", "/", " "]);
function validateInput(input) {
    let exp = "";
    if(input === "") return "valid";
    if(input.length > 20) return "too_long";

    for(const c of input) {
        if(emojiSet.has(c)) exp = exp.concat("1");
        else exp = exp.concat(c);
        if(!operatorSet.has(c) && !emojiSet.has(c)) return c;
    }

    try {
        if(!eval(exp)) return "expression"
    } catch(e) {
        return "expression"
    }

    return "valid";
}

function getHelperText(e) {
    if(e === 'too_long') return "max characters exceeded";
    else if(e === 'valid') return "express your wavelength in emoji";
    else if(e === 'expression') return "fix your expression";
    else return `invalid character: ${e}`;
}

function WavelengthField({user, setUser}) {
    const [val, setVal] = useState("");
    const [error, setError] = useState("valid");

    const handleChange = (event) => {
        setError(validateInput(event.target.value));
        setVal(event.target.value);
        if(error === 'too_long') setVal(event.target.value.slice(0, 20));
        if(error === 'valid') setUser({...user, "wavelength": event.target.value});
    };

    return (
        <div style={{margin: "5%"}}>
            <TextField
                error={error === 'valid' ? false : true}
                id="my-wavelength"
                helperText={getHelperText(error)}
                variant="standard"
                value={val}
                color={error === 'valid' ? "success" : "warning"}
                onChange={handleChange}
                InputProps={{
                    startAdornment: 
                        <div style={{marginRight: "5%"}}>
                            <FaWaveSquare />
                        </div>,
                    endAdornment: 
                        <div style={{marginLeft: "5%"}}>
                            <FaInfoCircle />
                        </div>
                }}
            />
        </div>
    );
}


export {
    WavelengthField
};