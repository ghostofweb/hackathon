import {createBrowserRouter,RouterProvider} from "react-router-dom"

import './App.css'
import Navbar from "./Component/Navbar"
import Home from "./Component/Home"
import Login from "./Component/Login"
// import About from "./Component/About"
// import Profile from "./Component/Profile"
import Register from "./Component/Register"
import ShowDetail from "./Component/ShowDetail"

function App() {
  const router = createBrowserRouter([
    {path:"/",element:<><Home/></>},
    {path:"/login",element:<><Login/></>},
    {path:"/register",element:<><Register/></>},
    {path:"/profile",element:<><Navbar/><Login/></>},
    {path:"/register",element:<><Navbar/><Register/></>},
    {path:"/register/:id",element:<><Navbar/><ShowDetail/></>}
])
  return (
    <>
       <RouterProvider router={router}/>

    </>
  )
}

export default App
