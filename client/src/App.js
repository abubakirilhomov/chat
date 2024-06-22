import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NicknameForm from './components/nickNameForm';
import JoinRoom from './components/JoinRoom';
import ChatAndQuiz from './components/ChatAndQuiz';
import { useSelector } from 'react-redux';

const App = () => {
  // Получаем глобальное состояние
  const state = useSelector((state) => state);

  console.log(state); // Выводим состояние в консоль для отладки
//cjdovchusdbvcdiusyvidsugvisdvds
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NicknameForm />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/room/:roomId" element={<ChatAndQuiz />} />
      </Routes>
      <></>
    </Router>
  );
};

export default App;
