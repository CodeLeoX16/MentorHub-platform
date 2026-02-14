import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, Spin } from "antd";
import { FaClock } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import service from "../apiManger/service";
import availability from "../apiManger/availability";
import moment from "moment";
import booking from "../apiManger/booking";
import handlePayment from "../components/Checkout";
import Layout from "../components/Layout";

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [mentorAvailability, setMentorAvailability] = useState(null);
  const [availabilityError, setAvailabilityError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  const getMentorAvailability = useCallback(async (mentorId, duration) => {
    setLoadingAvailability(true);
    try {
      const res = await availability.getMentorAvailability(mentorId, duration);
      const avail = res?.data?.availability;
      if (Array.isArray(avail) && avail.length > 0) {
        setMentorAvailability(avail);
        setAvailabilityError(null);
      } else {
        setMentorAvailability([]);
        setAvailabilityError("No available slots for this mentor.");
      }
    } catch (err) {
      setMentorAvailability([]);
      setAvailabilityError("Could not load availability. Please retry.");
    }
    setLoadingAvailability(false);
  }, []);

  const getServiceData = useCallback(async () => {
    const res = await service.getServiceById(id);
    setServiceData(res?.data?.service);
    getMentorAvailability(
      res?.data?.service?.mentor,
      res?.data?.service?.duration
    );
  }, [getMentorAvailability, id]);

  useEffect(() => {
    getServiceData();
  }, [getServiceData]);

  const onBookServiceClick = async () => {
    const res = await booking.bookService({
      serviceId: id,
      dateAndTime: selectedSlot,
    });
    handlePayment(res.data.order.id, async (response) => {
      await booking.confirmBooking({
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        bookingId: res.data.booking._id,
      });
      navigate("/success");
    });
  };

  return (
    <Layout>
      <div className="container flex flex-col p-4 mx-auto gap-4 md:flex-row md:space-x-4">
        <div className="md:w-1/3">
          <Card className="text-white bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md">
            <div className="flex items-center mb-4">
              <AiOutlineArrowLeft className="mr-2 text-xl" />
              <h2 className="text-xl font-bold sm:text-2xl">
                {serviceData?.name}
              </h2>
            </div>
            <div className="flex items-center mb-2">
              <MdOutlineCurrencyRupee className="mr-2 text-xl " />
              <span>{serviceData?.price}</span>
            </div>
            <div className="flex items-center mb-4">
              <FaClock className="mr-2" />
              <span>{serviceData?.duration} mins meeting</span>
            </div>
            <p className="text-sm text-blue-50/90">{serviceData?.description}</p>
          </Card>
        </div>
        <div className="md:w-2/3">
          <Card className="p-4 shadow-md">
            <h3 className="mb-2 text-lg font-semibold">Select Date</h3>
            {loadingAvailability ? (
              <div className="flex items-center justify-center h-full">
                <Spin size="large" />
              </div>
            ) : availabilityError ? (
              <div className="p-4 text-center text-red-600">
                {availabilityError}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 my-6">
                {mentorAvailability?.map((item, index) => (
                  <div
                    onClick={() => {
                      setActiveIndex(index);
                      setSelectedSlot(null);
                    }}
                    key={item.id}
                    className={`px-3 py-2 rounded-md border cursor-pointer transition ${
                      activeIndex === index
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-800 hover:border-blue-300"
                    }`}
                  >
                    {moment(item.date).format("DD MMM")}
                  </div>
                ))}
              </div>
            )}

            {activeIndex !== null && mentorAvailability?.[activeIndex] && (
              <>
                <h3 className="mb-2 text-lg font-semibold">Select Time Slot</h3>
                <div className="flex flex-wrap gap-2 my-6 overflow-x-auto">
                  {mentorAvailability[activeIndex]?.slots?.map((slot) => (
                    <div
                      onClick={() => setSelectedSlot(slot.fullStart)}
                      key={slot.id}
                      className={`px-3 py-2 rounded-md border cursor-pointer transition ${
                        selectedSlot === slot.fullStart
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-100 text-gray-800 hover:border-blue-300"
                      }`}
                    >
                      {slot.startTime}
                    </div>
                  ))}
                </div>
              </>
            )}

            <Button
              disabled={selectedSlot === null}
              type="primary"
              block
              size="large"
              onClick={onBookServiceClick}
            >
              Book Session
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
