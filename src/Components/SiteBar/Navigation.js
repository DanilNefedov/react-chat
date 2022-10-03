import style from './SiteBar.module.css';
import messages from '../../img/messages.svg';
import home from '../../img/home.svg';
import notification from '../../img/notification.svg';
import settings from '../../img/settings.svg';
import { NavLink } from 'react-router-dom';


export function Navigation(){
    return (
        <nav className={style.nav}>
            <div className={style.home}>
                <NavLink to='/' className={`${style.active} ${style.link}`}>
                    <img src={home} alt="Home" className={style.img} />
                </NavLink>
            </div>
            <div className={style.messages}>
                <NavLink to="/messages" className={style.link}>
                    <img src={messages} alt="Messages" className={style.img} />
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