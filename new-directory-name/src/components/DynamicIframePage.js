import { useEffect, useRef } from "react";

const DynamicChartIframe = ({ chartScript }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const handleLoad = () => {
            // Optional: Any post-load actions can be managed here
            console.log("Iframe loaded");
        };

        // Adding event listener for iframe load
        const iframeElement = iframeRef.current;
        iframeElement.addEventListener('load', handleLoad);

        // Clean-up function to remove event listener
        return () => iframeElement.removeEventListener('load', handleLoad);
    }, [chartScript]); // Empty dependency array if `chartScript` does not affect the load handler

    return (
        <iframe
            ref={iframeRef}
            srcDoc={chartScript}
            style={{ width: '95%', height: '105%' }}
            sandbox="allow-scripts allow-same-origin allow-modals"
        ></iframe>
    );
};

export default DynamicChartIframe;
