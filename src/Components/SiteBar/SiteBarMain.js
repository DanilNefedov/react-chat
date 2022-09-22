import { Component } from "react";
import { Exit } from "./Exit";
import { HomeLink } from "./HomeLink";
import { Messages } from "./Messages";
import { Notification } from "./Notification";
import { Settings } from "./Settings";
import { User } from "./User";

export class SiteBarMain extends Component{
    render(){
        return(
            <section className="sitebar">
                <div className="container">
                    <User/>
                    <nav className="sitebar-nav">
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