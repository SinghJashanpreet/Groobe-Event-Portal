import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import henna from '../../assets/images/henna.svg' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; 
import { faPhone } from '@fortawesome/free-solid-svg-icons'; 
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; 


function Confirm() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  // function changeHandler(event) {
  //   // const { name, value, checked, type } = event.target;
  //   const Date = selectedDate;
  //   const Slot = selectedSlot;
  //   const ph = phone;
  //   const name = fName;
  //   dispatch(setData({ Name: name, PhoneNumber: ph, Date: Date, Slot: Slot }));

  //   dispatch(print());
  // }
  return (
    <>
    {console.log(formData)}
    <Homeheader/>
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
        <FontAwesomeIcon className="mr-3 w-[6%] h-[6%]" icon={faLocationDot} />
        {formData.Society}
        </h1>
      </div>
      <div className="shadow-xl border-1 p-5 rounded-lg w-[40%]">
        <h1 className="text-xl font-bold m-10">Service Selected</h1>
        <div>
        <div  className="flex flex-row justify-evenly">
        <div className="flex flex-row justify-evenly">
        <img src={henna} className="w-14 h-14"></img>
        <div  className="flex flex-col justify-evenly">
        <h2 className="flex items-center text-xl">
        {formData.Design}
        </h2>
        <p>{formData.Length} Length | {formData.Hands}</p>
        </div>
        </div>
        <div className="flex flex-col justify-evenly">
            <h2 className="flex items-center text-xl">
            <p className="inline clear-left text-xl font-bold">{formData.Price}</p>
            </h2>
            <p>{formData.Date} | {formData.Slot}</p>
          </div>
        </div>
        </div>
        <div className="flex flex-row border border-x-2 -black justify-between mt-[5%] ">
          <h2 className="text-xl font-bold flex ml-[15%]">Total:</h2>
          <h2 className="flex text-xl font-bold  mr-[15%] text-green-500">{formData.Price}</h2>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Confirm;
