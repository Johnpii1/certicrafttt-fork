import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import './Auth.css';
import LoadingOverlay from './LoadingOverlay';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showRedirectLoading, setShowRedirectLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(formData);
            setShowRedirectLoading(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const backendUrl = window.location.hostname.includes('render.com')
            ? 'https://certicraft-backendd.onrender.com'
            : 'http://localhost:8080';
        window.location.href = `${backendUrl}/auth/google`;
    };

    return (
        <div className="auth-modern-container">
            {showRedirectLoading && <LoadingOverlay />}
            <div className="auth-modern-card fade-in-up">
                
                {/* Left Side: Image & Branding */}
                <div className="auth-modern-left" style={{ backgroundImage: "url('/assets/auth-hero.png')" }}>
                    <div className="auth-modern-overlay">
                        <div className="overlay-text-box">
                            <h3>EXCLUSIVE FEATURES:</h3>
                            <p>Be the first to experience our automated dispatch system.</p>
                            
                            <h3>PERSONALIZED TEMPLATES:</h3>
                            <p>Get certificate suggestions tailored to your events.</p>
                            
                            <h3>SEAMLESS EXPERIENCE:</h3>
                            <p>Save your details for faster, more convenient generation.</p>
                            
                            <h3>24/7 DEDICATED SUPPORT:</h3>
                            <p>Enjoy peace of mind with our dedicated support team.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="auth-modern-right">
                    <div className="auth-modern-header">
                        <h2>YOUR GATEWAY TO SEAMLESS CERTIFICATES</h2>
                        <p>Ready to streamline your workflow? Log in now and let CertiCraft take you there. Your next event is just a click away!</p>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-modern-form">
                        <div className="form-group-modern">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Input email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group-modern">
                            <label>Password</label>
                            <div className="password-wrapper-modern">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-modern"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="auth-modern-actions">
                            <span className="new-user-text">New to CertiCraft? <Link to="/register">Create an Account</Link></span>
                            <div className="auth-modern-row">
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#" className="forgot-password">Forgot your password?</a>
                            </div>
                        </div>

                        <button type="submit" className="btn-modern-primary" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login - Continue Working'}
                        </button>
                    </form>

                    <div className="modern-divider">
                        <span>Or</span>
                    </div>

                    <button onClick={handleGoogleLogin} className="btn-modern-sso google">
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" height="18" />
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
