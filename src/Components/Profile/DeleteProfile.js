import style from './Profile.module.css'
import classNames from "classnames"
import deleteAcc from '../../img/delete-acc.svg'


export function DeleteProfile ({setActiveModal, setDeleteUserState}){

    return(
        <div className={classNames(style.containerBtn, "btn-delete")}>
            <img className={classNames(style.iconBtn)} src={deleteAcc} alt="delete" />
            <button onClick={(event) => {
                event.preventDefault()
                setActiveModal(true)
                setDeleteUserState(true)
                
            }}
                className={classNames(style.btnDelete)}>Delete Account</button>
        </div>
    )
}