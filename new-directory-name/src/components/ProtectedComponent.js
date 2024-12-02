import React from 'react';

const ProtectedComponent = () => {
    return (
        <div>
            <h2>Protected Content</h2>
            <p>This is a protected page. You must be logged in to see this.</p>
        </div>
    );
};

export default ProtectedComponent;
