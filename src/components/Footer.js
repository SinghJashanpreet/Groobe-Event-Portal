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
import FooterMobile from "./FooterMobile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom/dist";
// import PopupContent from "../PopUpContent";
function Footer() {
  //   const [isModalOpen, setModalOpen] = useState(false);

  //   const toggleModal = () => {
  //     setModalOpen(!isModalOpen);
  //   };

  const [mobileview, setMobileview] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 781px)");
    const handleScreenSizeChange = (e) => {
      setMobileview(e.matches);
    };
    setMobileview(mediaQuery.matches);
    mediaQuery.addListener(handleScreenSizeChange);

    return () => {
      mediaQuery.removeListener(handleScreenSizeChange);
    };
  }, []);

  return mobileview ? (
    <>
      <div className="grid grid-cols-[_3fr_2fr_2fr_3fr] place-items-center bg-[#F9F5FF] shadow-footer-shadow">
        {/* 1st col */}
        <div className="grid-rows-2 my-7">
          <div className="flex flex-row justify-center items-center gap-2">
            <img src={logo} height="70px" width="75px" className=""></img>
            <div className="flex flex-col justify-center items-start ">
              <p className="text-2xl mx-1 ">GrooBe</p>
              <p className="font-inter font-[400] text-sm">
                "Get the look you love"
              </p>
            </div>
          </div>
          <hr className="border-[1.3px] border-[#000000] my-4" />
          <div className="grid grid-cols-5 ">
            <span>
              <img src={whatsapp} height="32px" width="32px"></img>
            </span>
            <span>
              <img src={instagram} height="32px" width="32px"></img>
            </span>
            <span>
              <img src={facebook} height="32px" width="32px"></img>
            </span>
            <span>
              <img src={youtube} height="34px" width="34px"></img>
            </span>
            <span>
              <img src={linkedin} height="32px" width="32px"></img>
            </span>
          </div>
        </div>
        {/* 2nd col */}
        <div className="grid-cols-2 mt-5 place-self-center">
          <div className="mb-4 mt-2 font-bold text-start ml-5 font-inter">
            Contact
          </div>
          <div className="flex flex-col justify-start items-start ml-3 font-roboto text-xs">
            <Link to="/contact">
              <div className="mb-4">
                <img
                  src={phone}
                  width="16px"
                  height="16px"
                  className="inline mx-2"
                ></img>
                <span className="text-center">(436)555-0120</span>
              </div>
            </Link>
          </div>
        </div>
        {/* 3rd col */}
        <div className="grid-cols-1 mt-5 place-self-center">
          <div className="flex flex-col justify-start items-start ml-4 font-roboto text-xs">
            <Link to="/services">
              <div className="mb-4 mt-8">
                <img
                  src={email}
                  width="19px"
                  height="19px"
                  className="inline mx-2"
                ></img>
                <span>support@groobe.in</span>
              </div>
            </Link>
          </div>
        </div>
        {/* 4th col */}
        <div className="grid-cols-4 mt-5 place-self-center">
          <div className="mt-8 flex flex-row justify-start items-center mb-4 font-roboto text-xs">
            <img
              src={location}
              width="13px"
              height="13px"
              className="inline mr-2"
            ></img>
            <span className="">Floor 1, ACIC RISE, CGC Landran</span>
          </div>
        </div>

        {/* <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Popup Modal"
          className="popup-modal overflow-y-scroll no-scrollbar"
          overlayClassName="popup-overlay"
          shouldCloseOnOverlayClick={true} // Close on background click
          shouldCloseOnEsc={true} // Close on pressing the Escape key
        >
          <PopupContent onClose={toggleModal} />
        </Modal> */}

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
        )}*/}
      </div>
    </>
  ) : (
    <FooterMobile/>
  );
}

export default Footer;
