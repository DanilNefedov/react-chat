import style from './Profile.module.css'
import classNames from "classnames"
import download from '../../img/download.svg'
import deleteAcc from '../../img/delete-acc.svg'
import addPhoto from '../../img/add.svg'
import edit from '../../img/edit.svg'
import emailImg from '../../img/email.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { updateUser } from '../../store/authSlice'

export function ChangeProfile ({setPhoto, deletePhoto, setEmail, setName, name, classErrName, classErr, email}){

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const db = getFirestore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", user.id), (doc) => {
            const data = doc.data()
            if (data) {
                const name = data.name
                const photo = data.photoURL
                const email = data.email
                dispatch(updateUser({ name, photo, email }))
            }
        });
        return () => {
            unsub()
        }
    }, [user.name, user.photoURL, user.email])


    return(
        <>
        {user.photo ?
            <>
                <div className={classNames(style.editPhoto, "edit-photo")}>
                    <img className={classNames(style.iconBtn)} src={download} alt="download" />
                    <label className={style.downloadImg} htmlFor={style.loadPhoto}>Edit Photo</label>
                    <input id={style.loadPhoto} type="file" onChange={(e) => setPhoto(e.target.files[0])} accept='image/*, .png, .jpg, .web' />
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
                <label className={style.downloadImg} htmlFor={style.loadPhoto}>Download Photo</label>
                <input id={style.loadPhoto} type="file" onChange={(e) => setPhoto(e.target.files[0])} accept='image/*, .png, .jpg, .web' />
                <span className={style.infoSize}>*.png, .jpg, .web</span>
            </div>
        }
        <div className={classNames(style.nameSection, 'name')}>
            <img className={classNames(style.iconBtn)} src={edit} alt="edit" />
            <span className={classNames(style.editField, 'head-name')}>Edit Name: </span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" type="text" className={classErrName === 'errorName' ? classNames('edit-field', style.editName, style.err) : classNames('edit-field', style.editName)} />
            <span className={style.infoSize}>*name length no more than 20 characters</span>
        </div>
        <div className={classNames(style.emailSection, "email")}>
            <img className={classNames(style.iconBtn)} src={emailImg} alt="edit" />
            <span className={classNames(style.editField, 'head-name')}>Edit Email: </span>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" type="email" className={classErr === 'errorEmail' ? classNames('edit-field', style.editEmail, style.err) : classNames('edit-field', style.editEmail)} />
        </div>
        </>
    )
}