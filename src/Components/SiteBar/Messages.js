import { Component } from "react";
import messages from '../../img/messages.svg'
import style from './SiteBar.module.css'

export class Messages extends Component{
    render(){
        return(
            <div className={style.messages}>
                <a href="#" className={style.link}>
                    <img src={messages} alt="Messages" className={style.img}/>
                </a>
                
            </div>
        );
    }
}