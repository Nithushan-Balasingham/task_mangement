import React, { useState } from "react";
import Loader from "./Loader";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const TaskTable = ({ responseData , loading}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate()
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const formatDate = (isoString) => {
    return isoString.split("T")[0];
  };
 const handleSingleView=(id)=>{
  navigate(`/task/${id}`)
 }
  const filteredTasks = responseData
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedPriority ? item.priority === selectedPriority : true
    )
    .filter((item) => (dueDate ? formatDate(item.due_date) === dueDate : true));

  return (
    <div>
   <div className="flex flex-col sm:flex-row items-start sm:items-center px-4 w-full gap-4">
        <div>
          <label className="text-md font-semibold">Select a Priority</label>

          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <input
              type="text"
              id="table-search"
              value={searchTerm}
              onChange={handleSearch}
              className="block pt-2 ps-10 pb-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search by Title"
            />
          </div>
        </div>

        <div className="mt-1">
          <label className="text-md font-semibold">Select a Priority</label>
          <select
            value={selectedPriority}
            onChange={handlePriorityChange}
            className="block w-40 p-2 text-sm border rounded-lg    border-gray-600 placeholder-gray-400 text-gray-600 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">None</option>
            <option value="low" className="text-orange-400 font-bold">
              Low{" "}
            </option>
            <option value="medium" className="text-yellow-400 font-bold">
              Medium
            </option>
            <option value="high" className="text-red-400 font-bold">
              High
            </option>
          </select>
        </div>

        <div className="mt-1">
          <label className="text-md font-semibold">Select a Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            className="block w-40 p-2 text-sm border rounded-lg    border-gray-600 placeholder-gray-400 text-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    {loading ? (<div className="flex items-center justify-center mt-8">
      <Loader/>
    </div>):(
        <div className="relative overflow-x-auto sm:rounded-lg p-4 mt-8">
        <table className="w-full text-sm text-left rtl:text-right rounded-sm text-gray-500 border border-gray-700 ">
          <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 border-r border-gray-700">
                Title
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-700">
                Description
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-700">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-700">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks?.map((item, index) => (
              <tr
                className="bg-white border-b border-gray-700 hover:bg-gray-50"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap border-r border-gray-700"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4 border-r border-gray-700">
                  {item.description ? (item.description) :("N/A")}
                </td>
                <td className="px-6 py-4 border-r border-gray-700  ">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2  ${
                      item.priority === "low"
                        ? "bg-orange-400"
                        : item.priority === "medium"
                        ? "bg-yellow-400"
                        : item.priority === "high"
                        ? "bg-red-400"
                        : ""
                    }`}
                  ></span>
                  {item.priority === "low" ? (
                    "Low"
                  ) : item.priority === "medium" ? (
                    <span className="font-semibold">Medium</span>
                  ) : (
                    <span className="font-bold">High</span>
                  )}
                </td>
                <td className="px-6 py-4 border-r border-gray-700">
                  {formatDate(item.due_date)}
                </td>
                <td className="px-6 py-4" onClick={()=>handleSingleView(item.id)}>
                  <GrView className="text-blue-400 text-xl cursor-pointer"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    </div>
  );
};

export default TaskTable;
