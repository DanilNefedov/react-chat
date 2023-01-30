import { Navigate, useLocation } from "react-router-dom"
import { Layout } from "../Layout/Layout"
import { useAuth } from "../../hooks/useAuth";
import { getAuth } from "firebase/auth";



export const ProtecteedRoute = () =>{
    const location = useLocation()

    const {isAuth} = useAuth()
    //const auth = getAuth();

    //console.log(auth)
    if (isAuth === undefined) {
        return null; // or loading spinner, etc
    }

    if(!isAuth){
       return <Navigate to='/login' state={{from:location}} replace={true} />
    }

    return <Layout/>
}

