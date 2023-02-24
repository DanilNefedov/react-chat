import style from './Friends.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '../Search/Search'
import { addFrined, addLastMessage, updatePhotoName, viewMessage } from '../../store/friendSlice'
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
    const sortState = [...friendList]
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
                    if (combinedId) {
                        const find = friendList.find(el => el.id === combinedId)
                        const userInfo = el[1].userInfo
                        const userDate = el[1].date.toDate()//some error
                        const friendId = userInfo.id
                        const name = userInfo.displayName
                        const photo = userInfo.photo
                        const lastMessages = el[1].lastMessage ? el[1].lastMessage.messageText : 'No messages'
                        const timePublic = userDate.getTime() ? userDate.getTime() : '--:--'
                        const dateUserNow = new Date()
                        const findMyDayBase = `${userDate.getDate()}.${userDate.getMonth()+1}.${userDate.getFullYear()}`
                        const findMyDayUser = `${dateUserNow.getDate()}.${dateUserNow.getMonth()+1}.${dateUserNow.getFullYear()}`
                        const view = el[1].viewMessage.view 
                        const idSender = el[1].idSender ? el[1].idSender.idSender : null
                        const newMess = el[1].viewNewMessage.viewNewMess 

                        let minute = userDate.getMinutes().toString()
                        if (minute.length === 1) {
                            minute = `0${minute}`
                        }
                        
                        if(findMyDayBase === findMyDayUser){
                            const date = `${userDate.getHours()}:${minute}`//maybe err in userDate

                            if (!find) {
                                dispatch(addFrined({newMess, view, combinedId, name, date, friendId, timePublic, lastMessages, photo, idSender }))
                                
                            } else if (find.timePublic !== timePublic) {
                                dispatch(addLastMessage({idSender,  view, combinedId, lastMessages, date, timePublic }))

                            }else if (find.name !== name || find.photo !== photo) {
                                dispatch(updatePhotoName({ combinedId, photo, name }))
                            }

                        }else {
                            const date = findMyDayBase
                            if (!find) {
                                dispatch(addFrined({newMess, view, combinedId, name, date, friendId, timePublic, lastMessages, photo, idSender }))
                            } else if (find.timePublic !== timePublic) {
                                dispatch(addLastMessage({idSender,  view, combinedId, lastMessages, date, timePublic }))

                            }else if (find.name !== name || find.photo !== photo) {
                                dispatch(updatePhotoName({ combinedId, photo, name }))
                            }
                        }
                        dispatch(viewMessage({newMess, view,combinedId,idSender}))
                    }  
                })
                dispatchModal({type:'resetModal', payload:initialStateModal})
            } else {
                dispatchModal({type:'activeModalWindow', payload:true})
                return 
            }

        });
        return () => {
            unsub()
        }
    }, [ friendList]) 

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


    useEffect(()=>{
        const searchBlock = refSearch.current
        const searchActiveBlock = searchRefUser.current
        const onClick = e => {    
            if(!searchBlock.contains(e.target)){
                if(searchActiveBlock !== undefined && !searchActiveBlock.contains(e.target)){
                    setActiveModal(false)
                }
            } 
        }

        if(!activeModal){
            document.addEventListener('click', onClick);
        }
        return () => document.removeEventListener('click', onClick);
    }, [])


    return (
    <>
        <UserNavigation setActiveModal={setActiveModal} innerRef={navRef} searchRefUser={searchRefUser}/>
        <section className="home">
            <div ref={refSearch} className={activeModal ? classNames(style.searchFriends, "search-friends, active-modal-search") : classNames(style.searchFriends, "search-friends")}>
                <Search navRef={navRef} searchListRef={searchListRef} searchRef={searchRef}  text={text} setText={setText}  />
            </div> 
            <section className={style.friends} ref={friendsScroll}>

                <div className={classNames(style.container, 'container')}>
                    <div ref={headRef} className={classNames(style.head, 'head')}>
                        <h2 className={classNames(style.header, 'header')}>
                            Friends
                        </h2>
                        <Link to='/groups' className={style.groupsAdd}>
                            <img src={addGroups} alt="Add Groups" />
                        </Link>
                    </div>
                    <div ref={containerFrineds} className={style.scrollMessages}>
                        <div className={classNames(style.containerFriendsList)}>
                            <Suspense fallback={<Loader></Loader>}>
                                {(friendList.length > 0 ) ? (
                                    sortState.sort((a,b) => b.timePublic - a.timePublic).map((friend) => ( 
                                        <FriendsList key={friend.id} friend={friend}></FriendsList>
                                    ))
                                ):(
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
