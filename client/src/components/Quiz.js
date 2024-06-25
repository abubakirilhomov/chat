import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const socket = io('https://chat-back-1-eg9f.onrender.com');

const quizQuestions = [
  {
    question: "What is the capital of Spain?",
    correctAnswer: "Madrid",
    incorrectAnswers: ["Barcelona", "Valencia", "Seville"],
    image: {
      src: "https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg",
      alt: "Flag of Spain",
      height: "200px",
      width: "300px",
      caption: "Flag of Spain"
    },
    ifNotImage: {
      src: "https://freepngimg.com/thumb/facebook/72547-thinking-photography-question-mark-man-stock.png",
      alt: "Default question image",
      height: "200px",
      width: "200px",
      caption: "Default question image"
    }
  },
  {
    question: "What is 2 + 2?",
    correctAnswer: "4",
    incorrectAnswers: ["3", "5", "6"],
    image: {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/02/Telekanal_2%2B2.png",
      alt: "2 + 2",
      height: "200px",
      width: "200px",
      caption: "2 + 2"
    },
    ifNotImage: {
      src: "https://freepngimg.com/thumb/facebook/72547-thinking-photography-question-mark-man-stock.png",
      alt: "Default question image",
      height: "200px",
      width: "200px",
      caption: "Default question image"
    }
  },
  {
    question: "What is the capital of France?",
    correctAnswer: "Paris",
    incorrectAnswers: ["Lyon", "Marseille", "Nice"],
    image: {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_bp1jO8qBSTyKTWhHlkWfu9z3PFVup26SGg&s",
      alt: "Paris",
      height: "200px",
      width: "300px",
      caption: "Paris"
    },
    ifNotImage: {
      src: "https://freepngimg.com/thumb/facebook/72547-thinking-photography-question-mark-man-stock.png",
      alt: "Default question image",
      height: "200px",
      width: "200px",
      caption: "Default question image"
    }
  },
  {
    question: "What is the largest planet?",
    correctAnswer: "Jupiter",
    incorrectAnswers: ["Saturn", "Earth", "Mars"],
    image: {
      src: "https://science.nasa.gov/wp-content/uploads/2023/07/pia06890-our-solar-system-banner-1920x640-1.jpg?w=1920",
      alt: "Jupiter",
      height: "200px",
      width: "300px",
      caption: "Jupiter"
    },
    ifNotImage: {
      src: "https://freepngimg.com/thumb/facebook/72547-thinking-photography-question-mark-man-stock.png",
      alt: "Default question image",
      height: "200px",
      width: "200px",
      caption: "Default question image"
    }
  },
  {
    question: "What is the boiling point of water in Celsius?",
    correctAnswer: "100",
    incorrectAnswers: ["90", "80", "110"],
    image: {
      src: "https://www.shutterstock.com/image-vector/celcius-icon-design-eps-10-600nw-1981593977.jpg",
      alt: "Boiling point",
      height: "200px",
      width: "200px",
      caption: "Boiling point"
    },
    ifNotImage: {
      src: "https://freepngimg.com/thumb/facebook/72547-thinking-photography-question-mark-man-stock.png",
      alt: "Default question image",
      height: "200px",
      width: "200px",
      caption: "Default question image"
    }
  }
];


function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Quiz({ room }) {
  const [answer, setAnswer] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizMessages, setQuizMessages] = useState([]);
  const [currentVariants, setCurrentVariants] = useState([]);

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

  useEffect(() => {
    if (currentQuestionIndex < quizQuestions.length) {
      const { correctAnswer, incorrectAnswers } = quizQuestions[currentQuestionIndex];
      const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);
      setCurrentVariants(allAnswers);
    }
  }, [currentQuestionIndex]);

  const sendAnswer = (selectedAnswer) => {
    if (selectedAnswer.trim() && room) {
      const question = quizQuestions[currentQuestionIndex]?.question;
      if (question) {
        console.log(`Sending answer: ${selectedAnswer} for question: ${question}`);
        socket.emit('sendQuizAnswer', { room, question, selectedAnswer });
        setAnswer('');
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const quizCompleted = currentQuestionIndex >= quizQuestions.length;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const image = currentQuestion?.image || currentQuestion?.ifNotImage;

  return (
    <div className="flex flex-col items-center justify-center border-warning border border-opacity-40 h-[85vh] xl:min-w-[500px] shadow-md shadow-warning rounded-lg w-full bg-base-100">
      <div className="w-full p-10 h-full bg-base-300 shadow-md rounded-lg flex flex-col justify-between">
        <div className="mb-2 p-2 bg-warning text-white rounded-md">
          {currentQuestion?.question}
        </div>
        <div className="min-h-[55%] overflow-y-scroll mb-4 border border-warning border-opacity-25 rounded-md p-2">
          {!quizCompleted ? (
            <>
              <div className="flex justify-center mb-4">
                <LazyLoadImage
                  alt={image.alt}
                  height={image.height}
                  src={image.src}
                  width={image.width}
                  effect="blur"
                />
              </div>
            </>
          ) : (
            <div className="text-center text-green-600 text-xl">
              You passed!
            </div>
          )}
        </div>
        {!quizCompleted && (
          <div className="flex flex-wrap items-center gap-x-[2%] gap-y-5">
            {currentVariants.map((variant, index) => (
              <button
                key={index}
                onClick={() => sendAnswer(variant)}
                className={`p-2 min-w-[45%] flex-1 h-20 rounded-md ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : index === 2 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}
              >
                {variant}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;