import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import style from './Profile.module.css'
import { useReducer, useRef, useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updateEmail, updateProfile } from "firebase/auth";
import { removeUser } from "../../store/authSlice"
import { deleteDoc, deleteField, doc, getFirestore, updateDoc } from "firebase/firestore"
import { Modal } from "../Modal/Modal"
import { removeFrined } from "../../store/friendSlice"
import { removeMessage } from "../../store/messagesSlice"
import { ModuleError } from "../ModalError/ModalError"
import { ProfilePhoto } from "./ProfilePhoto"
import { DeleteProfile } from "./DeleteProfile"
import { ChangeProfile } from "./ChangeProfile"
import { initialStateProfile, reducerProfile } from "../../state/profileModalError";
import { Loader } from "../Loader/Loader";
import { initialStateModal, reducerModal } from "../../state/modalError";
import { UserNavigation } from "../UserNavigation/UserNavigation";
import { useNavigate } from "react-router-dom";
import back from '../../img/back-dark.svg'

export default function Profile() {
    const navRef = useRef()
    const searchRef = useRef()
    const navigate = useNavigate()


    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend.friend)
    const [stateModalErr, dispatchStateErr] = useReducer(reducerModal, initialStateModal)
    const [stateProfile, dispatchStateProfile] = useReducer(reducerProfile, initialStateProfile)
    const auth = getAuth();
    const dispatch = useDispatch()
    const db = getFirestore();

    const submiteUpdates = async (event) => {
        event.preventDefault()

        try {
            if (stateProfile.email !== '') {
                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email,
                    stateProfile.passwordModalReAuth
                )
                const reUser = auth.currentUser;

                await reauthenticateWithCredential(reUser, credential).then(async () => {
                    await updateEmail(reUser, stateProfile.email).then(async () => {
                        await updateProfile(auth.currentUser, {
                            email: stateProfile.email !== '' ? stateProfile.email : user.email,
                        }).then(() => {
                            dispatchStateProfile({type:'setEmail', payload: initialStateProfile.email})
                            dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                        }).catch(() => {
                            dispatchStateErr({type: 'activeModalWindow', payload: true})
                            dispatchStateErr({type:'errorClassName', payload:'Error in email update'})
                        });

                        await updateDoc(doc(db, 'users', user.id), {
                            email: stateProfile.email !== '' ? stateProfile.email : user.email,
                        })
                        dispatchStateProfile({type:'setEmail', payload: initialStateProfile.email})
                        dispatchStateProfile({type:'emailClassError', payload: initialStateProfile.emailClassError})
                    }).catch(() => {
                        dispatchStateProfile({type: 'emailClassError', payload: true})
                    })
                    if(stateProfile.name.trim() === ''){
                        dispatchStateProfile({type:'nameClassError', payload: initialStateProfile.emailClassError})
                    }
                    dispatchStateErr({type: 'informationAboutError', payload: initialStateModal.informationAboutError})
                    dispatchStateProfile({type:'passwordModalReAuth', payload: initialStateProfile.passwordModalReAuth})
                    dispatchStateProfile({type:'setEmail', payload: initialStateProfile.email})
                    dispatchStateProfile({type: 'modalReAuth', payload: initialStateProfile.modalReAuth})
                }).catch(() => {
                    dispatchStateProfile({type:'passwordModalReAuth', payload: initialStateProfile.passwordModalReAuth})
                    dispatchStateProfile({type:'modalReAuth', payload: true})
                    dispatchStateErr({type:'informationAboutError', payload:'Error in re-authorization'})
                });
            }

            if (stateProfile.photo) {
                const storage = getStorage();
                const storageRef = ref(storage, `avatar/${user.name.trim()}ID-${user.id}`);
                const uploadTask = uploadBytesResumable(storageRef, stateProfile.photo);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if(progress < 100){
                            dispatchStateProfile({type: "loadPhoto", payload: true})
                        }else{
                            dispatchStateProfile({type: "loadPhoto", payload: initialStateProfile.loadPhoto})
                        }
                    },
                    () => {
                        dispatchStateErr({type: 'activeModalWindow', payload: true})
                        dispatchStateErr({type:'errorClassName', payload:'Error while downloading a file'})
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateProfile(auth.currentUser, {
                                photoURL: downloadURL
                            }).then(() => {
                                dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                                
                            }).catch(() => {
                                dispatchStateErr({type: 'activeModalWindow', payload: true})
                                dispatchStateErr({type:'errorClassName', payload:'Error in photo update'})
                            });

                            await updateDoc(doc(db, 'users', user.id), {
                                photoURL: downloadURL
                            })

                            friend.map(async (el) => {
                                if (el.friendId) {//try catch
                                    await updateDoc(doc(db, 'chatsList', el.friendId), {
                                        [el.id + '.userInfo']: {
                                            id: user.id,
                                            displayName: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
                                            photo: downloadURL
                                        }
                                    })
                                }
                                if (el.friendId === undefined) {
                                    return
                                }
                            })
                            dispatchStateProfile({type:'selectedPhoto', payload: initialStateProfile.selectedPhoto})
                        });

                    }
                );
                if(stateProfile.email === ''){
                    dispatchStateProfile({type:'emailClassError', payload:initialStateProfile.emailClassError})
                }
                if(stateProfile.name.trim() === ''){
                    dispatchStateProfile({type:'nameClassError', payload: initialStateProfile.nameClassError})
                }
                
            }

            if(stateProfile.name.trim().length > 20){
                dispatchStateProfile({type:'nameClassError', payload: true})
                if(stateProfile.email === ''){
                    dispatchStateProfile({type:'emailClassError', payload: initialStateProfile.emailClassError})
                }
            }

            if (stateProfile.name.trim().length <= 20 && stateProfile.name.trim() !== '') {
                await updateProfile(auth.currentUser, {
                    displayName: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
                }).then(() => {
                    dispatchStateProfile({type:'setName', payload:  initialStateProfile.name})
                    dispatchStateProfile({type:'nameClassError', payload:  initialStateProfile.nameClassError})
                    dispatchStateErr({type: 'resetModal', payload: initialStateModal})
                }).catch((error) => {
                    dispatchStateErr({type: 'activeModalWindow', payload: true})
                    dispatchStateErr({type:'errorClassName', payload:'Error updating name or photo'})
                    console.error(error)
                });


                await updateDoc(doc(db, 'users', user.id), {
                    name: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
                })
                friend.map(async (el) => {
                    if (el.friendId) {
                        await updateDoc(doc(db, 'chatsList', el.friendId), {
                            [el.id + '.userInfo']: {
                                id: user.id,
                                displayName: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
                                photo: user.photo
                            }
                        })
                    }
                    if (el.friendId === undefined) {
                        return
                    }
                })
                dispatchStateProfile({type:'emailClassError', payload: initialStateProfile.emailClassError})
            }
            dispatchStateErr({type: 'resetModal', payload: initialStateModal})
            
        } catch (error) {
            dispatchStateErr({type: 'activeModalWindow', payload: true})
            console.error(error)
        }
        
    }

    const deleteAccount = (event) => {
        event.preventDefault()
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            stateProfile.passwordModalReAuth
        )
        reauthenticateWithCredential(user, credential).then(() => {
            dispatchStateProfile({type:"deletedFriend", payload: true})

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
                    dispatchStateProfile({type:"resetProfile", payload: initialStateProfile})
                    //setModuleErr(false)
                }).catch(() => {
                    dispatchStateErr({type: 'activeModalWindow', payload: true})
                    dispatchStateErr({type:'errorClassName', payload:'Error when logging out of your account'})
                });
                dispatchStateErr({type: 'resetModal', payload: initialStateModal})
            }).catch(() => {
                dispatchStateErr({type: 'activeModalWindow', payload: true})
                dispatchStateErr({type:'errorClassName', payload:'Error in time to delete the account'})
            });

            dispatchStateErr({type: 'resetModal', payload: initialStateModal})
            dispatchStateProfile({type:"deletedFriend", payload: false})

        }).catch(() => {
            //setDeleteUserState(true)
            dispatchStateProfile({type:"deletedFriend", payload: true})
            dispatchStateProfile({type:'passwordModalReAuth', payload: initialStateProfile.passwordModalReAuth})
            dispatchStateErr({type:'errorClassName', payload:'Error in re-authorization'})

            return
        });
    }

    return (
        <>
        <UserNavigation innerRef={navRef} searchRef={searchRef}/>
        {stateProfile.loadPhoto ? <Loader></Loader> : 
        
        
        <section className={classNames(style.profile, 'profile')}>

            <div onClick={() => {navigate('/')}} className={style.back}>
                <img src={back} alt="back" />
            </div>

            <div className={classNames(style.container, 'container')}>
                <div className={classNames(style.userInfo, "user-info")}>
                    <div className={classNames(style.containerUserInfo, "container-userInfo")}>

                        <ProfilePhoto stateProfile={stateProfile}></ProfilePhoto>

                        <div className={classNames(style.nameEmail, "name-email")}>
                            <p className={classNames(style.nameUser, "name-user")}>
                                <span className={classNames(style.editAbout, "head-name")}>Name:</span>
                                <span className={classNames(style.nameProfileUser, "header")}>{user.name}</span>
                            </p>
                            <p className={classNames(style.emailUser, "emailUser header")}>
                                <span className={classNames(style.editAbout, "head-name")}> Email:</span>
                                <span className={classNames(style.nameProfileUser, "header")}>{user.email}</span>
                            </p>

                            <DeleteProfile stateProfile={dispatchStateProfile}></DeleteProfile>

                        </div>
                    </div>
                </div>

                <div className={classNames(style.editUserInfo, "edit-user-info")}>
                    <div className={classNames(style.containerEditUser, "container")}>
                
                        <ChangeProfile state={[stateModalErr, dispatchStateErr]} stateProfile={[stateProfile, dispatchStateProfile]} ></ChangeProfile>

                        <div className={classNames(style.updateSection, 'update')}>
                            <button onClick={(event) => {
                                stateProfile.email !== '' ? dispatchStateProfile({type: 'modalReAuth', payload: true}) : submiteUpdates(event)
                            }} className={classNames(style.btnUpdate)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
                            
            <Modal state={[stateModalErr, dispatchStateErr]} stateProfile = {[stateProfile, dispatchStateProfile]} deleteAccount={deleteAccount} submiteUpdates={submiteUpdates}>
            </Modal>
            {stateModalErr.activeModalWindow ? <ModuleError state={[stateModalErr, dispatchStateErr]}></ModuleError> : <></>}
        </section>
        }
        </>
    )
}