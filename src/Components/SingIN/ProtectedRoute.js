import { Navigate, useLocation } from "react-router-dom"
import { Layout } from "../Layout/Layout"
import { useAuth } from "../../hooks/useAuth";



export const ProtecteedRoute = () =>{
    const location = useLocation()

    const {isAuth} = useAuth()

    if (isAuth === undefined) {
        return null; 
    }

    if(!isAuth){
       return <Navigate to='/login' state={{from:location}} replace={true} />
    }

    return <Layout/>
}

