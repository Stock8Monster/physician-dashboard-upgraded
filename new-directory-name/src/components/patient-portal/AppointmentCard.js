import React, { useState, useEffect } from 'react';
import patientService from '../../services/patientService';
import ProcessingOverlay from '../ProcessingOverlay'; // Adjust the import path as needed

const AppointmentCard = ({ selectedPatient }) => {
    const [appointments, setAppointments] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState('new');
    const [formValues, setFormValues] = useState({
        appointmentType: '',
        appointmentDate: '',
        appointmentTime: '',
        requestedPhysician: ''
    });
    const [loading, setLoading] = useState(false); // Add loading state

    const appointmentChannel = new BroadcastChannel('appointment_channel');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await patientService.getAppointments(selectedPatient.Key);
                const appointmentsData = response.map(item => item.Record);
                setAppointments(appointmentsData || []);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [selectedPatient]);

    const handleAppointmentFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true on form submission
        const newAppointment = {
            patientId: selectedPatient.Key,
            appointmentType: e.target.appointmentType.value,
            appointmentDate: e.target.appointmentDate.value,
            appointmentTime: e.target.appointmentTime.value,
            requestedPhysician: e.target.requestedPhysician.value
        };

        try {
            if (selectedAppointmentIndex === 'new') {
                await patientService.createAppointment(newAppointment);
                const updatedAppointments = [...appointments, newAppointment];
                setAppointments(updatedAppointments);
                alert('Appointment scheduled!');
            } else {
                const appointmentId = appointments[selectedAppointmentIndex].appointmentId;
                await patientService.updateAppointment({ ...newAppointment, appointmentId });
                const updatedAppointments = appointments.map((appointment, index) =>
                    index === parseInt(selectedAppointmentIndex, 10) ? { ...newAppointment, appointmentId } : appointment
                );
                setAppointments(updatedAppointments);
                alert('Appointment updated!');
            }

            // Notify other components about the appointment update
            appointmentChannel.postMessage('appointment_updated');
            setFormValues({
                appointmentType: '',
                appointmentDate: '',
                appointmentTime: '',
                requestedPhysician: ''
            });
            setSelectedAppointmentIndex('new');
        } catch (error) {
            console.error('Error scheduling/updating appointment:', error);
            alert('Failed to schedule/update appointment.');
        } finally {
            setLoading(false); // Set loading to false after submission is complete
        }
    };

    const handleDeleteAppointment = async () => {
        if (selectedAppointmentIndex === 'new') return;

        const appointmentId = appointments[selectedAppointmentIndex].appointmentId;
        setLoading(true);
        try {
            await patientService.deleteAppointment(appointmentId);
            const updatedAppointments = appointments.filter((_, index) => index !== parseInt(selectedAppointmentIndex, 10));
            setAppointments(updatedAppointments);
            alert('Appointment deleted!');
            appointmentChannel.postMessage('appointment_updated');
            setFormValues({
                appointmentType: '',
                appointmentDate: '',
                appointmentTime: '',
                requestedPhysician: ''
            });
            setSelectedAppointmentIndex('new');
        } catch (error) {
            console.error('Error deleting appointment:', error);
            alert('Failed to delete appointment.');
        } finally {
            setLoading(false);
        }
    };

    const handleAppointmentSelectorChange = (e) => {
        const index = e.target.value;
        setSelectedAppointmentIndex(index);

        if (index === 'new') {
            setFormValues({
                appointmentType: '',
                appointmentDate: '',
                appointmentTime: '',
                requestedPhysician: ''
            });
        } else {
            const selectedAppointment = appointments[index];
            setFormValues({
                appointmentType: selectedAppointment.appointmentType,
                appointmentDate: selectedAppointment.appointmentDate,
                appointmentTime: selectedAppointment.appointmentTime,
                requestedPhysician: selectedAppointment.requestedPhysician
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="card">
            {loading && <ProcessingOverlay />} {/* Show the overlay when loading */}
            <button type="button" className="collapsible" onClick={toggleCollapse}>
                Appointment Scheduling
            </button>
            <div className={`collapsible-content ${isCollapsed ? '' : 'expanded'}`}>
                <form id="appointmentForm" onSubmit={handleAppointmentFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="appointmentSelector">Select Appointment</label>
                        <select id="appointmentSelector" name="appointmentSelector" onChange={handleAppointmentSelectorChange} value={selectedAppointmentIndex}>
                            <option value="new">Add New Appointment</option>
                            {appointments.map((appointment, index) => (
                                <option key={index} value={index}>
                                    Appointment on {appointment.appointmentDate} with {appointment.requestedPhysician}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="appointmentType">Type of Appointment</label>
                        <select id="appointmentType" name="appointmentType" required value={formValues.appointmentType} onChange={handleInputChange}>
                            <option value="general">General Checkup</option>
                            <option value="specialist">Specialist Consultation</option>
                            <option value="followup">Follow-Up</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="appointmentDate">Preferred Date</label>
                        <input type="date" id="appointmentDate" name="appointmentDate" required value={formValues.appointmentDate} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="appointmentTime">Preferred Time</label>
                        <input type="time" id="appointmentTime" name="appointmentTime" required value={formValues.appointmentTime} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="requestedPhysician">Requested Physician</label>
                        <input type="text" id="requestedPhysician" name="requestedPhysician" placeholder="Enter the physician's name" required value={formValues.requestedPhysician} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn">Schedule Appointment</button>
                    {selectedAppointmentIndex !== 'new' && (
                        <button type="button" className="btn" onClick={handleDeleteAppointment} style={{ marginLeft: '10px', backgroundColor: 'red' }}>
                            Delete Appointment
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AppointmentCard;
