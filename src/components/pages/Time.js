import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import { Link } from "react-router-dom";

function Time() {
  const [fName, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const HandleNameChange = (event) => {
    setFname(event.target.value);
  };

  const HandlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const HandleDate = (name) => {
    console.log(name);
    setSelectedDate(name);
  };
  const HandleSlot = (name) => {
    setSelectedSlot(name);
  };

  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const Date = selectedDate;
    const Slot = selectedSlot;
    const ph = phone;
    const name = fName;
    dispatch(setData({ Name: name, PhoneNumber: ph, Date: Date, Slot: Slot }));

    dispatch(print());
  }
  const datesArray = ["28 Oct", "29 Oct", "30 Oct", "31 Oct"];
  const slotsArray = [
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 pm",
    "12:30 pm",
    "1:00 pm",
    "1:30 pm",
    "2:30 pm",
    "3:00 pm",
  ];
  return (
    <div>
      <Homeheader />
      <div className="flex flex-row justify-evenly ">
        <div className="flex flex-col shadow-xl border-1 p-10 rounded-lg">
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            value={fName}
            type="text"
            className="focus:border-[#440BB7] focus:text-blue-800 border border-black rounded-md mt-2 p-3 text-black "
            onChange={HandleNameChange}
          />
          </div>
          <div className="flex flex-col mt-6">
          <label>Phone Number</label>
          <input
            value={phone}
            type="number"
            className="focus:border-[#440BB7] focus:text-blue-800 border border-black rounded-md mt-2 p-3 text-black "
            onChange={HandlePhoneChange}
          />
          </div>
        </div>
        <div className="w-1/2  shadow-xl border-1 p-10 rounded-lg">
          <p>Time and Date</p>
          <div className="w-auto border border-black grid grid-cols-4 rounded-md p-1 mt-2">
            {datesArray.map((date) => (
              <button
                className={
                  selectedDate === date
                    ? "border border-[#440BB7] bg-[#440BB7] text-white rounded-md m-3 p-3"
                    : "border border-black rounded-md m-3 p-3"
                }
                onClick={() => HandleDate(date)}
              >
                {date}
              </button>
            ))}
          
            {slotsArray.map((slot) => (
              <buttton
                className={
                  selectedSlot === slot
                    ? "border border-[#440BB7] bg-[#440BB7] text-white rounded-md m-3 p-3 2lg:pl-9 2md:pl-3 md:pl-1"
                    : "border border-black rounded-md 2lg:pl-9 2md:pl-3 md:pl-1 m-3 p-1"
                }
                onClick={() => HandleSlot(slot)}
              >
                {slot}
              </buttton>
            ))}
          </div>
          <Link to='/confirm'>
          <button className="w-[80%] bg-[#440BB7] rounded-lg text-white p-3 mt-[7%] ml-[10%] "  onClick={changeHandler}>Book</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Time;
