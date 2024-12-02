import { useEffect, useRef } from "react";

const DynamicChartIframe = ({ data, chartScript }) => {
    const iframeRef = useRef(null);
    let _chartScript = `var data = [
    {
        x: ['20-29', '30-39', '40-49', '50-59', '60-69', '70+'],
        y: ['Average', 'Average', 'Average', 'Average', 'Average', 'Average'],
        z: [116, 107, 99, 93, 85, 75],
        mode: 'markers',
        marker: {
            size: 12,
            line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        },
        type: 'scatter3d',
        name: 'Average GFR'
    },
    {
        x: ['70+'],
        y: ['Patient'],
        z: [60],
        mode: 'markers',
        marker: {
            color: 'rgb(255, 65, 54)',
            size: 12,
            symbol: 'circle',
            line: {
                color: 'rgb(204, 204, 204)',
                width: 1
            },
            opacity: 0.9
        },
        type: 'scatter3d',
        name: 'Patient GFR'
    }
];

var layout = {
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
    },
    scene: {
        xaxis: {
            title: 'Age Group'
        },
        yaxis: {
            title: 'Category'
        },
        zaxis: {
            title: 'GFR (mL/min/1.73 m^2)',
            range: [0, 120]
        }
    }
};

Plotly.newPlot('chart', data, layout);
`

    useEffect(() => {
        const handleLoad = () => {
            if (iframeRef.current) {
                console.log(_chartScript);
                iframeRef.current.contentWindow.postMessage({
                    type: 'execute',
                    code: chartScript
                }, '*');
            }
        };

        const iframeElement = iframeRef.current;
        iframeElement.addEventListener('load', handleLoad);
        return () => iframeElement.removeEventListener('load', handleLoad);
    }, [chartScript]);

    return (
        <iframe
            ref={iframeRef}
            src={`${process.env.PUBLIC_URL}/iframe.html`}
            style={{ width: '100%', minHeight: '800px' }}
            sandbox="allow-scripts allow-same-origin allow-modals"
        ></iframe>
    );
};

export default DynamicChartIframe;
