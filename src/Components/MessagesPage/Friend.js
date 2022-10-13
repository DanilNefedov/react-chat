import style from './MessagesMain.module.css';
import styleFriends from '../HomePage/Friends.module.css';
import classNames from 'classnames';
import user from '../../img/user-M.png';
import dots from '../../img/dots.svg';
import send from '../../img/send.svg';
import { MessagesFieldMe } from './MessagesFieldMe';
import { MessagesFieldFriend } from './MessagesFieldFriend';



export function Friend(props){
    let userPage;
    let usersMessages;
    let nameUser = props.friend.map( el => el.id);
    const idFriend = props.friendId.friendId;
    const messagesList = props.messages;


    const find = (id, params) => {
        return id.filter(el => el.toLowerCase() === params.toLowerCase())
    }


    const [resFind] = find(nameUser, idFriend)


    props.friend.forEach(el =>{
        if(el.id === resFind){
            userPage = el
        }
    })


    messagesList.forEach(el =>{
        if(el.id === resFind){
            usersMessages = el.messages
        }
    })

    const drawMess = usersMessages.map(el => (el.me) ? <MessagesFieldMe messages={el.me}/> : <MessagesFieldFriend messages={el.friend}/>)
    //ключ использовать как дату в будущем
    
    //console.log(resFind)


    return(
        <section className={styleFriends.friends}>
            <div className={classNames(style.container, 'container')}>
                <header className={style.header}>
                    <div className={style.user}>
                        <div className={style.userImg}>
                            <img src={user} alt="User" />
                        </div>
                        <div className={style.about}>
                            <h2 className={style.name}>
                                {userPage.name}
                            </h2>
                            <div className={style.online}>Online</div>
                        </div>

                    </div>
                    <div className={classNames(style.dots, 'search-dots')}>
                        <img src={dots} alt="Dots" />
                    </div>
                </header>

                {drawMess}

                <section className={style.textArea}>
                    {/* <div className={style.textBlock}> */}
                    {/* <label className={style.send} htmlFor="textarea"><img src={send} alt="Send" /></label> */}
                    <textarea name="textarea" id='textarea' className={style.input} rows="1"></textarea>
                    {/* </div> */}
                    <button type='submit' className={style.send}>
                        <img src={send} alt="Send" />
                    </button>
                </section>
            </div>
        </section>
    );
}