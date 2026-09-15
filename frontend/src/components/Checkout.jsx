import { RAZORPAY_KEY_ID } from "../const/env.const";

/**
 * Dynamically loads an external script (such as the Razorpay SDK).
 * @param {string} src - The URL of the script to load.
 * @returns {Promise<boolean>} - Resolves to true if loaded successfully, false otherwise.
 */
const loadScript = (src) => {
  return new Promise((resolve) => {
    // Check if the script is already present in the DOM
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve(true);
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    
    document.body.appendChild(script);
  });
};

/**
 * Initiates the Razorpay checkout modal.
 * @param {string} orderId - The backend-generated Razorpay order ID.
 * @param {Function} handler - Callback function executed upon successful payment response.
 * @param {Object} [userInfo={}] - Optional customer details (name, email, contact) to prefill the checkout.
 */
const handlePayment = async (orderId, handler, userInfo = {}) => {
  try {
    const isScriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!isScriptLoaded) {
      console.error("Razorpay SDK failed to load. Check your network connection.");
      alert("Payment gateway failed to load. Please check your internet connection and try again.");
      return;
    }

    if (!window.Razorpay) {
      console.error("Razorpay SDK is missing on the window object.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      order_id: orderId,
      handler: function (response) {
        console.log("Payment successful:", response);
        handler?.(response);
      },
      prefill: {
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        contact: userInfo?.contact || "",
      },
      theme: {
        color: "#7c3aed", // Matches your purple SaaS accent theme
      },
    };

    const paymentObject = new window.Razorpay(options);
    
    paymentObject.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      alert(`Payment failed: ${response.error.description || "Please try again."}`);
    });

    paymentObject.open();
  } catch (error) {
    console.error("An error occurred during payment initialization:", error);
  }
};

export default handlePayment;