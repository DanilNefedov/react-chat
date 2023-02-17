import { useOutletContext, useParams } from 'react-router-dom';
import style from './MessagesMain.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { SendMessages } from './SendMessages';
import { MessagesFieldMe } from './MessagesFieldMe';
import { arrayUnion, doc, getDoc, getFirestore, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import img from '../../img/user-M.png'
import { useEffect } from 'react';
import { updatePhotoName, viewMessage } from '../../store/friendSlice';



export default function MessagesMain() {
    const friend = useSelector(state => state.friend.friend)
    const user = useSelector(state => state.user)

    const infoSection = useOutletContext()
    const nameRef = useRef();
    const scrollRef = useRef();
    const footerRef = useRef();

    const db = getFirestore()

    const [link] = Object.values(useParams())
    const infoChat = friend.find(el => el.id === link)

    const dispatch = useDispatch()

    const [sizeWindow, setSizeWindow] = useState(window.visualViewport.height)//can change for reducer
    const [deletedAcc, setDeletedAcc] = useState(false)
    const [text, setMessageText] = useState('');

    const sendMess = async () => {
        const messageText = text
        setMessageText('')

        if (messageText !== '') {
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
                [infoChat.id + '.date']: serverTimestamp(),
                [infoChat.id + '.viewMessage'] :{
                    view: false,
                },
                [infoChat.id + '.idSender'] :{
                    idSender:user.id
                },
                [infoChat.id + '.viewNewMessage'] :{
                    viewNewMess: true
                }

            })

            const res = await getDoc(doc(db, 'chatsList', infoChat.friendId))

            if (res.exists()) {
                await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
                    [infoChat.id + '.lastMessage']: {
                        messageText
                    },
                    [infoChat.id + '.date']: serverTimestamp(),
                    [infoChat.id + '.viewMessage'] :{
                        view: false,
                    },
                    [infoChat.id + '.idSender'] :{
                        idSender:user.id
                    },
                    [infoChat.id + '.viewNewMessage'] :{
                        viewNewMess: false
                    }
                })
            }


        }

    }

    const handleEvent = (e) => {

        if (e.code === 'Enter' && e.ctrlKey === false && e.shiftKey === false) {
            e.preventDefault()
            sendMess()
        }
    }


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chatsList", user.id), (doc) => {
            const data = Object.entries(doc.data())

            if (data) {
                const findChat = data.find(el => el[0] === infoChat.id)

                if (findChat) {
                    const combinedId = findChat[0]
                    const friendInfo = infoChat.id
                    const name = findChat[1].userInfo.displayName ? findChat[1].userInfo.displayName : ''
                    const photo = findChat[1].userInfo.photo
                    const view = findChat[1].viewMessage.view 
                    const idSender = findChat[1].idSender ? findChat[1].idSender.idSender : null
                    const newMess = findChat[1].viewNewMessage.viewNewMess 
                    //console.log(findChat)

                    if (findChat[1].userInfo.acc === 'deleted') {
                        dispatch(updatePhotoName({ name, photo, friendInfo }))
                        setDeletedAcc(true)
                        return
                    } else {
                        dispatch(updatePhotoName({ name, photo, friendInfo }))
                        setDeletedAcc(false)
                    }

                    dispatch(viewMessage({newMess, view,combinedId,idSender}))
                }
            }

        });
        return () => {
            unsub()
        }
    }, [friend.name, friend.photo, friend.email])

    useEffect(()=>{
        if (scrollRef.current !== null) {
            const headerHeight = infoSection.navRef.current.offsetHeight
            const nameHeight = nameRef.current.offsetHeight
            const footerHeight = footerRef.current.offsetHeight
            const windowHeight = window.visualViewport.height

            const sum = headerHeight + nameHeight + footerHeight

            const res = windowHeight - sum

            scrollRef.current.style.height = `${res}px`
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }

    }, [sizeWindow])

    return (
        <section className={style.messagesSec}>
            <div className={classNames(style.container, 'container')}>
                <header className={style.header} ref={nameRef}>
                    <div className={style.user}>
                        <div className={style.userImg}>
                            <img src={infoChat.photo !== null ? infoChat.photo : img} alt="User" />
                        </div>
                        <div className={style.about}>
                            <h2 className={style.name}>
                                {infoChat.name}
                            </h2>
                        </div>

                    </div>
                </header>

                <section ref={scrollRef} id='scroll' className={style.messages}>
                    <MessagesFieldMe setSizeWindow={setSizeWindow} scrollRef={scrollRef} infoChat={infoChat}></MessagesFieldMe>
                </section>
                {deletedAcc
                    ?
                    <div ref={footerRef} className={classNames(style.deletedInput)}>Account has been deleted</div>
                    :
                    <SendMessages infoChat={infoChat} scrollRef={scrollRef} setSizeWindow={setSizeWindow}  innerRef={footerRef} handleEvent={handleEvent} sendMess={sendMess} text={text} setMessageText={setMessageText} />
                }
            </div>
        </section>
    );

}