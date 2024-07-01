import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RatingModal({ isOpen, onClose }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios.get('https://your-server-url/ratings')
        .then(response => {
          setRatings(response.data);
        })
        .catch(error => {
          console.error('Error fetching ratings:', error);
        });
    }
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">Close</button>
        <h2>Ratings</h2>
        <ul>
          {ratings.map((rating, index) => (
            <li key={index}>{rating.nickname}: {rating.correctAnswersCount} / {rating.totalQuestions}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RatingModal;
