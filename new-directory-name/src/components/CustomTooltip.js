import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccccc' }}>
                <p className="label">{`Age : ${label}`}</p>
                <p style={{ color: '#8884d8' }}>{`Systolic : ${payload[0].value} mmHg`}</p>
                <p style={{ color: '#82ca9d' }}>{`Diastolic : ${payload[1].value} mmHg`}</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
