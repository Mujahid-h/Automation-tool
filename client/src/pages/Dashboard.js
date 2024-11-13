// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Loading from "../components/Loading";

// function Dashboard() {
//   const [bugs, setBugs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showNewBugModal, setShowNewBugModal] = useState(false);
//   const [newBug, setNewBug] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Open",
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBugs();
//   }, []);

//   const fetchBugs = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/bugs", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setBugs(data);
//     } catch (error) {
//       console.error("Error fetching bugs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateBug = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/bugs", newBug, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setShowNewBugModal(false);
//       fetchBugs();
//       setNewBug({
//         title: "",
//         description: "",
//         priority: "Medium",
//         status: "Open",
//       });
//     } catch (error) {
//       alert(error.response?.data?.message || "An error occurred");
//     }
//   };

//   if (loading) return <Loading />;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">My Bugs</h1>
//         <button
//           onClick={() => setShowNewBugModal(true)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Create New Bug
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {bugs.map((bug) => (
//           <div
//             key={bug._id}
//             onClick={() => navigate(`/bugs/${bug._id}`)}
//             className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
//           >
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">
//               {bug.title}
//             </h3>
//             <p className="text-gray-600 mb-4 line-clamp-2">{bug.description}</p>
//             <div className="flex justify-between items-center">
//               <span
//                 className={`px-2 py-1 rounded-full text-sm font-medium ${
//                   bug.priority === "High"
//                     ? "bg-red-100 text-red-800"
//                     : bug.priority === "Medium"
//                     ? "bg-yellow-100 text-yellow-800"
//                     : "bg-green-100 text-green-800"
//                 }`}
//               >
//                 {bug.priority}
//               </span>
//               <span
//                 className={`px-2 py-1 rounded-full text-sm font-medium ${
//                   bug.status === "Open"
//                     ? "bg-blue-100 text-blue-800"
//                     : bug.status === "In Progress"
//                     ? "bg-purple-100 text-purple-800"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {bug.status}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* New Bug Modal */}
//       {showNewBugModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <h2 className="text-xl font-bold mb-4">Create New Bug</h2>
//             <form onSubmit={handleCreateBug} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   value={newBug.title}
//                   onChange={(e) =>
//                     setNewBug({ ...newBug, title: e.target.value })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   required
//                   rows="3"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   value={newBug.description}
//                   onChange={(e) =>
//                     setNewBug({ ...newBug, description: e.target.value })
//                   }
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Priority
//                 </label>
//                 <select
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   value={newBug.priority}
//                   onChange={(e) =>
//                     setNewBug({ ...newBug, priority: e.target.value })
//                   }
//                 >
//                   <option>Low</option>
//                   <option>Medium</option>
//                   <option>High</option>
//                 </select>
//               </div>
//               <div className="flex justify-end space-x-3 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setShowNewBugModal(false)}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Create Bug
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import BugTable from "../components/BugTable";
import BugFilters from "../components/BugFilters";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewBugModal, setShowNewBugModal] = useState(false);
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });
  const [filters, setFilters] = useState({
    date: null,
    priority: null,
    createdBy: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBugs();
  }, [filters]);

  const fetchBugs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/bugs", {
        params: filters,
      });
      setBugs(data);
    } catch (error) {
      console.error("Error fetching bugs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBug = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bugs", newBug, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setShowNewBugModal(false);
      fetchBugs();
      setNewBug({
        title: "",
        description: "",
        priority: "Medium",
        status: "Open",
      });
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bug Tracker</h1>
        <button
          onClick={() => setShowNewBugModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create New Bug
        </button>
      </div>

      <BugFilters onFiltersChange={handleFiltersChange} />
      <BugTable bugs={bugs} navigate={navigate} />

      {/* New Bug Modal */}
      {showNewBugModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Create New Bug</h2>
            <form onSubmit={handleCreateBug} className="space-y-4">
              {/* New bug form fields */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
