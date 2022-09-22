import { Component } from "react";
import messages from '../../img/messages.svg'

export class Messages extends Component{
    render(){
        return(
            <div className="sitebar__messages">
                <a href="#" className="sitebar__link">
                    <img src={messages} alt="Messages" className="sitebar__img"/>
                </a>
                
            </div>
        );
    }
}