import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'username@gmail.com' && password === 'Faroinvesting123') {
            handleLogin(); 
            navigate('/assets'); 
        } else {
            alert('Incorrect email or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h1 className="login-title">Faro Investing</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                    <button type="submit" className="login-button">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
