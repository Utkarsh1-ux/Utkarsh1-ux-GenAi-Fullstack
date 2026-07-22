
import {useNavigate , Link} from 'react-router'
import {useState} from 'react'
import { useAuth } from '../hooks/useAuth.js'
import Spinner from '../../../components/Spinner.jsx'
import ThemeToggle from '../../../components/ThemeToggle.jsx'

const Register = () => {

   const navigate = useNavigate();
   const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { loading , handleRegister } = useAuth()



 const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await handleRegister({username, email, password})
    if (res.success) {
        navigate('/dashboard')
    } else {
        setError(res.error)
    }
   }

   if(loading) {
    return <Spinner size="full" />
   }



  return (
     <main style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
            <ThemeToggle />
        </div>
        <div className="form-container">
            <h1>Register</h1>
            {error && <div className="error-banner">{error}</div>}

            <form onSubmit={handleSubmit}> 


                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                    onChange={(e) => {setUsername(e.target.value)}}
                    type = "text" id = "username" name = "username" placeholder = "Enter your username" />
                </div>


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
 
                <button className="button primary-button">Register</button>
            </form>

            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default  Register