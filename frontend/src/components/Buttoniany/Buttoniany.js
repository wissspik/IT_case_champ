import React from 'react';
import './Buttoniany.css'
export default function Buttoniany({first, buttons, onClickHandler}) {
    return (
        <>
            <p>{first}</p>
            {buttons.map((buttonText, index) => (
                <button
                    key={index}
                    className="button"
                    onClick={() => onClickHandler[index](buttonText)}
                >
                    {buttonText}
                </button>
            ))}
        </>


    );
}
