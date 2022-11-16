import { Form } from "./Form";

export function Registration () {

    const formProps = {
        nameForm:'Registration',
        nameButton:'Register',
        link:'/login',
        nameLink:'Back to login'
    }

    return (
        <Form formProps={formProps}></Form>
    )
}