import classNames from "classnames"
import style from './Loader.module.css'



export function Loader (){
    return(
        <div className={classNames(style.loaderSection)}>
            <span className={classNames(style.loader)}></span>
        </div>
    )
}