import { useParams } from 'react-router-dom';
import style from './MessagesMain.module.css';
import styleFriends from '../HomePage/Friends.module.css';
import classNames from 'classnames';
import dots from '../../img/dots.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {addMessage, addMessagesOldFriend} from '../../store/messagesSlice'
import { useState } from 'react';
import { SendMessages } from './SendMessages';
import { MessagesFieldMe } from './MessagesFieldMe';
import { addLastMessage } from '../../store/friendSlice';



export function MessagesMain() {
    // const [messageText, setMessageText] = useState('');
    // const friendState = useSelector(state => state.friend.friend)
    // const messagesState = useSelector(state => state.message.messages)
    // const dispatch = useDispatch()

    // let friendInfo

    // const [link] = Object.values(useParams())
    // friendState.forEach(el => {
    //     if(el.id === link){
    //         friendInfo = el
    //     }
    // })

    // const getWeekDay = (date) =>{
    //     const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] 
    //     return day[date.getDay()]
    // }


    // const oldFriend = messagesState.find(el => el.idUser === friendInfo.id )
    // const addMessageTask = () => {
    //     const dateNow = new Date()
    //     const timeNow = dateNow.toLocaleTimeString('en-US')
    //     const datePush = `${getWeekDay(dateNow)}, ${timeNow}`
    //     oldFriend ? dispatch(addMessagesOldFriend({messageText, friendInfo, datePush})) : dispatch(addMessage({messageText, friendInfo, datePush}))
    //     setMessageText('')

    //     dispatch(addLastMessage({messageText, friendInfo, datePush}))
    // }


    return (
        <section className={styleFriends.friends}>
            <div className={classNames(style.container, 'container')}>
                <header className={style.header}>
                    <div className={style.user}>
                        <div className={style.userImg}>
                            <img src='/' alt="User" />
                            {/* {friendInfo.userImg} */}
                        </div>
                        <div className={style.about}>
                            <h2 className={style.name}>
                                {/* {friendInfo.name} */}
                            </h2>
                            <div className={style.online}>Online</div>
                        </div>

                    </div>
                    <div className={classNames(style.dots, 'search-dots')}>
                        <img src={dots} alt="Dots" />
                    </div>
                </header>

                <section id='scroll' className={style.messages}>
                    {/* {   (oldFriend === undefined)?
                        (<div>List messages is empty</div>) :
                        (
                            oldFriend.messages.map(el => <MessagesFieldMe messages={el} key={el.date}></MessagesFieldMe>)
                        )
                    } */}
                </section>

                {/* <SendMessages addMessageTask={addMessageTask} messageText={messageText} setMessageText={setMessageText}/> */}
            </div>
        </section>
    );

}