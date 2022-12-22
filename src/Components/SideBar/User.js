import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import img from '../../img/user-M.png'
import { updateUser } from '../../store/authSlice';
import style from './SideBar.module.css'

export function User() {

    const user = useSelector(state => state.user)
    
    return (
        <div className={style.user}>
            <a href="#" >
                <img src={user.photo ? user.photo : img} alt="User" />
            </a>
        </div>
    );

}