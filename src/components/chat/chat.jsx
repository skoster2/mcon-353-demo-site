import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './chat.css';
import {useInterval} from '../../hooks/use-interval';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const Chat = (props) => {
    
    const[inputText, setInputText] = useState('');
    const[username, setUsername] = useState(''); 
    const[chats, setChats] = useState([]);

    const[currentChat, setCurrentChat] = useState({});

    const[messages, setMessages] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    

    function chooseChat(chat){
        setCurrentChat(chat);
        handleClose();
    }

    function addMessage(text){     
        const message = {
            chatId : currentChat.id,
            username: username,
            text : text,
        };
      fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/messages', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
        },
        body: JSON.stringify(message),
      });
    }


    function chooseUsername(){
        setUsername(inputText);
    }

    function createChatroom(name){
        const chat = {
            name: name
        };
      fetch('https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // tells REST that we will send the body data in JSON format
        },
        body: JSON.stringify(chat),
      }).then();
    }

    useInterval(
   () => {
     fetch(
       `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats`
     )
       .then((response) => response.json())
       .then((data) => {
         setChats(data.Items);
       });
   },
    1000, // fast polling
 );

  useInterval(
   (params) => {
     const chatId = params[0];
     fetch(
       `https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats/${chatId}/messages`
     )
       .then((response) => response.json())
       .then((data) => {
         setMessages(data.Items);
       });
   },
    1000, // fast polling
    currentChat.id
 );

    return (
        <div><h1>Chat Room</h1>
        <Grid container spacing = {1} direction = "column" className="chat">            
            <Grid item = {4}><Button className="chooseChatroom"
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Choose a chat room<ArrowDropDownIcon/>
            </Button>
            <Menu
                className='chatRooms'
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {chats.map((chat)  =>  (<MenuItem onClick={() => chooseChat(chat)}>{chat.name}</MenuItem>))}
            </Menu>
            </Grid>
              <Grid item={4}>
            <TextField label="Create a new Chat Room" id="outlined-basic" variant="outlined" onChange={(event) => setInputText(event.target.value)}/>
            <Button onClick={() => createChatroom(inputText)}><AddIcon/></Button>
        </Grid>
        <Grid item = {4}>
        <TextField label="Enter your username" id="outlined-basic" variant="outlined" onChange={(event) => setInputText(event.target.value)}/>
        <Button onClick={chooseUsername}><CheckIcon/></Button>
        </Grid>
        </Grid>
        <Container className='messages'>
        <h2 className='chatName'>{currentChat.name}</h2>
        <TextField className = 'input' id="outlined-basic" variant="outlined" onChange={(event) => setInputText(event.target.value)}
            placeholder="type your message here"/>  
        <Button onClick={() => addMessage(inputText)}><SendIcon/></Button>
        {messages.map((message)  =>  (<MessageItem text = {message.text} username={message.username} currentUsername = {username}/>))}
        </Container>
              
        </div>  
    );
  };

  const MessageItem = (props) => {
      return(
          <div>
            <Box className={props.username==props.currentUsername ? 'usermessage' : 'othermessage'}>
            <div className='username'> {props.username}: </div>
          <div className='message'>{props.text}</div>
          </Box>            

          </div>
      )
      }



