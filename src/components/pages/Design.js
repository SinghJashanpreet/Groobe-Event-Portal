import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import img1 from "../../assets/images/Design/Varanasi_Mehndi_Design_Images_Pictures_(Ideas)-transformed 1.svg";
import img2 from "../../assets/images/Design/Arabic_Mehndi_Designs-removebg-preview 1.svg";
import img3 from "../../assets/images/Design/Stylish_Mehndi_Designs-removebg-preview 1.svg";
import img4 from "../../assets/images/Design/indo arabic 1.svg";
import img5 from "../../assets/images/Design/Jaguar_Mhendi_Design-removebg-preview 1.svg";

import img6 from "../../assets/images/Design/Mask group.svg";
import img7 from "../../assets/images/Design/Mask group-1.svg";
import img8 from "../../assets/images/Design/Mask group-2.svg";
import img9 from "../../assets/images/Design/Mask group-3.svg";
import img10 from "../../assets/images/Design/Mask group-4.svg";
import img11 from "../../assets/images/Design/Mask group-5.svg";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Design() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();
  const bg = formData.Service === "Nail Art" ? 1 : undefined;
  const designArray =
    formData.Service === "Mehndi"
      ? [
        {
          src: img1,
          name: "Bridal Mehndi",
        },
        {
          src: img2,
          name: "Arabic Mehndi",
        },
        {
          src: img3,
          name: "Khafif Mehndi",
        },
        {
          src: img4,
          name: "Indo Arabic Mehndi",
        },
        {
          src: img5,
          name: "Tattoo Mehndi",
        },
      ]
      : [
        {
          src: img6,
          name: "Colored-Tip Nails",
        },
        {
          src: img7,
          name: "Freehand Nails",
        },
        {
          src: img8,
          name: "Air Brushing Nails",
        },
        {
          src: img9,
          name: "Sticker Nails",
        },
        {
          src: img10,
          name: "Stencil Nails",
        },
        {
          src: img11,
          name: "Glitter Nails",
        },
      ];
  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedDesign = event.target.getAttribute("name");
    dispatch(setData({ Design: selectedDesign }));
    dispatch(print());
  }

  return (
    <div>
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img src={whatsapp} width="120px" height="70px" className="fixed top-[50vh] right-0"></img>
      </a>
      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" bg={bg} />
      <div>
        {designArray.map((design) => (
          <Link to={formData.Service === "Nail Art" ? "/time" : "/price"}>
            <div className="bg-[#264653] m-2 w-max " onClick={changeHandler}>
              <h1 className="text-3xl">{design.name}</h1>
              <img src={design.src} name={design.name}></img>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Design;
