import { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { BsBookmarkCheck, BsJournalBookmark, BsPerson } from 'react-icons/bs';
const StudentModal = ({ show, handleClose, onSubmit, initialData = {} }) => {
    const subjects = {
        1: 'Maths',
        2: 'English',
        3: 'Hindi',
        4: 'Social',
        5: 'Physics',
    };
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        subject_name: '',
        marks: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                id: initialData.id || '',
                name: initialData.name || '',
                subject_name: initialData.subject_name || '',
                marks: initialData.marks || '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const submitForm = async () => {
        await onSubmit(formData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Body className="p-4">
                <h5 className="mb-4">
                    {formData.id ? 'Edit Student' : 'Add Student'}
                </h5>

                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <BsPerson />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <BsJournalBookmark />
                        </InputGroup.Text>
                        <Form.Select
                            name="subject_name"
                            value={formData.subject_name}
                            onChange={handleChange}
                        >
                            <option value="">Select subject</option>
                            {Object.entries(subjects).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </Form.Select>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Mark</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                            <BsBookmarkCheck />
                        </InputGroup.Text>
                        <Form.Control
                            type="number"
                            name="marks"
                            value={formData.marks}
                            onChange={handleChange}
                            placeholder="Enter mark"
                        />
                    </InputGroup>
                </Form.Group>

                <div className="text-center">
                    <Button onClick={submitForm} className="btn btn-dark w-50">
                        {formData.id ? 'Update' : 'Add'}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default StudentModal;
