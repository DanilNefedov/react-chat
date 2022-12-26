import React from 'react';
import style from './Search.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import img from '../../img/user-M.png'



export function SearchList(friendList) {
    const {userName, userId, clickChat, photo} = friendList
    // console.log(friend[0].id)


    return (
        <Link to={userId} onClick={() => clickChat()} className={classNames(style.list)}>
            <div className={classNames(style.user, 'user-mess')}>
                <img src={photo ? photo : img} alt="User" />
            </div>
            <div className={style.userMess}>
                <p className={classNames(style.name, 'head-name')}>{userName}</p>
            </div>
        </Link>
    );
}