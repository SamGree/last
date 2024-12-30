import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/theme-context";
import NavBar from "./components/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AddPost from "./pages/post/AddPost";
import EditPost from "./pages/post/EditPost";
import PostsLiked from "./pages/post/PostsLiked";
import Settings from "./pages/profile/Settings";
import PostDetails from "./pages/post/PostDetails";
import Albums from "./pages/album/Albums";
import EditAlbum from "./pages/album/EditAlbum";
import AlbumPosts from "./pages/album/AlbumPosts";
import GlobalHelmet from "./components/GlobalHelmet";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalHelmet />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/settings" element={<Settings />} />
            <Route path="/posts/add-post" element={<AddPost />} />
            <Route path="/posts/:postId" element={<PostDetails />} />
            <Route path="/posts/:postId/edit" element={<EditPost />} />
            <Route path="/posts/liked" element={<PostsLiked />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:albumId" element={<AlbumPosts />} />
            <Route path="/albums/:albumId/edit" element={<EditAlbum />} />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
