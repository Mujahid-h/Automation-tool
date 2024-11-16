// import React, { useEffect } from "react";
// import DefaultLayout from "../components/DefaultLayout";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getBugs } from "../api/bugApi";

// const HomePage = () => {
//   const { token } = useSelector((state) => state.user);
//   console.log(token);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }
//     fetchBugs(token);
//   }, [token]);

//   const fetchBugs = async (token) => {
//     try {
//       const response = await getBugs(token);
//       console.log("Data: ", response);
//     } catch (error) {
//       console.log("Error ehile fetching bugs: ", error);
//     }
//   };

//   return <DefaultLayout></DefaultLayout>;
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBugs } from "../api/bugApi";
import CreateBugModal from "../components/CreateBugModal";
import DefaultLayout from "../components/DefaultLayout";

const HomePage = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBugs(token);
    }
  }, [token]);

  const fetchBugs = async (token) => {
    try {
      const response = await getBugs(token);
      setBugs(response);
    } catch (error) {
      console.log("Error while fetching bugs: ", error);
    }
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Date Created</th>
                <th className="px-4 py-2 text-left">Created By</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Priority</th>
              </tr>
            </thead>
            <tbody>
              {bugs.length > 0 ? (
                bugs.map((bug) => (
                  <tr
                    key={bug._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="px-4 py-2">
                      {new Date(bug.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{bug.createdBy}</td>
                    <td className="px-4 py-2">{bug.status}</td>
                    <td className="px-4 py-2">{bug.priority}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No bugs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-12 text-left">
          <button
            onClick={toggleModal}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Create New Bug
          </button>
        </div>

        {isModalOpen && <CreateBugModal onClose={toggleModal} />}
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
