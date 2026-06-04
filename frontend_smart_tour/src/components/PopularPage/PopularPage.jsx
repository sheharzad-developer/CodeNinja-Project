import React from "react";
import "./PopularPage.css";
import icon from "../../components/assets/resort.png";
import icons from "../../components/assets/holiday.png";
import { Link } from "react-router-dom";

function PopularPage() {
  return (
    <div className="PopularPage">
     
      <div className="Sub-Div">

        <div className="iconBox">
        
          <div className="icon">
            <Link to="/hotel"> <img src={icon} alt="icon" /></Link>
          </div>
        </div>

        <div className="iconBox2">
          <div className="icon">
            <Link to="/tour"><img src={icons} alt="icons" /></Link>
            </div>

          </div>

          {/* <div id="container">
            <button id="myButton">Search</button>
          </div> */}
        </div>

      </div>

      );
}

      export default PopularPage;