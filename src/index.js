import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Layout from "./Layout";
import Home from "./Home";
import Blog from "./Blog";
import Post from "./Post";
import Login from "./Login";
import Register from "./Register";
// import NoPage from "./pages/NoPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenProvider } from './TokenProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TokenProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post" element={<Post />} />
          <Route path="/blog/:id" element={<Blog />} />

          {/* 

      <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </TokenProvider>
);