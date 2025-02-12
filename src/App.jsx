import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react";
import * as ROUTES from './Constants/Routes'
import UseAuthListener from "./Hooks/UseAuthListener";
import UserContext from "./Context/User";


import ProtectedRoute from "./Helpers/ProtectedRoute";
import IsUserLoggedIn from "./Helpers/IsUserLoggedIn";

const Login = lazy(()=> import("./Pages/Login"));
const Signup = lazy(()=> import("./Pages/Signup"));
const NotFound = lazy(()=> import("./Pages/NotFound"));
const Dashboard = lazy(()=> import("./Pages/Dashboard"));
const Profile = lazy(() => import("./Pages/Profile"));

function App() {

  const { user } = UseAuthListener();
  
  return (
    <UserContext.Provider value={{user}}>
<Router>
  <Suspense fallback={<p>Loading...</p>}>
      <Routes>
      <Route
              path={ROUTES.LOGIN}
              element={
                <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD}>
                  <Login />
                </IsUserLoggedIn>
              }
            />
         <Route
              path={ROUTES.SIGN_UP}
              element={
                <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD}>
                  <Signup/>
                </IsUserLoggedIn>
              }
            />
        <Route path="*" element={<NotFound/>}/>
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
      </Routes>
  </Suspense>
  </Router>
  </UserContext.Provider>  
  )
}

export default App
