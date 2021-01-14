import React,{Component} from 'react'
import {NavLink} from "react-router-dom";

class Chef extends Component{
    render()
    {
        return (
            <div className={"row"}>
                <h1>쉐프 목록 출력</h1>
                <NavLink to={"/chef_detail"}>상세보기</NavLink>
            </div>
        )
    }
}
export default Chef;