import React, { useState } from "react";

const BugFilters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    date: null,
    priority: null,
    createdBy: null,
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    onFiltersChange({
      ...filters,
      [filterName]: value,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.date ? formatDate(filters.date) : ""}
            onChange={(e) =>
              handleFilterChange(
                "date",
                e.target.value ? new Date(e.target.value) : null
              )
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.priority || ""}
            onChange={(e) =>
              handleFilterChange("priority", e.target.value || null)
            }
          >
            <option value="">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Created By
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.createdBy || ""}
            onChange={(e) =>
              handleFilterChange("createdBy", e.target.value || null)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BugFilters;
