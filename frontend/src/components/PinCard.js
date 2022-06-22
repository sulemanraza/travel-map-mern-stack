import { FaStar } from "react-icons/fa";

const PinCard = ({ pin }) => {
  return (
    <div className="card">
      <label>Place</label>
      <h4>{pin.title}</h4>
      <label>Review</label>
      <p className="desc">{pin.desc}</p>
      <label>Rating</label>
      <div className="FaStar">
        {Array.from(Array(pin.rating).keys()).map((st) => (
          <FaStar className="stars" key={st} size={30} />
        ))}
      </div>
      <label>Information</label>
      <span className="username">
        Created by <b>{pin.username}</b>
      </span>
      <span className="date">1 hour ago </span>
    </div>
  );
};

export default PinCard;
