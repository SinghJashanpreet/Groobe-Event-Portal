import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homeheader from "./components/Header";
import Footer from "./components/Footer";
import Society from "./components/pages/Society";
import Main from "./components/pages/Main";
import Service from "./components/pages/Service";
import Design from "./components/pages/Design";
import Confirm from "./components/pages/Confirm";
import Time from "./components/pages/Time";
import Price from "./components/pages/Price";
import Receipt from "./components/Receipt";
import PaymentRzp from "./components/PaymentRzp";

function App() {
  window.backendUrl = `https://event-backend-484f.onrender.com/`;
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="society" element={<Society />} />
      <Route path="service" element={<Service />} />
      <Route path="design" element={<Design />} />
      <Route path="price" element={<Price />} />
      <Route path="time" element={<Time />} />
      <Route path="confirm" element={<Confirm />} />
      <Route path="receipt" element={<Receipt/>} />
      <Route path="rzp" element={<PaymentRzp/>} />
    </Routes>
  );
}

export default App;

// import React, { useState } from 'react'
// import './App.css';

// function App() {
  // const [formData, setFormData] = useState({ FirstName: '', LastName: '', Email: '', Country: '', Address: '', City: '', State: '', Zip: '', Suscribe:false, Commentator:false, Viewers:false, radio:""});
  // function changeHandler(event) {
  //   const {name, value, checked,type} = event.target
  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData, [name]: type == 'checkbox' ? checked : value
  //     }
  //   })
  // }

//   const submitHandler = (event) =>{
//       event.preventDefault();

//       console.log(formData);
//   }
//   return (
//     <form className="App" onSubmit={submitHandler}>
//       <label>First Name</label><br />
//       <input type="text"
//         value={formData.FirstName}
//         placeholder="FirstName"
//         name="FirstName"
//         onChange={changeHandler}>
//       </input><br />

//       <label>Last Name</label><br />
//       <input type="text"
//         value={formData.LastName}
//         placeholder="LastName"
//         name="LastName"
//         onChange={changeHandler}>
//       </input><br />

//       <label>Email</label><br />
//       <input type="email"
//         value={formData.Email}
//         placeholder="Email"
//         name="Email"
//         onChange={changeHandler}>
//       </input><br />

//       <label>Country</label><br />
//       <select name='Country'
//         value={formData.Country}
//         placeholder="Select"
//         onChange={changeHandler}>
//         <option default hidden>Select</option>
//         <option>India</option>
//         <option>Australia</option>
//         <option>Canada</option>
//         <option>England</option>
//       </select><br />

//       <label>Street Address</label><br />
//       <input type="text"
//         value={formData.Address}
//         placeholder="Street Address"
//         name="Address"
//         onChange={changeHandler}>
//       </input><br />

//       <label>City</label><br />
//       <input type="text"
//         value={formData.City}
//         placeholder="City"
//         name="City"
//         onChange={changeHandler}>
//       </input><br />

//       <label>State/Provience</label><br />
//       <input type="text"
//         value={formData.State}
//         placeholder="State"
//         name="State"
//         onChange={changeHandler}>
//       </input><br />

//       <label>Zip/Postal code</label><br />
//       <input type="number"
//         value={formData.Zip}
//         placeholder="Zip"
//         name="Zip"
//         onChange={changeHandler}>
//       </input><br />
//       <fieldset>
//         <label>By Email</label><br />
//         <div>
//         <input type="checkbox"
//           checked={formData.Suscribe}
//           name="Suscribe"
//           onChange={changeHandler}>
//         </input>
//         <label>Suscribe</label><br />
//         <p>Get notified when someone post a subscribe</p>
//         </div>
//         <div>
//         <input type="checkbox"
//           checked={formData.Commentator}
//           name="Commentator"
//           onChange={changeHandler}>
//         </input>
//         <label>Commentator</label><br />
//         <p>Get notified when someone post a subscribe</p>
//         </div>
//         <div>
//         <input type="checkbox"
//           checked={formData.Viewers}
//           name="Viewers"
//           onChange={changeHandler}>
//         </input>
//         <label>Viewers</label><br />
//         <p>Get notified when someone post a subscribe</p>
//         </div>
//       </fieldset>

//       <fieldset>
//         <div>
//         <h3>Push Notification</h3>
//         <p>These are delivered via SMS to your mobile phone</p>
//         </div>
//         <div>
//           <input type="radio" value="Everything" id="radio" name="radio" onChange={changeHandler}></input>
//           <label for="radio" >EveryThing</label>
//           <input type="radio" value="Same as Email" id="radio" name="radio" onChange={changeHandler}></input>
//           <label>Same as email</label>
//           <input type="radio" value="No Push Notification" id="radio" name="radio" onChange={changeHandler}></input>
//           <label>No Push notification</label>
//         </div>
//       </fieldset>

//       <button type="submit">Save</button>
//     </form>
//   );
// }

// export default App;
