import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        participantName: '',
        participantEmail: '',
        eventId: ''
    });

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setAlert({
        type: 'success',
        message: 'Inscripción registrada correctamente.'
        });
    };

    return (
        <div className="container py-5">
        <div className="mb-4">
            <h2 className="fw-bold mb-1">Inscripción</h2>
            <p className="text-muted mb-0">
            Registra la participación en un evento.
            </p>
        </div>

        <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: '', message: '' })}
        />

        <div className="card shadow-sm">
            <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Nombre del participante</label>
                    <input
                    type="text"
                    name="participantName"
                    className="form-control"
                    value={formData.participantName}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Correo electrónico</label>
                    <input
                    type="email"
                    name="participantEmail"
                    className="form-control"
                    value={formData.participantEmail}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">ID del evento</label>
                    <input
                    type="number"
                    name="eventId"
                    className="form-control"
                    value={formData.eventId}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                    Registrar inscripción
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default RegistrationPage;
