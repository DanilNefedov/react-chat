import { Outlet } from "react-router-dom";
import { SideBarMain } from "../SideBar/SiteBarMain";


export function Layout(){
    return(
        <section className='main-content'>
            <SideBarMain/>
            <main className="section-main">
                <Outlet/>
            </main>
        </section>
    );
}