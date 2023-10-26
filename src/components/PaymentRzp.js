import React from "react";
//import useRazorpay from "react-razorpay";
function PaymentRzp() {
  //const [Razorpay] = useRazorpay();

  const handlePayment = async () => {
    var instance = new Razorpay({
      key_id: `rzp_test_eTUkfD3gqLeX0A`, // Replace with your Razorpay API Key
      key_secret: `ROmYKYvRP3ujfMEfuAuId1zu`, // Replace with your Razorpay API Secret
    });
    //  Create order on your backend

    const options = {
      //key: "rzp_test_eTUkfD3gqLeX0A",
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",

     
      //   description: "Test Transaction",
      //   image: "https://example.com/your_logo",
      //   order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      //   handler: function (response) {
      //     alert(response.razorpay_payment_id);
      //     alert(response.razorpay_order_id);
      //     alert(response.razorpay_signature);
      //   },
      //   prefill: {
      //     name: "Piyush Garg",
      //     email: "youremail@example.com",
      //     contact: "9999999999",
      //   },
      //   notes: {
      //     address: "Razorpay Corporate Office",
      //   },
      //   theme: {
      //     color: "#3399cc",
      //   },
    };

    try {
      const order = await instance.orders.create(options);
      console.log(order);
    } catch (error) {
      console.error("Error creating order:", error);
    }
    // rzp1.on("payment.failed", function (response) {
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    // });

    // rzp1.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>CLick me</button>
    </div>
  );
}

export default PaymentRzp;
