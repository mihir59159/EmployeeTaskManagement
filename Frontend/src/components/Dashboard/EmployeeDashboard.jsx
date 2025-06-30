import React, { useContext, useState, useEffect } from "react";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import { AuthContext } from "../../context/AuthProvider";

const EmployeeDashboard = () => {
  const { userData,loadUser } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = async () => {
    // setRefreshing(true);
    try {
      await loadUser();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      // setRefreshing(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("loggedInUser");
      window.location.reload();
    }
  };

  const employeeData = userData?.[0];

  return (
    <div className="p-10 bg-[#1C1C1C] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Employee Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back, {employeeData?.firstName}!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleRefresh()}
            disabled={refreshing}
            className="bg-gray-700 cursor-pointer hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <svg
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {employeeData && (
        <>
          <TaskListNumbers data={employeeData} />
          <TaskList data={employeeData} />
        </>
      )}

    </div>
  );
};

export default EmployeeDashboard;
