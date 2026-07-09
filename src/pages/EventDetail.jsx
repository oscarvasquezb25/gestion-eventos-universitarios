import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import { getEventById } from '../services/eventService';

const EventDetail = () => {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({
        type: '',
        message: ''
    });

    const loadEvent = async () => {
        try {
        setLoading(true);
        setAlert({ type: '', message: '' });

        const data = await getEventById(id);
        setEvent(data);
        } catch (error) {
        console.error('Error cargando detalle del evento:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo cargar el detalle del evento.'
        });
        setEvent(null);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadEvent();
    }, [id]);

    if (loading) {
        return (
        <div className="container py-5">
            <Loading message="Cargando detalle del evento..." />
        </div>
        );
    }

    return (
        <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
            <h2 className="fw-bold mb-1">Detalle del evento</h2>
            <p className="text-muted mb-0">
                Información completa del evento seleccionado.
            </p>
            </div>

            <Link to="/events" className="btn btn-outline-secondary">
            Volver a eventos
            </Link>
        </div>

        <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: '', message: '' })}
        />

        {!event ? (
            <div className="alert alert-warning text-center">
            No se encontró el evento solicitado.
            </div>
        ) : (
            <div className="card shadow-sm">
            <div className="card-body p-4">
                <span className="badge bg-primary mb-3">
                {event.category}
                </span>

                <h3 className="fw-bold mb-3">{event.title}</h3>

                {event.description && (
                <p className="text-muted mb-4">
                    {event.description}
                </p>
                )}

                <div className="row g-3">
                <div className="col-md-4">
                    <strong>Fecha:</strong>
                    <p className="mb-0">{event.date}</p>
                </div>

                <div className="col-md-4">
                    <strong>Lugar:</strong>
                    <p className="mb-0">{event.location}</p>
                </div>

                <div className="col-md-4">
                    <strong>Ponente:</strong>
                    <p className="mb-0">{event.speaker || 'No registrado'}</p>
                </div>
                </div>

                <div className="d-flex gap-2 mt-4 flex-wrap">
                <Link to={`/events/edit/${event.id}`} className="btn btn-primary">
                    Editar evento
                </Link>
                <Link to="/events" className="btn btn-outline-secondary">
                    Volver
                </Link>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default EventDetail;
