import { Component } from "react";
import img from '../../img/user-M.png'

export class User extends Component {
    render() {
        return (
            <div className="sitebar__user">
                <img src={img} alt="User" className="sitebar__img"/>
            </div>
        );
    }
}