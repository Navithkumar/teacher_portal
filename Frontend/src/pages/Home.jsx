import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../components/navbar.css';
import TableComponent from '../components/Table';
import { studentList } from '../services/studentListServices';

function Home() {
    const headers = ['Name', 'Subject', 'Mark', 'Action'];
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentListData = await studentList();
                setUserData(studentListData.data);
            } catch (error) {
                console.error('Sidebar fetch failed:', error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('access');
                    navigate('/login');
                }
            }
        };
        fetchData();
    }, [navigate]);
    const handleAction = (row) => {
        alert(`Clicked on ${row.name}`);
    };
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <TableComponent
                    headers={headers}
                    data={userData}
                    onAction={handleAction}
                />
                ;
            </div>
        </>
    );
}

export default Home;
