import img from '../../img/user-M.png'
import style from './SiteBar.module.css'

export function User() {

    return (
        <div className={style.user}>
            <a href="#" >
                <img src={img} alt="User" />
            </a>
        </div>
    );

}