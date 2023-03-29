import { Search } from "../Search/Search";
import { UserNavigation } from "../UserNavigation/UserNavigation";
import { EditGroups } from "./EditGroups";
import style from './Groups.module.css'
import classNames from 'classnames';
import { useReducer, useRef, useState } from "react";
import { Contacts } from "./Contacts";
import { useSelector } from "react-redux";
import { Empty } from "../Empty/Empty";
import { initialStateGroup, reducerGroup } from "../../state/group";
import { v4 as uuid } from 'uuid';
import done from '../../img/done-contact.svg'
import { doc, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import back from '../../img/back-dark.svg'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { selectedFriends } from "../HomePage/Friends";
import { Loader } from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import close from '../../img/close.svg'
import { initialStateModal, reducerModal } from "../../state/modalError";
import { ModuleError } from "../ModalError/ModalError";





export function Groups() {
    const [activeContacts, setActiveContacs] = useState(false)
    // const [test, setTest] = useState([])
    const navigate = useNavigate()
    const navRef = useRef()
    const friends = useSelector(state => state.friend.friend)
    const myInfo = useSelector(user => user.user)
    const sortState = [...friends]
    const [stateGroup, dispatchStateGroup] = useReducer(reducerGroup, initialStateGroup)
    const db = getFirestore();
    const [stateModalErr, dispatchStateErr] = useReducer(reducerModal, initialStateModal)
    // selectedFriends = []
    //------------------ CHANGE TO USEMEMO --------------------//
    const addFriend = (el) => {
        const index = selectedFriends.indexOf(el);
        if (index === -1) {
            selectedFriends.push(el);
            dispatchStateGroup({ type: 'users', payload: selectedFriends })
        } else {
            selectedFriends.splice(index, 1);
            dispatchStateGroup({ type: 'users', payload: selectedFriends })
        }
    }
    //------------------ CHANGE TO USEMEMO --------------------//
    // console.log(selectedFriends)

    const addGroup = async () => {
        const combinedId = myInfo.id + uuid()
        const users = stateGroup.users

        if (users.length > 0 && stateGroup.name.trim() !== '') {
            dispatchStateGroup({type: 'lengthNameErr', payload: initialStateGroup.lengthNameErr})
            dispatchStateGroup({type: 'emptyUsers', payload: initialStateGroup.emptyUsers})
            const filteredUsers = users.map((obj) => {
                const copiedObg = { ...obj }
                const newKey = 'id'

                Object.keys(copiedObg).forEach(key => {
                    if (key === 'friendId') {
                        copiedObg[newKey] = copiedObg[key]
                    }
                })

                delete copiedObg.date
                delete copiedObg.friendId
                delete copiedObg.idSender
                delete copiedObg.lastMessages
                delete copiedObg.newMess
                delete copiedObg.timePublic
                delete copiedObg.view

                return copiedObg
            })
            const userObj = {};

            const copiedObgMyInfo = { ...myInfo }
            Object.keys(copiedObgMyInfo).forEach(el => {
                if (el === 'email') {
                    delete copiedObgMyInfo.email

                }
                copiedObgMyInfo.admin = true
                copiedObgMyInfo.deleted = false
            })

            userObj[copiedObgMyInfo.id] = { ...copiedObgMyInfo }
            filteredUsers.forEach(user => {
                userObj[user.id] = { ...user, admin: false };
            });


            if (stateGroup.photo !== null) {
                const storage = getStorage();
                const storageRef = ref(storage, `groups/${stateGroup.name.trim()}ID-${combinedId}`);
                const uploadTask = uploadBytesResumable(storageRef, stateGroup.photo);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // console.log(progress);
                        if(progress < 100){
                            dispatchStateGroup({type: 'loadPhotoGroup', payload: true})
                        }else{
                            dispatchStateGroup({type: 'loadPhotoGroup', payload: initialStateGroup.loadPhotoGroup})
                            navigate('/')
                        }
    
                    },
                    () => {
                        dispatchStateErr({ type: 'activeModalWindow', payload: true })
                        dispatchStateErr({ type: 'errorClassName', payload: 'Error while downloading a file' })
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            dispatchStateErr({ type: 'resetModal', payload: initialStateModal })

                            await updateDoc(doc(db, 'chatsList', myInfo.id), {
                                [combinedId + '.photo']: {
                                    photo: downloadURL
                                }
                            })
    
                            users.map(async user => {
                                await updateDoc(doc(db, 'chatsList', user.friendId), {
                                    [combinedId + '.photo']: {
                                        photo: downloadURL
                                    }
                                })
    
                            })
                        });
                    }
                );
            }

            
            await setDoc(doc(db, 'chats', combinedId), { messages: [] })

            await updateDoc(doc(db, 'chatsList', myInfo.id), {
                [combinedId + '.group']: {
                    users: userObj,
                },
                [combinedId + '.name']: {
                    name: stateGroup.name.trim()
                },
                [combinedId + '.photo']: {
                    photo: null
                },
                [combinedId + '.date']: serverTimestamp(),
                [combinedId + '.viewMessage']:{
                    newMessView: true,
                    idSender:myInfo.id,
                    viewMess:false
                }
            })

            users.map(async user => {

                await updateDoc(doc(db, 'chatsList', user.friendId), {
                    [combinedId + '.group']: {
                        users: userObj,
                    },
                    [combinedId + '.name']: {
                        name: stateGroup.name.trim()
                    },
                    [combinedId + '.photo']: {
                        photo: null
                    },
                    [combinedId + '.date']: serverTimestamp(),
                    [combinedId + '.viewMessage']:{
                        newMessView: false,
                        idSender:myInfo.id,
                        viewMess:false
                    }
                })

            })
            if(!stateGroup.photo){
                navigate('/')
            }
        }
        if(stateGroup.name.trim() === ''){
            dispatchStateGroup({type: 'lengthNameErr', payload: true})
            dispatchStateGroup({type: 'emptyUsers', payload: initialStateGroup.emptyUsers})

        }
        if(users.length <= 0){
            dispatchStateGroup({type: 'emptyUsers', payload:true})
            dispatchStateGroup({type: 'lengthNameErr', payload: initialStateGroup.lengthNameErr})

        }
        if(users.length <= 0 && stateGroup.name.trim() === ''){
            dispatchStateGroup({type: 'emptyUsers', payload:true})
            dispatchStateGroup({type: 'lengthNameErr', payload: true})
        }
    }

    return (
        <>
            <UserNavigation innerRef={navRef} />
            {
                stateGroup.loadPhotoGroup ? 
                <Loader></Loader>
                :
                <>
                <section className={style.groups}>
                    <div className={activeContacts ? classNames(style.container, style.activeContainer, 'container') : classNames(style.container, 'container')}>
                        <EditGroups active={setActiveContacs} state={[stateGroup, dispatchStateGroup]} addGroup={addGroup}></EditGroups>
                        <div className={classNames(style.addFriends, 'add-friends')}>
                            <div className={style.headerContacs}>
                                <span onClick={() => setActiveContacs(false)} className={style.backBtn}><img src={back} alt="Back" /></span>
                                <h2 className={classNames(style.header, 'header')}>
                                    Contacts
                                </h2>
                            </div>
                            <div className={style.contactContainer}>
                                {(friends.length > 0) ? (
                                    sortState.sort((a, b) => b.timePublic - a.timePublic).map((friend, indexBlock) => (
                                        friend.deleted === false ? <Contacts addFriend={addFriend} indexBlock={indexBlock} key={friend.id} friends={friend}></Contacts> : false
                                    ))
                                ) : (
                                    <Empty text={'Contacts list is empty'}></Empty>
                                )}
                            </div>

                        </div>
                    </div>

                </section>
                {stateModalErr.activeModalWindow ? <ModuleError state={[stateModalErr, dispatchStateErr]}></ModuleError> : <></>}

                </>
                
            }
            
        </>

    )
}