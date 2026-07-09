import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, onDelete }) => {
    return (
        <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
            <span className="badge bg-primary mb-2 align-self-start">
            {event.category}
            </span>

            <h5 className="card-title fw-bold">{event.title}</h5>

            <p className="card-text mb-1">
            <strong>Fecha:</strong> {event.date}
            </p>

            <p className="card-text mb-3">
            <strong>Lugar:</strong> {event.location}
            </p>

            <div className="mt-auto d-flex flex-wrap gap-2">
            <Link to={`/events/${event.id}`} className="btn btn-outline-primary btn-sm">
                Ver detalle
            </Link>

            <Link to={`/events/edit/${event.id}`} className="btn btn-outline-warning btn-sm">
                Editar
            </Link>

            <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => onDelete?.(event.id)}
            >
                Eliminar
            </button>
            </div>
        </div>
        </div>
    );
};

export default EventCard;