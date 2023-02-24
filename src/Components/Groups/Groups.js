import { Search } from "../Search/Search";
import { UserNavigation } from "../UserNavigation/UserNavigation";
import { EditGroups } from "./EditGroups";
import style from './Groups.module.css'
import classNames from 'classnames';
import { useRef, useState } from "react";
import { Contacts } from "./Contacts";
import { useSelector } from "react-redux";
import { Empty } from "../Empty/Empty";

export function Groups() {
    const navRef = useRef()
    const friends = useSelector(state => state.friend.friend)
    const sortState = [...friends]
    const selectedFriends = []


    const addFriend = (el) =>{
        const index = selectedFriends.indexOf(el);
        if (index === -1) {
            selectedFriends.push(el);
        } else {
            selectedFriends.splice(index, 1);
        }
        console.log(selectedFriends)//write to state(useReducer) for sending in another functon
    }
    

    return (
        <>
            <UserNavigation innerRef={navRef} />

            <section className={style.groups}>
                <div className={classNames(style.container, 'container')}>
                    <div className={style.groupParams}>
                        <EditGroups></EditGroups>
                    </div>
                    <div className={classNames(style.addFriends, 'add-friends')}>
                        <div className={style.headerContacs}>
                            <h2 className={classNames(style.header, 'header')}>
                                Contacts
                            </h2>
                        </div>
                        {(friends.length > 0) ? (
                            sortState.sort((a, b) => b.timePublic - a.timePublic).map((friend, indexBlock) => (
                                <Contacts addFriend={addFriend} indexBlock={indexBlock} key={friend.id} friends={friend}></Contacts>
                            ))
                        ) : (
                            <Empty text={'Contacts list is empty'}></Empty>
                        )}
                    </div>
                </div>
            </section>
        </>

    )
}