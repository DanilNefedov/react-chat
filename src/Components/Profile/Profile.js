import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import style from './Profile.module.css'
import { useReducer, useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updateEmail, updateProfile } from "firebase/auth";
import { removePhoto, removeUser } from "../../store/authSlice"
import { deleteDoc, deleteField, doc, getFirestore, updateDoc } from "firebase/firestore"
import { Modal } from "../Modal/Modal"
import { removeFrined } from "../../store/friendSlice"
import { removeMessage } from "../../store/messagesSlice"
import { ModuleError } from "../ModalError/ModalError"
import { ProfilePhoto } from "./ProfilePhoto"
import { DeleteProfile } from "./DeleteProfile"
import { ChangeProfile } from "./ChangeProfile"
import { initialStateModal, reducerModal } from "../../state/modalError";
import { initialStateProfile, reducerProfile } from "../../state/profileModalError";

export default function Profile() {
    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend.friend)
    const [stateModalErr, dispatchStateErr] = useReducer(reducerModal, initialStateModal) 
    const [stateProfile, dispatchStateProfile] = useReducer(reducerProfile, initialStateProfile)
    console.log(stateProfile)
    const auth = getAuth();
    const dispatch = useDispatch()
    const db = getFirestore();

    //const [photo, setPhoto] = useState(null)//prof+
    //const [selectedPhoto, setSelected] = useState(null)//prof+

    //const [name, setName] = useState('')//prof+
    //const [classErr, setClassErr] = useState('')//prof Class for meil + change to boolean
    //const [classErrName, setClassErrName] = useState('')//prof class for name + change to boolean
    //const [activeModal, setActiveModal] = useState(false)//modalForPass - prof +
    //const [deleteUserState, setDeleteUserState] = useState(false)//prof +
    const [email, setEmail] = useState('')//prof+
    const [passwodModal, setPasswordModal] = useState('')//prof

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
                            //setModuleErr(false)
                            dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                            //setPropsErr('')
                        }).catch(() => {
                            //setModuleErr(true)
                            dispatchStateErr({type: 'activeModalWindow', payload: true})
                            dispatchStateErr({type:'errorClassName', payload:'Error in email update'})
                            //setPropsErr('Error in email update')
                        });

                        await updateDoc(doc(db, 'users', user.id), {
                            email: email !== '' ? email : user.email,
                        })
                        setEmail('')
                        dispatchStateProfile({type:'resetSomeField', payload: ['emailClassError', initialStateProfile.emailClassError]})
                    }).catch(() => {
                        dispatchStateProfile({type: 'emailClassError', payload: true})
                    })
                    if(stateProfile.name === ''){
                        dispatchStateProfile({type:'resetSomeField', payload: ['emailClassError', initialStateProfile.emailClassError]})
                    }
                    //setModuleErr(false)
                    dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                    //setPropsErr('')
                    setPasswordModal('')
                    setEmail('')
                    dispatchStateProfile({type: 'modalReAuth', payload: true})
                }).catch(() => {
                    setPasswordModal('')
                    dispatchStateProfile({type:'resetSomeField', payload: ['modalReAuth', initialStateProfile.modalReAuth]})
                    dispatchStateErr({type:'errorClassName', payload:'Error in re-authorization'})
                    //setPropsErr('Error in re-authorization')
                });
            }

            if (stateProfile.photo) {
                //setPhoto(photo)
                //setSelected(null)
                const storage = getStorage();
                const storageRef = ref(storage, `avatar/${user.name}`);
                const uploadTask = uploadBytesResumable(storageRef, stateProfile.photo);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress} % done`);
                        //setModuleErr(false)
                        dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                        //setPropsErr('')
                    },
                    () => {
                        dispatchStateErr({type: 'activeModalWindow', payload: true})
                        //setModuleErr(true)
                        dispatchStateErr({type:'errorClassName', payload:'Error while downloading a file'})
                        //setPropsErr('Error while downloading a file')
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateProfile(auth.currentUser, {
                                photoURL: downloadURL
                            }).then(() => {
                                dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                                //setModuleErr(false)
                                //setPropsErr('')
                                dispatchStateProfile({type:'resetSomeField', payload: ['selectedPhoto', initialStateProfile.selectedPhoto]})
                            }).catch(() => {
                                dispatchStateErr({type: 'activeModalWindow', payload: true})
                                //setModuleErr(true)
                                dispatchStateErr({type:'errorClassName', payload:'Error in photo update'})
                                //setPropsErr('Error in photo update')
                            });

                            await updateDoc(doc(db, 'users', user.id), {
                                photoURL: downloadURL
                            })

                            friend.map(async (el) => {
                                if (el.friendId) {//try catch
                                    await updateDoc(doc(db, 'chatsList', el.friendId), {
                                        [el.id + '.userInfo']: {
                                            id: user.id,
                                            displayName: stateProfile.name !== '' ? stateProfile.name : user.name,
                                            photo: downloadURL
                                        }
                                    })
                                }
                                if (el.friendId === undefined) {
                                    return
                                }
                            })
                            dispatchStateProfile({type:'resetSomeField', payload: ['selectedPhoto', initialStateProfile.selectedPhoto]})
                        });
                        dispatchStateProfile({type:'resetSomeField', payload: ['photo', initialStateProfile.photo]})
                    }
                );
                if(email === ''){
                    dispatchStateProfile({type:'resetSomeField', payload: ['emailClassError', initialStateProfile.emailClassError]})
                }
                if(stateProfile.name === ''){
                    dispatchStateProfile({type:'resetSomeField', payload: ['nameClassError', initialStateProfile.nameClassError]})
                }
                
            }

            if(stateProfile.name.length > 20){
                dispatchStateProfile({type:'nameClassError', payload: true})
                //setClassErrName('errorName')
                if(email === ''){
                    dispatchStateProfile({type:'resetSomeField', payload: ['emailClassError', initialStateProfile.emailClassError]})
                }
            }

            if (stateProfile.name.length <= 20 && stateProfile.name !== '') {
                await updateProfile(auth.currentUser, {
                    displayName: stateProfile.name !== '' ? stateProfile.name : user.name,
                }).then(() => {
                    //setClassErrName('')
                    dispatchStateProfile({type:'resetSomeField', payload: ['nameClassError', initialStateProfile.nameClassError]})
                    
                    dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                    //setModuleErr(false)
                    //setPropsErr('')
                    
                }).catch((error) => {
                    dispatchStateErr({type: 'activeModalWindow', payload: true})
                    //setModuleErr(true)
                    dispatchStateErr({type:'errorClassName', payload:'Error updating name or photo'})
                    //setPropsErr('Error updating name or photo')
                    console.error(error)
                });


                await updateDoc(doc(db, 'users', user.id), {
                    name: stateProfile.name !== '' ? stateProfile.name : user.name,
                })
                friend.map(async (el) => {
                    if (el.friendId) {
                        await updateDoc(doc(db, 'chatsList', el.friendId), {
                            [el.id + '.userInfo']: {
                                id: user.id,
                                displayName: stateProfile.name !== '' ? stateProfile.name : user.name,
                                photo: user.photo
                            }
                        })
                    }
                    if (el.friendId === undefined) {
                        return
                    }
                })
                dispatchStateProfile({type:'resetSomeField', payload: ['emailClassError', initialStateProfile.emailClassError]})
                //setClassErr('')//mb change no for all reset
            }
            dispatchStateErr({type: 'resetModal', payload: initialStateModal})
            dispatchStateProfile({type:'resetSomeField', payload: ['name', initialStateProfile.name]})
            //setModuleErr(false)
        } catch (error) {
            dispatchStateErr({type: 'activeModalWindow', payload: true})
            //setModuleErr(true)
            console.error(error)
        }
        //dispatchStateProfile({type: 'resetProfile', payload: initialStateProfile})
        dispatchStateProfile({type:'resetSomeField', payload: ['name', initialStateProfile.name]})
        dispatchStateProfile({type:'resetSomeField', payload: ['selectedPhoto', initialStateProfile.selectedPhoto]})
        
    }

    const deleteAccount = (event) => {
        event.preventDefault()
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            passwodModal
        )
        reauthenticateWithCredential(user, credential).then(() => {
            dispatchStateProfile({type:"deletedFriend", payload: true})
            //setDeleteUserState(true)
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
                    dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                    //setModuleErr(false)
                }).catch(() => {
                    dispatchStateErr({type: 'activeModalWindow', payload: true})
                    //setModuleErr(true)
                    dispatchStateErr({type:'errorClassName', payload:'Error when logging out of your account'})
                    //setPropsErr('Error when logging out of your account')
                });
                dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                //setModuleErr(false)
                //setPropsErr('')
            }).catch(() => {
                dispatchStateErr({type: 'activeModalWindow', payload: true})
                //setModuleErr(true)
                dispatchStateErr({type:'errorClassName', payload:'Error in time to delete the account'})
                //setPropsErr('Error in time to delete the account')
            });
            //setPropsErr('')
            dispatchStateErr({type: 'resetModal', payload: initialStateModal})
            dispatchStateProfile({type:"deletedFriend", payload: false})
            //setDeleteUserState(false)
        }).catch(() => {
            //setDeleteUserState(true)
            dispatchStateProfile({type:"deletedFriend", payload: true})
            setPasswordModal('')
            dispatchStateErr({type:'errorClassName', payload:'Error in re-authorization'})
            //setPropsErr('Error in re-authorization')
            return
        });
    }
    console.log(stateModalErr)
    return (
        <section className={classNames(style.profile, 'profile')}>
            <div className={classNames(style.container, 'container')}>
                <div className={classNames(style.userInfo, "user-info")}>
                    <div className={classNames(style.containerUserInfo, "container-userInfo")}>

                        <ProfilePhoto stateProfile={stateProfile}></ProfilePhoto>

                        <div className={classNames(style.nameEmail, "name-email")}>
                            <p className={classNames(style.nameUser, "name-user")}>
                                <span className={classNames(style.editAbout, "head-name")}>Name:</span>
                                <span className="header">{user.name}</span>
                            </p>
                            <p className={classNames(style.emailUser, "emailUser header")}>
                                <span className={classNames(style.editAbout, "head-name")}> Email:</span>
                                <span className="header">{user.email}</span>
                            </p>

                            <DeleteProfile stateProfile={dispatchStateProfile}></DeleteProfile>

                        </div>
                    </div>
                </div>

                <div className={classNames(style.editUserInfo, "edit-user-info")}>
                    <div className={classNames(style.containerEditUser, "container")}>
                
                        <ChangeProfile state={[stateModalErr, dispatchStateErr]} email={email} stateProfile={[stateProfile, dispatchStateProfile]} setEmail={setEmail}></ChangeProfile>

                        <div className={classNames(style.updateSection, 'update')}>
                            <button onClick={(event) => {
                                email !== '' ? dispatchStateProfile({type: 'modalReAuth', payload: true}) : submiteUpdates(event)
                            }} className={classNames(style.btnUpdate)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
                            
            <Modal
                state={[stateModalErr, dispatchStateErr]}
                stateProfile = {[stateProfile, dispatchStateProfile]}
                // propsErr={propsErr}
                // setPropsErr={setPropsErr}
                deleteAccount={deleteAccount}
                //setDeleteUserState={setDeleteUserState}
                //deleteUserState={deleteUserState}
                submiteUpdates={submiteUpdates}
                // activeModal={activeModal}
                // setActiveModal={setActiveModal}
                passwodModal={passwodModal}
                setPasswordModal={setPasswordModal}>
            </Modal>
            {stateModalErr.activeModalWindow ? <ModuleError state={[stateModalErr, dispatchStateErr]}></ModuleError> : <></>}
        </section>
    )
}