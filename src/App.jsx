import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, Routes } from "react-router"
import { Provider } from 'react-redux'
import {store} from './store'
import Navbar from './Navbar'
import Home from './Home'
import Paste from './Paste'
import Viewpaste from './Viewpaste'

const myrouter=createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:'/paste',
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path:'/paste/:id',
      element:
      <div>
        <Navbar/>
        <Viewpaste/>
      </div>
    },
  ]
);

function App() {


  return (
    <>
      <RouterProvider router={myrouter}/>
    </>
  )
}

export default App
