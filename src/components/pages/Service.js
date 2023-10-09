import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import img1 from "../../assets/images/Services/Mehendi Design.svg";
import img2 from "../../assets/images/Services/Nail Art.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Service() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedService = event.target.getAttribute("name");
    dispatch(setData({ Service: selectedService }));
    dispatch(print());
  }
  return (
    <div>
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img src={whatsapp} width="120px" height="70px" className="fixed top-[50vh] right-0"></img>
      </a>
      <Homeheader line1="Karwachauth Event" line2="Mehndi | Nail art service" />
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
