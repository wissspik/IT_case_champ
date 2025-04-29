import React from 'react';
export default function EqualButtons({first, buttons, onClickHandler,value}) {
    return (
        <>
            <p>{first}</p>
            {buttons.map((buttonText, index) => (
                <button
                    key={index}
                    className="button"
                    onClick={() => onClickHandler(value[index])}
                >
                    {buttonText}
                </button>
            ))}
        </>


    );
}