import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import Chats from './Chats';
import './chat.css'

const socket = io.connect("http://localhost:3001");

function Room() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [chat, setChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setChat(true);
        }
    };

    useEffect(() => {
        setChat();
    }, [])

    return (
        <div className='body-class'>
            {!chat ? (
                <div className='chat-box'>
                    <h3>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }} />
                    <input
                        type="text"
                        placeholder="Room Id"
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }} />
                    <button onClick={joinRoom}>Submit</button>
                </div>
            ) : (
                    <Chats socket={socket} username={username} room={room} chat={chat} />
                )}
        </div>
    );
}

export default Room;
