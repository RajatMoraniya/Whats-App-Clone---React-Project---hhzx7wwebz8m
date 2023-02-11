import React from 'react'
import '../css/homeChat.css'

function HomeChat() {


  return (
    <div className='chat__homechat'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png" alt="Select Any Chat" />
        <div className='homechat__instruction'>
            <h2>Select Chat or Add New Chat </h2>
        </div>
    </div>
  )
}

export default HomeChat