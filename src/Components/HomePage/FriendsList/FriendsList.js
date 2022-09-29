import React from 'react';
import user from '../../../img/user-M.png';
import style from './FriendsList.module.css';
import classNames from 'classnames';

export function FriendsList() {
    return (
        <div className={classNames(style.list, 'list-content')}>
            <div className={style.message}>
                <div className={classNames(style.user, 'user-mess')}>
                    <img src={user} alt="User" />
                </div>
                <div className={style.userMess}>
                    <p className={classNames(style.name, 'head-name')}>Raghav</p>
                    <p className="head-mess">Dinner?</p>
                </div>
            </div>
            <div className="list-date-check">
                <div className={classNames(style.date, 'list-date')}>
                    Today, 8:56pm
                </div>
            </div>
        </div>
    );
}