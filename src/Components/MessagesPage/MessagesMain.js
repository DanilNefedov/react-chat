import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './MessagesMain.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useReducer, useRef, useState } from 'react';
import { SendMessages } from './SendMessages';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import img from '../../img/user-M.png'
import { useEffect } from 'react';
import { updatePhotoName, viewMessage } from '../../store/friendSlice';
import back from '../../img/back-dark.svg'
import { deletedUser, viewMessageGroup } from '../../store/groupSlice';
import { MessagesField } from './MessagesField';
import { initialStateGroup, reducerGroup } from '../../state/group';
import edit from '../../img/edit.svg'
import { initialEditMessage, reducerEditMessage } from '../../state/editMessage';
import { requestSendMess } from './functions/requestSendMess';


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

    const dispatch = useDispatch()
    const [stateGroup, dispatchStateGroup] = useReducer(reducerGroup, initialStateGroup)
    const [editMessage, dispatchEditMessage] = useReducer(reducerEditMessage, initialEditMessage)

    const [sizeWindow, setSizeWindow] = useState(window.visualViewport.height)
    const [deletedAcc, setDeletedAcc] = useState(false)
    const [text, setMessageText] = useState('');

    const sendMess = async () => {
        const messageText = text
        setMessageText('')

        if (messageText !== '') {

            requestSendMess(db, infoChat, messageText, user)
        
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
            if (data) {

                const findChat = data.find(el => el[0] === infoChat.id)                    
                const viewMess = findChat && findChat[1].viewMessage
                const view = viewMess && viewMess.viewMess 
                const idSender = viewMess && viewMess.idSender 
                const newMess = viewMess && viewMess.newMessView
                if (findChat && findChat[1].chat) {
                    const combinedId = findChat[0]
                    const name = findChat[1].name ? findChat[1].name.name : ''
                    const photo = findChat[1].photo.photo


                    if (findChat[1].deleted.deleted ) {
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
                        {stateGroup.admin && 
                        <Link state={infoChat} to='/edit-group'>
                            <img className={style.editIcon} src={edit} alt="edit" />
                        </Link>}
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

                <section ref={scrollRef} id='scroll' className={editMessage.modal ? classNames(style.noScroll, style.messages) : style.messages}>
                    <MessagesField stateEditMess={[editMessage, dispatchEditMessage]} setSizeWindow={setSizeWindow} scrollRef={scrollRef} infoChat={infoChat}></MessagesField>
                    
                </section>
                {deletedAcc
                    ?
                    <div ref={footerRef} className={classNames(style.deletedInput)}>Account has been deleted</div>
                    :
                    <SendMessages stateEditMess={[editMessage, dispatchEditMessage]} infoChat={infoChat} scrollRef={scrollRef} setSizeWindow={setSizeWindow}  innerRef={footerRef} handleEvent={handleEvent} sendMess={sendMess} text={text} setMessageText={setMessageText} />
                }
            </div>
        </section>
    );

}