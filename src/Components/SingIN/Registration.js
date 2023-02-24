import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { Suspense, useReducer } from "react";
import { Loader } from "../Loader/Loader";
import React from "react";
import { initialStateModal, reducerModal } from "../../state/modalError";

const Form = React.lazy(() => import('./Form'))


export function Registration () {
    const dispatch = useDispatch()
    const [stateModal, dispatchModal] = useReducer(reducerModal, initialStateModal)
    const navigate = useNavigate()
    const goBack = () => navigate('/login')
    const db = getFirestore()


    const handleRegister = async (nameUser, email, password) =>{
        const nameUserReg = nameUser.trim()
        const auth = getAuth();
        
        if(nameUserReg.length > 20 || nameUserReg.length <= 0){
            dispatchModal({type:'errorClassName', payload:'errorReg'})
            return
        }
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                updateProfile(auth.currentUser, {
                    displayName: nameUserReg
                }).then( async () => {
                    dispatch(setUser({
                        name:user.displayName,
                        email:user.email,
                        id:user.uid,
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
                    dispatchModal({type:'activeModalWindow', payload:true})
                    console.error(error)
                });
                goBack()
                dispatchModal({type:'resetModal', payload:initialStateModal})
            })
            .catch(()=>{
                dispatchModal({type:'errorClassName', payload:'errorReg'})
            })
        }catch(error){
            console.error(error)
        }
    }   
    

    const formProps = {
        nameForm:'Registration',
        nameButton:'Register',
        link:'/login',
        nameLink:'Back to login'
    }

    return (
        <Suspense fallback={<Loader></Loader>}>
            <Form state={[stateModal, dispatchModal]} formProps={formProps} handleClick={handleRegister}></Form>
        </Suspense>
    )
}