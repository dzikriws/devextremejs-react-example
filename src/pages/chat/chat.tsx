import React, { useCallback, useState } from "react";
import { Chat } from "devextreme-react";

type UserType = {
  id: string;
  name: string;
  avatarUrl?: string;
};

type MessageType = {
  timestamp: number;
  author: UserType;
  text: string;
};

type AlertType = {
  id: number;
  message: string;
};

const firstUser: UserType = {
  id: "1",
  name: "User"
};

const secondUser: UserType = {
  id: "2",
  name: "Feedback Bot",
  avatarUrl: "./images/Chat/bot.png"
};

const initialMessages: MessageType[] = [
  {
    timestamp: Date.now(),
    author: secondUser,
    text: "Hello! We'd love to hear your feedback. Please share your thoughts below!"
  }
];

export function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [typingUsers, setTypingUsers] = useState<UserType[]>([]);

  const onMessageEntered = useCallback((e: any) => {
    const { message } = e;
    const normalizedMessage: MessageType = {
      ...message,
      timestamp: typeof message.timestamp === "number"
        ? message.timestamp
        : message.timestamp
        ? new Date(message.timestamp).getTime()
        : Date.now()
    };
    setMessages(prev => [...prev, normalizedMessage]);
    setTypingUsers([secondUser]);
    sendToBackend();
  }, []);

  const sendToBackend = () => {
    setTimeout(() => {
      setTypingUsers([]);
      setMessages(prev => [
        ...prev,
        {
          text: "Thanks for helping us improve!",
          author: secondUser,
          timestamp: Date.now(),
        }
      ]);
      setAlerts([
        {
          id: 1,
          message: "Session expired"
        }
      ]);
      setDisabled(true);
    }, 3000);
  };

  return (
    <React.Fragment>
      <Chat
        alerts={alerts}
        disabled={disabled}
        user={firstUser}
        items={messages}
        onMessageEntered={onMessageEntered}
        typingUsers={typingUsers}
        width={400}
        height={500}
      />
    </React.Fragment>
  );
}
