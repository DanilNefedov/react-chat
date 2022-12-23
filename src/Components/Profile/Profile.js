import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import style from './Profile.module.css'
import img from '../../img/user-M.png'
import { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updateEmail, updateProfile } from "firebase/auth";
import { updateUser } from "../../store/authSlice"
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"
import { useEffect } from "react"
import { Modal } from "../Modal/Modal"



export function Profile() {

    const user = useSelector(state => state.user)
    const auth = getAuth();
    const dispatch = useDispatch()
    const db = getFirestore();

    const [photo, setPhoto] = useState(null)

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')


    const submiteUpdates = async (event) =>{
        event.preventDefault()
        

        console.log(photo)
        try{
            if(photo){
                const storage = getStorage();
                const storageRef = ref(storage, `avatar/${user.name}`);
                const uploadTask = uploadBytesResumable(storageRef, photo);
                //console.log(user.photo)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress} % done`);
                    },
                    (error) => {
                        console.error(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                            //console.log(downloadURL)
                            await updateProfile(auth.currentUser, {
                                photoURL: downloadURL 
                            }).then(() => {
                            
                            }).catch((error) => {
                                console.error(error)
                            });


                            await updateDoc(doc(db, 'users', user.id),{
                                photoURL: downloadURL 
                            })
                        });
                    }
                );
                
            }
            

            await updateProfile(auth.currentUser, {
                displayName:name !== '' ? name : user.name,
                email:email !== '' ? email : user.email,
                photoURL:user.photo 
            }).then(() => {
            
            }).catch((error) => {
                console.error(error)
            });


            await updateDoc(doc(db, 'users', user.id),{
                name:name !== '' ? name : user.name,
                email:email !== '' ? email : user.email,
                photoURL:user.photo 
            })
            
            // await updateDoc(doc(db, 'chatsList', user.id),{
            //     name:name !== '' ? name : user.name,
            //     photoURL:user.photo 
            // })
            
        }catch(error){
            console.error(error)
        }

        
        setName('')
    }    
    const [activeModal, setActiveModal] = useState(false)
    const [passwodModal, setPasswordModal] = useState('')

    const promptForCredentials = async () => {
            setActiveModal(true)
            console.log(passwodModal)
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                passwodModal// промт c паролем
            ) 
            const reUser = auth.currentUser;
        
            await reauthenticateWithCredential(reUser, credential).then(async () => {
                await updateEmail(reUser, email ).then(() => {

                }).catch((err) =>{
                    console.error(err)
                })
            }).catch((error) => {
                console.error(error)
            });
       // }
       setEmail('')
    }




    useEffect (()=>{
        const unsub = onSnapshot(doc(db, "users", user.id), (doc) => {
            //console.log("Current data: ", doc.data());
            const data = doc.data()
            //console.log(data)
            const name = data.name
            const photo = data.photoURL
            const email = data.email
            dispatch(updateUser({name, photo, email}))
        });
        return () => {
            unsub()
        }
    }, [user.name, user.photoURL, user.email])

    

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
                            <input id={style.loadPhoto} type="file" onChange={(e) => setPhoto(e.target.files[0])} accept='image/*, .png, .jpg, .web'/>
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
                        submiteUpdates(event)
                        email !== '' && setActiveModal(true)
                        }} className={classNames(style.btnUpdate)}>Update</button>
                </div>
            </div>
            <Modal promptForCredentials={promptForCredentials} activeModal={activeModal} setActiveModal={setActiveModal} passwodModal={passwodModal} setPasswordModal={setPasswordModal}></Modal>
        </section>
    )
}