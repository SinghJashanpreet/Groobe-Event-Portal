import React from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";

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
      <div className="border-2 border-[#440BB7]">
        <h1>{formData.Name}</h1>
        <h1>{formData.PhoneNumber}</h1>
        <h1>{formData.Date}</h1>
        <h1>{formData.Society}</h1>
      </div>
      <div className="border-2 border-[#440BB7] w-[50%]">
        <h1>Service Selected</h1>
        <div>
          <div className="flex flex-row justify-evenly">
            <h2>{formData.Design}</h2>
            <p>{formData.Price}</p>
          </div>
          <div className="flex flex-row justify-evenly">
            <p>{formData.Length} Length | {formData.Hands}</p>
            <p>{formData.Date}</p>
          </div>
        </div>
        <div className="flex flex-row">
          <h2>Total:</h2>
          <h2>{formData.Price}</h2>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Confirm;
