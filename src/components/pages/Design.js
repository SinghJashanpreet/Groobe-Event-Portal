import { React, useState, useEffect } from "react";
import Homeheader from "../Header";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
// import img1 from "../../assets/images/Design/Varanasi_Mehndi_Design_Images_Pictures_(Ideas)-transformed 1.svg";
// import img2 from "../../assets/images/Design/Arabic_Mehndi_Designs-removebg-preview 1.svg";
// import img3 from "../../assets/images/Design/Stylish_Mehndi_Designs-removebg-preview 1.svg";
// import img4 from "../../assets/images/Design/indo arabic 1.svg";
// import img5 from "../../assets/images/Design/Jaguar_Mhendi_Design-removebg-preview 1.svg";

// import img6 from "../../assets/images/Design/colored_tip_nails_1 1.svg";
// import img7 from "../../assets/images/Design/airbrushing_nails 1 (1).svg";
// import img8 from "../../assets/images/Design/airbrushing_nails 1 (2).svg";
// import img9 from "../../assets/images/Design/airbrushing_nails 1 (3).svg";
// import img10 from "../../assets/images/Design/colored_tip_nails_1 1 (1).svg";
// import img11 from "../../assets/images/Design/colored_tip_nails_1 1 (2).svg";
import RingLoader from "react-spinners/RingLoader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Design() {
  //const location = useLocation();
  //console.log(location.state)
  //const { serviceId } = location.state;
  const [DesignApiData, setDesignApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8000/service-detail-data",
          {
            method: "GET",
            headers: {
              usertype: "admin",
            },
          }
        );
        if (response.ok) {
          let data = await response.json();
          const temm = data.data.filter((a) => {
            return a.serviceId === formData.ServiceId;
          });
          console.log("Service Detail Data fetched", temm);
          setDesignApiData(temm);
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

  const formData = useSelector((state) => state.FormData);
  const dispatch = useDispatch();
  const bg = formData.Service === "Nail Art" ? 1 : undefined;

  // Your changeHandler function
  function changeHandler(event) {
    // const { name, value, checked, type } = event.target;
    const selectedDesign = event;
    const existingData = localStorage.getItem("eventData");

    // Parse the existing data as a JSON object, or create an empty object if it doesn't exist
    const eventData = existingData ? JSON.parse(existingData) : {};

    // Add or update the Service and ServiceId properties
    eventData.Design = selectedDesign;
    

    // Convert the updated object to a JSON string
    const jsonString = JSON.stringify(eventData);

    // Store the updated JSON string in localStorage
    localStorage.setItem("eventData", jsonString);
    dispatch(setData({ Design: selectedDesign }));
    dispatch(print());
  }

  return (
    <div className="">
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img
          src={whatsapp}
          width="120px"
          height="70px"
          className="fixed top-[50vh] right-0"
        ></img>
      </a>
      <Homeheader line1="Choose Style" line2="5+ Mehendi Design" bg={bg} />
      <div className="grid grid-rows-1 md:grid-cols-[_2fr_2fr] mx-[6.5%] gap-x-[7%]">
        {loading === true ? (
          <div className="relative top-[50%] left-[104%]">
            <RingLoader color="#7E22CE" size={50} />
          </div>
        ) : (
          DesignApiData.map((design) => (
            <Link to={formData.Service === "Nail Art" ? "/time" : "/price"}>
              <div
                style={{ backgroundColor: design.bgcolor }}
                className={`
            grid grid-cols-[_2fr_1.5fr] lg:grid-cols-[_2.5fr_1.5fr] 
            min-w-[310px] max-w-[650px] min-h-[210px]
            max-h-[400px] w-full rounded-lg my-7
            md:mt-[1.5rem]`}
                name={design.name}
                onClick={()=>changeHandler(design.name)}
              >
                <span
                  className="flex flex-col justify-center"
                  name={design.name}
                >
                  <h1
                    className={`text-4xl sm:text-5xl font-Bell text-${design.textcolor} px-5`}
                    name={design.name}
                  >
                    {design.name}
                  </h1>
                </span>
                <div className="w-full h-full relative">
                  <img
                    src={design.image}
                    name={design.name}
                    className="w-full h-full object-cover relative left-0"
                  />
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

export default Design;
