import axios from "axios";
import "./searchItem.css";
import { Navigate, useNavigate } from "react-router-dom";




const SearchItem = ({ props, noOfRooms, bookingDates }) => {
  console.log(props)
  const navigate = useNavigate();
  const handleAvailability = async (id) => {
    navigate(`/hotels/${id}`, { state: { props, noOfRooms, bookingDates } });
    console.log(id);
  }

  

  return (
    <div className="searchItem">
      <img
        src={props.hotel_image} alt="hotel image"
        className="miImg"
      />
      <div className="siDesc">
        <h1 className="Title">{props.name}</h1>
        <span className="location">{props.location}</span>
        <span className="facility">Free Wifi</span>
        <span className="Subtitle">
          {props.hotel_description}
        </span>
        <span className="endDescription">
          Book at great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="Rating">
          <span>Excellent</span>
          <button>{props.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">PKR {props.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={() => {handleAvailability(props.id)}}>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
