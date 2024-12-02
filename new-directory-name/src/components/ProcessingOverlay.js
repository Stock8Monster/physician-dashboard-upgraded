// src/components/ProcessingOverlay.js
import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'grommet';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Message = styled.div`
    color: white;
    font-size: 1.5em;
    margin-top: 10px;
`;

const ProcessingOverlay = () => (
    <Overlay>
        <div>
            <Spinner size="large" color="white" />
            <Message>Processing...</Message>
        </div>
    </Overlay>
);

export default ProcessingOverlay;
