import React, { useState } from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import HandLengthImage from "../../assets/images/Price/Group 2237.svg";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import { Link } from "react-router-dom";
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
    switch(selectedLength){
      case 'Elbow':
        price = 253;
        break;
      case 'Wrist':
        price = 252;
        break;
      case 'Palm':
        price = 251;
        break;
    }
    dispatch(setData({ Hands: selectedHands }));
    dispatch(setData({ Length: selectedLength, Price: price }));
    dispatch(print());
  }
  return (
    <div>
      <Homeheader />
      <div className="flex flex-row">
        {/* left */}
        <div>
          <h1>Bridal Mehendi</h1>
          <div>
            <button
              name="Both Hands"
              className={
                SelectedHands === "Both Hands"
                  ? "border-2 border-[#440BB7]"
                  : ""
              }
              onClick={() => HandleHands("Both Hands")}
            >
              Both Hands
            </button>
            <button
              name="Single Hand"
              className={
                SelectedHands === "Single Hand"
                  ? "border-2 border-[#440BB7]"
                  : ""
              }
              onClick={() => HandleHands("Single Hand")}
            >
              Single Hand
            </button>
          </div>
          <img src={HandLengthImage}></img>
        </div>
        {/* right */}
        <div>
          <div
            className={
              SelectedPrice === "Palm" ? "border-2 border-[#440BB7]" : ""
            }
            name="Palm"
            onClick={() => HandleLength("Palm")}
          >
            <p>Palm Length</p>
            <p>₹251</p>
          </div>
          <div
            className={
              SelectedPrice === "Wrist" ? "border-2 border-[#440BB7]" : ""
            }
            name="Wrist"
            onClick={() => HandleLength("Wrist")}
          >
            <p>Wrist Length</p>
            <p>₹252</p>
          </div>
          <div
            className={
              SelectedPrice === "Elbow" ? "border-2 border-[#440BB7]" : ""
            }
            name="Elbow"
            onClick={() => HandleLength("Elbow")}
          >
            <p>Elbow Length</p>
            <p>₹253</p>
          </div>
          <Link to="/time">
            <button onClick={changeHandler}>Book</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Price;
