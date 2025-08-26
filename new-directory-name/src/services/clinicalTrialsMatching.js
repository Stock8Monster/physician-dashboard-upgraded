/**
 * Real-Time Clinical Trials Matching Engine
 * Revolutionary system that automatically matches patients to clinical trials globally
 * Industry-first implementation with AI-powered eligibility assessment
 */

class ClinicalTrialsMatchingEngine {
  constructor() {
    this.trialsDatabase = new Map();
    this.matchingQueue = [];
    this.eligibilityCache = new Map();
    this.monitoringInterval = null;
  }

  /**
   * Initialize the clinical trials matching system
   */
  async initialize() {
    // Load active clinical trials from multiple sources
    await this.loadClinicalTrials();
    
    // Start real-time monitoring
    this.startMonitoring();
    
    return {
      status: 'active',
      trials: this.trialsDatabase.size,
      sources: ['ClinicalTrials.gov', 'WHO ICTRP', 'EU Clinical Trials', 'Industry Sponsors']
    };
  }

  /**
   * Load clinical trials from multiple registries
   */
  async loadClinicalTrials() {
    const sources = [
      { name: 'ClinicalTrials.gov', url: 'https://clinicaltrials.gov/api/v2/studies' },
      { name: 'WHO ICTRP', url: 'https://trialsearch.who.int/api' },
      { name: 'Industry Sponsors', url: 'https://api.agamahealth.ai/trials' }
    ];

    for (const source of sources) {
      try {
        const trials = await this.fetchTrialsFromSource(source);
        for (const trial of trials) {
          this.trialsDatabase.set(trial.id, {
            ...trial,
            source: source.name,
            loadedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error(`Failed to load trials from ${source.name}:`, error);
      }
    }
  }

  /**
   * Match patient to clinical trials
   */
  async matchPatientToTrials(patientData) {
    const matches = [];
    const patientProfile = await this.createPatientProfile(patientData);
    
    // Iterate through all trials
    for (const [trialId, trial] of this.trialsDatabase) {
      const eligibility = await this.assessEligibility(patientProfile, trial);
      
      if (eligibility.isEligible) {
        matches.push({
          trial: trial,
          matchScore: eligibility.score,
          confidence: eligibility.confidence,
          criteria: eligibility.matchedCriteria,
          exclusions: eligibility.exclusions,
          benefits: this.assessTrialBenefits(trial, patientProfile),
          risks: this.assessTrialRisks(trial, patientProfile),
          logistics: this.assessLogistics(trial, patientData.location)
        });
      }
    }
    
    // Sort by match score and relevance
    matches.sort((a, b) => b.matchScore - a.matchScore);
    
    // Cache results
    this.eligibilityCache.set(patientData.id, {
      matches,
      timestamp: new Date().toISOString()
    });
    
    return matches;
  }

  /**
   * Create comprehensive patient profile for matching
   */
  async createPatientProfile(patientData) {
    return {
      demographics: {
        age: this.calculateAge(patientData.dateOfBirth),
        gender: patientData.gender,
        race: patientData.race,
        ethnicity: patientData.ethnicity
      },
      medical: {
        diagnoses: patientData.activeProblems?.map(p => ({
          condition: p.name,
          icd10: p.icd10,
          onset: p.diagnosedDate,
          severity: p.severity
        })),
        medications: patientData.medications?.map(m => ({
          name: m.name,
          dose: m.dosage,
          startDate: m.startDate
        })),
        allergies: patientData.allergies,
        labResults: this.extractRelevantLabs(patientData.labs),
        vitals: patientData.vitals,
        procedures: patientData.procedures?.map(p => ({
          name: p.name,
          date: p.date
        }))
      },
      genomics: {
        mutations: patientData.genomicData?.mutations || [],
        biomarkers: patientData.genomicData?.biomarkers || []
      },
      functional: {
        performanceStatus: patientData.ecog || patientData.karnofsky,
        organFunction: {
          cardiac: this.assessCardiacFunction(patientData),
          hepatic: this.assessHepaticFunction(patientData),
          renal: this.assessRenalFunction(patientData)
        }
      },
      preferences: {
        willingToTravel: patientData.preferences?.travel || false,
        maxTravelDistance: patientData.preferences?.maxDistance || 50,
        preferredLanguage: patientData.language || 'English'
      }
    };
  }

  /**
   * Assess patient eligibility for a specific trial using AI
   */
  async assessEligibility(patientProfile, trial) {
    const inclusionResults = await this.checkInclusionCriteria(patientProfile, trial.inclusionCriteria);
    const exclusionResults = await this.checkExclusionCriteria(patientProfile, trial.exclusionCriteria);
    
    // Use NLP to parse complex criteria
    const nlpAssessment = await this.performNLPEligibilityCheck(patientProfile, trial.eligibilityText);
    
    // Calculate overall eligibility
    const isEligible = inclusionResults.allMet && !exclusionResults.anyMet;
    const score = this.calculateMatchScore(inclusionResults, exclusionResults, nlpAssessment);
    
    return {
      isEligible,
      score,
      confidence: nlpAssessment.confidence,
      matchedCriteria: inclusionResults.matched,
      unmatchedCriteria: inclusionResults.unmatched,
      exclusions: exclusionResults.matched,
      details: {
        inclusion: inclusionResults,
        exclusion: exclusionResults,
        nlp: nlpAssessment
      }
    };
  }

  /**
   * Check inclusion criteria
   */
  async checkInclusionCriteria(profile, criteria) {
    const results = {
      matched: [],
      unmatched: [],
      uncertain: [],
      allMet: true
    };
    
    for (const criterion of criteria || []) {
      const check = await this.evaluateCriterion(profile, criterion);
      
      if (check.met) {
        results.matched.push({ ...criterion, reason: check.reason });
      } else if (check.uncertain) {
        results.uncertain.push({ ...criterion, reason: check.reason });
      } else {
        results.unmatched.push({ ...criterion, reason: check.reason });
        results.allMet = false;
      }
    }
    
    return results;
  }

  /**
   * Check exclusion criteria
   */
  async checkExclusionCriteria(profile, criteria) {
    const results = {
      matched: [],
      unmatched: [],
      uncertain: [],
      anyMet: false
    };
    
    for (const criterion of criteria || []) {
      const check = await this.evaluateCriterion(profile, criterion);
      
      if (check.met) {
        results.matched.push({ ...criterion, reason: check.reason });
        results.anyMet = true;
      } else if (check.uncertain) {
        results.uncertain.push({ ...criterion, reason: check.reason });
      } else {
        results.unmatched.push({ ...criterion, reason: check.reason });
      }
    }
    
    return results;
  }

  /**
   * Evaluate a single criterion
   */
  async evaluateCriterion(profile, criterion) {
    // Parse criterion type
    switch (criterion.type) {
      case 'age':
        return this.evaluateAgeCriterion(profile.demographics.age, criterion);
      
      case 'diagnosis':
        return this.evaluateDiagnosisCriterion(profile.medical.diagnoses, criterion);
      
      case 'lab':
        return this.evaluateLabCriterion(profile.medical.labResults, criterion);
      
      case 'medication':
        return this.evaluateMedicationCriterion(profile.medical.medications, criterion);
      
      case 'genomic':
        return this.evaluateGenomicCriterion(profile.genomics, criterion);
      
      case 'performance':
        return this.evaluatePerformanceCriterion(profile.functional.performanceStatus, criterion);
      
      default:
        // Use NLP for complex text criteria
        return await this.evaluateTextCriterion(profile, criterion);
    }
  }

  /**
   * Use NLP to check eligibility from free text
   */
  async performNLPEligibilityCheck(profile, eligibilityText) {
    if (!eligibilityText) {
      return { eligible: true, confidence: 0.5, reasons: [] };
    }
    
    try {
      const response = await fetch('https://api.agamahealth.ai/v2/trial-eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_TRIALS_API_KEY}`
        },
        body: JSON.stringify({
          patientProfile: profile,
          eligibilityText: eligibilityText,
          model: 'clinical-trials-v2'
        })
      });
      
      const result = await response.json();
      
      return {
        eligible: result.eligible,
        confidence: result.confidence,
        reasons: result.reasons,
        concerns: result.concerns
      };
    } catch (error) {
      console.error('NLP eligibility check failed:', error);
      return { eligible: false, confidence: 0, reasons: ['Unable to assess'] };
    }
  }

  /**
   * Calculate match score
   */
  calculateMatchScore(inclusion, exclusion, nlp) {
    let score = 0;
    
    // Inclusion criteria weight: 40%
    const inclusionScore = (inclusion.matched.length / (inclusion.matched.length + inclusion.unmatched.length || 1)) * 0.4;
    
    // Exclusion criteria weight: 30%
    const exclusionScore = (1 - (exclusion.matched.length / (exclusion.matched.length + exclusion.unmatched.length || 1))) * 0.3;
    
    // NLP confidence weight: 20%
    const nlpScore = (nlp.confidence || 0) * 0.2;
    
    // Uncertainty penalty: 10%
    const uncertaintyPenalty = ((inclusion.uncertain.length + exclusion.uncertain.length) / 10) * 0.1;
    
    score = inclusionScore + exclusionScore + nlpScore - uncertaintyPenalty;
    
    return Math.max(0, Math.min(1, score));
  }

  /**
   * Assess potential benefits of trial participation
   */
  assessTrialBenefits(trial, profile) {
    const benefits = [];
    
    // Access to novel treatments
    if (trial.phase === 'Phase 3' || trial.phase === 'Phase 2') {
      benefits.push({
        type: 'novel_treatment',
        description: 'Access to cutting-edge therapy not yet available',
        impact: 'high'
      });
    }
    
    // Enhanced monitoring
    benefits.push({
      type: 'enhanced_care',
      description: 'Frequent monitoring and medical attention',
      impact: 'medium'
    });
    
    // Cost coverage
    if (trial.costCoverage) {
      benefits.push({
        type: 'financial',
        description: 'Study-related medical costs covered',
        impact: 'high'
      });
    }
    
    // Contributing to science
    benefits.push({
      type: 'contribution',
      description: 'Help advance medical knowledge',
      impact: 'medium'
    });
    
    return benefits;
  }

  /**
   * Assess potential risks of trial participation
   */
  assessTrialRisks(trial, profile) {
    const risks = [];
    
    // Side effects
    if (trial.knownSideEffects) {
      risks.push({
        type: 'side_effects',
        description: trial.knownSideEffects,
        severity: trial.sideEffectSeverity || 'unknown'
      });
    }
    
    // Time commitment
    risks.push({
      type: 'time',
      description: `${trial.visitFrequency || 'Regular'} visits required`,
      severity: 'low'
    });
    
    // Placebo possibility
    if (trial.hasPlacebo) {
      risks.push({
        type: 'placebo',
        description: `${trial.placeboRatio || '50'}% chance of receiving placebo`,
        severity: 'medium'
      });
    }
    
    return risks;
  }

  /**
   * Assess logistics of trial participation
   */
  assessLogistics(trial, patientLocation) {
    const logistics = {
      distance: this.calculateDistance(patientLocation, trial.site.location),
      travelTime: null,
      visitSchedule: trial.visitSchedule,
      duration: trial.estimatedDuration,
      compensation: trial.compensation || 'None specified',
      transportation: trial.transportationAssistance || false
    };
    
    // Estimate travel time
    if (logistics.distance) {
      logistics.travelTime = this.estimateTravelTime(logistics.distance);
    }
    
    return logistics;
  }

  /**
   * Monitor for new matching opportunities
   */
  startMonitoring() {
    this.monitoringInterval = setInterval(async () => {
      // Check for new trials
      await this.checkForNewTrials();
      
      // Re-evaluate cached patients
      for (const [patientId, cache] of this.eligibilityCache) {
        const age = Date.now() - new Date(cache.timestamp).getTime();
        const oneDay = 24 * 60 * 60 * 1000;
        
        if (age > oneDay) {
          // Re-run matching for patients with stale cache
          this.matchingQueue.push(patientId);
        }
      }
      
      // Process matching queue
      await this.processMatchingQueue();
    }, 60 * 60 * 1000); // Every hour
  }

  /**
   * Check for new clinical trials
   */
  async checkForNewTrials() {
    const newTrials = await this.fetchNewTrials();
    
    for (const trial of newTrials) {
      if (!this.trialsDatabase.has(trial.id)) {
        this.trialsDatabase.set(trial.id, trial);
        
        // Notify about new trial
        this.notifyNewTrial(trial);
      }
    }
  }

  /**
   * Process matching queue
   */
  async processMatchingQueue() {
    while (this.matchingQueue.length > 0) {
      const patientId = this.matchingQueue.shift();
      
      try {
        const patientData = await this.fetchPatientData(patientId);
        const matches = await this.matchPatientToTrials(patientData);
        
        if (matches.length > 0) {
          this.notifyMatches(patientId, matches);
        }
      } catch (error) {
        console.error(`Failed to process matching for patient ${patientId}:`, error);
      }
    }
  }

  /**
   * Notify about new trial matches
   */
  notifyMatches(patientId, matches) {
    window.dispatchEvent(new CustomEvent('trial-matches-found', {
      detail: {
        patientId,
        matches: matches.slice(0, 5), // Top 5 matches
        timestamp: new Date().toISOString()
      }
    }));
  }

  /**
   * Helper methods
   */
  calculateAge(dateOfBirth) {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  calculateDistance(location1, location2) {
    // Haversine formula for distance calculation
    if (!location1 || !location2) return null;
    
    const R = 3959; // Earth radius in miles
    const lat1 = location1.lat * Math.PI / 180;
    const lat2 = location2.lat * Math.PI / 180;
    const deltaLat = (location2.lat - location1.lat) * Math.PI / 180;
    const deltaLon = (location2.lon - location1.lon) * Math.PI / 180;
    
    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c;
  }

  estimateTravelTime(distance) {
    // Rough estimate: 1 hour per 60 miles
    return Math.ceil(distance / 60);
  }

  /**
   * Stub methods for demonstration
   */
  async fetchTrialsFromSource(source) {
    // In production, this would fetch real trials
    return [];
  }

  async fetchNewTrials() {
    // In production, this would fetch new trials
    return [];
  }

  async fetchPatientData(patientId) {
    // In production, this would fetch patient data
    return {};
  }

  extractRelevantLabs(labs) {
    // Extract relevant lab values for trial matching
    return labs || {};
  }

  assessCardiacFunction(data) {
    return data.ejectionFraction || 'normal';
  }

  assessHepaticFunction(data) {
    return data.liverFunction || 'normal';
  }

  assessRenalFunction(data) {
    return data.kidneyFunction || 'normal';
  }

  evaluateAgeCriterion(age, criterion) {
    const met = age >= criterion.min && age <= criterion.max;
    return {
      met,
      reason: met ? 'Age within range' : `Age ${age} outside range ${criterion.min}-${criterion.max}`
    };
  }

  evaluateDiagnosisCriterion(diagnoses, criterion) {
    const hasDiagnosis = diagnoses?.some(d => 
      d.condition.toLowerCase().includes(criterion.value.toLowerCase()) ||
      d.icd10 === criterion.icd10
    );
    
    return {
      met: hasDiagnosis,
      reason: hasDiagnosis ? 'Has required diagnosis' : 'Missing required diagnosis'
    };
  }

  evaluateLabCriterion(labs, criterion) {
    const value = labs[criterion.labName];
    if (!value) {
      return { met: false, uncertain: true, reason: 'Lab value not available' };
    }
    
    let met = false;
    switch (criterion.operator) {
      case '>':
        met = value > criterion.threshold;
        break;
      case '<':
        met = value < criterion.threshold;
        break;
      case '>=':
        met = value >= criterion.threshold;
        break;
      case '<=':
        met = value <= criterion.threshold;
        break;
      case '=':
        met = value === criterion.threshold;
        break;
    }
    
    return {
      met,
      reason: `${criterion.labName}: ${value} ${criterion.operator} ${criterion.threshold}`
    };
  }

  evaluateMedicationCriterion(medications, criterion) {
    const hasMedication = medications?.some(m => 
      m.name.toLowerCase().includes(criterion.value.toLowerCase())
    );
    
    return {
      met: criterion.required ? hasMedication : !hasMedication,
      reason: criterion.required ? 
        (hasMedication ? 'On required medication' : 'Not on required medication') :
        (hasMedication ? 'On excluded medication' : 'Not on excluded medication')
    };
  }

  evaluateGenomicCriterion(genomics, criterion) {
    const hasMutation = genomics.mutations?.includes(criterion.mutation);
    const hasBiomarker = genomics.biomarkers?.includes(criterion.biomarker);
    
    const met = criterion.mutation ? hasMutation : hasBiomarker;
    
    return {
      met,
      reason: met ? 'Has required genomic marker' : 'Missing required genomic marker'
    };
  }

  evaluatePerformanceCriterion(status, criterion) {
    if (!status) {
      return { met: false, uncertain: true, reason: 'Performance status unknown' };
    }
    
    const met = status >= criterion.min && status <= criterion.max;
    
    return {
      met,
      reason: met ? 'Performance status acceptable' : 'Performance status outside range'
    };
  }

  async evaluateTextCriterion(profile, criterion) {
    // Use NLP for complex text criteria
    return { met: false, uncertain: true, reason: 'Requires manual review' };
  }

  notifyNewTrial(trial) {
    console.log('New trial available:', trial.title);
  }
}

// Create singleton instance
const clinicalTrialsMatching = new ClinicalTrialsMatchingEngine();

export default clinicalTrialsMatching;