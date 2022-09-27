import { Component } from "react";
import exit from '../../img/exit.svg'
import style from './SiteBar.module.css'

export class Exit extends Component{
    render(){
        return(
            <div className={style.exit}>
                <a href="#" className={style.exitLink}>
                    <img src={exit} alt="Exit" />
                </a>
            </div>
        );
    }
}