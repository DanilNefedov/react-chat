import style from './Friends.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '../Search/Search'
import React, { Suspense, useReducer, useRef, useState } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ModuleError } from '../ModalError/ModalError';
import { Loader } from '../Loader/Loader';
import { initialStateModal, reducerModal } from '../../state/modalError';
import { UserNavigation } from '../UserNavigation/UserNavigation';
import { Empty } from '../Empty/Empty';
import addGroups from '../../img/add-groups.svg'
import { updateFriends } from './functions/updateFriends';
import { updateGroups } from './functions/updateGroups';


const FriendsList = React.lazy(() => import('./FriendsList/FriendsList'))

export let selectedFriends = []


export default function Friends() {
    const [activeModal, setActiveModal] = useState(false)
    const navRef = useRef()
    const searchRefUser = useRef()
    const containerFrineds = useRef()
    const friendsScroll = useRef()
    const [text, setText] = useState('')
    const [stateModal, dispatchModal] = useReducer(reducerModal, initialStateModal)
    const myInfo = useSelector(state => state.user)
    const db = getFirestore();
    const dispatch = useDispatch()
    const friendList = useSelector(state => state.friend.friend)
    const groupList = useSelector(state => state.group.group)
    const sortState = [...friendList, ...groupList]
    const headRef = useRef()
    const searchRef = useRef();
    const searchListRef = useRef();
    const refSearch = useRef(null)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chatsList", myInfo.id), (doc) => {
            if (doc.data()) {
                const data = Object.entries(doc.data())
                data.map(el => {
                    const combinedId = el[0]
                    const infoChat = el[1]
                    const lastMessages = infoChat.lastMessage ? infoChat.lastMessage.messageText : 'No messages'
                    const photo = infoChat.photo.photo 
                    const userDate = infoChat.date && infoChat.date.toDate()
                    const timePublic = userDate.getTime() && userDate.getTime() 
                    const dateUserNow = new Date()
                    const findMyDayBase = `${userDate.getDate()}.${userDate.getMonth() + 1}.${userDate.getFullYear()}`
                    const findMyDayUser = `${dateUserNow.getDate()}.${dateUserNow.getMonth() + 1}.${dateUserNow.getFullYear()}`
                    const viewMess = infoChat.viewMessage
                    const view = viewMess.viewMess
                    const idSender = viewMess.idSender 
                    const newMess = viewMess.newMessView
                    let minute = userDate.getMinutes().toString()
                    if (minute.length === 1) {
                        minute = `0${minute}`
                    }
                    if (combinedId && infoChat.chat) {

                        updateFriends(friendList, infoChat, findMyDayBase, 
                            findMyDayUser, userDate, minute, 
                            combinedId, dispatch, newMess, 
                            view, timePublic, lastMessages, 
                            photo, idSender)
                        

                    } else if (infoChat.group) {

                        updateGroups(groupList, infoChat, findMyDayBase, 
                            findMyDayUser, userDate, minute, 
                            combinedId, dispatch, newMess, 
                            view, timePublic, lastMessages, 
                            photo, idSender)
                        
                    }

                })
                dispatchModal({ type: 'resetModal', payload: initialStateModal })
            }
            else {
                dispatchModal({ type: 'activeModalWindow', payload: true })
                return
            }

        });
        return () => {
            unsub()
        }
    }, [friendList, groupList])


    function resize() {
        if (containerFrineds.current !== null) {
            const containerFrinedsHeight = containerFrineds.current.offsetHeight
            const headRefHeight = headRef.current.offsetHeight
            const navigationRefHeight = navRef.current.offsetHeight
            const windowHeight = window.innerHeight

            const sum = containerFrinedsHeight + headRefHeight + navigationRefHeight

            const res = windowHeight - sum

            const newHeight = containerFrinedsHeight - (-res)

            containerFrineds.current.style.height = `${newHeight}px`
        }
    }

    useEffect(() => {
        window.addEventListener("onload", resize);
        resize()
        return () => window.addEventListener("resize", resize);
    }, [friendList])


    useEffect(() => {
        const searchBlock = refSearch.current
        const searchActiveBlock = searchRefUser.current
        const onClick = e => {
            if (!searchBlock.contains(e.target)) {
                if (searchActiveBlock !== undefined && !searchActiveBlock.contains(e.target)) {
                    setActiveModal(false)
                }
            }
        }

        if (!activeModal) {
            document.addEventListener('click', onClick);
        }
        return () => document.removeEventListener('click', onClick);
    }, [])


    return (
        <>
            <UserNavigation setActiveModal={setActiveModal} innerRef={navRef} searchRefUser={searchRefUser} />


            <section className="home">
                <div ref={refSearch} className={activeModal ? classNames(style.searchFriends, "search-friends, active-modal-search") : classNames(style.searchFriends, "search-friends")}>
                    <Search navRef={navRef} searchListRef={searchListRef} searchRef={searchRef} text={text} setText={setText} />
                </div>

                <section className={style.friends} ref={friendsScroll}>

                    <div className={classNames(style.container, 'container')}>

                        <div ref={headRef} className={classNames(style.head, 'head')}>
                            <h2 className={classNames(style.header, 'header')}>
                                Friends
                            </h2>
                            {(friendList.length > 0 ) ?
                            <Link onClick={() => {selectedFriends = []}} to='/groups' className={style.groupsAdd}>
                                <img src={addGroups} alt="Add Groups" />
                            </Link> :
                            <></>}
                            
                        </div>
                        <div ref={containerFrineds} className={style.scrollMessages}>
                            <div className={classNames(style.containerFriendsList)}>
                                <Suspense fallback={<Loader></Loader>}>
                                    {(friendList.length > 0 || groupList.length > 0) ? (
                                        sortState.sort((a, b) => b.timePublic - a.timePublic).map((friend) => (
                                            <FriendsList key={friend.id} friend={friend}></FriendsList>
                                        ))
                                    ) : (
                                        <Empty text={'Friend list is empty'}></Empty>
                                    )}
                                </Suspense>
                            </div>

                        </div>
                    </div>
                </section>

                {stateModal.activeModalWindow ? <ModuleError state={[stateModal, dispatchModal]}></ModuleError> : <></>}
            </section>
        </>

    );
}
