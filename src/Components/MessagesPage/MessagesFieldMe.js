import classNames from "classnames"
import { useEffect } from "react";
import style from './MessagesMain.module.css'


export function MessagesFieldMe ({messages}){
    useEffect(() => {
        const scroll = document.getElementById("scroll");
        scroll.scrollTop = scroll.scrollHeight;
    }, [messages])

    return(
        (messages.me) ? 
        (<div className={style.messageContainerMe}>
            <span className={classNames("message", style.messagesMe)}>
                {messages.me}
            </span>
            <span className={style.dateMessages}>{messages.date}</span>
        </div>) :
        (<div className={style.messageContainerFriend}>
            <span className={classNames("message", style.messagesFriend)}>
                {messages.friend}
            </span>
            <span className={style.dateMessages}>{messages.date}</span>
        </div>)
    );
}