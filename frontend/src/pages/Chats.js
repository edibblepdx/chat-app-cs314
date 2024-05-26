import React from 'react';
import ChatInput from '../components/ChatInput';
import CreateChat from '../components/CreateChat';
import ChatSidebar from '../components/ChatSidebar';

export default function Chats() {
  return (
    <div>
      <h1>Chat Page</h1> 
      <CreateChat />
      <ChatInput />
      <ChatSidebar />
    </div>
  )
}
