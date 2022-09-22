import { Component } from "react";
import home from '../../img/home.svg'

export class HomeLink extends Component{
    render(){
        return(
            <div className="sitebar__home">
                <a href="#" className="sitebar__link">
                    <img src={home} alt="Home" className="sitebar__img"/>
                </a>
            </div>
        );
    }
}