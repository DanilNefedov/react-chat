import classNames from 'classnames'
import style from './ModalError.module.css'
import img from '../../img/close.svg'
import { initialStateModal } from '../../state/modalError'


export function ModuleError ({state}){
    return(
        <div className={classNames( style.err, 'module-err')}>
            <p>
                {state[0].informationAboutError !== '' && state[0].informationAboutError ? state[0].informationAboutError : "Something's wrong." }<br />
                Reload the page or try again later
            </p>   
            <button onClick={(e) => {
                e.preventDefault()
                state[1]({type:'resetModal', payload:initialStateModal})
            }} className={classNames(style.btn, 'module-err-btn')}>
                <img src={img} alt="back" />
            </button> 
        </div>
    )
}