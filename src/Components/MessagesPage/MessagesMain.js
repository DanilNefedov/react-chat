// import classNames from 'classnames';
// import style from './MessagesMain.module.css';
// import styleFriends from '../HomePage/Friends.module.css';
// import user from '../../img/user-M.png';
// import dots from '../../img/dots.svg';
// import send from '../../img/send.svg';
import { Search } from '../Search/Search';
import { Groups } from '../Groups/Groups';
import { Recents } from '../Recents/Recents';
import { Friend } from './Friend';
import { useParams } from 'react-router-dom';
//import { Friends } from '../HomePage/Friends';

export function MessagesMain(props) {
    const friendId = useParams()

    return (
        <>
        <div className="second-column">
            <Search />
            <Groups />
            <Recents />
        </div>
        <Friend friend={props.friend} friendId={friendId} messages={props.messages}/>
        </>

    );
}