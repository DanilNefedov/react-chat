import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import img from '../../../img/user-M.png'



export function FriendsList({friend}) {

    const {id, name, lastMessages, date, photo} = friend
    //console.log(friend)

    return (

        <Link to={id} className={classNames(style.list, 'list-content')}>
            <div className={style.message}>
                <div className={classNames(style.user, 'user-mess')}>
                    <img src={photo !== null ? photo : img} alt="User" />
                </div>
                <div className={style.userMess}>
                    <p className={classNames(style.name, 'head-name')}>{name}</p>
                    <p className={style.headMess}>{lastMessages === ''? 'No messages': lastMessages}</p>
                </div>
            </div>
            <div className="list-date-check">
                <div className={classNames(style.date, 'list-date')}>
                    {date}
                </div>
            </div>
        </Link>

    );
}