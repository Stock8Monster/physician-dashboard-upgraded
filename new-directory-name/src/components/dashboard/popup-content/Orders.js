import React from 'react';
import { Box, Text, Heading } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents'; // Adjust the import path as needed

const Orders = () => {
    const orders = [
        { description: 'Transthoracic Echo, scheduled for follow-up review on 07/19/2024' },
        { description: 'Lipid Panel due on 03/20/2029 (routine)' },
        { description: 'Bone density scan, scheduled for 04/18/2025' },
        { description: 'CT Chest with contrast for further evaluation of pulmonary hypertension (order placed)' },
        { description: 'Dietary consultation to address vitamin D levels and osteoporosis management (order placed)' },
    ];

    return (
        <StyledCard>
            <Heading level={3} margin={{ bottom: 'small' }} color="#fff">Pending Orders</Heading>
            <Box pad="small">
                {orders.map((order, index) => (
                    <InfoText key={index} margin={{ bottom: 'small' }}>
                        {order.description}
                    </InfoText>
                ))}
            </Box>
        </StyledCard>
    );
};

export default Orders;
