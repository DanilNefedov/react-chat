import classNames from "classnames"
import style from './MessagesMain.module.css'


export function MessagesFieldMe (props){

    return(
        <div className={style.messageContainerMe}>
            <span className={classNames("message", style.messagesMe)}>
                {props.messages}
            </span>
        </div>
        
    );
}