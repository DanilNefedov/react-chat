import { User } from "./User";
import classNames from "classnames";
import style from './UserNavigation.module.css'
import { Search } from "./Search";
import { useRef } from "react";


export function UserNavigation({innerRef}){
    
    
    return(
        <nav className={classNames(style.userNav, 'user-navigation' )} ref={innerRef}>
            <div className={classNames(style.container, 'container')}>
                <Search/>
                <User/>
            </div>
        </nav>
    )
}