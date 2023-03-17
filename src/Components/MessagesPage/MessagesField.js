import classNames from "classnames"
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, updateNamePhoto } from "../../store/messagesSlice";
import { Empty } from "../Empty/Empty";
import style from './MessagesMain.module.css'
import img from '../../img/user-M.png'
import { Photo } from "./Photo";


export function MessagesField({ setSizeWindow, infoChat, scrollRef }) {
    const friend = useSelector(state => state.friend.friend)
    const messagesState = useSelector(state => state.message.messages)
    const user = useSelector(state => state.user)
    const findChat = messagesState.find(el => el.chatId === infoChat.id)
    // console.log(friend)

    const db = getFirestore()
    const dispatch = useDispatch()
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messagesState])


    useEffect(() => {
        window.addEventListener("onload", setSizeWindow(window.visualViewport.height));

        return () => window.addEventListener("resize", setSizeWindow(window.visualViewport.height));
    }, [messagesState, window.innerHeight])



    useEffect(() => {
        // console.log(user)
        const unsub = onSnapshot(doc(db, 'chats', infoChat.id), (doc) => {
            //console.log('ww')
            if (doc.data()) {
                //console.log('www')
                const data = doc.data()
                const chatId = infoChat.id
                // console.log(data)

                data.messages.map(el => {
                    //console.log(el)
                    const userId = el.userId
                    const messageText = el.messageText
                    const messageId = el.id
                    const date = el.date
                    const photo = el.photo
                    // const name = el.name.substring(0, 1)
                    const name = el.name

                    //const nameMess = name
                    // console.log(name)
                    const dayMess = dayArr[date.toDate().getDay()]//
                    const hoursMess = date.toDate().getHours()//
                    let minute = date.toDate().getMinutes().toString()//
                    if (minute.length === 1) {
                        minute = `0${minute}`
                    }
                    const datePush = `${dayMess} ${hoursMess}:${minute}`
                    //console.log(findChat)
                    //console.log()
                    // const find = messagesState.find(el => el.chatId === chatId)
                    //console.log(findChat.messages.find(el => el.userId === userId))
                    if (findChat && findChat.messages) {
                        const photoUser = findChat.messages.find(el => el.userId === userId)
                       
                        //console.log(photoUser.photo !== photo)// more times to update
                        if (photoUser.photo !== photo || photoUser.name !== name) {
                            //         //err in if
                            console.log('w')
                            // setUpdatePhoto(true)

                            dispatch(updateNamePhoto({ messageId, chatId, photo, name }))
                        }
                        
                    }
                    //console.log(messagesState)
                    dispatch(addMessage({ name, chatId, userId, messageText, datePush, messageId, photo }))
                    // if(findChat){
                    //     console.log(findChat.messages[0].photo === photo)
                    // }
                })
            } else {
                return false
            }
        })

        return () => {
            unsub()
        }
    }, [findChat])
    // console.log(findChat)

    return (


        // console.log(findChat.messages.map(el => el.photo))
        (findChat ? (findChat.messages.map(el => (
            // console.log(el, el.photo)
            el.userId === user.id ? (
                <div key={el.messageId} className={style.messageContainerMe}>
                    <span className={classNames("message", style.messagesMe)}>
                        {el.text}
                        <span className={classNames(style.dateMessages, style.dateMe)}>{el.date}</span>

                    </span>
                    <span className={style.infoSender}>
                        {/* <Photo  about={el}></Photo> */}
                        <span className={style.imgSenderBlock}>
                            {/* {el.photo ? <img className={style.photoSender} src={el.photo} alt="Photo user" /> : 
                            <img className={style.photoSender} src={img} alt="Photo user" />} */}
                            <img className={style.photoSender} src={el.photo ? el.photo : img} alt="Photo user" />
                        </span>
                        <span className={el.photo ? style.desactiveName : style.nameSender}>{el.name}</span>
                    </span>
                </div>
            ):(
                <div key={el.messageId} className={style.messageContainerFriend}>
                    <span className={style.infoSender}>
                        {/* <Photo about={el}></Photo> */}
                        <span className={style.imgSenderBlock}>
                        {/* {el.photo ? <img className={style.photoSender} src={el.photo} alt="Photo user" /> : 
                            <img className={style.photoSender} src={img} alt="Photo user" />} */}
                        </span>
                        <img className={style.photoSender} src={el.photo ? el.photo : img} alt="Photo user" />
                        <span className={el.photo ? style.desactiveName : style.nameSender}>{el.name}</span>
                    </span>
                    <span className={classNames("message", style.messagesFriend)}>
                        {el.text}
                        <span className={classNames(style.dateMessages, style.dateFriend)}>{el.date}</span>
                    </span>


                </div>
            )
        ))) : (
            <Empty text={'No Messages'}></Empty>
        ))

    );
}