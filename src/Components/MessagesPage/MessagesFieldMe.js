import classNames from "classnames"
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { addMessage } from "../../store/messagesSlice";
import style from './MessagesMain.module.css'


export function MessagesFieldMe({infoChat, scrollRef, reloadMess}) {
  
    const messagesState = useSelector(state => state.message.messages)
    const user = useSelector(state => state.user)
    const findChat = messagesState.find(el => el.chatId === infoChat.id)


    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messagesState])

    
    useEffect(()=>{
        window.addEventListener("onload", reloadMess);
        reloadMess()
        return () => window.addEventListener("resize", reloadMess);        
    },[messagesState])


    const db = getFirestore()
    const dispatch = useDispatch()
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'chats', infoChat.id), (doc) => {
            //console.log(doc.data())
            //console.log('ww')
            if (doc.data()) {
                const data = doc.data()
                const chatId = infoChat.id
                //console.log(data)
                data.messages.map(el => {
                    //console.log(data.messages)

                    const userId = el.userId
                    const messageText = el.messageText
                    //const datePush = el.date
                    const messageId = el.id
                    const date = el.date
                    const dayMess = dayArr[date.toDate().getDay()]//
                    const hoursMess = date.toDate().getHours()//
                    let minute = date.toDate().getMinutes().toString()//
                    if(minute.length === 1){
                        minute = `0${minute}`
                    }
                    const datePush = `${dayMess} ${hoursMess}:${minute}`

                    dispatch(addMessage({ chatId, userId, messageText, datePush, messageId }))

                })
            } else {
                return false
            }
        })

        return () => {
            unsub()
        }
    }, [infoChat.id])

    //console.log(messagesState)

    return (

        (messagesState.length > 0 && findChat ? (findChat.messages.map(el => (

            el.userId === user.id ? (
                <div key={el.messageId} className={style.messageContainerMe}>
                    <span className={classNames("message", style.messagesMe)}>
                        {el.text}
                        <span className={classNames(style.dateMessages, style.dateMe)}>{el.date}</span>
                    </span>
                    
                </div>
            ):(
                <div key={el.messageId} className={style.messageContainerFriend}>
                    <span className={classNames("message", style.messagesFriend)}>
                        {el.text}
                        <span className={classNames(style.dateMessages, style.dateFriend)}>{el.date}</span>
                    </span>
                    
                </div>
            )
        ))) : (
            <div className={classNames(style.empty)}>No Messages</div>
        ))
    );
}