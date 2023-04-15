import React from 'react';

const Card2 = ({ card, exiting }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 ${
        exiting ? 'animate-slide-out-left' : 'animate-slide-in-right'
      }`}
      style={{
        transform: `${exiting ? 'translateX(-100%)' : 'translateX(0)'}`,
      }}
    >
      <p className="text-gray-700">{card.reg}</p>
    </div>
  );
};

export default Card2;
