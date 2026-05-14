import './ReviewsCarousel.scss'
import { useState } from "react";

export default function ReviewsCarousel({ reviews }) {
  const [current, setCurrent] = useState(0);

  const prev = () => {
    setCurrent((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setCurrent((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="reviews-carousel">
      <button className="nav prev" onClick={prev}>‹</button>
      <div className="review">
        <p><strong>{reviews[current].name}:</strong> {reviews[current].text}</p>
      </div>
      <button className="nav next" onClick={next}>›</button>
    </div>
  );
}