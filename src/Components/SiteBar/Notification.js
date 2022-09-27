import { Component } from "react";
import notification from '../../img/notification.svg';
import style from './SiteBar.module.css'

export class Notification extends Component{
    render(){
        return(
            <div className={style.notification}>
                <a href="#" className={style.link}>
                    <img src={notification} alt="Notification" className={style.img}/>
                </a>
                
            </div>
        )
    }
}