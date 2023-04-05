import style from './Profile.module.css'
import classNames from "classnames"
import download from '../../img/download.svg'
import deleteAcc from '../../img/delete-acc.svg'
import addPhoto from '../../img/add.svg'
import edit from '../../img/edit.svg'
import emailImg from '../../img/email.svg'
import { useDispatch, useSelector } from 'react-redux'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { removePhoto } from '../../store/authSlice'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { getAuth, updateProfile } from 'firebase/auth'
import done from '../../img/done.svg'
import { initialStateModal } from '../../state/modalError'
import { initialStateProfile } from '../../state/profileModalError'

export function ChangeProfile ({ state, stateProfile}){
    const group = useSelector(state => state.group.group)
    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend.friend)
    const dispatch = useDispatch()
    const db = getFirestore();
    const auth = getAuth();

    const deletePhoto = (e) => {
        e.preventDefault()
        if (user.photo !== null) {
            const storage = getStorage();
            const desertRef = ref(storage, user.photo);

            deleteObject(desertRef).then(async () => {
                
                await updateDoc(doc(db, 'users', user.id), {
                    photoURL: null
                })

                await updateProfile(auth.currentUser, {
                    photoURL: ''
                }).then(() => {
                    state[1]({type: 'resetModal', payload: initialStateModal})
                    dispatch(removePhoto())
                }).catch(() => {
                    state[1]({type: 'activeModalWindow', payload: true})
                    state[1]({type:'errorClassName', payload:'Error during photo deletion'})
                });
                group.map(async el => {
                    const docSnap = await getDoc(doc(db, 'chats', el.id));
                    
                    if (docSnap.exists()){
                        const array = docSnap.data().messages;
                        const updatedArray = array.map((element) =>{
                            if (element.userId === user.id) {
                                element.photo = null
                                return { ...element};
                            }else{
                                return element;
                            }
                        })
            
                        await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                    }
                })
                friend.map(async (el) => {
                    try{
                        await updateDoc(doc(db, 'chatsList', el.friendId), {
                            [el.id + '.photo' ]: {
                                photo: null
                            }
                        })
                    }catch{
                        return
                    }
                })
                state[1]({type: 'resetModal', payload: initialStateModal})
            }).catch(() => {
                state[1]({type: 'activeModalWindow', payload: true})
                state[1]({type:'errorClassName', payload:'Error during photo deletion'})
            });
        }
        if(stateProfile[0].email === ''){
            stateProfile[1]({type:'emailClassError', payload: initialStateProfile.emailClassError})
        }
        if(stateProfile[0].name === ''){
            stateProfile[1]({type:'nameClassError', payload: initialStateProfile.nameClassError})
        }
    }
    const showPhoto = (e) =>{
        if(window.FileReader){
            stateProfile[1]({type: 'setPhoto', payload: e.target.files[0]})
            const selectedFile = e.target.files[0];
            const reader = new FileReader();
            if(selectedFile && selectedFile.type.match('image.*')){
                reader.onload = function (e) {
                    stateProfile[1]({type: 'selectedPhoto', payload: e.target.result})
                };
                reader.readAsDataURL(selectedFile)
            }
        }
    }
    
    return(
        <>
        {user.photo ?
            <>
                <div className={classNames(style.editPhoto, "edit-photo")}>
                    <img className={classNames(style.iconBtn)} src={download} alt="download" />
                    <label className={style.downloadImg} htmlFor={style.loadPhoto}>Edit Photo</label>
                    <input id={style.loadPhoto} type="file" onChange={(e) => showPhoto(e)} accept='image/*, .png, .jpg, .web' />
                    {stateProfile[0].selectedPhoto ?
                        <span className={classNames(style.selected)}><img src={done} alt="done" /></span> :
                        <></>
                    }
                    <span className={style.infoSize}>*.png, .jpg, .web</span>
                </div>
                <div className={classNames(style.deletePhoto, "delete-photo")}>
                    <img className={classNames(style.iconBtn)} src={deleteAcc} alt="delete" />
                    <button onClick={e => deletePhoto(e)} className={classNames(style.btnDelete, "delete")}>Delete Photo</button>
                </div>
            </>
            :
            <div className={classNames(style.editPhoto, "edit-photo")}>
                <img className={classNames(style.iconBtn)} src={addPhoto} alt="add" />
                <label className={style.downloadImg} htmlFor={style.loadPhoto}>Add Photo</label>
                <input id={style.loadPhoto} type="file" onChange={(e) => showPhoto(e)} accept='image/*, .png, .jpg, .web' />
                {stateProfile[0].selectedPhoto ?
                    <span className={classNames(style.selected)}><img src={done} alt="done" /></span> :
                    <></>
                }
                <span className={style.infoSize}>*.png, .jpg, .web</span>
            </div>
        }
        <div className={classNames(style.nameSection, 'name')}>
            <img className={classNames(style.iconBtn)} src={edit} alt="edit" />
            <span className={classNames(style.editField, 'head-name')}>Edit Name: </span>
            <input value={stateProfile[0].name} onChange={(e) => {
                if(e.target.value.trim().length > 0){
                    stateProfile[1]({type: 'setName', payload: e.target.value})
                }else{
                    stateProfile[1]({type: 'setName', payload: initialStateProfile.name})
                }
                }} placeholder="Enter name" type="text" className={stateProfile[0].nameClassError ? classNames('edit-field', style.editName, style.err) : classNames('edit-field', style.editName)} />
            <span className={style.infoSize}>*name length no more than 20 characters</span>
        </div>
        <div className={classNames(style.emailSection, "email")}>
            <img className={classNames(style.iconBtn)} src={emailImg} alt="edit" />
            <span className={classNames(style.editField, 'head-name')}>Edit Email: </span>
            <input value={stateProfile[0].email} onChange={(e) => stateProfile[1]({type: 'setEmail', payload: (e.target.value)})} placeholder="Enter email" type="email" className={stateProfile[0].emailClassError ? classNames('edit-field', style.editEmail, style.err) : classNames('edit-field', style.editEmail)} />
        </div>
        </>
    )
}