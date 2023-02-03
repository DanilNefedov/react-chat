import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import useResizeObserver from "use-resize-observer";
import { SideBarMain } from "../SideBar/SiteBarMain";
import { UserNavigation } from "../UserNavigation/UserNavigation";


export function Layout(){
    const navRef = useRef()
    const searchRef = useRef()
    const changeHeight = useRef()
   // const {ref, widht = 0, height = 0} = useResizeObserver()

    //console.log(ref)

    const [active, setActive] = useState(false)

    // useEffect(() => {
    //     const htmlElement = document.documentElement;
    //     const bodyElement = document.body
    //     const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //     const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    //     htmlElement.style.cssText = `width: ${w}px; height: ${h}px`
    //     bodyElement.style.cssText = `width: ${w}px; height: ${h}px`
    // },[window.visualViewport.height])
    
    const setModal = (value) => {
        setActive(value)
    }

    const context = {
        navRef: navRef,
        searchRef: searchRef,
        modal: active,
        setModal: setActive,
        height:changeHeight
    }




    return(
        <section ref={changeHeight} className='main-content'>
            <SideBarMain infoClick={context}/>
            <div className="header-main">
                <UserNavigation innerRef={navRef} setModal={setModal} searchRef={searchRef}/>
                <main className="section-main">
                    <Outlet context={context} />
                </main>
            </div>
        </section>
    );
}