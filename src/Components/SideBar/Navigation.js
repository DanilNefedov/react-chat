import style from './SideBar.module.css';
import home from '../../img/home.svg';
import notification from '../../img/notification.svg';
import settings from '../../img/settings.svg';
import profile from '../../img/profile.svg'
import { NavLink } from 'react-router-dom';


export function Navigation(){
    return (
        <nav className={style.nav}>
            <div className={style.home}>
                <NavLink to='/home' className={`${style.active} ${style.link}`}>
                    <img src={home} alt="Home" className={style.img} />
                </NavLink>
            </div>
            <div className={style.search}>
                <NavLink href="#" className={style.link}>
                    <img src={profile} alt="Profile" className={style.img} />
                </NavLink>
            </div>
            <div className={style.notification}>
                <NavLink href="#" className={style.link}>
                    <img src={notification} alt="Notification" className={style.img} />
                </NavLink>
            </div>
            <div className={style.settings}>
                <NavLink href="#" className={style.link}>
                    <img src={settings} alt="Settings" className={style.img} />
                </NavLink>
            </div>
        </nav>
    );
}