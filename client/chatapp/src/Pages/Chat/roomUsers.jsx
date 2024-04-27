import React from 'react'
import styles from "./styles.module.css"
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function roomUsers({socket, username,room}) {
  
  const navigate = useNavigate();

  const [users,setUsers]=useState([])
  const [roomName, setRoomName] = useState("");
  useEffect(()=>{
    socket.on("chatroom_users",(data)=>{
      setRoomName(data[0].room)
      console.log(`I am chat room users list `)
      console.log(`${data}`)
      // const updatedUsers=data.map((el)=>{
      //   console.log(el)
      //   return (el.username)
      // })
      
      // setUsers(updatedUsers)
      setUsers(data)
    })
  return () => socket.off('chatroom_users');
},[socket])

  function leaveRoom(){
    socket.emit("leave_room",{
      id:socket.id,
      username:username,
      room:room
    })
    navigate("/",{replace:true})
    

  }

  return (
    <div className={styles.First}>
      <div>
        <h1>{roomName}</h1>
      </div>
      <div>
        <ul>
          Users
          {users.map((el,ind)=>{
            console.log(`I am the user val ${el.username}`)
            return <li style={{ color: el.id === socket.id ? "red" : "black" }}> <h3 key={el.id}>{el.username}</h3> </li>
          })}
        </ul>
      </div>
      <div >
        <button onClick={leaveRoom} className={styles.sendMsgButton}>Leave</button>
      </div>
    </div>
  )
}

export default roomUsers
