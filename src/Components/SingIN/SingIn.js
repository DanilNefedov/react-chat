import { Form } from "./Form";


export function SingIn (){
    
    const formProps = {
        nameForm:'Login',
        nameButton:'Log in',
        link:'/registration',
        nameLink:'Сreate an account'
    }
    return(
        <Form formProps={formProps}></Form>
    )
}