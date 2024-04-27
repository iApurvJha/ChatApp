import React from 'react'
import styles from "./styles.module.css"
import { useState,useEffect } from 'react'

function roomUsers() {
  const [users,setUsers]=useState([])

//   useEffect(()=>{
//     socket.on("receive_msg",(data)=>{
//         console.log(data)
//         setMessages((state)=>{
//            return [...state,{
//                 message:data.message,
//                 username:data.username,
//                 __createdtime__:data.__createdtime__
//             }]
//         })
//     })
//   return () => socket.off('receive_msg');
// },[socket])
  return (
    <div className={styles.First}>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
      <div>Hello</div>
    </div>
  )
}

export default roomUsers
