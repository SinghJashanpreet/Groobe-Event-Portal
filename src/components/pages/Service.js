import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import img1 from "../../assets/images/Services/Mehendi Design.svg";
import img2 from "../../assets/images/Services/Nail Art.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";

function Service() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedService = event.target.getAttribute('name');
    dispatch(setData({ Service: selectedService }));
    dispatch(print()); 
  }
  return (
    <div>
      <Homeheader />
      <div>
        <Link to="/design">
          <img src={img1} name="Mehndi" onClick={changeHandler}></img>
        </Link>

        <Link to="/design">
          <img src={img2} name="Nail Art" onClick={changeHandler}></img>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Service;
