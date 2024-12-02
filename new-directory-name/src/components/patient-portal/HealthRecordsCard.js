import React from 'react';

const HealthRecordsCard = () => {
    const buttonStyle = {
        backgroundColor: '#00BCD4', // Adjust this color as needed
        color: 'white',
        padding: '10px 20px',
        margin: '5px', // Add margin to create space between buttons
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    return (
        <div className="card">
            <h2>Your Health Records</h2>
            <button className="btn" style={{marginRight: "15px"}}>View Health Records</button>
            <button className="btn" style={{marginRight: "15px"}}>Add New Records</button>
            <button className="btn" style={{marginRight: "15px"}}>Save My Records</button>
        </div>
    );
};

export default HealthRecordsCard;
