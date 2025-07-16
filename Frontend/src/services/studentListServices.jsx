import axiosInstance from './axiosInstance';

export const studentList = async () => {
    const res = await axiosInstance.get('/list-student');
    return res.data;
};

export const studentUpdate = async (id, payload) => {
    const res = await axiosInstance.patch(`/update-student/${id}`, payload);
    return res.data;
};

export const studentCreate = async (payload) => {
    const res = await axiosInstance.post(`/create-student`, payload);
    return res.data;
};

export const studentDelete = async (id) => {
    const res = await axiosInstance.delete(`/delete-student/${id}`);
    return res.data;
};
