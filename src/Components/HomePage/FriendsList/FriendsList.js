import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import img from '../../../img/user-M.png'
import { useSelector } from 'react-redux';
import { doc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';



export default function FriendsList({friend}) {
    const {id, name, lastMessages, date, photo, view} = friend
    const myInfo = useSelector(state => state.user)
    const db = getFirestore()
    
    // const viewMess = view === undefined ? true : false
    console.log(view)
    //GjEfkiFmyWZHbk4egF5QchdKxlD2 - me
    //ESBe9PgxZSfsPArSATzprDOMdQx2 - friend
    const delViewMess = async () => {
        //console.log(id)
        await updateDoc(doc(db, 'chatsList', myInfo.id), {
            [id + '.lastMessage']: {
                messageText: lastMessages,
                view: true
            }
        })
    }

    return (

        <Link onClick={() => delViewMess()} to={id} className={classNames(style.list, 'list-content')}>
            <div className={style.message}>
                <div className={classNames(style.userPhoto, 'user-mess')}>
                    <img src={photo !== null ? photo : img} alt="User" />
                </div>
                <div className={style.userMess}>
                    <p className={classNames(style.name, 'head-name')}>{name}</p>
                    <p className={style.headMess}>{lastMessages === ''? 'No messages': lastMessages}</p>
                </div>
            </div>
            <div className="list-date-check">
                <div className={classNames(style.date, 'list-date')}>
                    {date}
                </div>
                {view ? <></> : <div className={classNames(style.viewMess)}>1+</div>}
            </div>
        </Link>

    );
}