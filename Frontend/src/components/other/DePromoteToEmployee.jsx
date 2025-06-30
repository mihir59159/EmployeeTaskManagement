import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { employeeAPI } from "../../services/api";

const DePromoteToEmployee = () => {
  const { userData, loadUser } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
    loadUser();
  }, [userData]);

  const fetchEmployees = () => {
    const employeeList =
      userData?.filter((user) => user.role === "manager") || [];
    // console.log(employeeList)
    setEmployees(employeeList);
  };

  const promoteToManager = async (employeeId, employeeName) => {
    if (
      !window.confirm(
        `Are you sure you want to promote ${employeeName} to manager?`
      )
    ) {
      return;
    }

    try {
      await employeeAPI.updateRole(employeeId, "employee");
      fetchEmployees(); // Refresh local employee list
      alert(`${employeeName} has been promoted to manager successfully!`);
    } catch (error) {
      alert(
        "Error promoting employee: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5 pb-11">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          DePromote Manager to Employee
        </h2>
        <button
          onClick={() => fetchEmployees()}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm text-white"
        >
          Refresh
        </button>
      </div>

      {employees.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <p>No employees available for promotion.</p>
          <p className="text-sm mt-2">
            All users are either already managers or admins.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="border border-gray-600 p-4 rounded hover:border-purple-500 transition-colors"
            >
              <div className="mb-3">
                <h3 className="text-lg font-medium text-white">
                  {employee.firstName}
                </h3>
                <p className="text-gray-400 text-sm">{employee.email}</p>
                <p className="text-gray-400 text-sm capitalize">
                  Current Role: {employee.role}
                </p>
              </div>
              <button
                onClick={() =>
                  promoteToManager(employee._id, employee.firstName)
                }
                className="w-full bg-purple-500 hover:bg-purple-600 px-3 py-2 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white"
              >
                DePromote to Employee
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DePromoteToEmployee;
