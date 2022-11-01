import send from '../../img/send.svg';
import style from './MessagesMain.module.css';
import styleFriends from '../HomePage/Friends.module.css';

export function SendMessages({addMessageTask,messageText, setMessageText}) {
    return (
        <section className={style.textArea}>

            <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} name="messages" id='textarea' type='text' className={style.input} rows="1" ></textarea>

            <button onClick={addMessageTask} type='submit' className={style.send}>
                <img src={send} alt="Send" />
            </button>
        </section>
    )
}