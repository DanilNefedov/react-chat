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


const selectedFriends = []


export function Groups() {
    const [activeContacts, setActiveContacs] = useState(false)
    // const [test, setTest] = useState([])
    const navRef = useRef()
    const friends = useSelector(state => state.friend.friend)
    const myInfo = useSelector(user => user.user)
    const sortState = [...friends]
    const [stateGroup, dispatchStateGroup] = useReducer(reducerGroup, initialStateGroup)
    const db = getFirestore();
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


    const addGroup = async () => {
        const combinedId = myInfo.id + uuid()
        const users = stateGroup.users
        const filteredUsers = users.map((obj) => {
            const copiedObg = {...obj}
            const newKey = 'id'
            
            Object.keys(copiedObg).forEach(key =>{
                if(key === 'friendId'){
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
        
        const copiedObgMyInfo = {...myInfo}
        Object.keys(copiedObgMyInfo).forEach(el => {
            if(el === 'email'){
                delete copiedObgMyInfo.email
                
            }
            copiedObgMyInfo.admin = true
            copiedObgMyInfo.deleted = false
        })

        userObj[copiedObgMyInfo.id] = { ...copiedObgMyInfo}
        filteredUsers.forEach(user => {
            userObj[user.id] = { ...user, admin: false };
        });


        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        await updateDoc(doc(db, 'chatsList', myInfo.id), {
            [combinedId + '.group']: {
                users: userObj,
            },
            [combinedId + '.name']: {
                name: stateGroup.name
            },
            [combinedId + '.photo']: {
                photo: stateGroup.photo
            },
            [combinedId + '.date']: serverTimestamp(),
            [combinedId + '.viewMessage']: {
                view: false,
                idSender: myInfo.id
            },
            [combinedId + '.idSender']: {
                idSender: myInfo.id
            },
            [combinedId + '.viewNewMessage']: {
                viewNewMess: true
            }
        })

        users.map(async user => {

            await updateDoc(doc(db, 'chatsList', user.friendId), {
                [combinedId + '.group']: {
                    users: userObj,
                },
                [combinedId + '.name']: {
                    name: stateGroup.name
                },
                [combinedId + '.photo']: {
                    photo: stateGroup.photo
                },
                [combinedId + '.date']: serverTimestamp(),
                [combinedId + '.viewMessage']: {
                    view: false,
                },
                [combinedId + '.idSender']: {
                    idSender: myInfo.id
                },
                [combinedId + '.viewNewMessage']: {
                    viewNewMess: false
                }
            })

        })
        //dispatchStateGroup({type: 'init', payload:initialStateGroup})

    }



    return (
        <>
            <UserNavigation innerRef={navRef} />

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
                                    <Contacts addFriend={addFriend} indexBlock={indexBlock} key={friend.id} friends={friend}></Contacts>
                                ))
                            ) : (
                                <Empty text={'Contacts list is empty'}></Empty>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>

    )
}