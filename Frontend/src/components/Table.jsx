import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    studentCreate,
    studentDelete,
    studentUpdate,
} from '../services/studentListServices';
import StudentModal from './Modal';
import './table.css';

const TableComponent = ({ headers, data, setData }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    const subjects = {
        1: 'Maths',
        2: 'English',
        3: 'Hindi',
        4: 'Social',
        5: 'Physics',
    };

    const openModal = (student = null) => {
        setCurrentStudent(student);
        setShowModal(true);
    };
    const handleModalSubmit = async (formData) => {
        try {
            if (formData.id) {
                const res = await studentUpdate(formData.id, formData);
                setData((prev) =>
                    prev.map((item) =>
                        item.id === res.data.id ? res.data : item,
                    ),
                );
            } else {
                const res = await studentCreate(formData);
                setData((prev) => [...prev, res.data]);
            }
        } catch (error) {
            console.error('Student create/update failed:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('access');
                navigate('/login');
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await studentDelete(id);
            setData((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Student delete failed:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('access');
                navigate('/login');
            }
        }
    };

    return (
        <>
            <div className="table-container bg-light p-4 rounded mt-5">
                <table className="table custom-table align-middle">
                    <thead>
                        <tr>
                            {headers.map((header, idx) => (
                                <th key={idx}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx}>
                                <td className="d-flex align-items-center gap-2">
                                    <div className="avatar">
                                        {row.name.charAt(0)}
                                    </div>
                                    {row.name}
                                </td>
                                <td>{subjects[row.subject_name]}</td>
                                <td>{row.marks}</td>
                                <td>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-sm action-btn dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-chevron-down"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                        openModal(row)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item text-danger"
                                                    onClick={() =>
                                                        handleDelete(row.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    <button
                        className="btn btn-dark mt-3"
                        onClick={() => openModal()}
                    >
                        Add
                    </button>
                </div>
            </div>

            <StudentModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                onSubmit={handleModalSubmit}
                initialData={currentStudent}
            />
        </>
    );
};

export default TableComponent;
