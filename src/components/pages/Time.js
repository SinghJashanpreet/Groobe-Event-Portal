import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import { Link } from "react-router-dom";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Time() {
  const [fName, setFname] = useState("");
  const [phone, setPhone] = useState("");
  var [error, seterror] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const HandleNameChange = (event) => {
    seterror(false);
    setFname(event.target.value);
  };

  const HandlePhoneChange = (event) => {
    seterror(false);
    setPhone(event.target.value);
  };

  const HandleDate = (name) => {
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
    seterror(fName === "" || phone === "" ? true : false);
    const Date = selectedDate;
    const Slot = selectedSlot;
    const ph = phone;
    const name = fName;
    dispatch(setData({ Name: name, PhoneNumber: ph, Date: Date, Slot: Slot }));

    dispatch(print());
  }
  const datesArray = ["28 OCT", "29 OCT", "30 OCT", "31 OCT"];
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
      <img
        src={whatsapp}
        width="120px"
        height="70px"
        className="fixed top-[50vh] right-0"
      ></img>
      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" />
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            value={fName}
            type="text"
            className={error === true ? "border-2 border-red-600" : "border-2"}
            onChange={HandleNameChange}
            required
          />
          <label>Phone Number</label>
          <input
            value={phone}
            type="number"
            className={error === true ? "border-2 border-red-600" : "border-2"}
            onChange={HandlePhoneChange}
            required
          />
        </div>
        <div className="w-[35%]">
          <p>Time and Date</p>
          <div className="border-2 border-black flex flex-row flex-wrap">
            {datesArray.map((date) => (
              <button
                className={
                  selectedDate === date
                    ? "border-2 border-[#440BB7] bg-[#440BB7]"
                    : "border-2 border-[#440BB7]"
                }
                onClick={() => HandleDate(date)}
              >
                {date}
              </button>
            ))}
            <br />
            <br />
            {slotsArray.map((slot) => (
              <buttton
                className={
                  selectedSlot === slot
                    ? "border-2 border-[#440BB7] bg-[#440BB7]"
                    : "border-2 border-[#440BB7]"
                }
                onClick={() => HandleSlot(slot)}
              >
                {slot}
              </buttton>
            ))}
          </div>
          <Link to={fName === "" || phone === "" ? "" : "/confirm"}>
            <button onClick={changeHandler}>Book</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Time;
