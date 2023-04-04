import { UserNavigation } from "../UserNavigation/UserNavigation";
import { EditGroups } from "./EditGroups";
import style from './Groups.module.css'
import classNames from 'classnames';
import { useReducer, useRef, useState } from "react";
import { Contacts } from "./Contacts";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "../Empty/Empty";
import { initialStateGroup, reducerGroup } from "../../state/group";
import { v4 as uuid } from 'uuid';
import { getFirestore } from "firebase/firestore";
import back from '../../img/back-dark.svg'
import { selectedFriends } from "../HomePage/Friends";
import { Loader } from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { initialStateModal, reducerModal } from "../../state/modalError";
import { ModuleError } from "../ModalError/ModalError";
import { requestAddGroup } from "./functions/requestAddGroup";





export function Groups() {
    const [activeContacts, setActiveContacs] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const navRef = useRef()
    const friends = useSelector(state => state.friend.friend)
    const myInfo = useSelector(user => user.user)
    const group = useSelector(state => state.group.group)
    const sortState = [...friends]
    const [stateGroup, dispatchStateGroup] = useReducer(reducerGroup, initialStateGroup)
    const db = getFirestore();
    const [stateModalErr, dispatchStateErr] = useReducer(reducerModal, initialStateModal)

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
        const findGroup = group.find(el => el.id === combinedId)

        if (users.length > 0 && stateGroup.name.trim() !== '') {

            dispatchStateGroup({type: 'lengthNameErr', payload: initialStateGroup.lengthNameErr})
            dispatchStateGroup({type: 'emptyUsers', payload: initialStateGroup.emptyUsers})

            requestAddGroup(users, myInfo, findGroup, dispatch, combinedId, db, navigate, [stateModalErr, dispatchStateErr], [stateGroup, dispatchStateGroup])
            
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