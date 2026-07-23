import {useAuth} from "../hooks/useAuth.js";
import { Navigate, useLocation } from "react-router";
import Navbar from "../../../components/Navbar";

import Spinner from "../../../components/Spinner.jsx";

const Protected = ({children}) => {

    const {loading, user} = useAuth()
    const location = useLocation()

    if(loading) {
        return <Spinner size="full" />
    }
    if(!user) {
        return <Navigate to={"/login"} />
    }   

    const showNavbar = location.pathname.includes('/dashboard')

  return (
      <>
          {showNavbar && <Navbar />}
          {children}
      </>
  )
}

export default Protected
