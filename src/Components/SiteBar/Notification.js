import { Component } from "react";
import notification from '../../img/notification.svg';

export class Notification extends Component{
    render(){
        return(
            <div className="sitebar__notification">
                <a href="#" className="sitebar__link">
                    <img src={notification} alt="Notification" className="sitebar__img"/>
                </a>
                
            </div>
        )
    }
}