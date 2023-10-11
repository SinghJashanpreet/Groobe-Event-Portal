import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../Redux/Slices/FormSlice";
import groobeLogo from '../assets/images/groobe logo2.svg'
import QR from '../assets/images/Receipt/QR.svg'

function Receipt() {
  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    // const selectedSociety = event.target.getAttribute('name');
    // dispatch(setData({ Society: selectedSociety }));
    // dispatch(print()); 
  }
  return (
    <div>
      <img src={groobeLogo}></img>
      <div className='border-2 border-black w-max'>
        <div className='flex flex-row'>
          <h1>Name:  </h1>
          <h1>{formData.Name}</h1>
        </div>
        <div className='flex flex-row'>
          <h1>Ph. No: </h1>
          <h1>{formData.PhoneNumber}</h1>
        </div>
        <div className='flex flex-row'>
          <h1>Date: </h1>
          <h1>{formData.Date}</h1>
        </div>
        <div className='flex flex-row'>
          <h1>Service: </h1>
          <h1>{formData.Service}</h1>
        </div>
        <div className='flex flex-row'>
          <h1>Hands: </h1>
          <h1>{formData.Hands}</h1>
        </div>
        <div className='flex flex-row'>
          <h1>Amount:</h1>
          <h1>{formData.Price}</h1>
        </div>
        <div className='flex flex-row'>
          <h1>Payment:</h1>
          <h1 className='bg-[#9DC9A2]'>{formData.PayMethod}</h1>
        </div>

        <img src=''></img>
        <h1>s.no: xx8239233231</h1>
        <img src={QR}></img>
      </div>
      <div>
        <button>Download</button>
      </div>
    </div>

  )
}

export default Receipt