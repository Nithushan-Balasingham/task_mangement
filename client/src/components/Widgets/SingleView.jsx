import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Button from "./Button";
import apiService from "../../service/ApiService";

const SingleView = ({ responseData }) => {
  console.log("Response", responseData);
  const accessToken = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleBack = () => {
    navigate("/tasks");
  };
  const token = accessToken.currentUser.accessToken;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');   
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
  
    return `${month}.${day}.${year}`;
  };
  const deleteTask = async () => {
    try {
     

     
      const response = await apiService.deleteTask(id, token)
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
          <div className="text-2xl font-bold">{responseData.title}</div>
          <MdDeleteOutline
            className="text-xl text-red-400 cursor-pointer"
            onClick={() => {
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
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 text-left mr-3">Title:</div>
          <div className="text-lg font-semibold text-gray-800 flex-1 text-left ">
            {responseData.title}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 text-left mr-4">Priority:</div>
          <div className="text-lg font-semibold text-gray-800 flex-1  text-left ">
            {responseData.priority === "high" ? (
              <span className="text-red-400">High</span>
            ) : responseData.priority === "medium" ? (
              <span className="text-yellow-400">Medium</span>
            ) : responseData.priority === "low" ? (
              <span className="text-orange-400">Low</span>
            ) : (
              "N/A"
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 text-left mr-2">Description:</div>
          <p className="text-lg font-semibold text-gray-800 flex-1  text-left ">
            {responseData.description ? (responseData.description) : "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex-1 text-left mr-5">Due Date:</div>
          <div className="text-lg font-semibold text-gray-800 flex-1  text-left ">
            {formatDate(responseData.due_date)}
          </div>
        </div>
      </div>
      <Button
        label="Back"
        type="button"
        onClick={handleBack}
        styles="bg-red-500 mt-5 hover:bg-red-400 mt-2 text-white font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default SingleView;
