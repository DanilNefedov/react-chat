import img from '../../img/logo.svg'
import classNames from "classnames";
import style from './SideBar.module.css'


export function Logo(){
    return(
        <div className={classNames(style.logo)}>
            <img src={img} alt="Chat" className={classNames(style.logoImg, 'logo')}/>
        </div>
    )
}