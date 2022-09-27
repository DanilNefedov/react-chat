import { Component } from "react";
import { Exit } from "./Exit";
import { HomeLink } from "./HomeLink";
import { Messages } from "./Messages";
import { Notification } from "./Notification";
import { Settings } from "./Settings";
import { User } from "./User";
import style from './SiteBar.module.css'

export class SiteBarMain extends Component{
    render(){
        return(
            <section className={style.sitebar}>
                <div className="container">
                    <User/>
                    <nav className={style.nav}>
                        <HomeLink/>
                        <Messages/>
                        <Notification/>
                        <Settings/>
                    </nav>
                    <Exit/>
                </div>
            </section>
        );
    }
}