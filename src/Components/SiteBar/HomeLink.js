import { Component } from "react";
import home from '../../img/home.svg'
import style from './SiteBar.module.css'

export class HomeLink extends Component{
    render(){
        return(
            <div className={style.home}>
                <a href="#" className={`${style.active_link}, ${style.link}`}>
                    <img src={home} alt="Home" className="sitebar__img"/>
                </a>
            </div>
        );
    }
}