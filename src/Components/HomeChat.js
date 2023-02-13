import React from 'react'
import '../css/homeChat.css'
import wplogo from './images/whatsappLogo.png';

function HomeChat() {


  return (
    <div className='chat__homechat'>
        <div className='homechat__instruction'>
            <img src={wplogo} alt="Select Any Chat" />
        </div>
    </div>
  )
}

export default HomeChat