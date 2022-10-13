import classNames from "classnames"


export function MessagesFieldFriend (props){

    return(
        <span className={classNames("message")}>
            {props.messages}
        </span>
    );
}