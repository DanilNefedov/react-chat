import { Navigate, useLocation } from "react-router-dom"
import { Layout } from "../Layout/Layout"


export const ProtecteedRoute = () =>{
    const location = useLocation()

    const user = false

    if(!user){
        return <Navigate to='/login' state={{from:location}}/>
    }

    return <Layout/>
}