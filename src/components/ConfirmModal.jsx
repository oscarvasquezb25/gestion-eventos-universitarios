import React from 'react';

const ConfirmModal = ({
    show,
    title = 'Confirmar acción',
    message = '¿Estás seguro de realizar esta acción?',
    onConfirm,
    onCancel
    }) => {
    if (!show) return null;

    return (
        <div
        className="modal fade show"
        style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
        tabIndex="-1"
        role="dialog"
        >
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title fw-bold">{title}</h5>
                <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>

            <div className="modal-body">
                <p className="mb-0">{message}</p>
            </div>

            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onCancel}>
                Cancelar
                </button>
                <button className="btn btn-danger" onClick={onConfirm}>
                Confirmar
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ConfirmModal;
