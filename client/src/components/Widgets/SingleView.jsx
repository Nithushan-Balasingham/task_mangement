import axios from "axios";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SingleView = ({ responseData }) => {
  console.log("Response", responseData);
  const accessToken = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = accessToken.currentUser.accessToken;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const deleteTask = async(taskID) => {
    try {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
  
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/tasks/${id}`,
          { headers }
        );
        toast.success("Task is Deleted Successfully");
        navigate("/tasks");
      } catch (error) {
        console.error("Error adding task:", error);
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
    <div className="flex flex-col items-center justify-center p-4">
      <div className=" px-20 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center mb-7 mt-4  gap-4">
        <div className="text-xl font-bold">View Task </div>
        <MdDeleteOutline className="text-xl text-red-400 cursor-pointer"   onClick={() => {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You will not be able to recover this Account and Todo lists!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteTask();
                    }
                  });
                }}/>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 text-left">Title:</div>
          <div className="text-lg font-semibold text-gray-800 flex-1 text-left ">
            {responseData.title}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 text-left">Priority:</div>
          <div className="text-lg font-semibold text-gray-800 flex-1  text-left ">
            {responseData.priority}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 text-left">Description:</div>
          <p className="text-lg font-semibold text-gray-800 flex-1  text-left ">{responseData.description}.</p>
        </div>
        <div className="flex items-start justify-center gap-4 mb-4">
          <div className="flex-1 text-left">Due Date:</div>
          <div className="text-md font-semibold text-gray-800 flex-1  text-left ">
            
            {formatDate(responseData.due_date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleView;
