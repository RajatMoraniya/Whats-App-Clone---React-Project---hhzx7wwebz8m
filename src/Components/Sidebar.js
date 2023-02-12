import React, { useEffect, useState } from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar,IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import '../css/sidebar.css';
import SidebarChat from './SidebarChat';
import db from '../firebase'
import { useStateValue } from '../StateProvider';
import 'firebase/compat/auth';
import firebase from "firebase/compat/app";

function Sidebar() {

    const [{user},dispatch] = useStateValue();
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        db.collection("rooms").onSnapshot(snapShot=>{
            setRooms(snapShot.docs.map(doc=>({
                id:doc.id,
                data:doc.data()
            })))
        })
    }, [])

    //   console.log(rooms)
    
  return (
    <div className='sidebar'>
      
        <div className="sidebar__header">
            <Avatar src={user.photoURL} onClick={e=>firebase.auth().signOut()}/>

            <div className="sidebar__headerRight">
                <IconButton>
                    <ChatIcon/>
                </IconButton>

                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>

                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>

        <div className="sidebar__search">
            <div className="sidebar__searchContainer">
                <SearchIcon/>
                <input type="text" placeholder='Search or Start a new Chat' />
            </div>
        </div>

        <div className="sidebar__chats">
            <SidebarChat addNewChat/>
            {
                rooms.map((room)=>{
                    return <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                })
            }
        </div>
    </div>
  )
}

export default Sidebar