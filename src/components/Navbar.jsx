import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
            Gestión de Eventos
            </Link>

            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Alternar navegación"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                <NavLink
                    className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                    }
                    to="/"
                >
                    Inicio
                </NavLink>
                </li>

                <li className="nav-item">
                <NavLink
                    className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                    }
                    to="/events"
                >
                    Eventos
                </NavLink>
                </li>

                <li className="nav-item">
                <NavLink
                    className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                    }
                    to="/participants"
                >
                    Participantes
                </NavLink>
                </li>

                <li className="nav-item">
                <NavLink
                    className={({ isActive }) =>
                    `nav-link ${isActive ? 'active fw-semibold' : ''}`
                    }
                    to="/registration"
                >
                    Inscripción
                </NavLink>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;
