import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import transactionApi from "../../apiManger/transaction";
import mentorApi from "../../apiManger/mentor";
import adminApi from "../../apiManger/admin";
import serviceApi from "../../apiManger/service";
import useUserStore from "../../store/user";
import { Button, Modal } from "antd";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [stats, setStats] = useState([]);
  const [counts, setCounts] = useState(null);
  const [bookingStats, setBookingStats] = useState({ byMentor: [], byUser: [] });
  const [allServices, setAllServices] = useState([]);
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
    const fetchMentors = async () => {
      try {
        const res = await mentorApi.getAllMentors();
        setMentors(res.data.mentors || []);
      } catch (err) {
        console.error("fetch mentors", err);
      }
      try {
        const s = await mentorApi.getMentorStats();
        setStats(s.data.stats || []);
      } catch (err) {
        // ignore if not authorized locally
      }
      try {
        const c = await adminApi.getCounts();
        setCounts(c.data || null);
      } catch (err) {
        // ignore
      }
      try {
        const b = await adminApi.getBookingStats();
        setBookingStats(b.data || { byMentor: [], byUser: [] });
      } catch (err) {
        // ignore
      }
      try {
        const sr = await serviceApi.getAllServicesAdmin();
        setAllServices(sr.data.services || []);
      } catch (err) {
        // ignore
      }
    };
    fetchMentors();
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

        {counts && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white shadow rounded">
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-2xl font-bold">{counts.totalUsers}</div>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <div className="text-sm text-gray-500">Mentees (students)</div>
              <div className="text-2xl font-bold">{counts.menteeCount}</div>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <div className="text-sm text-gray-500">Mentors</div>
              <div className="text-2xl font-bold">{counts.mentorCount}</div>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <div className="text-sm text-gray-500">Total Bookings</div>
              <div className="text-2xl font-bold">{counts.totalBookings}</div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Mentor Growth</h3>
          {stats && stats.length ? (
            <div className="w-full bg-white p-4 shadow rounded">
              <svg viewBox="0 0 600 120" className="w-full h-32">
                {(() => {
                  const max = Math.max(...stats.map((s) => s.count), 1);
                  return stats.map((s, i) => {
                    const x = (i * 560) / Math.max(stats.length - 1, 1) + 20;
                    const h = (s.count / max) * 80;
                    const y = 100 - h;
                    const label = `${s._id.year}-${String(s._id.month).padStart(2, "0")}`;
                    return (
                      <g key={i}>
                        <rect x={x - 12} y={y} width="24" height={h} fill="#3b82f6" rx="4" />
                        <text x={x} y="112" fontSize="10" textAnchor="middle">{label}</text>
                      </g>
                    );
                  });
                })()}
              </svg>
            </div>
          ) : (
            <div className="text-gray-500">No growth data available.</div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Bookings by Mentor</h3>
          <div className="bg-white p-4 shadow rounded">
            {bookingStats.byMentor && bookingStats.byMentor.length ? (
              <div className="space-y-2">
                {bookingStats.byMentor.map((b) => (
                  <div key={b.mentor?._id || b._id} className="flex justify-between">
                    <div>{b.mentor?.name || b.mentor?.username || 'Unknown'}</div>
                    <div className="font-semibold">{b.count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No booking stats available.</div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Bookings by Mentee</h3>
          <div className="bg-white p-4 shadow rounded">
            {bookingStats.byUser && bookingStats.byUser.length ? (
              <div className="space-y-2">
                {bookingStats.byUser.map((b) => (
                  <div key={b.user?._id || b._id} className="flex justify-between">
                    <div>{b.user?.name || b.user?.username || 'Unknown'}</div>
                    <div className="font-semibold">{b.count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No booking stats available.</div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Manage Mentors</h3>
          <div className="bg-white p-4 shadow rounded">
            {mentors.length ? (
              <div className="space-y-3">
                {mentors.map((m) => (
                  <div key={m._id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-semibold">{m.name || m.username}</div>
                      <div className="text-sm text-gray-500">{m.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a className="text-sm text-blue-600" href={`/mentor/${m.username}`}>View</a>
                      <Button
                        danger
                        size="small"
                        onClick={() => {
                          Modal.confirm({
                            title: "Delete mentor",
                            content: "Delete this mentor? This cannot be undone.",
                            okText: "Delete",
                            okType: "danger",
                            onOk: async () => {
                              try {
                                await mentorApi.deleteMentor(m._id);
                                toast.success("Mentor deleted");
                                setMentors((cur) => cur.filter((x) => x._id !== m._id));
                              } catch (err) {
                                console.error(err);
                                toast.error("Failed to delete mentor");
                              }
                            },
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No mentors found.</div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Manage Services</h3>
          <div className="bg-white p-4 shadow rounded">
            {allServices.length ? (
              <div className="space-y-2">
                {allServices.map((s) => (
                  <div key={s._id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-sm text-gray-500">{s.description}</div>
                      <div className="text-sm text-gray-500">Mentor: {s.mentor?.name || s.mentor?.username}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm">Active</div>
                      <input
                        type="checkbox"
                        checked={!!s.active}
                        onChange={async (e) => {
                          try {
                            const updated = await serviceApi.updateServiceAdmin(s._id, { active: e.target.checked });
                            setAllServices((cur) => cur.map((x) => (x._id === s._id ? updated.data.service : x)));
                            toast.success("Service updated");
                          } catch (err) {
                            console.error(err);
                            toast.error("Failed to update service");
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No services found.</div>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default AdminDashboard;
