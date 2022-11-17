import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

export function Registration () {
    const dispatch =useDispatch()

    const handleRegister = ( email, password) =>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(console.log)
            .catch(console.error)
    }   


    const formProps = {
        nameForm:'Registration',
        nameButton:'Register',
        link:'/login',
        nameLink:'Back to login'
    }
    //console.log(handleLogin)formProps={formProps}
    return (
        <Form  handleClick={handleRegister}></Form>
    )
}