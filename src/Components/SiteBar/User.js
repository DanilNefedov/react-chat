import { Component } from "react";
import img from '../../img/user-M.png'

export class User extends Component {
    render() {
        return (
            <div className="sitebar__user">
                <a href="#" className="sitebar__user-link">
                    <img src={img} alt="User" className="sitebar__img"/>
                </a>
            </div>
        );
    }
}