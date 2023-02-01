import { useOutletContext } from 'react-router-dom';
import send from '../../img/send.svg';
import style from './MessagesMain.module.css';


export function SendMessages({navRef, infoSection, nameRef, sendMess, text, setMessageText, handleEvent, innerRef}) {
    const infoRefs = useOutletContext()
    

    const chek = (status) =>{
        if(window.innerWidth <= 1280){
            const nameSection = nameRef.current
            const navigationSection = navRef.current
            const sidebarSection = infoSection.sidebarRef.current
            const sectionMain = infoRefs.sectionMain.current

            if(status){
                nameSection.style.cssText = `position: fixed; width: 100%; left: ${sidebarSection.offsetWidth}px; top: ${navigationSection.offsetHeight}px;`
                sidebarSection.style.cssText = `position: fixed; z-index: 10; height: 100%;`
                navigationSection.style.cssText = `position: fixed; width: 100%; z-index: 1`
                sectionMain.style.cssText = `width: calc(100% - ${sidebarSection.offsetWidth}px); margin: ${nameSection.offsetHeight + navigationSection.offsetHeight}px 0 0 ${sidebarSection.offsetWidth}px;`
            }else{
                nameSection.style.cssText = ``
                sidebarSection.style.cssText = ``
                navigationSection.style.cssText = ``
                sectionMain.style.cssText = ``
            }
        }
        
    }

    return (
        <section className={style.textArea} ref={innerRef}>
            {/* change click */}
            <textarea onBlur={() => chek(false)} onFocus={() => chek(true)} placeholder='Enter your message' onKeyDown={handleEvent} value={text} onChange={(e) => setMessageText(e.target.value)} name="messages" id='textarea' type='text' className={style.input} rows="1" ></textarea>
            <button onClick={() => sendMess()} type='submit' className={style.send}>
                <img src={send} alt="Send" />
            </button>
        </section>
    )
}