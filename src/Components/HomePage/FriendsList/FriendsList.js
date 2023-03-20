import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import img from '../../../img/user-M.png'
import { useSelector } from 'react-redux';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import checkDone from '../../../img/check-mess-done.svg'
import checkMess from '../../../img/check-mess.svg'



export default function FriendsList({friend}) {
    const {id, name, lastMessages, date, photo, view, friendId, idSender, newMess} = friend
    const myInfo = useSelector(state => state.user)
    const db = getFirestore()
    // if(friend.users){
    //     console.log(friend.users)

    // }

    const delViewMess = async () => {
        try{
            await updateDoc(doc(db, 'chatsList', myInfo.id), {
                [id + '.viewNewMessage'] :{
                    viewNewMess: true
                }
            })
            if(friend.users ){
               
                Object.entries(friend.users).map(async el => {
                    // console.log(friendId)
                    if(el[0] !== myInfo.id){
                        await updateDoc(doc(db, 'chatsList', el[0]), {
                            [friend.id + '.viewMessage']: {
                                view: true, 
                            }
                        })
                    }
                })   
            }
            
            
        } catch(err){
            console.error(err)
        }
    }


    const viewMessage = () =>{
        if(!newMess && idSender !== myInfo.id){
            return <div className={classNames(style.viewMess)}>1+</div>
        }
        if(view && idSender === myInfo.id){
            return <img src={checkDone} alt="check message done"></img>
        }
        if(!view && idSender === myInfo.id){
            return <img src={checkMess} alt="check message done"></img>
        }
        return <></>
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
            <div className={style.listDateCheck}>
                <div className={classNames(style.date, 'list-date')}>
                    {date}
                </div>
                <div className={classNames(style.check)}>
                    {viewMessage()}
                </div>
            </div>
        </Link>
    );
}