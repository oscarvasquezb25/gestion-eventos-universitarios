import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';
import Loading from '../components/Loading';
import {
    createParticipant,
    getParticipantById,
    updateParticipant
    } from '../services/participantService';

    const ParticipantFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        career: ''
    });

    useEffect(() => {
        const loadParticipant = async () => {
        if (!isEditing) return;

        try {
            setLoading(true);
            const participant = await getParticipantById(id);

            setFormData({
            name: participant.name || '',
            email: participant.email || '',
            phone: participant.phone || '',
            career: participant.career || ''
            });
        } catch (error) {
            console.error('Error cargando participante:', error);
            setAlert({
            type: 'danger',
            message: 'No se pudo cargar la información del participante.'
            });
        } finally {
            setLoading(false);
        }
        };

        loadParticipant();
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim()) {
        setAlert({
            type: 'danger',
            message: 'El nombre y el correo son obligatorios.'
        });
        return;
        }

        try {
        setSaving(true);

        if (isEditing) {
            await updateParticipant(id, formData);
            setAlert({
            type: 'success',
            message: 'Participante actualizado correctamente.'
            });
        } else {
            await createParticipant(formData);
            setAlert({
            type: 'success',
            message: 'Participante creado correctamente.'
            });
            setFormData({
            name: '',
            email: '',
            phone: '',
            career: ''
            });
        }

        setTimeout(() => {
            navigate('/participants');
        }, 900);
        } catch (error) {
        console.error('Error guardando participante:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo guardar el participante.'
        });
        } finally {
        setSaving(false);
        }
    };

    if (loading) {
        return <Loading message="Cargando participante..." />;
    }

    return (
        <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-lg-7">
            <div className="card shadow-sm border-0">
                <div className="card-body p-4 p-md-5">
                <h2 className="fw-bold mb-1">
                    {isEditing ? 'Editar participante' : 'Nuevo participante'}
                </h2>
                <p className="text-muted mb-4">
                    Completa los datos del participante.
                </p>

                <AlertMessage
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert({ type: '', message: '' })}
                />

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <label className="form-label">Nombre completo *</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. María López"
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Correo electrónico *</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ej. maria@gmail.com"
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej. 999888777"
                    />
                    </div>

                    <div className="mb-4">
                    <label className="form-label">Carrera</label>
                    <input
                        type="text"
                        className="form-control"
                        name="career"
                        value={formData.career}
                        onChange={handleChange}
                        placeholder="Ej. Ingeniería de Sistemas"
                    />
                    </div>

                    <div className="d-flex justify-content-between gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate('/participants')}
                    >
                        Cancelar
                    </button>

                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
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

export default ParticipantFormPage;