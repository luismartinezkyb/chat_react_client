import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'

const socket = io("/")
export default function App() {

  const [message, setMessage] = useState('');
  const [receive, setReceive] = useState([])
  const handleSubmit = (e) =>{
    
    e.preventDefault();
    const newMessage = {
      body:message,
      from: 'Me'
    }
    socket.emit('message',message);
    setReceive([...receive,newMessage]);
    setMessage('');
  }

  useEffect(() => {
    // socket.on('message', message => {
    //   receiveMessage(message);
    // })
    socket.on('message', receiveMessage)

    return ()=>{
      socket.off('message', receiveMessage)
    }
  }, [])
  

  const receiveMessage = (message) => setReceive(state=>[...state, message])
  
  

  return (
    <div className='h-screen  bg-zinc-800 text-white flex items-center justify-center overflow-auto flex-row-reverse'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 w-[70%] h-[50%] overflow-auto'>
        <div className=' p-4 sticky top-0 bg-zinc-900 w-full'>
          <h1 className=' text-2xl font-bold my-2'> Chat React</h1>
          <input 
          value={message}
          type="text" 
          placeholder='Write your message'  
          onChange={(e)=>setMessage(e.target.value)}
          className=' border-2 rounded border-zinc-500 w-full text-black'
          />
          
        </div>
        <div className='p-4'>
        <ul>
        {receive.length===0?
        <h1 className='font-bold text-2xl'>There isn't any message</h1>
        :
        receive.map((msg, index)=>{
          return (

            <li 
            className={`my-2 p-2 rounded-md table text-black  text-sm ${msg.from==='Me'? 'bg-sky-400 ml-auto': ' bg-green-500 mr-auto'}`}
            key={index}>
              <span className=' bg-gray-200 text-black p-1 text-xs  block rounded-md'>{msg.from}</span> 
              <span className='text-md font-bold'>{msg.body}</span>
            </li>
          )
        })}
        
      </ul>
        </div>
      </form>

      
    </div>
  )
}
