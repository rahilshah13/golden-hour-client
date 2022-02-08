import React from 'react';

const popOverButtonStyle = {"background": "none", "border": "none"};

function LabelButton({onClick, text}) {
    const style = {border: "1px solid red", margin: "2.5%"};

    return (
        <div style={style}>
            <button style={popOverButtonStyle} onClick={onClick} >
                {text}
            </button>
        </div>
    );
}

export default LabelButton;