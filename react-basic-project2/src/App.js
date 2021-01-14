import React,{Component} from "react"
import axios from 'axios'
/*
   React
   1. class 기반
      1) 변수의 종류
      2) 생명주기
        counstructor = componentWillMount = render - componentDidMount (호출순서)
   2. function 기반 (16버전부터 권장)
   3. router : 화면
   4. redux : MVC 구조
   5. saga, mobx (Spring)
   6. 배포 (webpack)
 */
class App extends Component{
  // 생성 => 생성자함수
  // 변수 선언, 이벤트 등록
  constructor(props) {
    super(props);
    // 변수 선언 => 멤버 변수
    // state : 데이터 변경이 가능, props : 고정 데이터
    this.state={
      recipe:[],
      page:1
    }
  }
  // 메모리에 HTML을 올리기 전 상태
  componentWillMount() {
    // node js로부터 데이터 받기
    let _this=this;
    axios.get("http://localhost:3355/recipe",{
      params:{
        page:1
      }
    }).then(function (response){
      console.log(response.data)
      _this.setState({recipe:response.data})
    });
    /*
    then(function (response){

    })

    then((response)=>{

    });
     */
  }
  // HTML이 메모리에 올라간 상태 => 브라우저에 화면 출력
  // window.onload, $(function(){})
  // jquery, ajax 연결
  componentDidMount() {
  }
  // 메모리에 올라갈 HTML을 작성하는 위치
  render() {
    return (
        <div></div>
    )
  }
}
export default App;