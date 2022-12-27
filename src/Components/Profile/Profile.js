import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import style from './Profile.module.css'
import img from '../../img/user-M.png'
import { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut, updateEmail, updateProfile } from "firebase/auth";
import { removePhoto, removeUser, setUser, updateUser } from "../../store/authSlice"
import { deleteDoc, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"
import { useEffect } from "react"
import { Modal } from "../Modal/Modal"



export function Profile() {

    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend.friend)
    const auth = getAuth();
    const dispatch = useDispatch()
    const db = getFirestore();

    const [photo, setPhoto] = useState(null)

    const [name, setName] = useState('')

    const [deleteUserState, setDeleteUserState] = useState(false)

    const [email, setEmail] = useState('')

    const [activeModal, setActiveModal] = useState(false)
    const [passwodModal, setPasswordModal] = useState('')


    const submiteUpdates = async (event) => {
        event.preventDefault()

        try {
            if (email !== '') {
                setActiveModal(true)
                //console.log(passwodModal)
                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email,
                    passwodModal// промт c паролем
                )
                const reUser = auth.currentUser;

                await reauthenticateWithCredential(reUser, credential).then(async () => {
                    await updateEmail(reUser, email).then(() => {

                    }).catch((err) => {
                        console.error(err)
                    })
                }).catch((error) => {
                    console.error(error)
                });
                // }
                setEmail('')
                setPasswordModal('')
            }


            if (photo) {
                const storage = getStorage();
                const storageRef = ref(storage, `avatar/${user.name}`);
                const uploadTask = uploadBytesResumable(storageRef, photo);
                //console.log('photo')
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress} % done`);
                    },
                    (error) => {
                        console.error(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            //console.log(downloadURL)
                            await updateProfile(auth.currentUser, {
                                photoURL: downloadURL
                            }).then(() => {

                            }).catch((error) => {
                                console.error(error)
                            });


                            await updateDoc(doc(db, 'users', user.id), {
                                photoURL: downloadURL
                            })


                            friend.map(async (el) => {

                                await updateDoc(doc(db, 'chatsList', el.friendId), {
                                    [el.id + '.userInfo']: {
                                        id: user.id,
                                        displayName: name !== '' ? name : user.name,
                                        photo: downloadURL
                                    }
                                })
                            })
                        });
                    }
                );

            }




            await updateProfile(auth.currentUser, {
                displayName: name !== '' ? name : user.name,
                email: email !== '' ? email : user.email,
                photoURL: user.photo // try to delete this line
            }).then(() => {

            }).catch((error) => {
                console.error(error)
            });


            await updateDoc(doc(db, 'users', user.id), {
                name: name !== '' ? name : user.name,
                email: email !== '' ? email : user.email,
                photoURL: user.photo
            })
            //console.log(friend, user)
            friend.map(async (el) => {

                await updateDoc(doc(db, 'chatsList', el.friendId), {
                    [el.id + '.userInfo']: {
                        id: user.id,
                        displayName: name !== '' ? name : user.name,
                        photo: user.photo
                    }
                })
            })


        } catch (error) {
            console.error(error)
        }


        setName('')
    }




    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", user.id), (doc) => {
            //console.log("Current data: ", doc.data());
            const data = doc.data()
            if (data) {
                //console.log(data)
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
        if (user.photo !== null) {//additional verification
            //console.log(user.photo)
            //const auth = getAuth();
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

                }).catch((error) => {
                    console.error(error)
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

            }).catch((error) => {
                console.error(error)
            });
        }

    }


    const deleteAccount = (e) => {
        e.preventDefault()//проверить с дефол поведением 

        const user = auth.currentUser;
        //console.log(user)
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            passwodModal// промт c паролем
        )

        reauthenticateWithCredential(user, credential).then(() => {//указать для друга, что аккаунт был удален // ошибка при удалении аккаунта а после создании нового с той же почтой возможно увидеть старные сообщения + в бд не удаляется док "chats"
            deleteUser(user).then(async () => {

                await deleteDoc(doc(db, "users", user.uid));
                await deleteDoc(doc(db, "chatsList", user.uid));
                await deleteDoc(doc(db, "chats", user.uid));

                signOut(auth).then(() => {
                    dispatch(removeUser())
                }).catch((error) => {
                    console.error(error)
                });

            }).catch((error) => {
                console.error(error)
            });


        }).catch((error) => {
            console.error(error)
        });

    }

    //console.log(user.photo)


    return (
        <section className={classNames(style.profile, 'profile')}>
            <div className={classNames(style.container, 'container')}>

                {user.photo ?
                    <div className={classNames(style.photoSection, 'photo')}>
                        <div className={classNames(style.userPhoto, "user-photo")}>
                            <img src={user.photo} alt="user" />
                        </div>
                        <div className={classNames(style.editPhoto, "edit-photo")}>
                            <label className={style.downloadImg} htmlFor={style.loadPhoto}>Edit Photo</label>
                            <input id={style.loadPhoto} type="file" onChange={(e) => setPhoto(e.target.files[0])} accept='image/*, .png, .jpg, .web' />
                            <div className={classNames(style.deletePhoto, "delete-photo")}>
                                <button onClick={e => deletePhoto(e)} className={classNames(style.deleteBtn, "delete")}>Delete Photo</button>
                            </div>
                        </div>

                    </div>
                    :
                    <div className={classNames(style.photoSection, 'photo')}>
                        <div className={classNames(style.userPhoto, "user-photo")}>
                            <img src={img} alt="user" />
                        </div>
                        <div className={classNames(style.editPhoto, "edit-photo")}>
                            <label className={style.downloadImg} htmlFor={style.loadPhoto}>Download Photo</label>
                            <input id={style.loadPhoto} type="file" onChange={(e) => setPhoto(e.target.files[0])} accept='image/*, .png, .jpg, .web' />
                        </div>
                    </div>
                }

                <div className={classNames(style.nameSection, 'name')}>
                    <p className={classNames(style.nameUser, "name-user")}>
                        <span className={classNames(style.editAbout, "head-name")}>Name:</span>
                        <span className="header">{user.name}</span>
                    </p>
                    <span className={classNames(style.editField, 'head-name')}>Edit Name: </span>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="enter name" type="text" className={classNames('edit-field', style.editName)} />
                </div>

                <div className={classNames(style.emailSection, "email")}>
                    <p className={classNames(style.emailUser, "emailUser header")}>
                        <span className={classNames(style.editAbout, "head-name")}> Email:</span>
                        <span className="header">{user.email}</span>
                    </p>
                    <span className={classNames(style.editField, 'head-name')}>Edit Email: </span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="enter email" type="email" className={classNames('edit-field', style.editEmail)} />
                </div>
                <div className={classNames(style.updateSection, 'update')}>
                    <button onClick={(event) => {
                        email !== '' ? setActiveModal(true) : submiteUpdates(event)
                    }} className={classNames(style.btnUpdate)}>Update</button>

                    <button onClick={(event) => {
                        event.preventDefault()
                        setDeleteUserState(true)
                    }} className={classNames(style.btnDelete)}>Delete Account</button>
                </div>
            </div>
            <Modal deleteAccount={deleteAccount} setDeleteUserState={setDeleteUserState} deleteUserState={deleteUserState} submiteUpdates={submiteUpdates} activeModal={activeModal} setActiveModal={setActiveModal} passwodModal={passwodModal} setPasswordModal={setPasswordModal}></Modal>
        </section>
    )
}