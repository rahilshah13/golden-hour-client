import React from 'react';
import Slider from '@mui/material/Slider';
import Popover from '@mui/material/Popover';

const marks = [
    {value: 0.0, label: ''},
    {value: .34, label: ''},
    {value: .66, label: ''},
    {value: 1.0, label: ''},
]

const NON_BINARY_RANGE = .33
function getGender(val) {
    if(val < NON_BINARY_RANGE) return "man";
    else if(val > NON_BINARY_RANGE*2) return "woman";
    return "non-binary";
}

function getGenderLabel(val) {
    if(val < NON_BINARY_RANGE) return "I'm a man";
    else if(val > NON_BINARY_RANGE*2) return "I'm a woman";
    return "I'm non-binary";
}

function GenderSlider({setUser, user, anchorEl, setAnchorEl}) {
    const handleChange = (e, newValue) => {setUser({...user, gender: newValue})};
    const handleClose = (e) => {
        console.log("close gender slider");
        setAnchorEl(null);
    };

    return (
        <Popover
            style={{background: "rgba(0,0,0,0)"}} 
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            transformOrigin={{vertical: 'bottom', horizontal: 'center'}}
            id={Boolean(anchorEl) ? "genderPopover": undefined}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
        >
                <Slider
                    sx={{ width: "80vw", background: "rgba(0,0,0,0.0)"}}
                    track={false}
                    defaultValue={.5}
                    min={0}
                    max={1}
                    step={.01}
                    value={user.gender}
                    onChange={handleChange}
                    marks={marks}
                    valueLabelFormat={getGender}
                />
        </Popover>
    )
}

export {
    getGenderLabel,
    getGender,
    GenderSlider
};