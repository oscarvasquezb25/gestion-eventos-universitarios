import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import Loading from '../components/Loading';
import {
    getEventById,
    createEvent,
    updateEvent
    } from '../services/eventService';

    const initialFormState = {
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    speaker: ''
    };

    const EventFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' });

    useEffect(() => {
        const loadEventData = async () => {
        if (!isEditMode) return;

        try {
            setLoading(true);
            setAlert({ type: '', message: '' });

            const event = await getEventById(id);

            setFormData({
            title: event.title || '',
            description: event.description || '',
            date: event.date || '',
            location: event.location || '',
            category: event.category || '',
            speaker: event.speaker || ''
            });
        } catch (error) {
            console.error('Error cargando evento para editar:', error);
            setAlert({
            type: 'danger',
            message: 'No se pudo cargar la información del evento.'
            });
        } finally {
            setLoading(false);
        }
        };

        loadEventData();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.title.trim()) return 'El título es obligatorio.';
        if (!formData.date.trim()) return 'La fecha es obligatoria.';
        if (!formData.location.trim()) return 'La ubicación es obligatoria.';
        if (!formData.category.trim()) return 'La categoría es obligatoria.';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
        setAlert({
            type: 'danger',
            message: validationError
        });
        return;
        }

        try {
        setSaving(true);
        setAlert({ type: '', message: '' });

        if (isEditMode) {
            await updateEvent(id, formData);
            setAlert({
            type: 'success',
            message: 'Evento actualizado correctamente.'
            });
        } else {
            await createEvent(formData);
            setAlert({
            type: 'success',
            message: 'Evento creado correctamente.'
            });
        }

        setTimeout(() => {
            navigate('/events');
        }, 1200);
        } catch (error) {
        console.error('Error guardando evento:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo guardar el evento.'
        });
        } finally {
        setSaving(false);
        }
    };

    if (loading) {
        return (
        <div className="container py-5">
            <Loading message={isEditMode ? 'Cargando evento...' : 'Cargando formulario...'} />
        </div>
        );
    }

    return (
        <div className="container py-5">
        <div className="mb-4">
            <h2 className="fw-bold mb-1">
            {isEditMode ? 'Editar evento' : 'Nuevo evento'}
            </h2>
            <p className="text-muted mb-0">
            {isEditMode
                ? 'Modifica los datos del evento seleccionado.'
                : 'Completa los campos para crear un nuevo evento.'}
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
                <div className="mb-3">
                <label className="form-label">Título *</label>
                <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ej: Conferencia de Innovación"
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe brevemente el evento"
                />
                </div>

                <div className="row g-3">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha *</label>
                    <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Ubicación *</label>
                    <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ej: Auditorio principal"
                    />
                </div>
                </div>

                <div className="row g-3">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Categoría *</label>
                    <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Ej: Conferencia, Taller, Seminario"
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Ponente</label>
                    <input
                    type="text"
                    className="form-control"
                    name="speaker"
                    value={formData.speaker}
                    onChange={handleChange}
                    placeholder="Ej: Ing. Carlos Torres"
                    />
                </div>
                </div>

                <div className="d-flex gap-2 justify-content-end mt-4">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/events')}
                    disabled={saving}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                >
                    {saving
                    ? 'Guardando...'
                    : isEditMode
                    ? 'Actualizar evento'
                    : 'Guardar evento'}
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default EventFormPage;
