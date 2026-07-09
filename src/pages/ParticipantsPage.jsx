import React, { useState } from 'react';
import AlertMessage from '../components/AlertMessage';
import ConfirmModal from '../components/ConfirmModal';

const ParticipantsPage = () => {
    const [participants, setParticipants] = useState([
        { id: 1, name: 'Ana López', email: 'ana@email.com' },
        { id: 2, name: 'Luis Pérez', email: 'luis@email.com' },
        { id: 3, name: 'María Gómez', email: 'maria@email.com' }
    ]);

    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [selectedParticipantId, setSelectedParticipantId] = useState(null);

    const handleDeleteClick = (id) => {
        setSelectedParticipantId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        setParticipants((prev) =>
        prev.filter((participant) => participant.id !== selectedParticipantId)
        );
        setShowModal(false);
        setSelectedParticipantId(null);
        setAlert({
        type: 'success',
        message: 'Participante eliminado correctamente.'
        });
    };

    return (
        <div className="container py-5">
        <div className="mb-4">
            <h2 className="fw-bold mb-1">Participantes</h2>
            <p className="text-muted mb-0">
            Gestión básica de participantes registrados.
            </p>
        </div>

        <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: '', message: '' })}
        />

        <div className="card shadow-sm">
            <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover mb-0">
                <thead className="table-light">
                    <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th className="text-end">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant) => (
                    <tr key={participant.id}>
                        <td>{participant.name}</td>
                        <td>{participant.email}</td>
                        <td className="text-end">
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteClick(participant.id)}
                        >
                            Eliminar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>

        <ConfirmModal
            show={showModal}
            title="Eliminar participante"
            message="¿Seguro que deseas eliminar este participante?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowModal(false)}
        />
        </div>
    );
};

export default ParticipantsPage;
