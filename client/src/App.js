import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NicknameForm from './components/NicknameForm';
import JoinRoom from './components/JoinRoom';
import ChatAndQuiz from './components/ChatAndQuiz';

const App = () => {
  // Manage room state here
  const [room, setRoom] = useState('');
  const state = useSelector((state) => state);
  const nickname = useSelector((state) => state.nickname);

  console.log(state); // For debugging

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NicknameForm room={room} setRoom={setRoom} />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/room/:roomId" element={<ChatAndQuiz nickname={nickname} />} />
      </Routes>
    </Router>
  );
};

export default App;
