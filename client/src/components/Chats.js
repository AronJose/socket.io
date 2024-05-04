import React, { useState, useEffect } from 'react';
import './chat.css';

function Chats({ socket, room, username }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setCurrentMessage(""); // Clear input after sending message
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Clean up event listener on component unmount
        return () => {
            socket.off("receive_message");
        };
    }, [socket]);

    return (
        <div>
            <div className="chat-header">
                <h1>Live Chats</h1>
            </div>
            <div >
                {messages.map((msg, index) => (
                    <div key={index} className="chat">
                        <h3>{msg.message}</h3>
                        {/* Display other message information as needed */}
                    </div>
                ))}
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(event) => setCurrentMessage(event.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chats;
