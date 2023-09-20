import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Layout from "./Layout";
import Home from "./Home";
import Blog from "./Blog";
import Post from "./Post";
import Login from "./Login";
import Register from "./Register";
import MyPosts from "./MyPosts";
import NoPage from "./NoPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenProvider } from './TokenProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenProvider>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path='/' element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/post" element={<Post />} />
          <Route exact path="/myposts" element={<MyPosts />} />
          <Route exact path="/blog/:id" element={<Blog />} />
          <Route path="*" element={<NoPage />} /> 
        </Route>
      </Routes>
      </BrowserRouter>
  </React.StrictMode>
  </TokenProvider>
);