import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { createContext, Suspense, useReducer, useState } from "react";
import { Loader } from "../Loader/Loader";
import React from "react";
import { initialStateModule, reducerModule } from "../../state/moduleError";

export const ContextRegistration = createContext({})

const Form = React.lazy(() => import('./Form'))


export function Registration () {
    const dispatch = useDispatch()
    const [stateModule, dispatchModule] = useReducer(reducerModule, initialStateModule)
    const [errorReg, setErrorReg] = useState(true)
    const [moduleErr, setModuleErr] = useState(false)
    //console.log(stateModule)

    const navigate = useNavigate()

    const goBack = () => navigate('/login')

    const db = getFirestore()



    const handleRegister = async (nameUser, email, password) =>{
        const auth = getAuth();
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                updateProfile(auth.currentUser, {
                    displayName: nameUser
                }).then( async () => {
                    dispatch(setUser({
                        name:user.displayName,
                        email:user.email,
                        id:user.uid,
                        token:user.accessToken,
                        photo:null
                    }))
                    await setDoc(doc(db, 'users', user.uid),{
                        name:user.displayName,
                        email:user.email,
                        id:user.uid,
                        photoURL:null
                    })
                    
                    await setDoc(doc(db, 'chatsList', user.uid),{})

                  }).catch((error) => {
                    //setModuleErr(true)
                    dispatchModule({type:'registrationActiveModalWindow', payload:true})
                    console.error(error)
                });
                goBack()
                dispatchModule({type:'registrationErrorClassName', payload:''})
            })
            .catch(()=>{
                dispatchModule({type:'registrationErrorClassName', payload:'errorReg'})
                //setErrorReg(false)
            })
        }catch(error){
            dispatchModule({type:'registrationActiveModalWindow', payload:true})
            //setModuleErr(true)
            console.error(error)
        }
        
    }   
    

    const formProps = {
        nameForm:'Registration',
        nameButton:'Register',
        link:'/login',
        nameLink:'Back to login',
        //errorClass: errorReg ? '' : 'errorReg'
    }

    return (
        <Suspense fallback={<Loader></Loader>}>
            <ContextRegistration.Provider value={[stateModule, dispatchModule]}>
                <Form formProps={formProps}  handleClick={handleRegister}></Form>
            </ContextRegistration.Provider>
        </Suspense>
    )
}