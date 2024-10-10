import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/login/Login';
import AllTasks from './components/Tasks/AllTasks/AllTasks';
import AddTask from './components/Tasks/AddTask/AddTask';
import ViewTask from './components/Tasks/ViewTask/ViewTask';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
      <Route path="/tasks" element={<AllTasks />}/>
      <Route path="/addTask" element={<AddTask />} />
      <Route path="/task/:id" element={<ViewTask />} />

</Route>

    </Routes>
  );
};

export default AppRoutes;
