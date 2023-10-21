import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../Redux/Slices/FormSlice";
import groobeLogo from '../assets/images/groobe logo2.svg'
import QR from '../assets/images/Receipt/QR.svg'

function Receipt() {
  // const formData = useSelector((state) => state.FormData);
  let formData = localStorage.getItem("eventData");
  formData = JSON.parse(formData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    // const selectedSociety = event.target.getAttribute('name');
    // dispatch(setData({ Society: selectedSociety }));
    // dispatch(print()); 
  }
  return (
    <div className='w-full'>
      <img className="flex flex-row ml-[43%]" src={groobeLogo}></img>
      <div className="border-2 border-gray-500 w-max rounded-lg pr-14 pl-14 pt-3 pb-6 mx-[18%]  text-xl mt-2">
        <div className='flex flex-row mb-3'>
          <h1>Name :</h1>
          <h1 className='ml-1'>{formData.Name}</h1>
        </div>
        <div className='flex flex-row mb-3'>
          <h1>Ph. No :</h1>
          <h1 className='ml-1'>{formData.PhoneNumber}</h1>
        </div>
        <div className='flex flex-row mb-3'>
          <h1>Date :</h1>
          <h1 className='ml-1'>{formData.Date}</h1>
        </div>
        <div className='flex flex-ro mb-3w'>
          <h1>Service :</h1>
          <h1 className='ml-1'>{formData.Service}</h1>
        </div>
        <div className='flex flex-row mb-3'>
          <h1>Hands :</h1>
          <h1 className='ml-1'>{formData.Hands}</h1>
        </div>
        <div className='flex flex-row mb-3'>
          <h1>Amount :</h1>
          <h1 className='ml-1'>{formData.Price}</h1>
        </div>
        <div className='flex flex-row mb-3'>
          <h1>Payment :</h1>
          <h1 className='bg-[#9DC9A2] p-1 rounded-md ml-1'>{formData.PayMethod}</h1>
        </div>

        <img src=''></img>
        
        <img className='ml-[10%] mb-3' src={QR}></img>
        <h1 className='mb-3 ml-1 font-bold'>s.no : {formData.bID}</h1>
      </div>
      <div>
        <button className='bg-[#440BB7] rounded-md pl-10 pr-10 pt-2 pb-2 w-1/4 mx-[35%] mb-7 mt-10 text-white' >Download</button>
      </div>
    </div>

  )
}

export default Receipt