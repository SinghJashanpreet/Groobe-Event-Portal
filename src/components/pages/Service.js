import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import img1 from "../../assets/images/Services/Varanasi_Mehndi_Design_Images_Pictures_(Ideas)-transformed 1 (1).svg";
import img2 from "../../assets/images/Services/nails__nail_art__nail__nail_designs__nail_design__nail_polish__nail_ideas__spring_nails__spring_nail-transformed 1 (1).svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Service() {
  const serviceMap = [
    {
      name: "Mehndi Design",
      desc: "Book Mehndi Design Service",
      src: img1,
    },
    {
      name: "Nail Art",
      desc: "Book Nail Art Service",
      src: img2,
    },
  ];
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedService = event;
    // const selectedService = event.location.state.serviceName;
    dispatch(setData({ Service: selectedService }));
    dispatch(print());
  }
  return (
    <div>
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I've%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img
          src={whatsapp}
          width="120px"
          height="70px"
          className="fixed top-[50vh] right-0"
        ></img>
      </a>
      <Homeheader className="m:w-5 m:h-5 " line1="Karwachauth Event" line2="Mehndi | Nail art service" />

      <div className="grid grid-rows-1 md:grid-cols-[0.6fr_1.9fr_1.9fr_0.6fr] md:gap-7 place-items-center">
        <div></div>
        {serviceMap.map((service) => (
          <Link  to={{ pathname: "/design", state: { serviceName: service.name } }}>
          <div  >  
            <div
              className={
                service.name === "Mehndi Design"
                  ? `bg-[#FFC087]
                  grid grid-cols-[_2fr_1.5fr] lg:grid-cols-[_2.5fr_1.5fr] min-w-[310px] max-w-[650px] min-h-[210px]
                  max-h-[400px] w-[32vw] h-full rounded-lg my-[1.2rem] 
                  md:my-[3rem]`
                  : `bg-gradient-to-r from-[#0500EF] to-[#FFC6C6]
                  grid grid-cols-[_2fr_1.5fr] lg:grid-cols-[_2.5fr_1.5fr] min-w-[310px] max-w-[650px] min-h-[210px] 
                  max-h-[400px] w-[32vw] h-full rounded-lg my-0 mb-[1.2rem] 
                  md:my-[3rem]`
              }
              onClick={() => {
                changeHandler(service.name);
              }}
            >
              <span className="flex flex-col justify-center">
                <h1 className="pl-3 font-Bell text-4xl">{service.name}</h1>
                <h2 className="pl-3 font-inter text-base">{service.desc}</h2>
              </span>
              <div className="flex items-end justify-end grow-0 " onClick={changeHandler}>
                <img
                  src={service.src}
                  className="lg:w-[80%]"
                  onClick={changeHandler}
                ></img>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Service;
