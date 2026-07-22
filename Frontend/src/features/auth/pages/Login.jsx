
import {useState} from 'react'
import {useNavigate , Link} from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth.js'

import '../auth.form.scss'
import Spinner from '../../../components/Spinner.jsx'
import ThemeToggle from '../../../components/ThemeToggle.jsx'
const Login = () => {

    const { loading ,handleLogin } = useAuth()
    const navigate = useNavigate()

    const [showSplash, setShowSplash] = useState(true);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await handleLogin({email, password}) 
    if (res.success) {
        navigate('/dashboard')
    } else {
        setError(res.error)
    }
   }




  return (
    <main style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {showSplash && (
            <div className="splash-overlay" onAnimationEnd={() => setShowSplash(false)}>
                <h1>WELCOME TO RESUME ANALYZER</h1>
            </div>
        )}
        <div className="login-floating-bg" style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'var(--primary-gradient)', opacity: 0.05, animation: 'rotateBg 30s linear infinite', zIndex: 0, pointerEvents: 'none' }}></div>
        <style>{`
            @keyframes rotateBg {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
            <ThemeToggle />
        </div>
        <div className="form-container">
            <h1>Login</h1>
            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit}> 


                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e) => {setEmail(e.target.value)}}
                     type = "text" id = "email" name = "email" placeholder = "Enter your email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={(e) => {setPassword(e.target.value)}}
                    type = "password" id = "password" name = "password" placeholder = "Enter your password" />
                </div>
 
                <button className="button primary-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

             <p>Dont
                 have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login