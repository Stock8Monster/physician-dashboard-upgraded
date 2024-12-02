import React, { useState } from 'react';

const SettingsCard = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleSettingsFormSubmit = (e) => {
        e.preventDefault();
        const settingsData = {
            emrAccess: e.target.emrAccess.value,
            journalAccess: e.target.journalAccess.value
        };
        localStorage.setItem('settingsData', JSON.stringify(settingsData));
        alert('Settings saved!');
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="card">
            <button type="button" className="collapsible" onClick={toggleCollapse}>
                Settings-Privacy Control
            </button>
            <div className={`collapsible-content ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                <form id="settingsForm" onSubmit={handleSettingsFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="emrAccess">Who can access your EMR?</label>
                        <select id="emrAccess" name="emrAccess" required>
                            <option value="provider">Only my healthcare provider</option>
                            <option value="family">My healthcare provider and family members</option>
                            <option value="anyone">Anyone with the link</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="journalAccess">Who can access your Personal Medical Journal?</label>
                        <select id="journalAccess" name="journalAccess" required>
                            <option value="provider">Only my healthcare provider</option>
                            <option value="family">My healthcare provider and family members</option>
                            <option value="anyone">Anyone with the link</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Save Settings</button>
                </form>
            </div>
        </div>
    );
};

export default SettingsCard;
