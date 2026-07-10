import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import Loading from '../components/Loading';
import { getEvents } from '../services/eventService';
import { getParticipants } from '../services/participantService';
import {
    getRegistrationById,
    updateRegistration
    } from '../services/registrationService';

    const RegistrationFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' });

    const [participants, setParticipants] = useState([]);
    const [events, setEvents] = useState([]);

    const [formData, setFormData] = useState({
        participantId: '',
        eventId: '',
        status: 'Confirmado',
        registeredAt: ''
    });

    useEffect(() => {
        const loadData = async () => {
        try {
            setLoading(true);

            const [participantsData, eventsData, registration] = await Promise.all([
            getParticipants(),
            getEvents(),
            getRegistrationById(id)
            ]);

            setParticipants(Array.isArray(participantsData) ? participantsData : []);
            setEvents(Array.isArray(eventsData) ? eventsData : []);

            setFormData({
            participantId: registration.participantId || '',
            eventId: registration.eventId || '',
            status: registration.status || 'Confirmado',
            registeredAt: registration.registeredAt || ''
            });
        } catch (error) {
            console.error('Error cargando inscripción:', error);
            setAlert({
            type: 'danger',
            message: 'No se pudo cargar la inscripción.'
            });
        } finally {
            setLoading(false);
        }
        };

        loadData();
    }, [id]);

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

        try {
        setSaving(true);

        await updateRegistration(id, {
            participantId: Number(formData.participantId),
            eventId: Number(formData.eventId),
            status: formData.status,
            registeredAt: formData.registeredAt || new Date().toISOString().split('T')[0]
        });

        setAlert({
            type: 'success',
            message: 'Inscripción actualizada correctamente.'
        });

        setTimeout(() => {
            navigate('/registration');
        }, 900);
        } catch (error) {
        console.error('Error actualizando inscripción:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo actualizar la inscripción.'
        });
        } finally {
        setSaving(false);
        }
    };

    if (loading) {
        return <Loading message="Cargando inscripción..." />;
    }

    return (
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-lg-8">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                <h2 className="fw-bold mb-1">Editar inscripción</h2>
                <p className="text-muted mb-4">
                    Modifica la inscripción seleccionando participantes y eventos existentes.
                </p>

                <AlertMessage
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: '', message: '' })}
                />

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

                    <div className="mb-3 mt-3">
                    <label className="form-label">Fecha de inscripción</label>
                    <input
                        type="date"
                        className="form-control"
                        name="registeredAt"
                        value={formData.registeredAt}
                        onChange={handleChange}
                    />
                    </div>

                    <div className="d-flex justify-content-between gap-2 mt-4">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/registration')}
                    >
                        Cancelar
                    </button>

                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Guardando...' : 'Actualizar inscripción'}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default RegistrationFormPage;
