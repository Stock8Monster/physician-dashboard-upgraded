// Dynamic ConsultList that uses patient data from service
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import patientService from '../services/patientService';
import './ConsultList.css';

const ConsultListDynamic = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const patientData = await patientService.listPatientsWithCharts();
            console.log('Fetched patients for ConsultList:', patientData);
            setPatients(patientData);
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePatientClick = (patient) => {
        // Store selected patient in localStorage for dashboard to access
        localStorage.setItem('selectedPatient', JSON.stringify(patient));
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="container">
                <div className="header">Loading Scheduled Consults...</div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="header">
                Scheduled Consults Today - {new Date().toLocaleDateString()}
            </div>
            <div className="consult-list">
                {patients.map((patient) => {
                    const record = patient.Record || patient;
                    const isCritical = record.riskLevel === 'critical';
                    const isHigh = record.riskLevel === 'high';
                    
                    return (
                        <div 
                            key={patient.Key || record.id}
                            className={`consult-entry hover-highlight ${isCritical ? 'critical-patient' : ''}`}
                            onClick={() => handlePatientClick(patient)}
                            style={{ 
                                cursor: 'pointer',
                                borderLeft: isCritical ? '5px solid #ff4444' : isHigh ? '5px solid #ffaa00' : 'none',
                                background: isCritical ? 'rgba(255, 68, 68, 0.05)' : isHigh ? 'rgba(255, 170, 0, 0.05)' : ''
                            }}
                        >
                            <div className="consult-left">
                                <img 
                                    src={record.image || '/vickie-doe.png'} 
                                    alt={`${record.name} headshot`}
                                    style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                                />
                                <div className="consult-details-left">
                                    <p className="consult-name" style={{ fontWeight: 'bold' }}>
                                        {record.name}
                                        {isCritical && <span style={{ color: '#ff4444', marginLeft: '10px' }}>⚠️ CRITICAL</span>}
                                        {isHigh && <span style={{ color: '#ffaa00', marginLeft: '10px' }}>⚠️ HIGH RISK</span>}
                                    </p>
                                    <p className="consult-reason">
                                        Reason: {record.reason || 'General consultation'}
                                    </p>
                                    {record.conditions && record.conditions.length > 0 && (
                                        <p style={{ fontSize: '12px', color: '#666' }}>
                                            Conditions: {record.conditions.slice(0, 2).join(', ')}
                                            {record.conditions.length > 2 && ` +${record.conditions.length - 2} more`}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="consult-middle">
                                <p className="consult-time" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                    {record.appointmentTime || '9:00 AM'}
                                </p>
                                {record.status === 'urgent' && (
                                    <span style={{ 
                                        backgroundColor: '#ff4444', 
                                        color: 'white', 
                                        padding: '2px 8px', 
                                        borderRadius: '10px',
                                        fontSize: '12px'
                                    }}>
                                        URGENT
                                    </span>
                                )}
                            </div>
                            <div className="consult-right">
                                <p className="consult-insurance">
                                    Insurance: {record.insurance || 'Not specified'}
                                </p>
                                {record.age && (
                                    <p style={{ fontSize: '14px', color: '#666' }}>
                                        Age: {record.age} | {record.gender}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
                
                {patients.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        No scheduled consultations for today
                    </div>
                )}
            </div>

            {/* Revolutionary AI Features Indicator */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '15px 25px',
                borderRadius: '25px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
            }}
            onClick={() => navigate('/dashboard-ai')}
            >
                <span style={{ fontSize: '20px' }}>🤖</span>
                <div>
                    <div style={{ fontWeight: 'bold' }}>AI Features Available</div>
                    <div style={{ fontSize: '12px' }}>Click any patient to experience revolutionary AI</div>
                </div>
            </div>
        </div>
    );
};

export default ConsultListDynamic;