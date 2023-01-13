import dots from '../../img/dots.svg';
import style from './Friends.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { FriendsList } from "./FriendsList/FriendsList";
import { Search } from '../Search/Search'
import { addFrined, addLastMessage, updatePhotoName } from '../../store/friendSlice'
import { useRef, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';




export function Friends() {
    const navigationRef = useOutletContext()
    const containerFrineds = useRef()
    const friendsScroll = useRef()  

    const [text, setText] = useState('')

    const [user, setUser] = useState('')

    const myInfo = useSelector(state => state.user)
    //console.log(myInfo)

    const db = getFirestore();

    const dispatch = useDispatch()

    const taskAddFriend = (event) => {
        event.preventDefault();
        setText('')//clear the entry text
        searchUsers()
    }



    const searchUsers = async () =>{
        const q = query(collection(db, "users"), where('name', '==', text));

        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                //console.log(data)
                setUser(data)


            });

        }catch (error){
            console.error(error)
        }

    
        
    }

    const handleEvent = (e) => {
        if(e.code === 'Enter'){
            searchUsers() 
            setText('')
        } 
        
    } 
    const friendList = useSelector(state => state.friend.friend)
    //console.log(friendList)
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


    // console.log(user)
    useEffect(()=>{
        
        const unsub = onSnapshot(doc(db, "chatsList", myInfo.id), (doc) => {
            if(doc.data()){
               
                const data = Object.entries(doc.data())
                //console.log(data)
                data.map(el => {
                    //console.log(data, friendList)
                    const combinedId = el[0]
                    if(combinedId){
                        const friendId = el[1].userInfo.id// err in page gh
                        const name = el[1].userInfo.displayName
                        //console.log(name)
                        const photo = el[1].userInfo.photo
                        const lastMessages = el[1].lastMessage ? el[1].lastMessage.messageText : 'No messages'
                        //console.log(lastMessages)
                        const timePublic = el[1].date.toDate().getTime() ? el[1].date.toDate().getTime() : '--:--'
                        const dayMess = day[el[1].date.toDate().getDay()]//
                        const hoursMess = el[1].date.toDate().getHours()//
                        let minute = el[1].date.toDate().getMinutes().toString()
                        if(minute.length === 1){
                            minute = `0${minute}`
                        }
                        const date = `${dayMess} ${hoursMess}:${minute}`
                        //console.log(minute,timePublic)
                        const find = friendList.find(el => el.id === combinedId)
                        //console.log(find, friendList)
                        if (!find) {
                            //console.log('new')
                            dispatch(addFrined({ combinedId, name, date, friendId, timePublic, lastMessages, photo }))
                        }else if(find.timePublic !== timePublic){
                            const friendInfo = combinedId
                            const messageText = lastMessages
                            const datePush = date
                            //console.log(timePublic)
                            dispatch(addLastMessage({friendInfo, messageText, datePush, timePublic}))
                            
                        }else if(find.name !== name || find.photo !== photo){
                            const friendInfo = combinedId
                            //console.log(photo)//update when new photo and name
                            dispatch(updatePhotoName({friendInfo, photo, name}))
                        }
                    }
                    
                    
                })
            }else{
                return false
            }
            
        });
        return () => {
            //unsubPhoto()
            unsub() 
        }
    },[myInfo.id, friendList.map(el => el)]) //update friend without static variables (error in npm) 


    const sortState = [...friendList]

    const headRef = useRef()
    const searchRef = useRef();
    const searchListRef = useRef();


    function resize(){

        const containerFrinedsHeight = containerFrineds.current.offsetHeight
        //console.log(containerFrinedsHeight)
        const headRefHeight = headRef.current.offsetHeight
        const navigationRefHeight = navigationRef.current.offsetHeight
        const searchRefHeight = searchRef.current.offsetHeight
        const searchListRefHeight = searchListRef.current.offsetHeight

        const windowHeight = window.innerHeight

        const sum = containerFrinedsHeight + headRefHeight + navigationRefHeight + searchRefHeight + searchListRefHeight
        
        const res = windowHeight - sum

        const newHeight = containerFrinedsHeight - (-res)

        containerFrineds.current.style.height = `${newHeight}px`
    
    }


    useEffect(()=>{
        window.addEventListener("onload", resize);
        resize()
        return () => window.addEventListener("resize", resize);        
    },[friendList])

 
    return (
        <div  className={classNames(style.searchFriends, "search-friends")}>
            <Search searchListRef={searchListRef} searchRef={searchRef} user={user} handleSubmit={taskAddFriend} text={text} setText={setText} handleEvent={handleEvent} />
            <section className={style.friends} ref={friendsScroll}>

                <div className={classNames(style.container, 'container')}>
                    <div ref={headRef} className={classNames(style.head, 'head')}>
                        <h2 className={classNames(style.header, 'header')}>
                            Friends
                        </h2>
                    </div>
                    <div ref={containerFrineds} className={style.scrollMessages}>
                        <div className={classNames(style.containerFriendsList)}>
                            { (friendList.length > 0 ) ? (
                                sortState.sort((a,b) => b.timePublic - a.timePublic).map((friend) => ( 
                                    <FriendsList key={friend.id} friend={friend}></FriendsList>
                                ))
                            ):(
                                <div>Friend list is empty</div>
                            )}
                        </div>
                        
                    </div>
                    

                </div>
            </section>
        </div>
      
    );
}
