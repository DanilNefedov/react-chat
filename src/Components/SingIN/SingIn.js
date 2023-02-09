import Form from "./Form";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useEffect, useReducer } from "react";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
import { initialStateModule, reducerModule } from "../../state/moduleError";


export const ContextAuth = createContext({})


export function SingIn (){
    const [load, setLoad] = useState(true)
    const userState = useSelector(state => state.user)
    const [stateModal, dispatchState] = useReducer(reducerModule, initialStateModule)
    //const Context = createContext()
    //const [errorLog, setErrorLog] = useState(true)
    //console.log(stateModal)
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
                dispatchState({type:'registrationReset', payload:initialStateModule.registration})
                goBack()
                //console.log('w')
            })
            .catch(()=>{
                //console.log('n')
                dispatchState({type:'registrationErrorClassName', payload:'errorLog'})
            })
        setLoad(false)
    }

    const formProps = {
        nameForm:'Login',
        nameButton:'Log in',
        link:'/registration',
        nameLink:'Create an account',
        //errorClass: errorLog ? '' : 'errorLog'
    }
    return(
        <>
            {load ? <Loader/> : (
                <ContextAuth.Provider value={[stateModal, dispatchState]}>
                    <Form handleClick={handleLogin} formProps={formProps}></Form>
                </ContextAuth.Provider>
               
            )}
        </>
    )
}


