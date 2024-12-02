import React, { useState } from 'react';

const MedicationsCard = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="card">
            <button type="button" className="collapsible" onClick={toggleCollapse}>
                Medications
            </button>
            <div className={`collapsible-content ${isCollapsed ? '' : 'expanded'}`}>
                <h3>Active Medications</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Medication Name</th>
                        <th>Dose</th>
                        <th>Refill Dates</th>
                        <th>Prescriber</th>
                        <th>Reason for Prescription</th>
                        <th>Warning Info</th>
                        <th>Instructions for Taking</th>
                        <th>Frequency (Times per Day)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Aspirin</td>
                        <td>81mg</td>
                        <td>2024-07-01</td>
                        <td>Dr. Smith</td>
                        <td>Heart Health</td>
                        <td>May cause stomach upset</td>
                        <td>Take with food</td>
                        <td>1</td>
                    </tr>
                    </tbody>
                </table>

                <h3>Past Medications</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Medication Name</th>
                        <th>Dose</th>
                        <th>Refill Dates</th>
                        <th>Prescriber</th>
                        <th>Reason for Prescription</th>
                        <th>Warning Info</th>
                        <th>Instructions for Taking</th>
                        <th>Frequency (Times per Day)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ibuprofen</td>
                        <td>200mg</td>
                        <td>2024-06-01</td>
                        <td>Dr. Jones</td>
                        <td>Pain Relief</td>
                        <td>May cause drowsiness</td>
                        <td>Take with water</td>
                        <td>As needed</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MedicationsCard;
