import exit from '../../img/exit.svg'
import style from './SiteBar.module.css'

export function Exit() {
    return (
        <div className={style.exit}>
            <a href="#" className={style.exitLink}>
                <img src={exit} alt="Exit" />
            </a>
        </div>
    );

}