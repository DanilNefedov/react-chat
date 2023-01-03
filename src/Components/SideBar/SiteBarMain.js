import { User } from "./User";
import style from './SideBar.module.css'
import { Navigation } from "./Navigation";
import classNames from "classnames";
import { Logo } from "./Logo";

export function SideBarMain() {
    
    return (
        <section className={style.sidebar}>
            <div className={classNames(style.container,"container")}>
                <Logo/>
                {/* <User /> */}
                <Navigation/>
                {/* <Exit /> */}
            </div>
        </section>
    );
}