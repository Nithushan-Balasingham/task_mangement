import { Route, Routes } from 'react-router-dom';
import AllTasks from './components/Tasks/AllTasks';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/login/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/tasks" element={<AllTasks />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
