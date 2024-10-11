import { ToastContainer } from "react-toastify";
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1500} />
      <AppRoutes/>
    </div>
  );
}

export default App;
