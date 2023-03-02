import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
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
import back from '../../img/back-dark.svg'
import { viewMessageGroup } from '../../store/groupSlice';



export default function MessagesMain() {
    const friend = useSelector(state => state.friend.friend)
    const group = useSelector(state => state.group.group)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const nameRef = useRef();
    const scrollRef = useRef();
    const footerRef = useRef();

    const db = getFirestore()

    const [link] = Object.values(useParams())
    const infoChat = friend.find(el => el.id === link) ? friend.find(el => el.id === link) : group.find(el => el.id === link)
    //console.log(infoChat.id)

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
                    date: date,
                    photo: user.photo
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

            if(infoChat.users){
                infoChat.users.map(async el => {
                    const res = await getDoc(doc(db, 'chatsList', el.friendId))
                    //console.log(el)
                    if (res.exists()) {
                        await updateDoc(doc(db, 'chatsList', el.friendId), {
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
                })
           }else{
                const res = await getDoc(doc(db, 'chatsList', infoChat.friendId))
                //console.log(res)
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

    }

    const handleEvent = (e) => {

        if (e.code === 'Enter' && e.ctrlKey === false && e.shiftKey === false) {
            e.preventDefault()
            sendMess()
        }
    }


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chatsList", user.id), (doc) => {
            
            const data = doc.data() ?  Object.entries(doc.data()) : false
            //console.log(data)
            if (data) {

                const findChat = data.find(el => el[0] === infoChat.id)
                //console.log(findChat)
                if (findChat && findChat.chat) {
                //     // console.log(findChat)
                    const combinedId = findChat[0]
                    const name = findChat[1].userInfo.displayName ? findChat[1].userInfo.displayName : ''
                    const photo = findChat[1].userInfo.photo
                    const view = findChat[1].viewMessage.view 
                    const idSender = findChat[1].idSender ? findChat[1].idSender.idSender : null
                    const newMess = findChat[1].viewNewMessage.viewNewMess 

                    if (findChat[1].userInfo.acc === 'deleted') {
                        dispatch(updatePhotoName({ name, photo, combinedId }))
                        setDeletedAcc(true)
                        return
                    } else {
                        dispatch(updatePhotoName({ name, photo, combinedId }))
                        setDeletedAcc(false)
                    }

                    dispatch(viewMessage({newMess, view,combinedId,idSender}))
                }else if(findChat && findChat.group){
                    const combinedId = findChat[0]
                    // const name =findChat[1].group.name
                    // const photo = findChat[1].photo.photo

                    const view = findChat[1].viewMessage.view 
                    const idSender = findChat[1].idSender ? findChat[1].idSender.idSender : null
                    const newMess = findChat[1].viewNewMessage.viewNewMess 

                    dispatch(viewMessageGroup({newMess, view,combinedId,idSender}))
                }
            }
           
            

        });
        return () => {
            unsub()
        }
    }, [friend.name, friend.photo, friend.email])

    useEffect(()=>{
        if (scrollRef.current !== null) {
            const nameHeight = nameRef.current.offsetHeight
            const footerHeight = footerRef.current.offsetHeight
            const windowHeight = window.visualViewport.height

            const sum =   nameHeight + footerHeight

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
                    <div onClick={() => {navigate('/')}} className={style.back}>
                        <img src={back} alt="back" />
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