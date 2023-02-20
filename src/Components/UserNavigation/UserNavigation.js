import { User } from "./User";
import classNames from "classnames";
import style from './UserNavigation.module.css'
import { Search } from "./Search";
import { useLocation } from "react-router-dom";


export function UserNavigation({innerRef, searchRefUser, setActiveModal}){
    const location = useLocation()
    const locationName = location.pathname
    
    return(
        <nav className={classNames(style.userNav, 'user-navigation' )} ref={innerRef}>
            <div className={classNames(style.container, 'container')}>
                {
                locationName === '/' ? <Search setActiveModal={setActiveModal} searchRefUser={searchRefUser}/> : <></>  
                }
                <User/>
            </div>
        </nav>
    )
}