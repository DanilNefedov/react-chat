import Form from "./Form";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
import { initialState, reducer } from "../../state/moduleError";


export function SingIn (){
    const [load, setLoad] = useState(true)
    const userState = useSelector(state => state.user)
    const [state, dispatchState] = useReducer(reducer, initialState)
    const [errorLog, setErrorLog] = useState(true)
    
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const goBack = () => navigate('/')
    

    const location = useLocation().pathname

    useEffect(() => {

        const auth = getAuth();
        const unsub = onAuthStateChanged(auth, (user)=>{
            
        if(user && location === '/login'){
            dispatch(setUser({
                name:user.displayName,
                email:user.email,
                id:user.uid,
                token:user.accessToken,
                photo: user.photoURL
            }))
            goBack()
            
        }else {
            navigate('/login')
        }
        setLoad(false)
        })
        
        return () =>{
            
            unsub()
        }
    }, [userState.id])
    


    const handleLogin = async ( email, password) =>{
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                dispatchState({type:'registrationErrorClassName', payload:'errorLog'})
                goBack()
                
            })
            .catch(()=>{
                dispatchState({type:'registrationErrorClassName', payload:''})
            })
        setLoad(false)
    }

    const formProps = {
        nameForm:'Login',
        nameButton:'Log in',
        link:'/registration',
        nameLink:'Create an account',
        errorClass: errorLog ? '' : 'errorLog'
    }
    return(
        <>
            {load ? <Loader/> : <Form handleClick={handleLogin} formProps={formProps}></Form>}
        </>
    )
}


