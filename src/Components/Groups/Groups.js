import { Search } from "../Search/Search";
import { UserNavigation } from "../UserNavigation/UserNavigation";
import { EditGroups } from "./EditGroups";
import style from './Groups.module.css'
import classNames from 'classnames';
import { useReducer, useRef, useState } from "react";
import { Contacts } from "./Contacts";
import { useSelector } from "react-redux";
import { Empty } from "../Empty/Empty";
import { initialStateGroup, reducerGroup } from "../../state/group";
import done from '../../img/done-contact.svg'



const selectedFriends = []


export function Groups() {
    const navRef = useRef()
    const friends = useSelector(state => state.friend.friend)
    const user = useSelector(user => user.user)
    const sortState = [...friends]
    const [stateGroup, dispatchStateGroup] = useReducer(reducerGroup, initialStateGroup)

    //------------------ CHANGE TO USEMEMO --------------------//
    const addFriend = (el) =>{
        const index = selectedFriends.indexOf(el);
        if (index === -1) {
            selectedFriends.push(el);
            dispatchStateGroup({type: 'users', payload: [...stateGroup.users, selectedFriends]})
        } else {
            selectedFriends.splice(index, 1);
            dispatchStateGroup({type: 'users', payload:selectedFriends})
        }
    }
    //------------------ CHANGE TO USEMEMO --------------------//
    // console.log(user)

    const addGroup = () =>{
        console.log(stateGroup)
        //const el = friendChoice
       


        // if(selectedFriends.length > 0 ){
        //     dispatchStateGroup({type: 'users', payload: selectedFriends})
        // }
        
        
        // if(){

        // }
        // if(selectedFriends.length <= 0){
        //     selectedFriends.length = 0;
        //     console.log('w')
        //     dispatchStateGroup({type: 'users', payload: selectedFriends})
        // }

        // 

    }
    


    return (
        <>
            <UserNavigation innerRef={navRef} />

            <section className={style.groups}>
                <div className={classNames(style.container, 'container')}>
                    <EditGroups state={[stateGroup, dispatchStateGroup]} addGroup={addGroup}></EditGroups>
                    <div className={classNames(style.addFriends, 'add-friends')}>
                        <div className={style.headerContacs}>
                            <h2 className={classNames(style.header, 'header')}>
                                Contacts
                            </h2>
                        </div>
                        <div className={style.contactContainer}>
                             {(friends.length > 0) ? (
                                sortState.sort((a, b) => b.timePublic - a.timePublic).map((friend, indexBlock) => (
                                    <Contacts addFriend={addFriend} indexBlock={indexBlock} key={friend.id} friends={friend}></Contacts>
                                ))
                            ) : (
                                <Empty text={'Contacts list is empty'}></Empty>
                            )}
                        </div>
                       
                    </div>
                </div>
            </section>
        </>

    )
}