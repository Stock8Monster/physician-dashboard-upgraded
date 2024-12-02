import React, { useState, useEffect } from 'react';
import patientService from '../../services/patientService';
import ProcessingOverlay from '../ProcessingOverlay'; // Adjust the import path as needed

const convertToDateInputFormat = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
};

const convertToDisplayFormat = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const UpdateInfoCard = ({ selectedPatient }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        patientDOB: '',
        patientAddress: '',
        insuranceProvider: '',
        policyNumber: '',
        policyHolderName: ''
    });

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [loading, setLoading] = useState(false); // Add loading state
    const infoChannel = new BroadcastChannel('info_channel');

    useEffect(() => {
        if (selectedPatient) {
            const patientData = selectedPatient.Record;
            setFormData({
                patientName: patientData.name || '',
                patientEmail: patientData.communication.email || '',
                patientPhone: patientData.communication.home || '',
                patientDOB: patientData.birthDate ? convertToDateInputFormat(patientData.birthDate) : '',
                patientAddress: patientData.address || '',
                insuranceProvider: patientData.insuranceProvider || '',
                policyNumber: patientData.policyNumber || '',
                policyHolderName: patientData.policyHolderName || ''
            });
        }
    }, [selectedPatient]);

    const handleInfoFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInfoFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true on form submission
        const updatedFormData = {
            ...selectedPatient.Record,
            name: formData.patientName,
            communication: {
                ...selectedPatient.Record.communication,
                email: formData.patientEmail,
                home: formData.patientPhone
            },
            birthDate: convertToDisplayFormat(formData.patientDOB),
            address: formData.patientAddress,
            insuranceProvider: formData.insuranceProvider,
            policyNumber: formData.policyNumber,
            policyHolderName: formData.policyHolderName
        };
        try {
            await patientService.updatePatient(selectedPatient.Key, updatedFormData);
            alert('Information saved!');

            // Notify other components about the info update
            infoChannel.postMessage('info_updated');
        } catch (error) {
            console.error('Error updating patient information:', error);
            alert('Failed to save information.');
        } finally {
            setLoading(false); // Set loading to false after submission is complete
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="card">
            {loading && <ProcessingOverlay />} {/* Show the overlay when loading */}
            <button type="button" className="collapsible" onClick={toggleCollapse}>
                Update My Information
            </button>
            <div className={`collapsible-content ${isCollapsed ? '' : 'expanded'}`}>
                <form id="infoForm" onSubmit={handleInfoFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="patientName">Name</label>
                        <input type="text" id="patientName" name="patientName" value={formData.patientName} onChange={handleInfoFormChange} placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientEmail">Email</label>
                        <input type="email" id="patientEmail" name="patientEmail" value={formData.patientEmail} onChange={handleInfoFormChange} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientPhone">Phone</label>
                        <input type="tel" id="patientPhone" name="patientPhone" value={formData.patientPhone} onChange={handleInfoFormChange} placeholder="Enter your phone number" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientDOB">Date of Birth</label>
                        <input type="date" id="patientDOB" name="patientDOB" value={formData.patientDOB} onChange={handleInfoFormChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patientAddress">Address</label>
                        <textarea id="patientAddress" name="patientAddress" value={formData.patientAddress} onChange={handleInfoFormChange} rows="4" placeholder="Enter your address" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="insuranceProvider">Insurance Provider</label>
                        <input type="text" id="insuranceProvider" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleInfoFormChange} placeholder="Enter your insurance provider" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="policyNumber">Policy Number</label>
                        <input type="text" id="policyNumber" name="policyNumber" value={formData.policyNumber} onChange={handleInfoFormChange} placeholder="Enter your policy number" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="policyHolderName">Policy Holder Name</label>
                        <input type="text" id="policyHolderName" name="policyHolderName" value={formData.policyHolderName} onChange={handleInfoFormChange} placeholder="Enter policy holder name" required />
                    </div>
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateInfoCard;
