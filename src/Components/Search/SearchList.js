import React from 'react';
import style from './Search.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export function SearchList(friendList) {
    //console.log(friend)
    const {userName, userId, clickLink} = friendList
    //const friend = useSelector(state => state.friend.friend)
   // console.log(friendList)
    return (
        <Link to={userId} onClick={() => clickLink()} className={classNames(style.list)}>
            <div className={classNames(style.user, 'user-mess')}>
                <img src='/' alt="User" />
            </div>
            <div className={style.userMess}>
                <p className={classNames(style.name, 'head-name')}>{userName}</p>
            </div>
        </Link>
    );
}