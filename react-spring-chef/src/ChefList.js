import React,{Component} from 'react'
import axios from 'axios'
import {NavLink} from "react-router-dom";
// NavLink => a태그
/*
    react => Spring => react
    요청      요청처리 데이터전송(저장)
                     ============
                     클래스 전체, 자바스크립트 전체에서 사용
                      State 변수 사용!
              수행
              constructor() : 클래스 생성
              componentWillMount() : 메모리 저장 전 => 데이터 받기
              render() : HTML을 만들고 메모리 올리기
              componenetDidMount() : 메모리에 있는 내용을 브라우저에 출력

              => 페이지 변경
               setState() => render() => componentDidMount()
                state
 */
class ChefList extends Component{
    constructor(props) {
        super(props);
        // 멤버 변수 => 데이터가 변경되면 화면이 변경된다
        this.state={
            chef:[],
            page:1,
            totalpage:0
        }
        // 이벤트 등록
        this.prev=this.prev.bind(this);
        this.next=this.next.bind(this);
    }
    // http://localhost:8081/web/recat_chef/chef_list.do => 스프링 플젝 url 주소
    /*
        리액트에서 title 한글 깨짐스프링에서 처리함
        ReactController => @RequestMapping(value="react_chef/chef_list.do",produces="text/plain;charset=UTF-8") 추가함
     */
    prev(){
        this.state.page=this.state.page>1?this.state.page-1:this.state.page;
        this.post();
    }
    next(){
        this.state.page=this.state.page<this.state.totalpage?this.state.page+1:this.state.page;
        this.post();
    }
    post() {
        // 기본 디폴트 페이지
        axios({
            method:'POST',
            url:'http://localhost:8081/web/react_chef/chef_list.do',
            headers:{
                'Content-type':'application/x-www-form-urlencoding;charset=UTF-8'
            },
            params:{
                page:this.state.page
            }
        }).then((response)=>{
            console.log(response)
            this.setState({chef:response.data})
        })
    }

    componentWillMount() {
        axios.get("http://localhost:8081/web/react_chef/totalpage.do").then((response)=>{
            this.setState({totalpage:response.data})
        })
        this.post();
    }
    // render가 호출되면 데이터가 변경된다 => setState로 호출
    render() {
        const html=this.state.chef.map((m)=>
            <table className={"table"}>
                <tr>
                    <td className={"text-center"} width={"30%"} rowSpan={"2"}>
                        <img src={m.poster} style={{"width":"300px","height":"70px"}} />
                    </td>
                    <td colSpan={"4"} style={{"color":"orange"}}>
                        <h3>
                            <NavLink to={"/chef_detail/"+m.chef}>{m.chef}</NavLink>
                        </h3>
                    </td>
                </tr>
                <tr>
                    <td className={"text-left"}>
                        <img src={"1.png"}/>{m.mc1}
                    </td>
                    <td className={"text-left"}>
                        <img src={"3.png"}/>{m.mc3}
                    </td>
                    <td className={"text-left"}>
                        <img src={"7.png"}/>{m.mc7}
                    </td>
                    <td className={"text-left"}>
                        <img src={"2.png"}/>{m.mc2}
                    </td>
                </tr>
            </table>
        )
        return(
            <div className={"row"}>
                <h3 className={"text-center"}>쉐프 목록</h3>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td>{html}</td>
                    </tr>
                    </tbody>
                </table>
                <table className={"table"}>
                    <tr>
                      <td className={"text-center"}>
                          <input type={"button"} onClick={this.prev} value={"이전"} className={"btn btn-sm btn-info"}/>
                          {this.state.page} page / {this.state.totalpage} pages
                          <input type={"button"} onClick={this.next} value={"다음"} className={"btn btn-sm btn-warning"}/>
                      </td>
                    </tr>

                </table>
            </div>
        )
    }
}
export default ChefList;