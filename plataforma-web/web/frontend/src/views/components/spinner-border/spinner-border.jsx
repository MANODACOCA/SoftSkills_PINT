import React from 'react';

const SpinnerBorder = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
        </div>
    );
};

export default SpinnerBorder;
