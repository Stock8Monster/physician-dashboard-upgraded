import React, { useState } from 'react';
import { Grommet } from 'grommet';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AppBar from './components/AppBar';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import AgamaPatientPortal from './pages/AgamaPatientPortal';
import ConsultList from './components/ConsultList'; // Import the new ConsultList component
import './styles/global.css';
import { ResponsiveProvider } from './contexts/ResponsiveContext';

const customTheme = {
    // Your custom theme code here...
};

function App() {
    const [isAuth, setIsAuth] = useState(false); // Authentication state
    const location = useLocation(); // Get the current location

    // Updated state to hold multiple popups
    const [popups, setPopups] = useState([]);

    const addPopup = (contentType, content) => {
        // Check if the popup with the same contentType already exists
        const popupExists = popups.some(popup => popup.contentType === contentType);
        if (popupExists) return; // If it exists, do not add another one

        const newPopup = {
            id: Date.now(), // Unique identifier for each popup
            contentType: contentType,
            isVisible: true,
            content: content,
        };
        setPopups((prevPopups) => [...prevPopups, newPopup]);
    };


    const removePopup = (id) => {
        setPopups((prevPopups) => prevPopups.filter((popup) => popup.id !== id));
    };

    const removePopupByType = (contentType) => {
        setPopups((prevPopups) => prevPopups.filter(popup => popup.contentType !== contentType));
    };

    return (
        <ResponsiveProvider>
            <Grommet theme={customTheme} full>
                {/* Conditionally render AppBar based on the current path */}
                {location.pathname !== '/patient-portal' && (
                    <AppBar
                        setAuth={setIsAuth}
                    />
                )}
                <Routes>
                    {/* Login Route */}
                    <Route path="/login" element={<Login setAuth={setIsAuth} />} />

                    {/* Main Route for ConsultList or Dashboard */}
                    <Route
                        path="/"
                        element={
                            isAuth ? (
                                <ConsultList /> // Show ConsultList if authenticated
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    {/* Admin Page Route */}
                    <Route path="/Admin" element={isAuth ? <AdminPage /> : <Navigate to="/login" />} />

                    {/* Patient Portal Route */}
                    <Route path="/patient-portal" element={<AgamaPatientPortal />} />

                    {/* Dashboard Route (accessible only after clicking a patient) */}
                    <Route
                        path="/dashboard"
                        element={
                            isAuth ? (
                                <Dashboard
                                    popups={popups} removePopup={removePopup} addPopup={addPopup} removePopupByType={removePopupByType}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    {/* Fallback Route for 404 Not Found */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Grommet>
        </ResponsiveProvider>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
