import { Outlet } from "react-router-dom";
import { SideBarMain } from "../SideBar/SiteBarMain";
import { UserNavigation } from "../UserNavigation/UserNavigation";


export function Layout(){
    return(
        <section className='main-content'>
            <SideBarMain/>
            <div className="header-main">
                <UserNavigation/>
                <main className="section-main">
                    <Outlet/>
                </main>
            </div>
        </section>
    );
}