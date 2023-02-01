import style from './SideBar.module.css'
import { Navigation } from "./Navigation";
import classNames from "classnames";
import { Logo } from "./Logo";
import { useRef } from 'react';

export function SideBarMain({ infoClick}) {

    return (
        <section className={style.sidebar}>
            <div className={classNames(style.container,"container")}>
                <Logo/>
                <Navigation infoClick={infoClick}/>
            </div>
        </section>
    );
}