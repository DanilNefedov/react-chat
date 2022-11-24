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
    //const user = true;

    const [text, setText] = useState('')
    //const friend = useSelector(state => state.friend.friend)
    //const user = useSelector(state => state.user) 
    
    const [user, setUser] = useState('')


    // const numberID = friend.length <= 0 ? 1 : parseInt(friend[friend.length - 1].id.match(/\d+/))//search number of id user
    // const userId = friend.length <= 0 ? `friend${numberID}` : `friend${numberID + 1}`


    //console.log(user)

    const dispatch = useDispatch()
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
                const name= data.name
                const id = data.id
                const email = data.email
                console.log(data)
                setUser(data)
                dispatch(addFrined({name, id, email} ))
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
    const friend = useSelector(state => state.friend.friend)
    console.log(friend, user)
    return (

        <>
            <Search handleSubmit={taskAddFriend} text={text} setText={setText} handleEvent={handleEvent} />
            <section className={style.friends}>

                <div className={classNames(style.container, 'container')}>
                    <div className={classNames(style.head, 'head')}>
                        <h2 className={classNames(style.header, 'header')}>
                            Friends
                        </h2>
                        <div className={classNames(style.dots, 'search-dots')}><img src={dots} alt="Search" /></div>
                    </div>


                    { user ? (
                        <div className="">Friend list empty</div>
                    ) : (
                        friend.map((friend) => (
                            // friend={friend} key={friend.id}
                            <FriendsList nameUser={user.name}  />
                        ))
                    )
                    }
                </div>
            </section>
        </>


    );
}
