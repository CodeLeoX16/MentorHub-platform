import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, Spin } from "antd";
import { HiOutlineClock, HiOutlineCurrencyRupee, HiArrowLeft, HiCalendar, HiCheckCircle } from "react-icons/hi2";
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
  const [bookingLoading, setBookingLoading] = useState(false);

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
        setAvailabilityError("No available slots found for this mentor.");
      }
    } catch (err) {
      setMentorAvailability([]);
      setAvailabilityError("Could not load availability. Please retry later.");
    }
    setLoadingAvailability(false);
  }, []);

  const getServiceData = useCallback(async () => {
    try {
      const res = await service.getServiceById(id);
      const serviceObj = res?.data?.service;
      setServiceData(serviceObj);
      if (serviceObj?.mentor && serviceObj?.duration) {
        getMentorAvailability(serviceObj.mentor, serviceObj.duration);
      }
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  }, [getMentorAvailability, id]);

  useEffect(() => {
    getServiceData();
  }, [getServiceData]);

  const onBookServiceClick = async () => {
    if (!selectedSlot) return;
    setBookingLoading(true);
    try {
      const res = await booking.bookService({
        serviceId: id,
        dateAndTime: selectedSlot,
      });
      
      const orderId = res?.data?.order?.id;
      const bookingId = res?.data?.booking?._id;

      if (!orderId || !bookingId) {
        throw new Error("Invalid booking order response received.");
      }

      handlePayment(orderId, async (response) => {
        try {
          await booking.confirmBooking({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            bookingId: bookingId,
          });
          navigate("/success");
        } catch (confirmError) {
          console.error("Booking confirmation failed:", confirmError);
        }
      });
    } catch (err) {
      console.error("Error initiating booking:", err);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Back Navigation Bar */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-purple-600 transition-colors"
          >
            <HiArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Service Details Summary Card */}
          <div className="md:col-span-4">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 space-y-6 sticky top-24">
              
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-3 py-1 rounded-md border border-purple-400/30">
                  Selected Service
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  {serviceData?.name || "Mentorship Session"}
                </h2>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10 text-slate-200">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 rounded-xl bg-white/10 text-purple-300">
                    <HiOutlineCurrencyRupee size={18} />
                  </div>
                  <span className="font-bold text-lg text-white">₹{serviceData?.price || 0}</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 rounded-xl bg-white/10 text-purple-300">
                    <HiOutlineClock size={18} />
                  </div>
                  <span>{serviceData?.duration || 0} minutes 1-on-1 video call</span>
                </div>
              </div>

              {serviceData?.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  {serviceData.description}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Date & Slot Selection Panel */}
          <div className="md:col-span-8">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
              
              {/* Step 1: Select Date */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">1</span>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Select Date</h3>
                </div>

                {loadingAvailability ? (
                  <div className="flex justify-center py-12">
                    <Spin size="large" />
                  </div>
                ) : availabilityError ? (
                  <div className="p-4 text-center bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-sm">
                    {availabilityError}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {mentorAvailability?.map((item, index) => {
                      const isSelected = activeIndex === index;
                      return (
                        <button
                          type="button"
                          key={item.id || index}
                          onClick={() => {
                            setActiveIndex(index);
                            setSelectedSlot(null);
                          }}
                          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-semibold transition-all ${
                            isSelected
                              ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20 scale-[1.02]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-slate-100/80"
                          }`}
                        >
                          <HiCalendar className={isSelected ? "text-white" : "text-slate-400"} />
                          <span>{moment(item.date).format("DD MMM YYYY")}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step 2: Select Time Slot */}
              {activeIndex !== null && mentorAvailability?.[activeIndex] && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">2</span>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Select Time Slot</h3>
                  </div>

                  <div className="flex flex-wrap gap-3 max-h-60 overflow-y-auto pr-1">
                    {mentorAvailability[activeIndex]?.slots?.map((slot) => {
                      const isSlotSelected = selectedSlot === slot.fullStart;
                      return (
                        <button
                          type="button"
                          key={slot.id || slot.fullStart}
                          onClick={() => setSelectedSlot(slot.fullStart)}
                          className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            isSlotSelected
                              ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20 font-semibold"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-slate-100"
                          }`}
                        >
                          {slot.startTime}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={selectedSlot === null || bookingLoading}
                  onClick={onBookServiceClick}
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    selectedSlot === null || bookingLoading
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                      : "bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-purple-600/30 hover:brightness-110 active:scale-[0.99]"
                  }`}
                >
                  {bookingLoading ? (
                    <Spin size="small" />
                  ) : (
                    <>
                      <HiCheckCircle className="text-lg" />
                      <span>Confirm &amp; Proceed to Payment</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Booking;