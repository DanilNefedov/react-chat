import classNames from 'classnames'
import style from './ModuleError.module.css'
import img from '../../img/close.svg'


export function ModuleError ({setModuleErr, propsErr}){
    return(
        <div className={classNames( style.err, 'module-err')}>
            <p>
                {propsErr !== '' && propsErr ? propsErr : "Something's wrong." }<br />
                Reload the page or try again later
            </p>   
            <button onClick={(e) => {
                e.preventDefault()
                setModuleErr(false)
            }} className={classNames(style.btn, 'module-err-btn')}>
                <img src={img} alt="back" />
            </button> 
        </div>
    )
}