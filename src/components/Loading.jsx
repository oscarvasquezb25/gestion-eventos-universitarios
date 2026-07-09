import React from 'react';

const Loading = ({ message = 'Cargando...' }) => {
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
        <div className="text-center">
            <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
            <p className="mt-3 text-muted mb-0">{message}</p>
        </div>
        </div>
    );
};

export default Loading;
