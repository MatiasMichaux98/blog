import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import { useEffect, useState } from "react";
import Home from "./pages/dashboard/Home";
import PrivateRoute from './layouts/PrivateRoute'
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import CreatePost from "./pages/post/CreatePost";
import Sidebar from "./components/Sidebar";
import PostDetail from "./pages/post/PostDetail ";
export default function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('accessToken')
  )
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
  useEffect(() => {
    if(isAuthenticated){
      const token = localStorage.getItem('accessToken')
      if(!token){
        setIsAuthenticated(false)
      }
    }
  },[isAuthenticated])

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
      
      {/*rutas privadas */}
      <Route path="/home" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home handleLogout={handleLogout}/>
            </PrivateRoute>
          } />
      <Route path="/profile" element={
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Profile />
        </PrivateRoute>
      }/>
       <Route path="/editprofile" element={
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <EditProfile />
        </PrivateRoute>
      }/>
       <Route path="/create-post" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <CreatePost />
            </PrivateRoute>
          } />
        <Route path="/sidebar" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Sidebar />
            </PrivateRoute>
          } />
          <Route path="/post/:id" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PostDetail />
            </PrivateRoute>
          } />
    </Routes>
    </BrowserRouter>
  )
}


