import { Form } from "./Form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";

export function SingIn (){
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const goBack = () => navigate(-1)

    const handleLogin = async (email, password) =>{
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                //console.log(user)
                dispatch(setUser({
                    email:user.email,
                    id:user.uid,
                    token:user.accessToken
                }))
                goBack()
            })
            .catch(console.error)
    }
    
    const formProps = {
        nameForm:'Login',
        nameButton:'Log in',
        link:'/registration',
        nameLink:'Сreate an account'
    }
    return(
        <Form handleClick={handleLogin} formProps={formProps}></Form>

    )
}