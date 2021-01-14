import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
/*
    React (JavaScript => function 기반,  객체지향 프로그램)
    let a={name:""} => {} Object
       a.name => JSON
    class 기반 => 멤버변수
    function 기반 => 지역변수 => but 멤버변수처럼 사용가능한 변수를 만들 수 있음(useState) : Hooks
                               - useState : 멤버변수 역할
                               - render() : 화면 출력
                               - useEffect : 화면 출력 전 데이터 저장용으로 사용 (componentWillMount 기능)
                               - useMemo, useCallback, useReducer, useDisptch
                               - Context-API : 전역 설정

    constructor -> componentWillMount -> render -> componentDidMount

    이벤트 발생 (버튼/검색어입력) ==> render() 호출
    =======================       ===========
    새로운 데이터를 가지고 온다         새로운 데이터에 해당되는 HTML변경

    ※ 프로그래머가 render()를 직접 호출할 수 없음!
      =>  이벤트 발생 시 setState() 의 데이터 값을 변경 시킴 => render() 호출됨

    function -> render() -> return 받은 후 화면 변경
    function은 setState() 가 존재하지 않음 => const[data, setData] : Hooks
                                                       =======> 함수를 호출하면 자동으로 return이 다시 수행
                                                                (화면은 갱신되지 않음)

*/
function App() {
    //변수선언 => 값이 변경(화면변경)
    //async, await => 비동기화
    const [recipe,setRecipe]=useState([])
    const [page,setPage]=useState(1)
    const [total,setTotal]=useState(0)
    useEffect(async ()=>{
        await axios.get("http://localhost/web/react_recipe/recipe_list.do",{
            params:{
                page:page
            }
        }).then((response)=>{
            setRecipe(response.data)
            //console.log(response.data)
        })
    },[])
    useEffect(async ()=>{
        await axios.get("http://localhost/web/react_recipe/totalpage.do")
            .then((response)=>{
                setTotal(response.data)
            })
    },[])

    //이벤트 처리(버튼)
    const prev=()=>{
        //페이지 변경
        setPage(page>1?page-1:page);
        axios.get("http://localhost/web/react_recipe/recipe_list.do",{
            params:{
                page:page
            }
        }).then((response)=>{
            setRecipe(response.data)
            //console.log(response.data)
        })
    }
    const next=()=>{
        setPage(page<total?page+1:page);
        axios.get("http://localhost/web/react_recipe/recipe_list.do",{
            params:{
                page:page
            }
        }).then((response)=>{
            setRecipe(response.data)
            //console.log(response.data)
        })
    }

    //데이터 받기 => 화면 출력
    //function(m){} 대신 (m)=> 으로 사용해도됨
    //console.log(recipe)
    const html=recipe.map(function(m) {
        return (
            <div className="col-md-4">
                <div className="thumbnail">
                    <a href="#">
                        <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                        <div className="caption">
                            <p>{m.title}</p>
                        </div>
                    </a>
                </div>
            </div>
        )
    })
    //브라우저에 전송
    return(
        <Fragment>
            <div className={"row"}>
                {html}
            </div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn btn-sm btn-success"} onClick={prev}>이전</button>
                    {page} page / {total} pages
                    <button className={"btn btn-sm btn-info"} onClick={next}>다음</button>
                </div>
            </div>
        </Fragment>

    )
}

export default App;