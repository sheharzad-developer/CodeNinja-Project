import React from "react";

import "./CustomerReview.css";

function CustomerReview() {
  return (

    <div className="Customer Reviews">
      <div className="container">
        <div className="headingTitle">
          <h1>Customer Reviews</h1>
        </div>
        <div className="ReviewSection">
          <div className="customerSec">
            <div className="circle" />
          </div>
          <div className="customerSec">
            <div className="circle" />

          </div>
          <div className="customerSec">
            <div className="circle">
            </div>
          </div>
        </div>

        {/* <div className="ReviewSection">
          <div className="customerSec">
            <div className="circle">

            </div>
          </div>
          <div className="customerSec">
            <div className="circle">

            </div>
          </div>
          <div className="customerSec">
            <div className="circle">

            </div>
          </div>
        </div> */}

      </div>
    </div>

  );
}

export default CustomerReview;
