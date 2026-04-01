import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import transactionApi from "../../apiManger/transaction";
import useUserStore from "../../store/user";
import { Button } from "antd";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const user = useUserStore().user;

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    const fetch = async () => {
      try {
        const res = await transactionApi.summary();
        // server returns { totals, byCategory }
        const totalsObj = { income: 0, expense: 0 };
        (res.data.totals || []).forEach((g) => {
          if (g._id === "income") totalsObj.income = g.total;
          if (g._id === "expense") totalsObj.expense = g.total;
        });
        const count = res.data.count || 0;
        setSummary({ totals: totalsObj, count });
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [user]);

  if (!user || user.role !== "admin") {
    return (
      <Dashboard>
        <div className="p-6">Access restricted to admins.</div>
      </Dashboard>
    );
  }

  const handleDownload = async () => {
    try {
      const blob = await transactionApi.exportCsv();
      console.log("CSV export blob:", blob);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transactions_${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("CSV downloaded");
    } catch (err) {
      console.error("CSV download error:", err);
      if (err.response) {
        console.error("response status:", err.response.status, err.response.data);
      }
      toast.error("Failed to download CSV");
    }
  };

  return (
    <Dashboard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
          <div>
            <Button type="primary" onClick={handleDownload}>
              Download CSV
            </Button>
          </div>
        </div>
        {summary ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow rounded">
              <div className="text-sm text-gray-500">Total Income</div>
              <div className="text-2xl font-bold">{summary.totals.income}</div>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <div className="text-sm text-gray-500">Total Expense</div>
              <div className="text-2xl font-bold">{summary.totals.expense}</div>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <div className="text-sm text-gray-500">Transactions</div>
              <div className="text-2xl font-bold">{summary.count}</div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </Dashboard>
  );
};

export default AdminDashboard;
