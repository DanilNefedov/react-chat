import React from 'react';
import user from '../../../img/user-M.png';
import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export function FriendsList(props) {
    const {id, name, message} = props;

    return (
        <Link to={id} className={classNames(style.list, 'list-content')}>
            <div className={style.message}>
                <div className={classNames(style.user, 'user-mess')}>
                    <img src={user} alt="User" />
                </div>
                <div className={style.userMess}>
                    <p className={classNames(style.name, 'head-name')}>{name}</p>
                    <p className="head-mess">{message}</p>
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