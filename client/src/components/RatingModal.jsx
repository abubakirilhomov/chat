import React, { useState, useEffect } from 'react';
import { IoStatsChart } from "react-icons/io5";
import io from 'socket.io-client';

const socket = io('https://chat-back-1-eg9f.onrender.com'); // Ensure this URL matches your backend server

const RatingModal = ({ room }) => {
  const [results, setResults] = useState({});

  useEffect(() => {
    const handleReceiveResults = (results) => {
      console.log("Received results:", results); // Logging received results
      setResults(results);
    };

    socket.on('receiveResults', handleReceiveResults);

    return () => {
      socket.off('receiveResults', handleReceiveResults);
    };
  }, []);

  const fetchResults = () => {
    console.log("Fetching results for room:", room); // Logging fetch request
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
          {Object.keys(results).length === 0 ? (
            <p>No results available.</p>
          ) : (
            Object.keys(results).map(user => (
              <div key={user}>
                <h3 className="font-bold text-lg">{user}</h3>
                <p className="py-4">
                  {results[user].correctAnswersCount} / {results[user].totalQuestions}
                </p>
              </div>
            ))
          )}
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
