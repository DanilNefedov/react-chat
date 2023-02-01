import { useState } from "react";
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { SideBarMain } from "../SideBar/SiteBarMain";
import { UserNavigation } from "../UserNavigation/UserNavigation";


export function Layout(){
    const navRef = useRef()
    const searchRef = useRef()


    //console.log(sidebarRef)


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