import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from './components/Home'
import Storage from './components/Storage'
import DashboardLayout from "./components/DashboardLayout"
import LoginLayout from './components/LoginLayout'
import Login from './components/Login'
import Register from './components/Register'

export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="/storage" element={<Storage />} />
          </Route>
          <Route path="/login" element={<LoginLayout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<LoginLayout />}>
            <Route index element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
