import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import img1 from "../../assets/images/Design/Varanasi_Mehndi_Design_Images_Pictures_(Ideas)-transformed 1.svg";
import img2 from "../../assets/images/Design/Arabic_Mehndi_Designs-removebg-preview 1.svg";
import img3 from "../../assets/images/Design/Stylish_Mehndi_Designs-removebg-preview 1.svg";
import img4 from "../../assets/images/Design/indo arabic 1.svg";
import img5 from "../../assets/images/Design/Jaguar_Mhendi_Design-removebg-preview 1.svg";

import img6 from "../../assets/images/Design/colored_tip_nails_1 1.svg";
import img7 from "../../assets/images/Design/airbrushing_nails 1 (1).svg";
import img8 from "../../assets/images/Design/airbrushing_nails 1 (2).svg";
import img9 from "../../assets/images/Design/airbrushing_nails 1 (3).svg";
import img10 from "../../assets/images/Design/colored_tip_nails_1 1 (1).svg";
import img11 from "../../assets/images/Design/colored_tip_nails_1 1 (2).svg";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Design() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();
  const bg = formData.Service === "Nail Art" ? 1 : undefined;
  const designArray =
    formData.Service === "Mehndi Design"
      ? [
          {
            src: img1,
            name: "Bridal Mehndi",
            color: "#264653",
            textColor: "white",
          },
          {
            src: img2,
            name: "Arabic Mehndi",
            color: "#2A9D8F",
            textColor: "white",
          },
          {
            src: img3,
            name: "Khafif Mehndi",
            color: "#E9C46A",
            textColor: "white",
          },
          {
            src: img4,
            name: "Indo Arabic Mehndi",
            color: "#F4A261",
            textColor: "white",
          },
          {
            src: img5,
            name: "Tattoo Mehndi",
            color: "#E76F51",
            textColor: "white",
          },
        ]
      :[
          {
            src: img6,
            name: "Colored-Tip Nails",
            color: "#264653",
            textColor: "white",
          },
          {
            src: img7,
            name: "Freehand Nails",
            color: "#2A9D8F",
            textColor: "white",
          },
          {
            src: img8,
            name: "Air Brushing Nails",
            color: "#E9C46A",
            textColor: "black",
          },
          {
            src: img9,
            name: "Sticker Nails",
            color: "#F4A261",
            textColor: "black",
          },
          {
            src: img10,
            name: "Stencil Nails",
            color: "#E76F51",
            textColor: "white",
          },
          {
            src: img11,
            name: "Glitter Nails",
            color: "#264653",
            textColor: "white",
          }
        ];
  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedDesign = event.target.getAttribute("name");
    dispatch(setData({ Design: selectedDesign }));
    dispatch(print());
  }

  return (
    <div className="">
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img
          src={whatsapp}
          width="120px"
          height="70px"
          className="fixed top-[50vh] right-0"
        ></img>
      </a>
      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" bg={bg} />
      {console.log(formData.Service)}
      <div className="grid grid-rows-1 md:grid-cols-[_2fr_2fr] mx-[6.5%] gap-x-[7%]">
        {designArray.map((design) => (
          <Link to={formData.Service === "Nail Art" ? "/time" : "/price"}>
            <div
            style={{ backgroundColor: design.color }}
              className={`
            grid grid-cols-[_2fr_1.5fr] lg:grid-cols-[_2.5fr_1.5fr] 
            min-w-[310px] max-w-[650px] min-h-[210px]
            max-h-[400px] w-full rounded-lg my-7
            md:mt-[1.5rem]`}
              onClick={changeHandler}
            >
              <span className="flex flex-col justify-center">
                <h1
                  className={`text-4xl sm:text-5xl font-Bell text-${design.textColor} px-5`}
                >
                  {design.name}
                </h1>
              </span>
              <div className="w-full h-full relative">
                <img
                  src={design.src}
                  name={design.name}
                  className="w-full h-full object-cover relative left-0"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Design;
