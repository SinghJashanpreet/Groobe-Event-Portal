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
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

function Time() {
  const [fName, setFname] = useState("");
  const [phone, setPhone] = useState("");
  var [error, seterror] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [timeApiData, setTimeAPiData] = useState(null);
  const [UniqueDateData, setUniqueDateData] = useState(null);
  const [SlotsData, setSlotsData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [reCAPTCHALoaded, setReCAPTCHALoaded] = useState(false);
  const [verf, setVerf] = useState(false);
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

  const signin = () => {
    if (phone === "" || phone.length < 10) return;
    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
      size: "normal", // You can adjust this according to your needs
      callback: (response) => {
        // This callback function will be called after the user solves the CAPTCHA
        // You can include your sign-in logic here
        // ...
        console.log(response);
      },
      "expired-callback": () => {
        // Handle CAPTCHA expiration
        // ...
      },
    });

    auth
      .signInWithPhoneNumber(phone, recaptchaVerifier)
      .then((result) => {
        setfinal(result);
        alert("Code sent");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
    //let verify = new auth.RecaptchaVerifier("recaptcha-container");
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        // success
      })
      .catch((err) => {
        alert("Wrong code");
      });
  };

  const validateData = () => {
    seterror(
      fName === "" || phone === "" || phone.length < 10 || fName < 2
        ? true
        : false
    );
  };
  const userApi = async () => {
    try {
      validateData();

      if (fName === "" || phone === "" || phone.length < 10 || fName < 2)
        return;

      dispatch(setData({ Name: fName, PhoneNumber: phone }));

      const getUser = await fetch("http://localhost:8000/user-data");
      if (getUser.ok) {
        const getData = await getUser.json();
        const alreadyIdData = getData.data.filter(
          (a) => a.mobile === phone && a.name === fName
        );
        const alreadyId =
          alreadyIdData.length === 0 ? undefined : alreadyIdData[0].uid;

        // Retrieve the existing data from localStorage, if any
        const existingData = localStorage.getItem("eventData");

        // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
        const eventData = existingData ? JSON.parse(existingData) : {};

        // Add or update the Service and ServiceId properties
        eventData.UserId = alreadyId;
        eventData.Name = fName;
        eventData.PhoneNumber = phone;
        // Convert the updated object to a JSON string
        const jsonString = JSON.stringify(eventData);

        // Store the updated JSON string in localStorage
        localStorage.setItem("eventData", jsonString);

        dispatch(setData({ UserId: alreadyId }));
      } else {
        console.log("Request failed with status: " + getUser.status);
      }

      if (formData.UserId === undefined || "") {
        const data = {
          name: formData.Name,
          mobile: formData.PhoneNumber,
          isVerified: 0,
          societyId: formData.SocietyId,
          serviceId: formData.ServiceId,
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
        const data = {
          uid: formData.UserId,
          name: formData.Name,
          mobile: formData.PhoneNumber,
          isVerified: 0,
          societyId: formData.SocietyId,
          serviceId: formData.ServiceId,
        };
        console.log(data);
        const response = await fetch("http://localhost:8000/user-data", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Your changeHandler function
  function changeHandler(event) {
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

      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" />
      <div className="flex flex-row justify-evenly ">
        <div className="flex flex-col shadow-xl border-1 p-10 rounded-lg">
          <div className="flex flex-col">
            <label>Full Name</label>
            <input
              value={fName}
              type="text"
              className="focus:border-[#440BB7] focus:text-blue-800 border border-black rounded-md mt-2 p-3 text-black "
              onChange={HandleNameChange}
              required
            />
          </div>

          <div
            className="flex flex-col mt-6"
            style={{ display: !show ? "block" : "none" }}
          >
            <label>Phone Number</label>
            <br></br>
            <input
              value={phone}
              onChange={(e) => {
                seterror(false);
                setPhone(e.target.value);
              }}
              placeholder="phone number"
              className="focus:border-[#440BB7] focus:text-[#440BB7] border border-black rounded-md mt-2 p-3 text-black "
            />
            {error && <p className="text-red-600">Enter Correctly </p>}
            <br />
            <br />
            <div id="recaptcha-container"></div>
            <button onClick={error ? validateData : userApi}>Get OTP</button>
          </div>
          <div style={{ display: show ? "block" : "none" }}>
            <input
              type="Number"
              placeholder={"Enter your OTP"}
              onChange={(e) => {
                setotp(e.target.value);
              }}
            ></input>
            <br />
            <br />
            <button onClick={ValidateOtp}>Verify</button>
          </div>
        </div>

        <div className="w-1/2  shadow-xl border-1 p-10 rounded-lg">
          <p>Time and Date</p>
          <div className="w-auto border border-black grid grid-cols-4 rounded-md p-1 mt-2">
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
                        ? "border border-[#440BB7] bg-[#440BB7] text-white rounded-md m-3 p-1 2lg:pl-9 2md:pl-3 md:pl-1"
                        : "border border-black rounded-md 2lg:pl-9 2md:pl-3 md:pl-1 m-3 p-1"
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
                        ? "border border-[#440BB7] bg-[#440BB7] text-white rounded-md m-3 p-1 2lg:pl-9 2md:pl-3 md:pl-1"
                        : "border border-black rounded-md 2lg:pl-9 2md:pl-3 md:pl-1 m-3 p-1"
                    }
                    onClick={() => HandleSlot(slot)}
                  >
                    {slot}
                  </buttton>
                ))}
          </div>
          <Link to={fName === "" || phone === "" || !verf ? "" : "/confirm"}>
            <button
              className="w-[80%] bg-[#440BB7] rounded-lg text-white p-3 mt-[7%] ml-[10%] "
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
