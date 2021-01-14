// node js 서버 생성
const express=require("express")
//라이브러리 생성 => import
const app=express() //서버생성
const port=3355;
// port => 0~65535 => 0~1023, 8080, 4000 제외한 다른 번호지정
//서버가동
/*
    const disp=function()
    {
    }

    const disp=()=>{
    }

    => 화살표함수 => return, function 생략
 */
// 포트 충돌 방지
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.listen(port,()=>{
    console.log("서버 가동","http://localhost:3355")
})
//terminal =>  node recipe-server

//자바 : MongoClient mc=new MongoClient("localhost",27017)
let Client=require("mongodb").MongoClient;

//RequestMapping
app.get("/recipe",(req,res)=>{
    //String page=request.getParameter(page);
    let page=req.query.page;
    let rowSize=12;
    let skip=(page*rowSize)-rowSize;
    let url="mongodb://localhost:27017";

    //연결
    Client.connect(url,(err,client)=>{
        let db=client.db('mydb');
        db.collection('recipe').find({}).skip(skip).limit(rowSize).toArray(function(err,docs){
            console.log(docs);
            res.json(docs);
            client.close();
        })
    })
})
