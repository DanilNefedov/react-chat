import dots from '../../img/dots.svg';
import style from './Friends.module.css';
import classNames from 'classnames';
import { FriendsList } from "./FriendsList/FriendsList";
import { Search } from '../Search/Search';
import { Groups } from '../Groups/Groups';
import { Recents } from '../Recents/Recents';
import { Outlet } from 'react-router-dom';



export function Friends() {

    return (
        <> 
        <div className="second-column">
            <Search />
            <Groups />
            <Recents />
        </div>
        {/* разделить на компоненты */}
        <section className={style.friends}>
            <div className={classNames(style.container, 'container')}>
                <div className={classNames(style.head, 'head')}>
                    <h2 className={classNames(style.header, 'header')}>
                        Friends
                    </h2>
                    <div className={classNames(style.dots, 'search-dots')}><img src={dots} alt="Search" /></div>
                </div>
                <FriendsList />
            </div>
        </section>
        </>
    );
}