import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://chat-quiz-back.vercel.app/');

const quizQuestions = [
  { question: "What is the capital of Spain?" },
  { question: "What is 2 + 2?" },
  { question: "What is the capital of France?" },
  { question: "What is the largest planet?" },
  { question: "What is the boiling point of water in Celsius?" }
];

function Quiz({ room }) {
  const [answer, setAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizMessages, setQuizMessages] = useState([]);

  useEffect(() => {
    if (room) {
      console.log(`Joining room: ${room}`);
      socket.emit('joinRoom', room);

      const handleReceiveQuizAnswer = (message) => {
        console.log('Received quiz answer:', message);
        setQuizMessages((prevMessages) => [...prevMessages, message]);
      };

      socket.on('receiveQuizAnswer', handleReceiveQuizAnswer);

      return () => {
        socket.off('receiveQuizAnswer', handleReceiveQuizAnswer);
      };
    }
  }, [room]);

  const sendAnswer = () => {
    if (answer.trim() && room) {
      const question = quizQuestions[currentQuestionIndex]?.question;
      if (question) {
        console.log(`Sending answer: ${answer} for question: ${question}`);
        socket.emit('sendQuizAnswer', { room, question, answer });
        setAnswer('');
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const quizCompleted = currentQuestionIndex >= quizQuestions.length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md">
        <div className="h-96 overflow-y-scroll mb-4 border border-gray-300 rounded-md p-2">
          {!quizCompleted ? (
            <>
              <div className="mb-2 p-2 bg-yellow-200 rounded-md text-yellow-800">
                {quizQuestions[currentQuestionIndex]?.question}
              </div>
              {quizMessages.map((msg, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-200 rounded-md">{msg}</div>
              ))}
            </>
          ) : (
            <div className="text-center text-green-600 text-xl">
              You passed!
            </div>
          )}
        </div>
        {!quizCompleted && (
          <div className="flex">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendAnswer()}
              className="flex-grow p-2 border border-gray-300 rounded-l-md"
              placeholder="Type your answer..."
            />
            <button
              onClick={sendAnswer}
              className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
