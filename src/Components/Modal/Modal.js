import classNames from 'classnames'
import style from './Modal.module.css'
import backDark from '../../img/back-dark.svg'
import { useFetcher } from 'react-router-dom'

export function Modal ({deleteUserState, setDeleteUserState, deleteAccount, submiteUpdates, setActiveModal, activeModal, passwodModal, setPasswordModal,propsErr, setPropsErr}){
    //console.log(propsErr )
    return(
        <div className={activeModal || deleteUserState ? 'modal active-modal' : 'modal'} >
            <div onClick={(e) => {
                e.preventDefault()
                //setClassErr('')
                setDeleteUserState(false)
                setActiveModal(false)
                }} 
            className={classNames(style.exitBtn)}>
                <img className={classNames(style.exitImg)} src={backDark} alt="Back" />
            </div>
            <div className={style.containerModal}>
                <p className={classNames(style.header, 'head-name')}>Enter Your Password</p>
                <input className={propsErr === 'Error in re-authorization' ? classNames(style.input, style.err) : classNames(style.input)} value={passwodModal} onChange={(e) => setPasswordModal(e.target.value)} type="password" />
                <button className={classNames(style.btn, 'head-name')} onClick={(event) => {
                    // if(propsErr === ''){
                    //     setPropsErr('')
                    // }
                    //if(propsErr !== 'Error in re-authorization'){
                        if(deleteUserState && propsErr === ''){
                            //setPasswordModal()
                            deleteAccount()
                            // setDeleteUserState(false)
                            //setActiveModal(false)
                            // setClassErr('')
                        }
                        if(activeModal && propsErr === ''){
                            submiteUpdates(event)
                            //setActiveModal(false)
                            // setClassErr('')
                        }
                    //}
                    
                    
                    
                }}>{deleteUserState ? "Delete" : "Log In"}</button>
            </div>
            
        </div>
    )
}