import React from 'react';

const popOverButtonStyle = {"background": "none", "border": "none"};
const color1 = 'ff00ff';
const color0 = '0000ff';

function interpolateColor(c0, c1, f){
    c0 = c0.match(/.{1,2}/g).map((oct)=>parseInt(oct, 16) * (1-f))
    c1 = c1.match(/.{1,2}/g).map((oct)=>parseInt(oct, 16) * f)
    let ci = [0,1,2].map(i => Math.min(Math.round(c0[i]+c1[i]), 255))
    return ci.reduce((a,v) => ((a << 8) + v), 0).toString(16).padStart(6, "0")
}

function LabelButton({onClick, text, val, mode}) {
    const style = {margin: "2.5%"};
    const textColor = mode === "g"
        ? {color: "#"+interpolateColor(color0, color1, val)} 
        : {color: "#"+interpolateColor(interpolateColor(color0, color1, val[0]), interpolateColor(color0, color1, val[1]), .5)};

    // to differentiate between gender and preference label
    return (
        <div style={style}>
            <button style={popOverButtonStyle} onClick={onClick} >
                <p style={textColor}>{text}</p>
            </button>
        </div>
    );
}

export default LabelButton;