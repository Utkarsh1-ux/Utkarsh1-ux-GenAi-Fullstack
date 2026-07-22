import {useAuth} from "../hooks/useAuth.js";
import { Navigate } from "react-router";
import Navbar from "../../../components/Navbar";

import Spinner from "../../../components/Spinner.jsx";

const Protected = ({children}) => {

    const {loading, user} = useAuth()

    if(loading) {
        return <Spinner size="full" />
    }
    if(!user) {
        return <Navigate to={"/login"} />
    }   

  return (
      <>
          <Navbar />
          {children}
      </>
  )
}

export default Protected
