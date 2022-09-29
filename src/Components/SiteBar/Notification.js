import notification from '../../img/notification.svg';
import style from './SiteBar.module.css'

export function Notification() {

    return (
        <div className={style.notification}>
            <a href="#" className={style.link}>
                <img src={notification} alt="Notification" className={style.img} />
            </a>

        </div>
    )

}