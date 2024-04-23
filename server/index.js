import express from "express"
import cors from "cors"
import dotenv from "dotenv/config"
import http from "http"
import {Server} from "socket.io"

const port=3000
const app=express()
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

const chat_bot="chatBot"


io.on("connection",(socket)=>{
    console.log(`connected ${socket.id}`)

    socket.on("join_room",(data)=>{
        const {username,room}=data
        socket.join(room)
    

    let __createdtime__=Date.now()    
    socket.to(room).emit("receive_msg",{
        message:`${username} has joined the chat room`,
        username:chat_bot,
        __createdtime__
    
        }) 
    socket.emit("receive_msg",{
        message:`Welcome ${username} `,
        username:chat_bot,
        __createdtime__
    
        }) 
    })

    
})



server.listen(`${port}`,()=>{
    console.log(`server listening on ${port}`)
})