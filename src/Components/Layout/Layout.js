import { useState } from "react";
import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SideBarMain } from "../SideBar/SiteBarMain";
import { UserNavigation } from "../UserNavigation/UserNavigation";


export function Layout(){
    const navRef = useRef()
    const searchRef = useRef()
    const [active, setActive] = useState(false)

    
    const setModal = (value) => {
        setActive(value)
    }


    const context = {
        navRef: navRef,
        searchRef: searchRef,
        modal: active,
        setModal: setActive
    }
    // console.log(navRef)

    return(
        <section className='main-content'>
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