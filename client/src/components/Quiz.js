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

function Quiz({ room, nickname }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizMessages, setQuizMessages] = useState([]);
  const [currentVariants, setCurrentVariants] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

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
    const savedQuestionIndex = parseInt(localStorage.getItem(`currentQuestionIndex_${room}`), 10);
    if (!isNaN(savedQuestionIndex) && savedQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(savedQuestionIndex);
    }

    const savedQuizMessages = JSON.parse(localStorage.getItem(`quizMessages_${room}`));
    if (savedQuizMessages) {
      setQuizMessages(savedQuizMessages);
    }

    const isQuizCompleted = localStorage.getItem(`quizCompleted_${room}`);
    if (isQuizCompleted === 'true') {
      setQuizCompleted(true);
    }

    const savedCorrectAnswersCount = parseInt(localStorage.getItem(`correctAnswersCount_${room}`), 10);
    if (!isNaN(savedCorrectAnswersCount)) {
      setCorrectAnswersCount(savedCorrectAnswersCount);
    }
  }, [room]);

  useEffect(() => {
    if (currentQuestionIndex < quizQuestions.length) {
      const { correctAnswer, incorrectAnswers } = quizQuestions[currentQuestionIndex];
      const allAnswers = shuffleArray([correctAnswer, ...incorrectAnswers]);
      setCurrentVariants(allAnswers);
    } else {
      setQuizCompleted(true);
      localStorage.setItem(`quizCompleted_${room}`, 'true');
    }
    
  }, [currentQuestionIndex]);

  const sendAnswer = (selectedAnswer) => {
    if (selectedAnswer.trim() && room) {
      const question = quizQuestions[currentQuestionIndex]?.question;
      if (question) {
        const isCorrect = selectedAnswer === quizQuestions[currentQuestionIndex].correctAnswer;
        if (isCorrect) {
          setCorrectAnswersCount((prevCount) => {
            const newCount = prevCount + 1;
            localStorage.setItem(`correctAnswersCount_${room}`, newCount);
            return newCount;
          });
        }

        socket.emit('sendQuizAnswer', { room, question, selectedAnswer, nickname });

        const newIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(newIndex);
        localStorage.setItem(`currentQuestionIndex_${room}`, newIndex);

        const updatedQuizMessages = [...quizMessages, `Question: ${question}, Answer: ${selectedAnswer}`];
        setQuizMessages(updatedQuizMessages);
        localStorage.setItem(`quizMessages_${room}`, JSON.stringify(updatedQuizMessages));

        if (newIndex === quizQuestions.length) {
          localStorage.setItem(`quizCompleted_${room}`, 'true');
          setQuizCompleted(true);
        }
      }
    }
  };
  

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const image = currentQuestion?.image || currentQuestion?.ifNotImage;

  return (
    <div className="flex flex-col items-center justify-center border-warning border border-opacity-40 h-[85vh] xl:min-w-[500px] shadow-md shadow-warning rounded-lg w-full bg-base-100">
      <div className="w-full p-10 h-full bg-base-300 shadow-md rounded-lg flex flex-col justify-between">
        <div className="mb-2 p-2 bg-warning text-white font-semibold text-xl rounded-md text-center">
          {!quizCompleted ? currentQuestion?.question : 'You completed the quiz'}
        </div>
        <div className="min-h-[55%] overflow-y-scroll flex justify-center items-center mb-4 border border-warning border-opacity-25 rounded-md p-2">
          {!quizCompleted ? (
            <>
              {image && (
                <div className="flex justify-center items-center mb-4 max-w-[30%] max-h-[40%] rounded-lg">
                  <LazyLoadImage
                    alt={image.alt || ''}
                    src={image.src || ''}
                    effect="blur"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-green-600 text-xl">
              You answered {correctAnswersCount} / {quizQuestions.length} questions correctly.
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