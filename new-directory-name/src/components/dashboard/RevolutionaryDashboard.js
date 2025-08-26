/**
 * Revolutionary Dashboard Integration
 * Industry-altering healthcare platform with unprecedented AI capabilities
 * This component orchestrates all revolutionary features into a cohesive experience
 */

import React, { useState, useEffect, useRef } from 'react';
import { Box, Layer, Button, Text, Heading, Meter, Card, Notification } from 'grommet';
import { StatusGood, StatusWarning, StatusCritical, Robot, Analytics, TestDesktop, Alert } from 'grommet-icons';
import styled, { keyframes } from 'styled-components';
import ClinicalAutopilot from './ClinicalAutopilot';
import ambientIntelligence from '../../services/ambientIntelligence';
import predictiveAnalytics from '../../services/predictiveAnalytics';
import clinicalTrialsMatching from '../../services/clinicalTrialsMatching';
import patientService from '../../services/patientService';

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.5); }
`;

const DashboardContainer = styled(Box)`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 50%, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 100%, rgba(0, 255, 0, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const AIStatusBar = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(0, 255, 255, 0.3);
  z-index: 1000;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${glow} 3s infinite;
`;

const StatusIndicator = styled(Box)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 16px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 25px;
`;

const PredictivePanel = styled(Box)`
  position: fixed;
  left: 20px;
  top: 80px;
  width: 350px;
  max-height: calc(100vh - 100px);
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  overflow-y: auto;
`;

const RiskMeter = styled(Box)`
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  margin: 10px 0;
`;

const ClinicalAlert = styled(Card)`
  background: ${props => {
    switch(props.severity) {
      case 'critical': return 'rgba(239, 68, 68, 0.2)';
      case 'high': return 'rgba(245, 158, 11, 0.2)';
      case 'medium': return 'rgba(59, 130, 246, 0.2)';
      default: return 'rgba(107, 114, 128, 0.2)';
    }
  }};
  border: 1px solid ${props => {
    switch(props.severity) {
      case 'critical': return 'rgba(239, 68, 68, 0.5)';
      case 'high': return 'rgba(245, 158, 11, 0.5)';
      case 'medium': return 'rgba(59, 130, 246, 0.5)';
      default: return 'rgba(107, 114, 128, 0.5)';
    }
  }};
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
`;

const DigitalTwinVisualization = styled(Box)`
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg, rgba(0, 255, 255, 0.1) 0%, transparent 100%);
  border-radius: 10px;
  padding: 15px;
  margin: 15px 0;
`;

const TrialMatchCard = styled(Card)`
  background: rgba(147, 51, 234, 0.1);
  border: 1px solid rgba(147, 51, 234, 0.3);
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(147, 51, 234, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(147, 51, 234, 0.3);
  }
`;

const RevolutionaryDashboard = ({ patient, onClose }) => {
  const [aiSystems, setAiSystems] = useState({
    ambient: 'initializing',
    predictive: 'initializing',
    autopilot: 'initializing',
    trials: 'initializing'
  });
  
  const [predictions, setPredictions] = useState(null);
  const [digitalTwin, setDigitalTwin] = useState(null);
  const [clinicalAlerts, setClinicalAlerts] = useState([]);
  const [trialMatches, setTrialMatches] = useState([]);
  const [documentation, setDocumentation] = useState(null);
  const [isAutopilotActive, setIsAutopilotActive] = useState(false);
  const [ambientListening, setAmbientListening] = useState(false);
  
  const alertsRef = useRef([]);
  const notificationTimeout = useRef(null);

  useEffect(() => {
    if (patient) {
      initializeRevolutionaryFeatures();
    }

    return () => {
      cleanup();
    };
  }, [patient]);

  /**
   * Initialize all revolutionary features
   */
  const initializeRevolutionaryFeatures = async () => {
    try {
      // Initialize Ambient Intelligence
      const ambientStatus = await ambientIntelligence.initialize(patient.id);
      setAiSystems(prev => ({ ...prev, ambient: 'active' }));
      
      // Initialize Predictive Analytics & Digital Twin
      await predictiveAnalytics.initialize();
      const twin = await predictiveAnalytics.createPatientDigitalTwin(patient.id, patient);
      setDigitalTwin(twin);
      setPredictions(twin.predictions);
      setAiSystems(prev => ({ ...prev, predictive: 'active' }));
      
      // Initialize Clinical Trials Matching
      await clinicalTrialsMatching.initialize();
      const matches = await clinicalTrialsMatching.matchPatientToTrials(patient);
      setTrialMatches(matches.slice(0, 3));
      setAiSystems(prev => ({ ...prev, trials: 'active' }));
      
      // Setup event listeners
      setupEventListeners();
      
      // Auto-activate autopilot for high-risk patients
      if (twin.predictions.compositeRisk.score > 0.7) {
        setIsAutopilotActive(true);
        setAiSystems(prev => ({ ...prev, autopilot: 'active' }));
      }
      
    } catch (error) {
      console.error('Failed to initialize revolutionary features:', error);
    }
  };

  /**
   * Setup event listeners for real-time updates
   */
  const setupEventListeners = () => {
    // Ambient Intelligence updates
    window.addEventListener('ambient-intelligence-update', handleAmbientUpdate);
    
    // Predictive alerts
    window.addEventListener('predictive-alert', handlePredictiveAlert);
    
    // Clinical alerts
    window.addEventListener('clinical-alert', handleClinicalAlert);
    
    // Trial matches
    window.addEventListener('trial-matches-found', handleTrialMatches);
  };

  /**
   * Handle ambient intelligence updates
   */
  const handleAmbientUpdate = (event) => {
    const { type, data } = event.detail;
    
    if (type === 'documentation_ready') {
      setDocumentation(data);
      showNotification('Documentation auto-generated', 'success');
    } else if (type === 'decisions_available') {
      // Decisions are handled by autopilot
    }
  };

  /**
   * Handle predictive alerts
   */
  const handlePredictiveAlert = (event) => {
    const { alerts } = event.detail;
    
    const newAlerts = alerts.map(alert => ({
      ...alert,
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString()
    }));
    
    setClinicalAlerts(prev => [...newAlerts, ...prev].slice(0, 5));
    
    // Show notification for critical alerts
    const critical = alerts.find(a => a.severity === 'critical');
    if (critical) {
      showNotification(critical.message, 'critical');
    }
  };

  /**
   * Handle clinical alerts
   */
  const handleClinicalAlert = (event) => {
    const alert = event.detail;
    
    setClinicalAlerts(prev => [{
      ...alert,
      id: Date.now() + Math.random()
    }, ...prev].slice(0, 5));
  };

  /**
   * Handle new trial matches
   */
  const handleTrialMatches = (event) => {
    const { matches } = event.detail;
    setTrialMatches(matches);
    
    if (matches.length > 0) {
      showNotification(`${matches.length} new clinical trial matches found`, 'info');
    }
  };

  /**
   * Show notification
   */
  const showNotification = (message, status = 'info') => {
    const notification = {
      message,
      status,
      id: Date.now()
    };
    
    // Use Grommet notification or custom implementation
    console.log('Notification:', notification);
  };

  /**
   * Toggle ambient listening
   */
  const toggleAmbientListening = () => {
    if (ambientListening) {
      ambientIntelligence.stopListening();
      setAmbientListening(false);
    } else {
      ambientIntelligence.startProcessingPipeline();
      setAmbientListening(true);
      showNotification('Ambient listening activated', 'success');
    }
  };

  /**
   * Toggle autopilot
   */
  const toggleAutopilot = () => {
    setIsAutopilotActive(prev => !prev);
    setAiSystems(prev => ({ 
      ...prev, 
      autopilot: !isAutopilotActive ? 'active' : 'inactive' 
    }));
  };

  /**
   * Accept documentation
   */
  const acceptDocumentation = async () => {
    if (documentation) {
      // Save documentation to patient record
      await patientService.saveConsultationNote(patient.id, documentation);
      showNotification('Documentation saved successfully', 'success');
      setDocumentation(null);
    }
  };

  /**
   * Cleanup on unmount
   */
  const cleanup = () => {
    window.removeEventListener('ambient-intelligence-update', handleAmbientUpdate);
    window.removeEventListener('predictive-alert', handlePredictiveAlert);
    window.removeEventListener('clinical-alert', handleClinicalAlert);
    window.removeEventListener('trial-matches-found', handleTrialMatches);
    
    if (ambientListening) {
      ambientIntelligence.stopListening();
    }
  };

  return (
    <DashboardContainer>
      {/* AI Status Bar */}
      <AIStatusBar>
        <Box direction="row" align="center" gap="small">
          <Robot size="medium" color="cyan" />
          <Heading level={4} margin="none" color="white">
            Agama Health AI Command Center
          </Heading>
        </Box>
        
        <Box direction="row" gap="medium">
          <StatusIndicator>
            <Text size="small" color="white">Ambient AI</Text>
            {aiSystems.ambient === 'active' ? 
              <StatusGood color="status-ok" /> : 
              <StatusWarning color="status-warning" />
            }
          </StatusIndicator>
          
          <StatusIndicator>
            <Text size="small" color="white">Predictive Engine</Text>
            {aiSystems.predictive === 'active' ? 
              <StatusGood color="status-ok" /> : 
              <StatusWarning color="status-warning" />
            }
          </StatusIndicator>
          
          <StatusIndicator>
            <Text size="small" color="white">Autopilot</Text>
            {aiSystems.autopilot === 'active' ? 
              <StatusGood color="status-ok" /> : 
              <StatusWarning color="status-warning" />
            }
          </StatusIndicator>
          
          <Button
            label={ambientListening ? "Stop Listening" : "Start Ambient AI"}
            onClick={toggleAmbientListening}
            primary
            color={ambientListening ? "status-critical" : "status-ok"}
          />
        </Box>
      </AIStatusBar>

      {/* Predictive Analytics Panel */}
      <PredictivePanel>
        <Heading level={4} margin={{ bottom: 'small' }} color="white">
          Predictive Analytics
        </Heading>
        
        {/* Risk Assessment */}
        {predictions && (
          <RiskMeter>
            <Text size="small" color="white" weight="bold">
              Composite Risk Score
            </Text>
            <Meter
              type="circle"
              value={predictions.compositeRisk.score}
              max={1}
              size="small"
              thickness="medium"
              color={predictions.compositeRisk.score > 0.7 ? 'status-critical' : 
                     predictions.compositeRisk.score > 0.5 ? 'status-warning' : 'status-ok'}
            />
            <Text size="small" color="light-3">
              {predictions.compositeRisk.primaryRisk} - {(predictions.compositeRisk.score * 100).toFixed(0)}%
            </Text>
          </RiskMeter>
        )}

        {/* Digital Twin Visualization */}
        {digitalTwin && (
          <DigitalTwinVisualization>
            <Text size="small" color="white" weight="bold">
              Digital Twin Status
            </Text>
            <Box pad="small">
              <Text size="xsmall" color="cyan">
                Physiology: Simulated
              </Text>
              <Text size="xsmall" color="cyan">
                Predictions: Active
              </Text>
              <Text size="xsmall" color="cyan">
                Treatment Simulations: 3 Available
              </Text>
            </Box>
          </DigitalTwinVisualization>
        )}

        {/* Clinical Alerts */}
        <Box margin={{ top: 'medium' }}>
          <Text size="small" color="white" weight="bold">
            Clinical Alerts
          </Text>
          {clinicalAlerts.map(alert => (
            <ClinicalAlert key={alert.id} severity={alert.severity}>
              <Box gap="xsmall">
                <Box direction="row" align="center" gap="small">
                  <Alert size="small" color={
                    alert.severity === 'critical' ? 'status-critical' :
                    alert.severity === 'high' ? 'status-warning' : 'status-unknown'
                  } />
                  <Text size="small" weight="bold" color="white">
                    {alert.condition || alert.type}
                  </Text>
                </Box>
                <Text size="xsmall" color="light-3">
                  {alert.message}
                </Text>
                {alert.actions && alert.actions.length > 0 && (
                  <Box margin={{ top: 'xsmall' }}>
                    {alert.actions.slice(0, 2).map((action, i) => (
                      <Text key={i} size="xsmall" color="cyan">
                        • {action}
                      </Text>
                    ))}
                  </Box>
                )}
              </Box>
            </ClinicalAlert>
          ))}
        </Box>

        {/* Clinical Trials */}
        {trialMatches.length > 0 && (
          <Box margin={{ top: 'medium' }}>
            <Text size="small" color="white" weight="bold">
              Clinical Trial Matches
            </Text>
            {trialMatches.map((match, index) => (
              <TrialMatchCard key={index}>
                <Box gap="xsmall">
                  <Text size="small" weight="bold" color="white">
                    {match.trial.title}
                  </Text>
                  <Box direction="row" gap="small">
                    <Text size="xsmall" color="light-3">
                      Match: {(match.matchScore * 100).toFixed(0)}%
                    </Text>
                    <Text size="xsmall" color="light-3">
                      Phase: {match.trial.phase}
                    </Text>
                  </Box>
                  <Text size="xsmall" color="cyan">
                    {match.trial.sponsor}
                  </Text>
                </Box>
              </TrialMatchCard>
            ))}
          </Box>
        )}
      </PredictivePanel>

      {/* Clinical Autopilot */}
      <ClinicalAutopilot
        patientId={patient?.id}
        isActive={isAutopilotActive}
        onToggle={toggleAutopilot}
      />

      {/* Auto-generated Documentation Layer */}
      {documentation && (
        <Layer
          position="center"
          onClickOutside={() => setDocumentation(null)}
        >
          <Box pad="large" gap="medium" width="large" background="dark-1">
            <Heading level={3}>Auto-Generated Documentation</Heading>
            
            <Box gap="small">
              <Box>
                <Text weight="bold">Subjective:</Text>
                <Text>{documentation.subjective}</Text>
              </Box>
              
              <Box>
                <Text weight="bold">Objective:</Text>
                <Text>{documentation.objective}</Text>
              </Box>
              
              <Box>
                <Text weight="bold">Assessment:</Text>
                <Text>{documentation.assessment}</Text>
              </Box>
              
              <Box>
                <Text weight="bold">Plan:</Text>
                <Text>{documentation.plan}</Text>
              </Box>
              
              <Box>
                <Text weight="bold">ICD-10 Codes:</Text>
                <Text>{documentation.icd10Codes?.join(', ')}</Text>
              </Box>
            </Box>
            
            <Box direction="row" gap="medium" justify="end">
              <Button label="Edit" onClick={() => {/* Open editor */}} />
              <Button label="Accept" primary onClick={acceptDocumentation} />
            </Box>
          </Box>
        </Layer>
      )}
    </DashboardContainer>
  );
};

export default RevolutionaryDashboard;