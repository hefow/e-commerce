
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./dashboard/SideBar"; // Sidebar component
// import NewProduct from "./components/newProduct"; // Path to NewProduct
// import ProductList from "./components/productList"; // Path to ProductList
// import NotFoundPage from "./components/notFoundPage"; // Custom 404 page
// import Overview from "./dashboard/Overview";
// import Header from "./dashboard/Header";

// function App() {
//   return (
//     <Router>
//       <div className="flex">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content Area */}
//         <div className="ml-64 flex-grow">
//           {/* Header */}
//           <Header/>

//           {/* Page Content */}
//           <div className="p-4">
//             <Routes>
//               {/* Redirect root "/" to "/dashboard" */}
//               <Route path="/" element={<Overview />} />
//               {/* Pages */}
//               <Route path="/products/new" element={<NewProduct />} />
//               <Route path="/products" element={<ProductList />} />
//               {/* Catch-all route for 404 pages */}
//               <Route path="*" element={<NotFoundPage />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//     // <Router>
//     //   <div className="flex">
//     //       {/* Sidebar */}
//     //       <Sidebar />

//     //       {/* Main Content Area */}
//     //       <div className="ml-64 p-4 flex-grow">
//     //       {/* <div className="flex-1 p-4"> */}
//     //         <Routes>
//     //           {/* Redirect root "/" to "/dashboard" */}
//     //           <Route path="/" element={<Overview/>} />
//     //           {/* Pages */}
//     //           <Route path="/products/new" element={<NewProduct />} />
//     //           <Route path="/products" element={<ProductList />} />
//     //           {/* Catch-all route for 404 pages */}
//     //           <Route path="*" element={<NotFoundPage />} />
//     //         </Routes>
//     //       {/* </div> */}
//     //       </div>
//     //       </div>
//     // </Router>
//   );
// }

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./dashboard/SideBar"; 
import NewProduct from "./components/newProduct"; 
import ProductList from "./components/productList"; 
import NotFoundPage from "./components/notFoundPage"; 
import Overview from "./dashboard/Overview";
import Header from "./dashboard/Header";
import Login from "./components/Login"; // Login Component
import SignUp from "./components/SignUp";

function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock login function
  const handleLogin = () => setIsAuthenticated(true);

  // Protected Route component
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="flex">
        {/* Show Sidebar only if authenticated */}
        {isAuthenticated && <Sidebar />}

        <div className={isAuthenticated ? "ml-64 flex-grow" : "flex-grow"}>
          {isAuthenticated && <Header />}

          <div className="p-4">
            <Routes>
              {/* Login Route */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
              {/* Protected Routes */}
              <Route
                path="/"
                element={<ProtectedRoute element={<Overview />} />}
              />
              <Route
                path="/products/new"
                element={<ProtectedRoute element={<NewProduct />} />}
              />
              <Route
                path="/products"
                element={<ProductList />}
              />
              

              {/* Catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

