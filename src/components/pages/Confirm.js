import { React, useEffect } from "react";
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
import { useNavigate } from "react-router";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { ToastContainer, toast } from "react-toastify";

function Confirm() {
  const Navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [reCAPTCHALoaded, setReCAPTCHALoaded] = useState(false);
  const [verf, setVerf] = useState(false);
  const [loading, setLoading] = useState(true);
  // ...

  const formData2 = useSelector((state) => state.FormData);
  let formData = localStorage.getItem("eventData");
  formData = JSON.parse(formData);
  //console.log(formData);
  const dispatch = useDispatch();

  // Define a function to handle reCAPTCHA verification
  const handleRecaptchaVerification = (token) => {
    // The token parameter contains the reCAPTCHA response token.
    // You can proceed with form submission or any other action here.
    //setVerf(true);
    setLoading(false);
    //console.group("reCAPTCHA verification successful. Token: ", token);
  };

  const toggleModal = async () => {
    try {
      if (isModalOpen === true) {
        console.log("trying to close", isModalOpen)
        if(formData.taskcompleted === true){
          setModalOpen(true);
          return;
        }
        else{
          setModalOpen(!isModalOpen);
          return;
        }
      }

      setReCAPTCHALoaded(true);

      // const getBookingData = await fetch("http://localhost:8000/booking");
      // if (getBookingData.ok || getBookingData.status == 500) {
      //   let Bdata = await getBookingData.json();
      //   if (
      //     Bdata.message !== "Cannot read properties of null (reading 'list')"
      //   ) {
      //     const BFilterdata = Bdata.data.filter((a) => {
      //       return a.mobile == formData.PhoneNumber;
      //     });

      //     const bID = BFilterdata.length === 0 ? undefined : BFilterdata[0].id;

      //     if (bID !== undefined && FormData.PayMethod != undefined) {
      //       toast("Mobile Number Already Exists!");
      //       return;
      //     }

      //     formData.bID = bID;
      //     const jsonString = JSON.stringify(formData);
      //     console.log("bid from with id if: ", bID);

      //     // Store the updated JSON string in localStorage
      //     localStorage.setItem("eventData", jsonString);
      //   }
      //   // const data = {
      //   //   id: bID,
      //   //   sid: formData.SocietyId,
      //   //   time: formData.Slot,
      //   //   date: formData.Date,
      //   //   location: formData.Society,
      //   //   name: formData.Name,
      //   //   mobile: formData.PhoneNumber,
      //   //   paymentStatus: "UnPaid",
      //   //   bookedServices: formData.ServiceId,
      //   //   paymentMode: "Unverified",
      //   // };
      //   // const response = await fetch("http://localhost:8000/booking", {
      //   //   method: "POST",
      //   //   body: JSON.stringify(data),
      //   //   headers: {
      //   //     "Content-Type": "application/json",
      //   //   },
      //   // });
      //   // const result = await response.json();
      //   // if (response.ok) {
      //   //   formData.bID = result.Data[0].id;
      //   //   const jsonStri = JSON.stringify(formData);
      //   //   localStorage.setItem("eventData", jsonStri);
      //   // }
      //   // console.log(result);

      //   // Store the updated JSON string in localStorage
      //   const data = {
      //     id: formData.bID,
      //     sid: formData.SocietyId,
      //     time: formData.Slot,
      //     date: formData.Date,
      //     location: formData.Society,
      //     name: formData.Name,
      //     mobile: formData.PhoneNumber,
      //     paymentStatus: "UnPaid",
      //     bookedServices: formData.ServiceId,
      //     paymentMode: "Unverified",
      //   };
      //   const response = await fetch("http://localhost:8000/booking", {
      //     method: "POST",
      //     body: JSON.stringify(data),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const result = await response.json();
      //   const d = result.Data;
      //   const idArray = d.filter((a) => a.mobile === formData.PhoneNumber);
      //   console.log("resilt: ", idArray);

      //   formData.bID = idArray[0].id;
      //   console.log("bid from wthout id resoine: ", idArray[0].id);
      //   const jsonStri = JSON.stringify(formData);

      //   // Store the updated JSON string in localStorage
      //   localStorage.setItem("eventData", jsonStri);
      //   //console.log(result);

      // } else {
        //   console.log("Request failed with status: " + getBookingData.status);
        // }
        setModalOpen(!isModalOpen);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    if (eventData.bID != undefined) setModalOpen(!isModalOpen);
  }, []);

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
      <ToastContainer />
      <div className="md:flex md:flex-row justify-evenly mt-[-8%]">
        <div className="border-2  shadow-xl border-1 p-8 rounded-lg bg-white">
          <h1 className="flex items-center p-3 text-xl">
            <FontAwesomeIcon className="mr-3 w-[4%] h-[4%]" icon={faUser} />
            {formData.Name}
          </h1>
          <h1 className="flex items-center p-3 text-xl">
            <FontAwesomeIcon className="mr-3 w-[4%] h-[4%]" icon={faPhone} />
            {formData.PhoneNumber}
          </h1>
          <h1 className="flex items-center p-3 text-xl">
            <FontAwesomeIcon className="mr-3 w-[4%] h-[4%]" icon={faCalendar} />
            <h1>{formData.Date}</h1>
            <h1 className="ml-3">{formData.Slot}</h1>
          </h1>
          <h1 className="flex items-center p-3 text-xl">
            <FontAwesomeIcon
              className="mr-3 w-[4%] h-[4%]"
              icon={faLocationDot}
            />
            {formData.Society}
          </h1>
        </div>
        <div className=" shadow-lg border-1 p-5 rounded-lg bg-white">
          <h1 className="text-xl font-bold m-7 s:ml-0 ">Service Selected</h1>
          <div>
            <div className="flex flex-row justify-evenly">
              <div className="flex flex-row justify-evenly">
                {formData.Service === "Nail Art" ? (
                  <img src={nail} className="w-14 h-14"></img>
                ) : (
                  <img src={henna} className="w-14 h-14"></img>
                )}
                {/* <img src={nail} className="w-14 h-14"></img> */}

                <div className="flex flex-col justify-evenly">
                  <h2 className="flex items-center text-xl py-1">
                    {formData.Design}
                  </h2>
                  <p>
                    {formData.Length} | {formData.Hands}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-evenly ml-5 ">
                <h2 className="flex items-center text-xl">
                  <p className="inline clear-left text-xl font-bold py-1">
                    {formData.Price}
                  </p>
                </h2>
                <p classname="gap-x-3">
                  {formData.Date} | {formData.Slot}
                </p>
              </div>
            </div>
          </div>
          <div className="my-4 bg-gray-800 h-[0.5%] w-[100%]"></div>
          <div className="flex flex-row  justify-between mt-[5%] ">
            <h2 className="text-xl font-bold flex ml-[15%]">Total:</h2>
            <h2 className="flex text-xl font-bold  mr-[15%] text-green-500">
              {formData.Price}
            </h2>
          </div>
        </div>

        {/* {console.log(formData2.showReceipt)} */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Popup Modal"
          className={
            formData2.showReceipt
              ? "popup-modal2 overflow-y-scroll no-scrollbar"
              : "popup-modal overflow-y-scroll no-scrollbar"
          }
          overlayClassName="popup-overlay"
          shouldCloseOnOverlayClick={true} // Close on background click
          shouldCloseOnEsc={true} // Close on pressing the Escape key
        >
          <PopupContent onClose={toggleModal} />
        </Modal>
      </div>
      <div classname="border-2 border-black rounded-lg w-[80%] h-10 text-white">
        <button
          className="bg-[#440BB7] text-white rounded-md pl-10 pr-10 pt-3 pb-3 ml-[25%] mt-10 mb-10 w-2/4"
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
