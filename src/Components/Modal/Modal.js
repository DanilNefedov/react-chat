import classNames from 'classnames'
import style from './Modal.module.css'
import backDark from '../../img/back-dark.svg'

export function Modal ({deleteUserState, setDeleteUserState, deleteAccount, submiteUpdates, setActiveModal, activeModal, passwodModal, setPasswordModal}){
    return(
        <div className={activeModal || deleteUserState ? 'modal active-modal' : 'modal'} >
            <div onClick={(e) => {
                e.preventDefault()
                setDeleteUserState(false)
                setActiveModal(false)
                }} 
            className={classNames(style.exitBtn)}>
                <img className={classNames(style.exitImg)} src={backDark} alt="Back" />
            </div>
            <div className={style.containerModal}>
                <p className={classNames(style.header, 'head-name')}>Enter Your Password</p>
                <input className={classNames(style.input)} value={passwodModal} onChange={(e) => setPasswordModal(e.target.value)} type="password" />
                <button className={classNames(style.btn, 'head-name')} onClick={(event) => {
                    if(deleteUserState){
                        deleteAccount(event)
                        setDeleteUserState(false)
                        setActiveModal(false)
                    }
                    if(activeModal){
                        submiteUpdates(event)
                        setActiveModal(false)
                    }
                    
                }}>{deleteUserState ? "Delete" : "Log In"}</button>
            </div>
            
        </div>
    )
}