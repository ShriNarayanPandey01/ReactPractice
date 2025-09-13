import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './Store/store.js'
import { Provider } from 'react-redux'
import { Login,Signup,AllPost,PostForm,Home } from './components/index.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Post from './components/Pages/Post.jsx'
import EditPost from './components/Pages/EditPost.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                // <AuthLayout authentication={false}>
                    <Login />
                // </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                // <AuthLayout authentication={false}>
                    <Signup />
                // </AuthLayout>
            ),
        },
        {
            path: "/allpost",
            element: (
                // <AuthLayout authentication>
                    // {" "}
                    <AllPost />
                // </AuthLayout>
            ),
        },
        {
            path: "/addpost",
            element: (
                // <AuthLayout authentication>
                    // {" "}
                    <PostForm />
                // </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                // <AuthLayout authentication>
                    // {" "}
                    <EditPost />
                // </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
