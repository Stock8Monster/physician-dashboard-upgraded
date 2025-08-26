# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based physician dashboard application (Agama POC UI) with a patient portal feature. The application is built using Create React App with React 17 and includes healthcare-specific components for managing patient data, consultations, and medical records.

## Development Commands

```bash
# Start development server on port 9000 (Windows)
npm start

# Start development server on default port (Windows)
npm run start-dev

# Build for production
npm run build

# Run tests in watch mode
npm test
```

Note: The project uses `NODE_OPTIONS=--openssl-legacy-provider` for compatibility with the current Node version.

## Architecture Overview

### Core Application Structure
- **Router-based navigation**: Uses React Router v6 with protected routes requiring authentication
- **Authentication flow**: Login → ConsultList (patient selection) → Dashboard
- **Three main interfaces**:
  1. Admin interface (`/admin`) - Administrative functions
  2. Physician dashboard (`/dashboard`) - Main physician interface with patient data
  3. Patient portal (`/patient-portal`) - Separate patient-facing interface

### Key Architectural Patterns

**Component Organization**:
- `src/components/` - Reusable UI components
- `src/components/dashboard/` - Dashboard-specific components
- `src/components/dashboard/popup-content/` - Modal/popup content components
- `src/components/patient-portal/` - Patient portal specific components
- `src/pages/` - Route-level page components

**State Management**:
- Local component state with React hooks
- Context API for responsive behavior (`ResponsiveContext`)
- Popup management through prop drilling from App.js

**Styling Approach**:
- Styled Components for component-specific styling
- Grommet UI framework as the base component library
- Material-UI icons and components
- CSS modules for specific component styles

### Key Dependencies

- **UI Framework**: Grommet (v2.41.0) with custom theme
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM v6
- **Styling**: Styled Components + Material-UI
- **Speech**: react-speech-recognition for voice commands
- **Layout**: react-grid-layout, react-resizable, react-split for dynamic layouts
- **Markdown**: react-markdown with GitHub-flavored markdown support

### Important Implementation Details

**Dashboard Component**:
- Manages popups array for multiple simultaneous popups
- Handles voice commands through speech recognition
- Resizable panels with pointer capture for smooth resizing
- Integrates AI chat functionality

**Patient Service**:
- Located at `src/services/patientService.js`
- Handles all patient data operations

**Static Data**:
- Blood pressure data: `src/data/bloodPressureData.js`
- General static data: `src/data/staticData.js`

**Responsive Design**:
- ResponsiveContext provides device detection
- Mobile-specific layouts and behaviors
- Device detection utilities in `src/utils/deviceDetection.js`

## Revolutionary AI Features (Industry-Altering Capabilities)

### Core AI Services
- **Ambient Intelligence** (`src/services/ambientIntelligence.js`): Real-time consultation transcription and auto-documentation
- **Predictive Analytics** (`src/services/predictiveAnalytics.js`): 48-72 hour patient deterioration prediction with digital twins
- **Clinical Trials Matching** (`src/services/clinicalTrialsMatching.js`): Real-time global trial matching

### Revolutionary Components
- **Clinical Autopilot** (`src/components/dashboard/ClinicalAutopilot.js`): Autonomous clinical decision support
- **Revolutionary Dashboard** (`src/components/dashboard/RevolutionaryDashboard.js`): Integrated AI command center
- **Enhanced Dashboard** (`src/pages/Dashboard-Enhanced.js`): Seamless integration with existing dashboard

### Access Revolutionary Features
- Navigate to `/dashboard-ai` for enhanced dashboard with AI features
- Use "Revolutionary Mode" button to activate full AI interface
- Individual features can be toggled from AI Control Bar

### Key Innovations
1. **Zero-Click Documentation**: Automatic SOAP note generation from ambient listening
2. **Digital Twin Technology**: Patient simulation for treatment testing
3. **Predictive Alerts**: 48-hour advance warning for clinical deterioration
4. **Clinical Trial Matching**: Automatic eligibility assessment for global trials
5. **Autonomous Guidance**: AI-driven clinical workflow optimization

### Testing Revolutionary Features
See `REVOLUTIONARY_FEATURES.md` for detailed feature documentation
See `DEPLOYMENT_GUIDE.md` for deployment and configuration instructions