import classNames from 'classnames'
import style from './Modal.module.css'
import backDark from '../../img/back-dark.svg'

export function Modal({ deleteUserState, setDeleteUserState, deleteAccount, submiteUpdates, setActiveModal, activeModal, passwodModal, setPasswordModal, propsErr, setPropsErr }) {

    return (
        <div className={activeModal || deleteUserState ? 'modal active-modal' : 'modal'} >
            <div onClick={(e) => {
                e.preventDefault()
                setPasswordModal('')
                setDeleteUserState(false)
                setActiveModal(false)
                
                if (propsErr === 'Error in re-authorization') {
                    setPropsErr('')
                }
            }}
                className={classNames(style.exitBtn)}>
                <img className={classNames(style.exitImg)} src={backDark} alt="Back" />
            </div>
            <div className={style.containerModal}>
                <p className={classNames(style.header, 'head-name')}>Enter Your Password</p>
                <input className={propsErr === 'Error in re-authorization' ? classNames(style.input, style.err) : classNames(style.input)} value={passwodModal} onChange={(e) => setPasswordModal(e.target.value)} type="password" />
                <button className={classNames(style.btn, 'head-name')} onClick={(event) => {

                    if (deleteUserState) {
                        deleteAccount(event)
                    } else {
                        submiteUpdates(event)
                    }

                }}>{deleteUserState ? "Delete" : "Log In"}</button>
            </div>

        </div>
    )
}