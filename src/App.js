import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Nav from './components/Nav'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { getUsers } from "./features/usersSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();

    useEffect(()=>{
    dispatch(getUsers())
  },[])

  return (<>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      </>
  );
}

export default App;
