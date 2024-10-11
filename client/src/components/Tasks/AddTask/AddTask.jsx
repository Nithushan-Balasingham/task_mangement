import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import TaskDetailForm from "../../Widgets/TaskDetailForm";
import { useNavigate } from "react-router-dom";
import apiService from "../../../service/ApiService";

const AddTask = () => {
 const navigate = useNavigate()
  const accessToken = useSelector((state) => state.user);
  const token = accessToken.currentUser.accessToken;
const [loading, setLoading] = useState(false)
  const handleAddTask = async (data) => {
    try {
        setLoading(true)
    
    
        const response = await apiService.addTask(data, token)
        toast.success("Task is added Successfully")
        setLoading(false)
        navigate("/tasks")
        console.log('Task added successfully:', response.data);
    } catch (error) {
        console.error('Error adding task:', error);
        setLoading(false)
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
};


  return (
<div className="bg-white min-h-screen flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold mb-7">Add Task</h3>
        <div className="flex items-center justify-center w-full ">
     
          <TaskDetailForm onSubmit={handleAddTask} loading={loading} />
        </div>
      </div>
  );
};

export default AddTask;
