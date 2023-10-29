import { useState, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { print, setData } from "../Redux/Slices/FormSlice";
import useRazorpay from "react-razorpay";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import groobe from "../assets/images/groobe logo2.svg";
import { Link } from "react-router-dom";
import Receipt from "./Receipt";

const PopupContent = ({ onClose }) => {
  const navigate = useNavigate();
  let formData = localStorage.getItem("eventData");
  formData = JSON.parse(formData);
  const dispatch = useDispatch();
  // Initialize an array of isDetailsOpen states, one for each details element
  const [isDetailsOpen, setIsDetailsOpen] = useState(new Array(12).fill(false));
  const [showReceipt, setShowReceipt] = useState(false);
  const [Razorpay] = useRazorpay();

  // Function to toggle the state of a specific details element
  const toggleDetails = (index) => {
    const updatedIsDetailsOpen = [...isDetailsOpen];
    updatedIsDetailsOpen[index] = !updatedIsDetailsOpen[index];
    setIsDetailsOpen(updatedIsDetailsOpen);
  };

  // Function to handle the click on the summary element
  const handleSummaryClick = (index) => {
    toggleDetails(index); // Toggle the details state
  };

  // useEffect(() => {

  //   // Add a scroll event listener to the window
  //   // const handleScroll = () => {
  //   //   // Close the modal when the background is scrolled
  //   //   if (showReceipt === true)
  //   //     dispatch(setData({ showReceipt: false }));

  //   //   onClose();
  //   // };

  //   //if (showReceipt === true) dispatch(setData({ showReceipt: false }));
  //   // if (showReceipt === true) navigate("/")

  //   //window.addEventListener("scroll", handleScroll);

  //   // Remove the scroll event listener when the component unmounts
  //   // return () => {
  //   //   window.removeEventListener("scroll", handleScroll);
  //   // };
  // }, []);

  const HandleMethod = async (event) => {
    try {
      const method = event.target.getAttribute("name");

      // Retrieve the existing data from localStorage, if any
      const existingData = localStorage.getItem("eventData");

      // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
      const eventData = existingData ? JSON.parse(existingData) : {};

      // Add or update the Service and ServiceId properties
      eventData.PayMethod = method;

      // Convert the updated object to a JSON string
      const jsonString = JSON.stringify(eventData);

      // Store the updated JSON string in localStorage
      localStorage.setItem("eventData", jsonString);

      dispatch(setData({ PayMethod: method }));

      // const getBookingData = await fetch("http://localhost:8000/booking");
      // if (getBookingData.ok) {
      //   let Bdata = await getBookingData.json();

      //   const BFilterdata = Bdata.data.filter((a) => {
      //     console.log(a.id, eventData.bID);
      //     return a.id == eventData.bID;
      //   });

      //   console.log(BFilterdata);

      //   const bID = BFilterdata.length === 0 ? undefined : BFilterdata[0].id;

      //   console.log(bID);

      //   eventData.bID = bID;
      //   const jsonString = JSON.stringify(eventData);

      //   // Store the updated JSON string in localStorage
      //   localStorage.setItem("eventData", jsonString);
      //   dispatch(setData({ showReceipt: true }));
      console.log("this is bid tp be updated: ", eventData.bID);
      const data = {
        id: eventData.bID,
        // transaction_id: "None",
        paymentStatus: "COD",
        paymentMode: method,
        // booking_status: "Pending"
      };
      const response = await fetch(window.backendUrl + "booking", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);

      dispatch(print());
      setShowReceipt(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    if (
      eventData.bID != undefined &&
      eventData.PayMethod != undefined &&
      eventData.taskcompleted === true
    ) {
      dispatch(setData({ showReceipt: true }));
      setShowReceipt(true);
    }
  }, []);

  const handlePayment = async (params) => {
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};
    try {
      // const orderID = await createOrder(params); // Create order on your backend
      //const orderID = "order_9A33XWu170gUtm"; // Create order on your backend

      // Define the options for the Razorpay payment

      const options = {
        key: "rzp_test_eTUkfD3gqLeX0A", // Your Razorpay API Key
        amount: eventData.Price * 100, // Amount is in currency subunits (paise)
        // Other payment options...
        //order_id: orderID, // Use the order ID obtained from the createOrder function
        handler: async function (response) {
          try {
            // Handle the payment response
            //console.log(response.razorpay_payment_id);
            const data = {
              id: eventData.bID,
              transaction_id: response.razorpay_payment_id,
              paymentStatus: "Paid",
              paymentMode: "Online",
            };

            // Call an async function to make the fetch request
            await sendPaymentDataToServer(data);

            await updateBookingTimeApi();

            dispatch(setData({ showReceipt: true }));
            setShowReceipt(true);
            // You can include more handling logic here, e.g., updating the UI
          } catch (error) {
            console.error("Error handling payment response:", error);
            // Handle the error, e.g., show an error message to the user
          }
        },
        prefill: {
          name: eventData.Name,
          contact: eventData.PhoneNumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Create a new Razorpay instance and open the payment modal
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed",async function (response) {
        // Handle payment failure
        // Alert or handle as needed

        const data = {
          id: eventData.bID,
          transaction_id: response.error.metadata.payment_id,
          paymentStatus: "Cancelled",
          paymentMode: "Online",
        };

        // Call an async function to make the fetch request
        await sendPaymentDataToServer(data);

        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });
      rzp1.open();

      async function sendPaymentDataToServer(data) {
        try {
          const response = await fetch(window.backendUrl + "booking", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error("Error sending payment data to server:", error);
          // Handle any errors related to the server request
        }
      }
      async function updateBookingTimeApi(data) {
        try {
          const id = eventData.TimeId;
          const sid = eventData.SocietyId;
          // Make the API call
          const apiResponse = await fetch(window.backendUrl + "time-slot");
  
          // Check if the response status code indicates success
          if (apiResponse.ok) {
            // Parse the JSON response data
            const apiData = await apiResponse.json();
  
            const bookingCountAlready = apiData.data.filter((a) => {
              return a.id == id && a.sid == sid;
            })[0].bookings;
  
            const dataTobeUpdated = {
              id: id,
              bookings: (parseInt(bookingCountAlready) + 1).toString()
            };
            // console.log("This is your time data:", bookingCountAlready);
            const postResponse = await fetch(window.backendUrl + "time-slot", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(dataTobeUpdated),
            });
  
            if (postResponse.ok) {
              console.log("Data updated successfully");
            } else {
              console.error(
                "Failed to update data with status:",
                postResponse.status
              );
            }
          } else {
            console.error("API request failed with status:", apiResponse.status);
          }
        } catch (error) {
          // Handle any network or fetch-related errors
          console.error("An error occurred while fetching data:", error);
        }
  
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle the error, e.g., show an error message to the user
    }

    try {
      //const method = event.target.getAttribute("name");

      // Add or update the Service and ServiceId properties
      eventData.PayMethod = "Online";

      // Convert the updated object to a JSON string
      const jsonString = JSON.stringify(eventData);

      // Store the updated JSON string in localStorage
      localStorage.setItem("eventData", jsonString);

      dispatch(setData({ PayMethod: "Online" }));

      // const getBookingData = await fetch("http://localhost:8000/booking");
      // if (getBookingData.ok) {
      //   let Bdata = await getBookingData.json();

      //   const BFilterdata = Bdata.data.filter((a) => {
      //     console.log(a.id, eventData.bID);
      //     return a.id == eventData.bID;
      //   });

      //   console.log(BFilterdata);

      //   const bID = BFilterdata.length === 0 ? undefined : BFilterdata[0].id;

      //   console.log(bID);

      //   eventData.bID = bID;
      //   const jsonString = JSON.stringify(eventData);

      //   // Store the updated JSON string in localStorage
      //   localStorage.setItem("eventData", jsonString);
      //   dispatch(setData({ showReceipt: true }));
      // console.log("this is bid tp be updated: ", eventData.bID);
      // const data = {
      //   id: eventData.bID,
      //   transaction_id: "krda update wait",
      //   paymentStatus: "Paid/Unpaid",
      //   paymentMode: "Online",
      //   // booking_status: "Pending"
      // };
      // const response = await fetch("http://localhost:8000/booking", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const result = await response.json();
      // console.log(result);

      // dispatch(print());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative">
      {!showReceipt ? (
        <>
          {!showReceipt ? (
            <h1 className="sticky top-0 z-10 text-xl 2m:text-2xl md:text-3xl font-inter font-[400] flex justify-center items-center pt-3 pb-5 bg-[#F0F0F0] w-full ">
              <img src={groobe} width="60px"></img>
            </h1>
          ) : (
            <></>
          )}

          <div className="flex flex-col gap-5 mx-[4%] 2m:mx-[7%] md:mx-[7%] overflow-y-scroll no-scrollbar mb-8 text-xl shadow-xl  pr-5 pl-5 rounded-lg">
            <h1
              className="border border-gray-300 pl-5 pt-2 pb-2 mt-5 mb-5 shadow-lg rounded-lg"
              name="Pay After Service"
              onClick={HandleMethod}
            >
              Pay after Service
            </h1>

            <h1
              className="border border-gray-300 pl-5 pt-2 pb-2  mb-5 shadow-lg rounded-lg"
              name="Online"
              onClick={handlePayment}
            >
              Pay Now
            </h1>
          </div>
        </>
      ) : (
        <Receipt />
      )}
    </div>
  );
};

export default PopupContent;
