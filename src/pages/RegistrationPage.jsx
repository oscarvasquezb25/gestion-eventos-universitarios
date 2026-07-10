import React, { useEffect, useMemo, useState } from 'react';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import ConfirmModal from '../components/ConfirmModal';
import SearchBar from '../components/SearchBar';
import api from '../services/api';
import { getEvents } from '../services/eventService';
import { getParticipants } from '../services/participantService';
import {
    getRegistrations,
    createRegistration,
    deleteRegistration
    } from '../services/registrationService';

    const RegistrationPage = () => {
    const [registrations, setRegistrations] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [showModal, setShowModal] = useState(false);
    const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);

    const [formData, setFormData] = useState({
        participantId: '',
        eventId: '',
        status: 'Confirmado'
    });

    const loadData = async () => {
        try {
        setLoading(true);
        const [regs, parts, evs] = await Promise.all([
            getRegistrations(),
            getParticipants(),
            getEvents()
        ]);

        setRegistrations(Array.isArray(regs) ? regs : []);
        setParticipants(Array.isArray(parts) ? parts : []);
        setEvents(Array.isArray(evs) ? evs : []);
        } catch (error) {
        console.error('Error cargando datos:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo cargar la información de inscripciones.'
        });
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.participantId || !formData.eventId) {
        setAlert({
            type: 'danger',
            message: 'Debes seleccionar un participante y un evento.'
        });
        return;
        }

        const alreadyRegistered = registrations.some(
        (r) =>
            String(r.participantId) === String(formData.participantId) &&
            String(r.eventId) === String(formData.eventId)
        );

        if (alreadyRegistered) {
        setAlert({
            type: 'danger',
            message: 'Este participante ya está inscrito en ese evento.'
        });
        return;
        }

        try {
        setSaving(true);
        await createRegistration({
            participantId: Number(formData.participantId),
            eventId: Number(formData.eventId),
            status: formData.status,
            registeredAt: new Date().toISOString().split('T')[0]
        });

        setAlert({
            type: 'success',
            message: 'Inscripción registrada correctamente.'
        });

        setFormData({
            participantId: '',
            eventId: '',
            status: 'Confirmado'
        });

        await loadData();
        } catch (error) {
        console.error('Error creando inscripción:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo registrar la inscripción.'
        });
        } finally {
        setSaving(false);
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedRegistrationId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
        await deleteRegistration(selectedRegistrationId);
        setRegistrations((prev) =>
            prev.filter((r) => r.id !== selectedRegistrationId)
        );
        setAlert({
            type: 'success',
            message: 'Inscripción eliminada correctamente.'
        });
        } catch (error) {
        console.error('Error eliminando inscripción:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo eliminar la inscripción.'
        });
        } finally {
        setShowModal(false);
        setSelectedRegistrationId(null);
        }
    };

    const filteredRegistrations = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return registrations;

        return registrations.filter((reg) => {
        const participant = participants.find(
            (p) => String(p.id) === String(reg.participantId)
        );
        const event = events.find((e) => String(e.id) === String(reg.eventId));

        const participantName = participant?.name?.toLowerCase() || '';
        const eventTitle = event?.title?.toLowerCase() || '';
        const status = reg?.status?.toLowerCase() || '';

        return (
            participantName.includes(query) ||
            eventTitle.includes(query) ||
            status.includes(query)
        );
        });
    }, [registrations, participants, events, search]);

    return (
        <div className="container py-5">
        <div className="mb-4">
            <h2 className="fw-bold mb-1">Inscripciones</h2>
            <p className="text-muted mb-0">
            Registra participantes en eventos seleccionando datos existentes.
            </p>
        </div>

        <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: '', message: '' })}
        />

        <div className="card shadow-sm mb-4">
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                <div className="col-md-5">
                    <label className="form-label">Participante</label>
                    <select
                    className="form-select"
                    name="participantId"
                    value={formData.participantId}
                    onChange={handleChange}
                    >
                    <option value="">Selecciona un participante</option>
                    {participants.map((p) => (
                        <option key={p.id} value={p.id}>
                        {p.name} - {p.email}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="col-md-5">
                    <label className="form-label">Evento</label>
                    <select
                    className="form-select"
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleChange}
                    >
                    <option value="">Selecciona un evento</option>
                    {events.map((e) => (
                        <option key={e.id} value={e.id}>
                        {e.title} - {e.date}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <label className="form-label">Estado</label>
                    <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    >
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cancelado">Cancelado</option>
                    </select>
                </div>
                </div>

                <div className="d-flex justify-content-end mt-3">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Guardando...' : 'Registrar inscripción'}
                </button>
                </div>
            </form>
            </div>
        </div>

        <div className="mb-4">
            <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por participante, evento o estado..."
            />
        </div>

        {loading ? (
            <Loading message="Cargando inscripciones..." />
        ) : (
            <div className="row g-4">
            {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => {
                const participant = participants.find(
                    (p) => String(p.id) === String(reg.participantId)
                );
                const event = events.find(
                    (e) => String(e.id) === String(reg.eventId)
                );

                return (
                    <div className="col-md-6 col-lg-4" key={reg.id}>
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex flex-column">
                        <h5 className="card-title fw-bold">
                            {participant?.name || 'Participante no encontrado'}
                        </h5>
                        <p className="mb-1">
                            <strong>Evento:</strong> {event?.title || 'Evento no encontrado'}
                        </p>
                        <p className="mb-1">
                            <strong>Estado:</strong> {reg.status || 'Sin estado'}
                        </p>
                        <p className="mb-3">
                            <strong>Fecha:</strong> {reg.registeredAt || 'No registrada'}
                        </p>

                        <button
                            className="btn btn-outline-danger btn-sm mt-auto"
                            onClick={() => handleDeleteClick(reg.id)}
                        >
                            Eliminar
                        </button>
                        </div>
                    </div>
                    </div>
                );
                })
            ) : (
                <div className="col-12">
                <div className="alert alert-warning text-center">
                    No se encontraron inscripciones.
                </div>
                </div>
            )}
            </div>
        )}

        <ConfirmModal
            show={showModal}
            title="Eliminar inscripción"
            message="¿Seguro que deseas eliminar esta inscripción?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowModal(false)}
        />
        </div>
    );
};

export default RegistrationPage;