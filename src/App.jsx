import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import UserLayout from "./layout/UserLayout";
import Details from "./pages/Details";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import List from "./pages/List";

import Employee from "./pages/Employee";

function App() {
  // const [user, setUser] = useState("");
  // useEffect(() => {
  //   const checkToken = async () => {
  //     const user = localStorage.getItem("user");
  //     setUser(user);
  //   };

  //   checkToken();
  // }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<MainLayout />}>
        <Route
          index
          element={<UserLogin />}></Route>
        <Route
          path="/adminCare"
          element={<Admin />}></Route>
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}></Route>
            <Route
              path="/list"
              element={<List />}></Route>
            <Route
              path="/employee"
              element={<Employee />}></Route>
          </Route>
        </Route>
        <Route element={<UserLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/home"
              element={<Home />}></Route>
            <Route
              path="/details"
              element={<Details />}></Route>
            {/* <Route
            path="/dashboard"
            element={<Dashboard />}></Route>
          <Route
            path="/profile"
            element={<Profile />}></Route> */}
          </Route>
        </Route>
        <Route
          path="*"
          element={<PageNotFound></PageNotFound>}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
