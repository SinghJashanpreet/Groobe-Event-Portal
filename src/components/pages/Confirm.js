import { React } from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from "../../assets/images/Frame 2219.svg";
import { useState } from "react";
import PopupContent from "../PopupContent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { faPhone } from '@fortawesome/free-solid-svg-icons'; 
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; 


function Confirm() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    console.log(isModalOpen)
    setModalOpen(!isModalOpen);
  };
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  return (
    <>
      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" />
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img src={whatsapp} width="120px" height="70px" className="fixed top-[50vh] right-0"></img>
      </a>
      <div className="flex flex-row justify-evenly">
        <div className="border-2  shadow-xl border-1 p-10 rounded-lg">
        <h1 className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faUser} /> 
        {formData.Name}
      </h1>
          <h1 className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faPhone} />
        {formData.PhoneNumber}
        </h1>
          <h1 className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faCalendar} />
        {formData.Date}
        </h1>
          <h1 className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faLocationDot} />
        {formData.Society}
        </h1>
        </div>
        <div className="border-2 border-[#440BB7] w-[50%]">
          <h1>Service Selected</h1>
          <div>
            <div className="flex flex-row justify-evenly">
              <h2>{formData.Design}</h2>
              <p>{formData.Price}</p>
            </div>
            <div className="flex flex-row justify-evenly">
              <p>
                {formData.Length} Length | {formData.Hands}
              </p>
              <p>{formData.Date}</p>
            </div>
          </div>
          <div className="flex flex-row">
            <h2>Total:</h2>
            <h2>{formData.Price}</h2>
          </div>
        </div>
      </div>
      <button onClick={() => toggleModal()}>Confirm and Pay</button>
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
      <Footer />
    </>
  );
}

export default Confirm;
