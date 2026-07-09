import api from './api';

export const getRegistrations = async () => {
    const response = await api.get('/registrations');
    return response.data;
};

export const createRegistration = async (registrationData) => {
    const response = await api.post('/registrations', registrationData);
    return response.data;
};

export const deleteRegistration = async (id) => {
    const response = await api.delete(`/registrations/${id}`);
    return response.data;
};
