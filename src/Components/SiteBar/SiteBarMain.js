import { Component } from "react";
import { HomeLink } from "./HomeLink";
import { Messages } from "./Messages";
import { Notification } from "./Notification";
import { Settings } from "./Settings";
import { User } from "./User";

export class SiteBarMain extends Component{
    render(){
        return(
            <section className="sitebar">
                <div className="sitebar-container">
                    <User/>
                    <nav className="sitebar-nav">
                        <HomeLink/>
                        <Messages/>
                        <Notification/>
                        <Settings/>
                    </nav>
                    
                </div>
            </section>
        );
    }
}