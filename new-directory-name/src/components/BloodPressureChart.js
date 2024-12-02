import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    defs, linearGradient, stop
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import { handleDotClick } from '../utils/chartUtils'; // Importing handleDotClick

const BloodPressureChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
                <linearGradient id="colorSyst" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDias" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="Systolic" stroke="#8884d8" fillOpacity={1} fill="url(#colorSyst)"
                  activeDot={{ r: 8, onClick: handleDotClick }} />
            <Line type="monotone" dataKey="Diastolic" stroke="#82ca9d" fillOpacity={1} fill="url(#colorDias)"
                  activeDot={{ r: 8, onClick: handleDotClick }} />
        </LineChart>
    </ResponsiveContainer>
);

export default BloodPressureChart;
