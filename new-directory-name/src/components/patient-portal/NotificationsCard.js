import React, { useState, useEffect } from 'react';

const NotificationsCard = () => {
    const [notifications, setNotifications] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
        setNotifications(storedNotifications);
    }, []);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="card">
            <button type="button" className="collapsible" onClick={toggleCollapse}>
                Notifications and Updates
            </button>
            <div className={`collapsible-content ${isCollapsed ? '' : 'expanded'}`} id="notificationsContainer">
                {notifications.map((notification, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={`notification${index}`}>Notification on {notification.date}</label>
                        <textarea id={`notification${index}`} name={`notification${index}`} rows="4" readOnly value={notification.message}></textarea>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsCard;
