import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import send from '../../img/send.svg';
import style from './MessagesMain.module.css';



export function SendMessages({setSet2, scrollRef, sendMess, text, setMessageText, handleEvent, innerRef}) {
    const context = useOutletContext()
    const heightContext = context.height.current
    //const keyboardHeight = useKeyboardHeight();
    //const [set, setSet] = useState('')
    
    // const resize = () => {
    //     setSet2(window.visualViewport.height)
    // }

    useEffect(() =>{
        console.log(scrollRef)
        window.addEventListener("resize", keyboardDidShow )
        //setSet2(window.visualViewport.height)
        //window.addEventListener('keyboardDidShow', keyboardDidShow);
        //window.addEventListener('keyboardDidHide', keyboardDidHide);
        //console.log(heightContext)

        function keyboardDidShow() {
            //if(scrollRef !== null){
                const newHeight = window.visualViewport.height;
                const staticHeight = window.innerHeight
                const res = staticHeight - newHeight
                setSet2(newHeight)
                document.body.style.height = ` ${newHeight}px`;
                //scrollRef.current.style.height = ` ${newHeight}px`;
            //}
            
        }
          
        // function keyboardDidHide() {
        //     console.log('no')
        //     setSet2('no')
        // }

        return () =>{
            //setSet2(window.visualViewport.height)
            keyboardDidShow()
            //keyboardDidHide()
        }
    }, [])

    // const keyboardIsOpen = () =>{
    //     const visualHeight = window.visualViewport.height
    //     const windowHeight = window.innerHeight
    //     const result = windowHeight - visualHeight
    //     
    //     setSet2(visualHeight)
    //     setSet3(windowHeight)
    //     setSet(result)
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
    //}

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