import { Link, Navigate } from 'react-router';
import { useAuth } from '../features/auth/hooks/useAuth.js';
import './Welcome.scss';

const Welcome = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="welcome-page">
            <div className="welcome-content">
                <div className="icon-container">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 10 10H12V2Z" />
                        <path d="M12 12 2.1 7.1" />
                        <path d="m12 12 7.1-7.1" />
                    </svg>
                </div>
                <h1>Welcome to Interview Ai</h1>
                <p>Generate highly personalized, AI-driven interview guides based on your resume and target role. Ace your next technical interview with confidence.</p>
                
                <div className="actions">
                    <Link to="/register" className="button primary-button">Proceed to Register</Link>
                    <Link to="/login" className="button outline-button">Login to Existing Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
