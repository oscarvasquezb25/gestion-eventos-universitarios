import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light border-top mt-5 py-3">
        <div className="container text-center">
            <p className="mb-0 text-muted">
            © {new Date().getFullYear()} Gestión de Eventos Universitarios
            </p>
        </div>
        </footer>
    );
};

export default Footer;
