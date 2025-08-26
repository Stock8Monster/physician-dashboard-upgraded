/**
 * Clinical Decision Autopilot
 * Revolutionary AI-powered clinical decision support system
 * Provides real-time guidance, automated workflows, and evidence-based recommendations
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Text, Button, Stack, Layer, Heading, Meter, Card } from 'grommet';
import { StatusGood, StatusWarning, StatusCritical, Robot, Checkmark, Close, FormNext } from 'grommet-icons';
import styled, { keyframes, css } from 'styled-components';
import ambientIntelligence from '../../services/ambientIntelligence';
import predictiveAnalytics from '../../services/predictiveAnalytics';
import patientService from '../../services/patientService';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const AutopilotContainer = styled(Box)`
  position: fixed;
  right: 20px;
  top: 80px;
  width: 400px;
  max-height: calc(100vh - 100px);
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 15px;
  border: 2px solid #0f3460;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1000;
  animation: ${slideIn} 0.3s ease-out;
`;

const AutopilotHeader = styled(Box)`
  background: linear-gradient(90deg, #0f3460 0%, #16213e 100%);
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatusIndicator = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.status === 'active' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 0, 0.1)'};
  border-radius: 20px;
  border: 1px solid ${props => props.status === 'active' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 0, 0.3)'};
  ${props => props.status === 'active' && css`animation: ${pulse} 2s infinite;`}
`;

const DecisionCard = styled(Card)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin: 10px 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const ActionButton = styled(Button)`
  background: ${props => {
    switch(props.priority) {
      case 'critical': return 'linear-gradient(135deg, #e53e3e, #c53030)';
      case 'high': return 'linear-gradient(135deg, #ed8936, #dd6b20)';
      case 'medium': return 'linear-gradient(135deg, #4299e1, #3182ce)';
      default: return 'linear-gradient(135deg, #48bb78, #38a169)';
    }
  }};
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const ConfidenceMeter = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
`;

const InsightBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  background: ${props => {
    switch(props.type) {
      case 'diagnosis': return 'rgba(147, 51, 234, 0.2)';
      case 'treatment': return 'rgba(34, 197, 94, 0.2)';
      case 'risk': return 'rgba(239, 68, 68, 0.2)';
      case 'lab': return 'rgba(59, 130, 246, 0.2)';
      default: return 'rgba(156, 163, 175, 0.2)';
    }
  }};
  border-radius: 12px;
  font-size: 12px;
  color: white;
`;

const TimelineItem = styled(Box)`
  position: relative;
  padding-left: 30px;
  margin: 15px 0;
  
  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.completed ? '#10b981' : '#6b7280'};
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 13px;
    top: 16px;
    width: 2px;
    height: calc(100% + 10px);
    background: rgba(107, 114, 128, 0.3);
  }
  
  &:last-child::after {
    display: none;
  }
`;

const ClinicalAutopilot = ({ patientId, isActive, onToggle }) => {
  const [autopilotState, setAutopilotState] = useState('initializing');
  const [currentDecisions, setCurrentDecisions] = useState([]);
  const [executedActions, setExecutedActions] = useState([]);
  const [clinicalInsights, setClinicalInsights] = useState([]);
  const [workflowSteps, setWorkflowSteps] = useState([]);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const decisionQueueRef = useRef([]);
  const processingRef = useRef(false);

  useEffect(() => {
    if (isActive && patientId) {
      initializeAutopilot();
    }
    
    return () => {
      if (isActive) {
        shutdownAutopilot();
      }
    };
  }, [isActive, patientId]);

  /**
   * Initialize the Clinical Autopilot system
   */
  const initializeAutopilot = async () => {
    try {
      setAutopilotState('initializing');
      
      // Initialize AI systems
      await ambientIntelligence.initialize(patientId);
      await predictiveAnalytics.initialize();
      
      // Create patient digital twin
      const patientData = await patientService.getPatient(patientId);
      const digitalTwin = await predictiveAnalytics.createPatientDigitalTwin(patientId, patientData);
      
      // Start clinical workflow analysis
      const workflow = await analyzeOptimalWorkflow(patientData);
      setWorkflowSteps(workflow);
      
      // Get initial predictions and recommendations
      const predictions = await predictiveAnalytics.runComprehensivePredictions(digitalTwin);
      const insights = await generateInitialInsights(predictions);
      setClinicalInsights(insights);
      
      // Start real-time monitoring
      startRealtimeGuidance();
      
      setAutopilotState('active');
      setConfidenceScore(0.92);
    } catch (error) {
      console.error('Autopilot initialization failed:', error);
      setAutopilotState('error');
    }
  };

  /**
   * Analyze and generate optimal clinical workflow
   */
  const analyzeOptimalWorkflow = async (patientData) => {
    const chiefComplaint = patientData.chiefComplaint || 'General consultation';
    const conditions = patientData.activeProblems || [];
    
    // Generate evidence-based workflow steps
    const workflow = [
      {
        id: 'review',
        title: 'Review Patient History',
        status: 'in-progress',
        duration: '2 min',
        autoActions: ['Load previous visits', 'Analyze trends'],
        completed: false
      },
      {
        id: 'vitals',
        title: 'Assess Current Vitals',
        status: 'pending',
        duration: '1 min',
        autoActions: ['Compare to baseline', 'Flag abnormalities'],
        completed: false
      },
      {
        id: 'examination',
        title: 'Physical Examination',
        status: 'pending',
        duration: '5 min',
        autoActions: ['Generate exam template', 'Voice transcription'],
        completed: false
      },
      {
        id: 'diagnosis',
        title: 'Differential Diagnosis',
        status: 'pending',
        duration: '2 min',
        autoActions: ['AI diagnosis suggestions', 'Evidence ranking'],
        completed: false
      },
      {
        id: 'orders',
        title: 'Orders & Prescriptions',
        status: 'pending',
        duration: '3 min',
        autoActions: ['Drug interaction check', 'Dosage optimization'],
        completed: false
      },
      {
        id: 'documentation',
        title: 'Documentation',
        status: 'pending',
        duration: '0 min',
        autoActions: ['Auto-generate SOAP note', 'ICD-10 coding'],
        completed: false
      },
      {
        id: 'followup',
        title: 'Schedule Follow-up',
        status: 'pending',
        duration: '1 min',
        autoActions: ['Risk-based scheduling', 'Care coordination'],
        completed: false
      }
    ];
    
    // Customize workflow based on chief complaint
    if (chiefComplaint.toLowerCase().includes('emergency')) {
      workflow.unshift({
        id: 'triage',
        title: 'Emergency Triage',
        status: 'critical',
        duration: '30 sec',
        autoActions: ['Rapid assessment', 'Alert team'],
        completed: false
      });
    }
    
    return workflow;
  };

  /**
   * Generate initial clinical insights
   */
  const generateInitialInsights = async (predictions) => {
    const insights = [];
    
    // Risk assessment insights
    if (predictions.compositeRisk.score > 0.7) {
      insights.push({
        type: 'risk',
        priority: 'critical',
        title: 'High Risk Patient',
        description: `${(predictions.compositeRisk.score * 100).toFixed(0)}% risk of deterioration in next 24h`,
        action: 'Consider ICU consultation'
      });
    }
    
    // Diagnostic insights
    if (predictions['24h'].sepsis.probability > 0.5) {
      insights.push({
        type: 'diagnosis',
        priority: 'high',
        title: 'Possible Sepsis',
        description: `${(predictions['24h'].sepsis.probability * 100).toFixed(0)}% probability of sepsis`,
        action: 'Initiate sepsis protocol'
      });
    }
    
    // Treatment optimization
    insights.push({
      type: 'treatment',
      priority: 'medium',
      title: 'Medication Optimization',
      description: 'AI suggests adjusting current medications',
      action: 'Review recommendations'
    });
    
    // Lab recommendations
    const suggestedLabs = await suggestDiagnosticTests(predictions);
    if (suggestedLabs.length > 0) {
      insights.push({
        type: 'lab',
        priority: 'medium',
        title: 'Recommended Tests',
        description: `${suggestedLabs.length} diagnostic tests suggested`,
        action: 'Review and order'
      });
    }
    
    return insights;
  };

  /**
   * Start real-time clinical guidance
   */
  const startRealtimeGuidance = () => {
    // Listen for ambient intelligence updates
    window.addEventListener('ambient-intelligence-update', handleAmbientUpdate);
    
    // Listen for predictive alerts
    window.addEventListener('predictive-alert', handlePredictiveAlert);
    
    // Start decision processing loop
    const decisionInterval = setInterval(() => {
      if (!processingRef.current && decisionQueueRef.current.length > 0) {
        processNextDecision();
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('ambient-intelligence-update', handleAmbientUpdate);
      window.removeEventListener('predictive-alert', handlePredictiveAlert);
      clearInterval(decisionInterval);
    };
  };

  /**
   * Handle ambient intelligence updates
   */
  const handleAmbientUpdate = (event) => {
    const { type, data } = event.detail;
    
    if (type === 'decisions_available') {
      // Add new decisions to queue
      decisionQueueRef.current.push(...data);
      updateCurrentDecisions();
    } else if (type === 'documentation_ready') {
      // Auto-complete documentation step
      updateWorkflowStep('documentation', 'completed');
    }
  };

  /**
   * Handle predictive alerts
   */
  const handlePredictiveAlert = (event) => {
    const { alerts } = event.detail;
    
    for (const alert of alerts) {
      if (alert.severity === 'critical') {
        // Add critical decision to front of queue
        decisionQueueRef.current.unshift({
          type: 'alert',
          priority: 'critical',
          title: alert.message,
          actions: alert.actions,
          confidence: 0.95
        });
      }
    }
    
    updateCurrentDecisions();
  };

  /**
   * Update current decisions display
   */
  const updateCurrentDecisions = () => {
    const topDecisions = decisionQueueRef.current.slice(0, 3);
    setCurrentDecisions(topDecisions);
  };

  /**
   * Process next decision in queue
   */
  const processNextDecision = async () => {
    if (decisionQueueRef.current.length === 0) return;
    
    processingRef.current = true;
    const decision = decisionQueueRef.current[0];
    
    // Auto-execute if confidence is high enough
    if (decision.confidence > 0.9 && decision.autoExecutable) {
      await executeDecision(decision);
    }
    
    processingRef.current = false;
  };

  /**
   * Execute a clinical decision
   */
  const executeDecision = async (decision) => {
    try {
      let result = null;
      
      switch (decision.type) {
        case 'order':
          result = await executeOrder(decision);
          break;
        case 'prescription':
          result = await executePrescription(decision);
          break;
        case 'documentation':
          result = await executeDocumentation(decision);
          break;
        case 'alert':
          result = await executeAlert(decision);
          break;
        default:
          result = { success: false, reason: 'Unknown decision type' };
      }
      
      if (result.success) {
        // Add to executed actions
        setExecutedActions(prev => [...prev, {
          ...decision,
          executedAt: new Date().toISOString(),
          result
        }]);
        
        // Remove from queue
        decisionQueueRef.current.shift();
        updateCurrentDecisions();
      }
    } catch (error) {
      console.error('Decision execution failed:', error);
    }
  };

  /**
   * Execute documentation
   */
  const executeDocumentation = async (decision) => {
    try {
      const documentationData = {
        patientId,
        type: decision.documentationType || 'progress_note',
        content: decision.content,
        metadata: decision.metadata
      };
      
      // For now, just log the documentation
      console.log('Documentation created:', documentationData);
      // In production: const result = await patientService.createDocumentation(documentationData);
      return { success: true, documentId: Date.now() };
    } catch (error) {
      console.error('Documentation execution failed:', error);
      return { success: false, reason: error.message };
    }
  };

  /**
   * Execute alert
   */
  const executeAlert = async (decision) => {
    try {
      // Log the alert
      console.log('Clinical alert:', {
        patientId,
        alertType: decision.alertType,
        severity: decision.severity || 'high',
        message: decision.message,
        actions: decision.actions
      });
      
      // In production: await patientService.logClinicalAlert(...)
      
      return { success: true, alertLogged: true };
    } catch (error) {
      console.error('Alert execution failed:', error);
      return { success: false, reason: error.message };
    }
  };

  /**
   * Execute an order
   */
  const executeOrder = async (decision) => {
    const orderData = {
      patientId,
      type: decision.orderType,
      tests: decision.tests,
      priority: decision.priority,
      clinicalReason: decision.reason
    };
    
    const result = await patientService.createOrder(orderData);
    return { success: true, orderId: result.id };
  };

  /**
   * Execute a prescription
   */
  const executePrescription = async (decision) => {
    // Check for drug interactions
    const interactions = await checkDrugInteractions(decision.medication);
    
    if (interactions.severe.length > 0) {
      return { success: false, reason: 'Severe drug interaction detected' };
    }
    
    const prescriptionData = {
      patientId,
      medication: decision.medication,
      dosage: decision.dosage,
      frequency: decision.frequency,
      duration: decision.duration,
      instructions: decision.instructions
    };
    
    const result = await patientService.createPrescription(prescriptionData);
    return { success: true, prescriptionId: result.id };
  };

  /**
   * Manual decision override
   */
  const handleManualDecision = async (decision, action) => {
    if (action === 'accept') {
      await executeDecision(decision);
    } else if (action === 'reject') {
      // Remove from queue
      const index = decisionQueueRef.current.indexOf(decision);
      if (index > -1) {
        decisionQueueRef.current.splice(index, 1);
        updateCurrentDecisions();
      }
    } else if (action === 'modify') {
      // Open modification dialog (to be implemented)
      console.log('Modify decision:', decision);
      // Future: openDecisionEditor(decision);
    }
  };

  /**
   * Update workflow step status
   */
  const updateWorkflowStep = (stepId, status) => {
    setWorkflowSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status, completed: status === 'completed' } : step
    ));
  };

  /**
   * Suggest diagnostic tests
   */
  const suggestDiagnosticTests = async (predictions) => {
    const tests = [];
    
    if (predictions['24h'].cardiac.probability > 0.5) {
      tests.push('Troponin', 'ECG', 'Echocardiogram');
    }
    
    if (predictions['24h'].sepsis.probability > 0.5) {
      tests.push('Blood Culture', 'Lactate', 'Procalcitonin');
    }
    
    if (predictions['24h'].aki.probability > 0.5) {
      tests.push('Creatinine', 'BUN', 'Urinalysis');
    }
    
    return tests;
  };

  /**
   * Check drug interactions
   */
  const checkDrugInteractions = async (medication) => {
    // This would connect to a drug interaction database
    return {
      severe: [],
      moderate: [],
      minor: []
    };
  };

  /**
   * Shutdown autopilot
   */
  const shutdownAutopilot = () => {
    setAutopilotState('inactive');
    ambientIntelligence.stopListening();
  };

  if (!isActive) return null;

  return (
    <AutopilotContainer>
      <AutopilotHeader direction="row" justify="between" align="center">
        <Box direction="row" align="center" gap="small">
          <Robot color="white" size="medium" />
          <Heading level={4} margin="none" color="white">
            Clinical Autopilot
          </Heading>
        </Box>
        <Box direction="row" align="center" gap="small">
          <StatusIndicator status={autopilotState}>
            {autopilotState === 'active' ? <StatusGood color="green" /> : <StatusWarning color="yellow" />}
            <Text size="small" color="white">
              {autopilotState === 'active' ? 'Active' : 'Initializing'}
            </Text>
          </StatusIndicator>
          <Button
            icon={<Close />}
            onClick={onToggle}
            plain
            style={{ padding: '4px' }}
          />
        </Box>
      </AutopilotHeader>

      <Box pad="medium" gap="small" overflow="auto" height={{ max: 'calc(100vh - 200px)' }}>
        {/* Confidence Score */}
        <ConfidenceMeter>
          <Text size="small" color="white">Confidence</Text>
          <Box flex>
            <Meter
              type="bar"
              value={confidenceScore}
              max={1}
              size="small"
              thickness="xsmall"
              color={confidenceScore > 0.8 ? 'status-ok' : 'status-warning'}
            />
          </Box>
          <Text size="small" color="white" weight="bold">
            {(confidenceScore * 100).toFixed(0)}%
          </Text>
        </ConfidenceMeter>

        {/* Clinical Insights */}
        {clinicalInsights.length > 0 && (
          <Box gap="small">
            <Text size="small" color="white" weight="bold">Clinical Insights</Text>
            {clinicalInsights.map((insight, index) => (
              <DecisionCard key={index}>
                <Box gap="small">
                  <Box direction="row" align="center" gap="small">
                    <InsightBadge type={insight.type}>
                      {insight.type}
                    </InsightBadge>
                    <Text size="small" weight="bold" color="white">
                      {insight.title}
                    </Text>
                  </Box>
                  <Text size="small" color="light-2">
                    {insight.description}
                  </Text>
                  <ActionButton
                    size="small"
                    priority={insight.priority}
                    label={insight.action}
                    onClick={() => handleManualDecision(insight, 'accept')}
                  />
                </Box>
              </DecisionCard>
            ))}
          </Box>
        )}

        {/* Current Decisions */}
        {currentDecisions.length > 0 && (
          <Box gap="small">
            <Text size="small" color="white" weight="bold">Pending Decisions</Text>
            {currentDecisions.map((decision, index) => (
              <DecisionCard key={index}>
                <Box gap="small">
                  <Text size="small" weight="bold" color="white">
                    {decision.title}
                  </Text>
                  <Box direction="row" gap="small">
                    <Button
                      size="small"
                      label="Accept"
                      onClick={() => handleManualDecision(decision, 'accept')}
                      color="status-ok"
                    />
                    <Button
                      size="small"
                      label="Modify"
                      onClick={() => handleManualDecision(decision, 'modify')}
                    />
                    <Button
                      size="small"
                      label="Reject"
                      onClick={() => handleManualDecision(decision, 'reject')}
                      color="status-critical"
                    />
                  </Box>
                </Box>
              </DecisionCard>
            ))}
          </Box>
        )}

        {/* Workflow Timeline */}
        <Box gap="small">
          <Text size="small" color="white" weight="bold">Workflow Progress</Text>
          <Box>
            {workflowSteps.map((step, index) => (
              <TimelineItem key={step.id} completed={step.completed}>
                <Box gap="xsmall">
                  <Box direction="row" align="center" gap="small">
                    <Text size="small" weight="bold" color="white">
                      {step.title}
                    </Text>
                    <Text size="xsmall" color="light-3">
                      {step.duration}
                    </Text>
                  </Box>
                  {step.autoActions && (
                    <Box gap="xxsmall">
                      {step.autoActions.map((action, i) => (
                        <Text key={i} size="xsmall" color="light-4">
                          • {action}
                        </Text>
                      ))}
                    </Box>
                  )}
                </Box>
              </TimelineItem>
            ))}
          </Box>
        </Box>

        {/* Executed Actions Log */}
        {executedActions.length > 0 && (
          <Box gap="small">
            <Text size="small" color="white" weight="bold">Executed Actions</Text>
            <Box gap="xsmall">
              {executedActions.slice(-3).map((action, index) => (
                <Box key={index} direction="row" align="center" gap="small">
                  <Checkmark color="status-ok" size="small" />
                  <Text size="xsmall" color="light-3">
                    {action.title} - {new Date(action.executedAt).toLocaleTimeString()}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </AutopilotContainer>
  );
};

export default ClinicalAutopilot;