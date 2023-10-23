import { useState, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { print, setData } from "../Redux/Slices/FormSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import groobe from "../assets/images/groobe logo2.svg";
import { Link } from "react-router-dom";
import Receipt from "./Receipt";

const PopupContent = ({ onClose }) => {
  const navigate = useNavigate();
  let formData = localStorage.getItem("eventData");
  formData = JSON.parse(formData);
  const dispatch = useDispatch();
  // Initialize an array of isDetailsOpen states, one for each details element
  const [isDetailsOpen, setIsDetailsOpen] = useState(new Array(12).fill(false));
  const [showReceipt, setShowReceipt] = useState(false);

  // Function to toggle the state of a specific details element
  const toggleDetails = (index) => {
    const updatedIsDetailsOpen = [...isDetailsOpen];
    updatedIsDetailsOpen[index] = !updatedIsDetailsOpen[index];
    setIsDetailsOpen(updatedIsDetailsOpen);
  };

  // Function to handle the click on the summary element
  const handleSummaryClick = (index) => {
    toggleDetails(index); // Toggle the details state
  };

  // useEffect(() => {

  //   // Add a scroll event listener to the window
  //   // const handleScroll = () => {
  //   //   // Close the modal when the background is scrolled
  //   //   if (showReceipt === true)
  //   //     dispatch(setData({ showReceipt: false }));

  //   //   onClose();
  //   // };

  //   //if (showReceipt === true) dispatch(setData({ showReceipt: false }));
  //   // if (showReceipt === true) navigate("/")

  //   //window.addEventListener("scroll", handleScroll);

  //   // Remove the scroll event listener when the component unmounts
  //   // return () => {
  //   //   window.removeEventListener("scroll", handleScroll);
  //   // };
  // }, []);

  const HandleMethod = async (event) => {
    try {
      const method = event.target.getAttribute("name");

      // Retrieve the existing data from localStorage, if any
      const existingData = localStorage.getItem("eventData");

      // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
      const eventData = existingData ? JSON.parse(existingData) : {};

      // Add or update the Service and ServiceId properties
      eventData.PayMethod = method;

      // Convert the updated object to a JSON string
      const jsonString = JSON.stringify(eventData);

      // Store the updated JSON string in localStorage
      localStorage.setItem("eventData", jsonString);

      dispatch(setData({ PayMethod: method }));

      // const getBookingData = await fetch("http://localhost:8000/booking");
      // if (getBookingData.ok) {
      //   let Bdata = await getBookingData.json();

      //   const BFilterdata = Bdata.data.filter((a) => {
      //     console.log(a.id, eventData.bID);
      //     return a.id == eventData.bID;
      //   });

      //   console.log(BFilterdata);

      //   const bID = BFilterdata.length === 0 ? undefined : BFilterdata[0].id;

      //   console.log(bID);

      //   eventData.bID = bID;
      //   const jsonString = JSON.stringify(eventData);

      //   // Store the updated JSON string in localStorage
      //   localStorage.setItem("eventData", jsonString);
      //   dispatch(setData({ showReceipt: true }));
      console.log("this is bid tp be updated: ", eventData.bID);
      const data = {
        id: eventData.bID,
        paymentStatus: "UnPaid",
        paymentMode: method,
      };
      const response = await fetch("http://localhost:8000/booking", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      dispatch(print());
      setShowReceipt(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    if (
      eventData.bID != undefined &&
      eventData.PayMethod != undefined &&
      eventData.taskcompleted === true
    ) {
      dispatch(setData({ showReceipt: true }));
      setShowReceipt(true);
    }
  }, []);

  return (
    <div className="relative">
      {!showReceipt ? (
        <>
          {!showReceipt ? (
            <h1 className="sticky top-0 z-10 text-xl 2m:text-2xl md:text-3xl font-inter font-[400] flex justify-center items-center pt-3 pb-5 bg-[#F0F0F0] w-full ">
              <img src={groobe} width="60px"></img>
            </h1>
          ) : (
            <></>
          )}

          <div className="flex flex-col gap-5 mx-[4%] 2m:mx-[7%] md:mx-[7%] overflow-y-scroll no-scrollbar mb-8 text-xl shadow-xl  pr-5 pl-5 rounded-lg">
            <h1
              className="border border-gray-300 pl-5 pt-2 pb-2 mt-5 mb-5 shadow-lg rounded-lg"
              name="Pay After Service"
              onClick={HandleMethod}
            >
              Pay after Service
            </h1>

            <h1
              className="border border-gray-300 pl-5 pt-2 pb-2  mb-5 shadow-lg rounded-lg"
              name="Online"
              onClick={HandleMethod}
            >
              Pay Now
            </h1>
          </div>
        </>
      ) : (
        <Receipt />
      )}
    </div>
  );
};

export default PopupContent;
