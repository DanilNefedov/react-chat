import { Exit } from "./Exit";
import { HomeLink } from "./HomeLink";
import { Messages } from "./Messages";
import { Notification } from "./Notification";
import { Settings } from "./Settings";
import { User } from "./User";
import style from './SiteBar.module.css'

export function SiteBarMain() {

    return (
        <section className={style.sitebar}>
            <div className="container">
                <User />
                <nav className={style.nav}>
                    <HomeLink />
                    <Messages />
                    <Notification />
                    <Settings />
                </nav>
                <Exit />
            </div>
        </section>
    );

}