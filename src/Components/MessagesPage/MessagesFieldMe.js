import classNames from "classnames"
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/messagesSlice";
import { Empty } from "../Empty/Empty";
import style from './MessagesMain.module.css'
import img from '../../img/user-M.png'


export function MessagesFieldMe({ setSizeWindow, infoChat, scrollRef}) {
    const friend = useSelector(state => state.friend.friend)
    const messagesState = useSelector(state => state.message.messages)
    const user = useSelector(state => state.user)
    const findChat = messagesState.find(el => el.chatId === infoChat.id)
    //console.log(findChat, messagesState)

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
        // console.log(user)
        const unsub = onSnapshot(doc(db, 'chats', infoChat.id), (doc) => {
            //console.log('ww')
            if (doc.data()) {
                //console.log('www')
                const data = doc.data()
                const chatId = infoChat.id
                console.log(data)

                data.messages.map(el => {
                    const userId = el.userId
                    const messageText = el.messageText
                    const messageId = el.id
                    const date = el.date
                    const photo = el.photo
                    const name = el.name.substring(0, 1)

                    //const nameMess = name
                    console.log(el)
                    const dayMess = dayArr[date.toDate().getDay()]//
                    const hoursMess = date.toDate().getHours()//
                    let minute = date.toDate().getMinutes().toString()//
                    if(minute.length === 1){
                        minute = `0${minute}`
                    }
                    const datePush = `${dayMess} ${hoursMess}:${minute}`

                    dispatch(addMessage({name, chatId, userId, messageText, datePush, messageId, photo }))

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
            //console.log(el)
            el.userId === user.id ? (
                <div key={el.messageId} className={style.messageContainerMe}>
                    <span className={classNames("message", style.messagesMe)}>
                        {el.text}
                        <span className={classNames(style.dateMessages, style.dateMe)}>{el.date}</span>
                        
                    </span>
                    <span className={style.infoSender}>
                        <span className={style.imgSenderBlock}>
                            <img className={style.photoSender} src={el.photo ? el.photo : img} alt="Photo user" />
                        </span>
                        <span className={el.photo ? style.desactiveName : style.nameSender}>{el.name}</span>
                    </span>
                </div>
            ):(
                <div key={el.messageId} className={style.messageContainerFriend}>
                    <span className={style.infoSender}>
                        <span className={style.imgSenderBlock}>
                            <img className={style.photoSender} src={el.photo ? el.photo : img} alt="Photo user" />
                        </span>
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