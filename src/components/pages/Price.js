import React, { useState } from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import HandLengthImage from "../../assets/images/Price/Group 2237.svg";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import { Link } from "react-router-dom";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Price() {
  const [SelectedPrice, setSelectedPrice] = useState(null);
  const [SelectedHands, setSelectedHands] = useState(null);

  const HandleLength = (name) => {
    setSelectedPrice(name);
  };

  const HandleHands = (name) => {
    setSelectedHands(name);
  };

  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedHands = SelectedHands;
    const selectedLength = SelectedPrice;
    var price = 0;
    switch (selectedLength) {
      case "Elbow":
        price = 253;
        break;
      case "Wrist":
        price = 252;
        break;
      case "Palm":
        price = 251;
        break;
    }
    dispatch(setData({ Hands: selectedHands }));
    dispatch(setData({ Length: selectedLength, Price: price }));
    dispatch(print());
  }
  return (
    <div>
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img src={whatsapp} width="120px" height="70px" className="fixed top-[50vh] right-0"></img>
      </a>
      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" />
      <div className="md:flex md:flex-row  lg:justify-between ">
        {/* left */}
        <div className="shadow-xl border-1 lg:ml-[10%]">
          <h1 className="font-Bell text-2xl font-semibold ml-[10%] mt-[8%] cursor-pointer">Bridal Mehendi</h1>
          <div className="text-xl mt-[8%] ml-[10%] flex justify-between mr-[10%]">
            <button
              name="Both Hands"
              className={ 
                SelectedHands === "Both Hands"
                  ? "bg-[#440BB7] text-white rounded-md lg:w-40 lg:h-10 md:w-40 md:h-10 sm:h-10 sm:p-2 m:h-10 m:p-2"
                  : "bg-[#EFEFEF] text-black rounded-md lg:w-40 lg:h-10 md:w-40 md:h-10 sm:h-10 sm:p-2 m:h-10 m:p-2"
              }
              onClick={() => HandleHands("Both Hands")}
            >
              Both Hands
            </button>
            <button
              name="Single Hand"
              className={
                SelectedHands === "Single Hand"
                ? "bg-[#440BB7] text-white rounded-md lg:w-40 lg:h-10 md:w-40 md:h-10 sm:h-10 sm:p-2 m:h-10 m:p-2"
                : "bg-[#EFEFEF] text-black rounded-md lg:w-40 lg:h-10 md:w-40 md:h-10 sm:h-10 sm:p-2 m:h-10 m:p-2"
              }
              onClick={() => HandleHands("Single Hand")}
            >
              Single Hand
            </button>
          </div>
          <img className="md:w-fit md:h-fit 2md:w-fit md:sm-[10%] " src={HandLengthImage}></img>
        </div>
        {/* right */}
        <div className="shadow-xl border-1 lg:mr-[10%] text-xl">
          <div
            className={
              SelectedPrice === "Palm" 
              ? "border-2 border-[#440BB7] bg-[#EFEFEF] rounded-lg p-3 m-[10%] mt-[18%]" 
              : "bg-[#EFEFEF] rounded-lg p-3 m-[10%] mt-[18%]"
            }
            name="Palm"
            onClick={() => HandleLength("Palm")}
          >
          <div className=" flex justify-between">
            <p className="inline clear-right cursor-pointer">Palm Length</p>
            <p className="inline clear-left">₹251</p>
            </div>
          </div>
          <div
            className={
              SelectedPrice === "Wrist"
              ? "border-2 border-[#440BB7] bg-[#EFEFEF] rounded-lg mt-3 m-[10%] p-3" 
              : "bg-[#EFEFEF] rounded-lg mt-3 m-[10%] p-3"
            }
            name="Wrist"
            onClick={() => HandleLength("Wrist")}
          >
          <div className=" flex justify-between">
            <p className="inline clear-right cursor-pointer">Wrist Length</p>
            <p className="inline clear-left">₹252</p>
          </div>
          </div>
          <div
            className={
              SelectedPrice === "Elbow" 
              ? "border-2 border-[#440BB7] bg-[#EFEFEF] rounded-lg mt-3 m-[10%] p-3" 
              : "bg-[#EFEFEF] rounded-lg mt-3 m-[10%] p-3"
            }
            name="Elbow"
            onClick={() => HandleLength("Elbow")}
          >
          <div className=" flex justify-between">
             <p className="inline clear-right cursor-pointer">Elbow Length</p>
            <p className="inline clear-left">₹252</p>
            </div>
          </div>
          <Link to="/time">
            <button className="bg-[#440BB7] text-white w-72 s:mt-[10%] h-10 rounded-lg m-10" onClick={changeHandler}>BOOK</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Price;