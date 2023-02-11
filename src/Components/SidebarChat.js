import { Avatar } from '@mui/material'
import React, { useState,useEffect } from 'react'
import '../css/sidebar.css'
import db from '../firebase';
import {Link} from "react-router-dom";

function SidebarChat({id,name,addNewChat}) {

    const [avatarapi, setAvatarapi] = useState("");
    const [lastmessage, setLastmessage] = useState([])

    useEffect(() => {
        setAvatarapi(Math.floor(Math.random()*5000));

        db.collection('rooms').doc(id).collection('message').orderBy('timestamp','desc').onSnapshot(snapshot=>setLastmessage(snapshot.docs.map(doc=>doc.data())))
    }, [])

    const createChat = () =>{
        const room = prompt("Enter enter room name")
        if(room){
            db.collection("rooms").add({
                name:room
            })
        }
    }

  return (
    addNewChat ? (
        <div className="sidebar__chatComp" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
    ) : (
        <Link to={`/room/${id}`} style={{ textDecoration: 'none' , color: 'black' }}> 
            <div className='sidebar__chatComp'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${avatarapi}.svg`}/>
                <div className="sidebar__chatInfo">
                    <h2>{name}</h2>
                    <p>{`${lastmessage[0]?.message}`}</p>
                </div>
            </div>
        </Link>
    )
  )
}

export default SidebarChat