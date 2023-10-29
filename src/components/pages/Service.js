import { React, useState, useEffect } from "react";
import Homeheader from "../Header";
import Footer from "../Footer";
import CircularJSON from "circular-json";
import img1 from "../../assets/images/Services/Varanasi_Mehndi_Design_Images_Pictures_(Ideas)-transformed 1 (1).svg";
import img2 from "../../assets/images/Services/nails__nail_art__nail__nail_designs__nail_design__nail_polish__nail_ideas__spring_nails__spring_nail-transformed 1 (1).svg";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Service() {
  const Navigate = useNavigate();
  const [ServiceApiData, setServiceApiData] = useState(null);
  const [serviceID, setServiceID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    if (eventData.bID != undefined) Navigate("/confirm");
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(window.backendUrl + "service-data", {
          method: "GET",
          headers: {
            usertype: "user",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Service Data fetched", data);
          setServiceApiData(data.data);
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

  // const serviceMap = [
  //   {
  //     name: "Mehndi Design",
  //     desc: "Book Mehndi Design Service",
  //     src: img1,
  //   },
  //   {
  //     name: "Nail Art",
  //     desc: "Book Nail Art Service",
  //     src: img2,
  //   },
  // ];

  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();

  // Your changeHandler function
  function changeHandler(event, idd) {
    // const { name, value, checked, type } = event.target;
    //const selectedService = event;
    // Retrieve the existing data from localStorage, if any
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    if (eventData.Service != event && eventData.serviceID != idd) {
      // Add or update the Service and ServiceId properties
      eventData.Service = event;
      eventData.ServiceId = idd;

      // Convert the updated object to a JSON string
      const jsonString = JSON.stringify(eventData);
      localStorage.setItem("eventData", jsonString);
    }

    // const selectedService = event.location.state.serviceName;
    dispatch(setData({ Service: event, ServiceId: idd }));
    dispatch(print());
  }
  return (
    <div>
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I've%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img
          src={whatsapp}
          width="120px"
          height="70px"
          className="fixed top-[50vh] right-0"
        ></img>
      </a>
      <Homeheader
        className="m:w-5 m:h-5 "
        line1="Karwachauth Event"
        line2="Mehndi | Nail art service"
      />

      <div className="grid grid-rows-1 md:grid-cols-[0.6fr_1.9fr_1.9fr_0.6fr] md:gap-7 place-items-center">
        <div></div>

        {loading === true ? (
          <div className="relative top-[50%] left-[50%]">
            <RingLoader color="#7E22CE" size={50} />
          </div>
        ) : (
          ServiceApiData.map((service) => (
            <Link
              to={{ pathname: "/design", state: { serviceId: service.id } }}
            >
              {/* {console.group(service.id)} */}
              <div>
                <div
                  style={{ background: service.bgcolor }}
                  className={`
                    grid grid-cols-[_2fr_1.5fr] lg:grid-cols-[_2.5fr_1.5fr] min-w-[310px] max-w-[650px] min-h-[210px]
                    max-h-[400px] w-[32vw] h-full rounded-lg mt-[0.9rem] mb-[0.9rem] 
                    md:my-[3rem]`}
                  onClick={() => {
                    changeHandler(service.name, service.id);
                  }}
                >
                  <span className="flex flex-col justify-center">
                    <h1 className="pl-3 font-Bell text-4xl">{service.name}</h1>
                    <h2 className="pl-3 font-inter text-base">
                      {service.description}
                    </h2>
                  </span>
                  <div
                    className="flex items-end justify-end grow-0 "
                    onClick={changeHandler}
                  >
                    <img
                      src={service.image}
                      className="lg:w-[80%]"
                      onClick={changeHandler}
                    ></img>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Service;
