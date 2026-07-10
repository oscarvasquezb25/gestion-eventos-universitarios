import api from './api';

export const getRegistrations = async () => {
    const response = await api.get('/registrations');
    return response.data;
};

export const getRegistrationById = async (id) => {
    const response = await api.get(`/registrations/${id}`);
    return response.data;
};

export const createRegistration = async (registrationData) => {
    const response = await api.post('/registrations', registrationData);
    return response.data;
};

export const updateRegistration = async (id, registrationData) => {
    const response = await api.put(`/registrations/${id}`, registrationData);
    return response.data;
};

export const deleteRegistration = async (id) => {
    const response = await api.delete(`/registrations/${id}`);
    return response.data;
};
