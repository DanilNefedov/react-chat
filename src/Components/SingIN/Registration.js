import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from '../../store/authSlice'
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";




export function Registration () {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const goBack = () => navigate('/login')

    const db = getFirestore()

    //const user2 = useSelector(state => state.user)


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
                        token:user.accessToken
                    }))
                    //console.log(user, user2)
                    await setDoc(doc(db, 'users', user.uid),{
                        name:user.displayName,
                        email:user.email,
                        id:user.uid
                    })
                    
                    await setDoc(doc(db, 'chatsList', user.uid),{})

                  }).catch((error) => {
                    console.error(error)
                });
                goBack()
            })
            .catch(console.error)
        }catch(err){
            console.error(err)
        }
        
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