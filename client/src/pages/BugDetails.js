import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BugDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bug, setBug] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBug, setEditedBug] = useState(null);

  useEffect(() => {
    fetchBug();
  }, [id]);

  const fetchBug = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/bugs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBug(data);
      setEditedBug(data);
    } catch (error) {
      console.error(error);
      navigate("/dashboard");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/bugs/${id}`,
        editedBug,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBug(data);
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this bug?")) {
      try {
        await axios.delete(`http://localhost:5000/api/bugs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        navigate("/dashboard");
      } catch (error) {
        alert(error.response?.data?.message || "An error occurred");
      }
    }
  };

  if (!bug)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-500 hover:text-blue-700"
          >
            ← Back to Dashboard
          </button>
          <div className="space-x-4">
            {!isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={editedBug.title}
                onChange={(e) =>
                  setEditedBug({ ...editedBug, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={editedBug.description}
                onChange={(e) =>
                  setEditedBug({ ...editedBug, description: e.target.value })
                }
                className="w-full p-2 border rounded h-32"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Priority</label>
                <select
                  value={editedBug.priority}
                  onChange={(e) =>
                    setEditedBug({ ...editedBug, priority: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Status</label>
                <select
                  value={editedBug.status}
                  onChange={(e) =>
                    setEditedBug({ ...editedBug, status: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{bug.title}</h1>
              <p className="text-gray-600 whitespace-pre-wrap">
                {bug.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Priority:</span>
                <span
                  className={`ml-2 px-3 py-1 rounded inline-block ${
                    bug.priority === "High"
                      ? "bg-red-100 text-red-800"
                      : bug.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {bug.priority}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span
                  className={`ml-2 px-3 py-1 rounded inline-block ${
                    bug.status === "Open"
                      ? "bg-blue-100 text-blue-800"
                      : bug.status === "In Progress"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {bug.status}
                </span>
              </div>
            </div>
            <div className="border-t pt-4 mt-6">
              <p className="text-sm text-gray-500">
                Created: {new Date(bug.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Last Updated: {new Date(bug.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BugDetails;
