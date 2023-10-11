import React from "react";
import Modal from "react-modal";
import whatsapp from "../assets/images/whatsapp.svg";
import instagram from "../assets/images/instagram.svg";
import facebook from "../assets/images/facebook.svg";
import youtube from "../assets/images/youtube.svg";
import linkedin from "../assets/images/linkedin.svg";
import phone from "../assets/images/Vector.svg";
import email from "../assets/images/dashicons_email.svg";
import location from "../assets/images/Vector (1).svg";
import logo from "../assets/images/groobe logo2.svg";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom/dist";
// import PopupContent from "./PopUpContent";

function FooterMobile() {
//   const [isModalOpen, setModalOpen] = useState(false);

//   const toggleModal = () => {
//     setModalOpen(!isModalOpen);
//   };

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Popup Modal"
          className="popup-modal overflow-y-scroll no-scrollbar"
          overlayClassName="popup-overlay"
          shouldCloseOnOverlayClick={true} // Close on background click
          shouldCloseOnEsc={true} // Close on pressing the Escape key
        >
          <PopupContent onClose={toggleModal} />
        </Modal>
      </div> */}

      <div className="grid grid-rows-[_2fr_1fr_1fr_1fr] sm:grid-rows-[_2fr_1fr_1fr_1.3fr] place-items-center bg-[#F9F5FF] shadow-footer-shadow">
        {/* 1st col */}
        <div className="grid-rows-2 my-7">
          <div className="flex flex-row justify-center items-center">
            <img src={logo} height="70px" width="75px" className=""></img>
            <div className="flex flex-col justify-center items-start">
              <p className="text-2xl mx-1">GrooBe</p>
              <p>"Get the look you love"</p>
            </div>
          </div>
          <hr className="border-[1.3px] border-gray-400 my-4" />
          <div className="grid grid-cols-5">
            <span>
              <img src={whatsapp} height="38px" width="38px"></img>
            </span>
            <span>
              <img src={instagram} height="38px" width="38px"></img>
            </span>
            <span>
              <img src={facebook} height="38px" width="38px"></img>
            </span>
            <span>
              <img src={youtube} height="38px" width="38px"></img>
            </span>
            <span>
              <img src={linkedin} height="38px" width="38px"></img>
            </span>
          </div>
        </div>
        {/* 2nd col */}
        <div className="grid-cols-2">
          <div className="mb-6 mt-2 font-bold text-center">Contact</div>
          <div className="flex flex-col justify-center items-center">  
            <Link to="/contact">
            <div className="flex flex-row justify-center items-center mb-4">
            <img
              src={phone}
              width="14.5px"
              height="14.5px"
              className="inline mx-4"
            ></img>
            <span>(436)555-0120</span>
          </div>
            </Link>
          </div>
        </div>
        {/* 3rd col */}
        <div className="grid-cols-1 place-self-center">
        <div className="flex flex-row justify-center items-center mb-4">
            <img
              src={email}
              width="14.5px"
              height="14.5px"
              className="inline mx-4"
            ></img>
            <span>support@groobe.in</span>
          </div>
        </div>
        {/* 4th col */}
        <div className="grid-cols-1 place-self-center mt-[-12%]"> 
          <div className="flex flex-row justify-center items-center mb-4">
            <img
              src={location}
              width="14.5px"
              height="14.5px"
              className="inline mx-4"
            ></img>
            <span>Floor 1, ACIC RISE, CGC Landran</span>
          </div>
        </div>
        {/* <div grid-cols-2>
          <div>Social Media</div>
          <div className='flex flex-row'>
            <img src='?'></img>
            <img src='?'></img>
            <img src='?'></img>
            <img src='?'></img>
          </div>
        </div> */}
        {/* {isModalOpen && (
          <button
            onClick={toggleModal}
            className="closeButton2"
            style={{
              position: "fixed",
              backgroundColor: "white",
              zIndex: "10002", // Increase the z-index value
              borderRadius: "100%",
              height: "28px",
              width: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        )} */}
      </div>
    </>
  );
}

export default FooterMobile;
