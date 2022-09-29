import dots from '../../img/dots.svg';
import user from '../../img/user-M.png';
import style from './Groups.module.css';
import classNames from 'classnames';

export function Groups (){

    return (
        <section className={style.groups}>
            <div className={classNames(style.container, 'container')}>
                <div className={classNames(style.head, 'head')}>
                    <h2 className={classNames(style.header, 'header')}>
                        Groups
                    </h2>
                    <div className="search-dots"><img src={dots} alt="Search" /></div>
                </div>
                <div className="groups-list list-content">
                    <div className="groups-list__img user-mess">
                        <img src={user} alt="User" />
                    </div>
                    <div className="groups-list__about ">
                        <p className="groups-list__name head-name">Friends Reunion</p>
                        <p className="groups-list__message head-mess">Hi Guys, Wassup!</p>
                    </div>
                </div>
                <div className="groups-list list-content">
                    <div className="groups-list__img user-mess">
                        <img src={user} alt="User" />
                    </div>
                    <div className="groups-list__about">
                        <p className="groups-list__name head-name">Friends Forever</p>
                        <p className="groups-list__message head-mess">Good to see you.</p>
                    </div>
                </div>
                <div className="groups-list list-content">
                    <div className="groups-list__img user-mess">
                        <img src={user} alt="User" />
                    </div>
                    <div className="groups-list__about">
                        <p className="groups-list__name head-name">Crazy Cousins</p>
                        <p className="groups-list__message head-mess">What plans today?</p>
                    </div>
                </div>
            </div>
        </section>
    );

}