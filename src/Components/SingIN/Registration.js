import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { Suspense, useState } from "react";
import { Loader } from "../Loader/Loader";
import React from "react";


const Form = React.lazy(() => import('./Form'))


export function Registration () {
    const dispatch = useDispatch()
    const [errorReg, setErrorReg] = useState(true)
    const [moduleErr, setModuleErr] = useState(false)

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
                    setModuleErr(true)
                    console.error(error)
                });
                goBack()
            })
            .catch(()=>{
                setErrorReg(false)
            })
        }catch(error){
            setModuleErr(true)
            console.error(error)
        }
        
    }   
    

    const formProps = {
        nameForm:'Registration',
        nameButton:'Register',
        link:'/login',
        nameLink:'Back to login',
        errorClass: errorReg ? '' : 'errorReg'
    }

    return (
        <Suspense fallback={<Loader></Loader>}>
            <Form moduleErr={moduleErr} setModuleErr={setModuleErr} setErrorReg={setErrorReg} formProps={formProps}  handleClick={handleRegister}></Form>
        </Suspense>
    )
}