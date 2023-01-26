import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import style from './Profile.module.css'
import img from '../../img/user-M.png'
import { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updateEmail, updateProfile } from "firebase/auth";
import { removePhoto, removeUser, updateUser } from "../../store/authSlice"
import { deleteDoc, deleteField, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"
import { useEffect } from "react"
import { Modal } from "../Modal/Modal"
import { removeFrined } from "../../store/friendSlice"
import { removeMessage } from "../../store/messagesSlice"
import deleteAcc from '../../img/delete-acc.svg'
import download from '../../img/download.svg'
import edit from '../../img/edit.svg'
import emailImg from '../../img/email.svg'
import addPhoto from '../../img/add.svg'
import { ModuleError } from "../ModuleError/ModuleError"
import { ProfilePhoto } from "./ProfilePhoto"
import { DeleteProfile } from "./DeleteProfile"

export function Profile() {
    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend.friend)
    const auth = getAuth();
    const dispatch = useDispatch()
    const db = getFirestore();

    const [photo, setPhoto] = useState(null)

    const [name, setName] = useState('')

    const [moduleErr, setModuleErr] = useState(false)

    const [deleteUserState, setDeleteUserState] = useState(false)

    const [email, setEmail] = useState('')

    const [activeModal, setActiveModal] = useState(false)
    const [propsErr, setPropsErr] = useState('')
    const [classErr, setClassErr] = useState('')
    const [classErrName, setClassErrName] = useState('')

    const [passwodModal, setPasswordModal] = useState('')

    const submiteUpdates = async (event) => {
        event.preventDefault()

        try {
            if (email !== '') {

                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email,
                    passwodModal
                )
                const reUser = auth.currentUser;

                await reauthenticateWithCredential(reUser, credential).then(async () => {
                    await updateEmail(reUser, email).then(async () => {
                        await updateProfile(auth.currentUser, {
                            email: email !== '' ? email : user.email,
                        }).then(() => {
                            setEmail('')
                            setModuleErr(false)
                            setPropsErr('')
                        }).catch(() => {
                            setModuleErr(true)
                            setPropsErr('Error in email update')
                        });

                        await updateDoc(doc(db, 'users', user.id), {
                            email: email !== '' ? email : user.email,
                        })
                        setEmail('')
                        setClassErr('')
                    }).catch(() => {
                        setClassErr('errorEmail')
                    })
                    setModuleErr(false)
                    setPropsErr('')
                    setPasswordModal('')
                    setEmail('')
                    setActiveModal(false)
                }).catch(() => {
                    setPasswordModal('')
                    setActiveModal(true)
                    setPropsErr('Error in re-authorization')
                });
            }

            if (photo) {
                const storage = getStorage();
                const storageRef = ref(storage, `avatar/${user.name}`);
                const uploadTask = uploadBytesResumable(storageRef, photo);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress} % done`);
                        setModuleErr(false)
                        setPropsErr('')
                    },
                    () => {
                        setModuleErr(true)
                        setPropsErr('Error while downloading a file')
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateProfile(auth.currentUser, {
                                photoURL: downloadURL
                            }).then(() => {
                                setModuleErr(false)
                                setPropsErr('')
                            }).catch(() => {
                                setModuleErr(true)
                                setPropsErr('Error in photo update')
                            });

                            await updateDoc(doc(db, 'users', user.id), {
                                photoURL: downloadURL
                            })

                            friend.map(async (el) => {
                                if (el.friendId) {
                                    await updateDoc(doc(db, 'chatsList', el.friendId), {
                                        [el.id + '.userInfo']: {
                                            id: user.id,
                                            displayName: name !== '' ? name : user.name,
                                            photo: downloadURL
                                        }
                                    })
                                }
                                if (el.friendId === undefined) {
                                    return
                                }
                            })
                        });
                        setPhoto(null)
                    }
                );

            }


            if (name.length <= 20 && name !== '') {
                await updateProfile(auth.currentUser, {
                    displayName: name !== '' ? name : user.name,
                }).then(() => {
                    setClassErrName('')
                    setModuleErr(false)
                    setPropsErr('')
                }).catch((error) => {
                    setModuleErr(true)
                    setPropsErr('Error updating name or photo')
                    console.error(error)
                });


                await updateDoc(doc(db, 'users', user.id), {
                    name: name !== '' ? name : user.name,
                })
                friend.map(async (el) => {
                    if (el.friendId) {
                        await updateDoc(doc(db, 'chatsList', el.friendId), {
                            [el.id + '.userInfo']: {
                                id: user.id,
                                displayName: name !== '' ? name : user.name,
                                photo: user.photo
                            }
                        })
                    }
                    if (el.friendId === undefined) {
                        return
                    }
                })
            }
            setModuleErr(false)
            setName('')
        } catch (error) {
            setModuleErr(true)
            console.error(error)
        }
        setName('')
    }

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
                    await updateDoc(doc(db, 'chatsList', el.friendId), {
                        [el.id + '.userInfo']: {
                            id: user.id,
                            displayName: name !== '' ? name : user.name,
                            photo: null
                        }
                    })
                })
                setModuleErr(false)
                setPropsErr('')
            }).catch(() => {
                setModuleErr(true)
                setPropsErr('Error during photo deletion')
            });
        }
    }

    const deleteAccount = (event) => {
        event.preventDefault()
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            passwodModal
        )
        reauthenticateWithCredential(user, credential).then(() => {
            setDeleteUserState(true)
            deleteUser(user).then(async () => {
                await deleteDoc(doc(db, "users", user.uid));

                friend.map(async el => {
                    await updateDoc(doc(db, 'chatsList', user.uid), {
                        [el.id]: deleteField(),
                        acc: 'deleted'
                    });
                })

                friend.map(async el => {
                    await updateDoc(doc(db, 'chatsList', el.friendId), {
                        [el.id + '.userInfo']: {
                            photo: null,
                            displayName: 'Deleted',
                            acc: 'deleted'
                        },
                    });
                })

                signOut(auth).then(() => {
                    dispatch(removeUser())
                    dispatch(removeFrined())
                    dispatch(removeMessage())
                    setModuleErr(false)
                }).catch(() => {
                    setModuleErr(true)
                    setPropsErr('Error when logging out of your account')
                });
                setModuleErr(false)
                setPropsErr('')
            }).catch(() => {
                setModuleErr(true)
                setPropsErr('Error in time to delete the account')
            });
            setPropsErr('')
            setDeleteUserState(false)
        }).catch(() => {
            setDeleteUserState(true)
            setPasswordModal('')
            setPropsErr('Error in re-authorization')
            return
        });
    }
    return (
        <section className={classNames(style.profile, 'profile')}>
            <div className={classNames(style.container, 'container')}>
                <div className={classNames(style.userInfo, "user-info")}>
                    <div className={classNames(style.containerUserInfo, "container-userInfo")}>
                        {/* {user.photo ?
                            <div className={classNames(style.photoSection, 'photo')}>
                                <div className={classNames(style.userPhoto, "user-photo")}>
                                    <img src={user.photo} alt="user" />
                                </div>
                            </div>
                            :
                            <div className={classNames(style.photoSection, 'photo')}>
                                <div className={classNames(style.userPhoto, "user-photo")}>
                                    <img src={img} alt="user" />
                                </div>
                            </div>
                        } */}
                        <ProfilePhoto></ProfilePhoto>
                        <div className={classNames(style.nameEmail, "name-email")}>
                            <p className={classNames(style.nameUser, "name-user")}>
                                <span className={classNames(style.editAbout, "head-name")}>Name:</span>
                                <span className="header">{user.name}</span>
                            </p>
                            <p className={classNames(style.emailUser, "emailUser header")}>
                                <span className={classNames(style.editAbout, "head-name")}> Email:</span>
                                <span className="header">{user.email}</span>
                            </p>
                            {/* <div className={classNames(style.containerBtn, "btn-delete")}>
                                <img className={classNames(style.iconBtn)} src={deleteAcc} alt="delete" />
                                <button onClick={(event) => {
                                    event.preventDefault()
                                    setActiveModal(true)
                                    setDeleteUserState(true)
                                }}
                                    className={classNames(style.btnDelete)}>Delete Account</button>
                            </div> */}
                            <DeleteProfile setActiveModal={setActiveModal} setDeleteUserState={setDeleteUserState}></DeleteProfile>
                        </div>
                    </div>
                </div>

                <div className={classNames(style.editUserInfo, "edit-user-info")}>
                    <div className={classNames(style.containerEditUser, "container")}>
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
                        <div className={classNames(style.updateSection, 'update')}>
                            <button onClick={(event) => {
                                email !== '' ? setActiveModal(true) : submiteUpdates(event)
                            }} className={classNames(style.btnUpdate)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                propsErr={propsErr}
                setPropsErr={setPropsErr}
                deleteAccount={deleteAccount}
                setDeleteUserState={setDeleteUserState}
                deleteUserState={deleteUserState}
                submiteUpdates={submiteUpdates}
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                passwodModal={passwodModal}
                setPasswordModal={setPasswordModal}>
            </Modal>
            {moduleErr ? <ModuleError propsErr={propsErr} setModuleErr={setModuleErr}></ModuleError> : <></>}
        </section>
    )
}