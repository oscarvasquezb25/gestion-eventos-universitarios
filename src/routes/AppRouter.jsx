import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import EventsPage from '../pages/EventsPage';
import EventDetail from '../pages/EventDetail';
import EventFormPage from '../pages/EventFormPage';
import ParticipantsPage from '../pages/ParticipantsPage';
import RegistrationPage from '../pages/RegistrationPage';

const NotFound = () => {
    return (
        <div className="container py-5 text-center">
        <h1 className="display-4 fw-bold">404</h1>
        <p className="lead text-muted">La página que buscas no existe.</p>
        </div>
    );
};

const AppRouter = () => {
    return (
        <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <main className="flex-grow-1">
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/new" element={<EventFormPage />} />
                <Route path="/events/edit/:id" element={<EventFormPage />} />
                <Route path="/events/:id" element={<EventDetail />} />

                <Route path="/participants" element={<ParticipantsPage />} />
                <Route path="/registration" element={<RegistrationPage />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            </main>

            <Footer />
        </div>
        </BrowserRouter>
    );
};

export default AppRouter;

