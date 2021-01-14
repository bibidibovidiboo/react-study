const express=require("express")
const app=express()
const server=require("http").createServer()
const port=3355
server.listen(port,()=>{
    console.log("Chat server Start...")
})
const socketio=require("socket.io")
const io=socketio.listen(server)
// ServerSocket 생성
// Socket => 클라이언트 소켓
io.on('connection',(socket)=>{
    socket.on('chat-msg',(msg)=>{
      console.log(msg)
      io.emit('chat-msg',msg)
    })
})