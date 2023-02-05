import { useEffect } from 'react';
import send from '../../img/send.svg';
import style from './MessagesMain.module.css';



export function SendMessages({setSizeWindow, sendMess, text, setMessageText, handleEvent, innerRef}) {

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

    return (
        <section className={style.textArea} ref={innerRef}>
            {/* change click 'Enter your message'onFocus={() => keyboardIsOpen()}*/}
            <textarea  placeholder='Enter your message' onKeyDown={handleEvent} value={text} onChange={(e) => setMessageText(e.target.value)} name="messages" id='textarea' type='text' className={style.input} rows="1" ></textarea>
            <button onClick={() => sendMess()} type='submit' className={style.send}>
                <img src={send} alt="Send" />
            </button>
        </section>
    )
}