import settings from '../../img/settings.svg';
import style from './SiteBar.module.css'

export function Settings() {

    return (
        <div className={style.settings}>
            <a href="#" className={style.link}>
                <img src={settings} alt="Settings" className={style.img} />
            </a>
        </div>
    )

}