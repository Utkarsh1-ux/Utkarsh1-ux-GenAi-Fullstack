import { Link } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import ThemeToggle from './ThemeToggle'
import '../styles/navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()

    if (!user) return null

    return (
        <nav className="navbar">
            <div className="navbar__brand">
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <span className="navbar__logo" style={{ 
                        fontWeight: '900', 
                        letterSpacing: '0.1em',
                        background: 'var(--primary-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.25rem',
                        textTransform: 'uppercase'
                    }}>INTERVIEW AI</span>
                </Link>
            </div>
            
            <div className="navbar__actions">
                <span className="navbar__greeting">ARIGATO {user.username.toUpperCase()}!</span>
                
                <ThemeToggle />
                
                <button className="navbar__logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
