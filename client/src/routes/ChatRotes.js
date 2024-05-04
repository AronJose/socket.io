import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chats from '../components/Chats';
import Room from '../components/Room';

function ChatRotes() {
    return (
        <Routes>
            <Route path="/" element={<Room />} />
            <Route path="/room" element={<Chats />} />
        </Routes>
    );
}

export default ChatRotes;

