import React from 'react'
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
function Home(props) {
  const navigate=useNavigate()

  function joinRoom(){
    if(props.username!=="" && props.room!==""){
      props.socket.emit("join_room",{username:props.username,room:props.room})
      navigate("/chat",{replace:true})
      console.log("hello")

    }
    
  }



  return (
    <div className={`${styles.containerCenter}`}  >
      <div className={` ${styles.container}`} > 
        <div>
        <h1 >&lt;&gt;DevRooms&lt;/&gt;</h1>
        </div>
        <div className={`${styles.inputContainer} `} >
        <input onChange={(e)=>{
          props.setUsername(e.target.value)
          console.log(props.username)
        }} className={`${styles.input}`} type='text' placeholder='username...'></input>
        <select onChange={(e)=>{
          props.setRoom(e.target.value)
        }} className={`${styles.input}`}>
        <option selected>--Select Room--</option>
        <option>NODE</option>
        <option>JAVASCRIPT</option>
        <option>EXPRESS</option>
        <option>REACT</option>
        </select>
        </div>
        <div>
        <button onClick={joinRoom} className={`${styles.input} ${styles.btn}`}>Join Room</button>
        </div>
      </div>
    </div>
  )
}

export default Home
