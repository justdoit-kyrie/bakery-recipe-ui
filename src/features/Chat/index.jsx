import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import React, { useState } from 'react';

const Chat = () => {
  const [user] = useState('duc');
  const [room] = useState('1');
  const [connection, setConnection] = useState();
  console.log({ connection });

  const joinRoom = async () => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:7286/chat')
        .configureLogging(LogLevel.Information);

      connection.on('ReceiveMessage', (user, message) => {
        console.log({ message });
      });

      await connection.start();
      await connection.invoke('JoinRoom', { user, room });
      setConnection(connection);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <button onClick={joinRoom}>join Room</button>
    </div>
  );
};

export default Chat;
