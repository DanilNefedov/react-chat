import { useRef } from "react";
import { Outlet,  } from "react-router-dom";
import { SideBarMain } from "../SideBar/SiteBarMain";


export function Layout(){
    const changeHeight = useRef()

    const context = {
        height:changeHeight
    }

    return(
        <section ref={changeHeight} className='main-content'>
            <SideBarMain/>
            <div className="header-main">
                <main className="section-main">
                    <Outlet context={context} />
                </main>
            </div>
        </section>
    );
}