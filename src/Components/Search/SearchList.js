import React from 'react';
import style from './Search.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export function SearchList(friendList) {
    const {userName, userId, clickChat} = friendList
    // const friend = useSelector(state => state.friend.friend)
    // console.log(friend[0].id)


    return (
        <Link to={userId} onClick={() => {
                // clickLink()
                clickChat()
            }} className={classNames(style.list)}>
            <div className={classNames(style.user, 'user-mess')}>
                <img src='/' alt="User" />
            </div>
            <div className={style.userMess}>
                <p className={classNames(style.name, 'head-name')}>{userName}</p>
            </div>
        </Link>
    );
}