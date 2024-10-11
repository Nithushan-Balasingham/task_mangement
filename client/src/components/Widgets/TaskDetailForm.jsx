import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const TaskDetailForm = ({
  initialValues = {},
  onSubmit,
  mode = "add",
  loading,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialValues.title || "",
      description: initialValues.description || "",
      priority: initialValues.priority || "",
      due_date: initialValues.due_date || "",
    },
  });

  useEffect(() => {
    if (mode === "update" && initialValues) {
      setValue("title", initialValues.title || "");
      setValue("description", initialValues.description || "");
      setValue("priority", initialValues.priority || "");
      setValue("due_date", initialValues.due_date || "");
      console.log(initialValues.due_date);
    }
  }, [initialValues, setValue, mode]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    console.log(data);
  };

  const handleBack = () => {
    navigate("/tasks");
  };

  return (
    <form
      className="flex flex-col w-[70%] rounded-lg"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="flex flex-col">
        <label className="text-md  w-fit">Title</label>
        <input
          type="text"
          placeholder="Enter your title"
          className="w-250 px-4 py-2 border rounded-lg text-black"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <label className="text-md  w-fit">Description (Optional)</label>
        <textarea
          placeholder="Enter your description"
          className="w-250 px-4 py-2 border rounded-lg text-black"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <label className="text-md  w-fit">Priority</label>
        <select
          className="w-250 px-4 py-2 border rounded-lg text-black"
          {...register("priority", { required: "Priority is required" })}
        >
          <option value="" disabled>
            Select the Priority
          </option>
          <option value="low" className="text-orange-400">
            Low
          </option>
          <option value="medium" className="text-yellow-400">
            Medium
          </option>
          <option value="high" className="text-red-400">
            High
          </option>
        </select>
        {errors.priority && (
          <p className="text-red-500 text-sm">{errors.priority.message}</p>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <label className="text-md w-fit">Due Date</label>
        <input
          type="date"
          className="w-250 px-4 py-2 border rounded-lg text-black"
          min={new Date(new Date().setDate(new Date().getDate() + 1))
            .toISOString()
            .split("T")[0]}
        />
        {errors.due_date && (
          <p className="text-red-500 text-sm">{errors.due_date.message}</p>
        )}
      </div>
      {loading ? (
        <div className="flex items-center justify-center mt-8">
          <Loader />
        </div>
      ) : (
        <div className="flex items-center justify-center w-100 mt-4 gap-4">
      
          {mode === "add" ? (
            <Button
              label="Add Task"
              type="submit"
              styles="bg-blue-500 hover:bg-blue-400 mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          ) : (
            <Button
            label="Update Task"
            type="submit"
            styles="bg-blue-500 hover:bg-blue-400 mt-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
          )}
         
          <Button
            label="Back"
            type="button"
            onClick={handleBack}
            styles="bg-red-500 hover:bg-red-400 mt-2 text-white font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      )}
    </form>
  );
};

export default TaskDetailForm;
