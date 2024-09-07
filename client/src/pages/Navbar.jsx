import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Navbar = () => {

    const navigate = useNavigate("")

    const {user, setUser} = useContext(UserContext)

    const handleLogin = () => {
        navigate("/login")
    }

    const handleRegister = () => {
        navigate("/register")
    }

  return (
    <div>
        {
            user ? 
            <>
                <button>{user.rollNo}</button>
            </> : 
            <div>
                <button onClick={handleLogin}>Login</button>
            </div>
        }
      <button onClick={handleRegister}>register</button>
    </div>
  )
}

export default Navbar
