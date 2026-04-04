import React from "react";
import Dashboard from "./dashboard";
import transactionApi from "../../apiManger/transaction";
import useUserStore from "../../store/user";
import { Button } from "antd";
import toast from "react-hot-toast";

const TransactionsPage = () => {
  const handleDownload = async () => {
    try {
      const res = await transactionApi.exportCsv();
      const blob = new Blob([res.data], { type: "text/csv" });
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
      console.error(err);
      toast.error("Failed to download CSV");
    }
  };

  return (
    <Dashboard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Transactions</h2>
          <div>
            {useUserStore().user?.role === "admin" ? (
              <Button type="primary" onClick={handleDownload}>
                Download CSV
              </Button>
            ) : (
              <span className="text-sm text-gray-500">Admin only</span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500">Admins can download all transactions as CSV.</p>
      </div>
    </Dashboard>
  );
};

export default TransactionsPage;
