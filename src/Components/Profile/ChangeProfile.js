import style from './Profile.module.css'
import classNames from "classnames"
import download from '../../img/download.svg'
import deleteAcc from '../../img/delete-acc.svg'
import addPhoto from '../../img/add.svg'
import edit from '../../img/edit.svg'
import emailImg from '../../img/email.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { doc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore'
import { removePhoto, updateUser } from '../../store/authSlice'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { getAuth, updateProfile } from 'firebase/auth'
import done from '../../img/done.svg'

export function ChangeProfile ({setSelected, selectedPhoto, setClassErrName, setClassErr, setModuleErr, setPropsErr, email, classErr, classErrName, name, setPhoto, setName, setEmail}){

    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend.friend)
    const dispatch = useDispatch()
    const db = getFirestore();
    const auth = getAuth();
    //const [selectedPhoto, setSelected] = useState(null)

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


    const deletePhoto = (e) => {
        e.preventDefault()
        if (user.photo !== null) {
            const storage = getStorage();
            const desertRef = ref(storage, user.photo);

            deleteObject(desertRef).then(async () => {
                dispatch(removePhoto())
                await updateDoc(doc(db, 'users', user.id), {
                    photoURL: null
                })

                await updateProfile(auth.currentUser, {
                    photoURL: ''
                }).then(() => {
                    setPropsErr('')
                    setModuleErr(false)

                }).catch(() => {
                    setModuleErr(true)
                    setPropsErr('Error during photo deletion')
                });

                friend.map(async (el) => {
                    //console.log(friend)
                    try{
                        await updateDoc(doc(db, 'chatsList', el.friendId), {
                            [el.id + '.userInfo']: {
                                id: user.id,
                                displayName: name !== '' ? name : user.name,
                                photo: null
                            }
                        })
                    }catch{
                        return
                    }
                })
                setModuleErr(false)
                setPropsErr('')
            }).catch(() => {
                setModuleErr(true)
                setPropsErr('Error during photo deletion')
            });
        }
        if(email === ''){
            setClassErr('')
        }
        if(name === ''){
            setClassErrName('')
        }
    }
    const showPhoto = (e) =>{
        setPhoto(e.target.files[0]);
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            //setPhoto(e.target.result);
            setSelected(e.target.result)
        };
        reader.readAsDataURL(selectedFile);
        //setSelected(true)
    }
    //console.log(selectedPhoto)
    return(
        <>
        {user.photo ?
            <>
                <div className={classNames(style.editPhoto, "edit-photo")}>
                    <img className={classNames(style.iconBtn)} src={download} alt="download" />
                    <label className={style.downloadImg} htmlFor={style.loadPhoto}>Edit Photo</label>
                    <input id={style.loadPhoto} type="file" onChange={(e) => showPhoto(e)} accept='image/*, .png, .jpg, .web' />
                    {selectedPhoto ?
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
                <label className={style.downloadImg} htmlFor={style.loadPhoto}>Download Photo</label>
                <input id={style.loadPhoto} type="file" onChange={(e) => showPhoto(e)} accept='image/*, .png, .jpg, .web' />
                {selectedPhoto ?
                    <span className={classNames(style.selected)}><img src={done} alt="done" /></span> :
                    <></>
                }
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