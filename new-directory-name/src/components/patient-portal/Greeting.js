import React, { useEffect, useState } from 'react';
import patientService  from '../../services/patientService';

const Greeting = ({ onSelectPatient }) => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patients = await patientService.listPatientsWithCharts();
                setPatients(patients);
                if (patients.length > 0) {
                    setSelectedPatient(patients[0]);
                    onSelectPatient(patients[0]);
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, [onSelectPatient]);

    const handlePatientChange = (e) => {
        const patientId = e.target.value;
        const patient = patients.find(p => p.Key === patientId);
        setSelectedPatient(patient);
        onSelectPatient(patient);
    };

    return (
        <div className="greeting" id="greeting">
            {patients.length > 0 && selectedPatient ? (
                <>
                    <span>Hello </span>
                    <select className="patient-select" value={selectedPatient.Key} onChange={handlePatientChange}>
                        {patients.map((patient) => (
                            <option key={patient.Key} value={patient.Key}>
                                {patient.Record.name}
                            </option>
                        ))}
                    </select>
                    <span>, Welcome to Your Health Journey!</span>
                </>
            ) : (
                'Loading patients...'
            )}
        </div>
    );
};

export default Greeting;
