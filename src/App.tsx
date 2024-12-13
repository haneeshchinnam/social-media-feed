import "./App.css";
import { ProtectedRoute } from "./components";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { CreatePost, EditProfile, Login, Posts, Profile, SignUp } from "./pages";
import Appbar from "./components/Appbar";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        {
          path: "/posts",
          element: (
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          ),
        },
        {
          path: "/create-post",
          element: (
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/edit-profile",
          element: (
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}>
          <></>
      </RouterProvider>
    </div>
  );
}

export default App;

const Layout = ({ children }: { children?: JSX.Element }) => {
  return (
    <div>
      <Appbar />
      {children}
      <Outlet />
    </div>
  );
};
