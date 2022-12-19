import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';



export function FriendsList({friend}) {

    const {id, name, lastMessages, date} = friend
    //const datePush = Object.fromEntries(friend.date)
    //console.log(datePush.toDate().toString())

    return (

        <Link to={id} className={classNames(style.list, 'list-content')}>
            <div className={style.message}>
                <div className={classNames(style.user, 'user-mess')}>
                    <img src='/' alt="User" />
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