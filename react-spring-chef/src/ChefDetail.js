import React, {Component, Fragment} from 'react'
import axios from 'axios'
import {NavLink} from "react-router-dom";
// Spring에 연결 => 결과값을 가지고 온다
// fetch , request => aysnc , await
// <ChefDetail data={} />
class ChefDetail extends  Component{
    // 생성자 함수 => 변수선언 , 이벤트 등록
    constructor(props) {
        super(props);
        this.state = {
            recipe: [],
            page: 1,
            totalpage: 0,
            find: [],
            fd: ''
        }
        // 이벤트 처리
        this.findBtnClick=this.findBtnClick.bind(this);
        this.findDataChange=this.findDataChange.bind(this);
        this.chefListBtnClick=this.chefListBtnClick.bind(this);
    }
    chefListBtnClick(){
        this.post();
    }
    findBtnClick(){
        axios({
            method:'POST',
            url:'http://localhost:8081/web/react_chef/chef_find.do',
            headers:{
                'Content-type':'application/x-www-form-urlencoding;charset=UTF-8'
            },
            params:{
                fd:this.state.fd,
                chef:this.props.match.params.chef
            }
        }).then((response)=>{
            console.log(response)
            this.setState({recipe:response.data})
        })
    }
    findDataChange(e){
        this.setState({fd:e.target.value}) // 텍스트에서 입력을 받는 경우
    }

    // 출력할 데이터를 저장
    componentWillMount(){
        this.post()
    }
    // 페이지 나눌 경우에 사용
    post(){
        // 기본 디폴트 페이지
        axios({
            method:'POST',
            url:'http://localhost:8081/web/react_chef/chef_detail.do',
            headers:{
                'Content-type':'application/x-www-form-urlencoding;charset=UTF-8'
            },
            params:{
                page:this.state.page,
                chef:this.props.match.params.chef
            }
        }).then((response)=>{
            console.log(response)
            this.setState({recipe:response.data})
        })
    }
    // 화면 출력
    render() {
        const html=this.state.recipe.map((m)=>
            <div className="col-md-3">
                <div className="product-item">
                    <img src={m.poster} alt="Lights" style={{"width":"250px","height":"200px"}}/>
                    <div className="down-content">
                        <p>{m.title.length>18?m.title.substring(0,17)+"...":m.title}</p>
                    </div>
                </div>
            </div>
        )
        return (
            <Fragment>
                <div style={{"height":"15px"}}></div>
                <div className={"row"}>
                    <input type={"text"} className={"input-sm"} size={"20"}
                           onChange={this.findDataChange}/>
                    <input type={"button"} className={"btn btn-sm btn-primary"}
                           value={"검색"} onClick={this.findBtnClick}/>
                    <input type={"button"} className={"btn btn-sm btn-danger"}
                           value={"전체목록"} onClick={this.chefListBtnClick}/>
                    <NavLink to="/" className={"btn btn-sm btn-success"}>쉐프목록</NavLink>
                </div>
                <div className={"row"}>
                    {html}
                </div>
            </Fragment>
        )
    }
}
export default ChefDetail;