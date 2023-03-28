import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import send from '../../img/send.svg';
import style from './MessagesMain.module.css';



export function SendMessages({setSizeWindow, sendMess, text, setMessageText, handleEvent, innerRef, infoChat}) {
    const myInfo = useSelector(state => state.user)
    const db = getFirestore()
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

    return (
        <section className={style.textArea} ref={innerRef}>
            {/* change click 'Enter your message'onFocus={() => keyboardIsOpen()}*/}
            <textarea onClick={() => delViewMess()} placeholder='Enter your message' onKeyDown={handleEvent} value={text} onChange={(e) => setMessageText(e.target.value)} name="messages" id='textarea' type='text' className={style.input} rows="1" ></textarea>
            <button onClick={() => sendMess()} type='submit' className={style.send}>
                <img src={send} alt="Send" />
            </button>
        </section>
    )
}