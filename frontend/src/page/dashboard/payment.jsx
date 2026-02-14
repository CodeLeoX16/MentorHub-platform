import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Button, Spin, Tag, Tooltip } from "antd";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import Dashboard from "./dashboard";
import bookingApi from "../../apiManger/booking";
import useUserStore from "../../store/user";
import moment from "moment";

const Payment = () => {
  const { user } = useUserStore();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const res =
        user?.role === "mentor"
          ? await bookingApi.getMentorBookings()
          : await bookingApi.getStudentBookigs();
      setRows(res?.data?.bookings || []);
    } catch (err) {
      setRows([]);
    }
    setLoading(false);
  }, [user?.role]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const columns = useMemo(
    () => [
      {
        title: "Booking ID",
        dataIndex: "_id",
        key: "_id",
        render: (val) => val?.slice(-6) || "-",
        width: 120,
      },
      {
        title: "Date",
        dataIndex: "dateAndTime",
        key: "dateAndTime",
        render: (text) => (text ? moment(text).format("DD MMM YYYY") : "-"),
      },
      {
        title: "Time",
        dataIndex: "dateAndTime",
        key: "time",
        render: (text) => (text ? moment(text).format("hh:mm A") : "-"),
        width: 120,
      },
      {
        title: "Amount",
        dataIndex: "price",
        key: "price",
        render: (price) => (price ? `₹${price}` : "-"),
        width: 120,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 140,
        render: (status) => (
          <Tag color={status === "confirmed" ? "green" : status === "pending" ? "orange" : "red"}>
            {status || "pending"}
          </Tag>
        ),
      },
    ],
    []
  );

  return (
    <Dashboard>
      <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MdOutlineCurrencyRupee className="text-3xl text-blue-600" />
            <h2 className="text-2xl font-bold">Payment History</h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Tooltip title="Refresh to pull the latest booking/payment status.">
              <Button onClick={fetchPayments} loading={loading}>
                Refresh
              </Button>
            </Tooltip>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Status updates automatically when a payment is confirmed. Use Refresh to see the latest.
        </p>
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={rows}
            pagination={{ pageSize: 5, showSizeChanger: false }}
            rowKey={(record) => record._id}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default Payment;
