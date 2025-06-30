// import React, { createContext, useEffect, useState } from 'react'
// import { employeeAPI } from '../services/api'

// export const AuthContext = createContext()

// const AuthProvider = ({ children }) => {
//     const [userData, setUserData] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         fetchEmployees()
//     }, [])

//     const fetchEmployees = async () => {
//         try {
//             const response = await employeeAPI.getAllEmployees()
//             setUserData(response.data)
//         } catch (error) {
//             console.error('Error fetching employees:', error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     const refreshData = () => {
//         fetchEmployees()
//     }

//     return (
//         <AuthContext.Provider value={[userData, setUserData, refreshData, loading]}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthProvider

import React, { createContext, useEffect, useState } from "react";
import { authAPI, employeeAPI } from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    const stored = localStorage.getItem("loggedInUser");
    const response = await employeeAPI.getEmployee(JSON.parse(stored).data._id);
    // console.log(response.data[0]);
    if (stored) {
      const user = response.data[0];
      // setUserData(user.role === "admin" ? [] : [user]);
      if (user.role === "admin") {
        const res = await employeeAPI.getAllEmployees();
        // console.log(res.data)
        setUserData(res.data);
      } else {
        setUserData([user]);
      }
      // refreshData();
    }
    // setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      // setLoading(true);
      const res = await authAPI.login(email, password);
      const user = res.data;
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setUserData([user.data])
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      return { success: false, error: message };
    } finally {
      // setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUserData(null);
    setError(null);
  };

  const refreshData = async () => {
    const stored = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!stored) return;

    try {
      if (stored.role === "admin") {
        const res = await employeeAPI.getAllEmployees();
        setUserData(res.data);
      } else {
        const res = await employeeAPI.getEmployeeById(stored.data._id);
        const updatedUser = { ...stored, data: res.data };
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
        setUserData([res.data]);
      }
    } catch (err) {
      setError("Failed to refresh data");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        login,
        logout,
        error,
        loadUser,
        refreshData,
        isAuthenticated: () => !!userData,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
