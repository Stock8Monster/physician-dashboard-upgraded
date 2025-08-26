/**
 * Mock patient data for demonstration when API is unavailable
 */

export const mockPatients = [
  {
    Key: 'patient-001',
    Record: {
      id: 'patient-001',
      name: 'Vickie J. Moore',
      birthDate: '03/01/1950',
      dateOfBirth: '03/01/1950',
      age: 73,
      gender: 'Female',
      image: '/vickie-doe.png',
      address: '627 Floyd Rd NE, Calhoun, GA 30701',
      communication: {
        email: 'vickie.moore@email.com',
        home: '(770) 555-0001',
        mobile: '(770) 555-1001'
      },
      appointmentTime: '9:00 AM',
      reason: 'Routine check-up',
      insurance: 'HealthPlus Insurance',
      status: 'scheduled',
      riskLevel: 'high',
      conditions: ['Diabetes Type 2', 'Hypertension', 'COPD'],
      medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2020-01-15' },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2019-06-20' },
        { name: 'Albuterol', dosage: 'As needed', frequency: 'PRN', startDate: '2021-03-10' }
      ],
      allergies: ['Penicillin', 'Sulfa drugs'],
      vitals: {
        bloodPressure: { systolic: 145, diastolic: 92 },
        heartRate: 88,
        temperature: 98.6,
        respiratoryRate: 18,
        oxygenSaturation: 94,
        weight: 165
      },
      labs: {
        glucose: 185,
        hba1c: 8.2,
        creatinine: 1.2,
        wbc: 11.5,
        hemoglobin: 12.8
      },
      activeProblems: [
        { name: 'Diabetes Type 2', icd10: 'E11.9', diagnosedDate: '2018-05-15', severity: 'moderate' },
        { name: 'Essential Hypertension', icd10: 'I10', diagnosedDate: '2017-03-20', severity: 'moderate' },
        { name: 'COPD', icd10: 'J44.0', diagnosedDate: '2021-01-10', severity: 'mild' }
      ],
      charts: []
    }
  },
  {
    Key: 'patient-002',
    Record: {
      id: 'patient-002',
      name: 'John Smith',
      birthDate: '07/15/1965',
      dateOfBirth: '07/15/1965',
      age: 58,
      gender: 'Male',
      image: '/john-smith.png',
      address: '123 Oak Street, Atlanta, GA 30303',
      communication: {
        email: 'john.smith@email.com',
        home: '(404) 555-0002',
        mobile: '(404) 555-1002'
      },
      appointmentTime: '10:00 AM',
      reason: 'Blood test follow-up',
      insurance: 'MediCare',
      status: 'scheduled',
      riskLevel: 'moderate',
      conditions: ['Hyperlipidemia', 'Pre-diabetes'],
      medications: [
        { name: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily', startDate: '2022-02-10' },
        { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', startDate: '2022-02-10' }
      ],
      allergies: ['None known'],
      vitals: {
        bloodPressure: { systolic: 135, diastolic: 85 },
        heartRate: 75,
        temperature: 98.4,
        respiratoryRate: 16,
        oxygenSaturation: 98,
        weight: 195
      },
      labs: {
        glucose: 115,
        hba1c: 6.1,
        ldl: 145,
        hdl: 38,
        triglycerides: 220
      },
      activeProblems: [
        { name: 'Hyperlipidemia', icd10: 'E78.5', diagnosedDate: '2022-01-15', severity: 'mild' },
        { name: 'Pre-diabetes', icd10: 'R73.03', diagnosedDate: '2023-06-20', severity: 'mild' }
      ],
      charts: []
    }
  },
  {
    Key: 'patient-003',
    Record: {
      id: 'patient-003',
      name: 'Mary Johnson',
      birthDate: '11/22/1978',
      dateOfBirth: '11/22/1978',
      age: 45,
      gender: 'Female',
      image: '/mary-johnson.png',
      address: '456 Pine Avenue, Marietta, GA 30060',
      communication: {
        email: 'mary.johnson@email.com',
        home: '(678) 555-0003',
        mobile: '(678) 555-1003'
      },
      appointmentTime: '10:30 AM',
      reason: 'Migraine consultation',
      insurance: 'BlueCross BlueShield',
      status: 'scheduled',
      riskLevel: 'low',
      conditions: ['Migraine', 'Anxiety'],
      medications: [
        { name: 'Sumatriptan', dosage: '100mg', frequency: 'As needed', startDate: '2021-08-15' },
        { name: 'Sertraline', dosage: '50mg', frequency: 'Once daily', startDate: '2022-11-10' }
      ],
      allergies: ['Codeine'],
      vitals: {
        bloodPressure: { systolic: 118, diastolic: 78 },
        heartRate: 68,
        temperature: 98.6,
        respiratoryRate: 14,
        oxygenSaturation: 99,
        weight: 145
      },
      labs: {
        glucose: 92,
        tsh: 2.1,
        vitaminD: 28
      },
      activeProblems: [
        { name: 'Migraine', icd10: 'G43.909', diagnosedDate: '2020-05-10', severity: 'moderate' },
        { name: 'Generalized Anxiety Disorder', icd10: 'F41.1', diagnosedDate: '2022-09-15', severity: 'mild' }
      ],
      charts: []
    }
  },
  {
    Key: 'patient-004',
    Record: {
      id: 'patient-004',
      name: 'Robert Brown',
      birthDate: '04/10/1955',
      dateOfBirth: '04/10/1955',
      age: 68,
      gender: 'Male',
      image: '/robert-brown.png',
      address: '789 Elm Court, Decatur, GA 30030',
      communication: {
        email: 'robert.brown@email.com',
        home: '(404) 555-0004',
        mobile: '(404) 555-1004'
      },
      appointmentTime: '11:00 AM',
      reason: 'Diabetes management',
      insurance: 'United Health',
      status: 'scheduled',
      riskLevel: 'high',
      conditions: ['Diabetes Type 2', 'Chronic Kidney Disease', 'Hypertension'],
      medications: [
        { name: 'Insulin Glargine', dosage: '20 units', frequency: 'Once daily', startDate: '2019-03-15' },
        { name: 'Metformin', dosage: '1000mg', frequency: 'Twice daily', startDate: '2018-01-10' },
        { name: 'Losartan', dosage: '50mg', frequency: 'Once daily', startDate: '2020-06-20' }
      ],
      allergies: ['Shellfish', 'Iodine'],
      vitals: {
        bloodPressure: { systolic: 155, diastolic: 95 },
        heartRate: 82,
        temperature: 98.5,
        respiratoryRate: 17,
        oxygenSaturation: 96,
        weight: 210
      },
      labs: {
        glucose: 210,
        hba1c: 9.1,
        creatinine: 1.8,
        gfr: 42,
        potassium: 5.1
      },
      activeProblems: [
        { name: 'Diabetes Type 2', icd10: 'E11.9', diagnosedDate: '2015-03-10', severity: 'severe' },
        { name: 'CKD Stage 3b', icd10: 'N18.32', diagnosedDate: '2021-07-15', severity: 'moderate' },
        { name: 'Essential Hypertension', icd10: 'I10', diagnosedDate: '2018-01-20', severity: 'moderate' }
      ],
      charts: []
    }
  },
  {
    Key: 'patient-005',
    Record: {
      id: 'patient-005',
      name: 'Linda Martinez',
      birthDate: '09/30/1990',
      dateOfBirth: '09/30/1990',
      age: 33,
      gender: 'Female',
      image: '/linda-martinez.png',
      address: '321 Maple Drive, Alpharetta, GA 30022',
      communication: {
        email: 'linda.martinez@email.com',
        home: '(770) 555-0005',
        mobile: '(770) 555-1005'
      },
      appointmentTime: '2:00 PM',
      reason: 'Prenatal visit',
      insurance: 'Aetna',
      status: 'scheduled',
      riskLevel: 'low',
      conditions: ['Pregnancy - 24 weeks'],
      medications: [
        { name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Once daily', startDate: '2023-08-01' },
        { name: 'Folic Acid', dosage: '400mcg', frequency: 'Once daily', startDate: '2023-07-15' }
      ],
      allergies: ['Latex'],
      vitals: {
        bloodPressure: { systolic: 112, diastolic: 70 },
        heartRate: 78,
        temperature: 98.7,
        respiratoryRate: 16,
        oxygenSaturation: 99,
        weight: 158
      },
      labs: {
        glucose: 88,
        hemoglobin: 11.5,
        glucoseToleranceTest: 'Normal'
      },
      activeProblems: [
        { name: 'Pregnancy', icd10: 'Z33.1', diagnosedDate: '2023-07-01', severity: 'normal' }
      ],
      charts: []
    }
  },
  {
    Key: 'patient-006',
    Record: {
      id: 'patient-006',
      name: 'Michael Davis',
      birthDate: '06/18/1972',
      dateOfBirth: '06/18/1972',
      age: 51,
      gender: 'Male',
      image: '/michael-davis.png',
      address: '654 Birch Lane, Sandy Springs, GA 30328',
      communication: {
        email: 'michael.davis@email.com',
        home: '(404) 555-0006',
        mobile: '(404) 555-1006'
      },
      appointmentTime: '3:00 PM',
      reason: 'Chest pain evaluation',
      insurance: 'Cigna',
      status: 'urgent',
      riskLevel: 'critical',
      conditions: ['Coronary Artery Disease', 'Hyperlipidemia'],
      medications: [
        { name: 'Clopidogrel', dosage: '75mg', frequency: 'Once daily', startDate: '2023-10-01' },
        { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', startDate: '2023-10-01' },
        { name: 'Atorvastatin', dosage: '80mg', frequency: 'Once daily', startDate: '2023-10-01' }
      ],
      allergies: ['ACE Inhibitors'],
      vitals: {
        bloodPressure: { systolic: 165, diastolic: 102 },
        heartRate: 95,
        temperature: 98.9,
        respiratoryRate: 20,
        oxygenSaturation: 93,
        weight: 225
      },
      labs: {
        troponin: 0.08,
        bnp: 250,
        ldl: 180,
        ckMb: 4.2
      },
      activeProblems: [
        { name: 'Coronary Artery Disease', icd10: 'I25.10', diagnosedDate: '2023-09-15', severity: 'severe' },
        { name: 'Hyperlipidemia', icd10: 'E78.5', diagnosedDate: '2020-02-10', severity: 'moderate' }
      ],
      charts: []
    }
  }
];

export default mockPatients;