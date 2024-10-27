// src/components/MonthDropdown.js
import React from 'react';

const MonthDropdown = ({ selectedMonth, onChange }) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <select
            id="month-dropdown"
            value={selectedMonth}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="month-dropdown"
        >
            {months.map((month, index) => (
                <option key={index} value={index + 1}>{month}</option>
            ))}
        </select>
    );
};

export default MonthDropdown;
