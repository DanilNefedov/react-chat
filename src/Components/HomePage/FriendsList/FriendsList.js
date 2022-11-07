import React from 'react';
// import user from '../../../img/user-M.png';
import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';


export function FriendsList(friend) {
    const {id, name, lastMessages, userImg} = friend.friend

    //console.log(id)
    return (
        <Link to={id} className={classNames(style.list, 'list-content')}>
            <div className={style.message}>
                <div className={classNames(style.user, 'user-mess')}>
                    <img src={userImg} alt="User" />
                </div>
                <div className={style.userMess}>
                    <p className={classNames(style.name, 'head-name')}>{name}</p>
                    <p className="head-mess">{lastMessages}</p>
                </div>
            </div>
            <div className="list-date-check">
                <div className={classNames(style.date, 'list-date')}>
                    Today, 8:56pm
                </div>
            </div>
        </Link>
    );
}