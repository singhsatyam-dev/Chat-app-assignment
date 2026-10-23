import { useState } from "react";

//random users
export const USER_LIST = ["Alan", "Bob", "Carol", "Dean", "Elin"];

export function useChat() {
  const [messages, setMessages] = useState([]);

  function sendMessage(text) {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    const username = USER_LIST[Math.floor(Math.random() * USER_LIST.length)];

    const newMessage = {
      id: crypto.randomUUID(),
      username,
      text: trimmedText,
      likes: 0,
      createdAt: new Date(),
    };

    setMessages((previous) => [...previous, newMessage]);
  }

  function likeMessage(messageId) {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === messageId
          ? { ...message, likes: message.likes + 1 }
          : message,
      ),
    );
  }

  return {
    messages,
    sendMessage,
    likeMessage,
  };
}
