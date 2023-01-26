import React from 'react';
import style from './Search.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import img from '../../img/user-M.png'
import { useSelector } from 'react-redux';



export function SearchList(friendList) {
    const { user, clickChat } = friendList
    const myInfo = useSelector(state => state.user)


    return (
        (user.map(el => (

            <div key={el.id} className={style.searchListName}>

                <Link to={myInfo.id > el.id ? myInfo.id + el.id : el.id + myInfo.id} onClick={() => {
                    clickChat(el)
                }} className={classNames(style.list)}>
                    <div className={classNames(style.user, 'user-mess')}>
                        <img src={el.photoURL ? el.photoURL : img} alt="User" />
                    </div>
                    <div className={style.userMess}>
                        <p className={classNames(style.name, 'head-name')}>{el.name}</p>
                    </div>
                </Link>


            </div>
        )))


    );
}