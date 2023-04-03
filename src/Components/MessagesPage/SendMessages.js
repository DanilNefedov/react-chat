import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import send from '../../img/send.svg';
import style from './MessagesMain.module.css';
import done from '../../img/done-contact.svg'
import { deleteMessageStore, editMessage } from '../../store/messagesSlice';
import { editLastMessageGroup } from '../../store/groupSlice';
import { editLastMessageFriend } from '../../store/friendSlice';
import { initialEditMessage } from '../../state/editMessage';
import deleteMess from '../../img/delete-white.svg'
import classNames from "classnames"




export function SendMessages({stateEditMess, setSizeWindow, sendMess, text, setMessageText, handleEvent, innerRef, infoChat}) {
    const myInfo = useSelector(state => state.user)
    const messagesState = useSelector(state => state.message.messages)
    const db = getFirestore()
    const textAreaEdit = useRef()

    const dispatch = useDispatch()

    // console.log(infoChat)

    useEffect(() =>{
        window.addEventListener("resize", keyboardDidShow )
        function keyboardDidShow() {
            const newHeight = window.visualViewport.height;
            setSizeWindow(newHeight)
        }
        return () =>{
            keyboardDidShow()
        }
    }, [])

    const delViewMess = async () => {
        try{
            await updateDoc(doc(db, 'chatsList', myInfo.id), {
                [`${infoChat.id}.viewMessage.newMessView`] :true
                
            })

            if(infoChat.users ){
                const usersGroup = Object.entries(infoChat.users)
                usersGroup.map( async el => {
                    if(el[1].deleted === false && el[0] !== myInfo.id){
                        await updateDoc(doc(db, 'chatsList', el[0]), {
                            [`${infoChat.id}.viewMessage.viewMess`]: true 
                        })
                    }
                })
            }else{
                await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
                    [`${infoChat.id}.viewMessage.viewMess`]: true 
                })
            }
            
        } catch(err){
            console.error(err)
        }
    }


    useEffect(() =>{
        const textArea = textAreaEdit.current
        if(textArea){
            textArea.focus()
        }

    },[stateEditMess[0].modal])


    const setEditMess = async () =>{
        const messageText = stateEditMess[0].editText
        const chatId = infoChat.id
        const messageId = stateEditMess[0].editMess.messageId

        if(infoChat.lastMessages === messageText || messageText.trim() === ''){
            stateEditMess[1]({type: 'init', payload:initialEditMessage})
            
        }else{
            const docSnap = await getDoc(doc(db, 'chats', chatId));
            if (docSnap.exists()){
                const array = docSnap.data().messages;
                const updatedArray = array.map((element) =>{
                    if (element.id === messageId) {
                        dispatch(editMessage({chatId, messageId, messageText}))
                        return { ...element, messageText: messageText };
                    }else{
                        return element;
                    }
                })

                await updateDoc(doc(db, 'chats', chatId), { messages: updatedArray });
            }


            if(infoChat.users){
                const usersArr = Object.entries(infoChat.users)
                usersArr.map(async el =>{
                    if(el[1].deleted === false ){
                        await updateDoc(doc(db, 'chatsList', el[0]), {
                            [`${infoChat.id}.lastMessage.messageText`]: messageText 
                        })
                        const lastMessages = messageText
                        const combinedId = infoChat.id
                        dispatch(editLastMessageGroup({combinedId, lastMessages}))

                    }
                })
            }else{
                await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
                    [`${infoChat.id}.lastMessage.messageText`]: messageText 
                })
                await updateDoc(doc(db, 'chatsList', myInfo.id), {
                    [`${infoChat.id}.lastMessage.messageText`] :messageText
                })
                const lastMessages = messageText
                const combinedId = infoChat.id
                dispatch(editLastMessageFriend({combinedId, lastMessages}))

            }
            stateEditMess[1]({type: 'init', payload:initialEditMessage})

        }
    }


    const deleteMessage = async () =>{
        const chatId = infoChat.id
        const messageId = stateEditMess[0].editMess.messageId
        const userId = myInfo.id

        dispatch(deleteMessageStore({chatId, messageId, userId}))
        const docSnapChats = await getDoc(doc(db, 'chats', chatId));

        if (docSnapChats.exists()){
            const array = docSnapChats.data().messages;
            const updatedArray = array.findIndex((element) => element.id === messageId)
            array.splice(updatedArray, 1)
            await updateDoc(doc(db, 'chats', chatId), { messages: array });
        }


        const messageStateChat = messagesState.find(el => el.chatId === infoChat.id)
        const newLastMessage = messageStateChat.messages.length >= 2 ? messageStateChat.messages[messageStateChat.messages.length - 2].text : "No messages"
        if(messageStateChat.messages[messageStateChat.messages.length - 1].messageId === messageId){
            
            if(infoChat.users){
                const usersArr = Object.entries(infoChat.users)
                usersArr.map(async el =>{
                    if(el[1].deleted === false ){
                        await updateDoc(doc(db, 'chatsList', el[0]), {
                            [`${infoChat.id}.lastMessage.messageText`]: newLastMessage 
                        })
                        const lastMessages = newLastMessage
                        const combinedId = infoChat.id
                        dispatch(editLastMessageGroup({combinedId, lastMessages}))
                    }
                })
            }else{
                await updateDoc(doc(db, 'chatsList', infoChat.friendId), {
                    [`${infoChat.id}.lastMessage.messageText`]: newLastMessage 
                })
                await updateDoc(doc(db, 'chatsList', myInfo.id), {
                    [`${infoChat.id}.lastMessage.messageText`] :newLastMessage 
                })
                const lastMessages = newLastMessage 
                const combinedId = infoChat.id
                dispatch(editLastMessageFriend({combinedId, lastMessages}))
            }
            
        }
        stateEditMess[1]({type: 'init', payload:initialEditMessage})

    } 

    // console.log(infoChat)


    return (
        <section className={style.textArea} ref={innerRef}>
            {stateEditMess[0].modal ? 
            <>
            <textarea onChange={(e) => stateEditMess[1]({type:'editText', payload:e.target.value})} ref={textAreaEdit} value={stateEditMess[0].editText} onKeyDown={handleEvent} name="messages" id='textareaEdit' type='text' className={style.input} rows="1" ></textarea>
            <button onClick={() => deleteMessage()} className={classNames(style.send, style.deleteMess)}>
                <img src={deleteMess} alt="delete message" />
            </button>
            <button onClick={() => setEditMess()} className={style.send}>
                <img src={done} alt="accept" />
            </button>
            </>
            :
            <>
            <textarea onClick={() => delViewMess()} placeholder='Enter your message' onKeyDown={handleEvent} value={text} onChange={(e) => setMessageText(e.target.value)} name="messages" id='textarea' type='text' className={style.input} rows="1" ></textarea>
            <button onClick={() => sendMess()} type='submit' className={style.send}>
                <img src={send} alt="Send" />
            </button>
            </>
            }

        </section>
    )
}