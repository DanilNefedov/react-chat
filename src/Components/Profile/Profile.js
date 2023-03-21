import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import style from './Profile.module.css'
import { useReducer, useRef, useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updateEmail, updateProfile } from "firebase/auth";
import { removeUser, updateEmailStore, updateName, updatePhoto, updateUser } from "../../store/authSlice"
import { deleteDoc, deleteField, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore"
import { Modal } from "../Modal/Modal"
import { removeFrined, updatePhotoFriend } from "../../store/friendSlice"
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
import { removeGroup } from "../../store/groupSlice";
import { removeMessage, updatePhotoMessages } from "../../store/messagesSlice";

export default function Profile() {
    const navRef = useRef()
    const searchRef = useRef()
    const navigate = useNavigate()


    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend.friend)
    const messages = useSelector(state => state.message.messages)
    const group = useSelector(state => state.group.group)
    const [stateModalErr, dispatchStateErr] = useReducer(reducerModal, initialStateModal)
    const [stateProfile, dispatchStateProfile] = useReducer(reducerProfile, initialStateProfile)
    const auth = getAuth();
    const dispatch = useDispatch()
    const db = getFirestore();
    //console.log(friend, group)
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
                            dispatch(updateEmailStore({ email: stateProfile.email }))
                            dispatchStateProfile({ type: 'setEmail', payload: initialStateProfile.email })
                            dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
                        }).catch(() => {
                            dispatchStateErr({ type: 'activeModalWindow', payload: true })
                            dispatchStateErr({ type: 'errorClassName', payload: 'Error in email update' })
                        });

                        await updateDoc(doc(db, 'users', user.id), {
                            email: stateProfile.email !== '' ? stateProfile.email : user.email,
                        })
                        dispatchStateProfile({ type: 'setEmail', payload: initialStateProfile.email })
                        dispatchStateProfile({ type: 'emailClassError', payload: initialStateProfile.emailClassError })
                    }).catch(() => {
                        dispatchStateProfile({ type: 'emailClassError', payload: true })
                    })
                    if (stateProfile.name.trim() === '') {
                        dispatchStateProfile({ type: 'nameClassError', payload: initialStateProfile.emailClassError })
                    }
                    dispatchStateErr({ type: 'informationAboutError', payload: initialStateModal.informationAboutError })
                    dispatchStateProfile({ type: 'passwordModalReAuth', payload: initialStateProfile.passwordModalReAuth })
                    dispatchStateProfile({ type: 'setEmail', payload: initialStateProfile.email })
                    dispatchStateProfile({ type: 'modalReAuth', payload: initialStateProfile.modalReAuth })
                }).catch(() => {
                    dispatchStateProfile({ type: 'passwordModalReAuth', payload: initialStateProfile.passwordModalReAuth })
                    dispatchStateProfile({ type: 'modalReAuth', payload: true })
                    dispatchStateErr({ type: 'informationAboutError', payload: 'Error in re-authorization' })
                });
            }

            if (stateProfile.photo) {
                const storage = getStorage();
                const storageRef = ref(storage, `avatar/${user.name.trim()}ID-${user.id}`);
                const uploadTask = uploadBytesResumable(storageRef, stateProfile.photo);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        if (progress < 100) {
                            dispatchStateProfile({ type: "loadPhoto", payload: true })
                        } else {
                            dispatchStateProfile({ type: "loadPhoto", payload: initialStateProfile.loadPhoto })
                        }
                    },
                    () => {
                        dispatchStateErr({ type: 'activeModalWindow', payload: true })
                        dispatchStateErr({ type: 'errorClassName', payload: 'Error while downloading a file' })
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await updateProfile(auth.currentUser, {
                                photoURL: downloadURL
                            }).then(() => {
                                dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
                                dispatch(updatePhoto({photo:downloadURL}))
                                friend.map( async (el) =>{
                                    const docSnap = await getDoc(doc(db, 'chats', el.id));
                                    if (docSnap.exists()){
                                        const array = docSnap.data().messages;
                                        const updatedArray = array.map((element) =>{
                                            if (element.userId === user.id) {
                                                const messageId = element.id
                                                const chatId = el.id
                                                const photo = downloadURL
                                                dispatch(updatePhotoMessages({chatId, messageId, photo}))
                                                return { ...element, photo: downloadURL };
                                            }else{
                                                return element;
                                            }
                                        })

                                        await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                                    }
                                })
                                group.map( async (el) =>{
                                    const docSnap = await getDoc(doc(db, 'chats', el.id));
                                    if (docSnap.exists()){
                                        const array = docSnap.data().messages;
                                        // console.log(array)
                                        const updatedArray = array.map((element) =>{
                                            if (element.userId === user.id) {
                                                const messageId = element.id
                                                const chatId = el.id
                                                const photo = downloadURL
                                                dispatch(updatePhotoMessages({chatId, messageId, photo}))
                                                return { ...element, photo: downloadURL };
                                            }else{
                                                return element;
                                            }
                                        })

                                        await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                                    }
                                })

                            }).catch(() => {
                                dispatchStateErr({ type: 'activeModalWindow', payload: true })
                                dispatchStateErr({ type: 'errorClassName', payload: 'Error in photo update' })
                            });

                            await updateDoc(doc(db, 'users', user.id), {
                                photoURL: downloadURL
                            })
                            // console.log(messages)
                            friend.map(async (el) => {
                                if (el.friendId) {//try catch
                                    await updateDoc(doc(db, 'chatsList', el.friendId), {
                                        [el.id + '.photo']: {
                                            photo: downloadURL
                                        }
                                    })
                                }
                                if (el.friendId === undefined) {
                                    return
                                }

                            })
                            dispatchStateProfile({ type: 'selectedPhoto', payload: initialStateProfile.selectedPhoto })
                        });

                    }
                );
                if (stateProfile.email === '') {
                    dispatchStateProfile({ type: 'emailClassError', payload: initialStateProfile.emailClassError })
                }
                if (stateProfile.name.trim() === '') {
                    dispatchStateProfile({ type: 'nameClassError', payload: initialStateProfile.nameClassError })
                }

            }

            if (stateProfile.name.trim().length > 20) {
                dispatchStateProfile({ type: 'nameClassError', payload: true })
                if (stateProfile.email === '') {
                    dispatchStateProfile({ type: 'emailClassError', payload: initialStateProfile.emailClassError })
                }
            }

            if (stateProfile.name.trim().length <= 20 && stateProfile.name.trim() !== '') {
                await updateProfile(auth.currentUser, {
                    displayName: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
                }).then(() => {
                    dispatch(updateName({ name: stateProfile.name.trim() }))
                    dispatchStateProfile({ type: 'setName', payload: initialStateProfile.name })
                    dispatchStateProfile({ type: 'nameClassError', payload: initialStateProfile.nameClassError })
                    dispatchStateErr({ type: 'resetModal', payload: initialStateModal })

                    friend.map( async (el) =>{
                        const docSnap = await getDoc(doc(db, 'chats', el.id));
                        if (docSnap.exists()){
                            const array = docSnap.data().messages;
                            const updatedArray = array.map((element) =>{
                                if (element.userId === user.id) {
                                    return { ...element, name: stateProfile.name };
                                }else{
                                    return element;
                                }
                            })

                            await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                        }
                    })
                    group.map( async (el) =>{
                        const docSnap = await getDoc(doc(db, 'chats', el.id));
                        if (docSnap.exists()){
                            const array = docSnap.data().messages;
                            const updatedArray = array.map((element) =>{
                                if (element.userId === user.id) {
                                    return { ...element, name: stateProfile.name };
                                }else{
                                    return element;
                                }
                            })

                            await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                        }
                    })
                }).catch((error) => {
                    dispatchStateErr({ type: 'activeModalWindow', payload: true })
                    dispatchStateErr({ type: 'errorClassName', payload: 'Error updating name or photo' })
                    console.error(error)
                });


                await updateDoc(doc(db, 'users', user.id), {
                    name: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
                })
                friend.map(async (el) => {//err
                    if (el.friendId && !el.deleted) {
                        // console.log(el)
                        await updateDoc(doc(db, 'chatsList', el.friendId), {
                            [el.id + '.name']: {
                                name: stateProfile.name.trim() !== '' ? stateProfile.name.trim() : user.name.trim(),
                            }
                        })
                    }
                    if (el.friendId === undefined) {
                        return
                    }
                })
                dispatchStateProfile({ type: 'emailClassError', payload: initialStateProfile.emailClassError })
            }
            dispatchStateErr({ type: 'resetModal', payload: initialStateModal })

        } catch (error) {
            dispatchStateErr({ type: 'activeModalWindow', payload: true })
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
            dispatchStateProfile({ type: "deletedFriend", payload: true })

            deleteUser(user).then(async () => {
                await deleteDoc(doc(db, "users", user.uid));
                await deleteDoc(doc(db, "chatsList", user.uid));


                friend.map(async el => {
                    await updateDoc(doc(db, 'chatsList', el.friendId), {
                        [el.id + '.name']: {
                            name: 'Deleted'
                        },
                        [el.id + '.photo']: {
                            photo: null
                        },
                        [el.id + '.deleted']:{
                            deleted:true
                        } 

                    });
                })
                friend.map( async (el) =>{
                    const docSnap = await getDoc(doc(db, 'chats', el.id));
                    if (docSnap.exists()){
                        const array = docSnap.data().messages;
                        const updatedArray = array.map((element) =>{
                            if (element.userId !== user.id) {
                                element.photo = null
                                element.name = 'Deleted'
                                element.deleted = true
                                return { ...element};
                            }else{
                                return element;
                            }
                        })

                        await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                    }
                })

                group.map(async el => {//          !!!!!!!WORK
                    const userArr = Object.entries(el.users)
                    userArr.map(async userArr => {
                        if(userArr[0] !== user.id && userArr[1].deleted === false){
                            await updateDoc(doc(db, 'chatsList', userArr[0]), {
                                [`${el.id}.group.users.${user.uid}.name`]:'Deleted',
                                [`${el.id}.group.users.${user.uid}.photo`]:null,
                                [`${el.id}.group.users.${user.uid}.deleted`]:true
                            });
                        
                        }
                    })
                })


                group.map(async el => {
                    const docSnap = await getDoc(doc(db, 'chats', el.id));
                    if (docSnap.exists()){
                        const array = docSnap.data().messages;
                        const updatedArray = array.map((element) =>{
                            if (element.userId === user.uid) {
                                element.photo = null
                                element.name = 'Deleted'
                                element.deleted = true
                                return { ...element};
                            }else{
                                return element;
                            }
                        })
            
                        await updateDoc(doc(db, 'chats', el.id), { messages: updatedArray });
                    }
                })



                signOut(auth).then(() => {
                    dispatch(removeUser())
                    dispatch(removeFrined())
                    dispatch(removeMessage())
                    dispatch(removeGroup())
                    dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
                    dispatchStateProfile({ type: "resetProfile", payload: initialStateProfile })
                    //setModuleErr(false)
                }).catch(() => {
                    dispatchStateErr({ type: 'activeModalWindow', payload: true })
                    dispatchStateErr({ type: 'errorClassName', payload: 'Error when logging out of your account' })
                });
                dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
            }).catch(() => {
                dispatchStateErr({ type: 'activeModalWindow', payload: true })
                dispatchStateErr({ type: 'errorClassName', payload: 'Error in time to delete the account' })
            });

            dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
            dispatchStateProfile({ type: "deletedFriend", payload: false })

        }).catch(() => {
            //setDeleteUserState(true)
            dispatchStateProfile({ type: "deletedFriend", payload: true })
            dispatchStateProfile({ type: 'passwordModalReAuth', payload: initialStateProfile.passwordModalReAuth })
            dispatchStateErr({ type: 'errorClassName', payload: 'Error in re-authorization' })

            return
        });
    }

    return (
        <>
            <UserNavigation innerRef={navRef} searchRef={searchRef} />
            {stateProfile.loadPhoto ? <Loader></Loader> :


                <section className={classNames(style.profile, 'profile')}>

                    <div onClick={() => { navigate('/') }} className={style.back}>
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
                                        stateProfile.email !== '' ? dispatchStateProfile({ type: 'modalReAuth', payload: true }) : submiteUpdates(event)
                                    }} className={classNames(style.btnUpdate)}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Modal state={[stateModalErr, dispatchStateErr]} stateProfile={[stateProfile, dispatchStateProfile]} deleteAccount={deleteAccount} submiteUpdates={submiteUpdates}>
                    </Modal>
                    {stateModalErr.activeModalWindow ? <ModuleError state={[stateModalErr, dispatchStateErr]}></ModuleError> : <></>}
                </section>
            }
        </>
    )
}