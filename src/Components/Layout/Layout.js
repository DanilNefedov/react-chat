import { Outlet } from "react-router-dom";
import { SiteBarMain } from "../SiteBar/SiteBarMain";


export function Layout(){
    return(
        <section className='main-content'>
            <SiteBarMain/>
            <main className="section-main">
                <Outlet/>
            </main>
        </section>
    );
}