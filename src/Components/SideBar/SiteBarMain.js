import { Exit } from "./Exit";
import { User } from "./User";
import style from './SideBar.module.css'
import { Navigation } from "./Navigation";
import classNames from "classnames";

export function SideBarMain() {
    
    return (
        <section className={style.sidebar}>
            <div className={classNames(style.container,"container")}>
                <User />
                <Navigation/>
                <Exit />
            </div>
        </section>
    );
}