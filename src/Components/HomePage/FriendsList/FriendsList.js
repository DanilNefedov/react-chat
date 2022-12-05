import React, { useEffect, useState } from 'react';
import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { addFrined } from '../../../store/friendSlice';


export function FriendsList() {

    //const { id, name, userImg, date, lastMessages } = friends{ friends }
    // const myInfo = useSelector(state => state.user)
    // const db = getFirestore();
    // const [chats, setChats] = useState([])
    // const dispatch = useDispatch()
    // const friendList = useSelector(state => state.friend.friend)



    // useEffect(() => {
    //     const unsub = onSnapshot(doc(db, "chatsList", myInfo.id), (doc) => {
    //         const data = Object.entries(doc.data())
    //         setChats(data)
    //         data.map(el => {
    //             const combinedId = el[0]
    //             const find = friendList.find(el => el.id === combinedId)
    //             if (!find) {
    //                 dispatch(addFrined({ combinedId }))
    //             }

    //             console.log(data, combinedId)
    //         })
    //     });

    //     return () => {
    //         unsub()
    //     }

    // }, [myInfo.id])





    return (
        //<div className="cahts">
            //(chats.map(el =>{
                <Link to={232323} className={classNames(style.list, 'list-content')}>
                    <div className={style.message}>
                        <div className={classNames(style.user, 'user-mess')}>
                            <img src='/' alt="User" />
                        </div>
                        <div className={style.userMess}>
                            <p className={classNames(style.name, 'head-name')}>name</p>
                            <p className={style.headMess}>lastMEss</p>
                        </div>
                    </div>
                    <div className="list-date-check">
                        <div className={classNames(style.date, 'list-date')}>
                            date
                        </div>
                    </div>
                </Link>
            //}))
        //</div>
        
        
    );
}