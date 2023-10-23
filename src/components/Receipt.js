import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../Redux/Slices/FormSlice";
import groobeLogo from "../assets/images/groobe logo2.svg";
import QR from "../assets/images/Receipt/QR.svg";
import QRCodeGenerator from "../components/QR";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from "react-router-dom";

function Receipt() {
  // const formData = useSelector((state) => state.FormData);
  let formData = localStorage.getItem("eventData");
  formData = JSON.parse(formData);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(formData.taskcompleted === false ){
      
      formData.taskcompleted = true;

      const jsonString = JSON.stringify(formData);

      // Store the updated JSON string in localStorage
      localStorage.setItem("eventData", jsonString);

    }
  }, [])
  // // Your changeHandler function
  // function changeHandler(event) {
  //   // const { name, value, checked, type } = event.target;
  //   // const selectedSociety = event.target.getAttribute('name');
  //   // dispatch(setData({ Society: selectedSociety }));
  //   // dispatch(print());
  // }


function downloadReceiptAsPDF() {
  // Reference to the target component (receipt.js) to be captured
  const targetComponent = document.getElementById('receiptComponent');

  html2canvas(targetComponent).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save('receipt.pdf');
  });
}

  return (
    <>
    <div className="w-full flex flex-col justify-center items-center " id="receiptComponent">
      <img
        className="flex flex-row mx-[38%] md:mx-[43%] mb-4"
        src={groobeLogo}
      ></img>
      <div className="border-2 border-gray-500 w-max rounded-lg px-5 md:px-14 pt-3 pb-6 mx-[11%] md:mx-[18%]  text-xl mt-2">
        <div className="flex flex-row mb-3">
          <h1>Name :</h1>
          <h1 className="ml-1">{formData.Name}</h1>
        </div>
        <div className="flex flex-row mb-3">
          <h1>Ph. No :</h1>
          <h1 className="ml-1">{formData.PhoneNumber}</h1>
        </div>
        <div className="flex flex-row mb-3">
          <h1>Date :</h1>
          <h1 className="ml-1">{formData.Date}</h1>
        </div>
        <div className="flex flex-ro mb-3">
          <h1>Service :</h1>
          <h1 className="ml-1">{formData.Service}</h1>
        </div>
        <div className="flex flex-row mb-3">
          <h1>Hands :</h1>
          <h1 className="ml-1">{formData.Hands}</h1>
        </div>
        <div className="flex flex-row mb-3">
          <h1>Amount :</h1>
          <h1 className="ml-1">{formData.Price}</h1>
        </div>
        <div className="flex flex-row mb-3">
          <h1>Payment :</h1>
          <h1 className="bg-[#9DC9A2] p-2 rounded-md ml-1">
            {formData.PayMethod}
          </h1>
        </div>

        <img src=""></img>

        {/* <img className='ml-[10%] mb-3' src={QR}></img> */}
        <div>
          <QRCodeGenerator />
        </div>
        <h1 className="mb-3 mx-7 font-bold">s.no : {formData.bID}</h1>
      </div>
    </div>
      <div className="flex flex-col justify-center items-center">
        <button className="bg-[#440BB7] rounded-md px-3 md:px-5 pt-2 pb-2 mb-2 mt-5 text-white"
        onClick={downloadReceiptAsPDF}>
          Download
        </button>
        <Link to="/">
        <button className="bg-[#440BB7] rounded-md px-3 md:px-5 pt-2 pb-2 mb-4  text-white"
        onClick={()=>{
          localStorage.removeItem("eventData");
        }}>
          Book a new Service
        </button>
        </Link>
      </div>
    </>
  );
}

export default Receipt;
