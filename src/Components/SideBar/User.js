import { useSelector } from 'react-redux';
import img from '../../img/user-M.png'
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