import React from 'react';
import Slider from '@mui/material/Slider';
import Popover from '@mui/material/Popover';
import { getGender } from './GenderSlider';

const NON_BINARY_RANGE = .33;
const minDistance = .1;

function getPrefLabel(vals) {
    if (!Array.isArray(vals))
        return "I'd like to match with folks";
    
    if (vals[0] <= NON_BINARY_RANGE && vals[1] <= NON_BINARY_RANGE)
        return "I'd like to match with men"

    if (vals[0] > 2*NON_BINARY_RANGE && vals[1] > 2*NON_BINARY_RANGE)
        return "I'd like to match with women"

    return "I'd like to match with folks";
}

const marks = [
    {value: 0.0, label: ''},
    {value: .33, label: ''},
    {value: .66, label: ''},
    {value: 1.0, label: ''}
]

function PreferenceSlider({user, setUser, anchorEl, setAnchorEl}) {

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue))
          return;
    
        if (newValue[1] - newValue[0] < minDistance) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 1 - minDistance);
            setUser({...user, preference: [clamped, clamped + minDistance]});
          } else {
            const clamped = Math.max(newValue[1], minDistance);
            setUser({...user, preference: [clamped - minDistance, clamped]});
          }
        } else {
          setUser({...user, preference: newValue});
        }
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        console.log("close pref slider");
    };

    return (
        <Popover 
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            transformOrigin={{vertical: 'bottom', horizontal: 'center'}}
            id={Boolean(anchorEl) ? "prefPopover": undefined}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
        >   
            <div style={{width: "70vw", background: "none", height: "100%", border: "1px solid red", margin: "10%"}}>
                <Slider
                    getAriaLabel={() => 'Minimum distance shift'}
                    min={0}
                    max={1}
                    step={.01}
                    value={user.preference}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={getGender}
                    getAriaValueText={getGender}
                    marks={marks}
                    disableSwap
                />
            </div>
        </Popover>
    );
}

export {
    PreferenceSlider,
    getPrefLabel,
};