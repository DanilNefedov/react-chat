import search from '../../img/search.svg';
import style from './Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFrined } from '../../store/friendSlice';
import { collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { Suspense, useEffect, useReducer, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ModuleError } from '../ModalError/ModalError';
import classNames from 'classnames';
import { Loader } from '../Loader/Loader';
import React from 'react';
import { initialStateModal, reducerModal } from '../../state/modalError';
import { Empty } from '../Empty/Empty';

const SearchList = React.lazy(() => import('./SearchList'))

export function Search({ text, setText, searchListRef, searchRef, navRef }) {
    const [stateModal, dispatchModal] = useReducer(reducerModal, initialStateModal)
    const dispatch = useDispatch()
    const db = getFirestore()
    const friend = useSelector(state => state.friend.friend)
    const myInfo = useSelector(state => state.user)
    const [user, setUser] = useState([]) 
    const containerSearch = useRef()

    const handleSubmit = (event) => {
        event.preventDefault();
        setText('')
        searchUsers()
    }  

    const handleEvent = (e) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            searchUsers()
            setText('')
        }
    }


    const searchUsers = async () => {
        const q = query(collection(db, "users"), where('name', '==', text.trim()));
        
        try {
            const querySnapshot = await getDocs(q);
            const searchArr = []
            setUser([])

            querySnapshot.forEach((doc) => {
                const data = doc.data()
                if(data.id !== myInfo.id){
                    dispatchModal({type:'resetModal', payload:initialStateModal})
                    searchArr.push(data)
                    setUser(searchArr)
                }
            });

        } catch (error) {
            dispatchModal({type:'activeModalWindow', payload:true})
            console.error(error)
        }
    }



    const bindChat = async (el) => {
        const name = el.name;
        const id = el.id;
        const photo = el.photoURL
        const combinedId = myInfo.id > id ? myInfo.id + id : id + myInfo.id
        const findChat = friend.find(el => el.id === combinedId)

        try {
            if (!findChat) {
                const friendId = id
                dispatch(addFrined({ combinedId, name, friendId, photo }))
            }
            const res = await getDoc(doc(db, 'chats', combinedId))
            if (!res.exists()) {

                await setDoc(doc(db, 'chats', combinedId), {messages: [] })

                await updateDoc(doc(db, 'chatsList', myInfo.id), {
                    [combinedId + '.chat']:{
                        id: id
                    },
                    [combinedId + '.name'] : {
                        name: name,
                    },
                    [combinedId + '.photo'] : {
                        photo: photo
                    },
                    [combinedId + '.date']: serverTimestamp(),
                    [combinedId + '.viewMessage'] :{
                        view: false,
                        idSender:myInfo.id
                    },
                    [combinedId + '.idSender'] :{
                        idSender:myInfo.id
                    },
                    [combinedId + '.viewNewMessage'] :{
                        viewNewMess: true
                    },
                    [combinedId + '.deleted']:{
                        deleted:false
                    }
                })

                await updateDoc(doc(db, 'chatsList', id), {
                    [combinedId + '.chat']:{
                        id: myInfo.id
                    },
                    [combinedId + '.name'] : {
                        name: myInfo.name,
                    },
                    [combinedId + '.photo'] : {
                        photo: myInfo.photo
                    },
                    [combinedId + '.date']: serverTimestamp(),
                    [combinedId + '.viewMessage'] :{
                        view: false,
                    },
                    [combinedId + '.idSender'] :{
                        idSender:myInfo.id
                    },
                    [combinedId + '.viewNewMessage'] :{
                        viewNewMess: false
                    },
                    [combinedId + '.deleted']:{
                        deleted:false
                    }
                })
            }
            dispatchModal({type:'resetModal', payload:initialStateModal})
        } catch (error) {
            dispatchModal({type:'activeModalWindow', payload:true})
            console.error(error)
        }
    }
    
    function resize() {
        if (containerSearch.current !== null && containerSearch.current !== undefined) {
            const searchHeight = searchRef.current.offsetHeight
            const navigationRefHeight = navRef.current.offsetHeight
            const windowHeight = window.innerHeight

            const sum = searchHeight + navigationRefHeight

            const res = windowHeight - sum

            containerSearch.current.style.height = `${res}px`
        }
    }


    useEffect(() => {
        resize()
        window.addEventListener("onload", resize);
        return () => window.addEventListener("resize", resize);
    }, [user])




    return (
        <div className={classNames(style.container, "container")}>
            <section ref={searchRef} className={style.search} id="search">
                <div className={style.cont}>
                    <input inputMode='search' className={classNames(style.searchIcon)} onKeyUp={ (e) => handleEvent(e)} value={text} onChange={(e) => setText(e.target.value)} type="search" id={style.searchIcon} placeholder="Find friend" />
                    <button type='submit' onClick={handleSubmit} className={style.loupe} htmlFor="search-icon"><img src={search} alt="Search" /></button>

                </div>

            </section>
            <section ref={searchListRef} className={style.searchList} id="search-list">

                {(user.length === 0) ? (
                    <Empty text={'Search list is empty'}></Empty>
                ) : (
                    <div ref={containerSearch} className={classNames(style.containerSearchList, "container-search-list")}>
                        <Suspense fallback={<Loader></Loader>}>
                            <SearchList user={user} clickChat={bindChat} />
                        </Suspense>
                    </div>
                )}

            </section>
            {stateModal.activeModalWindow ? <ModuleError state={[stateModal, dispatchModal]}></ModuleError> : <></>}
        </div>


    );

}