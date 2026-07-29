import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, onUpdate, showToast }) => {
    const user = authService.getCurrentUser();
    const [activeSection, setActiveSection] = useState('profile'); // 'profile', 'password', or 'email'
    const [profileData, setProfileData] = useState({
        fullName: user?.fullName || '',
        instituteName: user?.instituteName || '',
    });
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [emailData, setEmailData] = useState({
        smtpUser: user?.smtpUser || '',
        smtpPassword: '',
        fromEmail: user?.fromEmail || '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const currentUser = authService.getCurrentUser();
            setProfileData({
                fullName: currentUser?.fullName || '',
                instituteName: currentUser?.instituteName || '',
            });
            setEmailData({
                smtpUser: currentUser?.smtpUser || '',
                smtpPassword: currentUser?.hasSmtpKey ? '********' : '',
                fromEmail: currentUser?.fromEmail || '',
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.updateSettings(profileData);
            showToast('Profile updated successfully!', 'success');
            onUpdate();
        } catch (error) {
            showToast(error.response?.data?.error || 'Failed to update profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showToast('New passwords do not match', 'error');
            return;
        }
        setLoading(true);
        try {
            await authService.changePassword({
                newPassword: passwordData.newPassword,
            });
            showToast('Password changed successfully!', 'success');
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } catch (error) {
            showToast(error.response?.data?.error || 'Failed to change password', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.updateSettings({
                // Hardcode Brevo Host and Port to exactly match .env
                smtpHost: emailData.smtpUser ? 'smtp-relay.brevo.com' : '',
                smtpPort: emailData.smtpUser ? '2525' : '',
                smtpUser: emailData.smtpUser.trim(),
                smtpPassword: emailData.smtpPassword.trim(),
                fromEmail: emailData.fromEmail.trim(),
            });
            showToast('Email settings updated successfully!', 'success');
            onUpdate();
        } catch (error) {
            showToast(error.response?.data?.error || 'Failed to update email settings', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-modal-overlay" onClick={onClose}>
            <div className="settings-modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="settings-modal-header">
                    <div className="header-title">
                        <i className="fa-solid fa-gear"></i>
                        <h2>Account Settings</h2>
                    </div>
                    <button className="close-settings-btn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="settings-container">
                    <aside className="settings-sidebar">
                        <button
                            className={`sidebar-item ${activeSection === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveSection('profile')}
                        >
                            <i className="fa-solid fa-user"></i>
                            <span>Profile</span>
                        </button>
                        <button
                            className={`sidebar-item ${activeSection === 'email' ? 'active' : ''}`}
                            onClick={() => setActiveSection('email')}
                        >
                            <i className="fa-solid fa-envelope"></i>
                            <span>Email Setup</span>
                        </button>
                        <button
                            className={`sidebar-item ${activeSection === 'password' ? 'active' : ''}`}
                            onClick={() => setActiveSection('password')}
                        >
                            <i className="fa-solid fa-lock"></i>
                            <span>Password</span>
                        </button>
                    </aside>

                    <main className="settings-main">
                        {activeSection === 'profile' && (
                            <div className="settings-section animate-fade-in">
                                <h3>Personal Information</h3>
                                <p className="section-desc">Update your name and institutional details.</p>

                                <form onSubmit={handleProfileSubmit}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <div className="input-with-icon">
                                            <i className="fa-solid fa-user-pen"></i>
                                            <input
                                                type="text"
                                                value={profileData.fullName}
                                                onChange={e => setProfileData({ ...profileData, fullName: e.target.value })}
                                                placeholder="Enter your name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <div className="input-with-icon">
                                            <i className="fa-solid fa-envelope"></i>
                                            <input type="text" value={user?.email} disabled className="input-disabled" />
                                        </div>
                                        <small>Email cannot be changed</small>
                                    </div>

                                    <div className="form-group">
                                        <label>Institute Name</label>
                                        <div className="input-with-icon">
                                            <i className="fa-solid fa-building-columns"></i>
                                            <input
                                                type="text"
                                                value={profileData.instituteName}
                                                onChange={e => setProfileData({ ...profileData, instituteName: e.target.value })}
                                                placeholder="School/University Name"
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="save-settings-btn" disabled={loading}>
                                        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Save Changes'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeSection === 'email' && (
                            <div className="settings-section animate-fade-in" style={{ overflowY: 'auto', maxHeight: '60vh' }}>
                                <h3>Brevo SMTP Configuration</h3>
                                <p className="section-desc">Configure your Brevo SMTP settings. Leave completely blank to use the system default.</p>

                                <form onSubmit={handleEmailSubmit}>
                                    <div className="form-group">
                                        <label>Brevo SMTP Username (Email / Login ID)</label>
                                        <div className="input-with-icon">
                                            <i className="fa-solid fa-user"></i>
                                            <input
                                                type="text"
                                                value={emailData.smtpUser}
                                                onChange={e => setEmailData({ ...emailData, smtpUser: e.target.value })}
                                                placeholder="e.g. johndoe@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Brevo SMTP Password (API Key)</label>
                                        <div className="input-with-icon">
                                            <i className="fa-solid fa-key"></i>
                                            <input
                                                type="password"
                                                value={emailData.smtpPassword}
                                                onChange={e => setEmailData({ ...emailData, smtpPassword: e.target.value })}
                                                placeholder="xsmtpsib-..."
                                            />
                                        </div>
                                        <small>Password is securely encrypted in the database.</small>
                                    </div>

                                    <div className="form-group">
                                        <label>From Email Address</label>
                                        <div className="input-with-icon">
                                            <i className="fa-solid fa-at"></i>
                                            <input
                                                type="email"
                                                value={emailData.fromEmail}
                                                onChange={e => setEmailData({ ...emailData, fromEmail: e.target.value })}
                                                placeholder="e.g. certificates@yourdomain.com"
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="save-settings-btn" disabled={loading}>
                                        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Save Brevo Settings'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeSection === 'password' && (
                            <div className="settings-section animate-fade-in">
                                <h3>Security</h3>
                                <p className="section-desc">Change your password to keep your account secure.</p>

                                <form onSubmit={handlePasswordSubmit}>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <div className="input-with-icon">
                                            <i className="fa-solid fa-key"></i>
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                placeholder="Enter new password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <div className="input-with-icon">
                                            <i className="fa-solid fa-check-double"></i>
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                placeholder="Confirm new password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="save-settings-btn" disabled={loading}>
                                        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Update Password'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
