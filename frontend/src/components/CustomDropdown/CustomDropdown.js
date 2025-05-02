import React, {useState, useRef, useEffect} from 'react';
import './CustomDropdown.css';

export default function CustomDropdown({options, onSelect, placeholder, photos}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOptionClick = (option) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
        setSearchTerm("");
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                {selected || placeholder}
                <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
                <div className="dropdown-panel">
                    <input
                        type="text"
                        className="dropdown-search"
                        placeholder="Поиск..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className="dropdown-list">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => (
                                <li key={index} onClick={() => handleOptionClick(option)} className="dropdown-item">
                                    {<img src={photos[index]} height = {'20'}  alt=""/>}
                                    {option}
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item disabled">Ничего не найдено</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
