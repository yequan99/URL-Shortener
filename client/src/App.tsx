import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Dashboard from './components/Dashboard'
import Layout from './components/Layout'
import Login from './components/Login'
import Register from './components/Register'

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Layout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/register" element={<Layout />}>
            <Route index element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}
