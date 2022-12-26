import search from '../../img/search.svg';
import dots from '../../img/dots.svg';
import style from './Search.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addFrined } from '../../store/friendSlice';
import { SearchList } from './SearchList'
import { doc, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Empty } from '../Empty/Empty';



export function Search({ user, handleSubmit, text, setText, handleEvent }) {

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
            <section className={style.search}>
                <div className={style.cont}>
                    <input onKeyDown={handleEvent} value={text} onChange={(e) => setText(e.target.value)} type="text" id={style.searchIcon} placeholder="Search" />
                    <button onClick={handleSubmit} className={style.loupe} htmlFor="search-icon"><img src={search} alt="Search" /></button>
                    <label className={style.dots} htmlFor="search-icon"><img src={dots} alt="Search" /></label>
                </div>

            </section>
            <section className={style.searchList}>
                <div className={style.searchCont}>
                    <h2 className='header'>Search List</h2>
                    {(!user || id === myInfo.id) ? (
                        <Empty />
                    ) : (
                        <SearchList photo={photo} userName={name} userId={combinedId} clickChat={bindChat} />
                    )}
                </div>
            </section>
        </>

    );

}