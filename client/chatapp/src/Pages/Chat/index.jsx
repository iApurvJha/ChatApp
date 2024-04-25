import React from 'react'
import Messages from './Messages'
import SendMessage from "./sendMessage"

function Chat({username,room,socket}) {
  return (
    <div>
      <Messages socket={socket} />
      <SendMessage socket={socket} username={username} room={room} />
    </div>
  )
}

export default Chat
