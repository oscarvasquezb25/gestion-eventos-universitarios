import api from './api';

export const getParticipants = async () => {
    const response = await api.get('/participants');
    return response.data;
};

export const getParticipantById = async (id) => {
    const response = await api.get(`/participants/${id}`);
    return response.data;
};

export const createParticipant = async (participantData) => {
    const response = await api.post('/participants', participantData);
    return response.data;
};

export const updateParticipant = async (id, participantData) => {
    const response = await api.put(`/participants/${id}`, participantData);
    return response.data;
};

export const deleteParticipant = async (id) => {
    const response = await api.delete(`/participants/${id}`);
    return response.data;
};
