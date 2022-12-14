import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function SingIn (){
    const userState = useSelector(state => state.user)
    
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const goBack = () => navigate('/')

    const location = useLocation().pathname

    const handleLogin = async ( email, password) =>{
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                goBack()
              
            })
            .catch(console.error)
    }
    

    useEffect(() => {
        const auth = getAuth();
        const unsub = onAuthStateChanged(auth, (user)=>{
            
            if(user && location === '/login'){
                //console.log(user)
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
        })
        return () =>{
            unsub()
        }
    }, [userState.id])
    
    //console.log(userState)
    const formProps = {
        nameForm:'Login',
        nameButton:'Log in',
        link:'/registration',
        nameLink:'Create an account'
    }
    return(
        <Form handleClick={handleLogin} formProps={formProps}></Form>

    )
}


