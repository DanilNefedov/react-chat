import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import img from '../../img/user-M.png'
import { updateUser } from '../../store/authSlice';
import style from './SideBar.module.css'

export function User() {

    const user = useSelector(state => state.user)
    // const db = getFirestore();
    // const dispatch = useDispatch()

    // useEffect (()=>{
    //     const unsub = onSnapshot(doc(db, "users", user.id), (doc) => {
    //         //console.log("Current data: ", doc.data());
    //         const data = doc.data()
    //         console.log(data)
    //         //const name = data.name
    //         const photo = data.photoURL
    //         //const email = data.email
    //         dispatch(updateUser({photo}))
    //     });
    //     return () => {
    //         unsub()
    //     }
    // }, [user.id])
    

    return (
        <div className={style.user}>
            <a href="#" >
                <img src={user.photo ? user.photo : img} alt="User" />
            </a>
        </div>
    );

}