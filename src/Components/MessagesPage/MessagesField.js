import classNames from "classnames"
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, deleteMessageStore, editMessage, updateNameMessages, updatePhotoMessages } from "../../store/messagesSlice";
import { Empty } from "../Empty/Empty";
import style from './MessagesMain.module.css'
import img from '../../img/user-M.png'



export function MessagesField({ setSizeWindow, infoChat, scrollRef, stateEditMess }) {
    const messagesState = useSelector(state => state.message.messages)
    const user = useSelector(state => state.user)
    const findChat = messagesState.find(el => el.chatId === infoChat.id)
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
        const unsub = onSnapshot(doc(db, 'chats', infoChat.id), (doc) => {
            if (doc.data()) {
                const data = doc.data()
                const chatId = infoChat.id

                if(findChat && findChat.messages){
                    if(data.messages.length < findChat.messages.length){
                        for(let i = 0; i < findChat.messages.length; i++){
                            if(data.messages[i] === undefined || data.messages.length < findChat.messages.length){
                                const messageId = findChat.messages[i].messageId
                                dispatch(deleteMessageStore({chatId,messageId}))
                                
                            }
                        }
                    }
                }

                data.messages.map(el => {
                    const userId = el.userId
                    const messageText = el.messageText
                    const messageId = el.id
                    const date = el.date
                    const photo = el.photo 
                    const name = el.name 
                    const dayMess = dayArr[date.toDate().getDay()]
                    const hoursMess = date.toDate().getHours()
                    let minute = date.toDate().getMinutes().toString()
                    if (minute.length === 1) {
                        minute = `0${minute}`
                    }
                    const datePush = `${dayMess} ${hoursMess}:${minute}`

                    if (findChat && findChat.messages) {
                        const userMess = findChat.messages.find(el => el.messageId === messageId)
                        if(userMess !== undefined && userMess.photo !== undefined && photo !== undefined){
                            if (userMess.photo !== photo) {
                                dispatch(updatePhotoMessages({ messageId, chatId, photo }))
                            }
                        }
                        
                        if(userMess !== undefined && userMess.name !== undefined && name !== undefined){
                            if (userMess.name !== name) {
                                dispatch(updateNameMessages({ messageId, chatId, name }))
                            }
                        }
                        
                        if(userMess !== undefined && messageText !== undefined && userMess.text !== undefined){
                            if(userMess.text !== messageText){
                                dispatch(editMessage({chatId, messageId, messageText}))
                            }
                        }
                    }
                    dispatch(addMessage({ name, chatId, userId, messageText, datePush, messageId, photo }))
                })
                
            } else {
                return false
            }
        })

        return () => {
            unsub()
        }
    }, [findChat])

   
    
    const addInfoEdit = (idMess, chat) =>{
        const key = idMess
        const infoChat = chat
        const editMess = infoChat.messages.find(el => el.messageId === key)
        if(editMess){
            stateEditMess[1]({type:'modal', payload:true}) 
            stateEditMess[1]({type:'editMess', payload:editMess})
            stateEditMess[1]({type:'editText', payload:editMess.text})
        }
    }

    return (
        (messagesState.length > 0 && findChat && findChat.messages.length > 0 ? (findChat.messages.map(el => (
            el.userId === user.id ? (
                <div key={el.messageId} className={style.messageContainerMe}>
                    <span onClick={() => {
                    addInfoEdit(el.messageId, findChat)
                    }} className={classNames("message", style.messagesMe)}>
                        <span>{el.text}</span>
                        <span className={classNames(style.dateMessages, style.dateMe)}>{el.date}</span>

                    </span>
                    <span className={style.infoSender}>
                        <span className={style.imgSenderBlock}>
                            <img className={style.photoSender} src={el.photo ? el.photo : img} alt="Photo user" />
                        </span>
                    </span>
                </div>
            ):(
                <div key={el.messageId} className={style.messageContainerFriend}>
                    <span className={style.infoSender}>
                        <span className={style.imgSenderBlock}>
                        </span>
                        <img className={style.photoSender} src={el.photo ? el.photo : img} alt="Photo user" />
                    </span>
                    <span className={classNames("message", style.messagesFriend)}>
                        <span>{el.text}</span>
                        <span className={classNames(style.dateMessages, style.dateFriend)}>{el.date}</span>
                    </span>

                </div>
            )
        ))): (
            <Empty text={'No Messages'}></Empty>
        ))
    );
}


