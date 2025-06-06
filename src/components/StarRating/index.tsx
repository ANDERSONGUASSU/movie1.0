import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";
export interface Props {
  rating: number;
}

const StarRating = (props: Props) => {
  const numStars = Math.round(props.rating);
  const fullstars = [];
  const emptystars = [];

  for (let rat = 0; rat < 10; rat++) {
    if (rat < numStars) {
      fullstars.push(rat);
    } else {
      emptystars.push(rat);
    }
  }

  return (
    <div className="flex items-center text-yellow-500">
      {fullstars.map((star) => (
        <FaStar key={star} />
      ))}
      {emptystars.map((star) => (
        <FaRegStar key={star} />
      ))}
    </div>
  );
};

export default StarRating;
