import { User } from "./User";
import classNames from "classnames";
import style from './UserNavigation.module.css'
import { Search } from "./Search";


export function UserNavigation(){
    return(
        <nav className={classNames(style.userNav, 'user-navigation')}>
            <div className={classNames(style.container, 'container')}>
                
                <User/>
            </div>
        </nav>
    )
}