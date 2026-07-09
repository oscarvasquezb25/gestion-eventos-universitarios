import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import ConfirmModal from '../components/ConfirmModal';
import { getEvents, deleteEvent } from '../services/eventService';

const EventsPage = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const loadEvents = async () => {
        try {
        setLoading(true);
        setAlert({ type: '', message: '' });
        const data = await getEvents();
        setEvents(Array.isArray(data) ? data : []);
        } catch (error) {
        console.error('Error al cargar eventos:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudieron cargar los eventos. Revisa json-server y db.json.'
        });
        setEvents([]);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const filteredEvents = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) return events;

        return events.filter((event) => {
        const title = event?.title?.toLowerCase() || '';
        const category = event?.category?.toLowerCase() || '';
        const location = event?.location?.toLowerCase() || '';
        const description = event?.description?.toLowerCase() || '';

        return (
            title.includes(query) ||
            category.includes(query) ||
            location.includes(query) ||
            description.includes(query)
        );
        });
    }, [events, search]);

    const handleDeleteClick = (eventId) => {
        setSelectedEventId(eventId);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
        await deleteEvent(selectedEventId);
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== selectedEventId)
        );
        setAlert({
            type: 'success',
            message: 'Evento eliminado correctamente.'
        });
        } catch (error) {
        console.error('Error eliminando evento:', error);
        setAlert({
            type: 'danger',
            message: 'No se pudo eliminar el evento.'
        });
        } finally {
        setShowModal(false);
        setSelectedEventId(null);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedEventId(null);
    };

    return (
        <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
            <h2 className="fw-bold mb-1">Eventos</h2>
            <p className="text-muted mb-0">
                Gestiona y visualiza los eventos universitarios.
            </p>
            </div>

            <Link to="/events/new" className="btn btn-success">
            + Nuevo evento
            </Link>
        </div>

        <div className="mb-4">
            <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por título, categoría, lugar o descripción..."
            />
        </div>

        <AlertMessage
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: '', message: '' })}
        />

        {loading ? (
            <Loading message="Cargando eventos..." />
        ) : (
            <div className="row g-4">
            {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                <div className="col-md-6 col-lg-4" key={event.id}>
                    <EventCard event={event} onDelete={handleDeleteClick} />
                </div>
                ))
            ) : (
                <div className="col-12">
                <div className="alert alert-warning text-center">
                    No se encontraron eventos con ese criterio de búsqueda.
                </div>
                </div>
            )}
            </div>
        )}

        <ConfirmModal
            show={showModal}
            title="Eliminar evento"
            message="¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer."
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
        />
        </div>
    );
};

export default EventsPage;
