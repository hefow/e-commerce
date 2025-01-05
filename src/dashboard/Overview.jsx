import React from "react";

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

  const monthlyData = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 84 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 67 },
    { month: "May", value: 89 },
    { month: "Jun", value: 76 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 ">
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

      {/* Monthly Chart */}
      <div className="col-span-full rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Monthly Overview</h3>
          <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>Last 30 days</option>
          </select>
        </div>
        <div className="mt-4 flex h-64 items-end justify-between space-x-2">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex w-full flex-col items-center">
              <div
                className="w-full rounded-t bg-blue-500 transition-all hover:bg-blue-600"
                style={{ height: `${data.value}%` }}
              ></div>
              <span className="mt-2 text-xs text-gray-500">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
