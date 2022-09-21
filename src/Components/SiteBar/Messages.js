import { Component } from "react";
import messages from '../../img/messages.svg'

export class Messages extends Component{
    render(){
        return(
            <div className="sitebar__messages">
                <img src={messages} alt="Messages" className="sitebar__img"/>
            </div>
        );
    }
}