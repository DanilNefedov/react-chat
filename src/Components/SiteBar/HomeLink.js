import home from '../../img/home.svg'
import style from './SiteBar.module.css'

export function HomeLink() {

    return (
        <div className={style.home}>
            <a href="#" className={`${style.active} ${style.link}`}>
                <img src={home} alt="Home" className={style.img} />
            </a>
        </div>
    );

}