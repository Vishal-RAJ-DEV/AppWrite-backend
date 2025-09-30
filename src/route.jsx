import App from "./App";
import AddPost from "./Pages/AddPost.jsx";
import AllPosts from "./Pages/Allposts";
import EditPost from "./Pages/EditPost";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import SignUpPage from "./Pages/SignUp";
import AuthLayout from "./Components/Component/AuthLayout";
import Log from "./Pages/Log.jsx";
import ErrorBoundary from "./Components/Component/ErrorBoundary";

const routes  = [
     {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Log />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUpPage />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      }
    ]
  }
]

export default routes;