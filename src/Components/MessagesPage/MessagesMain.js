import { useParams } from 'react-router-dom';
import style from './MessagesMain.module.css';
import styleFriends from '../HomePage/Friends.module.css';
import classNames from 'classnames';
import dots from '../../img/dots.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { SendMessages } from './SendMessages';
import { MessagesFieldMe } from './MessagesFieldMe';
import { arrayUnion, doc, getDoc, getFirestore, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import img from '../../img/user-M.png'
import { useEffect } from 'react';
import { updatePhotoName } from '../../store/friendSlice';
import { addMessage } from '../../store/messagesSlice';


export function MessagesMain() {
    const friend = useSelector(state => state.friend.friend)
    const user = useSelector(state => state.user)
    console.log(friend)


    const db = getFirestore()

    const [link] = Object.values(useParams())
    const infoChat = friend.find(el => el.id === link)


    const dispatch = useDispatch()

    console.log(infoChat)

    //console.log(infoChat)

    const [text, setMessageText] = useState('');
    const sendMess = async () => {
        const messageText = text
        setMessageText('')

        if(messageText !== ''){
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
            
            const res = await getDoc(doc(db, 'chatsList', infoChat.friendId))
            
            if(res.exists()){
                await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
                    [infoChat.id + '.lastMessage']: {
                        messageText
                    },
                    [infoChat.id + '.date']: serverTimestamp()
                })
            }
            

        }
        
    }

    const handleEvent = (e) =>{

        if(e.code === 'Enter' && e.ctrlKey === false && e.shiftKey === false){
            e.preventDefault()
            sendMess()
        }
    }


    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "chatsList", user.id), (doc) => {
            console.log('w');
            const data = Object.entries(doc.data())
            //console.log(data)
            if (data) {
                const findChat = data.find(el => el[0] === infoChat.id)
                
                console.log(findChat[1])
                const friendInfo = infoChat.id
                const name = findChat[1].userInfo.displayName
                const photo = findChat[1].userInfo.photo 
                console.log(friendInfo)
                dispatch(updatePhotoName({ name, photo, friendInfo }))
            
            
            }

        });
        return () => {
            unsub()
        }
    },[friend.name, friend.photo, friend.email])

    return (
        <section className={styleFriends.friends}>
            <div className={classNames(style.container, 'container')}>
                <header className={style.header}>
                    <div className={style.user}>
                        <div className={style.userImg}>
                            <img src={infoChat.photo !== null ? infoChat.photo : img} alt="User" />
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

                <SendMessages handleEvent={handleEvent} sendMess={sendMess} text={text} setMessageText={setMessageText} />
            </div>
        </section>
    );

}