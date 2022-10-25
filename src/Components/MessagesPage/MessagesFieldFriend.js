import classNames from "classnames"
import style from './MessagesMain.module.css'


export function MessagesFieldFriend (props){

    return(
        <div className={style.messageContainerFriend}>
            <span className={classNames("message", style.messagesFriend)}>
                {props.messages}
            </span>
        </div>
        
    );
}