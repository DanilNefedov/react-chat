import dots from '../../img/dots.svg';
import style from './Friends.module.css';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { FriendsList } from "./FriendsList/FriendsList";
import { Search } from '../Search/Search'
import { addFrined } from '../../store/friendSlice'
import { useState } from 'react';


export function Friends() {
    const [text, setText] = useState('')
    const friend = useSelector(state => state.friend.friend)


    const numberID = friend.length <= 0 ? 1 : parseInt(friend[friend.length - 1].id.match(/\d+/))//search number of id user
    const userId = friend.length <= 0 ? `friend${numberID}` : `friend${numberID + 1}`


    //console.log(friend)

    const dispatch = useDispatch()
    const taskAddFriend = (event) => {
        event.preventDefault();
        dispatch(addFrined({ text, userId }))
        setText('')//clear the entry text
    }

    return (
        <>
            <Search handleSubmit={taskAddFriend} text={text} setText={setText} />
            <section className={style.friends}>

                <div className={classNames(style.container, 'container')}>
                    <div className={classNames(style.head, 'head')}>
                        <h2 className={classNames(style.header, 'header')}>
                            Friends
                        </h2>
                        <div className={classNames(style.dots, 'search-dots')}><img src={dots} alt="Search" /></div>
                    </div>


                    {friend.length <= 0 ? (
                        <div className="">Friend list empty</div>
                    ) : (
                        friend.map((friend) => (
                            <FriendsList friend={friend} key={friend.id} />
                        ))
                    )
                    }
                </div>
            </section>
        </>

    );
}