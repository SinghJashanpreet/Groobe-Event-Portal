import { useState, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../Redux/Slices/FormSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import groobe from '../assets/images/groobe logo2.svg'
import { Link } from "react-router-dom";
const PopupContent = ({ onClose }) => {
  const dispatch = useDispatch();
  // Initialize an array of isDetailsOpen states, one for each details element
  const [isDetailsOpen, setIsDetailsOpen] = useState(new Array(12).fill(false));

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

  useEffect(() => {
    // Add a scroll event listener to the window
    const handleScroll = () => {
      // Close the modal when the background is scrolled
      onClose();
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);



  const HandleMethod = (event) => {
    const method = event.target.getAttribute("name");
    dispatch(setData({ PayMethod: method }));
    dispatch(print());
  }

  return (
    <div className="relative">
      <h1 className="sticky top-0 z-10 text-xl 2m:text-2xl md:text-3xl font-inter font-[400] flex justify-center items-center pt-3 pb-5 bg-[#F0F0F0] w-full">
        <img src={groobe} width='60px'></img>
      </h1>

      <div className="flex flex-col gap-5 mx-[4%] 2m:mx-[7%] md:mx-[7%] overflow-y-scroll no-scrollbar mb-8 ">
        <Link to='/receipt'>
          <h1 name="Pay After Service" onClick={HandleMethod}>Pay after Service</h1>
        </Link>
        <Link to='/receipt'>
          <h1 name="Online" onClick={HandleMethod}>Pay Now</h1>
        </Link>
      </div>
    </div>
  );
};

export default PopupContent;
