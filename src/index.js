import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Layout from "./Layout";
import Home from "./Home";
import Blog from "./Blog";
import Post from "./Post";
// import NoPage from "./pages/NoPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/blog/:id" element={<Blog />} />
      {/* 

      <Route path="*" element={<NoPage />} /> */}
    </Route>
  </Routes>
</BrowserRouter>
);