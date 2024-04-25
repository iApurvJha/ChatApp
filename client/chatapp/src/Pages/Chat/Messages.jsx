import React from 'react'
import { useState,useEffect } from 'react'
import styles from "./styles.module.css"

function Messages({socket}) {
    const [messages,setMessages]=useState([])

    useEffect(()=>{
        socket.on("receive_msg",(data)=>{
            console.log(data)
            setMessages((state)=>{
               return [...state,{
                    message:data.message,
                    username:data.username,
                    __createdtime__:data.__createdtime__
                }]
            })
        })
      return () => socket.off('receive_msg');
    },[socket])

    function formatDate(timestamp){
        const date=new Date(timestamp)
        return date.toLocaleString()
    }



  return (
    <div className={styles.outerDiv}>
    <div  className={styles.containerCenter} >
      {/* <div className={styles.message} > */}
          {messages.map((el,index)=>{
            return(
            <div  key={index} className={styles.message}>
              <div className={styles.details}>
                <div>{el.username}</div>
                <div>{formatDate(el.__createdtime__)}</div>
              </div>
              <div className={styles.userMsg}>{el.message}</div>

            </div>


            )

            
            
          })}
        
      {/* </div> */}
    </div>
  </div>
  )
}

export default Messages
