import search from '../../img/search.svg';
import dots from '../../img/dots.svg';
import style from './Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFrined } from '../../store/friendSlice';
import { SearchList } from './SearchList'
import { doc, getDoc, getFirestore, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Empty } from '../Empty/Empty';
import { useEffect, useState } from 'react';
import { addMessage } from '../../store/messagesSlice';
import { useOutletContext } from 'react-router-dom';
import { ModuleError } from '../ModuleError/ModuleError';



export function Search({ user, handleSubmit, text, setText, handleEvent, searchListRef, searchRef }) {


    // const name = user.name;
    // const id = user.id;
    // const photo = user.photoURL
    console.log(user)

    const [propsErr, setPropsErr] = useState('')
    const [moduleErr, setModuleErr] = useState(false)

    const dispatch = useDispatch()
    const db = getFirestore()
   


    const friend = useSelector(state => state.friend.friend)
    //console.log(friend,name)
    const myInfo = useSelector(state => state.user)
    //console.log(name, id,photo, friend, myInfo)

    
    const bindChat = async (el) => {
        console.log(el)
        const name = el.name;
        const id = el.id;
        const photo = el.photoURL
        const combinedId = myInfo.id > id ? myInfo.id + id : id + myInfo.id
        const find = friend.find(el => el.id === combinedId)

        //console.log(user)

        try {
           
            //console.log('n')
            if (!find) {
                const friendId = id
                dispatch(addFrined({ combinedId, name, friendId, photo }))
            }
            
            const res = await getDoc(doc(db, 'chats', combinedId))
            
            

            if (!res.exists()) {
                //console.log(friend)
                // const [name, photo] = friend[0]
                // const chatId = id
                // dispatch(addMessage({name, photo, chatId}))
                await setDoc(doc(db, 'chats', combinedId), { messages: [] })

                await updateDoc(doc(db, 'chatsList', myInfo.id), {
                    [combinedId + '.userInfo']: {
                        id: id,
                        displayName: name,
                        photo: photo
                    },
                    [combinedId + '.date']: serverTimestamp()
                })

                await updateDoc(doc(db, 'chatsList', el.id), {
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
   
    return (
        <>
            <section ref={searchRef} className={style.search} id="search">
                <div className={style.cont}>
                    <input onKeyDown={handleEvent} value={text} onChange={(e) => setText(e.target.value)} type="text" id={style.searchIcon} placeholder="Find friend" />
                    <button type='submit' onClick={handleSubmit} className={style.loupe} htmlFor="search-icon"><img src={search} alt="Search" /></button>

                </div>

            </section>
            <section ref={searchListRef} className={style.searchList} id="search-list">
                {/* <div className={style.searchCont}> */}
                    {/* <h2 className='header'>Search List</h2> || id === myInfo.id*/}
                    {(user.length === 0 ) ? (
                        <Empty />
                    ) : (
                        // user.map(el => {
                            //console.log(el)
                            <SearchList user={user} clickChat={bindChat} />
                        // })
                        
                    )}
                {/* </div> */}
            </section>
            {moduleErr ? <ModuleError propsErr={propsErr} setModuleErr={setModuleErr}></ModuleError> : <></>}
        </>

    );

}