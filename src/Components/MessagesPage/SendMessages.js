import send from '../../img/send.svg';
import style from './MessagesMain.module.css';


export function SendMessages({sendMess, text, setMessageText, handleEvent, innerRef}) {
    //console.log(sendMess)
    return (
        <section className={style.textArea} ref={innerRef}>

            <textarea placeholder='Enter your message' onKeyDown={handleEvent} value={text} onChange={(e) => setMessageText(e.target.value)} name="messages" id='textarea' type='text' className={style.input} rows="1" ></textarea>

            <button onClick={() => sendMess()} type='submit' className={style.send}>
                <img src={send} alt="Send" />
            </button>
        </section>
    )
}