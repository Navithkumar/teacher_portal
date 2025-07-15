import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/login',
                {
                    username,
                    password,
                },
            );
            if (response.data.status) {
                localStorage.setItem('token', response.data.data.access);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <h1 className="logo-text mb-4">
                <img className="logo" src={logo} alt="logo" />
            </h1>

            <div className="card p-4 shadow login-box">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Shivyadav_63"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="input-group-text">
                                <i className="bi bi-eye"></i>
                            </span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mb-3">
                        <a
                            href="#"
                            className="small text-decoration-none text-primary"
                        >
                            Forgot Password?
                        </a>
                    </div>

                    {error && (
                        <div className="alert alert-danger py-1">{error}</div>
                    )}

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
