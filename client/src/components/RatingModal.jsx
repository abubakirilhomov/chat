import React, { useState, useEffect } from 'react';
import { IoStatsChart } from "react-icons/io5";
import io from 'socket.io-client';

const socket = io('https://chat-back-1-eg9f.onrender.com');

const RatingModal = ({ room }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handleReceiveResults = (results) => {
      setResults(Object.entries(results).map(([nickname, { correctAnswersCount, totalQuestions }]) => ({
        nickname,
        correctAnswersCount,
        totalQuestions,
      })));
    };

    socket.on('receiveResults', handleReceiveResults);

    return () => {
      socket.off('receiveResults', handleReceiveResults);
    };
  }, []);

  const fetchResults = () => {
    socket.emit('getResults', room);
    document.getElementById('my_modal_4').showModal();
  };

  return (
    <div>
      <button className="btn btn-warning text-white" onClick={fetchResults}>
        <IoStatsChart /> See ratings
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {results.map(user => (
            <div key={user.nickname}>
              <h3 className="font-bold text-lg">{user.nickname}</h3>
              <p className="py-4">
                {user.correctAnswersCount} / {user.totalQuestions}
              </p>
            </div>
          ))}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-warning">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RatingModal;
