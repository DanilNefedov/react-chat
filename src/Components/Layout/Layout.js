import { useState } from "react";
import { useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SideBarMain } from "../SideBar/SiteBarMain";
import { UserNavigation } from "../UserNavigation/UserNavigation";


export function Layout(){
    //const navRef = useRef()
    //const searchRef = useRef()
    const changeHeight = useRef()

    const context = {//chang
        height:changeHeight
    }

    return(
        <section ref={changeHeight} className='main-content'>
            <SideBarMain/>
            <div className="header-main">
                {/* <UserNavigation innerRef={navRef} setModal={setActive} searchRef={searchRef}/> */}
                <main className="section-main">
                    <Outlet context={context} />
                </main>
            </div>
        </section>
    );
}