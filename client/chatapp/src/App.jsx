import './App.css'
import {useState} from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home/index"
import Chat from "./Pages/Chat/index"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3000")


function App() {
  const [username,setUsername] = useState("")
  const [room,setRoom] = useState("")

  return (
    <>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home   
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              socket={socket}
          />}></Route>
          <Route path='/chat' element={<Chat 
            username={username}
            room={room}
            socket={socket}
          />}>

          </Route>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
