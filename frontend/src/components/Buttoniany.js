import React from 'react';

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
