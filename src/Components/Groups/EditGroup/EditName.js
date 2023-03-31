import style from './EditGroup.module.css'
import edit from '../../../img/edit.svg'
import classNames from "classnames"


export function EditName({state, stateGroup}){

    return(
        <div className={style.nameGroup}>
            <img className={style.iconEdit} src={edit} alt="edit name" />
            <input className={stateGroup[0].lengthNameErr ? classNames(style.inputName, style.errorName) : style.inputName} type="text" placeholder={state.name} onChange={(e) => {
                if(e.target.value.trim().length > 0 ){
                    stateGroup[1]({type:'name', payload: e.target.value.trim()})
                }
            }}/>
            <span className={style.aboutName}>*name length no more than 20 characters</span>
        </div>
    )
}