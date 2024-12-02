// src/components/ConsultList.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './ConsultList.css'; // Import the CSS file for styles

const ConsultList = () => {
    const navigate = useNavigate(); // Use useNavigate for navigation

    // Handler for clicking the first patient to navigate to the Dashboard
    const handleFirstPatientClick = (e) => {
        e.preventDefault();
        navigate('/dashboard'); // Use navigate to go to the Dashboard
    };

    return (
        <div className="container">
            <div className="header">
                Scheduled Consults Today
            </div>
            <div className="consult-list">
                {/* First Patient (Clickable Name) */}
                <div className="consult-entry hover-highlight" onClick={handleFirstPatientClick} style={{ cursor: 'pointer' }}>
                    <div className="consult-left">
                        <img src="/vickie-doe.png" alt="Patient Headshot" />
                        <div className="consult-details-left">
                            <p className="consult-name">Vickie Doe</p>
                            <p className="consult-reason">Reason: Routine check-up</p>
                        </div>
                    </div>
                    <div className="consult-middle">
                        <p className="consult-time">9:00 AM</p>
                    </div>
                    <div className="consult-right">
                        <p className="consult-insurance">Insurance: HealthPlus Insurance</p>
                    </div>
                </div>
                {/* Second Patient */}
                <div className="consult-entry">
                    <div className="consult-left">
                        <img src="/john-smith.png" alt="Patient Headshot" />
                        <div className="consult-details-left">
                            <p className="consult-name">John Smith</p>
                            <p className="consult-reason">Reason: Follow-up on blood test results</p>
                        </div>
                    </div>
                    <div className="consult-middle">
                        <p className="consult-time">10:00 AM</p>
                    </div>
                    <div className="consult-right">
                        <p className="consult-insurance">Insurance: MediCare</p>
                    </div>
                </div>
                {/* Third Patient */}
                <div className="consult-entry">
                    <div className="consult-left">
                        <img src="/mary-johnson.png" alt="Patient Headshot" />
                        <div className="consult-details-left">
                            <p className="consult-name">Mary Johnson</p>
                            <p className="consult-reason">Reason: Consultation for back pain</p>
                        </div>
                    </div>
                    <div className="consult-middle">
                        <p className="consult-time">10:30 AM</p>
                    </div>
                    <div className="consult-right">
                        <p className="consult-insurance">Insurance: BlueCross BlueShield</p>
                    </div>
                </div>
                {/* Fourth Patient */}
                <div className="consult-entry">
                    <div className="consult-left">
                        <img src="/robert-brown.png" alt="Patient Headshot" />
                        <div className="consult-details-left">
                            <p className="consult-name">Robert Brown</p>
                            <p className="consult-reason">Reason: Diabetes management</p>
                        </div>
                    </div>
                    <div className="consult-middle">
                        <p className="consult-time">11:00 AM</p>
                    </div>
                    <div className="consult-right">
                        <p className="consult-insurance">Insurance: United Health</p>
                    </div>
                </div>
                {/* Fifth Patient (Cancelled) */}
                <div className="consult-entry cancelled">
                    <div className="consult-left">
                        <img src="/patricia-garcia.png" alt="Patient Headshot" />
                        <div className="consult-details-left">
                            <p className="consult-name">Patricia Garcia</p>
                            <p className="consult-reason">Reason: Flu symptoms</p>
                        </div>
                    </div>
                    <div className="consult-middle">
                        <p className="cancelled-message">Cancelled appointment</p>
                        <p className="consult-time">11:30 AM</p>
                    </div>
                    <div className="consult-right">
                        <p className="consult-insurance">Insurance: Cigna Health</p>
                    </div>
                </div>
                {/* Sixth Patient */}
                <div className="consult-entry">
                    <div className="consult-left">
                        <img src="/michael-davis.png" alt="Patient Headshot" />
                        <div className="consult-details-left">
                            <p className="consult-name">Michael Davis</p>
                            <p className="consult-reason">Reason: Skin rash evaluation</p>
                        </div>
                    </div>
                    <div className="consult-middle">
                        <p className="consult-time">1:00 PM</p>
                    </div>
                    <div className="consult-right">
                        <p className="consult-insurance">Insurance: Aetna Insurance</p>
                    </div>
                </div>
                {/* Seventh Patient */}
                <div className="consult-entry">
                    <div className="consult-left">
                        <img src="/linda-martinez.png" alt="Patient Headshot" />
                        <div className="consult-details-left">
                            <p className="consult-name">Linda Martinez</p>
                            <p className="consult-reason">Reason: Prescription renewal</p>
                        </div>
                    </div>
                    <div className="consult-middle">
                        <p className="consult-time">1:30 PM</p>
                    </div>
                    <div className="consult-right">
                        <p className="consult-insurance">Insurance: Kaiser Permanente</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultList;
