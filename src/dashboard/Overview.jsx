import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Overview() {
  // Mock data for stats (replace with actual data or API call)
  const stats = {
    products: {
      total: 1200,
      growth: 15,
      lastUpdated: "2 hours ago",
    },
    orders: {
      total: 950,
      growth: -8,
      lastUpdated: "4 hours ago",
    },
  };

  // Updated mock data for Pie Chart (Product distribution by category)
  const productDistribution = [
    { name: "Mobiles", value: 400 },
    { name: "Clothes", value: 300 },
    { name: "Watches", value: 200 },
    { name: "Laptops", value: 100 },
  ];

  // Mock data for Bar Chart (Top-selling products)
  const topSellingProducts = [
    { name: "iPhone 15", sales: 120 },
    { name: "Samsung Galaxy S22", sales: 90 },
    { name: "MacBook Pro", sales: 80 },
    { name: "Sony Headphones", sales: 70 },
    { name: "Nike Shoes", sales: 60 },
  ];

  // Colors for Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Products Card */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <h3 className="mt-1 text-3xl font-semibold">{stats.products.total}</h3>
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
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              stats.products.growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stats.products.growth >= 0 ? "+" : ""}
            {stats.products.growth}%
          </span>
          <span className="ml-2 text-sm text-gray-500">{stats.products.lastUpdated}</span>
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
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h3 className="mt-1 text-3xl font-semibold">{stats.orders.total}</h3>
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
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              stats.orders.growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stats.orders.growth >= 0 ? "+" : ""}
            {stats.orders.growth}%
          </span>
          <span className="ml-2 text-sm text-gray-500">{stats.orders.lastUpdated}</span>
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

      {/* Pie Chart - Product Distribution by Category */}
      <div className="col-span-full rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Product Distribution by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={productDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {productDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Top Selling Products */}
      <div className="col-span-full rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topSellingProducts}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Overview;