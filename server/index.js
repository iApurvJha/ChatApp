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
let chatRoom=""
let allUsers=[]
let chatRoomUser=undefined

io.on("connection",(socket)=>{
    // console.log(`connected ${socket.id}`)

    socket.on("join_room",(data)=>{
        console.log("hello")
        // console.log(data)
        const {username,room}=data
        socket.join(room)
    
        socket.on("send_message",(data)=>{
            // console.log("i am king 2")
            // console.log(data)
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
        chatRoomUser=allUsers.filter((el)=>{
            return el.room===chatRoom
        })

        // console.log("i am all users from join room")
        // console.log(allUsers)
        // console.log("i am chat users join room")
        // console.log(chatRoomUser)
        


        //socket.emit("chatroom_users",chatRoomUser)
        socket.to(room).emit('chatroom_users', chatRoomUser);
        socket.emit('chatroom_users', chatRoomUser);

        socket.on("leave_room",(data)=>{
            console.log("i am chat users before leaving leave room")
            console.log(chatRoomUser) 
            console.log("i am all users before leaving the leave room")
            console.log(allUsers)
            socket.leave(data.room)
            allUsers=allUsers.filter((el)=>{
                return el.id!=data.id
            })
            console.log("i am all users from  leave room after leaving")
            console.log(allUsers)
            
            chatRoomUser=chatRoomUser.filter((el)=>{
                return el.id!=data.id
            })
            console.log("i am chat users leave room")
            console.log(chatRoomUser)

            // console.log("working on leave room")
            // console.log(`i am the `)
            // console.log(data)
            __createdtime__=Date.now()
            socket.to(data.room).emit("receive_msg",{
                message:`${data.username} has left the room `,
                username:chat_bot,
                __createdtime__

            })
            
            // console.log(chatRoomUser)
            //socket.emit("chatroom_users",chatRoomUser)
            socket.to(data.room).emit('chatroom_users', chatRoomUser);
        })

    })

    
})



server.listen(`${port}`,()=>{
    console.log(`server listening on ${port}`)
})