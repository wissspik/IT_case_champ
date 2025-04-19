import React from 'react';
import './Buttoni.css'
export default function Buttoni({first, buttons, onClickHandler}) {
    return (
        <>
            <p>{first}</p>
            {buttons.map((buttonText, index) => (
                <button
                    key={index}
                    className="button"
                    onClick={() => onClickHandler(buttonText)}
                >
                    {buttonText}
                </button>
            ))}
        </>


    );
}
