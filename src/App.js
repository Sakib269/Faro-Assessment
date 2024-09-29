import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import AssetList from './assets';
import ProtectedRoute from './protectedroute';

function App() {

    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<Login handleLogin={handleLogin} />} />
                
                {/* Protected Route */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/assets" element={<AssetList onLogout={handleLogout} />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
