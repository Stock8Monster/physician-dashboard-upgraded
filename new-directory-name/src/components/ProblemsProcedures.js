import React from 'react';
import { Box } from 'grommet';
import ActiveProblems from './ActiveProblems';
import Procedures from './Procedures';

const ProblemsProcedures = ({ problems, procedures, onProblemsUpdate, onProceduresUpdate }) => {
    return (
        <Box direction="row" gap="large">
            <Box width="50%">
                <ActiveProblems problems={problems} onUpdate={onProblemsUpdate} />
            </Box>
            <Box width="50%">
                <Procedures procedures={procedures} onUpdate={onProceduresUpdate} />
            </Box>
        </Box>
    );
};

export default ProblemsProcedures;
