import express from "express"
import cors from "cors"
import http from "http"
import {Server} from "socket.io"


const port=3000
const app=express()
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"*",
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

        const {username,room}=data
        socket.join(room)
    
        socket.on("send_message",(data)=>{

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

        


        // socket.to(room).emit('chatroom_users', chatRoomUser);
        // socket.emit('chatroom_users', chatRoomUser);

        //change 
        io.to(room).emit('chatroom_users', chatRoomUser);



        socket.on("leave_room",(data)=>{

            allUsers=allUsers.filter((el)=>{
                return el.id!=data.id
            })

            
            chatRoomUser=chatRoomUser.filter((el)=>{
                return el.id!=data.id
            })



            __createdtime__=Date.now()
            socket.to(data.room).emit("receive_msg",{
                message:`${data.username} has left the room `,
                username:chat_bot,
                __createdtime__

            })
            
            socket.to(data.room).emit('chatroom_users', chatRoomUser);
        })

    })

    
})



server.listen(`${port}`,()=>{
    console.log(`server listening on ${port}`)
})