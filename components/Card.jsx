import PropTypes from 'prop-types';
import React from 'react';
import { data } from 'autoprefixer';

export const Card = ({ card }) => {
  const { id, reg, ital } = card;

  return (
    <div className="flex-col mx-auto flex rounded-3xl items-center justify-center p-4 h-full max-h-[347px] animate-[wiggle_10s_ease_infinite]  bg-white text-j-blue max-w-[430px] drop-shadow-[0px_25px_50px_rgba(0,0,0,0.4)]">
      <p className="font-fruit font-normal mx-auto text-4xl tracking-tighter align-middle items-center text-center p-16 m-8">
        {reg}
        <i className="font-thin"> {ital}</i>.
      </p>
      <p className="uppercase text-center font-mont tracking-tight font-normal text-xs">
        song seeds by jacob&#39;s blue
      </p>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number,
  reg: PropTypes.string,
  ital: PropTypes.string,
};
