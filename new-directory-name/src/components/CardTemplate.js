import React, { useContext } from "react";
import { Card, CardHeader, CardBody, CardFooter, Heading, ResponsiveContext, ThemeContext } from "grommet";
import BloodPressureChart from "./BloodPressureChart";
import DynamicChartIframe from "./DynamicChartIframe";

const CardTemplate = ({ title, data, chartScript }) => {
    const size = useContext(ResponsiveContext);
    const theme = useContext(ThemeContext);

    return (
        <Card
            elevation="medium"
            pad="medium"
            round="small"
            margin="small"
            style={{ flex: 1, minHeight: '675px', width: '85%', height: 'auto' }}>
            <CardHeader pad="small">
                <Heading level={2} margin="none">{title}</Heading>
            </CardHeader>
            <CardBody pad="small" style={{ minHeight: '250px', flex: 1, display: 'flex' }}>
                <DynamicChartIframe chartData={data} chartScript={chartScript} />
            </CardBody>
            <CardFooter pad="small" background="background-contrast">
                LINK TO DATA
            </CardFooter>
        </Card>
    );
};

export default CardTemplate;
