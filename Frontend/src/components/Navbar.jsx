import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import '../styles/navbar.scss'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    }

    if (!user) return null

    return (
        <nav className="navbar">
            <div className="navbar__brand">
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                    <span className="navbar__logo">GenAI</span>
                </Link>
            </div>
            
            <div className="navbar__actions">
                <span className="navbar__greeting">ARIGATO {user.username}</span>
                
                <button className="navbar__theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
                
                <button className="navbar__logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default Navbar
