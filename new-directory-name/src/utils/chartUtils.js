import {
    jerry_ehr_dashboard_html,
    jerry_ehr_dashboard_vitals_html,
    jerry_ehr_dashboard_labs_html,
    jerry_ehr_dashboard_timeline_html,
    jerry_ehr_dashboard_referrals_html,
    jerry_ehr_dashboard_medicine_html,
    vicki_ehr_dashboard_html,
    vicki_ehr_dashboard_vitals_html,
    vicki_ehr_dashboard_labs_html,
    vicki_ehr_dashboard_timeline_html,
    vicki_ehr_dashboard_referrals_html,
    vicki_ehr_dashboard_medicine_html
} from "../data/staticData";

export const loadPatientCharts = async (patientName, setLoading, setChatHistory) => {
    setLoading(true); // Set loading state

    const charts = [];
    let chartTitles = [];
    chartTitles = [
        'Health Dashboard Overview',
        'Vitals with Trends',
        'Labs with Trends',
        'Med Events / Current Conditional Timeline',
        'Active Medications',
        'Referrals and Events'
    ];

    if (patientName === 'Vickie') {
        console.log('VICKIE CHARTS');
        charts.push(
            { script: removeJavaScriptComments(vicki_ehr_dashboard_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[0]}` },
            { script: removeJavaScriptComments(vicki_ehr_dashboard_vitals_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[1]}` },
            { script: removeJavaScriptComments(vicki_ehr_dashboard_labs_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[2]}` },
            { script: removeJavaScriptComments(vicki_ehr_dashboard_timeline_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[3]}` },
            { script: removeJavaScriptComments(vicki_ehr_dashboard_medicine_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[4]}` },
            { script: removeJavaScriptComments(vicki_ehr_dashboard_referrals_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[5]}` }
        );
    } else if (patientName === 'Jerry') {
        charts.push(
            { script: removeJavaScriptComments(jerry_ehr_dashboard_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[0]}` },
            { script: removeJavaScriptComments(jerry_ehr_dashboard_vitals_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[1]}` },
            { script: removeJavaScriptComments(jerry_ehr_dashboard_labs_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[2]}` },
            { script: removeJavaScriptComments(jerry_ehr_dashboard_timeline_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[3]}` },
            { script: removeJavaScriptComments(jerry_ehr_dashboard_medicine_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[4]}` },
            { script: removeJavaScriptComments(jerry_ehr_dashboard_referrals_html.replace(/\n/g, '').replace(/javascript/g, '')), title: `${chartTitles[5]}` }
        );
    }

    setChatHistory(currentHistory => [
        ...currentHistory,
        { type: 'user', text: `Load Patient: ${patientName}`, label: 'User', timestamp: new Date().toISOString() }
    ]);

    setChatHistory(currentHistory => [
        ...currentHistory,
        { type: 'ai', text: 'Request Completed', label: 'AI', timestamp: new Date().toISOString() }
    ]);

    setLoading(false); // Clear loading state

    return charts;  // Return an array of chart objects
};

function removeJavaScriptComments(html) {
    return html.replace(/(^|[^:])\/\/.*?(?=\s|,|}|$)/g, '$1');
}

export function formatToJsonString(data) {
    let _data =  data.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
    //_data = _data.replace(/(\w+):/g, '"$1":');
    return _data;
}