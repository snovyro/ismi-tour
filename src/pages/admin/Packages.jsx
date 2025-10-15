import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/packages`
        );
        setPackages(response.data.data.packages);
      } catch (error) {}
    };

    getPackage();
  }, []);

  const handleAdd = () => {};
  const handleEdit = (id) => {};
  const handleDelete = (id) => {};

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Packages</h1>
          <Button
            width={20}
            textColor="white"
            bgColor="i-pink"
            text="Add Package"
            onClick={handleAdd}
          />
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border border-gray-300 p-4">#</th>
              <th className="border border-gray-300 p-4">Name</th>
              <th className="border border-gray-300 p-4">Airline</th>
              <th className="border border-gray-300 p-4">Duration</th>
              <th className="border border-gray-300 p-4">Price</th>
              <th className="border border-gray-300 p-4">Hotels</th>
              <th className="border border-gray-300 p-4">Inclusions</th>
              <th className="border border-gray-300 p-4 w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr key={pkg.id || index} className="text-center">
                <td className="border border-gray-300 p-4">{index + 1}</td>
                <td className="border border-gray-300 p-4">
                  {pkg.package_name}
                </td>
                <td className="border border-gray-300 p-4">{pkg.airline}</td>
                <td className="border border-gray-300 p-4">
                  {pkg.duration_days} Days
                </td>
                <td className="border border-gray-300 p-4">
                  Rp {pkg.price_start.toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 p-4">
                  {pkg.hotel_madinah} / {pkg.hotel_makkah}
                </td>
                <td className="border border-gray-300 p-4">
                  {pkg.inclusions?.join(", ")}
                </td>
                <td className="border border-gray-300 p-4 text-right w-40">
                  <div className="inline-flex gap-4">
                    <Button
                      width={10}
                      textColor="white"
                      bgColor="i-pink"
                      text="Edit"
                      onClick={() => handleEdit(pkg.id)}
                    />
                    <Button
                      width={10}
                      textColor="white"
                      bgColor="i-pink"
                      text="Delete"
                      onClick={() => handleDelete(pkg.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Packages;
