import style from './FriendsList.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import img from '../../../img/user-M.png'
import { useSelector } from 'react-redux';
import { doc, getFirestore, serverTimestamp, updateDoc } from 'firebase/firestore';



export default function FriendsList({friend}) {
    const {id, name, lastMessages, date, photo, view, friendId, idSender} = friend
    const myInfo = useSelector(state => state.user)
    const db = getFirestore()
    
    //console.log(friend)
    const delViewMess = async () => {
        try{
            await updateDoc(doc(db, 'chatsList', myInfo.id), {
                [id + '.viewMessage']: {
                    view: true,
                }
            })
            await updateDoc(doc(db, 'chatsList', friendId), {
                [id + '.viewMessage']: {
                    view: idSender !== myInfo.id ? false : true,
                    // view: true ,
                }
            })
        } catch(err){
            console.error(err)
        }
    }


    const viewMessage = () =>{
        if(view && idSender === myInfo.id){
            return <div>-</div>
        }else if(!view && idSender !== myInfo.id){
            return <div className={classNames(style.viewMess)}>1+</div>
        }
        // else if(view && idSender !== myInfo.id){
        //     return <div>fs is</div>
        // }else if(!view && idSender === myInfo.id) {
        //     return <div className={classNames(style.viewMess)}>1+</div>
        // }else if(!view && idSender !== myInfo.id) {
        //     return <div>-</div>
        // }else{
        //     return  <></>
        // }
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
                {/* {view ? <>+</> : <div className={classNames(style.viewMess)}>1+</div>} */}
                {view ? idSender === myInfo.id 
                    ? <>-</> : <div>is fsen</div> 
                : idSender !== myInfo.id  
                    ?<div className={classNames(style.viewMess)}>1+</div> : <>+</>
                }
                {/* {view && idSender === myInfo.id ? <div>-</div> : view && idSender !== myInfo.id ? <div className={classNames(style.viewMess)}>1+</div> : !view && idSender !== myInfo.id ? 
                <div className={classNames(style.viewMess)}>1+</div> : <>f</>} */}
                {/* {viewMessage()} */}
                {/* {view && idSender === myInfo.id ? <div>+</div> : view && idSender !== myInfo.id ? <div>fs is</div> : !view && idSender === myInfo.id ? <div>-</div> :
                !view && idSender !== myInfo.id ? <div className={classNames(style.viewMess)}>1+</div> : <></>} */}
                {/* idSender === myInfo.id && idSender !== null ? <div>m</div> :  <div className={classNames(style.viewMess)}>1+</div>  */}
                
            </div>
        </Link>

    );
}