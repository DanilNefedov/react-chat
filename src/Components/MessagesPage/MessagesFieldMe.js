import classNames from "classnames"
import style from './MessagesMain.module.css'


export function MessagesFieldMe ({messages}){
    return(
        <div className={style.messageContainerMe}>
            <span className={classNames("message", style.messagesMe)}>
                {messages}
            </span>
        </div>
        
    );
}