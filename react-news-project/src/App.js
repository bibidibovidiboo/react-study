import React,{useState,useEffect} from 'react'
import axios from 'axios'

function  App()
{
  // 변수 설정
  const [news,setNews]=useState([]);
  const [cateno,setCateno]=useState(0);
  // cateno=1 , cateno=2 => render()
  // setCateno(1) => render() => return
  // 초기값 설정
  /*
  useEffect(()=>{
  })*/
  useEffect(()=>{
    axios.get("http://newsapi.org/v2/top-headlines?country=kr&apiKey=fd1fce01f1cb462bbac4e9e702230e0d").then((response)=>{
      setNews(response.data.articles);
      console.log(response.data.articles);
    })
  },[])
  const categoryChange=(no)=>{
    let site="";
    let arr=["","category=business","category=enterainment",
      "category=health","category=science",
      "category=sports","category=technology"];
    site=arr[no];
    axios.get("http://newsapi.org/v2/top-headlines?country=kr&apiKey=fd1fce01f1cb462bbac4e9e702230e0d"+"&"+site).then((response)=>{
      setNews(response.data.articles);
      console.log(response.data.articles);
    })
  }
  // 데이터 출력
  /*
     news={articles: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
     status: "ok"
     otalResults: 34}
     news={
         articles:[],
         status: "ok"
         otalResults: 34
     }
     m={poster:"",title:""}
     m.poster
       author: "류준영"
  description: "두개골을 절개하지 않고 뇌 신경망을 관찰할 수 있는 새로운 현미경이 개발됐다. 기초과학연구원(IBS) 분자분광학및동력학연구단 최원식 부연구단장(고려대 물리학과 교..."
  publishedAt: "2020-12-03T04:26:51Z"
  source: {id: null, name: "Mt.co.kr"}
  title: "머리 절개 없이 뇌 신경 보는 '현미경' 나왔다 - 머니투데이"
  url: "https://news.mt.co.kr/mtview.php?no=2020120312211539622"
  urlToImage: "https://thumb.mt.co.kr/21/2020/12/2020120312211539622_1.jpg"
   */
  const html=news.map((m)=>
      <table className={"table"}>
        <tbody>
        <tr>
          <td className={"text-center"} width={"30%"} rowSpan={"3"}>
            <img src={m.urlToImage} style={{"width":"200px","height":"90px"}}/>
          </td>
          <td width={"70%"}>
            {m.title}
          </td>
        </tr>
        <tr>
          <td>{m.description}</td>
        </tr>
        <tr>
          <td className={"text-right"}>{m.author}({m.publishedAt})</td>
        </tr>
        </tbody>
      </table>
  )
  return (
      <div className={"row"}>
        <table className={"table"}>
          <tbody>
          <tr>
            <td className={"text-center"}>
              <button className={"btn btn-lg btn-default"} onClick={e=>categoryChange(0)}>전체</button>

              <button className={"btn btn-lg btn-active"} onClick={e=>categoryChange(1)}>비지니스</button>

              <button className={"btn btn-lg btn-primary"} onClick={e=>categoryChange(2)}>엔터테인먼트</button>

              <button className={"btn btn-lg btn-danger"} onClick={e=>categoryChange(3)}>건강</button>

              <button className={"btn btn-lg btn-success"} onClick={e=>categoryChange(4)}>과학</button>

              <button className={"btn btn-lg btn-warning"} onClick={e=>categoryChange(5)}>스포츠</button>

              <button className={"btn btn-lg btn-info"} onClick={e=>categoryChange(6)}>기술</button>
            </td>
          </tr>
          </tbody>
        </table>
        <table className={"table"}>
          <tbody>
          <tr>
            <td>{html}</td>
          </tr>
          </tbody>
        </table>
      </div>
  )
}
export default App;