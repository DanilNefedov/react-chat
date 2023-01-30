import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import style from './Profile.module.css'
import { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updateEmail, updateProfile } from "firebase/auth";
import { removePhoto, removeUser } from "../../store/authSlice"
import { deleteDoc, deleteField, doc, getFirestore, updateDoc } from "firebase/firestore"
import { Modal } from "../Modal/Modal"
import { removeFrined } from "../../store/friendSlice"
import { removeMessage } from "../../store/messagesSlice"
import { ModuleError } from "../ModuleError/ModuleError"
import { ProfilePhoto } from "./ProfilePhoto"
import { DeleteProfile } from "./DeleteProfile"
import { ChangeProfile } from "./ChangeProfile"

export default function Profile() {
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
                    if(name === ''){
                        setClassErrName('')
                    }
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
                if(email === ''){
                    setClassErr('')
                }
                if(name === ''){
                    setClassErrName('')
                }
            }

            if(name.length > 20){
                setClassErrName('errorName')
                if(email === ''){
                    setClassErr('')
                }
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
                setClassErr('')
            }
            
            setModuleErr(false)
            setName('')
        } catch (error) {
            setModuleErr(true)
            console.error(error)
        }
        setName('')
    }

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
        if(email === ''){
            setClassErr('')
        }
        if(name === ''){
            setClassErrName('')
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

                            <DeleteProfile setActiveModal={setActiveModal} setDeleteUserState={setDeleteUserState}></DeleteProfile>

                        </div>
                    </div>
                </div>

                <div className={classNames(style.editUserInfo, "edit-user-info")}>
                    <div className={classNames(style.containerEditUser, "container")}>
                
                        <ChangeProfile email={email} classErr={classErr} classErrName={classErrName} name={name} setPhoto={setPhoto} deletePhoto={deletePhoto} setName={setName} setEmail={setEmail}></ChangeProfile>

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