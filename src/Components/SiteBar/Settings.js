import { Component } from "react";
import settings from '../../img/settings.svg';

export class Settings extends Component{
    render(){
        return(
            <div className="sitebar__settings">
                <img src={settings} alt="Settings" />
            </div>
        )
    }
}