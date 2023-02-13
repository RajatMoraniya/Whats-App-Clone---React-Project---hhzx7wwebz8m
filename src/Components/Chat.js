import { Avatar, IconButton } from '@mui/material'
import React, { useEffect,useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../css/chat.css';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { MicOutlined } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import firebase from "firebase/compat/app";
import { useStateValue } from '../StateProvider';
import { color } from '@mui/system';

function Chat() {
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();


    useEffect(() => {
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name);
            })

            db.collection('rooms').doc(roomId).collection('message').orderBy("timestamp",'asc').onSnapshot(snapshot=>{
                setMessages(snapshot.docs.map(doc=>doc.data()))
            })
        }
    }, [roomId])
    
    const sendMessage = (e) => {
        e.preventDefault();
        if(input.trim()===""){
            alert("Please Enter Your Text❗");
            setInput("");
            return;
        }

        db.collection('rooms').doc(roomId).collection('message').add({
            name:user.displayName,
            message:input,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    }

  return (
    
    <div className='chat'>
        <div className="chat__header">
            <Avatar src='https://avatars.dicebear.com/api/human/123.svg'/>

            <div className="chat__headerInfo">
                <h3>{roomName}</h3>
                <p>Last Seen at {
                    new Date(messages[messages.length-1]?.timestamp?.seconds*1000)
                    .toLocaleTimeString()
                }</p>
            </div>
            
            <div className="header__Right">
                <IconButton>
                    <SearchIcon/>
                </IconButton>

                <IconButton> 
                    <AttachFileIcon/>
                </IconButton>

                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>

        <div className="chat__body">
            {
                messages.map(message=>(
                    <p className={`chat__message ${user.displayName==message.name && `chat__sender`}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__time">{
                            new Date(message.timestamp?.seconds*1000)
                            .toLocaleTimeString()
                        }</span>
                    </p>
                ))
            }

        </div>

        <div className="chat__footer">
            <IconButton>
                <EmojiEmotionsIcon/>
            </IconButton>

            <IconButton>
                <AttachFileIcon/>
            </IconButton>

            <form onSubmit={sendMessage}>
                <input type="text" value={input} placeholder='Type your message' onChange={e=>setInput(e.target.value)} />
                <input type="submit" />
            </form>

            <IconButton>
                <MicOutlined/>
            </IconButton>

            <IconButton>
                <SendIcon onClick={sendMessage}/>
            </IconButton>
        </div>
    </div>
  )
}

export default Chat