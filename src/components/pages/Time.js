import { React, useEffect } from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import { Link, json } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { app, auth, RecaptchaVerifier } from "../../firebase";
import whatsapp from "../../assets/images/Frame 2219.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { async } from "q";

function Time() {
  const Navigate = useNavigate();
  //console.log(new Date().getDate() , new Date().getMonth() )
  let localData = localStorage.getItem("eventData");
  localData = JSON.parse(localData);
  const [fName, setFname] = useState(localData.Name || "");
  const [phone, setPhone] = useState(localData.PhoneNumber || "");
  var [error, seterror] = useState(false);
  var [errorN, seterrorN] = useState(false);
  var [errorP, seterrorP] = useState(false);
  const [selectedDate, setSelectedDate] = useState(localData.Date || "28 OCT");
  const [selectedSlot, setSelectedSlot] = useState(localData.Slot || null);
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [timeApiData, setTimeAPiData] = useState(null);
  const [UniqueDateData, setUniqueDateData] = useState(null);
  const [SlotsData, setSlotsData] = useState([]);
  const [unique , setUnique] = useState(false);
const [uniquephonecheck, setuniqephnchek] = useState("");
  const [loading, setLoading] = useState(true);
  const [reCAPTCHALoaded, setReCAPTCHALoaded] = useState(false);
  const [verf, setVerf] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(true);
  // ...

  // Define a function to handle reCAPTCHA verification
  const handleRecaptchaVerification = (token) => {
    // The token parameter contains the reCAPTCHA response token.
    // You can proceed with form submission or any other action here.
    setVerf(true);
    console.log("reCAPTCHA verification successful. Token: ", token);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/time-slot", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("price Data fetched", data);
          setTimeAPiData(data.data);
          setUniqueDateData([...new Set(data.data.map((elm) => elm.date))]);
          setSlotsData(data.data.filter((a) => a.date === selectedDate));
          setLoading(false);
        } else {
          console.log("Request failed with status: " + response.status);
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData(); // Call the async function immediately

    // You can include dependencies if needed, like [someId]
  }, []); // Pass an empty array if no dependencies are needed

  useEffect(() => {
    if (timeApiData)
      setSlotsData(timeApiData.filter((a) => a.date === selectedDate));
  }, [selectedDate]);

  useEffect(()=>{
    const fu = async() =>{
      const getBookingData = await fetch("http://localhost:8000/booking");
      if (getBookingData.ok || getBookingData.status == 500) {
        let Bdata = await getBookingData.json();
        if (Bdata.message !== "Cannot read properties of null (reading 'list')") {
          const BFilterdata = Bdata.data.filter((a) => {
            return a.mobile == phone;
          });
  
          const bID = BFilterdata.length === 0 ? undefined : BFilterdata[0].id;
  
          if (bID !== undefined) {
            
            //dispatch(setData({ error: "Unique" }));
       
            setUnique(true);
           setuniqephnchek(phone);
           
          }
        }
      }
    }
    fu();
  },[phone])

  useEffect(() => {
    const fun = async () => {
      const getUser = await fetch("http://localhost:8000/user-data");
      if (getUser.ok) {
        const getData = await getUser.json();
        //console.log(getData);
        const alreadyIdData = getData.data.filter(
          (a) => a.mobile === phone && a.name === fName
        );
        //console.log(alreadyIdData);
        const alreadyId =
          alreadyIdData.length === 0 ? undefined : alreadyIdData[0].uid;
        console.log(alreadyId);

        const data = {
          uid: alreadyId,
          name: fName,
          mobile: phone,
          isVerified: 1,
          societyId: formData.SocietyId || localData.SocietyId,
          serviceId: formData.ServiceId || localData.ServiceId,
        };

        const response = await fetch("http://localhost:8000/user-data", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log(result);
      } else {
        console.log("Request failed with status: " + getUser.status);
      }
    };
    fun();
  }, [isOtpVerified]);

  useEffect(() => {
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    if (eventData.bID != undefined) Navigate("/confirm");
  }, []);

  const HandleNameChange = (event) => {
    seterror(false);
    setFname(event.target.value);
    // Define a regular expression for name validation (letters and spaces)
    const namePattern = /^[A-Za-z\s]+$/;

    const isNameValid = namePattern.test(event.target.value);
    seterrorN(!isNameValid);
    if (isNameValid === false) {
      seterror(true);
      dispatch(setData({ error: "Enter Correct Name!" }));
    }
    //console.log(isNameValid);
  };

  const HandlePhoneChange = (event) => {

    seterror(false);
    const numericInput = event.target.value.replace(/[^0-9]/g, "");
    setPhone(numericInput);

    // Update the 'phone' state with the cleaned numeric input

    const phonePattern = /^[0-9]+$/;

    const isPhoneValid = phonePattern.test(event.target.value);
    seterrorP(!isPhoneValid);

    if (event.target.value.length > 10) {
      seterrorP(true);
      seterror(true);
      dispatch(setData({ error: "PhoneNumber length exceeded!" }));
    }
    if (isPhoneValid === false) {
      seterror(true);
      dispatch(setData({ error: "Enter Correct PhoneNumber!" }));
    }
    if(uniquephonecheck != phone)
    setUnique(false);
  };

  const HandleDate = (name) => {
    setSelectedDate(name);

    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    eventData.Slot = "";

    // Convert the updated object to a JSON string
    const jsonString = JSON.stringify(eventData);

    // Store the updated JSON string in localStorage
    localStorage.setItem("eventData", jsonString);
    setSelectedSlot(null);
  };

  const HandleSlot = (name) => {
    setSelectedSlot(name);
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    eventData.Slot = name || selectedSlot;

    // Convert the updated object to a JSON string
    const jsonString = JSON.stringify(eventData);

    // Store the updated JSON string in localStorage
    localStorage.setItem("eventData", jsonString);
  };

  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // const signin = () => {
  //   if (phone === "" || phone.length < 10) return;
  //   const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
  //     size: "normal", // You can adjust this according to your needs
  //     callback: (response) => {
  //       // This callback function will be called after the user solves the CAPTCHA
  //       // You can include your sign-in logic here
  //       // ...
  //       console.log(response);
  //     },
  //     "expired-callback": () => {
  //       // Handle CAPTCHA expiration
  //       // ...
  //     },
  //   });

  //   auth
  //     .signInWithPhoneNumber(phone, recaptchaVerifier)
  //     .then((result) => {
  //       setfinal(result);
  //       alert("Code sent");
  //       setshow(true);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //       window.location.reload();
  //     });
  //   //let verify = new auth.RecaptchaVerifier("recaptcha-container");
  // };

  // // Validate OTP
  // const ValidateOtp = () => {
  //   if (otp === null || final === null) return;
  //   final
  //     .confirm(otp)
  //     .then((result) => {
  //       // success
  //     })
  //     .catch((err) => {
  //       alert("Wrong code");
  //     });
  // };

  // const validateData = () => {
  //   seterror(
  //     fName === "" || phone === "" || phone.length < 10 || fName < 2
  //       ? true
  //       : false
  //   );
  // };

  // const userApi = async () => {
  //   try {
  //     validateData();
  //     setshow(true);
  //     // Retrieve the existing data from localStorage, if any
  //     const existingData = localStorage.getItem("eventData");
  //     // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
  //     const eventData = existingData ? JSON.parse(existingData) : {};

  //     if (fName === "" || phone === "" || phone.length < 10 || fName < 2)
  //       return;

  //     eventData.Name = fName;
  //     eventData.PhoneNumber = phone;
  //     // Convert the updated object to a JSON string
  //     const jsonString = JSON.stringify(eventData);

  //     // Store the updated JSON string in localStorage
  //     localStorage.setItem("eventData", jsonString);

  //     dispatch(setData({ Name: fName, PhoneNumber: phone }));

  //     // const codeOtp = Math.floor(100000 + Math.random() * 900000);

  //     // // const otpResponse = await fetch(`http://smsproadv.in/api/v2/SendSMS?SenderId=SANBAS&Is_Unicode=false&Is_Flash=false&Message=${codeOtp}.&MobileNumbers=+91${phone}&ApiKey=oUsBzN0SIFCeAMVRmxGxMzA3d8GfIF%2BX8xgcgRk35nU%3D&ClientId=d1d94ba5-44cb-4f51-aa4b-7cf751d58490`);
  //     // // console.log(otpResponse)

  //     // console.log("otp is : ", codeOtp);

  //     // const apiKey = "oUsBzN0SIFCeAMVRmxGxMzA3d8GfIF%2BX8xgcgRk35nU%3D";
  //     // const clientId = "d1d94ba5-44cb-4f51-aa4b-7cf751d58490";

  //     // const url = `http://localhost:8000/send-sms`;

  //     // fetch(url, {
  //     //   method: "GET",
  //     //   headers: {
  //     //     Accept: "text/plain",
  //     //     mobile: phone,
  //     //     otpcode: codeOtp
  //     //   },
  //     // })
  //     //   .then((response) => {
  //     //     if (!response.ok) {
  //     //       throw new Error("Network response was not ok");
  //     //     }
  //     //     return response.text(); // or response.json() if the response is JSON
  //     //   })
  //     //   .then((data) => {
  //     //     // Handle the response data here
  //     //     console.log(data);
  //     //   })
  //     //   .catch((error) => {
  //     //     // Handle errors here
  //     //     console.error("There was a problem with the fetch operation:", error);
  //     //   });

  //     const getUser = await fetch("http://localhost:8000/user-data");
  //     if (getUser.ok) {
  //       const getData = await getUser.json();
  //       //console.log(getData);
  //       const alreadyIdData = getData.data.filter(
  //         (a) => a.mobile === phone && a.name === fName
  //       );
  //       //console.log(alreadyIdData);
  //       const alreadyId =
  //         alreadyIdData.length === 0 ? undefined : alreadyIdData[0].uid;
  //       console.log(alreadyId);
  //       // Add or update the Service and ServiceId properties
  //       eventData.UserId = alreadyId;
  //       eventData.Name = fName;
  //       eventData.PhoneNumber = phone;
  //       // Convert the updated object to a JSON string
  //       const jsonString = JSON.stringify(eventData);

  //       // Store the updated JSON string in localStorage
  //       localStorage.setItem("eventData", jsonString);

  //       dispatch(setData({ UserId: alreadyId }));
  //       dispatch(setData({ Name: fName, PhoneNumber: phone }));
  //     } else {
  //       console.log("Request failed with status: " + getUser.status);
  //     }

  //     console.log(localData.UserId);
  //     if (localData.UserId === undefined) {
  //       const data = {
  //         name: fName,
  //         mobile: phone,
  //         isVerified: 0,
  //         societyId: formData.SocietyId || localData.SocietyId,
  //         serviceId: formData.ServiceId || localData.ServiceId,
  //       };

  //       // const response = await fetch("http://localhost:8000/user-data", {
  //       //   method: "POST",
  //       //   body: JSON.stringify(data),
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //   },
  //       // });
  //       // const result = await response.json();
  //       // console.log(result);
  //     } else {
  //       const data = {
  //         uid: localData.UserId,
  //         name: fName,
  //         mobile: phone,
  //         isVerified: 0,
  //         societyId: formData.SocietyId || localData.SocietyId,
  //         serviceId: formData.ServiceId || localData.ServiceId,
  //       };
  //       console.log("else", data);
  //       // const response = await fetch("http://localhost:8000/user-data", {
  //       //   method: "POST",
  //       //   body: JSON.stringify(data),
  //       //   headers: {
  //       //     "Content-Type": "application/json",
  //       //   },
  //       // });
  //       // const result = await response.json();
  //       // console.log(result);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Your changeHandler function

  async function changeHandler(event) {
    if(unique){
      toast("Mobile Number Already Exists!");
      seterrorP(true);
      return;
    }
    if (!isOtpVerified) return;

    if (selectedSlot == null || selectedSlot === "") {
      toast("Select Slot!");
      return;
    }
    if (phone === "") {
      toast("Enter Phone Number!");
      return;
    }
    if (fName === "") {
      toast("Enter Name!");
      return;
    }
    if (phone.length < 10) {
      toast("Enter 10 Digit Phone Number!");
      return;
    }
    if (errorN) {
      toast("Enter correct name!");
      return;
    }
    if (errorP) {
      toast("Enter correct Phone Number!");
      return;
    }

    // const { name, value, checked, type } = event.target;
    setReCAPTCHALoaded(true);

    seterror(fName === "" || phone === "" ? true : false);

    const Date = selectedDate;
    const Slot = selectedSlot;
    const ph = phone;
    const name = fName;

    // Retrieve the existing data from localStorage, if any
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    // Add or update the Service and ServiceId properties
    eventData.Name = name;
    eventData.PhoneNumber = ph;
    eventData.Date = Date;
    eventData.Slot = Slot;

    // Convert the updated object to a JSON string
    const jsonString = JSON.stringify(eventData);

    // Store the updated JSON string in localStorage
    localStorage.setItem("eventData", jsonString);

    dispatch(setData({ Name: name, PhoneNumber: ph, Date: Date, Slot: Slot }));

    dispatch(print());
  }

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
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img
          src={whatsapp}
          width="120px"
          height="70px"
          className="fixed top-[50vh] right-0"
        ></img>
      </a>

      <ToastContainer />

      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" />
      <div className="md:flex md:flex-row  justify-evenly mt-[-8%] ">
        <div className="flex flex-col shadow-xl border-1 p-10 rounded-lg bg-white  text-lg">
          <div className="flex flex-col ">
            <label>Full Name</label>
            <input
              value={fName}
              type="text"
              pattern="[A-Za-z]+"
              className={
                errorN
                  ? "focus:text-red-600 focus:border-[#440BB7] border rounded-md mt-2 p-3 border-red-600 text-black"
                  : "focus:border-[#440BB7]  focus:text-blue-800 border rounded-md mt-2 p-3 border-black text-black"
              }
              onChange={HandleNameChange}
              required
            />
          </div>

          <div className="flex flex-col mt-6">
            <label>Phone Number</label>
            <br></br>
            <input
              value={phone}
              type="tel"
              maxLength={10}
              pattern="[0-9]*"
              onChange={HandlePhoneChange}
              placeholder="phone number"
              className={
                errorP
                  ? "focus:border-[#440BB7] focus:text-red-600 border border-red-600 rounded-md mt-2 p-3 text-black "
                  : "focus:border-[#440BB7] focus:text-[#440BB7] border border-black rounded-md mt-2 p-3 text-black "
              }
            />
            {error && <p className="text-red-600">{formData.error}</p>}
            <br />
            <br />
            {/* <div id="recaptcha-container"></div> */}

            {/* <button
              onClick={error ? validateData : userApi}
              style={{ display: !show && !isOtpVerified ? "block" : "none" }}
            >
              Get OTP
            </button> */}
          </div>
          {/* <div style={{ display: show && !isOtpVerified ? "block" : "none" }}>
            <input
              type="Number"
              placeholder={"Enter your OTP"}
              className="focus:border-[#440BB7] focus:text-[#440BB7] border border-black rounded-md mt-2 p-3 text-black "
              onChange={(e) => {
                setotp(e.target.value);
              }}
            ></input>
            <br />
            <br />
            <button onClick={() => setOtpVerified(true)}>Verify</button>
          </div>
          {isOtpVerified && <h1>Verified</h1>} */}
        </div>

        <div className="shadow-xl border-1 p-10 m:p-5 rounded-lg bg-white text-lg">
          <p>Time and Date</p>
          <div className="border border-black grid grid-cols-4 rounded-md p-1 mt-2">
            {loading === true ? (
              <div className="relative top-[50%] left-[50%]">
                <RingLoader color="#7E22CE" size={50} />
              </div>
            ) : (
              <>
                {/* This console.log should be outside the JSX block */}
                {UniqueDateData.map((elm) => (
                  <button
                    className={
                      selectedDate === elm
                        ? "border border-[#440BB7] bg-[#440BB7] text-white rounded-md m-3 p-3"
                        : "border border-black rounded-md m-3 p-3"
                    }
                    onClick={() => HandleDate(elm)}
                  >
                    {elm}
                  </button>
                ))}
              </>
            )}

            {SlotsData.length != 0
              ? SlotsData.map((slot) => (
                  <buttton
                    className={
                      selectedSlot === slot.time
                        ? "border border-[#440BB7] bg-[#440BB7] text-white rounded-md m-3 p-1 text-center"
                        : "border border-black rounded-md m-3 p-1 text-center"
                    }
                    onClick={() => HandleSlot(slot.time)}
                  >
                    {slot.time}
                  </buttton>
                ))
              : slotsArray.map((slot) => (
                  <buttton
                    className={
                      selectedSlot === slot
                        ? "border border-[#440BB7] bg-[#440BB7] text-white rounded-md m-3 p-1 "
                        : "border border-black rounded-md  m-3 p-1"
                    }
                    onClick={() => HandleSlot(slot)}
                  >
                    {slot}
                  </buttton>
                ))}
          </div>
          <Link
            to={
              fName === "" ||
              phone === "" ||
              phone.length < 10 ||
              !isOtpVerified ||
              selectedSlot === null ||
              selectedSlot === "" ||
              errorN ||
              errorP || error || unique
                ? ""
                : "/confirm"
            }
            className="ml-[10%]"
          >
            {console.log(unique , error)}
            <button
              className={
                selectedSlot !== null &&
                phone != "" &&
                fName != "" &&
                phone.length === 10 &&
                !error &&
                !errorN &&
                !errorP 
                  ? "bg-[#440BB7] rounded-lg text-white p-3 mt-[7%] w-[80%]"
                  : "bg-[#440BB7] cursor-not-allowed rounded-lg text-white p-3 mt-[7%] w-[80%]"
              }
              onClick={changeHandler}
            >
              Book
            </button>
          </Link>
          {reCAPTCHALoaded && (
            <GoogleReCaptchaProvider reCaptchaKey="6LcAULIoAAAAAJkfN4QY1ANNk9zxbM5_-1jjTXWU">
              <GoogleReCaptcha onVerify={handleRecaptchaVerification} />
            </GoogleReCaptchaProvider>
          )}
        </div>
      </div>
      <Footer />
    
    </div>
  );
}

export default Time;
