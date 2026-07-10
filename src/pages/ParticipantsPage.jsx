import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import ConfirmModal from '../components/ConfirmModal';
import SearchBar from '../components/SearchBar';
import {
    getParticipants,
    deleteParticipant
} from '../services/participantService';

const ParticipantsPage = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [search, setSearch] = useState('');
    const [selectedParticipantId, setSelectedParticipantId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const loadParticipants = async () => {
        try {
        setLoading(true);
        const data = await getParticipants();
        setParticipants(Array.isArray(data) ? data : []);
        } catch (error) {
        console.error('Error cargando participantes:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudieron cargar los participantes.'
        });
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadParticipants();
    }, []);

    const filteredParticipants = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return participants;

        return participants.filter((participant) => {
        const name = participant?.name?.toLowerCase() || '';
        const email = participant?.email?.toLowerCase() || '';
        const career = participant?.career?.toLowerCase() || '';
        const phone = participant?.phone?.toLowerCase() || '';

        return (
            name.includes(query) ||
            email.includes(query) ||
            career.includes(query) ||
            phone.includes(query)
        );
        });
    }, [participants, search]);

    const handleDeleteClick = (id) => {
        setSelectedParticipantId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
        await deleteParticipant(selectedParticipantId);
        setParticipants((prev) =>
            prev.filter((p) => p.id !== selectedParticipantId)
        );
        setAlert({
            type: 'success',
            message: 'Participante eliminado correctamente.'
        });
        } catch (error) {
        console.error('Error eliminando participante:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo eliminar el participante.'
        });
        } finally {
        setShowModal(false);
        setSelectedParticipantId(null);
        }
    };

    return (
        <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
            <h2 className="fw-bold mb-1">Participantes</h2>
            <p className="text-muted mb-0">
                Gestiona la lista de participantes registrados.
            </p>
            </div>

            <Link to="/participants/new" className="btn btn-success">
            + Nuevo participante
            </Link>
        </div>

        <div className="mb-4">
            <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nombre, correo, carrera o teléfono..."
            />
        </div>

        <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: '', message: '' })}
        />

        {loading ? (
            <Loading message="Cargando participantes..." />
        ) : (
            <div className="row g-4">
            {filteredParticipants.length > 0 ? (
                filteredParticipants.map((participant) => (
                <div className="col-md-6 col-lg-4" key={participant.id}>
                    <div className="card shadow-sm h-100">
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold">
                        {participant.name || 'Sin nombre'}
                        </h5>
                        <p className="mb-1"><strong>Email:</strong> {participant.email || 'No registrado'}</p>
                        <p className="mb-1"><strong>Teléfono:</strong> {participant.phone || 'No registrado'}</p>
                        <p className="mb-3"><strong>Carrera:</strong> {participant.career || 'No registrada'}</p>

                        <div className="d-flex gap-2 mt-auto flex-wrap">
                        <Link
                            to={`/participants/edit/${participant.id}`}
                            className="btn btn-outline-warning btn-sm"
                        >
                            Editar
                        </Link>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteClick(participant.id)}
                        >
                            Eliminar
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="col-12">
                <div className="alert alert-warning text-center">
                    No se encontraron participantes.
                </div>
                </div>
            )}
            </div>
        )}

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