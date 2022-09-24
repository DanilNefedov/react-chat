import { Component } from "react";
import dots from '../../img/dots.svg';
import user from '../../img/user-M.png'

export class Friends extends Component{
    render(){
        return(
            <section className="friends">
                <div className="container">
                    <div className="friends-head">
                        <h2 className="friends-head__header header">
                            Friends
                        </h2>
                        <div className="search-dots"><img src={dots} alt="Search" /></div>
                    </div>
                    <div className="friends-list list-content "> 
                    {/* 11 */}
                        <div className="friends-list__user-mess">
                            <div className="friends-list__user user-mess">
                                <img src={user} alt="User" />
                            </div>
                            <div className="friends-list__messages">
                                <p className="friends-list__name head-name">Raghav</p>
                                <p className="friends-list__messege head-mess">Dinner?</p>
                            </div>
                        </div>
                        <div className="friends-list__date-check list-date-check">
                            <div className="friends-list__date list-date">
                                Today, 8:56pm
                            </div>
                            {/* <div className="friends-list__check-img ">
                                <img src={check} alt="Check" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}