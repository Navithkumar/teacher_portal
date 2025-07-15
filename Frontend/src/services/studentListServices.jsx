import axiosInstance from './axiosInstance';

export const studentList = async () => {
    const res = await axiosInstance.get('/list-student');
    return res.data;
};
