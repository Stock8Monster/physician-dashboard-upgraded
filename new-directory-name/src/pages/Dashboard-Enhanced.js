/**
 * Enhanced Dashboard with Revolutionary Features
 * Seamlessly integrates industry-altering AI capabilities into existing dashboard
 */

import React, { useState, useEffect, useRef } from 'react';
import { Grommet, Box, Button, Layer, Text, Notification } from 'grommet';
import { Robot, StatusGood, Alert } from 'grommet-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styled from 'styled-components';

// Import existing dashboard
import Dashboard from './Dashboard';

// Import revolutionary components
import ClinicalAutopilot from '../components/dashboard/ClinicalAutopilot';
import RevolutionaryDashboard from '../components/dashboard/RevolutionaryDashboard';

// Import revolutionary services
import ambientIntelligence from '../services/ambientIntelligence';
import predictiveAnalytics from '../services/predictiveAnalytics';
import clinicalTrialsMatching from '../services/clinicalTrialsMatching';
import patientService from '../services/patientService';

const AIControlBar = styled(Box)`
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(90deg, rgba(0, 100, 255, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(0, 255, 255, 0.5);
  z-index: 1500;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

const AIButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  color: white;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }
`;

const NotificationBadge = styled(Box)`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4444;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 10px;
  font-weight: bold;
`;

