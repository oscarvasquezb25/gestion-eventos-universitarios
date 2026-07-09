import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container py-5">
        <div className="row align-items-center">
            <div className="col-lg-7">
            <h1 className="display-5 fw-bold mb-3">
                Plataforma de Gestión de Eventos Universitarios
            </h1>
            <p className="lead text-muted mb-4">
                Administra conferencias, talleres, seminarios y actividades académicas
                de manera moderna, intuitiva y eficiente.
            </p>

            <div className="d-flex gap-3 flex-wrap">
                <Link to="/events" className="btn btn-primary btn-lg">
                Ver eventos
                </Link>
                <Link to="/events" className="btn btn-outline-primary btn-lg">
                Gestionar eventos
                </Link>
            </div>
            </div>

            <div className="col-lg-5 mt-4 mt-lg-0">
            <div className="card shadow border-0">
                <div className="card-body p-4">
                <h5 className="card-title fw-bold">Características del sistema</h5>
                <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item">Registro de eventos</li>
                    <li className="list-group-item">Búsqueda y actualización</li>
                    <li className="list-group-item">Gestión de participantes</li>
                    <li className="list-group-item">Inscripción a eventos</li>
                    <li className="list-group-item">Interfaz responsive</li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Home;
