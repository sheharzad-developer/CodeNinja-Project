import React from "react";
import "./ExploreDestination.css";
import image1 from "../../components/assets/islamabad.jpg";
import image2 from "../../components/assets/lhrminarpak.jpg";
import image3 from "../../components/assets/multan.jpg";
import image4 from "../../components/assets/quaid.jpg";
import image5 from "../../components/assets/badshahimosq.jpg";
import image6 from '../../components/assets/mohatta.jpg'
function ExploreDestination() {
  return (
    <div className="ExploreDestination">
    <div className="container">
      <div className="headingTitle">
        <h1>Explore Destinations</h1>
      </div>
      <div className="ReviewBackground">
        <div className="outsideBox">
          <div className="imageBox">
            <img src={image1} alt="image1" />
            <div className='TextBox'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur ..</p>

            </div>
          </div>

        </div>
        <div className="outsideBox">
          <div className="imageBox">
            <img src={image2} alt="image2" />
            <div className='TextBox'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur ..</p>
            </div>
           
          </div>
        </div>
        <div className="outsideBox">
          <div className="imageBox">
            <img src={image3} alt="image3" />
          </div>
          <div className='TextBox'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur ..</p>

            </div>
            
        </div>
      </div>
      <div className="ReviewBackground">
        <div className="outsideBox">
          <div className="imageBox">
            <img src={image4} alt="image4" />
          </div>
          <div className='TextBox'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur ..</p>

            </div>
  
        </div>
        <div className="outsideBox">
          <div className="imageBox">
            <img src={image5} alt="image5" />
          </div>
          <div className='TextBox'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur ..</p>

            </div>
          
        </div>
        <div className="outsideBox">
          <div className="imageBox">
            <img src={image6} alt="image6" />
          </div>
          <div className='TextBox'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur ..</p>

            </div>
            
        </div>
      </div>

    </div>
  </div>
  );
}

export default ExploreDestination;
