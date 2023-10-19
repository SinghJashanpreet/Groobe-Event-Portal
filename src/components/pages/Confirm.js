import { React } from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import henna from "../../assets/images/henna.svg";
import nail from "../../assets/images/nail.png";

import whatsapp from "../../assets/images/Frame 2219.svg";
import { useState } from "react";
import PopupContent from "../PopupContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

function Confirm() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reCAPTCHALoaded, setReCAPTCHALoaded] = useState(false);
  const [verf, setVerf] = useState(false);
  // ...

  // Define a function to handle reCAPTCHA verification
  const handleRecaptchaVerification = (token) => {
    // The token parameter contains the reCAPTCHA response token.
    // You can proceed with form submission or any other action here.
    setVerf(true);
    console.log("reCAPTCHA verification successful. Token: ", token);
  };

  const toggleModal = async () => {
    try {
      setReCAPTCHALoaded(true);
      const data = {
        sid: formData.SocietyId,
        time: formData.Slot,
        date: formData.Date,
        location: formData.Society,
        name: formData.Name,
        mobile: formData.PhoneNumber,
        paymentStatus: "UnPaid",
        bookedServices: formData.ServiceId,
        paymentMode: "Unverified",
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
      setModalOpen(!isModalOpen);
    } catch (e) {
      console.log(e);
    }
  };
  // const formData = useSelector((state) => state.FormData);
  let formData = localStorage.getItem("eventData");
  formData = JSON.parse(formData);
  console.log(formData)
  const dispatch = useDispatch();

  return (
    <>
      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" />
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img
          src={whatsapp}
          width="120px"
          height="70px"
          className="fixed top-[50vh] right-0"
        ></img>
      </a>
      <div className="flex flex-row justify-evenly">
        <div className="border-2  shadow-xl border-1 p-10 rounded-lg">
          <h1 className="flex items-center p-3 text-xl">
            <FontAwesomeIcon className="mr-3 w-[6%] h-[6%]" icon={faUser} />
            {formData.Name}
          </h1>
          <h1 className="flex items-center p-3 text-xl">
            <FontAwesomeIcon className="mr-3 w-[6%] h-[6%]" icon={faPhone} />
            {formData.PhoneNumber}
          </h1>
          <h1 className="flex items-center p-3 text-xl">
            <FontAwesomeIcon className="mr-3 w-[6%] h-[6%]" icon={faCalendar} />
            <h1>{formData.Date}</h1>
            <h1 className="ml-3">{formData.Slot}</h1>
          </h1>
          <h1 className="flex items-center p-3 text-xl">
            <FontAwesomeIcon
              className="mr-3 w-[6%] h-[6%]"
              icon={faLocationDot}
            />
            {formData.Society}
          </h1>
        </div>
        <div className="shadow-xl border-1 p-5 rounded-lg w-[40%]">
          <h1 className="text-xl font-bold m-10">Service Selected</h1>
          <div>
            <div className="flex flex-row justify-evenly">
              <div className="flex flex-row justify-evenly">
                {formData.Service === "Nail Art" ? (
                  <img src={nail} className="w-14 h-14"></img>
                ) : (
                  <img src={henna} className="w-14 h-14"></img>
                )}
                <div className="flex flex-col justify-evenly">
                  <h2 className="flex items-center text-xl">
                    {formData.Design}
                  </h2>
                  <p>
                    {formData.Length} | {formData.Hands}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-evenly">
                <h2 className="flex items-center text-xl">
                  <p className="inline clear-left text-xl font-bold">
                    {formData.Price}
                  </p>
                </h2>
                <p>
                  {formData.Date} | {formData.Slot}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row border border-x-2 -black justify-between mt-[5%] ">
            <h2 className="text-xl font-bold flex ml-[15%]">Total:</h2>
            <h2 className="flex text-xl font-bold  mr-[15%] text-green-500">
              {formData.Price}
            </h2>
          </div>
        </div>
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
      </div>
      <div classname="border-2 border-black rounded-lg w-[80%] h-10 text-white">
        <button
          className="bg-[#440BB7] text-white rounded-md pl-10 pr-10 pt-3 pb-3 ml-[30%] mt-10 mb-10 w-2/4"
          onClick={() => toggleModal()}
        >
          Confirm and Pay
        </button>
        {reCAPTCHALoaded && (
          <GoogleReCaptchaProvider reCaptchaKey="6LcAULIoAAAAAJkfN4QY1ANNk9zxbM5_-1jjTXWU">
            <GoogleReCaptcha onVerify={handleRecaptchaVerification} />
          </GoogleReCaptchaProvider>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Confirm;
