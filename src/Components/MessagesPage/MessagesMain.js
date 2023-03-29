import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import style from './MessagesMain.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useReducer, useRef, useState } from 'react';
import { SendMessages } from './SendMessages';
import { arrayUnion, doc, getDoc, getFirestore, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import img from '../../img/user-M.png'
import { useEffect } from 'react';
import { updatePhotoName, viewMessage } from '../../store/friendSlice';
import back from '../../img/back-dark.svg'
import { deletedUser, viewMessageGroup } from '../../store/groupSlice';
import { MessagesField } from './MessagesField';
import { initialStateGroup, reducerGroup } from '../../state/group';



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
    // console.log(infoChat)

    const dispatch = useDispatch()
    const [stateGroup, dispatchStateGroup] = useReducer(reducerGroup, initialStateGroup)

    const [sizeWindow, setSizeWindow] = useState(window.visualViewport.height)//can change for reducer
    const [deletedAcc, setDeletedAcc] = useState(false)
    const [text, setMessageText] = useState('');

    const sendMess = async () => {
        const messageText = text
        setMessageText('')


        if (messageText !== '') {
            const messageId = uuid()
            const date = Timestamp.now()
            // const userIdMess = user.id

            await updateDoc(doc(db, 'chats', infoChat.id), {

                messages: arrayUnion({
                    id: messageId,
                    messageText,
                    userId: user.id,
                    date: date,
                    photo: user.photo,
                    name:user.name,
                    deleted:false
                })
            })

            await updateDoc(doc(db, 'chatsList', user.id), {
                [infoChat.id + '.lastMessage']: {
                    messageText
                },
                [infoChat.id + '.date']: serverTimestamp(),
                [infoChat.id + '.viewMessage']:{
                    newMessView: true,
                    idSender:user.id,
                    viewMess:false
                }

            })

            if(infoChat.users){
                for(const key in infoChat.users){
                    const res = await getDoc(doc(db, 'chatsList', key))
                    if (res.exists()) {
                        await updateDoc(doc(db, 'chatsList', key), {
                            [infoChat.id + '.lastMessage']: {
                                messageText
                            },
                            [infoChat.id + '.date']: serverTimestamp(),
                            [infoChat.id + '.viewMessage']:{
                                newMessView: false,
                                idSender:user.id,
                                viewMess:false
                            }
                        })
                    }
                }
                
           }else{
                const res = await getDoc(doc(db, 'chatsList', infoChat.friendId))
                // console.log('w')
                if (res.exists()) {
                    await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
                        [infoChat.id + '.lastMessage']: {
                            messageText
                        },
                        [infoChat.id + '.date']: serverTimestamp(),
                        [infoChat.id + '.viewMessage']:{
                            newMessView: false,
                            idSender:user.id,
                            viewMess:false
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
        const unsub = onSnapshot(doc(db, "chatsList", user.id), (doc) => {//ERROR update Deleted status
            
            const data = doc.data() ?  Object.entries(doc.data()) : false
            // console.log("data")
            if (data) {

                const findChat = data.find(el => el[0] === infoChat.id)                    
                const viewMess = !findChat ?? findChat[1].viewMessage
                const view = viewMess.viewMess 
                const idSender = viewMess.idSender 
                const newMess = viewMess.newMessView
                // console.log(findChat)
                if (findChat && findChat[1].chat) {
                    // console.log(findChat[1].deleted )
                    const combinedId = findChat[0]
                    const name = findChat[1].name ? findChat[1].name.name : ''
                    const photo = findChat[1].photo.photo


                    if (findChat[1].deleted.deleted ) {//change
                        dispatch(updatePhotoName({ name, photo, combinedId }))
                        setDeletedAcc(true)
                        return
                    } else {
                        dispatch(updatePhotoName({ name, photo, combinedId }))
                        setDeletedAcc(false)
                    }

                    dispatch(viewMessage({newMess, view,combinedId,idSender}))
                }else if(findChat && findChat[1].group){
                    const combinedId = findChat[0]
                    const usersArr = Object.entries(findChat[1].group.users)
                    const users = findChat[1].group.users
                    const infoUsers = Object.entries(infoChat.users)
                
                    for(let i = 0; i < usersArr.length; i++){
                        if(usersArr[i][1].deleted !== infoUsers[i][1].deleted){
                            dispatch(deletedUser({combinedId, users}))
                        }

                        if(usersArr[i][1].admin && usersArr[i][1].id === user.id){
                            console.log(usersArr[i][1])
                            dispatchStateGroup({type: 'admin', payload: true})
                        }
                    }
                    dispatch(viewMessageGroup({newMess, view,combinedId,idSender}))
                }
            }
        });
        return () => {
            unsub()
        }
    }, [infoChat])
    // console.log(infoChat)

    useEffect(()=>{
        if (scrollRef.current !== null) {
            const nameHeight = nameRef.current.offsetHeight
            const footerHeight = footerRef.current.offsetHeight
            const windowHeight = window.visualViewport.height

            const sum = nameHeight + footerHeight

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
                    <MessagesField setSizeWindow={setSizeWindow} scrollRef={scrollRef} infoChat={infoChat}></MessagesField>
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