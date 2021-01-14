import React,{Component} from 'react'
import $ from 'jquery'
/*
     react => 클래스명 , 메소드은 반드시 대문자로 시작한다 (문법)
           => html 코딩 => 태그는 반드시 소문자
              속성이 있는 경우는 ""
              여는태그와 닫는 태그가 일치
              =================
              1. 여는 태그 <a>
              2. 닫는 태그 </a>
              3. 단독 태그 <img />
           => 최상위 태그를 반드시 사용

              <div></div>
              <div></div>  (X)

              <div>
                <div></div>
                <div></div>
              </div>
 */
// <App music={music}/>
class App extends Component{
   constructor(props) {
     super(props);
     this.state={
         vo:{},
         isShow:0
     }

   }
   musicDetail(vo)
   {
       //this.state.ishow=1;
       this.setState({isShow:1,vo:vo})
   }
   componentDidMount()
   {
       $('#keyword').keyup(function(){
           let k=$('#keyword').val();
           $('#user-table > tbody > tr').hide();
           let temp=$('#user-table>tbody>tr>td:nth-child(5n+3):contains("'+k+'")');
           $(temp).parent().show();
       })
   }
   // 화면 출력
   render() {
      const html=this.props.music.map((m)=>
        <tr>
          <td>{m.rank}</td>
          <td><img src={m.poster} width={"35"} height={"35"}/></td>
          <td onClick={this.musicDetail.bind(this,m)}>{m.title}</td>
          <td>{m.singer}</td>
          <td>{m.album}</td>

        </tr>
      )
       return(
           <div className={"row"}>
               <div className={"col-sm-8"}>
               <h1 className={"text-center"}>뮤직 Top50</h1>
               <input type={"text"} size={"20"} id={"keyword"}/>
               <div style={{"height":"10px"}}></div>
             <table className={"table"} id={"user-table"}>
               <thead>
                 <tr className={"danger"}>
                   <th>번호</th>
                   <th></th>
                   <th>노래명</th>
                   <th>가수명</th>
                   <th>앨범</th>
                 </tr>
               </thead>
               <tbody>
                 {html}
               </tbody>
             </table>
           </div>
           <div className={"col-sm-4"}>
               {this.state.isShow==1?<MusicDetail m={this.state.vo}/>:null}
           </div>
           </div>
       )
   }
}
class MusicDetail extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <table class={"table"}>
                <tr>
                    <td colSpan={"2"}>
                        <iframe src={"http://youtube.com/embed/"+this.props.m.movie} width={"400"} height={"500"}></iframe>
                    </td>
                </tr>
                <tr>
                    <td className={"text-right"}>제목</td>
                    <td>{this.props.m.title}</td>
                </tr>
                <tr>
                    <td className={"text-right"}>가수명</td>
                    <td>{this.props.m.singer}</td>
                </tr>
            </table>
        )
    }
}
export default App;
