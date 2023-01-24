import React from 'react';
import style from './Search.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import img from '../../img/user-M.png'
import { Empty } from '../Empty/Empty';
import { useSelector } from 'react-redux';



export function SearchList(friendList) {
    const {user, clickChat} = friendList
    // console.log(user)
    const myInfo = useSelector(state => state.user)


    return (
        (user.map(el => (
            //console.log(el.photoURL)
            <div key={el.id} className={style.searchListName}>
                {/* <div className={style.searchCont}> */}
                    {/* <h2 className='header'>Search List</h2> */}

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
                    
                {/* </div> */}
            </div>
        )))
        
       
    );
}