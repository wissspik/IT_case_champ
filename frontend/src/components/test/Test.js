import React, {useState} from 'react'
import './Test.css'
import Faq from "../Faq/Faq";
import Grade from "../Grades/Grade";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="hamburger right" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </div>
            <div className={`sidebar right-sidebar ${isOpen ? 'open' : ''}`}>
                <button onClick={() => setIsOpen(false)} className="close-btn">×</button>
                <Faq/>
                <Grade
                    question="Насколько полезен наш бот?"
                    options={['1', '2', '3', '4', '5']}
                    onVote={(value) => console.log('User voted:', value)}
                />
            </div>
        </>
    )
}
