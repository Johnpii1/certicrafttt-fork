import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import './Auth.css';
import LoadingOverlay from './LoadingOverlay';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        instituteName: '',
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
            await authService.register(formData);
            setShowRedirectLoading(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="auth-modern-container">
            {showRedirectLoading && <LoadingOverlay />}
            <div className="auth-modern-card fade-in-up">
                
                {/* Left Side: Image & Branding */}
                <div className="auth-modern-left" style={{ backgroundImage: "url('/assets/auth-hero.png')" }}>
                    <div className="auth-modern-overlay">
                        <div className="overlay-text-box">
                            <h3>WHETHER YOU'RE PLANNING SMALL WORKSHOPS, BUSTLING CONFERENCES, OR MASSIVE ONLINE COURSES, YOUR EFFICIENCY STARTS HERE.</h3>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="auth-modern-right">
                    <div className="auth-modern-header">
                        <h2>JOIN CERTICRAFT AND AUTOMATE YOUR WORKFLOW</h2>
                        <p>Ready to empower your organization? Join the CertiCraft community today and unlock a world of seamless certificate management.</p>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-modern-form">
                        <div className="form-group-modern">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Input full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                                    minLength="6"
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
                        
                        <div className="form-group-modern">
                            <label>Institute Name (Optional)</label>
                            <input
                                type="text"
                                name="instituteName"
                                placeholder="University or Organization Name"
                                value={formData.instituteName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="auth-modern-actions">
                            <span className="terms-text">By creating an account, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</span>
                        </div>

                        <button type="submit" className="btn-modern-primary" disabled={loading}>
                            {loading ? 'Creating account...' : 'Register - Start your Journey'}
                        </button>
                    </form>

                    <div className="auth-modern-footer">
                        <p>Already have an account? <Link to="/login">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
