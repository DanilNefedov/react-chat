import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";



export function Registration () {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const goBack = () => navigate(-1)


    const handleRegister = async ( email, password) =>{
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user)
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
        nameForm:'Registration',
        nameButton:'Register',
        link:'/login',//change to navigate
        nameLink:'Back to login'
    }

    return (
        <Form formProps={formProps}  handleClick={handleRegister}></Form>
    )
}