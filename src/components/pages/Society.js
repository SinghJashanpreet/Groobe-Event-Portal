import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from '../../assets/images/Frame 2219.svg'
function Society() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();
 
  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedSociety = event.target.getAttribute('name');
    dispatch(setData({ Society: selectedSociety }));
    dispatch(print());
    dispatch(print());
  }

  return (
    <div className="justify-start items-center 2xl:mt-12 2xl:ml-80 2xl:mr-80 xl:mt-12 xl:ml-60 xl:mr-60 lg:mt-12 lg:ml-32 lg:mr-32 md:mt-6 md:ml-10 md:mr-10 sm:mt-6 sm:ml-4 sm:mr-4 m:ml-2 m:mr-2 s:ml-1.5 s:mr-1.5">
      {/* {dispatch(print())} */}
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img src={whatsapp} width="120px" height="70px" className="fixed top-[50vh] right-0"></img>
      </a>
      <h1 className="text-purple-700 font-[600] font-inter text-3xl m:ml-2 m:mr-2 m:mt-2 ">Choose Your Society</h1>

      <div className="flex lg:flex-row flex-col justify-between ">

        <div className="flex flex-col lg:w-96 w-[100%]">
          <Link to="/service">
            <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="Suncity Parikarma" onClick={changeHandler}>Suncity Parikarma</div>
          </Link>
          <Link to="/service">
            <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="Homeland" onClick={changeHandler}>Homeland</div>
          </Link>
          <Link to="/service">
            <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="GBP Sunview" onClick={changeHandler}>GBP Sunview</div>
          </Link>
        </div>
        <div className="flex flex-col lg:w-96 w-[100%] ">
        <Link to="/service">
          <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="GMS-31" onClick={changeHandler}>GMS-31</div>
        </Link>
        <Link to="/service">
          <div className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl" name="Mona City Homes" onClick={changeHandler}>Mona City Homes</div>
        </Link>
      </div>
      </div>
      <div className="m-8"></div>
    </div>
  
  );
}

export default Society;