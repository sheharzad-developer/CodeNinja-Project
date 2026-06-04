import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./ExplorePage.css";


function ExplorePage() {
const [data,setData]=useState([])


  const fetchData = async () => {
    const response = await fetch('http://localhost:3002/api/tour/showpackage');
    const data = await response.json();
    console.log(data)
    setData(data)
    // do something with the data
  };
  useEffect(()=>{
    fetchData()
  },[])

  return (
    
    <div className="ExplorePage">
    <div className="container">
      <h1 className="heading">Popular Tours</h1>
      <div className="ExplorePageInside">
     
        {data?.map((value,index)=>{
          return(<>
          
        
            <div class="imageBoxInside hover10 container1  ">

                
               <figure> <img src={value.package_image} alt="image" />
                  <div class="middle">
                   <Link to="/tours"> <div class="text1"><h1>{value.package_name}</h1></div></Link>
                  </div>
                  </figure>           
              </div>

       
            </>)

          })}

        </div>
        <div>

        </div>
      {/* </div> */}


    </div>
  </div>
  );
}

export default ExplorePage;
