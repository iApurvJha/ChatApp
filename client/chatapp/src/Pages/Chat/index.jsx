import React from 'react'
import Messages from './Messages'
import SendMessage from "./sendMessage"
import RoomUsers from './roomUsers'
import styles from "./styles.module.css"

function Chat({username,room,socket}) {
  return (
    <div >
      <div className={styles.Container}>
        <RoomUsers socket={socket} username={username} room={room} />
        <Messages socket={socket} />
      </div>
      <SendMessage socket={socket} username={username} room={room} />
      
    </div>
  )
}

export default Chat
