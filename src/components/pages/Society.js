import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
function Society() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();
// const societyList = [
//   {
//     "society_name":"Suncity Parikarma",
//     "id":0
//   },
//   {
//     "society_name":"Homeland",
//     "id":1
//   },
//   {
//     "society_name":"GBP Sunview",
//     "id":2
//   },
//   {
//     "society_name":"GMS-31",
//     "id":3
//   },
//   {
//     "society_name":"Mona City Homes",
//     "id":4
//   }
//   ,{
//     "society_name":"La Casa",
//     "id":5
//   }
// ];
  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedSociety = event.target.getAttribute('name');
    dispatch(setData({ Society: selectedSociety }));
    dispatch(print()); 
  }

  return (
    <div className="justify-start items-center 2xl:mt-12 2xl:ml-80 2xl:mr-80 xl:mt-12 xl:ml-60 xl:mr-60 lg:mt-12 lg:ml-32 lg:mr-32 md:mt-6 md:ml-10 md:mr-10 sm:mt-6 sm:ml-4 sm:mr-4">
      {/* {dispatch(print())} */}
      <h1 className="text-purple-700 font-[600] font-inter text-3xl">Choose Your Society</h1>
      <div className="flex lg:flex-row md:flex-col justify-between ">
      <div className="flex flex-col lg:w-96 w-[100%]">
        <Link to="/service">
          <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="JLPL1" onClick={changeHandler}>Suncity Parikarma</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="JLPL2" onClick={changeHandler}>Homeland</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="JLPL3" onClick={changeHandler}>GBP Sunview</div>
        </Link>
        </div>
        <div className="flex flex-col lg:w-96 w-[100%] ">
        <Link to="/service">
          <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="JLPL4" onClick={changeHandler}>GMS-31</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="JLPL5" onClick={changeHandler}>Mona City Homes</div>
        </Link>
      </div>
      </div>
      <div className="m-8"></div>
    </div>
  
  );
}

export default Society;
