import React from "react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full h-screen flex justify-center items-center font-bold text-7xl">
        Welcome, Admin
      </main>
    </div>
  );
};

export default Dashboard;
