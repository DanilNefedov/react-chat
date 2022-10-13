import { Exit } from "./Exit";
import { User } from "./User";
import style from './SideBar.module.css'
import { Navigation } from "./Navigation";

export function SideBarMain() {

    return (
        <section className={style.sidebar}>
            <div className="container">
                <User />
                <Navigation/>
                <Exit />
            </div>
        </section>
    );
}