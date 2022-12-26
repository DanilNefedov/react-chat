import classNames from 'classnames'
import style from './Modal.module.css'

export function Modal ({submiteUpdates, setActiveModal, activeModal, passwodModal, setPasswordModal}){
    return(
        <div className={activeModal ? 'modal active-modal' : 'modal'} >
            <div className={style.containerModal}>
                <p className={classNames(style.header, 'head-name')}>Enter Your Password</p>
                <input className={classNames(style.input)} value={passwodModal} onChange={(e) => setPasswordModal(e.target.value)} type="password" />
                <button className={classNames(style.btn, 'head-name')} onClick={(event) => {
                    submiteUpdates(event)
                    setActiveModal(false)
                    }}>Log In</button>
            </div>
            
        </div>
    )
}