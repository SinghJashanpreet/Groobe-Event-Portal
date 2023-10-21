import React, { useState, useEffect } from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import HandLengthImage from "../../assets/images/Price/Group 2237.svg";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Price() {
  const localData = JSON.parse(localStorage.getItem("eventData"));
  const [SelectedPrice, setSelectedPrice] = useState(localData.Length || null);
  const [SelectedHands, setSelectedHands] = useState(localData.Hands ||null);
  const [price, setPrice] = useState(localData.Price ||null);
  const [PriceApiData, setPriceApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/pricing", {
          method: "GET",
          headers: {
            usertype: "user",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("price Data fetched", data);
          setPriceApiData(data.data);
          setLoading(false);
        } else {
          console.log("Request failed with status: " + response.status);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData(); // Call the async function immediately

    // You can include dependencies if needed, like [someId]
  }, []); // Pass an empty array if no dependencies are needed

  const HandleLength = (elm) => {
    setSelectedPrice(elm.name);
    setPrice(elm.price);
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
    const selectp = price;

     // Retrieve the existing data from localStorage, if any
     const existingData = localStorage.getItem("eventData");

     // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
     const eventData = existingData ? JSON.parse(existingData) : {};
 
     // Add or update the Service and ServiceId properties
     eventData.Hands = selectedHands;
     eventData.Length = selectedLength;
     eventData.Price = selectp;
 
     // Convert the updated object to a JSON string
     const jsonString = JSON.stringify(eventData);
 
     // Store the updated JSON string in localStorage
     localStorage.setItem("eventData", jsonString);

    dispatch(setData({ Hands: selectedHands }));
    dispatch(setData({ Length: selectedLength, Price: selectp }));
    dispatch(print());
  }

  return (
    <div>
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img
          src={whatsapp}
          width="120px"
          height="70px"
          className="fixed top-[50vh] right-0"
        ></img>
      </a>
      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" />
      <div className="md:flex md:flex-row  lg:justify-between ">
        {/* left */}
        <div className="border border-black ml-[10%]">
          <h1 className="font-Bell text-2xl ml-[10%] mt-[8%]">
            Bridal Mehendi
          </h1>
          <div className="text-xl mt-[8%] ml-[10%] flex justify-between mr-[10%]">
            <button
              name="Both Hands"
              className={
                SelectedHands === "Both Hands"
                  ? "bg-[#440BB7] text-white rounded-md lg:w-40 lg:h-10 md:w-40 md:h-10 sm:h-10 sm:p-2 m:h-10 m:pt-1 lg:p-1 p-1"
                  : "bg-[#EFEFEF] text-black rounded-md lg:w-40 lg:h-10 md:w-40 md:h-10 sm:h-10 sm:p-2 m:h-10 m:pt-1 lg:p-1 p-1"
              }
              onClick={() => HandleHands("Both Hands")}
            >
              Both Hands
            </button>
            <button
              name="Single Hand"
              className={
                SelectedHands === "Single Hand"
                ? "bg-[#440BB7] text-white rounded-md lg:w-40 lg:h-10 md:w-40 md:h-10 sm:h-10 sm:p-2 m:h-10 m:pt-1 lg:p-1 p-1"
                : "bg-[#EFEFEF] text-black rounded-md lg:w-40 lg:h-10 md:w-40 md:h-10 sm:h-10 sm:p-2 m:h-10 m:pt-1 lg:p-1 p-1"
              }
              onClick={() => HandleHands("Single Hand")}
            >
              Single Hand
            </button>
          </div>
          <img className="md:w-fit md:h-fit 2md:w-fit md:sm-[10%] " src={HandLengthImage}></img>
        </div>
        {/* right */}
        <div className="border border-black mr-[10%] text-xl">
          {loading === true ? (
            <div className="relative top-[50%] left-[50%]">
              <RingLoader color="#7E22CE" size={50} />
            </div>
          ) : (
            PriceApiData.map((elm) => {
              return (
                <div
                  className={
                    SelectedPrice === elm.name
                      ? "border-2 border-[#440BB7] bg-[#EFEFEF] rounded-lg p-3 m-[10%] mt-[18%]"
                      : "bg-[#EFEFEF] rounded-lg p-3 m-[10%] mt-[18%]"
                  }
                  name={elm.name}
                  onClick={() => HandleLength(elm)}
                >
                  <div className=" flex justify-between">
                    <p className="inline clear-right">{elm.name} </p>
                    <p className="inline clear-left">{elm.price}</p>
                  </div>
                </div>
              );
            })
          )}

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
