import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin_home from './pages/Admin/Admin_home';
import Home from './pages/User/Home';
import Login from './pages/User/Login';
import Profile from './pages/User/Profile';
import Register from './pages/User/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin_panel" element={<Admin_home />} />
            </Routes>
        </Router>
    );
}

export default App;
