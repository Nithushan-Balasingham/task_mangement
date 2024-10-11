import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

import TaskDetailForm from "../../Widgets/TaskDetailForm";
import { useNavigate, useParams } from "react-router-dom";
import SingleView from "../../Widgets/SingleView";

const ViewTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const accessToken = useSelector((state) => state.user);
  const token = accessToken.currentUser.accessToken;
  const [viewMode, setViewMode] = useState(true);
  const [reponseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(id);
  useEffect(() => {
    const getSingleTask = async () => {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Tets", response.data);
      const taskData = {
        title: response.data.title,
        description: response.data.description,
        priority: response.data.priority,
        due_date: response.data.due_date ? 
            new Date(response.data.due_date).toISOString().split("T")[0] : ''
    };

      setResponseData(taskData);
      setLoading(false);
    };
    getSingleTask();
  }, [token, id]);

  
  const handleUpdateTask = async (data) => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${id}`,
        data,
        { headers }
      );
      toast.success("Task is Updated Successfully");
      setLoading(false);
      navigate("/tasks");
      console.log("Task added successfully:", response.data);
    } catch (error) {
      console.error("Error adding task:", error);
      setLoading(false);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <h3 className="text-2xl font-bold mb-7">{viewMode ? "View Task" : "Update Task"}</h3>
      <div className="flex flex-col items-center justify-center w-full ">
        {!viewMode ? (
          <div
            title="cancel"
            onClick={() => setViewMode(true)}
            className="mb-4  border  w-fit flex items-center justify-center  p-2 rounded-lg border-red-400 text-red-400 hover:text-red-600 cursor-pointer"
          >
            <MdOutlineCancel className="text-xl text-red-400 mr-3 hover:text-red-600 "  />{" "}
            Cancel
          </div>
        ) : (
          <div
            title="edit"
            onClick={() => setViewMode(false)}
            className="mb-4 flex items-center justify-center  rounded-lg border border-blue-400 w-fit p-2 text-blue-400 hover:text-blue-600 cursor-pointer"
          >
            <FiEdit3 className="text-xl text-blue-400 mr-3  hover:text-blue-600 " />{" "}
            Edit
          </div>
        )}
        {viewMode ? (
          <SingleView responseData={reponseData} />
        ) : (
          <TaskDetailForm
            onSubmit={handleUpdateTask}
            initialValues={reponseData}
            loading={loading}
            mode="update"
          />
        )}
      </div>
    </div>
  );
};

export default ViewTask;
