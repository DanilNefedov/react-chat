import style from './Friends.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '../Search/Search'
import { addFrined, addLastMessage, deletedFriend, updatePhotoName, viewMessage } from '../../store/friendSlice'
import React, { Suspense, useReducer, useRef, useState } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ModuleError } from '../ModalError/ModalError';
import { Loader } from '../Loader/Loader';
import { initialStateModal, reducerModal } from '../../state/modalError';
import { UserNavigation } from '../UserNavigation/UserNavigation';
import { Empty } from '../Empty/Empty';
import addGroups from '../../img/add-groups.svg'
import { addGroup, addLastMessagesGroup, viewMessageGroup } from '../../store/groupSlice';


const FriendsList = React.lazy(() => import('./FriendsList/FriendsList'))


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
    //console.log(friendList, groupList)
    const sortState = [...friendList, ...groupList]
    const headRef = useRef()
    const searchRef = useRef();
    const searchListRef = useRef();
    const refSearch = useRef(null)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chatsList", myInfo.id), (doc) => {
            if (doc.data()) {
                const data = Object.entries(doc.data())
                // console.log(data)
                data.map(el => {
                    const combinedId = el[0]
                    const infoChat = el[1]
                    const lastMessages = infoChat.lastMessage ? infoChat.lastMessage.messageText : 'No messages'
                    const photo = infoChat.photo.photo 
                    // console.log(infoChat, infoChat.photo)
                    const userDate = infoChat.date.toDate()//err delete friend must update Date
                    const timePublic = userDate.getTime() ? userDate.getTime() : '--:--'
                    const dateUserNow = new Date()
                    const findMyDayBase = `${userDate.getDate()}.${userDate.getMonth() + 1}.${userDate.getFullYear()}`
                    const findMyDayUser = `${dateUserNow.getDate()}.${dateUserNow.getMonth() + 1}.${dateUserNow.getFullYear()}`
                    const view = infoChat.viewMessage.view
                    const idSender = infoChat.idSender ? infoChat.idSender.idSender : null
                    const newMess = infoChat.viewNewMessage.viewNewMess
                    let minute = userDate.getMinutes().toString()
                    if (minute.length === 1) {
                        minute = `0${minute}`
                    }
                    if (combinedId && infoChat.chat) {
                        const find = friendList.find(el => el.id === combinedId)
                        const friendId = infoChat.chat.id
                        const name = infoChat.name.name
                        const deleted = infoChat.deleted.deleted
                        if (findMyDayBase === findMyDayUser) {
                            const date = `${userDate.getHours()}:${minute}`//maybe err in userDate
                            // console.log(find.lastMessages, lastMessages)
                            if (!find ) {
                                dispatch(addFrined({deleted, newMess, view, combinedId, name, date, friendId, timePublic, lastMessages, photo, idSender }))
                            } else if (find && find.timePublic !== timePublic ) {
                                dispatch(addLastMessage({deleted, idSender, view, combinedId, lastMessages, date, timePublic }))
                            } else if (find.name !== name || find.photo !== photo) {
                                dispatch(updatePhotoName({ combinedId, photo, name }))
                            } else if (find && deleted){
                                dispatch(deletedFriend({combinedId, deleted, name, photo}))
                            }

                        } else {
                            const date = findMyDayBase
                            if (!find ) {
                                dispatch(addFrined({deleted, newMess, view, combinedId, name, date, friendId, timePublic, lastMessages, photo, idSender }))
                            } else if (find && find.lastMessages !== lastMessages ) {
                                dispatch(addLastMessage({deleted, idSender, view, combinedId, lastMessages, date, timePublic }))
                            } else if (find.name !== name || find.photo !== photo) {
                                dispatch(updatePhotoName({ combinedId, photo, name }))
                            } else if (find && deleted){
                                dispatch(deletedFriend({combinedId, deleted, name, photo}))
                            }
                        }
                        dispatch(viewMessage({ newMess, view, combinedId, idSender }))

                    } else if (infoChat.group) {
                        //console.log(lastMessages)
                        const find = groupList.find(el => el.id === combinedId)
                        const users = infoChat.group.users
                        const name = infoChat.name.name
                        if (findMyDayBase === findMyDayUser) {//change to variables and "?:"
                            const date = `${userDate.getHours()}:${minute}`//maybe err in userDate
                            if (!find) {
                                dispatch(addGroup({ combinedId, users, photo, name, lastMessages, date, timePublic, view, idSender, newMess }))
                            } else if (find && find.timePublic !== timePublic) {
                                dispatch(addLastMessagesGroup({ idSender, view, combinedId, lastMessages, date, timePublic }))
                            }
                        } else if (findMyDayBase !== findMyDayUser) {
                            const date = findMyDayBase
                            if (!find) {
                                dispatch(addGroup({ combinedId, users, photo, name, lastMessages, date, timePublic, view, idSender, newMess }))
                            } else if (find.timePublic !== timePublic) {
                                dispatch(addLastMessagesGroup({ idSender, view, combinedId, lastMessages, date, timePublic }))
                            }
                        }
                        dispatch(viewMessageGroup({ newMess, view, combinedId, idSender }))
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
    }, [friendList, groupList])//friendList

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
                            <Link to='/groups' className={style.groupsAdd}>
                                <img src={addGroups} alt="Add Groups" />
                            </Link> :
                            <></>}
                            
                        </div>
                        <div ref={containerFrineds} className={style.scrollMessages}>
                            <div className={classNames(style.containerFriendsList)}>
                                <Suspense fallback={<Loader></Loader>}>
                                    {(friendList.length > 0 || groupList.length > 0) ? (
                                        sortState.sort((a, b) => b.timePublic - a.timePublic).map((friend) => (
                                            // console.log(friend)
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
