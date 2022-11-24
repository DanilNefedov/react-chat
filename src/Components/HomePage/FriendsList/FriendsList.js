import React from 'react';
import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export function FriendsList(nameUser) {
    //console.log(friend)
    //const {id, name, lastMessages, userImg, date} = friend.friend
    const friend = useSelector(state => state.friend.friend)
    console.log(friend)
    return (
        <Link to='/' className={classNames(style.list, 'list-content')}>
            <div className={style.message}>
                <div className={classNames(style.user, 'user-mess')}>
                    <img src='/' alt="User" />
                </div>
                <div className={style.userMess}>
                    <p className={classNames(style.name, 'head-name')}>{nameUser}</p>
                    <p className={style.headMess}>lastMEss</p>
                </div>
            </div>
            <div className="list-date-check">
                <div className={classNames(style.date, 'list-date')}>
                    date
                </div>
            </div>
        </Link>
    );
}