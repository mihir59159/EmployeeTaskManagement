import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { employeeAPI } from "../../services/api";

const CreateManager = () => {
  const { userData, setUserData, refreshData } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const adminData = JSON.parse(localStorage.getItem("loggedInUser"));
      await employeeAPI.createManager({
        firstName,
        email,
        password,
        createdBy: adminData.data._id,
      });

      // Reset form
      setFirstName("");
      setEmail("");
      setPassword("");

      // Refresh data
      refreshData();
      alert("Manager created successfully!");
    } catch (error) {
      alert("Error creating manager: " + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-5 rounded">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Create New Manager
      </h2>
      <form onSubmit={submitHandler} className="flex gap-5">
        <div className="flex-1">
          <h3 className="text-sm text-gray-300 mb-0.5">First Name</h3>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-sm py-1 px-2 text-gray-200 w-full rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
            type="text"
            placeholder="Manager Name"
            required
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-gray-300 mb-0.5">Email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm py-1 px-2 w-full text-gray-200 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
            type="email"
            placeholder="manager@example.com"
            required
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-gray-300 mb-0.5">Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-sm py-1 px-2 w-full text-gray-200 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
            type="text"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 py-2 hover:bg-blue-600 px-5 rounded text-sm mb-4 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Manager"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateManager;
