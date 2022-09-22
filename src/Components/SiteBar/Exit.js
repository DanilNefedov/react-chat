import { Component } from "react";
import exit from '../../img/exit.svg'

export class Exit extends Component{
    render(){
        return(
            <div className="sitebar__exit">
                <a href="#" className="sitebar__exit-link">
                    <img src={exit} alt="Exit" />
                </a>
            </div>
        );
    }
}