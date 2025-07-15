import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <nav className="navbar navbar-light bg-white shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
            <div className="navbar-brand m-0">
                <img src={logo} alt="tailwebs logo" className="logo-img" />
            </div>

            <div className="d-flex align-items-center gap-4">
                <a href="/home" className="nav-link fw-bold m-0">
                    Home
                </a>
                <button
                    onClick={handleLogout}
                    className="nav-link fw-bold m-0 btn btn-link p-0"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
