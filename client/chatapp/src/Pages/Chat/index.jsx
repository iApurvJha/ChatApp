import React from 'react'
import Messages from './Messages'
import SendMessage from "./sendMessage"
import RoomUsers from './roomUsers'
import styles from "./styles.module.css"

function Chat({username,room,socket}) {
  return (
    <div >
      <div className={styles.Container}>
        <RoomUsers />
        <Messages socket={socket} />
      </div>
      <SendMessage socket={socket} username={username} room={room} />
      
    </div>
    // {/* <div> */}

    
    //     <div id="Container" className={styles.Container}>
    //         <div className={styles.First} id="First">
    //             <div>first</div>
    //             <div>first</div>
    //             <div>first</div>
    //             <div>first</div>
    //             <div>first</div>
    //             <div>first</div>

    //         </div>
    //         <div className={styles.Second} id="Second">Second</div>
            
    //     </div>
    //     <div className={styles.Third} id="Third">Third</div>
    // </div>
  )
}

export default Chat
