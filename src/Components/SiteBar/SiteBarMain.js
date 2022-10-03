import { Exit } from "./Exit";
import { User } from "./User";
import style from './SiteBar.module.css'
import { Navigation } from "./Navigation";

export function SiteBarMain() {

    return (
        <section className={style.sitebar}>
            <div className="container">
                <User />
                <Navigation/>
                <Exit />
            </div>
        </section>
    );
}