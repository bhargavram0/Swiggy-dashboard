import React from 'react'
import Landing from './vendorDashboard/pages/Landing.JSX'
import { Routes, Route } from 'react-router-dom'
import "./App.css"
import NotFound from './vendorDashboard/component/NotFound'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </div>
  )
}

export default App
