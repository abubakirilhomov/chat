import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RatingModal({ isOpen, onClose, room }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:8000/api/ratings') // Your backend endpoint
        .then(response => {
          console.log('Ratings data:', response.data); // Add logging for the response
          setRatings(response.data);
        })
        .catch(error => {
          console.error('Error fetching ratings:', error);
        });
    }
  }, [isOpen, room]);

  return (
    <>
      {isOpen && (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
          <div className="modal-box w-[200px] bg-red-400">
            <button onClick={onClose} className="modal-close">Close</button>
            <div className="modal-content">
              <h2 className="font-bold text-lg">Ratings</h2>
              <ul className="py-4">
                {ratings.map((rating, index) => (
                  <li key={index}>{rating.nickname}: {rating.correctAnswersCount} / {rating.totalQuestions}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RatingModal;
