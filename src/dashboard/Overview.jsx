import React, { useEffect, useState } from "react";
import axios from "axios";

function Overview() {
  const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
      });
    
      // Fetch stats from the API
      useEffect(() => {
        const fetchStats = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/dashboard-stats");
            setStats(response.data.data);
          } catch (error) {
            console.error("Error fetching stats:", error.message);
          }
        };
    
        fetchStats();
      }, []);  

  return (
  <div className="grid gap-4 md:grid-cols-2 ">   
    {/* Products Card */}
      
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <h3 className="mt-1 text-3xl font-semibold">{stats.totalProducts}</h3>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Orders Card */}
     {/* Orders Card */}
     <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h3 className="mt-1 text-3xl font-semibold">{stats.totalOrders}</h3>
          </div>
          <div className="rounded-full bg-purple-100 p-3">
            <svg
              className="h-6 w-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-purple-500"
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
