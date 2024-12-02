import React, { useState } from 'react';
import '../components/patient-portal/AgamaPatientPortal.css';
import Greeting from '../components/patient-portal/Greeting';
import UpdateInfoCard from '../components/patient-portal/UpdateInfoCard';
import AppointmentCard from '../components/patient-portal/AppointmentCard';
import HealthRecordsCard from '../components/patient-portal/HealthRecordsCard';
import MedicalJournalCard from '../components/patient-portal/MedicalJournalCard';
import NotificationsCard from '../components/patient-portal/NotificationsCard';
import MedicationsCard from '../components/patient-portal/MedicationsCard';
import ChatBoxCard from '../components/patient-portal/ChatBoxCard';
import SettingsCard from '../components/patient-portal/SettingsCard';
import Footer from '../components/patient-portal/Footer';

const AgamaPatientPortal = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);

    return (
        <div>
            <Greeting onSelectPatient={setSelectedPatient} />
            <div className="container">
                {selectedPatient && <UpdateInfoCard selectedPatient={selectedPatient} />}
                {selectedPatient && <AppointmentCard selectedPatient={selectedPatient} />}
                {selectedPatient && <HealthRecordsCard selectedPatient={selectedPatient} />}
                {selectedPatient && <MedicalJournalCard selectedPatient={selectedPatient} />}
                {selectedPatient && <NotificationsCard selectedPatient={selectedPatient} />}
                {selectedPatient && <MedicationsCard selectedPatient={selectedPatient} />}
                {selectedPatient && <ChatBoxCard selectedPatient={selectedPatient} />}
                {selectedPatient && <SettingsCard selectedPatient={selectedPatient} />}
            </div>
            <Footer />
        </div>
    );
};

export default AgamaPatientPortal;
