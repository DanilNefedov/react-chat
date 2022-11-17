import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {setUser} from '../../store/authSlice'

export function SingIn (){
    const dispatch = useDispatch();


    const handleLogin = (email, password) =>{
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(console.log)
            .catch(console.error)
    }
    
    const formProps = {
        nameForm:'Login',
        nameButton:'Log in',
        link:'/registration',
        nameLink:'Сreate an account'
    }
    return(
        <Form ></Form>
        // formProps={formProps} handleLogin={handleLogin}
    )
}