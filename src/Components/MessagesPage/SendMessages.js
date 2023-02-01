import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import send from '../../img/send.svg';
import style from './MessagesMain.module.css';



export function SendMessages({setSet2, setSet3, setSet, sendMess, text, setMessageText, handleEvent, innerRef}) {

    //const keyboardHeight = useKeyboardHeight();
    //const [set, setSet] = useState('')
    console.log(window.visualViewport)
    const keyboardIsOpen = () =>{
        const visualHeight = window.visualViewport.height
        const windowHeight = window.innerHeight
        const result = windowHeight - visualHeight
        document.body.style.height = `calc(100% - ${result}px)`;
        setSet2(visualHeight)
        setSet3(windowHeight)
        setSet(result)
        // window.addEventListener('keyboardDidShow', keyboardDidShow);
        // window.addEventListener('keyboardDidHide', keyboardDidHide);
        
        //setSet(keyboardHeight)

        // function keyboardDidShow() {
        //    setSet(window.visualViewport.height)
        // }
          
        // function keyboardDidHide() {
        //     setSet(window.visualViewport.height)
        // }
        // const keyboardHeight = useKeyboard();
        // console.log(keyboardHeight);

        // return () =>{
        //     keyboardDidShow()
        //     keyboardDidHide()
        // }
    }

    return (
        <section className={style.textArea} ref={innerRef}>
            {/* change click 'Enter your message'*/}
            <textarea onFocus={() => keyboardIsOpen()} placeholder='Enter your message' onKeyDown={handleEvent} value={text} onChange={(e) => setMessageText(e.target.value)} name="messages" id='textarea' type='text' className={style.input} rows="1" ></textarea>
            <button onClick={() => sendMess()} type='submit' className={style.send}>
                <img src={send} alt="Send" />
            </button>
        </section>
    )
}