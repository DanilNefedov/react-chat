import { Exit } from "./Exit";
import { User } from "./User";
import style from './SideBar.module.css'
import { Navigation } from "./Navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { updateUser } from "../../store/authSlice";

export function SideBarMain() {
    const user = useSelector(state => state.user)
    //console.log(user)
    // const db = getFirestore();
    // const dispatch = useDispatch()


    // useEffect (()=>{
    //     const unsub = onSnapshot(doc(db, "users", user.id), (doc) => {
    //         //console.log("Current data: ", doc.data());
    //         const data = doc.data()
    //         //console.log(data)
    //        // const name = data.name
    //         const photo = data.photoURL
    //         //const email = data.email
    //         dispatch(updateUser({ photo}))
    //     });
    //     return () => {
    //         unsub()
    //     }
    // }, [user.photo])


    return (
        <section className={style.sidebar}>
            <div className="container">
                <User />
                <Navigation/>
                <Exit />
            </div>
        </section>
    );
}