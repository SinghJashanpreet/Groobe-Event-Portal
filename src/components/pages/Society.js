import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { print, setData } from "../../Redux/Slices/FormSlice";
import whatsapp from "../../assets/images/Frame 2219.svg";
function Society() {
  const [SocietyApiData, setSocietyApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/society-data", {
          method: "GET",
          headers: {
            usertype: "user",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Society Data fetched", data);
          setSocietyApiData(data.data);
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

  if (SocietyApiData !== null) {
    const midpoint = Math.ceil(SocietyApiData.length / 2);
    // Split the array into two parts
    var firstHalf = SocietyApiData.slice(0, midpoint);
    var secondHalf = SocietyApiData.slice(midpoint);
  }
  // Your changeHandler function
  function changeHandler(event, idd) {
    // const { name, value, checked, type } = event.target;
    // Create an object to store Society and SocietyId
    const EventData = {
      Society: event,
      SocietyId: idd,
    };

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(EventData);

    // Store the JSON string in localStorage
    localStorage.setItem("eventData", jsonString);
    dispatch(setData({ Society: event, SocietyId: idd }));
    dispatch(print());
  }

  return (
    <div className="justify-start items-center 2xl:mt-12 2xl:ml-80 2xl:mr-80 xl:mt-12 xl:ml-60 xl:mr-60 lg:mt-12 lg:ml-32 lg:mr-32 md:mt-6 md:ml-10 md:mr-10 sm:mt-6 sm:ml-4 sm:mr-4 m:ml-2 m:mr-2 s:ml-1.5 s:mr-1.5">
      {/* {dispatch(print())} */}
      <a href="https://api.whatsapp.com/send?phone=918360741113&text=Hi,%20I%27ve%20seen%20your%20portfolio%20and%20want%20the%20booking">
        <img
          src={whatsapp}
          width="120px"
          height="70px"
          className="fixed top-[50vh] right-0"
        ></img>
      </a>
      <h1 className="text-purple-700 font-[600] font-inter text-3xl m:ml-2 m:mr-2 m:mt-2 ">
        Choose Your Society
      </h1>

      <div className="flex lg:flex-row flex-col justify-between ">
        {loading === true ? (
          <div className="relative top-[50%] left-[50%]">
            <RingLoader color="#7E22CE" size={50} />
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:w-96 w-[100%]">
              {firstHalf.map((arr) => {
                return (
                  <Link to="/service">
                    <div
                      className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl"
                      name={arr.name}
                      onClick={() => changeHandler(arr.name, arr.id)}
                    >
                      {arr.name}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-col lg:w-96 w-[100%] ">
              {secondHalf.map((arr) => {
                return (
                  <Link to="/service">
                    <div
                      className=" border border-3 p-3 border-purple-700 rounded-lg mt-8 h-14 text-xl"
                      name={arr.name}
                      onClick={() => changeHandler(arr.name, arr.id)}
                    >
                      {arr.name}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="m-8 "></div>
    </div>
  );
}

export default Society;
