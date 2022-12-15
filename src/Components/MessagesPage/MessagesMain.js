import { useParams } from 'react-router-dom';
import style from './MessagesMain.module.css';
import styleFriends from '../HomePage/Friends.module.css';
import classNames from 'classnames';
import dots from '../../img/dots.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addMessage, addMessagesOldFriend } from '../../store/messagesSlice'
import { useState } from 'react';
import { SendMessages } from './SendMessages';
import { MessagesFieldMe } from './MessagesFieldMe';
import { addLastMessage } from '../../store/friendSlice';
import { useEffect } from 'react';
import { arrayUnion, doc, getFirestore, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';


export function MessagesMain() {
    const friend = useSelector(state => state.friend.friend)
    const user = useSelector(state => state.user)
    //console.log(friend)


    const db = getFirestore()

    const [link] = Object.values(useParams())
    const infoChat = friend.find(el => el.id === link)


    //console.log(messagesState)

    //console.log(infoChat)

    const [messageText, setMessageText] = useState('');
    const sendMess = async () => {

        const messageId = uuid()
        const date = Timestamp.now()

        await updateDoc(doc(db, 'chats', infoChat.id), {
            messages: arrayUnion({
                id: messageId,
                messageText,
                userId: user.id,
                date: date
            })
        })

        await updateDoc(doc(db, 'chatsList', user.id), {
            [infoChat.id + '.lastMessage']: {
                messageText
            },
            [infoChat.id + '.date']: serverTimestamp()
        })


        await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
            [infoChat.id + '.lastMessage']: {
                messageText
            },
            [infoChat.id + '.date']: serverTimestamp()
        })

        setMessageText('')
    }

    return (
        <section className={styleFriends.friends}>
            <div className={classNames(style.container, 'container')}>
                <header className={style.header}>
                    <div className={style.user}>
                        <div className={style.userImg}>
                            <img src='/' alt="User" />
                            {/* {friendInfo.userImg} */}
                        </div>
                        <div className={style.about}>
                            <h2 className={style.name}>
                                {infoChat.name}
                            </h2>
                            <div className={style.online}>Online</div>
                        </div>

                    </div>
                    <div className={classNames(style.dots, 'search-dots')}>
                        <img src={dots} alt="Dots" />
                    </div>
                </header>

                <section id='scroll' className={style.messages}>

                    <MessagesFieldMe infoChat={infoChat}></MessagesFieldMe>

                </section>

                <SendMessages sendMess={sendMess} messageText={messageText} setMessageText={setMessageText} />
            </div>
        </section>
    );

}