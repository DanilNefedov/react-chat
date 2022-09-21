import { Component } from "react";
import notification from '../../img/notification.svg';

export class Notification extends Component{
    render(){
        return(
            <div className="sitebar__notif">
                <img src={notification} alt="Notification" />
            </div>
        )
    }
}