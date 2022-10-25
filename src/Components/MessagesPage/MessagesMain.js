import { useParams } from 'react-router-dom';
import style from './MessagesMain.module.css';
import styleFriends from '../HomePage/Friends.module.css';
import classNames from 'classnames';
import user from '../../img/user-M.png';
import dots from '../../img/dots.svg';
import send from '../../img/send.svg';
// import { MessagesFieldMe } from './MessagesFieldMe';
// import { MessagesFieldFriend } from './MessagesFieldFriend';
// import { useEffect } from 'react';
// import { newMessage } from '../../State';
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {addMessage} from '../../store/messagesSlice'


export function MessagesMain() {
    const friendState = useSelector(state => state.friend.friend)
    const messagesState = useSelector(state => state.message.messages)
    const dispatch = useDispatch()
    const addMessageTask = () => dispatch(addMessage())
    let userPage

    const [link] = Object.values(useParams())
    friendState.forEach(el => {
        if(el.id === link){
            userPage = el
        }
    })
    //console.log(userPage)

    
    return (
        <section className={styleFriends.friends}>
            <div className={classNames(style.container, 'container')}>
                <header className={style.header}>
                    <div className={style.user}>
                        <div className={style.userImg}>
                            <img src={user} alt="User" />
                        </div>
                        <div className={style.about}>
                            <h2 className={style.name}>
                                {userPage.name}
                            </h2>
                            <div className={style.online}>Online</div>
                        </div>

                    </div>
                    <div className={classNames(style.dots, 'search-dots')}>
                        <img src={dots} alt="Dots" />
                    </div>
                </header>

                <section id='scroll' className={style.messages}>
                    Messages
                </section>


                <section className={style.textArea}>

                    <textarea name="textarea" id='textarea' className={style.input} rows="1"></textarea>

                    <button type='submit' className={style.send}>
                        <img src={send} alt="Send" />
                    </button>
                </section>
            </div>
        </section>
    );

}