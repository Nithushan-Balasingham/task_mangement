import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TaskTable from "../../Widgets/TaskTable";
import NoData from "../../Widgets/NoData";
import { FiPlus } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi"; 
import Button from "../../Widgets/Button";
import { toast } from "react-toastify";
import { signOut } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import apiService from "../../../service/ApiService";

const AllTasks = () => {
  const accessToken = useSelector((state) => state.user);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = accessToken.currentUser.accessToken;
  const userName = accessToken.currentUser.userName;
  console.log(accessToken);

  const handleSignOut = () => {
    toast.success("LogOut Successfully", { position: "top-center" });
    dispatch(signOut());
  };

  const handleNavigate=(()=>{
    navigate('/addTask')
  })
  useEffect(() => {
    const getAllTasks = async () => {
      setLoading(true);
      const response = await apiService.getAllTasks(token)
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
            onClick={handleNavigate}
            title="Add Task"
          >
            <FiPlus />
          </span>
        </h3>
   
        <Button label= "Log Out" onClick={handleSignOut} icon={FiLogOut} styles={"flex items-center px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition duration-300"}/>
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
