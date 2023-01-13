import { useRef } from "react";
import { Outlet } from "react-router-dom";
import { SideBarMain } from "../SideBar/SiteBarMain";
import { UserNavigation } from "../UserNavigation/UserNavigation";


export function Layout(){
    const navRef = useRef()
    // console.log(navRef)

    return(
        <section className='main-content'>
            <SideBarMain/>
            <div className="header-main">
                <UserNavigation innerRef={navRef}/>
                <main className="section-main">
                    <Outlet context={navRef}/>
                </main>
            </div>
        </section>
    );
}