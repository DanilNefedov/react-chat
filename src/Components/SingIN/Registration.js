import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";





export function Registration () {
    const dispatch = useDispatch()
    const [errorReg, setErrorReg] = useState(true)
    const [moduleErr, setModuleErr] = useState(true)

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
                    //console.log(user, user2)
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
                // console.error(err)
            })
        }catch(error){
            setModuleErr(true)
            console.error(error)
        }
        
    }   
    

    const formProps = {
        nameForm:'Registration',
        nameButton:'Register',
        link:'/login',//change to navigate
        nameLink:'Back to login',
        errorClass: errorReg ? '' : 'errorReg'
    }

    return (
        <Form moduleErr={moduleErr} setModuleErr={setModuleErr} setErrorReg={setErrorReg} formProps={formProps}  handleClick={handleRegister}></Form>
    )
}