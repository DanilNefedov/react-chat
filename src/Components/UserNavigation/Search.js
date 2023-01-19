import style from './UserNavigation.module.css'
import searchImg from '../../img/search.svg'
import classNames from "classnames";
import { useLocation, useOutletContext } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';

export function Search({setModal, searchRef}){

    return (
        
        <button ref={searchRef} onClick={()=>{setModal(true)}} className={classNames(style.search)}>
            <img className={classNames(style.searchImg)} src={searchImg} alt='Search' />
        </button>

        
    );
}