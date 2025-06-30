import React, { useContext, useState } from "react";
import { taskAPI } from "../../services/api";
import { AuthContext } from "../../context/AuthProvider";

const AcceptTask = ({ data, employeeId }) => {
  const [loading, setLoading] = useState(false);
  const { loadUser } = useContext(AuthContext);

  const markCompleted = async () => {
    try {
      await taskAPI.updateTaskStatus(employeeId, data._id, "completed");
      await loadUser();
    } catch (error) {
      alert(
        "Error updating task: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const markFailed = async () => {
    if (!window.confirm("Are you sure you want to mark this task as failed?")) {
      return;
    }
    try {
      await taskAPI.updateTaskStatus(employeeId, data._id, "failed");
      await loadUser();
    } catch (error) {
      alert(
        "Error updating task: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-yellow-400 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="bg-red-600 text-white text-sm px-3 py-1 rounded font-medium">
          {data.category}
        </h3>
        <h4 className="text-sm font-medium text-gray-800">
          {new Date(data.taskDate).toLocaleDateString()}
        </h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold text-white mb-3">
        {data.taskTitle}
      </h2>
      <p className="text-sm mt-2 text-gray-800 leading-relaxed mb-4">
        {data.taskDescription}
      </p>
      <div className="flex justify-between gap-2 mt-auto">
        <button
          onClick={() => markCompleted()}
          className="bg-green-500 hover:bg-green-600 rounded font-medium py-2 px-3 text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white flex-1"
        >
          Mark Completed
        </button>
        <button
          onClick={() => markFailed()}
          className="bg-red-500 hover:bg-red-600 rounded font-medium py-2 px-3 text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white flex-1"
        >
          Mark Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
