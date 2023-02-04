import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import send from '../../img/send.svg';
import style from './MessagesMain.module.css';



export function SendMessages({setSizeWindow, scrollRef, sendMess, text, setMessageText, handleEvent, innerRef}) {
    const context = useOutletContext()
    const heightContext = context.height.current

    useEffect(() =>{
        console.log(scrollRef)
        window.addEventListener("resize", keyboardDidShow )
        function keyboardDidShow() {
            //if(scrollRef !== null){
                const newHeight = window.visualViewport.height;
                // const staticHeight = window.innerHeight
                // const res = staticHeight - newHeight
                setSizeWindow(newHeight)
                document.body.style.height = ` ${newHeight}px`;
               // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
           // }
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