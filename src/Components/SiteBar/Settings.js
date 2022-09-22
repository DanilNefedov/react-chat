import { Component } from "react";
import settings from '../../img/settings.svg';

export class Settings extends Component{
    render(){
        return(
            <div className="sitebar__settings">
                <a href="#" className="sitebar__link">
                    <img src={settings} alt="Settings" className="sitebar__img"/>
                </a>
            </div>
        )
    }
}