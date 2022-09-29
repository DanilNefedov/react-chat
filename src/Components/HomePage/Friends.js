import dots from '../../img/dots.svg';
import style from './Friends.module.css';
import classNames from 'classnames';
import { FriendsList } from "./FriendsList/FriendsList";



export function Friends() {

    return (
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
    );

}