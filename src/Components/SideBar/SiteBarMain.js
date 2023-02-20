import style from './SideBar.module.css'
import { Navigation } from "./Navigation";
import classNames from "classnames";
import { Logo } from "./Logo";
import { useEffect, useRef, useState } from 'react';
import burder from '../../img/burger-menu.svg'
import { useLocation } from 'react-router-dom';

export function SideBarMain() {
    const [activeBurger, setActiveBurger] = useState(false)
    const sidebar = useRef()
    const burgerRef = useRef()
    const logoRef = useRef()
    const location = useLocation().pathname

    useEffect(() =>{
        const onClick = e =>{
            if(e.target === sidebar.current ){
                setActiveBurger(false)
            }  
        }
        if(!activeBurger){
            document.addEventListener('click', onClick);
        }
        return () => document.removeEventListener('click', onClick);
    },[])

    return (
        <>
        {location === '/' || location === '/profile' ? <section ref={burgerRef} onClick={() => setActiveBurger(true)} className={style.burger}>
           <img src={burder} alt="burger menu" />
        </section> : <></>}
        

        <section ref={sidebar} className={activeBurger ? classNames(style.sidebar, style.activeSidebar) :classNames(style.sidebar)}>
            <div  className={classNames(style.container,"container")}>
                <Logo logoRef={logoRef}/>
                <Navigation modalBurger={[activeBurger, setActiveBurger]}/>
            </div>
        </section>
        </>
        
    );
}