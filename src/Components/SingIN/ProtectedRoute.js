import { Navigate, useLocation } from "react-router-dom"
import { Layout } from "../Layout/Layout"
import { useAuth } from "../../hooks/useAuth";


//const Layout = lazy(() => import("../Layout/Layout"))

export const ProtecteedRoute = () =>{
    const location = useLocation()

    const {isAuth} = useAuth()
    //console.log(isAuth)

    if(!isAuth){
       return <Navigate to='/login' state={{from:location}}/>
    }

    return <Layout/>
}

