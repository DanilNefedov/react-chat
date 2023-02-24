import classNames from "classnames"
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/messagesSlice";
import { Empty } from "../Empty/Empty";
import style from './MessagesMain.module.css'


export function MessagesFieldMe({ setSizeWindow, infoChat, scrollRef}) {
  
    const messagesState = useSelector(state => state.message.messages)
    const user = useSelector(state => state.user)
    const findChat = messagesState.find(el => el.chatId === infoChat.id)

    const db = getFirestore()
    const dispatch = useDispatch()
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messagesState])

    
    useEffect(()=>{
        window.addEventListener("onload", setSizeWindow(window.visualViewport.height));
    
        return () => window.addEventListener("resize", setSizeWindow(window.visualViewport.height));        
    },[messagesState, window.innerHeight])


    useEffect(() => {
        //console.log('w')
        const unsub = onSnapshot(doc(db, 'chats', infoChat.id), (doc) => {
            //console.log('ww')
            if (doc.data()) {
                //console.log('www')
                const data = doc.data()
                const chatId = infoChat.id

                data.messages.map(el => {
                    const userId = el.userId
                    const messageText = el.messageText
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
            <Empty text={'No Messages'}></Empty>
        ))
    );
}