import React from 'react';
export default function ButtonsForAccept({first, buttons, onClickHandler,sums}) {
    return (
        <>
            <p>{first}</p>
            {buttons.map((buttonText, index) => (
                <button
                    key={index}
                    className="button"
                    onClick={() => onClickHandler(buttonText,sums)}
                >
                    {buttonText}
                </button>
            ))}
        </>


    );
}
