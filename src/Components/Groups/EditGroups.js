import style from './Groups.module.css'
import classNames from 'classnames';
import img from '../../img/group-av.png'
import download from '../../img/download.svg'
import addUsers from '../../img/add.svg'
import { useState } from 'react';


export function EditGroups({addGroup, state, active}) {
    // const [activeContacts, setActiveContacs] = useState(false)
    // console.log(state)

    const showPhoto = (e) =>{
        // photo[1]('w')
        //e.preventDefault()
        if(window.FileReader){
            state[1]({type: 'photo', payload: e.target.files[0]})//отдельный стейт
            const selectedFile = e.target.files[0];
            //photo[1](selectedFile)
            const reader = new FileReader();
            if(selectedFile && selectedFile.type.match('image.*')){
                reader.onload = function (e) {
                    state[1]({type: 'photo', payload: e.target.result})
                    // photo[1](e.target.result)
                };
                reader.readAsDataURL(selectedFile)
            }
        }
    }

    return(
        <div className={style.groupParams}>
            <div className={style.containerEdit}>
                <div className={style.photoEdit}>
                    <div className={style.photoGroup}>
                        {state[0].photo !== null ? <img src={state[0].photo} alt="Photo group" /> : <img src={img} alt="Photo group" />}
                        {/* <img src={img} alt="Photo group" /> */}
                    </div>
                    <div className={style.edit}>
                        <img className={classNames(style.iconBtn)} src={download} alt="download" />
                        <input onChange={(e) => showPhoto(e)} type="file" id={style.fileGroup} accept='image/*, .png, .jpg, .web'/>
                        <label className={style.choiceFile} htmlFor={style.fileGroup}>Add photo</label>
                        <span className={style.infoSize}>*.png, .jpg, .web</span>
                    </div>
                </div>
                <div className={style.addUsers}>
                    <span className={style.blockAddUsersImg}><img src={addUsers} alt="Add Users" /></span>
                    <p onClick={() => active(true)} className={style.btnAddUsers}>Add Users</p>
                </div>
                <div className={style.nameEdit}>
                    <p className={style.nameGroup}>Add name: </p>
                    <input value={state[0].name} onChange={(e) => {
                        if(e.target.value.trim().length > 20){
                            console.log('name length')
                        }else{
                            state[1]({type:'name', payload:e.target.value})
                        }
                    }}type="text" id={style.nameEdit} placeholder='enter name group'/>
                    <label className={style.enterName} htmlFor={style.nameEdit}></label>
                    <span className={style.infoSize}>*name length no more than 20 characters</span>
                </div>
                <div className={style.btnAdd}>
                    <button onClick={() => addGroup()} type='submit' value='Submit'>Create</button>
                </div>
            </div>
            
        </div>
    )
}