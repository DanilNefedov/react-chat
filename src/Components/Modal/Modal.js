import classNames from 'classnames'
import style from './Modal.module.css'
import backDark from '../../img/back-dark.svg'
import { initialStateModal } from '../../state/modalError'
import { initialStateProfile } from '../../state/profileModalError'

export function Modal({stateProfile, deleteAccount, submiteUpdates, state }) {

    return (
        <div className={stateProfile[0].modalReAuth || stateProfile[0].deletedFriend ? 'modal active-modal' : 'modal'} >
            <div onClick={(e) => {
                e.preventDefault()
                stateProfile[1]({type:'passwordModalReAuth', payload:  initialStateProfile.passwordModalReAuth})
                stateProfile[1]({type:"deletedFriend", payload: false})
                stateProfile[1]({type: 'modalReAuth', payload: false})
                
                if (state[0].informationAboutError === 'Error in re-authorization') {
                    state[1]({type:'resetModal', payload:initialStateModal})
                }
            }}
                className={classNames(style.exitBtn)}>
                <img className={classNames(style.exitImg)} src={backDark} alt="Back" />
            </div>
            <div className={style.containerModal}>
                <p className={classNames(style.header, 'head-name')}>Enter Your Password</p>
                <input className={state[0].informationAboutError  === 'Error in re-authorization' ? classNames(style.input, style.err) : classNames(style.input)} value={stateProfile[0].passwordModalReAuth} onChange={(e) => stateProfile[1]({type:'passwordModalReAuth', payload: (e.target.value)})} type="password" />
                <button className={classNames(style.btn, 'head-name')} onClick={(event) => {

                    if (stateProfile[0].deletedFriend) {
                        deleteAccount(event)
                    } else {
                        submiteUpdates(event)
                    }

                }}>{stateProfile[0].deletedFriend ? "Delete" : "Log In"}</button>
            </div>

        </div>
    )
}