import { Component } from "react";
import img from '../../img/user-M.png'
import style from './SiteBar.module.css'

export class User extends Component {
    render() {
        return (
            <div className={style.user}>
                <a href="#" className={style.link}>
                    <img src={img} alt="User" className={style.img}/>
                </a>
            </div>
        );
    }
}