import { Component } from "react";
import dots from '../../img/dots.svg';
import user from '../../img/user-M.png';
import check from '../../img/check-mess.svg'

export class Recents extends Component{
    render(){
        return(
            <section className="recents">
                <div className="container">
                    <div className="recents-head">
                        <h2 className="recents-head__name header">
                            Recents
                        </h2>
                        <div className="search-dots"><img src={dots} alt="Search" /></div>
                    </div>

                    <div className="recents-list list-content ">
                        <div className="recents-list__user-mess">
                            <div className="recents-list__user user-mess">
                                <img src={user} alt="User" />
                            </div>
                            <div className="recents-list__messages">
                                <p className="recents-list__name head-name">Raghav</p>
                                <p className="recents-list__messege head-mess">Dinner?</p>
                            </div>
                        </div>
                        <div className="recents-list__date-check list-date-check">
                            <div className="recents-list__date list-date">
                                Today, 8:56pm
                            </div>
                            <div className="recents-list__check-img ">
                                <img src={check} alt="Check" />
                            </div>
                        </div>
                    </div>
                    <div className="recents-list list-content ">
                        <div className="recents-list__user-mess">
                            <div className="recents-list__user user-mess">
                                <img src={user} alt="User" />
                            </div>
                            <div className="recents-list__messages">
                                <p className="recents-list__name head-name">Raghav</p>
                                <p className="recents-list__messege head-mess">Dinner?</p>
                            </div>
                        </div>
                        <div className="recents-list__date-check list-date-check">
                            <div className="recents-list__date list-date">
                                Today, 8:56pm
                            </div>
                            <div className="recents-list__check-img ">
                                <img src={check} alt="Check" />
                            </div>
                        </div>
                    </div>
                    <div className="recents-list list-content ">
                        <div className="recents-list__user-mess">
                            <div className="recents-list__user user-mess">
                                <img src={user} alt="User" />
                            </div>
                            <div className="recents-list__messages">
                                <p className="recents-list__name head-name">Raghav</p>
                                <p className="recents-list__messege head-mess">Dinner?</p>
                            </div>
                        </div>
                        <div className="recents-list__date-check list-date-check">
                            <div className="recents-list__date list-date">
                                Today, 8:56pm
                            </div>
                            <div className="recents-list__check-img ">
                                <img src={check} alt="Check" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}