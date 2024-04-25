import React from 'react'
import styles from "./styles.module.css"
import { useState } from 'react'

function sendMessage({socket,username,room}) {

  const [sendMessage,setSendMessage]=useState("")

  function handleKeyPress(e){
    if(e.key==="Enter"){
      Msg()
    }
  }

  function Msg(){
    if(sendMessage!=""){
      console.log("i am king")
      const __createdtime__=Date.now()
      socket.emit("send_message",{username,room,message:sendMessage,__createdtime__})
      setSendMessage("")
    }
  }




  return (
    <div className={styles.sendMsgOuterdiv}>
      <div className={styles.sendMsgDiv}>
        <div  >
          <input onKeyUp={handleKeyPress} value={sendMessage} onChange={(e)=>{
            setSendMessage(e.target.value)
          }} className={styles.sendMsgInput} type='text' placeholder='Message...'></input>
        </div>
        <div>
          <button onClick={Msg} className={styles.sendMsgButton}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}

export default sendMessage