const DashboardEnhanced = (props) => {
  const [revolutionaryMode, setRevolutionaryMode] = useState(false);
  const [aiFeatures, setAiFeatures] = useState({
    ambient: false,
    predictive: false,
    autopilot: false,
    trials: false
  });
  const [notifications, setNotifications] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAutopilot, setShowAutopilot] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [clinicalAlerts, setClinicalAlerts] = useState([]);
  
  const notificationTimeoutRef = useRef(null);

  useEffect(() => {
    // Check if user has premium features enabled
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin' || userRole === 'physician') {
      // Auto-enable revolutionary features for eligible users
      initializeRevolutionaryFeatures();
    }

    // Check for selected patient from ConsultList
    const storedPatient = localStorage.getItem('selectedPatient');
    if (storedPatient) {
      try {
        const patient = JSON.parse(storedPatient);
        setSelectedPatient(patient.Record || patient);
        startPredictiveAnalysis(patient.Record || patient);
      } catch (error) {
        console.error('Error parsing stored patient:', error);
      }
    }

    // Setup global event listeners
    setupEventListeners();

    return () => {
      cleanup();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Initialize revolutionary features
   */
  const initializeRevolutionaryFeatures = async () => {
    try {
      // Initialize services
      await predictiveAnalytics.initialize();
      await clinicalTrialsMatching.initialize();
      
      setAiFeatures(prev => ({
        ...prev,
        predictive: true,
        trials: true
      }));

      addNotification('Revolutionary AI features ready', 'normal');
    } catch (error) {
      console.error('Failed to initialize revolutionary features:', error);
      addNotification('Some AI features unavailable', 'warning');
    }
  };

  /**
   * Setup event listeners for AI systems
   */
  const setupEventListeners = () => {
    window.addEventListener('predictive-alert', handlePredictiveAlert);
    window.addEventListener('clinical-alert', handleClinicalAlert);
    window.addEventListener('trial-matches-found', handleTrialMatches);
    window.addEventListener('ambient-intelligence-update', handleAmbientUpdate);
  };

  /**
   * Handle predictive alerts
   */
  const handlePredictiveAlert = (event) => {
    const { alerts } = event.detail;
    
    alerts.forEach(alert => {
      if (alert.severity === 'critical') {
        addNotification(alert.message, 'critical');
        setClinicalAlerts(prev => [alert, ...prev].slice(0, 5));
      }
    });
  };

  /**
   * Handle clinical alerts
   */
  const handleClinicalAlert = (event) => {
    const alert = event.detail;
    addNotification(`Clinical Alert: ${alert.type}`, alert.severity);
  };

  /**
   * Handle trial matches
   */
  const handleTrialMatches = (event) => {
    const { matches } = event.detail;
    if (matches.length > 0) {
      addNotification(`${matches.length} clinical trial matches found`, 'info');
    }
  };

  /**
   * Handle ambient intelligence updates
   */
  const handleAmbientUpdate = (event) => {
    const { type, data } = event.detail;
    
    if (type === 'documentation_ready') {
      addNotification('Documentation auto-generated', 'success');
    }
  };

  /**
   * Add notification
   */
  const addNotification = (message, status = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      status,
      timestamp: new Date().toISOString()
    };
    
    setNotifications(prev => [notification, ...prev].slice(0, 5));
    
    // Auto-dismiss after 5 seconds
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    
    notificationTimeoutRef.current = setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };

  /**
   * Toggle revolutionary mode
   */
  const toggleRevolutionaryMode = () => {
    setRevolutionaryMode(prev => !prev);
    
    if (!revolutionaryMode) {
      addNotification('Revolutionary AI Mode Activated', 'success');
    }
  };

  /**
   * Toggle ambient intelligence
   */
  const toggleAmbientIntelligence = async () => {
    if (!aiFeatures.ambient) {
      if (selectedPatient) {
        await ambientIntelligence.initialize(selectedPatient.id);
        setAiFeatures(prev => ({ ...prev, ambient: true }));
        addNotification('Ambient listening started', 'normal');
      } else {
        addNotification('Select a patient first', 'warning');
      }
    } else {
      ambientIntelligence.stopListening();
      setAiFeatures(prev => ({ ...prev, ambient: false }));
      addNotification('Ambient listening stopped', 'info');
    }
  };

  /**
   * Toggle clinical autopilot
   */
  const toggleAutopilot = () => {
    setShowAutopilot(prev => !prev);
    setAiFeatures(prev => ({ ...prev, autopilot: !prev.autopilot }));
  };

  /**
   * Start predictive analysis for patient
   */
  const startPredictiveAnalysis = async (patient) => {
    if (patient) {
      const digitalTwin = await predictiveAnalytics.createPatientDigitalTwin(patient.id, patient);
      setPredictions(digitalTwin.predictions);
      
      if (digitalTwin.predictions.compositeRisk.score > 0.7) {
        addNotification('High risk patient - Autopilot recommended', 'warning');
        setShowAutopilot(true);
      }
    }
  };

  /**
   * Cleanup
   */
  const cleanup = () => {
    window.removeEventListener('predictive-alert', handlePredictiveAlert);
    window.removeEventListener('clinical-alert', handleClinicalAlert);
    window.removeEventListener('trial-matches-found', handleTrialMatches);
    window.removeEventListener('ambient-intelligence-update', handleAmbientUpdate);
    
    if (aiFeatures.ambient) {
      ambientIntelligence.stopListening();
    }
  };

  // If revolutionary mode is active, show the revolutionary dashboard
  if (revolutionaryMode) {
    return (
      <Grommet full>
        <RevolutionaryDashboard 
          patient={selectedPatient}
          onClose={() => setRevolutionaryMode(false)}
        />
      </Grommet>
    );
  }

  // Otherwise, show the enhanced regular dashboard
  return (
    <Grommet full>
      {/* AI Control Bar */}
      <AIControlBar>
        <Box direction="row" align="center" gap="small">
          <Robot size="small" color="brand" />
          <Text size="small" weight="bold">AI Assistant</Text>
          
          {/* AI Feature Status Indicators */}
          <Box direction="row" gap="xsmall">
            {aiFeatures.ambient && (
              <Box background="status-ok" pad="xsmall" round>
                <Text size="xsmall">Ambient</Text>
              </Box>
            )}
            {aiFeatures.predictive && (
              <Box background="status-ok" pad="xsmall" round>
                <Text size="xsmall">Predictive</Text>
              </Box>
            )}
            {aiFeatures.autopilot && (
              <Box background="status-ok" pad="xsmall" round>
                <Text size="xsmall">Autopilot</Text>
              </Box>
            )}
          </Box>
        </Box>

        <Box direction="row" align="center" gap="medium">
          {/* Quick Actions */}
          <Button
            label={aiFeatures.ambient ? "Stop Listening" : "Start Ambient AI"}
            onClick={toggleAmbientIntelligence}
            size="small"
            primary={!aiFeatures.ambient}
            color={aiFeatures.ambient ? "status-critical" : "status-ok"}
          />
          
          <Button
            label="Clinical Autopilot"
            onClick={toggleAutopilot}
            size="small"
            primary={!showAutopilot}
            icon={<Robot size="small" />}
          />
          
          <Box position="relative">
            <AIButton
              label="Revolutionary Mode"
              onClick={toggleRevolutionaryMode}
              size="small"
            />
            {clinicalAlerts.length > 0 && (
              <NotificationBadge>
                {clinicalAlerts.length}
              </NotificationBadge>
            )}
          </Box>
        </Box>
      </AIControlBar>

      {/* Notifications */}
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          toast
          status={notification.status}
          message={notification.message}
          onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
        />
      ))}

      {/* Clinical Autopilot Overlay */}
      {showAutopilot && selectedPatient && (
        <ClinicalAutopilot
          patientId={selectedPatient.id}
          isActive={showAutopilot}
          onToggle={toggleAutopilot}
        />
      )}

      {/* Clinical Alerts Layer */}
      {clinicalAlerts.length > 0 && (
        <Layer
          position="top-right"
          modal={false}
          margin={{ top: 'large', right: 'medium' }}
        >
          <Box
            background="dark-1"
            pad="medium"
            gap="small"
            width="medium"
            round="small"
          >
            <Box direction="row" justify="between" align="center">
              <Text weight="bold">Clinical Alerts</Text>
              <Button
                icon={<Alert color="status-critical" />}
                onClick={() => setClinicalAlerts([])}
                plain
              />
            </Box>
            {clinicalAlerts.slice(0, 3).map((alert, index) => (
              <Box
                key={index}
                pad="small"
                background={alert.severity === 'critical' ? 'status-critical' : 'status-warning'}
                round="xsmall"
              >
                <Text size="small">{alert.message}</Text>
              </Box>
            ))}
          </Box>
        </Layer>
      )}

      {/* Original Dashboard with props passed through */}
      <Box margin={{ top: '50px' }}>
        <Dashboard 
          {...props}
          onPatientSelect={(patient) => {
            setSelectedPatient(patient);
            startPredictiveAnalysis(patient);
          }}
        />
      </Box>
    </Grommet>
  );
};

export default DashboardEnhanced;