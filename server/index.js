import express from "express"
import cors from "cors"
import dotenv from "dotenv/config"
import http from "http"
import {Server} from "socket.io"
import { all } from "axios"

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
let chatRoom=""
let allUsers=[]

io.on("connection",(socket)=>{
    // console.log(`connected ${socket.id}`)

    socket.on("join_room",(data)=>{
        console.log(data)
        const {username,room}=data
        socket.join(room)
    
        socket.on("send_message",(data)=>{
            console.log("i am king 2")
            console.log(data)
            // const {username,room,sendMessage,__createdtime__}=data
            io.to(data.room).emit("receive_msg",data)

        })

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
        chatRoom=room
        allUsers.push({id:socket.id,username,room})
        let chatRoomUser=allUsers.filter((el)=>{
            return el.room===chatRoom
        
        socket.to(room).emit("chatroom_users",chatRoomUser)
        socket.emit("chatroom_users",chatRoomUser)

        })

    })

    
})



server.listen(`${port}`,()=>{
    console.log(`server listening on ${port}`)
})