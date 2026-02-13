const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:9900/v1";
const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

if (process.env.NODE_ENV === "development") {
	// helpful debug: show effective base URL in browser console
	// eslint-disable-next-line no-console
	console.log("[env] BASE_URL =", BASE_URL);
}

export { BASE_URL, RAZORPAY_KEY_ID };
