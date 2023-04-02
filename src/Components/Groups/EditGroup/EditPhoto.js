import style from './EditGroup.module.css'
import classNames from "classnames"
import download from '../../../img/add.svg'
import img from '../../../img/user-M.png'
import done from '../../../img/done.svg'


export function EditPhoto ({state, stateGroup}){

    const showPhoto = (e) =>{
        if(window.FileReader){
            stateGroup[1]({type: 'photo', payload: e.target.files[0]})
            const selectedFile = e.target.files[0];
            const reader = new FileReader();
            if(selectedFile && selectedFile.type.match('image.*')){
                reader.onload = function (e) {
                    stateGroup[1]({type: 'selectedPhotoGroup', payload: e.target.result})
                };
                reader.readAsDataURL(selectedFile)
            }
        }
    }

    return(
        <div className={style.photoGroup}>
            <div className={style.photo}>
                {
                    stateGroup[0].selectedPhoto ? <img className={style.photoState} src={stateGroup[0].selectedPhoto} alt="Photo group" />:
                    state.photo ? <img className={style.photoState} src={state.photo} alt="Photo group" /> :
                    <img className={style.photoState} src={img} alt="Photo group" />
                }
               
            </div>
            <div className={style.editPhoto}>
                <img className={classNames( style.iconEdit, style.iconAdd)} src={download} alt="dedit photo" />
                <input id={style.editPhotoGroup} className={style.editPhotoInput} type="file" onChange={(e) => showPhoto(e)} accept='image/*, .png, .jpg, .web' />
                <label className={style.labelPhoto} htmlFor={style.editPhotoGroup}>Edit Photo</label>
                <span className={style.infoPhoto}>*.png, .jpg, .web</span>
                {stateGroup[0].loadPhotoGroup && <span className={style.selecPhoto}><img className={style.imgSelect} src={done} alt="done" /></span>}                
                
            </div>
            
        </div>
    )
}