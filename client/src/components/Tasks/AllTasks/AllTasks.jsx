import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import TaskTable from "../../Widgets/TaskTable";
import NoData from "../../Widgets/NoData";
import { FiPlus } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi"; // Import the logout icon

const AllTasks = () => {
  const accessToken = useSelector((state) => state.user);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = accessToken.currentUser.accessToken;
  const userName = accessToken.currentUser.userName;
  console.log(accessToken);

  useEffect(() => {
    const getAllTasks = async () => {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Tets", response.data);
      setResponseData(response.data);
      setLoading(false);
    };
    getAllTasks();
  }, [token]);

  return (
    <div className="p-4">
      <div className="flex items-center flex-col mb-8">
        <h3 className="text-2xl  text-green-400 mb-9 font-semibold mt-8 flex items-center justify-center gap-4">
          Welcome to App {userName}{" "}
          <span
            className=" cursor-pointer text-red-400 border rounded-full border-red-400 hover:text-red-600 hover:border-red-600"
            title="Add Task"
          >
            <FiPlus />
          </span>
        </h3>
        <button className="flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-300">
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>

      {responseData.length > 0 ? (
        <TaskTable responseData={responseData} loading={loading} />
      ) : (
        <NoData />
      )}
      <div className="p-4"></div>
    </div>
  );
};

export default AllTasks;
