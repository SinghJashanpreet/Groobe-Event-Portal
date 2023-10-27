//key: `rzp_test_eTUkfD3gqLeX0A`, // Replace with your Razorpay API Key
//key_secret: `ROmYKYvRP3ujfMEfuAuId1zu`, // Replace with your Razorpay API Secret
// Import necessary libraries and components
import React from "react";
import useRazorpay from "react-razorpay";

function PaymentRzp() {
  const [Razorpay] = useRazorpay();

  const handlePayment = async (params) => {
    try {
      // const orderID = await createOrder(params); // Create order on your backend
      const orderID = "order_9A33XWu170gUtm"; // Create order on your backend

      // Define the options for the Razorpay payment
      const options = {
        key: "rzp_test_eTUkfD3gqLeX0A", // Your Razorpay API Key
        amount: "5000", // Amount is in currency subunits (paise)
        // Other payment options...
        //order_id: orderID, // Use the order ID obtained from the createOrder function
        handler: function (response) {
          // Handle the payment response
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Piyush Garg",
          email: "jashanpreet6081@gmail.com",
          contact: "9464115434",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Create a new Razorpay instance and open the payment modal
      const rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        // Handle payment failure
        // Alert or handle as needed
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Click me</button>
    </div>
  );
}

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }

// function PaymentRzp() {
//   async function displayRazorpay() {
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       alert("Razropay failed to load!!");
//       return;
//     }

//     // const data = await fetch('http://localhost:1769/razorpay', {method: 'POST'}).then((t) =>
//     //   t.json()
//     // )

//     // console.log(data)

//     const options = {
//       key: "rzp_test_eTUkfD3gqLeX0A", // Enter the Key ID generated from the Dashboard
//       amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency: "INR",
//       // "name": "Acmecorp",
//       // "description": "Test Transaction",
//       //"image": "https://example.com/your_logo",
//       //"order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       // "callback_url":"http://localhost:1769/verify",
//       // "notes": {
//       //     "address": "Razorpay Corporate Office"
//       // },
//       // "theme": {
//       //     "color": "#3399cc"
//       // }
//     };
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" />    */}
//         <button onClick={displayRazorpay}>Pay now</button>
//       </header>
//     </div>
//   );
// }

export default PaymentRzp;
