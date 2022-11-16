import {useSelector} from 'react-redux'

export function useAuth (){
    const {email, token, id} = useSelector(state => state.user)

    // console.log(email, token, id)

    return{
        isAuth: !!email, 
        email,
        token,
        id
    };
}