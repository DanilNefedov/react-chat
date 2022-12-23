import dots from '../../img/dots.svg';
import style from './Friends.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { FriendsList } from "./FriendsList/FriendsList";
import { Search } from '../Search/Search'
import { addFrined, addLastMessage } from '../../store/friendSlice'
import { useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { updateUser } from '../../store/authSlice';
//import { redirect } from 'react-router-dom';


export function Friends() {

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
            console.log(error)
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

    // const [dateState, useDateState] = useState('')

    // console.log(dateState)
    useEffect(()=>{
        
        const unsub = onSnapshot(doc(db, "chatsList", myInfo.id), (doc) => {
            if(doc.data()){
               
                const data = Object.entries(doc.data())
                console.log(data)
                data.map(el => {
                    const combinedId = el[0]
                    const friendId = el[1].userInfo.id
                    const name = el[1].userInfo.displayName
                    const photo = el[1].userInfo.photo
                    const lastMessages = el[1].lastMessage ? el[1].lastMessage.messageText : 'No messages'
                    //console.log(lastMessages)
                    const timePublic = el[1].date.toDate().getTime()
                    const dayMess = day[el[1].date.toDate().getDay()]//
                    const hoursMess = el[1].date.toDate().getHours()//
                    let minute = el[1].date.toDate().getMinutes().toString()
                    if(minute.length === 1){
                        minute = `0${minute}`
                    }
                    const date = `${dayMess} ${hoursMess}:${minute}`
                    //useDateState(el[1].date)
                    //console.log(minute,timePublic)
                    const find = friendList.find(el => el.id === combinedId)
                    //console.log(find, friendList)
                    if (!find) {
                        //console.log('new')
                        dispatch(addFrined({ combinedId, name, date, friendId, timePublic, lastMessages, photo }))
                    }else if(find.timePublic !== friendList.timePublic){
                        const friendInfo = combinedId
                        const messageText = lastMessages
                        const datePush = date
                        //console.log('old')
                        dispatch(addLastMessage({friendInfo, messageText, datePush, timePublic}))
                        
                    }

                    //console.log(data, combinedId)
                })
            }else{
                return false
            }
            
        });

       
    
        return () => {
            //unsubPhoto()
            unsub() 
        }
    },[myInfo.id, friendList.map(el => el.timePublic)]) 


 
    
    const sortState = [...friendList]

    //console.log(friendList, sortState)
    //console.log(sortState)
    return (
        <>
            <Search user={user} handleSubmit={taskAddFriend} text={text} setText={setText} handleEvent={handleEvent} />
            <section className={style.friends}>

                <div className={classNames(style.container, 'container')}>
                    <div className={classNames(style.head, 'head')}>
                        <h2 className={classNames(style.header, 'header')}>
                            Friends
                        </h2>
                        <div className={classNames(style.dots, 'search-dots')}><img src={dots} alt="Search" /></div>
                    </div>

                    { (friendList.length > 0 ) ? (
                        sortState.sort((a,b) => b.timePublic - a.timePublic).map((friend) => ( 
                            <FriendsList key={friend.id} friend={friend}></FriendsList>
                        ))
                    ):(
                        <div>Friend list is empty</div>
                    )}

                </div>
            </section>
        </>
    );
}
