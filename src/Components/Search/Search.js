import search from '../../img/search.svg';
import style from './Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFrined } from '../../store/friendSlice';
// import { SearchList } from './SearchList'
import { collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { Empty } from '../Empty/Empty';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ModuleError } from '../ModuleError/ModuleError';
import classNames from 'classnames';
import { Loader } from '../Loader/Loader';
import React from 'react';



const SearchList = React.lazy(() => import('./SearchList'))


export function Search({  text, setText, searchListRef, searchRef }) {
    //const [state, dispatch]

    const [moduleErr, setModuleErr] = useState(false)

    const dispatch = useDispatch()
    const db = getFirestore()

    const friend = useSelector(state => state.friend.friend)

    const myInfo = useSelector(state => state.user)

    const [propsErr, setPropsErr] = useState('')
    const [user, setUser] = useState([]) 

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
        const q = query(collection(db, "users"), where('name', '==', text));
        
        try {
            const querySnapshot = await getDocs(q);
            const searchArr = []
            setUser([])

            querySnapshot.forEach((doc) => {
                const data = doc.data()
                if(data.id !== myInfo.id){
                    setModuleErr(false)
                    searchArr.push(data)
                    setUser(searchArr)
                }
            });

        } catch (error) {
            setModuleErr(true)
            setPropsErr('')
            console.error(error)
        }
    }



    const bindChat = async (el) => {

        const name = el.name;
        const id = el.id;
        const photo = el.photoURL
        const combinedId = myInfo.id > id ? myInfo.id + id : id + myInfo.id
        const find = friend.find(el => el.id === combinedId)


        try {


            if (!find) {
                const friendId = id
                dispatch(addFrined({ combinedId, name, friendId, photo }))
            }

            const res = await getDoc(doc(db, 'chats', combinedId))



            if (!res.exists()) {

                await setDoc(doc(db, 'chats', combinedId), { messages: [] })

                await updateDoc(doc(db, 'chatsList', myInfo.id), {
                    [combinedId + '.userInfo']: {
                        id: id,
                        displayName: name,
                        photo: photo
                    },
                    [combinedId + '.date']: serverTimestamp()
                })

                await updateDoc(doc(db, 'chatsList', id), {
                    [combinedId + '.userInfo']: {
                        id: myInfo.id,
                        displayName: myInfo.name,
                        photo: myInfo.photo
                    },
                    [combinedId + '.date']: serverTimestamp()
                })
            }


            setModuleErr(false)

        } catch (error) {
            setModuleErr(true)
            console.error(error)
        }
    }

    const context = useOutletContext()
    const containerSearch = useRef()
    
    function resize() {
        if (containerSearch.current !== null && containerSearch.current !== undefined) {
            const searchHeight = searchRef.current.offsetHeight
            const navigationRefHeight = context.navRef.current.offsetHeight
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
                    <div className={style.empty}>Search list is empty</div>
                ) : (
                    <div ref={containerSearch} className={classNames(style.containerSearchList, "container-search-list")}>
                        <Suspense fallback={<Loader></Loader>}>
                            <SearchList user={user} clickChat={bindChat} />
                        </Suspense>
                    </div>
                )}

            </section>
            {moduleErr ? <ModuleError propsErr={propsErr} setModuleErr={setModuleErr}></ModuleError> : <></>}
        </div>


    );

}