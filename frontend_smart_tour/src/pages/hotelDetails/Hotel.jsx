import "../hotelDetails/hotel.css";
import Navbar from "../../components/Header/Header";
import Header from "../../components/searchbar/searchBar";
import Footer from "../../components/Footer/Footer";

import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../redux/features/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

// room_images may come back as a single string or an array; always render an array.
const toImageArray = (images) => {
  if (Array.isArray(images)) return images;
  if (typeof images === "string" && images.length) return [images];
  return [];
};

const defaultDates = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  return [{ startDate, endDate, key: "selection" }];
};

const Hotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  // Use router state when arriving via "See availability"; otherwise fetch by id.
  const [hotelData, setHotelData] = useState(location.state?.props || null);
  const [noOfRooms, setNoOfRooms] = useState(location.state?.noOfRooms || 1);
  const [dates, setDates] = useState(location.state?.bookingDates || defaultDates());

  useEffect(() => {
    if (hotelData) return;
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/hotel/showhotel/${id}`);
        setHotelData(res.data);
      } catch (error) {
        console.error("Failed to load hotel:", error);
      }
    };
    fetchHotel();
  }, [id, hotelData]);

  if (!hotelData) {
    return (
      <div>
        <Navbar />
        <div style={{ padding: 40, textAlign: "center" }}>Loading hotel…</div>
        <Footer />
      </div>
    );
  }

  const images = toImageArray(hotelData.room_images || hotelData.hotel_image);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
    return Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  }

  const days = Math.max(1, dayDifference(dates[0].endDate, dates[0].startDate));

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    const last = images.length - 1;
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? last : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === last ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  function handleReserveBooking() {
    const data = { hotelData, noOfRooms, days, dates };
    dispatch(addToCart(data));
    navigate("/cart");
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={images[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <h1 className="hotelTitle">{hotelData.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotelData.location}</span>
          </div>
          <div className="hotelImages">
            {images.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt="img"
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <p className="hotelTitle">{hotelData.room_description}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h2>
                <b>PKR {days * hotelData.price * noOfRooms}</b> <br></br>{days}{" "}
                night(s) & {noOfRooms} room(s)
              </h2>
              <button onClick={() => { handleReserveBooking() }}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
