import React,{Component} from 'react'
import {NavLink} from "react-router-dom";

class Header extends Component{
    render(){
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">SIST FoodHouse</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/recipe"}>레시피</NavLink></li>
                        <li><NavLink to={"/chef"}>쉐프</NavLink></li>
                        <li><NavLink to={"/news"}>뉴스</NavLink></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Header;