import style from './UserNavigation.module.css'
import searchImg from '../../img/search.svg'
import classNames from "classnames";


export function Search({setActiveModal, searchRefUser}){

    return (
        <button ref={searchRefUser} onClick={() => setActiveModal(true)} className={classNames(style.search)}>
            <img className={classNames(style.searchImg)} src={searchImg} alt='Search' />
        </button>
    );
}