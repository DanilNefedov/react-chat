import dots from '../../img/dots.svg';
import style from './Friends.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { FriendsList } from "./FriendsList/FriendsList";
import { Search } from '../Search/Search'
import { addFrined } from '../../store/friendSlice'
import { useState } from 'react';
import userImg from '../../img/user-M.png'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
//import { redirect } from 'react-router-dom';


export function Friends() {

    const [text, setText] = useState('')

    const [user, setUser] = useState('')


    const taskAddFriend = (event) => {
        event.preventDefault();
        setText('')//clear the entry text
        searchUsers()
    }



    const searchUsers = async () =>{
        const db = getFirestore();
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

    console.log(friendList)

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

                    { friendList.length > 0 ? (
                        friendList.map((friend) => (
                            <FriendsList friends = {friend}></FriendsList>
                        ))
                    ):(
                        <div>Friend list is empty</div>
                    )}

                </div>
            </section>
        </>
    );
}
