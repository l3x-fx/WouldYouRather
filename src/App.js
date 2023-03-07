import React from 'react';
import { Outlet, redirect } from 'react-router-dom';

import './App.css';
import { Header } from './app/Header';
import { Navbar } from './app/Navbar';



function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Outlet />
    
    </div>
  );
}

export default App;
