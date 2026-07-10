import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onDelete }) => {
    return (
        <div className="card shadow-sm h-100 border-0">
        <div className="card-body d-flex flex-column">
            <div className="d-flex justify-content-between align-items-start mb-3">
            <span className="badge bg-primary">
                {event.category || 'Sin categoría'}
            </span>
            </div>

            <h5 className="card-title fw-bold mb-2">
            {event.title || 'Sin título'}
            </h5>

            <p className="text-muted mb-3 flex-grow-1">
            {event.description || 'Sin descripción disponible.'}
            </p>

            <div className="mb-3">
            <p className="mb-1">
                <strong>Fecha:</strong> {event.date || 'No asignada'}
            </p>
            <p className="mb-1">
                <strong>Lugar:</strong> {event.location || 'No asignado'}
            </p>
            <p className="mb-0">
                <strong>Ponente:</strong> {event.speaker || 'No registrado'}
            </p>
            </div>

            <div className="d-flex gap-2 mt-auto flex-wrap">
            <Link
                to={`/events/${event.id}`}
                className="btn btn-outline-primary btn-sm"
            >
                Ver
            </Link>

            <Link
                to={`/events/edit/${event.id}`}
                className="btn btn-outline-warning btn-sm"
            >
                Editar
            </Link>

            <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete(event.id)}
            >
                Eliminar
            </button>
            </div>
        </div>
        </div>
    );
};

export default EventCard;
