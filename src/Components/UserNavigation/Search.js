import search from '../../img/search.svg';
import dots from '../../img/dots.svg';
import style from './UserNavigation.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFrined } from '../../store/friendSlice';
// import { SearchList } from './SearchList'
import { doc, getDoc, getFirestore, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Empty } from '../Empty/Empty';
import { useEffect } from 'react';
import { addMessage } from '../../store/messagesSlice';
import { SearchList } from '../Search/SearchList';

export function Search({ user, handleSubmit, text, setText, handleEvent }){
    const name = user.name;
    const id = user.id;
    const photo = user.photoURL

    

    const dispatch = useDispatch()
    const db = getFirestore()
   


    const friend = useSelector(state => state.friend.friend)
    //console.log(friend,name)
    const myInfo = useSelector(state => state.user)
    //console.log(name, id,photo, friend, myInfo)

    const combinedId = myInfo.id > id ? myInfo.id + id : id + myInfo.id
    
    const bindChat = async () => {
        
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

                await updateDoc(doc(db, 'chatsList', user.id), {
                    [combinedId + '.userInfo']: {
                        id: myInfo.id,
                        displayName: myInfo.name,
                        photo: myInfo.photo
                    },
                    [combinedId + '.date']: serverTimestamp()
                })
            }
           

            
        } catch (error) {
            console.error(error)
        }
    }
   
    return (
        <>
            <section className={style.search} id="search">
                <div className={style.cont}>
                    <input onKeyDown={handleEvent} value={text} onChange={(e) => setText(e.target.value)} type="text" id={style.searchIcon} placeholder="Find Person" />
                    <button onClick={handleSubmit} className={style.loupe} htmlFor="search-icon"><img src={search} alt="Search" /></button>
                </div>

            </section>

            {/* <SearchList friendList={{ user, myInfo, id, photo, name, combinedId, bindChat}}/>
            <section className={style.searchList}>
                <div className={style.searchCont}> 
                    <h2 className='header'>Search List</h2>*/}
            {/* {(!user || id === myInfo.id) ? (
                <Empty />
            ) : (
                <SearchList photo={photo} userName={name} userId={combinedId} clickChat={bindChat} />
            )}  */}
                {/* </div>
            </section> */}
        </>

    );
}