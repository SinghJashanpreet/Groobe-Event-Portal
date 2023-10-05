import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import img1 from "../../assets/images/Services/Mehendi Design.svg";
import img2 from "../../assets/images/Services/Nail Art.svg";
import { Link } from "react-router-dom";
function Service() {
  return (
    <div>
      <Homeheader />
      <div>
        <Link to="/design">
          <img src={img1}></img>
        </Link>

        <Link to="/design">
          <img src={img2}></img>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Service;
