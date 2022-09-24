import { Component } from "react";
import search from '../../img/search.svg';
import dots from '../../img/dots.svg';

export class Search extends Component{
    render(){
        return(
            <section className="search">
                <div className="cont">
                    <input type="text" id="search-icon" placeholder="Search"/>
                    <label className="search-loupe" htmlFor="search-icon"><img src={search} alt="Search" /></label>
                    <label className="search-dots" htmlFor="search-icon"><img src={dots} alt="Search" /></label>
                </div>
            </section>
        );
    }
}