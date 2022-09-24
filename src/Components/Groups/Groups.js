import { Component } from "react";
import dots from '../../img/dots.svg';
import user from '../../img/user-M.png'

export class Groups extends Component {
    render() {
        return (
            <section className="groups">
                <div className="container">
                    <div className="groups-head">
                        <h2 className="groups-head__header header">
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
}