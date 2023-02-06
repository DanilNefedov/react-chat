import { useSelector } from 'react-redux';
import img from '../../img/user-M.png'
import classNames from "classnames";
import style from './UserNavigation.module.css'
import { Link } from 'react-router-dom';


export function User() {

    const user = useSelector(state => state.user)
    
    return (
        <div className={style.user}>
            <p className={classNames(style.nameUser, 'user-name')}>{user.name ? user.name : 'Deleted'}</p>
            <Link to="/profile" >
                <img src={user.photo ? user.photo : img} alt="User"  className={classNames(style.photoUser, 'photo-user')}/>
            </Link>
        </div>
    );

}