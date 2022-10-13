import classNames from "classnames"


export function MessagesFieldMe (props){

    return(
        <span className={classNames("message")}>
            {props.messages}
        </span>
    );
}