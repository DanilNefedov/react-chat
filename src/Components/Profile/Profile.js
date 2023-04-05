import classNames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import style from './Profile.module.css'
import { useReducer, useRef } from "react"
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, signOut } from "firebase/auth";
import { removeUser,} from "../../store/authSlice"
import { deleteDoc, doc, getFirestore } from "firebase/firestore"
import { Modal } from "../Modal/Modal"
import { removeFrined } from "../../store/friendSlice"
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
import { removeMessage } from "../../store/messagesSlice";
import { emailFunction } from "./functions/emailFunction";
import { photoFunction } from "./functions/photoFunction";
import { nameFunction } from "./functions/nameFunction";
import { requestDelete } from "./functions/requestDelete";

export default function Profile() {
    const navRef = useRef()
    const searchRef = useRef()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const friend = useSelector(state => state.friend.friend)
    const group = useSelector(state => state.group.group)
    const [stateModalErr, dispatchStateErr] = useReducer(reducerModal, initialStateModal)
    const [stateProfile, dispatchStateProfile] = useReducer(reducerProfile, initialStateProfile)
    const auth = getAuth();
    const dispatch = useDispatch()
    const db = getFirestore();


    const submiteUpdates = async (event) => {
        event.preventDefault()

        try {
            if (stateProfile.email !== '') {

                emailFunction([stateModalErr, dispatchStateErr],[stateProfile, dispatchStateProfile], auth, db, dispatch, user)

            }

            if (stateProfile.photo) {

                photoFunction([stateModalErr, dispatchStateErr],[stateProfile, dispatchStateProfile], user, auth, db, dispatch, friend, group)

            }

            if (stateProfile.name.trim().length > 20) {
                dispatchStateProfile({ type: 'nameClassError', payload: true })
                if (stateProfile.email === '') {
                    dispatchStateProfile({ type: 'emailClassError', payload: initialStateProfile.emailClassError })
                }
            }

            if (stateProfile.name.trim().length <= 20 && stateProfile.name.trim() !== '') {

                nameFunction([stateModalErr, dispatchStateErr],[stateProfile, dispatchStateProfile], user, auth, db, dispatch, friend, group)

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

                requestDelete(friend, group, db, user)

                signOut(auth).then(() => {
                    dispatch(removeUser())
                    dispatch(removeFrined())
                    dispatch(removeMessage())
                    dispatch(removeGroup())
                    dispatchStateErr({ type: 'resetModal', payload: initialStateModal })
                    dispatchStateProfile({ type: "resetProfile", payload: initialStateProfile })
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